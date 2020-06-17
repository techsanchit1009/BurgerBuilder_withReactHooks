const router = require('express').Router();
const orderRoutes = require('./order.routes');
const burgerRoutes = require('./burger.routes');
const userRoutes = require('./user.routes');


router.get('/', (req, res) => {
  res.send('hi');
});

router.use(userRoutes);
router.use(orderRoutes);
router.use(burgerRoutes);

module.exports = router;