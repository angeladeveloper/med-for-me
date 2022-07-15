const router = require('express').Router();


router.get('/', (req, res) => {
  try {
    res.send("Hello🥷")
  } catch (err) {
    res.status(500).json(err);
  }
})

// PURELY for testing purposes😾👩‍🔬, http://localhost:3001/kitten
router.get('/kitten', (req, res) => {
  try {
    res.render('kitten')
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
