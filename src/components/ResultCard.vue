<template>
  <n-card style="margin-bottom: 30px">
    <template #header>
      <n-skeleton v-if="!item.result" text width="60%" />
      <template v-else>
        {{ item.language }}
      </template>
    </template>
    <n-skeleton v-if="!item.result" text :repeat="3" />
    <template v-else>
      <span v-if="item.status === 200">{{ item.result }}</span>
      <n-button v-else strong secondary type="error"> {{ item.result }} </n-button>
    </template>
  </n-card>
</template>

<script lang="ts" setup>
import { Result } from "@/types";

interface Props {
  item: Result;
}
defineProps<Props>();
</script>
