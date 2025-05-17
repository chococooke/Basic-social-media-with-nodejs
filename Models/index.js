const sequelize = require("../config/initdb");
const Comment = require("./Comment");
const Post = require("./Post");

Post.hasMany(Comment);
Comment.belongsTo(Post);

(async () => {
  await sequelize.sync();
})();

module.exports = { Comment, Post };
