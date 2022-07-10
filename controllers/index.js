const router = require('express').Router();

router.get('/kitten', (req, res) => {
  try {
    res.render('kitten')
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
