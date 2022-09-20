
export function arraysEQ2(a: [number, number], b: [number, number]): boolean {
  for (let i = 0; i < 2; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

export function arraysEQ4(a: [number, number, number, number], b: [number, number, number, number]): boolean {
  for (let i = 0; i < 4; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

export function arraysEQ8(a: [number, number, number, number, number, number, number, number], b: [number, number, number, number, number, number, number, number]): boolean {
  for (let i = 0; i < 8; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
