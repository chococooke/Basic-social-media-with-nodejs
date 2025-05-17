const { DataTypes } = require("sequelize");
const sequelize = require("../config/initdb.js");

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img: {
    type: DataTypes.STRING, 
    allowNull: true
  }
});

(async () => {
  try {
    sequelize.sync();
  } catch (err) {
    console.log(err);
  }
})();

module.exports = Post;