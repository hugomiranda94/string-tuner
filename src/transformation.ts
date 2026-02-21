// ============================================
// STRING TRANSFORMATION
// ============================================

import {
  REGEX_CAMEL_CASE_SEPARATOR,
  REGEX_CAMEL_CASE_FIRST_CHAR,
  REGEX_SNAKE_CASE_CAPITAL,
  REGEX_SNAKE_CASE_NON_ALPHANUMERIC,
  REGEX_SNAKE_CASE_LEADING_UNDERSCORE,
  REGEX_KEBAB_CASE_CAPITAL,
  REGEX_KEBAB_CASE_NON_ALPHANUMERIC,
  REGEX_KEBAB_CASE_LEADING_DASH,
  REGEX_PASCAL_CASE_SEPARATOR,
  REGEX_PASCAL_CASE_FIRST_CHAR,
  REGEX_SLUGIFY_NON_WORD,
  REGEX_SLUGIFY_WHITESPACE,
  REGEX_SLUGIFY_TRIM_DASHES,
  REGEX_INITIALS_WHITESPACE,
  REGEX_INITIALS_ALPHA,
  REGEX_WHITESPACE_ALL,
  REGEX_HTML_TAGS,
  REGEX_HTML_ESCAPE_CHARS,
  REGEX_HTML_UNESCAPE_ENTITIES,
  REGEX_HIGHLIGHT_ESCAPE,
} from './regex';

/**
 * Creates bracket edits utilities for wrapping/unwrapping strings with brackets
 * @param type - Type of brackets: 'round', 'square', 'curly', or 'angle' (default: 'round')
 * @returns An object with `add` and `remove` methods
 * @example
 * export const rb = bracket('round')
 * rb.add('hello') // '(hello)'
 * rb.remove('(hello)') // 'hello'
 */
export const bracket = (
  type: 'round' | 'square' | 'curly' | 'angle' = 'round',
) => {
  const brackets = {
    round: { start: '(', end: ')' },
    square: { start: '[', end: ']' },
    curly: { start: '{', end: '}' },
    angle: { start: '<', end: '>' },
  };
  const bracketPair = brackets[type];

  return {
    /**
     * Adds brackets to a string
     * @param str - The string to wrap
     * @returns The bracketed string
     */
    add: (str: string) => wrap(str, bracketPair),
    /**
     * Removes brackets from a string
     * @param str - The string to unwrap
     * @returns The unbracketted string
     */
    remove: (str: string) => unwrap(str, bracketPair),
  };
};

/**
 * Converts a string to camelCase
 * @param str - The string to convert
 * @returns The camelCase string
 * @example
 * transform.camel('hello world') // 'helloWorld'
 * transform.camel('Hello-World') // 'helloWorld'
 */
export const camel = (str: string) => {
  if (!str) return '';
  return str
    .replace(REGEX_CAMEL_CASE_SEPARATOR, (_, chr) => chr.toUpperCase())
    .replace(REGEX_CAMEL_CASE_FIRST_CHAR, (chr) => chr.toLowerCase());
};

/**
 * Capitalizes a string or sentence
 * @param str - The string to capitalize
 * @param fullSentence - If true, capitalizes each word in the sentence. If false, only capitalizes the first character
 * @returns The capitalized string, or empty string if input is falsy
 * @example
 * transform.capitalize('hello world') // 'Hello World'
 * transform.capitalize('hello world', false) // 'Hello world'
 */
