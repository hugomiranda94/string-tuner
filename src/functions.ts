export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const titleCase = (str: string | undefined) => {
  if (!str) return '';
  return (
    str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || str
  );
};

export const prefix = (char: string) => ({
  add: (str: string | undefined) =>
    !str ? '' : str?.startsWith(char) ? str : `${char}${str}`,
  remove: (str: string | undefined) =>
    !str ? '' : str?.startsWith(char) ? str?.slice(1) : str,
});

export const suffix = (char: string) => ({
  add: (str: string | undefined) =>
    !str ? '' : str?.endsWith(char) ? str : `${str}${char}`,
  remove: (str: string | undefined) =>
    !str ? '' : str?.endsWith(char) ? str?.slice(0, -1) : str,
});

export const truncate = (str: string, maxLength?: number) => {
  if (!maxLength) return str;
  return str?.length > maxLength ? `${str?.slice(0, maxLength)}...` : str;
};
