const router = require('express').Router();
const { MED } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newMed = await MED.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMed);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const medData = await MED.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!medData) {
      res.status(404).json({ message: 'No Medication found with this id!' });
      return;
    }

    res.status(200).json(medData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
