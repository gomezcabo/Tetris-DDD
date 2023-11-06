<script setup lang="ts">
import { BoardCellValue } from "../../../../../domain/models/board";

const { value } = defineProps<{ value: BoardCellValue }>();

const getTailwindBackgroundColorFromCellValue = (value: BoardCellValue): string => {
  return {
    I: "bg-cyan-500",
    J: "bg-blue-500",
    L: "bg-orange-500",
    O: "bg-yellow-400",
    S: "bg-green-500",
    T: "bg-violet-500",
    Z: "bg-red-500",
    default: "bg-gray-300",
  }[value ?? "default"];
};
</script>
<template>
  <div class="rounded-sm text-xs" :class="getTailwindBackgroundColorFromCellValue(value)"></div>
</template>
