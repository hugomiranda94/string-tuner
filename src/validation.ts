// ============================================
// STRING VALIDATION
// ============================================

import {
  REGEX_EMAIL_DEFAULT,
  REGEX_PHONE_DEFAULT,
  REGEX_URL_DEFAULT,
} from './regex';

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

export const valid = {
  email: isEmail,
  phone: isPhone,
  url: isUrl,
};
