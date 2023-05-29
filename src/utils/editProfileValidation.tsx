import * as yup from "yup";

export const editProfileSchema = yup.object().shape({
  email: yup.string().email("Invalid email").optional().nullable(),
  name: yup.string().optional().nullable(),
  bio: yup.string().optional().nullable(),
  oldPassword: yup.string().optional().nullable(),
  newPassword: yup
    .string()
    .optional()
    .nullable(),
  confirmPassword: yup.string()
});
