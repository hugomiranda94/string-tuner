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
  REGEX_EMAIL_DEFAULT,
  REGEX_URL_DEFAULT,
  REGEX_PHONE_DEFAULT,
  REGEX_INITIALS_WHITESPACE,
  REGEX_INITIALS_ALPHA,
  REGEX_WHITESPACE_ALL,
  REGEX_HTML_TAGS,
  REGEX_HTML_ESCAPE_CHARS,
  REGEX_HTML_UNESCAPE_ENTITIES,
  REGEX_HIGHLIGHT_ESCAPE,
} from './regex';

// ============================================
// STRING TRANSFORMATION
// ============================================

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
 * Converts a string to camelCase
 * @param str - The string to convert
 * @returns The camelCase string
 * @example
 * transform.camel('hello world') // 'helloWorld'
 * transform.camel('Hello-World') // 'helloWorld'
 */
const camelCase = (str: string) => {
  if (!str) return '';
  return str
    .replace(REGEX_CAMEL_CASE_SEPARATOR, (_, chr) => chr.toUpperCase())
    .replace(REGEX_CAMEL_CASE_FIRST_CHAR, (chr) => chr.toLowerCase());
};

/**
 * Converts a string to kebab-case
 * @param str - The string to convert
 * @returns The kebab-case string
 * @example
 * transform.kebab('helloWorld') // 'hello-world'
 * transform.kebab('Hello World') // 'hello-world'
 */
const kebabCase = (str: string) => {
  if (!str) return '';
  return str
    .replace(REGEX_KEBAB_CASE_CAPITAL, '-$1')
    .replace(REGEX_KEBAB_CASE_NON_ALPHANUMERIC, '-')
    .replace(REGEX_KEBAB_CASE_LEADING_DASH, '')
    .toLowerCase();
};

/**
 * Converts a string to PascalCase
 * @param str - The string to convert
 * @returns The PascalCase string
 * @example
 * transform.pascal('hello world') // 'HelloWorld'
 * transform.pascal('hello-world') // 'HelloWorld'
 */
const pascalCase = (str: string) => {
  if (!str) return '';
  return str
    .replace(REGEX_PASCAL_CASE_SEPARATOR, (_, chr) => chr.toUpperCase())
    .replace(REGEX_PASCAL_CASE_FIRST_CHAR, (chr) => chr.toUpperCase());
};

/**
 * Converts a string to snake_case
 * @param str - The string to convert
 * @returns The snake_case string
 * @example
 * transform.snake('helloWorld') // 'hello_world'
 * transform.snake('Hello World') // 'hello_world'
 */
