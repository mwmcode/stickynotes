import React from 'react';
import Draggable from 'react-draggable';
import { shape, number, string, func } from 'prop-types';
import './Note.css';


export default class Note extends React.Component {

	// componentWillMount() {
	// 	this.style = {
	// 		right: this.randomBetween(0, window.innerWidth - 150) + 'px',
	// 		top: this.randomBetween(0, window.innerHeight - 150) + 'px',
	// 		transform: 'rotate('+ this.randomBetween(-15, 15) +'deg)',
	// 	};
	// }
	handleStop = (e, {x, y}) => {
		const { note, updateFn } = this.props;

		const prop = {
			defaultPosition: {x, y}
		};

		updateFn(note.id, prop);
  };

	onBlur = () => {
		const { note, updateFn } = this.props;

		note.body = this.txt.value;

		updateFn(note);
	};


	render() {
		const { note, removeFn } = this.props;

		return (
			<Draggable
				onStop={this.handleStop}
				defaultPosition={note.defaultPosition}
			>
				<div
					style={note.style}
					className='note-box'
				>
					<textarea
						autoFocus
						onBlur={this.onBlur}
						className='note-textarea'
						defaultValue={note.body}
						ref={txt => {this.txt = txt}}
					/>
					<button
						title='remove'
						className='remove-note-btn'
						onClick={() => removeFn(note.id)}
					>
						&#8212;
					</button>
				</div>
			</Draggable>
    );
	}
}

Note.propTypes = {
	updateFn: func,
	removeFn: func,
	note: shape({
		id: number,
		body: string,
		style: shape({})
	})
};

Note.defaultProps = {
	updateFn: () => {},
	removeFn: () => {},
	note: {
		id: 0,
		body: ''
	},
};
