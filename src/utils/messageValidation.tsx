import * as yup from 'yup';

export const messageSchema = yup.object().shape({
  content: yup.string(),
  recipientId: yup.number(),
});