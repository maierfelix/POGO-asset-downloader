const fs = require("fs");
const pogo = require("../index");

pogo.login({
  provider: "google", // google or ptc
  username: "USERNAME",
  password: "PASSWORD"
}).then(() => {
  example();
});

function example() {

  // ios models
  pogo.setPlatform("ios");
  pogo.getAssetByPokemonId([1, 151, 16]).then((downloads) => {
    downloads.map((item) => {
      fs.writeFileSync(__dirname + "/ios_" + item.name, item.body);
    });
    // android models
    pogo.setPlatform("android");
    pogo.getAssetByPokemonId([1, 151, 16]).then((downloads) => {
      downloads.map((item) => {
        fs.writeFileSync(__dirname + "/android_" + item.name, item.body);
      });
    });
  });

}