'use client'

import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { Button, TextField } from '@/shared/ui'
import { createBookingRequest } from '../api/createBookingRequest'
import {
  bookingInitialValues,
  bookingSchema,
  type BookingFormValues,
} from '../model/bookingSchema'
import styles from './BookingForm.module.css'

type BookingFormProps = {
  carId: string
}

export function BookingForm({ carId }: BookingFormProps) {
  const mutation = useMutation({
    mutationFn: (values: BookingFormValues) =>
      createBookingRequest(carId, values),
  })

  const formik = useFormik<BookingFormValues>({
    initialValues: bookingInitialValues,
    validationSchema: bookingSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutation.mutateAsync(values)
        toast.success('Thank you! We will contact you shortly.')
        resetForm()
      } catch {
        toast.error('Failed to send your request. Please try again.')
      }
    },
  })

  function errorOf(field: keyof BookingFormValues): string | undefined {
    return formik.touched[field] ? formik.errors[field] : undefined
  }

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Book your car now</h2>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
        <label className={styles.visuallyHidden} htmlFor="name">
          Name
        </label>
        <TextField
          name="name"
          placeholder="Name*"
          autoComplete="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={errorOf('name')}
        />

        <label className={styles.visuallyHidden} htmlFor="email">
          Email
        </label>
        <TextField
          name="email"
          type="email"
          placeholder="Email*"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={errorOf('email')}
        />

        <label className={styles.visuallyHidden} htmlFor="comment">
          Comment
        </label>
        <TextField
          as="textarea"
          name="comment"
          placeholder="Comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={errorOf('comment')}
        />

        <Button
          type="submit"
          size="lg"
          className={styles.submit}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Sending…' : 'Send'}
        </Button>
      </form>
    </section>
  )
}
