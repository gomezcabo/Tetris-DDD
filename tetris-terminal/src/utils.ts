export function repeat(char: string, times: number): string {
  return new Array(times).fill(char).join("");
}
