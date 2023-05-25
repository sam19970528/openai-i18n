import { NIcon } from "naive-ui";
import { createDiscreteApi } from "naive-ui";
const { dialog, message } = createDiscreteApi(["dialog", "message"]);

export function renderIcon(iconType: any) {
  return () =>
    h(NIcon, null, {
      default: () => h(iconType),
    });
}
export function dialogError(content: string) {
  dialog.error({
    title: "错误",
    content,
    positiveText: "確定",
  });
}
export function messageSuccess(content: string) {
  message.success(content);
}
