<script setup lang="ts">
import BoardCell from "./BoardCell.vue";
import { BOARD_COLS, BOARD_ROWS } from "../../../domain/models/board";
import BoardScore from "./BoardScore.vue";
import { Board } from "../../../domain/models/board";
import { BoardService } from "../../../domain/services/services";

const { board } = defineProps<{
  board: Board;
}>();

const boardStyles = {
  aspectRatio: `${BOARD_COLS}/${BOARD_ROWS}`,
  gridTemplateRows: `repeat(${BOARD_ROWS}, minmax(0, 1fr))`,
  gridTemplateColumns: `repeat(${BOARD_COLS}, minmax(0, 1fr))`,
};

const cellValues = BoardService.getCellValues(board);
</script>

<template>
  <div class="h-full flex">
    <div class="shadow-xl w-auto h-full mx-auto rounded-lg bg-white relative">
      <div class="h-full grid grid-rows-20 grid-cols-10 gap-px p-2" :style="boardStyles">
        <BoardCell v-for="value in cellValues" :value="value" />
        <BoardScore :score="board.score" />
      </div>
    </div>
  </div>
</template>
