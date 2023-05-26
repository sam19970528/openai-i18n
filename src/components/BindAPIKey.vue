<template>
  <h2>輸入API_KEY啟用服務</h2>
  <n-input v-model:value="inputKey" type="text" placeholder="輸入API_KEY" :loading="inputLoading" :status="inputStatus" />
</template>
<script lang="ts" setup>
import { useAPIKeyCheck } from "@/api-key-check";
import { FormValidationStatus } from "naive-ui/es/form/src/interface";
const inputKey = ref("");
const inputLoading = ref(false);
const inputStatus = ref<FormValidationStatus>();
const { inputKeyHandle } = useAPIKeyCheck();
watch(inputKey, async newVal => {
  if (newVal && newVal.length > 30) {
    try {
      inputLoading.value = true;
      await inputKeyHandle(newVal);
      inputLoading.value = false;
      inputStatus.value = "success";
    } catch (error) {
      inputLoading.value = false;
      inputStatus.value = "error";
    }
  }
});
</script>
