const router = require('express').Router();
const { MED, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/med/:id', async (req, res) => {
  try {
    const medData = await MED.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment', 'name', 'rating', 'date_created'],
        }
      ],
    });

    const meds = medData.get({ plain: true });
    console.log(meds)
    const comments = meds.comments;

    res.render('med', {
      meds, comments,
      logged_in: req.session.logged_in,
      med_id: req.params.id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    // Get all MEDs and JOIN with user data
    const medData = await MED.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
        }
      ],
    });

    // Serialize data so the template can read it
    const meds = medData.map((med) => med.get({ plain: true }));
    console.log('============================================', meds)
    // Pass serialized data and session flag into template
    res.render('homepage', {
      meds,
      logged_in: req.session.logged_in,
      name: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: MED }],
    });
    // console.log(userData);
    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

module.exports = router;
