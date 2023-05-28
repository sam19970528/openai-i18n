import service from "./api/request";
import { messageSuccess } from "@/hook";

export function useAPIKeyCheck() {
  function apiKeyCheck(inputKey: string) {
    return service({
      url: "/v1/models",
      method: "get",
      headers: {
        Authorization: `Bearer ${inputKey}`,
      },
    });
  }
  async function inputKeyHandle(inputKey: string) {
    const res = await apiKeyCheck(inputKey);
    if (res.status === 200) {
      messageSuccess("綁定API_KEY成功!");
      sessionStorage.setItem("api-key", inputKey);
      return true;
    } else return false;
  }
  return {
    inputKeyHandle,
  };
}
