import * as Yup from 'yup';

export const validationSchema = {
  login: Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  }),
  signup: Yup.object({
    fullName: Yup.string().required('Full name is required'),
    userName: Yup.string().required('User name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number is not valid')
      .required('Phone number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  }),
};
