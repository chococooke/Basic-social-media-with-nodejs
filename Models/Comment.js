const { DataTypes } = require("sequelize");
const sequelize = require("../config/initdb.js");

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  try {
    sequelize.sync();
  } catch (err) {
    console.log(err);
  }
})();

module.exports = Comment;
