import * as yup from 'yup';

export const messageSchema = yup.object().shape({
  content: yup.string(),
  recipientId: yup.number().optional().nullable(),
  channelId: yup.number().optional().nullable(),
});