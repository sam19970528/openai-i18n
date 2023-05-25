<template>
  <n-card>
    <template #header>
      <n-skeleton v-if="!item.result" text width="60%" />
      <template v-else>
        {{ item.language }}
      </template>
    </template>
    <n-skeleton v-if="!item.result" text :repeat="3" />
    <template v-else>
      <span v-if="item.status === 200">{{ writerResult }}</span>
      <n-button v-else strong secondary type="error"> {{ item.result }} </n-button>
    </template>
  </n-card>
  <div style="margin-bottom: 30px">
    <n-button v-if="copyBtnShow && item.status === 200" :render-icon="copyIcon" type="success" class="btn-full-width" @click="copyResult">複製文字</n-button>
    <n-button v-else-if="isErrorStatus" type="error" class="btn-full-width" @click="retry">再試一次</n-button>
  </div>
</template>

<script lang="ts" setup>
import { Result, Optional } from "@/types";
import { renderIcon } from "../hook";
import { CopyOutline as CopyIcon } from "@vicons/ionicons5";
import { includes } from "lodash";
import copy from "copy-to-clipboard";
import { messageSuccess } from "../hook";
import { useRequest } from "@/api/request";

interface Props {
  item: Result;
  originInput: string;
}
const props = defineProps<Props>();
const { generateMessage, retryRequest } = useRequest();
const optional: Optional = {
  errorRetryId: props.item.id,
  errorRetryText: props.originInput,
};
async function retry() {
  writerResult.value = "";
  const { messages } = generateMessage(props.item.language, optional);
  await retryRequest(messages, props.item);
}
const writerResult = ref("");
const copyBtnShow = ref(false);
const copyIcon = renderIcon(CopyIcon);
// 打字機效果
function typeWriter() {
  return new Promise<void>(resolve => {
    let index = 0;
    const speed = 75;
    const typing = () => {
      if (index < props.item.result.length) {
        writerResult.value += props.item.result.charAt(index);
        index++;
        setTimeout(typing, speed);
      } else {
        // 打字機效果結束才出現複製文字按鈕
        resolve();
        copyBtnShow.value = true;
      }
    };
    typing();
  });
}
const errCode = [429, 500];
const isErrorStatus = computed(() => includes(errCode, props.item.status));
function copyResult() {
  const result = props.item.result;
  copy(result);
  messageSuccess("複製成功!");
}
watch(
  () => props.item.result,
  newVal => {
    if (newVal) {
      typeWriter();
    }
  }
);
</script>

<style scoped>
.btn-full-width {
  width: 100%;
  padding: 20px 0;
}
</style>
