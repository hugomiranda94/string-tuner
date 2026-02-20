/**
 * Regular expression patterns used throughout the library
 */

// STRING TRANSFORMATION PATTERNS
export const REGEX_CAMEL_CASE_SEPARATOR = /[^a-zA-Z0-9]+(.)/g;
export const REGEX_CAMEL_CASE_FIRST_CHAR = /^[A-Z]/;
export const REGEX_SNAKE_CASE_CAPITAL = /([A-Z])/g;
export const REGEX_SNAKE_CASE_NON_ALPHANUMERIC = /[^a-zA-Z0-9]+/g;
export const REGEX_SNAKE_CASE_LEADING_UNDERSCORE = /^_/;
export const REGEX_KEBAB_CASE_CAPITAL = /([A-Z])/g;
export const REGEX_KEBAB_CASE_NON_ALPHANUMERIC = /[^a-zA-Z0-9]+/g;
export const REGEX_KEBAB_CASE_LEADING_DASH = /^-/;
export const REGEX_PASCAL_CASE_SEPARATOR = /[^a-zA-Z0-9]+(.)/g;
export const REGEX_PASCAL_CASE_FIRST_CHAR = /^[a-z]/;
export const REGEX_SLUGIFY_NON_WORD = /[^\w\s-]/g;
export const REGEX_SLUGIFY_WHITESPACE = /[\s_-]+/g;
export const REGEX_SLUGIFY_TRIM_DASHES = /^-+|-+$/g;

// STRING VALIDATION PATTERNS
export const REGEX_EMAIL_DEFAULT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const REGEX_URL_DEFAULT = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
export const REGEX_PHONE_DEFAULT = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

// STRING EXTRACTION PATTERNS
export const REGEX_INITIALS_WHITESPACE = /\s+/;
export const REGEX_INITIALS_ALPHA = /[A-Z]/;

// STRING CLEANING PATTERNS
export const REGEX_WHITESPACE_ALL = /\s+/g;
export const REGEX_HTML_TAGS = /<[^>]*>/g;
export const REGEX_HTML_ESCAPE_CHARS = /[&<>"']/g;
export const REGEX_HTML_UNESCAPE_ENTITIES = /&(?:amp|lt|gt|quot|#39);/g;

// STRING FORMATTING PATTERNS
export const REGEX_HIGHLIGHT_ESCAPE = /[.*+?^${}()|[\]\\]/g;
