const router = require('express').Router();
const { MED , User , Comment } = require('../models');
const withAuth = require('../utils/auth');
const withAdmin = require('../utils/admin');

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
          model:Comment,
        }
      ],
    });

    // Serialize data so the template can read it
    const meds = medData.map((med) => med.get({ plain: true }));
    // console.log('============================================',meds)
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      meds, 
      logged_in: req.session.logged_in,
      name: req.session.name,
      permission: req.session.permission,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/med/:id',withAuth, async (req, res) => {
  try {
    const medData = await MED.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment','name','date_created'],
        }
      ],
    });

    const meds = medData.get({ plain: true });
    const comments = meds.comments;

    res.render('med', {
      meds,comments,
      logged_in: req.session.logged_in
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
//-----------------------------------------------------------------------------------------------
router.get('/userslist',withAuth, withAdmin, async (req, res) => {
  try {
    // Get all MEDs and JOIN with user data
    const usersData = await User.findAll({});

    const users = usersData.map((user) => user.get({ plain: true }));
    // console.log('============================================',meds)
    // Pass serialized data and session flag into template

    var names=[];
    for(var i=0;i<users.length;i++){
      names.push(users[i].id);
      names.push(users[i].name);
    }
    //console.log(names);

    res.render('userslist', { 
      users, 
      names,
      logged_in: req.session.logged_in,
      name: req.session.name,
      permission: req.session.permission,
      attributes: { exclude: ['password'] },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//-----------------------------------------------------------------------------------------------
router.get('/userslist/:id',withAuth,withAdmin, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {     
      attributes: { exclude: ['password'] },
    });
    console.log('--------------------------',userData);
    const users = userData.get({ plain: true });
    res.render('userper', {
      users, 
      permission: req.session.permission, 
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//-----------------------------------------------------------------------------------------------
// router.get('/userslist/:name',withAuth,withAdmin, async (req, res) => {
//   try {
//     console.log('-------------------------',req.params.name);
//     const userData = await User.findOne({ where: { name: req.params.name },      
//       attributes: { exclude: ['password'] },
//   });
//     const users = userData.get({ plain: true });
//     res.render('usersearch', {
//       users, 
//       permission: req.session.permission, 
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//-----------------------------------------------------------------------------------------------
router.get('/vaccines',withAuth, withAdmin, async (req, res) => {
  try {
    // Get all MEDs and JOIN with user data
    const vaccsData = await MED.findAll({});

    const vaccs = vaccsData.map((vaccine) => vaccine.get({ plain: true }));
    console.log('============================================',vaccs)

    res.render('vaccines', { 
      vaccs, 
      permission: req.session.permission,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//-----------------------------------------------------------------------------------------------
router.get('/admin', withAuth,withAdmin, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: MED }],
    });
    // console.log(userData);
    const user = userData.get({ plain: true });

    res.render('admin', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/dashboard', withAuth,withAdmin, async (req, res) => {
try {
  const diagData = await MED.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model:Comment,
      }
    ],
  });
  // Serialize data so the template can read it
  const meds = diagData.map((med) => med.get({ plain: true }));
  res.render('dashboard', { 
    meds, 
    logged_in: req.session.logged_in,
    name: req.session.name,
    permission: req.session.permission,
  });
} catch (err) {
  res.status(500).json(err);
}
});


router.get('/permission', withAuth,withAdmin,async (req, res) => {
try {
  const userData = await User.findAll({});
  const users = userData.map((user) => user.get({ plain: true }));
  var names=[];
  for(var i=0;i<users.length;i++){
    names.push(users[i].name);
  }
  console.log(names);

  res.render('permission', { 
    users, 
    names,
    logged_in: req.session.logged_in,
  });
} catch (err) {
  res.status(500).json(err);
}
});


router.get('/addvaccine',withAuth,withAdmin, async (req, res) => {
        res.render('addvaccine', {logged_in: true});
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
