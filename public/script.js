const axios = require("axios");
const fs = require("node:fs/promises");
const path = require("node:path");

(async () => {
  try {
    const res = (
      await axios.get("https://github.com/chococooke", {
        headers: { "User-Agent": "Mozilla/5.0" },
      })
    ).data;

    const fragment = document.createDocumentFragment(res);
    console.log(fragment);

    await fs.appendFile(path.join(__dirname, '/res.html'), fragment, { encoding: "utf8" });
  } catch (err) {
    console.log(err);
  }
})();
