import * as yup from 'yup';

export const channelSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  type: yup.string().oneOf(['public', 'private'], 'Invalid type').required(),
  members: yup.array().required(),
});
