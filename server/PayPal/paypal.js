const paypal = require('paypal-rest-sdk');
const keys = require('../Config/keys.config');

paypal.configure({
  mode: 'sandbox',
  client_id: keys.PAYPAL_CLIENT_ID,
  client_secret: keys.PAYPAL_CLIENT_SECRET
});