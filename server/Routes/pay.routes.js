const router = require("express").Router();
const paypal = require("paypal-rest-sdk");
const firebase = require('../Firestore');

const db = firebase.firestore();

router.post("/checkout", (req, res) => {
  const {userId, orderData} = req.body;
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `http://localhost:5000/success/?userId=${userId}&orderId=${orderData.orderId}`,
      cancel_url: "http://localhost:3000/failed",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Burger",
              price: (orderData.price / 70).toFixed(2),
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: (orderData.price / 70).toFixed(2)
        },
        description: "Please continue to place the order.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      const linkObject = payment.links.filter(link => link.rel === 'approval_url');
      res.send({redirectLink: linkObject[0].href});
    }
  });
});

router.get('/success', (req, res) => {
  const { userId, orderId, PayerID, paymentId} = req.query;
  const paymentDetails = {
    PayerID,
    paymentId
  };
  db.collection('users').doc(userId)
      .collection('orders').doc(orderId)
      .collection('paymentDetails').add(paymentDetails)
      .then(() => {
        res.redirect('http://localhost:3000');
      });
})

module.exports = router;
