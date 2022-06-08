export const contains = <T extends string>(
  list: ReadonlyArray<T>,
  value: string | undefined,
): value is T => {
  return list.some(item => item === value);
}