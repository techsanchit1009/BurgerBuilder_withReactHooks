const router = require('express').Router();
const firebase = require('../Firestore');

const db = firebase.firestore();

router.get('/orders/:userId', (req, res) => {
  const ordersArray = [];
  db.collection('users').doc(req.params.userId).collection('orders').get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            ordersArray.push(doc.data());            
          });
          res.send(ordersArray);
        });
});

router.post('/orders/:userId', (req, res) => {
  const orderData = req.body;
  db.collection('users').doc(req.params.userId)
      .collection('orders').doc(orderData.orderId)
      .set(orderData)
      .then(() => {
        res.send({message: 'Order Successful'});
      });
});

router.patch('/orders/:userId/:orderId', (req, res) => {
  console.log(req.params);
  const {userId, orderId} = req.params;
  db.collection('users').doc(userId).collection('orders').doc(orderId)
  .update({
    status: 'cancelled'
  }).then(() => {
    res.send({message:'order cancelled successfully'});
  })
});

module.exports = router;