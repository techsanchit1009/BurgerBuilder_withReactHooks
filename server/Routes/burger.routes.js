const router = require('express').Router();
const firebase = require('../Firestore');

const db = firebase.firestore();

router.get('/burgerIng', (req, res) => {
  db.collection('ingredients').doc('ingredients')
  .get().then(snapshot => {
    res.send(snapshot.data());
  })
  .catch(err => {
    res.status(401).send({message: 'Unable to fetch ingredients'});
  })
});

module.exports = router;