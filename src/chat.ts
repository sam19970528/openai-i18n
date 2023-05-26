import { Form, Result, Optional, Message, GenerateMsg } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { dialogError } from "./hook";
import service from "./api/request";
import { find } from "lodash";

export function useChat() {
  const form = reactive<Form>({
    userInput: "",
    selectLang: [],
  });
  const result = reactive<Result[]>([]);
  function generateMessage(language: string, optional?: Optional): GenerateMsg {
    const id = optional?.errorRetryId || uuidv4();
    const userContent = optional?.errorRetryText || form.userInput;
    const messages: Message[] = [
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
        content: `${userContent}`,
      },
    ];
    return {
      id,
      messages,
      language,
    };
  }
  function formValidate() {
    if (!form.userInput) {
      dialogError("請輸入要翻譯的文字");
      return false;
    } else if (!form.selectLang.length) {
      dialogError("請選擇至少一種語言");
      return false;
    }
    return true;
  }
  function chat(data: any) {
    return service({
      url: "/v1/chat/completions",
      method: "post",
      data,
    });
  }
  const chatConfig = {
    model: "gpt-3.5-turbo",
    max_tokens: 256,
  };
  async function postChat({ id, messages, language }: GenerateMsg) {
    const postData = {
      messages,
      ...chatConfig,
    };
    result.push({
      id,
      language,
      result: "",
      status: 0,
    });
    const findResult = find(result, i => i.id === id) as Result;
    try {
      const { data } = await chat(postData);
      findResult.result = data.choices[0].message.content;
      findResult.status = 200;
    } catch (error: any) {
      catchError(error, findResult);
    }
  }
  async function retryChat(messages: Message[], retryObj: Result) {
    retryObj.result = "";
    retryObj.status = 0;
    const postData = {
      messages,
      ...chatConfig,
    };
    try {
      const { data } = await chat(postData);
      retryObj.result = data.choices[0].message.content;
      retryObj.status = 200;
    } catch (error: any) {
      catchError(error, retryObj);
    }
  }
  function catchError(error: any, findResult: Result) {
    const errorStatus = error.response.status;
    switch (errorStatus) {
      case 500:
        findResult.result = "服務器錯誤請重新嘗試";
        findResult.status = 500;
        break;
      case 429:
        findResult.result = "請求次數過多，請稍候嘗試";
        findResult.status = 429;
        break;
    }
  }
  function translateHandle() {
    if (!formValidate()) return;
    form.selectLang.forEach(lang => {
      const item = generateMessage(lang);
      postChat(item);
    });
  }
  return {
    form,
    result,
    translateHandle,
    retryChat,
    generateMessage,
  };
}
