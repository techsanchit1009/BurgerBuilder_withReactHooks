const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("../Config/keys.config");
const firebase = require('../Firestore');

const db = firebase.firestore();


module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: keys.GOOGLE_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        const userRef = db.collection('users').doc(profile._json.sub);
        userRef.get().then(snapshot => {
          if(snapshot.exists){
            done(null, snapshot.data());
          } else {
            const userData = {
              id: profile._json.sub,
              name: profile._json.name,
              email: profile._json.email,
            };
            db.collection('users').doc(profile._json.sub).set(userData)
                  .then(() => done(null, userData));
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.collection('users').doc(id).get()
        .then(snapshot => done(null, snapshot.data()))
        .catch(e => done(new Error("Failed to deserialize an user")));
  });
};
