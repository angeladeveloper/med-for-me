const router = require('express').Router();
const { Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');


router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        med_id: req.params.id
      }
    })
    const comments = commentData.map((med) => med.get({ plain: true }));
    console.log(comments)
    res.render('med', {
      comments,
      logged_in: req.session.logged_in,
      med_id: req.params.id
    });
  }
  catch (err) {
    res.status(500).json(err);
  }

})

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      name: req.session.name,
    },

    );

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
