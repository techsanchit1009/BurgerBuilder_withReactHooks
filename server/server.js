const express = require('express');
const PORT = 5000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const keys = require('./Config/keys.config');
const passport = require('passport');
const routes = require('./Routes/routes');

require('./PayPal/paypal'); // PayPal configuration

const headers = {
  origin: '*',
  methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  exposedHeaders: ['Access-Control-Allow-Origin'],
  credentials: true // allow session cookie from browser to pass through 
}

app.use(
  cookieSession({
    name: "session",
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000
  })
);

app.use(cookieParser()); // Parse cookie to get req.cookies

app.use(passport.initialize()); // Initialize
app.use(passport.session());

require('./Passport/passport-google.auth')(passport); // Google Passport OAuth Config

app.use(cors(headers));
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => console.log(`listening to http://localhost:${PORT}`));