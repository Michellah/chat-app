import * as yup from 'yup'
export const schema = yup.object({
    name: yup.string().max(30).required(),
    email: yup.string()
        .required()
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Please enter a valid email address'),
    password: yup.string().min(4).required(),
    confirmPassword: yup.string().min(4).required(),
})