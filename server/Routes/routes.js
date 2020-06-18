const router = require('express').Router();
const authRoutes = require('./auth.routes');
const orderRoutes = require('./order.routes');
const burgerRoutes = require('./burger.routes');
const userRoutes = require('./user.routes');
const payRoutes = require('./pay.routes');


router.get('/', (req, res) => {
  res.send('hi');
});

router.use(authRoutes);
router.use(userRoutes);
router.use(orderRoutes);
router.use(burgerRoutes);
router.use(payRoutes);

module.exports = router;