import React from 'react';
import { shape, number, string, func } from 'prop-types';
import './Note.css';


export default class Note extends React.Component {

	componentWillMount() {
		// this.style = {
		// 	right: this.randomBetween(0, window.innerWidth - 150) + 'px',
		// 	top: this.randomBetween(0, window.innerHeight - 150) + 'px',
		// 	transform: 'rotate('+ this.randomBetween(-15, 15) +'deg)',
		// };
	}

	render() {
		const { note, onSave, onRemove } = this.props;

		return (
			<div
				className='note-box'
				style={ this.style }
			>
				<textarea
					autoFocus
					className='note-textarea'
					defaultValue={note.body}
					ref={txt => {this.txt = txt}}
					onBlur={()=>onSave(this.txt.value, note.id)}
				/>
				<button
					title='remove'
					className='remove-note-btn'
					onClick={() => onRemove(note.id)}
				>
					&#8212;
				</button>
			</div>
    );
	}
}

Note.propTypes = {
	onSave: func,
	onRemove: func,
	note: shape({
		id: number,
		body: string
	})
};

Note.defaultProps = {
	onSave: () => {},
	onRemove: () => {},
	note: {
		id: 0,
		body: ''
	},
};
