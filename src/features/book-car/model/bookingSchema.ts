import * as Yup from 'yup'

export type BookingFormValues = {
  name: string
  email: string
  comment: string
}

export const bookingInitialValues: BookingFormValues = {
  name: '',
  email: '',
  comment: '',
}

// Коментар необовʼязковий: підтверджено бекендом (POST без comment -> 201) і
// узгоджено з задачею — порожній рядок у тілі запиту нічого не означає.
export const bookingSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(60, 'Name must be at most 60 characters.')
    .required('Please enter your name.'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address.')
    .required('Please enter your email.'),
  comment: Yup.string()
    .trim()
    .max(500, 'Comment must be at most 500 characters.'),
})
