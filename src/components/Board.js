import React from 'react';
import extend from 'just-extend';
import Note from './Note';
import './Board.css';


export default class NotesBoard extends React.Component {
	state = {
		notes: [],
	};

	componentDidMount() {
		document.addEventListener('keydown',this.keydownHandler);
		const notes = JSON.parse(localStorage.getItem('ME_NOTES'));
		this.setState({ notes });
	}

  componentWillUnmount() {
    document.removeEventListener('keydown',this.keydownHandler);
	}


	keydownHandler = evt => {
		if ( evt.keyCode === 13 && evt.ctrlKey ) {
			this.addNewNote();
		}
	};

	addNewNote = () => {
		const note = {
			id: Date.now(),
			body: '',
			style: {}
		};

		this.saveNotes([...this.state.notes, note]);
	};

	updateNote = (id, updatedProp) => {
		const notes = this.state.notes.map( note => {
			if ( note.id === id ) {
				extend(note, updatedProp);
				console.info('updated note ', note);
			}
			return note;
		});

		this.saveNotes(notes);
	};

	removeNote = id  => {
		const notes = this.state.notes.filter( note => note.id !== id);

		this.saveNotes(notes);
	};

	saveNotes = notes => {
		this.setState({ notes });
		localStorage.setItem('ME_NOTES', JSON.stringify(notes));
		// chrome.storage.local.set({notes: arr}, function () {

	  //       self.setState({notes: arr});
		// });
		console.log('note : ', this.state.notes);
	};

	render() {
		const { notes } = this.state;

		return (
			<div className='notes-board' >
				{notes.map( note =>
					<Note
						key={note.id}
						note={note}
						updateFn={this.updateNote}
						removeFn={this.removeNote}
					/>
				)}

				<button
					className='add-note-btn'
					onClick={this.addNewNote}
				>
				ADD NOTE
				</button>
			</div>
		);
	}
}
