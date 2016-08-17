"use strict";

let request = require("request");
let pogobuf = require("pogobuf");

let assets = require("./assets");

let session = null;
let loggedIn = false;

function login(obj) {

  obj.provider = obj.provider === "ptc" ? "ptc" : "google";

  let client = new pogobuf.Client();
  let loginProvider = obj.provider === "ptc" ? new pogobuf.PTCLogin() : new pogobuf.GoogleLogin();

  return new Promise((resolve) => {
    loginProvider.login(obj.username, obj.password).then(token => {
      client.setAuthInfo(obj.provider, token);
      return (client.init());
    }).then(() => {
      loggedIn = true;
      session = client;
      session.downloadModels = obj.hasOwnProperty("downloadModels") ? obj.downloadModels : true;
      client.getAssetDigest(2, "", "", "", 3300).then((asset) => {
        resolve(asset);
      });
    });
  });

}

function getAssets(assets) {

  return new Promise((resolve) => {

    if (!loggedIn) throw new Error("Invalid session, maybe not logged in?");

    if (!(assets instanceof Array)) {
      if (typeof assets === "string") {
        assets = [assets];
      }
      else {
        throw new Error("Invalid assets argument!");
      }
    }

    let ii = 0;
    let length = assets.length;

    let downloads = [];

    for (; ii < length; ++ii) {
      ((ii) => {
        let asset = assets[ii];
        session.getDownloadURLs(asset).then((resp) => {
          let url = resp.download_urls[0].url;
          downloadAsset(url).then((result) => {
            result.index = ii;
            result.asset = url;
            result.name = getBundleNameByAssetId(asset);
            downloads.push(result);
            if (downloads.length >= length) {
              downloads = sortArrayByIndex(downloads);
              resolve(downloads);
              return void 0;
            }
          });
        });
      })(ii);
    };

  });

}

function downloadAsset(url) {

  return new Promise((resolve) => {

    if (session.downloadModels) {
      request({url: url, encoding: null}, (error, response, body) => {
        let result = {
          asset: url,
          body: body
        };
        resolve(result);
      });
    }
    else {
      resolve({});
    }

  });

}

/**
 * Sort array back into
 * correct call order
 * @param  {Array} array
 * @return {Array}
 */
function sortArrayByIndex(array) {

  let ii = 0;
  let length = array.length;

  let output = [];

  for (; ii < length; ++ii) {
    output[array[ii].index] = array[ii];
    delete array[ii].index;
  };

  return (output);

}

function getAssetIdByBundleName(name) {
  for (let key of assets) {
    if (key.bundle_name === name) {
      return (key.asset_id);
    }
  };
  return (null);
}

function getBundleNameByAssetId(id) {
  for (let key of assets) {
    if (key.asset_id === id) {
      return (key.bundle_name);
    }
  };
  return (null);
}

function pkmnIdToBundleName(id) {
  return (
    "pm" + (id >= 10 ? id >= 100 ? "0" : "00" : "000") + id
  );
}

function getAssetByAssetId(ids) {
  return (
    getAssets(ids)
  );
}

function getAssetByPokemonId(ids) {

  if (!(ids instanceof Array)) {
    ids = [ids];
  }

  let asset_ids = [];

  for (let id of ids) {
    let bundle_name = pkmnIdToBundleName(id);
    let asset_id = getAssetIdByBundleName(bundle_name);
    if (asset_id) {
      asset_ids.push(asset_id);
    }
  };

  return (
    getAssets(asset_ids)
  );

}

function getAssetByPokemonName(names, lang) {

  if (!(names instanceof Array)) {
    names = [names];
  }

  let pkmnName = require("pokename")(lang);

  let ids = [];

  for (let name of names) {
    let id = pkmnName.getPokemonIdByName(name);
    ids.push(id);
  };

  return (
    getAssetByPokemonId(ids)
  );

}

module.exports = {
  login: login,
  getAssetByAssetId: getAssetByAssetId,
  getAssetByPokemonId: getAssetByPokemonId,
  getAssetByPokemonName: getAssetByPokemonName
};