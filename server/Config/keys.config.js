const GOOGLE_KEYS = {
  GOOGLE_CLIENT_ID: '991036421705-iinru7k1hrejigodf5oqpvqg42lgcipg.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'dLaZgnK8zADCNl4ACEMC305Y',
  GOOGLE_CALLBACK_URL: '/auth/google/redirect'
}

const SESSION = {
  COOKIE_KEY: 'thisisjustarandomcookiekeyasasecret'
}

const PAYPAL = {
  PAYPAL_CLIENT_ID: 'AdK7WpkqnkqwTSU-zugc81Z8oCxNUrsEVel_rtRPrBHlEpHJoXIVpRrVOGWvKogvDve_626sl5lUBwaQ',
  PAYPAL_CLIENT_SECRET: 'EIcbvsRSTKMIsjiG9usu6eMWlpHKRt6-vOsQ3IQTh71NekE4QQu_bnjbJjDw9YIjFlZ17UO3Aw4l_BTf'
}

module.exports = {
  ...GOOGLE_KEYS,
  ...SESSION,
  ...PAYPAL
} 