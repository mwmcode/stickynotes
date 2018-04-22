import React from 'react';
import Draggable from 'react-draggable';
import {
	shape,
  number,
	string,
	func,
} from 'prop-types';
import { ThemeContext } from './Board';
import {
	NOTE_MARGIN,
} from '../CONSTANTS';

 import './Note.css';


export default class Note extends React.Component {

	noteRef = React.createRef();

	componentDidMount() {
		// this.style = {
		// 	right: this.randomBetween(0, window.innerWidth - 150) + 'px',
		// 	top: this.randomBetween(0, window.innerHeight - 150) + 'px',
		// 	transform: 'rotate('+ this.randomBetween(-15, 15) +'deg)',
		// };
	}

	// calls passed functions
	update = note => this.props.updateFn(note);
	remove = () => this.props.removeFn(this.props.note.id);

	onDragStop = () => {
		const { x, y } = this.noteRef.current.getBoundingClientRect();

		const newNote = {
			...this.props.note,
			style: {
				...this.props.note.style,
				position: 'fixed',
				top: `${y - NOTE_MARGIN}px`,
				left: `${x - NOTE_MARGIN}px`,
			},
		};

		this.update(newNote);
	};

	onNoteChange = () => {
		const text = this.noteRef.current.value;
		const newNote = {...this.props.note, body: text };

		this.update(newNote);
	};


	render() {
		const { note } = this.props;

		return (
			<ThemeContext.Consumer>
				{ ({ style }) =>
					<Draggable
						position={{x:0, y:0}}
						onStop={this.onDragStop}
						enableUserSelectHack={false}
					>
						<div
							style={{...style, ...note.style}}
							className='note-box'
						>
							<textarea
								autoFocus
								onBlur={this.onNoteChange}
								className='note-textarea'
								defaultValue={note.body}
								ref={this.noteRef}
							/>
							<button
								title='remove'
								className='remove-note-btn'
								onClick={this.remove}
							>
								&#8212;
							</button>
							<span className='note-createdat'>
								{note.createdAt}
							</span>
							{/* <button className='note-settings-btn'>
								&#8230;
							</button> */}
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
	updateFn: () => {},
	removeFn: () => {},
	note: {
		id: 0,
		body: '',
		createdAt: '',
	},
};
