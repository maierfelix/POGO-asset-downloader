# POGO-asset-downloader <a href="https://www.npmjs.com/package/pogo-asset-downloader"><img src="https://img.shields.io/npm/v/pogo-asset-downloader.svg?style=flat-square" alt="NPM Version" /></a> <a href="https://www.npmjs.com/package/pogo-asset-downloader"><img src="https://img.shields.io/npm/dm/pogo-asset-downloader.svg?style=flat-square" alt="NPM Downloads" /></a>

Download pokemon go assets, download urls and 3d models from the pokemon go servers.

## Install

```
$ npm install --save pogo-asset-downloader
```

## Usage
````js
const fs = require("fs");
const pogo = require("pogo-asset-downloader");

pogo.login({
  provider: "google", // google or ptc
  username: "USERNAME",
  password: "PASSWORD"
}).then(() => {

  pogo.setPlatform("ios"); // either android or ios
  pogo.getAssetByPokemonId([1, 151, 16]).then((downloads) => {
    downloads.map((item) => {
      // download assets, save model binaries
      fs.writeFileSync(item.name, item.body);
    });
  });

});

````

## API

### .login(obj: object) => promise

Login with your credentials, default provider is ``google``.

````js
pogo.login({
  provider: "google", // google or ptc
  username: "USERNAME",
  password: "PASSWORD",
  downloadModels: true
}).then(() => {
  // blabla
});
````

### .getAssetByPokemonId(ids: array) => promise

Download assets by numeric id or numeric array.

````js
pogo.getAssetByPokemonId([1, 151, 16], "en").then((asset) => { });
````

### .getAssetByPokemonName(names: array, lang: string) => promise

Download assets by pokemon names. The second parameter sets the language of the pokemon names, default is english.

````js
pogo.getAssetByPokemonName(["Venusaur", "Charizard"], "en").then((asset) => { });
````

### .getAssetByAssetId(ids: array) => promise

Download assets by their asset ids.

````js
pogo.getAssetByAssetId(["253d320c-a865-4dac-b7fc-65b48f51104c/1467338202540000"]).then((asset) => { });
````

### .platforms => array

Returns array of all supported platforms.

````js
pogo.platforms;
````

### .setPlatform(name: string)

Set platform type, to download assets for.

````js
pogo.setPlatform("ios"); // download ios assets from now
````

### .getGameMaster() => promise

Download latest game master, is platform independent.

````js
pogo.getGameMaster().then((master) => { });
````

### .getAssetDigest(opt: object) => promise

Download asset digest, platform is specified in the passed in opt object.

````js
pogo.getAssetDigest({
  platform: 2,
  manufacturer: "LGE",
  model: "Nexus 5",
  locale: "",
  version: 3300
}).then((asset_digest) => { });
````
