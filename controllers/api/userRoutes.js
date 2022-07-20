
const withAuth = require('../../utils/auth');
const withAdmin = require('../../utils/admin');

const router = require('express').Router();
const { User } = require('../../models');


//-----------------------------------------------------------------------------------------------
router.get('/:name',withAuth,withAdmin, async (req, res) => {
  try {
    console.log('-------------------------',req.params.name);
    const userData = await User.findOne({ where: { name: req.params.name },      
      attributes: { exclude: ['password'] },
  });
    const users = userData.get({ plain: true });
    console.log(users);
   // document.location.replace(`../${users.id}`);
    res.render('userssearch', {
      users, 
      permission: req.session.permission, 
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//-----------------------------------------------------------------------------------------------

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.name = userData.name;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//-----------------------------------------------------------------------------------------------

router.delete('/:id', withAuth, async (req, res) => {
  try {
    console.log('-----------------',req.params.id);
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No Medication found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//-----------------------------------------------------------------------------------------------

router.put('/:password', async (req, res) => {
  try {
    console.log('----------------------',req.body);
    const userData = await User.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//-----------------------------------------------------------------------------------------------
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // console.log('testssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss');
    // console.log(userData);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.name = userData.name;
      req.session.permission = userData.permission;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
