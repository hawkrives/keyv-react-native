"use strict";

const { AsyncStorage } = require("react-native");

module.exports = class KeyvReactNative {
  constructor(uri, opts) {
    super();
    this.opts = {...opts};
    this.ttlSupport = false;
  }

  async get(key) {
    let value = await AsyncStorage.getItem(key);

    if (value === null) {
      return undefined;
    }

    return value;
  }

  async set(key, value) {
    if (typeof value === "undefined") {
      return undefined;
    }

    await AsyncStorage.setItem(key, value);
  }

  async delete(key) {
    await AsyncStorage.removeItem(key);
  }

  async clear() {
    let myKeys = AsyncStorage.getAllKeys().filter(key =>
      key.startsWith(this.opts.namespace)
    );
    await AsyncStorage.multiRemove(myKeys);
  }
};
