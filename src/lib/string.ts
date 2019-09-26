export const truncate = (input: string, length = 68) =>
  input && input.length > length ? `${input.substring(0, length)}...` : input
