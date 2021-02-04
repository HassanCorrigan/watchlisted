const truncateString = (string, length) =>
  string.length > length ? `${string.slice(0, length)}...` : string;

export { truncateString };
