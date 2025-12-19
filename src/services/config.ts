export const RECAPTCHA_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY
export const PLUNK_API_KEY = import.meta.env.VITE_PLUNK_SECRET_KEY

export const EMAIL_ADDRESS = import.meta.env.VITE_EMAIL_RECEIVER

export const FACEBOOK_URL =
  'https://www.facebook.com/profile.php?id=100068506101639'
export const WHATSAPP_URL = 'https://wa.me/33768924838'
export const HELLOASSO_URL =
  'https://www.helloasso.com/associations/amicale-laique-de-ligne'

export const ADHESION_URL =
  'https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__tJDWX1UQVBTRUIwS01EMTRFMDc2NVpUOU9KMjJaRy4u'

export const HUBSPOT_API_KEY = import.meta.env.VITE_HUBSPOT_API_KEY
export const HUBSPOT_FORM_ID = import.meta.env.VITE_HUBSPOT_FORM_ID
export const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID

export const NB_ACTUALITE_PER_PAGE = 8
export const NB_PV_PER_PAGE = 8

export const NB_KIDS = import.meta.env.VITE_NB_KIDS || 320
export const NB_EVENTS = import.meta.env.VITE_NB_EVENTS || 13
export const NB_AMICALISTES = import.meta.env.VITE_NB_AMICALISTES || 53

export const IS_NEWSLETTER_ENABLED =
  import.meta.env.VITE_NEWSLETTER_ENABLED === 'true'
