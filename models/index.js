const User = require("./User");
const Results = require("./Results");

User.hasMany(Results, {
  foreignKey: "user_id",
});

Results.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Results };
