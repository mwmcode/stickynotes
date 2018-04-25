import React from 'react';
import Draggable from 'react-draggable';
import {
	shape,
	number,
	string,
	func,
} from 'prop-types';
import { EmojiIcon } from './reuseables';
import { ThemeContext } from './Board';

import './Note.css';


export default class Note extends React.Component {

	noteRef = React.createRef();

	// calls passed functions
	update = note => this.props.updateFn(note);
	remove = () => this.props.removeFn(this.props.note.id);

	onDragStop = () => {
		const { note } = this.props;
		const { x, y } = this.noteRef.current.getBoundingClientRect();
		const margin = Number.parseInt(note.style.margin, 10); // get number out of string i.e. 4px -> 4

		const newNote = {
			...note,
			position: {
				position: 'fixed',
				top: `${y - margin}px`,
				left: `${x - margin}px`,
			},
		};

		this.update(newNote);
	};

	onNoteChange = () => {
		const text = this.noteRef.current.value;
		const newNote = { ...this.props.note, body: text };

		this.update(newNote);
	};


	render() {
		const { note } = this.props;

		return (
			<ThemeContext.Consumer>
				{({ defaultNoteStyle }) =>
					<Draggable
						position={{ x: 0, y: 0 }}
						onStop={this.onDragStop}
						enableUserSelectHack={false}
					>
						<div style={{...note.position}}>
							<div
								style={{ ...defaultNoteStyle, ...note.style }}
								className='note-box'
							>
								<EmojiIcon
									className='red-circle-emoji'
									aria-label='red circle emoji'
								>
									🔴
								</EmojiIcon>

								<textarea
									autoFocus
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
					</Draggable>
				}
			</ThemeContext.Consumer>
		);
	}
}

Note.propTypes = {
	updateFn: func,
	removeFn: func,
	note: shape({
		id: number,
		body: string,
		style: shape({}),
		createdAt: string,
	}),
};

Note.defaultProps = {
	updateFn: () => { },
	removeFn: () => { },
	note: {
		id: 0,
		body: '',
		createdAt: '',
	},
};
