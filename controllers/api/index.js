const router = require('express').Router();
const userRoutes = require('./userRoutes');
const medRoutes = require('./medRoutes');
const commnetRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/med', medRoutes);
router.use('/comment',commnetRoutes);

module.exports = router;
