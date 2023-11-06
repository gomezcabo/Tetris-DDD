import { Matrix } from "./matrix";

export type BlockId = "I" | "J" | "L" | "O" | "S" | "T" | "Z";
export type BlockCellValue = 0 | 1;

export type Block = {
  id: BlockId;
  shape: Matrix<BlockCellValue>;
};

export const BLOCKS: Block[] = [
  {
    id: "I",
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    id: "J",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  {
    id: "L",
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  {
    id: "O",
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    id: "S",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
  },
  {
    id: "T",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  {
    id: "Z",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
  },
];
