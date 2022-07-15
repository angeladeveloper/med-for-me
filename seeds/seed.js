const sequelize = require('../config/connection');
const { User, MED , Comment } = require('../models');

const userData = require('./userData.json');
const medData = require('./medData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const meds = await MED.bulkCreate(medData, {
    individualHooks: true,
    returning: true,
  });
  for (const users of userData) {
    await User.create({
      ...users,
      med_id: meds[Math.floor(Math.random() * meds.length)].id,
    });
  }
  const comment = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
