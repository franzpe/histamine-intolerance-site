import { emailRegex } from './regexs';

const isEmail = mail => {
  return mail && emailRegex.test(mail);
};

const isRating = value => {
  return typeof value !== 'undefined' && (value === 1 || value === 0);
};

export default { isEmail, isRating };
