/**
 * Maximum allowed username length
 */
const MAX_USERNAME_LENGTH = 32;

/**
 * Maximum allowed password length
 */
const MAX_PASSWORD_LENGTH = 32;

/**
 * Regexp defining characters allowed in username.
 * Zero or more alphanumeric characters
 */
const alphanumericRegexp = new RegExp('^[a-zA-Z0-9]*$');

interface IValidationResult {
  valid: boolean;
  error: string;
}

/**
 * Validate username by length and characters used.
 * @param username Username to validate
 */
export const validateUsername = (username: string): IValidationResult => {
  let valid = true;
  let error = '';
  // Validate length
  if (username.length > MAX_USERNAME_LENGTH) {
    error = `Username longer than ${MAX_USERNAME_LENGTH} characters`;
    valid = false;
    // Validate characters used
  } else if (!username.match(alphanumericRegexp)) {
    error = 'Invalid characters in username';
    valid = false;
  }
  return { valid, error };
};

/**
 * Validate password by length
 * @param password Password to validate
 */
export const validatePassword = (password: string): IValidationResult => {
  let valid = true;
  let error = '';
  if (password.length > MAX_PASSWORD_LENGTH) {
    error = `Password longer than ${MAX_PASSWORD_LENGTH} characters`;
    valid = false;
  }
  return { valid, error };
};
