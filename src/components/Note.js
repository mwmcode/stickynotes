/* eslint no-return-assign:0 */
import React from 'react';
import {
	shape,
	number,
	string,
	func,
} from 'prop-types';
import { ThemeContext } from './Board';
import { EmojiIcon } from './reuseables';

import './Note.css';

const getInt = strVal => Number.parseInt(strVal, 10);

export default class NoteCard extends React.Component {
  isDragging   = false;
  previousTop  = 0;
  previousLeft = 0;

  // prop functions
	update = note => this.props.updateFn(note);
  remove = () => this.props.removeFn(this.props.note.id);

  updatePreviousTopLeft = evt => {
    this.previousTop = evt.pageY;
    this.previousLeft = evt.pageX;
  };

  extractPositionDelta = evt => {
    const delta = {
      top: evt.pageY - this.previousTop,
      left: evt.pageX - this.previousLeft,
    };
    
    this.updatePreviousTopLeft(evt);

    return delta;
  };
  
  onDown = evt => {
    this.isDragging = true;
    evt.target.setPointerCapture(evt.pointerId);
    // We store the initial coordinates to be able 
    // to calculate the changes later on.
    this.updatePreviousTopLeft(evt);
  };

  onMove = evt => {
    if (!this.isDragging) {
      return;
    }
    const { note } = this.props;
    const noteTop  = getInt(note.position.top);
    const noteLeft = getInt(note.position.left);
    const delta    = this.extractPositionDelta(evt);
    
    const newNote = {
			...note,
			position: {
        ...note.position,
        top: `${noteTop + delta.top}px`,
        left: `${noteLeft + delta.left}px`,
			},
		};

		this.update(newNote);
  };

  onUp = () => this.isDragging = false;

  render() {
    const { note } = this.props;
    
    return (
      <ThemeContext.Consumer>
        {({ defaultNoteStyle }) =>
          <div style={{...note.position}}>
            <div
              style={{ ...defaultNoteStyle, ...note.style }}
              className='note-box'
              onPointerDown={this.onDown}
              onPointerMove={this.onMove}
              onPointerUp={this.onUp}
              onPointerCancel={this.onUp}
            >
              <EmojiIcon
                className='red-circle-emoji'
                aria-label='red circle emoji'
              >
                🔴
              </EmojiIcon>

              <textarea
                onBlur={this.onNoteChange}
                className='note-textarea'
                defaultValue={note.body}
                ref={this.noteRef}
              />

              <EmojiIcon
                onClick={this.remove}
                title='remove note'
                aria-label='waste can emoji'
                className='waste-can-emoji'
              >
                🗑
              </EmojiIcon>

              <span className='note-createdat'>
                {note.createdAt}
              </span>
            </div>
          </div>
        }
      </ThemeContext.Consumer>
    );
  }
}

NoteCard.propTypes = {
	updateFn: func,
	removeFn: func,
	note: shape({
		id: number,
		body: string,
		style: shape({}),
		createdAt: string,
	}),
};

NoteCard.defaultProps = {
	updateFn: () => { },
	removeFn: () => { },
	note: {
		id: 0,
		body: '',
		createdAt: '',
	},
};


// from: https://codesandbox.io/s/q83r7nrwv6
