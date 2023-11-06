<script setup lang="ts">
import { ref, onMounted } from "vue";

import TetrisBoard from "./TetrisBoard.vue";
import GameOverDialog from "./GameOverDialog.vue";
import { BoardService } from "../../../../../domain/services";
import { Board } from "../../../../../domain/models/board";

const setBoard = (newBoard: Board) => {
  board.value = newBoard;
  tick.value++;
};

const board = ref<Board>(BoardService.getInitialBoard());
const tick = ref(0);

onMounted(() => {
  setInterval(() => {
    if (board.value.status === "game-over") return;
    setBoard(BoardService.moveCurrentBlockDown(board.value));
  }, 1000);
});

onMounted(() =>
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (board.value.status === "game-over") return;

    if (event.key === "ArrowLeft") setBoard(BoardService.moveCurrentBlockLeft(board.value));
    else if (event.key === "ArrowRight") setBoard(BoardService.moveCurrentBlockRight(board.value));
    else if (event.key === "ArrowDown") setBoard(BoardService.moveCurrentBlockDown(board.value));
    else if (event.key === "ArrowUp") setBoard(BoardService.rotateCurrentBlock(board.value));
    else if (event.key === "Enter") setBoard(BoardService.moveCurrentBlockDown(board.value, true));
  })
);
</script>

<template>
  <div class="p-6 md:p-10 bg-blue-300 h-screen relative">
    <TetrisBoard :board="board" :key="tick" />
    <GameOverDialog
      v-if="board.status === 'game-over'"
      :score="board.score"
      :onRestart="() => setBoard(BoardService.getInitialBoard())"
    />
  </div>
</template>

<style scoped></style>