export const capitalize = (str: string, fullSentence = true) => {
  if (!str) return '';
  if (fullSentence) {
    return (
      str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') || str
    );
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

/**
 * Joins class names into a single space-separated string, filtering out falsy values.
 * Useful as a lightweight alternative to `classnames` for conditional class names.
 * @param classes - Variadic list of class values (strings, booleans, numbers, undefined, or false)
 * @returns A space-separated string of truthy class names
 * @example
 * cn('btn', isActive && 'active', undefined, 'primary') // 'btn active primary'
 * cn('col-12', 0, 'visible') // 'col-12 visible' (0 is falsy and removed)
 */
export const cn = (
  ...classes: (string | boolean | number | undefined | false)[]
) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Escapes HTML special characters
 * @param str - The string to escape
 * @returns The escaped string
 * @example
 * escapeHtml('<div>Hello & goodbye</div>') // '&lt;div&gt;Hello &amp; goodbye&lt;/div&gt;'
 */
export const escapeHtml = (str: string) => {
  if (!str) return '';
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(REGEX_HTML_ESCAPE_CHARS, (char) => htmlEscapes[char]);
};

/**
 * Highlights search terms in a string by wrapping them
 * @param str - The string to search in
 * @param search - The term to highlight
 * @param wrapper - Wrapper for highlighted terms (default: '<mark>' and '</mark>')
 * @param caseSensitive - Whether search is case sensitive (default: false)
 * @returns The string with highlighted search terms
 * @example
 * highlight('Hello world', 'world') // 'Hello <mark>world</mark>'
 * highlight('Hello World', 'o', { start: '[', end: ']' }) // 'Hell[o] W[o]rld'
 */
export const highlight = (
  str: string,
  search: string,
  wrapper: string | { start: string; end: string } = {
    start: '<mark>',
    end: '</mark>',
  },
  caseSensitive = false,
) => {
  if (!str || !search) return str;

  const wrapStart = typeof wrapper === 'string' ? wrapper : wrapper.start;
  const wrapEnd = typeof wrapper === 'string' ? wrapper : wrapper.end;

  const flags = caseSensitive ? 'g' : 'gi';
  const regex = new RegExp(
    search.replace(REGEX_HIGHLIGHT_ESCAPE, '\\$&'),
    flags,
  );

  return str.replace(regex, (match) => `${wrapStart}${match}${wrapEnd}`);
};

/**
 * Extracts initials from a name or string
 * @param str - The string to extract initials from
 * @param maxInitials - Maximum number of initials to return (optional)
 * @returns The initials in uppercase
 * @example
 * initials('John Doe') // 'JD'
 * initials('John Michael Doe', 2) // 'JM'
 */
export const initials = (str: string, maxInitials?: number) => {
  if (!str) return '';
  const words = str.trim().split(REGEX_INITIALS_WHITESPACE);
  const initialsArray = words
    .map((word) => word.charAt(0).toUpperCase())
    .filter((char) => REGEX_INITIALS_ALPHA.test(char));

  if (maxInitials) {
    return initialsArray.slice(0, maxInitials).join('');
  }
  return initialsArray.join('');
};

/**
 * Converts a string to kebab-case
 * @param str - The string to convert
 * @returns The kebab-case string
 * @example
 * transform.kebab('helloWorld') // 'hello-world'
 * transform.kebab('Hello World') // 'hello-world'
 */
export const kebab = (str: string) => {
  if (!str) return '';
  return str
    .replace(REGEX_KEBAB_CASE_CAPITAL, '-$1')
    .replace(REGEX_KEBAB_CASE_NON_ALPHANUMERIC, '-')
    .replace(REGEX_KEBAB_CASE_LEADING_DASH, '')
    .toLowerCase();
};

/**
 * Masks sensitive data in a string
 * @param str - The string to mask
 * @param visibleChars - Number of characters to keep visible at the end (default: 4)
 * @param maskChar - Character to use for masking (default: '*')
 * @returns The masked string
 * @example
 * mask('1234567890') // '******7890'
 * mask('1234567890', 2, '#') // '########90'
 */
export const mask = (str: string, visibleChars = 4, maskChar = '*') => {
  if (!str) return '';
  if (str.length <= visibleChars) return str;
  const maskLength = str.length - visibleChars;
  return maskChar.repeat(maskLength) + str.slice(-visibleChars);
};

/**
 * Normalizes whitespace by collapsing multiple spaces to single space and trimming
 * @param str - The string to normalize
 * @returns The string with normalized whitespace
 * @example
 * normalWhitespace('hello    world') // 'hello world'
 * normalWhitespace('  multiple   spaces  ') // 'multiple spaces'
 */
export const normalWhitespace = (str: string) => {
  if (!str) return '';
  return str.replace(REGEX_WHITESPACE_ALL, ' ').trim();
};

/**
 * Pads a string to a specified length with a character
 * @param str - The string to pad
 * @param length - Target length
 * @param char - Character to pad with (default: ' ')
 * @param position - Where to pad: 'start', 'end', or 'both' (default: 'both')
 * @returns The padded string
 * @example
 * pad('hello', 10) // '  hello   '
 * pad('hello', 10, '*', 'start') // '*****hello'
 * pad('hello', 10, '-', 'end') // 'hello-----'
 */
export const pad = (
  str: string,
  length: number,
  char = ' ',
  position: 'start' | 'end' | 'both' = 'both',
) => {
  if (!str || str.length >= length) return str;
  const padLength = length - str.length;

  if (position === 'start') {
    return char.repeat(padLength) + str;
  } else if (position === 'end') {
    return str + char.repeat(padLength);
  } else {
    const leftPad = Math.floor(padLength / 2);
    const rightPad = padLength - leftPad;
    return char.repeat(leftPad) + str + char.repeat(rightPad);
  }
};

/**
 * Converts a string to PascalCase
 * @param str - The string to convert
 * @returns The PascalCase string
 * @example
 * transform.pascal('hello world') // 'HelloWorld'
 * transform.pascal('hello-world') // 'HelloWorld'
 */
export const pascal = (str: string) => {
  if (!str) return '';
  return str
    .replace(REGEX_PASCAL_CASE_SEPARATOR, (_, chr) => chr.toUpperCase())
    .replace(REGEX_PASCAL_CASE_FIRST_CHAR, (chr) => chr.toUpperCase());
};

/**
 * Creates prefix edits utilities for a given prefix string
 * @param pf - The prefix string to add or remove
 * @returns An object with `add` and `remove` methods
 * @example
 * export const slash = prefix('/')
 * slash.add('path') // '/path'
 * slash.add('/path') // '/path'
 * slash.remove('/path') // 'path'
 */
export const prefix = (pf: string) => ({
  /**
   * Adds the prefix to a string if it doesn't already start with it
   * @param str - The string to add prefix to
   * @returns The string with prefix, or empty string if input is falsy
   */
  add: (str: string | undefined) =>
    !str ? '' : str?.startsWith(pf) ? str : `${pf}${str}`,
  /**
   * Removes the prefix from a string if it starts with it
   * @param str - The string to remove prefix from
   * @returns The string without prefix, or empty string if input is falsy
   */
  remove: (str: string | undefined) =>
    !str ? '' : str?.startsWith(pf) ? str?.slice(pf.length) : str,
});

/**
 * Creates quote edits utilities for wrapping/unwrapping strings with quotes
 * @param type - Type of quotes: 'single', 'double', or 'backtick' (default: 'double')
 * @returns An object with `add` and `remove` methods
 * @example
 * export const dq = quote('double')
 * dq.add('hello') // '"hello"'
 * dq.remove('"hello"') // 'hello'
 */
export const quote = (type: 'single' | 'double' | 'backtick' = 'double') => {
  const quoteChar = type === 'single' ? "'" : type === 'backtick' ? '`' : '"';

  return {
    /**
     * Adds quotes to a string
     * @param str - The string to quote
     * @returns The quoted string
     */
    add: (str: string) => wrap(str, quoteChar),
    /**
     * Removes quotes from a string
     * @param str - The string to unquote
     * @returns The unquoted string
     */
    remove: (str: string) => unwrap(str, quoteChar),
  };
};

/**
 * Repeats a string n times
 * @param str - The string to repeat
 * @param count - Number of times to repeat
 * @returns The repeated string
 * @example
 * repeat('ha', 3) // 'hahaha'
 * repeat('*', 5) // '*****'
 */
export const repeat = (str: string, count: number) => {
  if (!str || count < 1) return '';
  return str.repeat(count);
};

/**
 * Removes all whitespace from a string
 * @param str - The string to clean
 * @returns The string without any whitespace
 * @example
 * removeWhitespace('hello world') // 'helloworld'
 * removeWhitespace('  a  b  c  ') // 'abc'
 */
export const removeWhitespace = (str: string) => {
  if (!str) return '';
  return str.replace(REGEX_WHITESPACE_ALL, '');
};

/**
 * Reverses a string
 * @param str - The string to reverse
 * @returns The reversed string
 * @example
 * transform.reverse('hello') // 'olleh'
 */
export const reverse = (str: string) => {
  if (!str) return '';
  return str.split('').reverse().join('');
};

/**
 * Creates a URL-friendly slug from a string
 * @param str - The string to slugify
 * @returns The slugified string
 * @example
 * transform.slugify('Hello World!') // 'hello-world'
 * transform.slugify('  Multiple   Spaces  ') // 'multiple-spaces'
 */
export const slugify = (str: string) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(REGEX_SLUGIFY_NON_WORD, '')
    .replace(REGEX_SLUGIFY_WHITESPACE, '-')
    .replace(REGEX_SLUGIFY_TRIM_DASHES, '');
};

/**
 * Converts a string to snake_case
 * @param str - The string to convert
 * @returns The snake_case string
 * @example
 * transform.snake('helloWorld') // 'hello_world'
 * transform.snake('Hello World') // 'hello_world'
 */
export const snake = (str: string) => {
  if (!str) return '';
  return str
    .replace(REGEX_SNAKE_CASE_CAPITAL, '_$1')
    .replace(REGEX_SNAKE_CASE_NON_ALPHANUMERIC, '_')
    .replace(REGEX_SNAKE_CASE_LEADING_UNDERSCORE, '')
    .toLowerCase();
};

/**
 * Converts a string to SCREAMING_SNAKE_CASE
 * @param str - The string to convert
 * @returns The SCREAMING_SNAKE_CASE string
 * @example
 * transform.snakeScream('helloWorld') // 'HELLO_WORLD'
 * transform.snakeScream('Hello World') // 'HELLO_WORLD'
 */
export const snakeScream = (str: string) => {
  if (!str) return '';
  return str
    .replace(REGEX_SNAKE_CASE_CAPITAL, '_$1')
    .replace(REGEX_SNAKE_CASE_NON_ALPHANUMERIC, '_')
    .replace(REGEX_SNAKE_CASE_LEADING_UNDERSCORE, '')
    .toUpperCase();
};

/**
 * Removes HTML tags from a string
 * @param str - The string to clean
 * @returns The string without HTML tags
 * @example
 * stripHtml('<p>Hello <strong>World</strong></p>') // 'Hello World'
 */
export const stripHtml = (str: string) => {
  if (!str) return '';
  return str.replace(REGEX_HTML_TAGS, '');
};

/**
 * Creates suffix edits utilities for a given suffix string
 * @param sf - The suffix string to add or remove
 * @returns An object with `add` and `remove` methods
 * @example
 * export const slash = suffix('/')
 * slash.add('path') // 'path/'
 * slash.add('path/') // 'path/'
 * slash.remove('path/') // 'path'
 */
export const suffix = (sf: string) => ({
  /**
   * Adds the suffix to a string if it doesn't already end with it
   * @param str - The string to add suffix to
   * @returns The string with suffix, or empty string if input is falsy
   */
  add: (str: string | undefined) =>
    !str ? '' : str?.endsWith(sf) ? str : `${str}${sf}`,
  /**
   * Removes the suffix from a string if it ends with it
   * @param str - The string to remove suffix from
   * @returns The string without suffix, or empty string if input is falsy
   */
  remove: (str: string | undefined) =>
    !str ? '' : str?.endsWith(sf) ? str?.slice(0, -sf.length) : str,
});

/**
 * Trims a string to a maximum length and appends a trim character
 * @param str - The string to trim
 * @param maxLength - Maximum length of the string. If undefined, returns the original string
 * @param trimChar - Character(s) to append when string is trimmed (default: '...')
 * @returns The trimmed string with trim character appended, or original string if within max length
 * @example
 * trim('Hello World', 5) // 'Hello...'
 * trim('Hello World', 5, '~') // 'Hello~'
 */
export const trim = (str: string, maxLength?: number, trimChar = '...') => {
  if (!maxLength) return str;
  return str?.length > maxLength
    ? `${str?.slice(0, maxLength)}${trimChar}`
    : str;
};

/**
 * Unescapes HTML entities
 * @param str - The string to unescape
 * @returns The unescaped string
 * @example
 * unescapeHtml('&lt;div&gt;Hello &amp; goodbye&lt;/div&gt;') // '<div>Hello & goodbye</div>'
 */
export const unescapeHtml = (str: string) => {
  if (!str) return '';
  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };
  return str.replace(
    REGEX_HTML_UNESCAPE_ENTITIES,
    (entity) => htmlUnescapes[entity],
  );
};

