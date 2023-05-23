<template>
  <div class="lang-list">
    <n-button v-for="lang in langList" :key="lang" strong :type="form.selectLang !== lang ? 'tertiary' : 'primary'" @click="selectLangHandle(lang)">{{ lang }}</n-button>
  </div>
</template>
<script setup lang="ts">
import { Form } from "../types";
interface Props {
  form: Form;
}
const props = defineProps<Props>();
const langList = reactive([
  "中文繁體",
  "中文簡體",
  "英文",
  "日文",
  "韓文",
  "泰文",
  "德文",
  "緬甸文",
  "菲律賓文",
  "越南文",
  "俄文",
  "印度文",
  "印尼文",
  "葡萄牙文",
  "拉丁文",
  "希臘文",
  "西班牙文",
  "丹麥文",
  "土耳其文",
  "立陶宛文",
  "冰島文",
  "匈牙利文",
  "克羅埃西亞文",
  "芬蘭文",
  "義大利文",
  "法文",
  "捷克文",
  "梵文",
  "荷蘭文",
  "瑞典文",
  "挪威文",
  "烏克蘭文",
  "波蘭文",
]);
function selectLangHandle(lang: string) {
  props.form.selectLang = lang;
}
</script>
<style scoped>
.lang-list {
  margin-top: 20px;
}
.lang-list button {
  margin: 3px 6px;
}
</style>
