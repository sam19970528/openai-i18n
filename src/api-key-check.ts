import service from "./api/request";

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
    await apiKeyCheck(inputKey);
  }
  return {
    inputKeyHandle,
  };
}
