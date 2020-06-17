const router = require('express').Router();
const firebase = require('../Firestore');

const db = firebase.firestore();

router.get('/user/:userId', (req, res) => {
  db.collection('users').doc(req.params.userId).get()
    .then(snapshot => {
      res.send(snapshot.data());
    });
});

router.post('/user/:userId', (req, res) => {
  console.log(req.body);
  db.collection('users').doc(req.params.userId).set(req.body);
  res.send({message: 'User Data saved'});
});

module.exports = router;