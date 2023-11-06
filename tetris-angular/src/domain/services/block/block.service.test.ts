import { describe, expect, test } from "vitest";
import { BLOCKS } from "../../models/block";
import { cloneBlock, getNewRandomBlock } from "./block.service";

describe("Block Service", () => {
  test("get a new random block", () => {
    const newBlock = getNewRandomBlock();
    expect(newBlock).toBeTruthy();
    expect(newBlock.shape).toBeTruthy();
    expect(newBlock.shape[0]).toBeTruthy();
    expect(BLOCKS.find((block) => block.id === newBlock.id)).toBeTruthy();
  });

  test("clone a block", () => {
    const newBlock = getNewRandomBlock();
    const clonedBlock = cloneBlock(newBlock);
    expect(clonedBlock).toEqual(newBlock);
  });
});
