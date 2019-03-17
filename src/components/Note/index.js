/* eslint no-return-assign:0 */
import React from 'react';
import debounce from 'just-debounce-it';
import {
	shape,
	number,
	string,
  func,
  object,
} from 'prop-types';
import { EmojiIcon } from 'reuseables';
import { ThemeContext } from 'CONSTANTS';
import {
  getInt,
} from 'helpers';

import './styles.css';


export default class NoteCard extends React.Component {
  isDragging   = false;
  previousTop  = 0;
  previousLeft = 0;
  noteRef      = React.createRef();

  // prop functions
	update = note => this.props.updateFn(note);
  remove = () => this.props.removeFn(this.props.note.id);

  onNoteChange = () => {
		const text = this.noteRef.current.value;
		const newNote = { ...this.props.note, body: text };
		this.update(newNote);
	};

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
          <div style={{...note.position}} data-testid='ti-note-box' >
            <div
              className='note-box'
              onPointerUp={this.onUp}
              onPointerDown={this.onDown}
              onPointerMove={this.onMove}
              onPointerCancel={this.onUp}
              style={{ ...defaultNoteStyle, ...note.style }}
            >
              <EmojiIcon className='red-circle-emoji' aria-label='red circle emoji'>
                🔴
              </EmojiIcon>

              <textarea
                ref={this.noteRef}
                className='note-textarea'
                defaultValue={note.body}
                onBlur={this.onNoteChange}
                onChange={debounce(this.onNoteChange, 1000)}
              />

              <EmojiIcon
                onClick={this.remove}
                title='remove note'
                aria-label='waste can emoji'
                className='waste-can-emoji'
                data-testid='ti-remove-btn'
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
		style: object,
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


// credit: https://codesandbox.io/s/q83r7nrwv6
