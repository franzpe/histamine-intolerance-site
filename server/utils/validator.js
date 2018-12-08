import { emailRegex } from './regexs';

const isEmail = mail => {
  return mail && emailRegex.test(mail);
};

const isRating = value => {
  return value && (value === 1 || value === -1);
};

export default { isEmail, isRating };
