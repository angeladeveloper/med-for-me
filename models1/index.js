const User = require('./User');
const MED = require('./Med');
const Comment = require('./Comment');

MED.hasMany(User, {
  foreignKey: 'med_id',
  onDelete: 'CASCADE'
});

User.belongsTo(MED, {
  foreignKey: 'med_id'
});


MED.hasMany(Comment, {
  foreignKey: 'med_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(MED, {
  foreignKey: 'med_id'
});



module.exports = { User, MED , Comment };
