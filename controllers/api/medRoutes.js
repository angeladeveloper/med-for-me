const router = require('express').Router();
const { MED, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// ✅GET ALL COMMENTS FOR 1 MEDICATION. -- 
// 🟡TODO: move this to comment route maybe? or keep in med? 
router.get('/comments/:id', async (req, res) => {
  try {
    const medData = await MED.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['comment', 'name', 'date_created'],
        }
      ],
    });


    const meds = medData.get({ plain: true });

    const comments = meds.comments;
    console.log(meds.med_id)

    res.render('med', {
      meds, comments,
      logged_in: req.session.logged_in,
      med_id: meds.med_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
    console.log('-----------------',req.params.id);
    const medData = await MED.destroy({
      where: {
        id: req.params.id,
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
