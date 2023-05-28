<template>
  <main>
    <Introduction />
    <BindAPIKey v-if="!bindAPIKeySuccess" @showHandle="showBindKeyHandle" />
    <n-input style="margin-top: 30px" v-model:value="form.userInput" type="textarea" placeholder="請輸入要翻譯的文字" :autosize="{ minRows: 4 }" :maxlength="maxLength" show-count round clearable />
    <LanguageList :form="form" />
    <div style="margin-top: 50px; margin-bottom: 50px">
      <n-button :render-icon="langIcon" type="info" @click="translateHandle">翻譯</n-button>
    </div>
    <div v-if="result.length !== 0">
      <template v-for="item in result">
        <ResultCard :item="item" :origin-input="form.userInput" />
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { LanguageOutline as LangIcon } from "@vicons/ionicons5";
import { useChat } from "./chat";
import LanguageList from "@/components/LanguageList.vue";
import ResultCard from "./components/ResultCard.vue";
import { renderIcon } from "./hook";
import Introduction from "./components/Introduction.vue";
import BindAPIKey from "@/components/BindAPIKey.vue";

onMounted(() => {});
const { form, result, translateHandle } = useChat();
const maxLength = 256;
const langIcon = renderIcon(LangIcon);
const bindAPIKeySuccess = ref(sessionStorage.getItem("api-key") ? true : false);
function showBindKeyHandle(result: boolean) {
  bindAPIKeySuccess.value = result;
}
</script>

<style>
main {
  max-width: 800px;
  margin: 0 auto;
}
</style>
