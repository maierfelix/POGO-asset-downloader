const fs = require("fs");
const pogo = require("../index");

pogo.login({
  provider: "google", // google or ptc
  username: "USERNAME",
  password: "PASSWORD"
}).then(example);

function example() {

  pogo.getAssetByPokemonId([1, 151, 16]).then((downloads) => {
    downloads.map((item) => {
      console.log(item.name); // bundle name
      //console.log(item.asset); // asset info
      //console.log(item.body); // binary buffer
      //fs.writeFileSync(item.name, item.body);
    });
  });

  pogo.getAssetByPokemonName(["Venusaur", "Charizard"], "en").then((downloads) => {
    downloads.map((item) => {
      console.log(item.name);
      //fs.writeFileSync(item.name, item.body);
    });
  });

  pogo.getAssetByAssetId(["253d320c-a865-4dac-b7fc-65b48f51104c/1467338202540000"]).then((downloads) => {
    downloads.map((item) => {
      console.log(item.name);
      //fs.writeFileSync(item.name, item.body);
    });
  });

}