const snakeCase = (str: string) => {
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
const snakeScreamCase = (str: string) => {
  if (!str) return '';
  return str
    .replace(REGEX_SNAKE_CASE_CAPITAL, '_$1')
    .replace(REGEX_SNAKE_CASE_NON_ALPHANUMERIC, '_')
    .replace(REGEX_SNAKE_CASE_LEADING_UNDERSCORE, '')
    .toUpperCase();
};

/**
 * Reverses a string
 * @param str - The string to reverse
 * @returns The reversed string
 * @example
 * transform.reverse('hello') // 'olleh'
 */
const reverse = (str: string) => {
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
const slugify = (str: string) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(REGEX_SLUGIFY_NON_WORD, '')
    .replace(REGEX_SLUGIFY_WHITESPACE, '-')
    .replace(REGEX_SLUGIFY_TRIM_DASHES, '');
};

/**
 * String transformation utilities for converting strings to different formats and cases
 * @property capitalize - Capitalizes a string or sentence
 * @property camel - Converts to camelCase
 * @property kebab - Converts to kebab-case
 * @property pascal - Converts to PascalCase
 * @property snake - Converts to snake_case
 * @property snakeScream - Converts to SCREAMING_SNAKE_CASE
 * @property reverse - Reverses a string
 * @property slugify - Creates URL-friendly slugs
 * @example
 * transform.capitalize('hello world') // 'Hello World'
 * transform.camel('hello world') // 'helloWorld'
 * transform.kebab('helloWorld') // 'hello-world'
 * transform.pascal('hello-world') // 'HelloWorld'
 * transform.snake('helloWorld') // 'hello_world'
 * transform.snakeScream('hello world') // 'HELLO_WORLD'
 * transform.reverse('hello') // 'olleh'
 * transform.slugify('Hello World!') // 'hello-world'
 */
export const transform = {
  capitalize: capitalize,
  camel: camelCase,
  kebab: kebabCase,
  pascal: pascalCase,
  snake: snakeCase,
  snakeScream: snakeScreamCase,
  reverse: reverse,
  slugify: slugify,
};

// ============================================
// STRING VALIDATION
// ============================================

/**
 * Validates if a string is a valid email address
 * @param str - The string to validate
 * @param customRegex - Optional custom regex pattern for validation
 * @returns True if the string is a valid email
 * @example
 * isEmail('test@example.com') // true
 * isEmail('invalid-email') // false
 */
const isEmail = (str: string, customRegex?: RegExp) => {
  if (!str) return false;
  const regex = customRegex || REGEX_EMAIL_DEFAULT;
  return regex.test(str);
};

/**
 * Validates if a string is a valid URL
 * @param str - The string to validate
 * @param customRegex - Optional custom regex pattern for validation
 * @returns True if the string is a valid URL
 * @example
 * isUrl('https://example.com') // true
 * isUrl('not-a-url') // false
 */
const isUrl = (str: string, customRegex?: RegExp) => {
  if (!str) return false;
  const regex = customRegex || REGEX_URL_DEFAULT;
  return regex.test(str);
};

/**
 * Validates if a string is a valid phone number
 * @param str - The string to validate
 * @param customRegex - Optional custom regex pattern for validation
 * @returns True if the string is a valid phone number
 * @example
 * isPhone('+1-234-567-8900') // true
 * isPhone('(123) 456-7890') // true
 */
const isPhone = (str: string, customRegex?: RegExp) => {
  if (!str) return false;
  const regex = customRegex || REGEX_PHONE_DEFAULT;
  return regex.test(str);
};

export const validate = {
  email: isEmail,
  url: isUrl,
  phone: isPhone,
};

// ============================================
// STRING EDITS
// ============================================

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
const trim = (str: string, maxLength?: number, trimChar = '...') => {
  if (!maxLength) return str;
  return str?.length > maxLength
    ? `${str?.slice(0, maxLength)}${trimChar}`
    : str;
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
const repeat = (str: string, count: number) => {
  if (!str || count < 1) return '';
  return str.repeat(count);
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
const pad = (
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
 * Wraps a string with specified characters
 * @param str - The string to wrap
 * @param wrapper - Character(s) to wrap with, or object with start and end
 * @returns The wrapped string
 * @example
 * wrap('hello', '"') // '"hello"'
 * wrap('hello', { start: '[', end: ']' }) // '[hello]'
 */
const wrap = (
  str: string,
  wrapper: string | { start: string; end: string },
) => {
  if (!str) return '';
  if (typeof wrapper === 'string') {
    return `${wrapper}${str}${wrapper}`;
  }
  return `${wrapper.start}${str}${wrapper.end}`;
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
 * Creates prefix edits utilities for a given prefix string
 * @param pf - The prefix string to add or remove
 * @returns An object with `add` and `remove` methods
 * @example
 * const slash = prefix('/')
 * slash.add('path') // '/path'
 * slash.add('/path') // '/path'
 * slash.remove('/path') // 'path'
 */
const prefix = (pf: string) => ({
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
 * Creates suffix edits utilities for a given suffix string
 * @param sf - The suffix string to add or remove
 * @returns An object with `add` and `remove` methods
 * @example
 * const slash = suffix('/')
 * slash.add('path') // 'path/'
 * slash.add('path/') // 'path/'
 * slash.remove('path/') // 'path'
 */
const suffix = (sf: string) => ({
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
 * Extracts initials from a name or string
 * @param str - The string to extract initials from
 * @param maxInitials - Maximum number of initials to return (optional)
 * @returns The initials in uppercase
 * @example
 * initials('John Doe') // 'JD'
 * initials('John Michael Doe', 2) // 'JM'
 */
const initials = (str: string, maxInitials?: number) => {
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

export const edit = {
  trim: trim,
  repeat: repeat,
  pad: pad,
  wrap: wrap,
  unwrap: unwrap,
  prefix: prefix,
  suffix: suffix,
  initials: initials,
};

// ============================================
// STRING CLEANING
// ============================================

/**
 * Removes all whitespace from a string
 * @param str - The string to clean
 * @returns The string without any whitespace
 * @example
 * removeWhitespace('hello world') // 'helloworld'
 * removeWhitespace('  a  b  c  ') // 'abc'
 */
const removeWhitespace = (str: string) => {
  if (!str) return '';
  return str.replace(REGEX_WHITESPACE_ALL, '');
};

/**
 * Normalizes whitespace by collapsing multiple spaces to single space and trimming
 * @param str - The string to normalize
 * @returns The string with normalized whitespace
 * @example
 * normalizeWhitespace('hello    world') // 'hello world'
 * normalizeWhitespace('  multiple   spaces  ') // 'multiple spaces'
 */
const normalizeWhitespace = (str: string) => {
  if (!str) return '';
  return str.replace(REGEX_WHITESPACE_ALL, ' ').trim();
};

/**
 * Removes HTML tags from a string
 * @param str - The string to clean
 * @returns The string without HTML tags
 * @example
 * stripHtml('<p>Hello <strong>World</strong></p>') // 'Hello World'
 */
const stripHtml = (str: string) => {
  if (!str) return '';
  return str.replace(REGEX_HTML_TAGS, '');
};

/**
 * Escapes HTML special characters
 * @param str - The string to escape
 * @returns The escaped string
 * @example
 * escapeHtml('<div>Hello & goodbye</div>') // '&lt;div&gt;Hello &amp; goodbye&lt;/div&gt;'
 */
const escapeHtml = (str: string) => {
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
 * Unescapes HTML entities
 * @param str - The string to unescape
 * @returns The unescaped string
 * @example
 * unescapeHtml('&lt;div&gt;Hello &amp; goodbye&lt;/div&gt;') // '<div>Hello & goodbye</div>'
 */
const unescapeHtml = (str: string) => {
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

export const clean = {
  whitespace: removeWhitespace,
  normalizeWhitespace: normalizeWhitespace,
  html: stripHtml,
  escapeHtml: escapeHtml,
  unescapeHtml: unescapeHtml,
};

// ============================================
// STRING FORMATTING
// ============================================

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
const mask = (str: string, visibleChars = 4, maskChar = '*') => {
  if (!str) return '';
  if (str.length <= visibleChars) return str;
  const maskLength = str.length - visibleChars;
  return maskChar.repeat(maskLength) + str.slice(-visibleChars);
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
const highlight = (
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
 * Creates quote edits utilities for wrapping/unwrapping strings with quotes
 * @param type - Type of quotes: 'single', 'double', or 'backtick' (default: 'double')
 * @returns An object with `add` and `remove` methods
 * @example
 * const dq = quote('double')
 * dq.add('hello') // '"hello"'
 * dq.remove('"hello"') // 'hello'
 */
const quote = (type: 'single' | 'double' | 'backtick' = 'double') => {
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
 * Creates bracket edits utilities for wrapping/unwrapping strings with brackets
 * @param type - Type of brackets: 'round', 'square', 'curly', or 'angle' (default: 'round')
 * @returns An object with `add` and `remove` methods
 * @example
 * const rb = bracket('round')
 * rb.add('hello') // '(hello)'
 * rb.remove('(hello)') // 'hello'
 */
const bracket = (type: 'round' | 'square' | 'curly' | 'angle' = 'round') => {
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

export const format = {
  mask: mask,
  highlight: highlight,
  quote: quote,
  bracket: bracket,
};
