import { validateUsername, validatePassword } from './validation';

const invalidUsernames = [
  'aewufaipuefhpuerhgpuerhgpuserhgipuserhgipushergpis', // Too long
  'user$', // Invalid character
];

const validUsernames = [
  'user123',
  'userwithlongusername',
  'UserWithUpperCaseChars',
];

const validPasswords = ['securepassword', 'SecurePassword$%123'];
const invalidPasswords = ['securepasswordthatiswaytoowaytoowaytoolong'];

test('Usernames should be validated correctly according to requirements', () => {
  invalidUsernames.forEach((username) => {
    const { valid } = validateUsername(username);
    expect(valid).toBe(false);
  });
  validUsernames.forEach((username) => {
    const { valid } = validateUsername(username);
    expect(valid).toBe(true);
  });
});

test('Passwords should be rejected if more than 32 chars', () => {
  invalidPasswords.forEach((password) => {
    const { valid } = validatePassword(password);
    expect(valid).toBe(false);
  });
  validPasswords.forEach((password) => {
    const { valid } = validatePassword(password);
    expect(valid).toBe(true);
  });
});
