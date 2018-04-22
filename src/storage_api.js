import {
  STORAGE_KEY,
  DEFAULT_STORAGE_STATE,
} from './CONSTANTS';

function store(obj=DEFAULT_STORAGE_STATE) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch (e) {
    console.error(`Couldn't store ${obj} to localStorage`);
  }
  return obj;
}

//
// Exposed
// -------
export function load() {
  const result = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return result || store(); // init load, store default state
}

export function save(obj) {
  try {
    return store({...load(), ...obj});
  } catch (e) {
    return void console.error(`Couldn't save to localStorage::${STORAGE_KEY}! ${e}`);
  }
}

