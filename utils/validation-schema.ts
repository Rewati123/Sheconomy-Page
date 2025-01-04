import * as Yup from 'yup'

const phoneRegExp = /^\+?[1-9]\d{1,14}$/

export const applicationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  emailOtp: Yup.string()
    .length(6, 'OTP must be 6 digits')
    .matches(/^\d+$/, 'OTP must only contain numbers'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Invalid phone number')
    .required('Phone number is required'),
  phoneOtp: Yup.string()
    .length(6, 'OTP must be 6 digits')
    .matches(/^\d+$/, 'OTP must only contain numbers'),
  startupName: Yup.string()
    .min(2, 'Startup name is too short')
    .max(100, 'Startup name is too long')
    .required('Startup name is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 50 characters')
    .max(500, 'Description must not exceed 500 characters')
    .required('Description is required'),
  profileLink: Yup.string()
    .url('Invalid URL')
    .required('Profile link is required'),
 
})

export type ApplicationFormValues = Yup.InferType<typeof applicationSchema>

