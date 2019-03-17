import {
  DEFAULT_STORAGE_STATE,
} from 'CONSTANTS';

export const ThemeContextMockValue = {
  defaultNoteStyle: DEFAULT_STORAGE_STATE.noteStyle,
  defaultBoardStyle: DEFAULT_STORAGE_STATE.boardStyle,
  updateNoteStyle: jest.fn(),
  updateBoardStyle: jest.fn(),
};
