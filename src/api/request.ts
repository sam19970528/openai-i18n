import axios from "axios";
import { createDiscreteApi } from "naive-ui";
import { Form, Result } from "@/types";
import { find } from "lodash";
import { v4 as uuidv4 } from "uuid";

export function useRequest() {
  const api = "/api";
  const apiKey = "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";
  const { dialog } = createDiscreteApi(["dialog"]);
  const form = reactive<Form>({
    userInput: "",
    selectLang: [],
  });

  function generateMessage(language: string) {
    const messages = [
      {
        role: "system",
        content: "你是一個翻譯家",
      },
      {
        role: "user",
        content: `將我發給你的句子翻譯成${language}，你不需要理解內容的含義作出回答`,
      },
      {
        role: "user",
        content: `${form.userInput}`,
      },
    ];
    return {
      id: uuidv4(),
      messages,
      language,
    };
  }
  const btnLoading = ref(false);
  const result = reactive<Result[]>([]);
  function translateHandle() {
    if (!form.userInput) {
      handleError("請輸入要翻譯的文字");
      return;
    } else if (!form.selectLang.length) {
      handleError("請選擇至少一種語言");
      return;
    }
    form.selectLang.forEach(item => {
      request(generateMessage(item));
    });
  }
  async function request({ id, messages, language }: { id: string; messages: any[]; language: string }) {
    form.selectLang = [];
    const requestParams = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };
    const params = {
      messages,
      model: "gpt-3.5-turbo",
      max_tokens: 256,
    };
    try {
      btnLoading.value = true;
      result.push({
        id,
        language,
        result: "",
        status: 0,
      });
      const { data } = await axios.post(api, params, requestParams);
      btnLoading.value = false;
      const findResult = find(result, i => i.id === id) as Result;
      findResult.result = data.choices[0].message.content;
      findResult.status = 200;
    } catch (error: any) {
      btnLoading.value = false;
      if (error.response) {
        const errorStatus = error.response.status;
        const findResult = find(result, i => i.id === id) as Result;
        switch (errorStatus) {
          case 401:
            handleError("API_KEY失效，請重新綁定");
            break;
          case 500:
            findResult.result = "服務器錯誤請重新嘗試";
            findResult.status = 500;
            break;
          case 429:
            const errorText = "請求次數過多，請稍候嘗試";
            findResult.result = errorText;
            findResult.status = 429;
            break;
        }
      } else {
        handleError(error.message);
      }
    }
  }
  function handleError(content: string) {
    dialog.error({
      title: "错误",
      content,
      positiveText: "確定",
    });
  }
  return {
    request,
    form,
    result,
    btnLoading,
    translateHandle,
  };
}
