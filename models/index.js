const User = require('./User');

const Medication = require('./Medication');

User.hasMany(Medication, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

<<<<<<< HEAD
Medication.belongsTo(User, {
=======
Medicaiton.belongsTo(User, {
>>>>>>> main
  foreignKey: 'user_id'
});


module.exports = { User, Medication };
