<template>
  <h2>輸入API Key啟用服務</h2>
  <n-input v-model:value="inputKey" type="text" placeholder="輸入API Key" :loading="inputLoading" :status="inputStatus" />
</template>
<script lang="ts" setup>
import { useAPIKeyCheck } from "@/api-key-check";
import { FormValidationStatus } from "naive-ui/es/form/src/interface";
const inputKey = ref("");
const inputLoading = ref(false);
const inputStatus = ref<FormValidationStatus>();
const { inputKeyHandle } = useAPIKeyCheck();
const emit = defineEmits(["showHandle"]);
watch(inputKey, async newVal => {
  if (newVal && newVal.length > 30) {
    try {
      inputLoading.value = true;
      const result = await inputKeyHandle(newVal);
      if (result) {
        emit("showHandle", result);
      }
      inputLoading.value = false;
      inputStatus.value = "success";
    } catch (error) {
      inputLoading.value = false;
      inputStatus.value = "error";
    }
  }
});
</script>
