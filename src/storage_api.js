const STORAGE_KEY = '__STICKYNOTES__V2__';


export function getNotes() {
  const notes = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return notes || [];
}


export function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return true;
  } catch (e) {
    console.error(`Couldn't save to localStorage::${STORAGE_KEY}! ${e}`);
    return false;
  }
}


