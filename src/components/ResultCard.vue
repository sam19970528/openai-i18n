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
    <n-button v-if="item.status === 200" :render-icon="copyIcon" type="success" class="btn-full-width">複製文字</n-button>
    <n-button v-else-if="isErrorStatus" type="error" class="btn-full-width">再試一次</n-button>
  </div>
</template>

<script lang="ts" setup>
import { Result } from "@/types";
import { renderIcon } from "../hook";
import { CopyOutline as CopyIcon } from "@vicons/ionicons5";
import { includes } from "lodash";

interface Props {
  item: Result;
}
const props = defineProps<Props>();
const writerResult = ref("");
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
        resolve();
      }
    };
    typing();
  });
}
const errCode = [429, 500];
const isErrorStatus = computed(() => includes(errCode, props.item.status));
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
