const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "socialDB",
  process.env.SQL_UN,
  process.env.SQL_PWD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

(async () => {
  try {
    sequelize.authenticate();
  } catch (error) {
    console.log(error);
  }
})();

module.exports = sequelize;
