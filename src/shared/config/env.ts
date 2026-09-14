export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://car-rental-api.goit.study'

// Базовий URL сайту для абсолютних посилань у metadata (OG-теги тощо).
// Перевизначається на проді через змінну оточення.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
