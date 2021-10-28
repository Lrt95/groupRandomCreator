export function shuffleArray(arr): string[] {
  return arr.sort(() => Math.random() - 0.5);
}

export function setBgColor(indexWeek: number): string {
  if (indexWeek % 2 === 0) {
    return '#F2F7FF';
  }
  return null;
}
