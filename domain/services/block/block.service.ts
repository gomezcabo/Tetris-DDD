import { MatrixService } from "../../services";
import { BLOCKS, Block } from "../../models/block";

export function getNewRandomBlock(): Block {
  return cloneBlock(BLOCKS[Math.floor(Math.random() * BLOCKS.length)]);
}

export function cloneBlock(block: Block): Block {
  return {
    id: block.id,
    shape: MatrixService.cloneMatrix(block.shape),
  };
}

export function rotateBlock(block: Block): Block {
  return {
    id: block.id,
    shape: MatrixService.rotateMatrix(block.shape),
  };
}
