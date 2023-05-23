<template>
  <main>
    <h1>請輸入要翻譯的文字</h1>
    <n-input v-model:value="form.userInput" type="textarea" placeholder="請輸入要翻譯的文字" :autosize="{ minRows: 4 }" :maxlength="maxLength" show-count round clearable />
    <LanguageList :form="form" />
    <div style="margin-top: 50px; margin-bottom: 50px">
      <n-button :render-icon="cashIcon" type="info" :loading="btnLoading" @click="request">翻譯</n-button>
    </div>
    <div v-if="result">
      <n-card :title="form.selectLang">
        {{ result }}
      </n-card>
    </div>
  </main>
</template>

<script setup lang="ts">
import { NIcon } from "naive-ui";
import { LanguageOutline as LangIcon } from "@vicons/ionicons5";
import { useRequest } from "@/api/request";
import LanguageList from "@/components/LanguageList.vue";

onMounted(() => {});
const { request, form, result, btnLoading } = useRequest();
const maxLength = 256;
// const configuration = new Configuration({
//   apiKey: "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",
// });
// delete configuration.baseOptions.headers["User-Agent"];
// const openai = new OpenAIApi(configuration);
// const completionParams = reactive({
//   model: "text-davinci-003",
//   prompt: prompt,
//   temperature: 0.1,
//   max_tokens: 1000,
// });
// async function completion() {
//   try {
//     loading.value = true;
//     const res = await openai.createCompletion(completionParams);
//     loading.value = false;
//     const text = res.data.choices[0].text as string;
//     resData.value = regexFormat(text);
//   } catch (error: any) {
//     loading.value = false;
//     if (error.response) {
//       const errorStatus = error.response.status;
//       switch (errorStatus) {
//         case 401:
//           handleError("API_KEY失效，請重新綁定");
//           break;
//         case 500:
//           handleError("服務器錯誤，請重新整理網頁後再試試");
//           break;
//       }
//     } else {
//       handleError(error.message);
//     }
//   }
// }
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
