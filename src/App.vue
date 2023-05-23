<template>
  <main>
    <h1>請輸入要翻譯的文字</h1>
    <n-input v-model:value="form.userInput" type="textarea" placeholder="請輸入要翻譯的文字" :autosize="{ minRows: 4 }" :maxlength="maxLength" show-count round clearable />
    <LanguageList :form="form" />
    <div style="margin-top: 50px; margin-bottom: 50px">
      <n-button :render-icon="cashIcon" type="info" :loading="btnLoading" @click="translateHandle">翻譯</n-button>
    </div>
    <div v-if="result.length !== 0">
      <template v-for="item in result">
        <ResultCard :item="item" />
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { NIcon } from "naive-ui";
import { LanguageOutline as LangIcon } from "@vicons/ionicons5";
import { useRequest } from "@/api/request";
import LanguageList from "@/components/LanguageList.vue";
import ResultCard from "./components/ResultCard.vue";

onMounted(() => {});
const { form, result, btnLoading, translateHandle } = useRequest();
const maxLength = 256;
function renderIcon(iconType: any) {
  return () =>
    h(NIcon, null, {
      default: () => h(iconType),
    });
}
const cashIcon = renderIcon(LangIcon);
</script>

<style scoped>
main {
  max-width: 800px;
  margin: 0 auto;
}
</style>