/**
 * Removes wrapping characters from a string
 * @param str - The string to unwrap
 * @param wrapper - Character(s) to remove, or object with start and end
 * @returns The unwrapped string
 * @example
 * unwrap('"hello"', '"') // 'hello'
 * unwrap('[hello]', { start: '[', end: ']' }) // 'hello'
 */
const unwrap = (
  str: string,
  wrapper: string | { start: string; end: string },
) => {
  if (!str) return '';
  if (typeof wrapper === 'string') {
    if (str.startsWith(wrapper) && str.endsWith(wrapper)) {
      return str.slice(wrapper.length, -wrapper.length);
    }
    return str;
  }
  if (str.startsWith(wrapper.start) && str.endsWith(wrapper.end)) {
    return str.slice(wrapper.start.length, -wrapper.end.length);
  }
  return str;
};

/**
 * Wraps a string with specified characters
 * @param str - The string to wrap
 * @param wrapper - Character(s) to wrap with, or object with start and end
 * @returns The wrapped string
 * @example
 * wrap('hello', '"') // '"hello"'
 * wrap('hello', { start: '[', end: ']' }) // '[hello]'
 */
export const wrap = (
  str: string,
  wrapper: string | { start: string; end: string },
) => {
  if (!str) return '';
  if (typeof wrapper === 'string') {
    return `${wrapper}${str}${wrapper}`;
  }
  return `${wrapper.start}${str}${wrapper.end}`;
};
