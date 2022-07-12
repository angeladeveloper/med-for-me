const User = require('./User');

const Medication = require('./Medication');

User.hasMany(Medication, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Medicaiton.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Medication };
