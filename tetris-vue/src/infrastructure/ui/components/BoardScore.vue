<script setup lang="ts">
const { score } = defineProps<{ score: number }>();
</script>
<template>
   <div class="absolute w-32 right-0 -mr-36 -mt-2 shadow-xl h-fit p-2 rounded bg-white text-center">
    <div class="bg-gray-200 p-2">
      <div class="text-lg font-light">Score</div>
      <div class="text-5xl">{{score}}</div>
    </div>
  </div>
</template>
