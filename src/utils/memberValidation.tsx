import * as yup from 'yup';

export const memberSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  type: yup.string().oneOf(['Public', 'Private'], 'Invalid type').required('Type is required'),
  members: yup.array().of(yup.string()).required('Members are required'),
});