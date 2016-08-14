# POGO-asset-downloader <a href="https://www.npmjs.com/package/pogo-asset-downloader"><img src="https://img.shields.io/npm/v/pogo-asset-downloader.svg?style=flat-square" alt="NPM Version" /></a>

Download pokemon go assets, download urls and 3d models from the pokemon go servers.

## Install

```
$ npm install --save pogo-asset-downloader
```

## Usage
````js
const pogo = require("pogo-asset-downloader");

pogo.login({
  provider: "google", // google or ptc
  username: "USERNAME",
  password: "PASSWORD"
}).then(() => {

  pogo.getAssetByPokemonId([1, 151, 16]).then((downloads) => {
    downloads.map((item) => {
      // download assets, save model binaries
      fs.writeFileSync(item.name, item.body);
    });
  });

});

````

## API


## API

### .login(obj: object) => promise

Login with your credentials, default provider is ``google``.

````js
pogo.login({
  provider: "google", // google or ptc
  username: "USERNAME",
  password: "PASSWORD",
  downloadModels: true
}).then(example);
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