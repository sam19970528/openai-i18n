<template>
  <main>
    <h1>請輸入要翻譯的文字</h1>
    <n-input v-model:value="textArea" type="textarea" placeholder="請輸入要翻譯的文字" round clearable />
    <div class="lang-list">
      <n-button v-for="lang in langList" :key="lang" strong :type="selectLang !== lang ? 'tertiary' : 'primary'" @click="selectLang = lang">{{ lang }}</n-button>
    </div>
    <div style="margin-top: 50px; margin-bottom: 50px">
      <n-button :render-icon="cashIcon" type="info" :loading="loading" @click="completion">翻譯</n-button>
    </div>
    <div v-if="resData">
      <n-card :title="selectLang">
        {{ resData }}
      </n-card>
    </div>
  </main>
</template>

<script setup lang="ts">
import { NIcon } from "naive-ui";
import { LanguageOutline as LangIcon } from "@vicons/ionicons5";
import { Configuration, OpenAIApi } from "openai";
onMounted(() => {
  // completion();
});
const configuration = new Configuration({
  apiKey: "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",
});
delete configuration.baseOptions.headers["User-Agent"];
const openai = new OpenAIApi(configuration);
const textArea = ref("");
const selectLang = ref("");
const resData = ref<string | null>("");
const prompt = computed(() => {
  return `${textArea.value}
  以上這段文字轉換成${selectLang.value}
  `;
});
const langList = reactive(["中文繁體", "中文簡體", "英文"]);
const loading = ref(false);
const completionParams = reactive({
  model: "text-davinci-003",
  prompt: prompt,
  temperature: 0.1,
  max_tokens: 1000,
});
async function completion() {
  try {
    loading.value = true;
    const res = await openai.createCompletion(completionParams);
    loading.value = false;
    const text = res.data.choices[0].text as string;
    resData.value = regexFormat(text);
  } catch (error: any) {
    loading.value = false;
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
function regexFormat(str: string) {
  const regex = /\n(.+)/;
  const match = str.match(regex);
  const result = match ? match[1] : null;
  return result;
}
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
.lang-list {
  margin-top: 20px;
}
.lang-list button {
  margin: 0 6px;
}
.box {
  width: 800px;
  height: 450px;
  box-shadow: 0 0 3px 3px #ddd;
  border: 1px solid #eee;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
