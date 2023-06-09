import * as yup from 'yup';

export const memberSchema = yup.object().shape({
  members: yup.array().of(yup.string()),
});