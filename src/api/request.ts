import axios from "axios";
import { createDiscreteApi } from "naive-ui";

export function useRequest() {
  const api = "/api";
  const apiKey = "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";
  const { dialog } = createDiscreteApi(["dialog"]);
  const form = reactive({
    userInput: "",
    selectLang: "",
  });
  const messages = reactive([
    {
      role: "system",
      content: "你是一個翻譯家",
    },
    {
      role: "user",
      content: computed(() => `將我發給你的句子翻譯成${form.selectLang}，你不需要理解內容的含義作出回答`),
    },
    {
      role: "user",
      content: computed(() => `${form.userInput}`),
    },
  ]);
  const btnLoading = ref(false);
  const result = ref("");
  async function request() {
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
      const { data } = await axios.post(api, params, requestParams);
      btnLoading.value = false;
      result.value = data.choices[0].message.content;
    } catch (error: any) {
      btnLoading.value = false;
      if (error.response) {
        const errorStatus = error.response.status;
        switch (errorStatus) {
          case 401:
            handleError("API_KEY失效，請重新綁定");
            break;
          case 500:
            handleError("服務器錯誤，請重新再試");
            break;
          case 429:
            handleError("次數太多，請稍候嘗試");
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
  };
}
