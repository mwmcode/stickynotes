/* eslint import/no-mutable-exports: 0, one-var: 0 */

import {
  STORAGE_KEY,
  DEFAULT_STORAGE_STATE,
} from './CONSTANTS';

export let load, save;

let store;

/** storage:
 * {
 *  noteStyle: {},
 *  boardStyle: {},
 *  notes: []
 * }
 */

/** chrome storage */
if (NODE_ENV === 'production') {
  store = (newStorage = {}) => {
    try {
      chrome.storage.sync.set({ [STORAGE_KEY]: newStorage });
    } catch (e) {
      console.error(`Error saving ${newStorage} to storage: ${e}`);
    }

    return newStorage;
  };

  /** exposed:  */
  load = () => new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get({ [STORAGE_KEY]: DEFAULT_STORAGE_STATE }, result => {
        resolve(result[STORAGE_KEY]);
      });
    } catch (e) {
      console.error(`Error loading from storage: ${e}`);
      reject(e);
    }
  });

  save = async (newStuff={}) => {
    const currentStorage = await load();

    return store({ ...currentStorage, ...newStuff });
  };
} else /** local storage */ {
  store = (newStorage={}) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage));
    } catch (e) {
      console.error(`Error saving ${newStorage} to storage: ${e}`);
    }
    return newStorage;
  }

  /** exposed: */
  load = () => {
    const result = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return result || DEFAULT_STORAGE_STATE;
  }

  save = (newStuff={}) => {
    try {
      return store({ ...load(), ...newStuff });
    } catch (e) {
      return void console.error(`Error loading from storage: ${e}`);
    }
  }
}
