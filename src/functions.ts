export const capitalize = (str: string, fullSentence = true) => {
  if (!str) return '';
  if (fullSentence) {
    str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || str;
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

export const trim = (str: string, maxLength?: number, trimChar = '...') => {
  if (!maxLength) return str;
  return str?.length > maxLength
    ? `${str?.slice(0, maxLength)}${trimChar}`
    : str;
};

export const prefix = (pf: string) => ({
  add: (str: string | undefined) =>
    !str ? '' : str?.startsWith(pf) ? str : `${pf}${str}`,
  remove: (str: string | undefined) =>
    !str ? '' : str?.startsWith(pf) ? str?.slice(1) : str,
});

export const suffix = (sf: string) => ({
  add: (str: string | undefined) =>
    !str ? '' : str?.endsWith(sf) ? str : `${str}${sf}`,
  remove: (str: string | undefined) =>
    !str ? '' : str?.endsWith(sf) ? str?.slice(0, -1) : str,
});
