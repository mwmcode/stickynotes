import React from 'react';
import './Board.css';
import Note from './Note';
import * as storage from '../storage_api';


export default class NotesBoard extends React.Component {
	state = {
		notes: [],
		catchedError: false,
	};

	componentDidMount() {
		// listen to ctr+enter to add new
		document.addEventListener('keydown',this.keydownHandler);
		// load notes
		const notes = storage.getNotes();
		this.setState({ notes });
	}

  componentWillUnmount() {
		// not really needed here ...but just to enforce practice
    document.removeEventListener('keydown',this.keydownHandler);
	}

	componentDidCatch(err, info) {
		console.error(err);
		console.info(info);
    this.setState({ catchedError: true });
  }

	// ctr + enter
	keydownHandler = evt => {
		if ( evt.keyCode === 13 && evt.ctrlKey ) {
			this.addNewNote();
		}
	};

	addNewNote = () => {
		const datetimestamp = Date.now();
		const note = {
			id: datetimestamp,
			body: '',
			style: {},
			createdAt: new Date(datetimestamp).toLocaleString()
		};

		this.saveNotes([...this.state.notes, note]);
	};

	updateNote = updatedNote => {
		const newNotes = this.state.notes.map(note => (note.id === updatedNote.id) ? updatedNote : note);

		this.saveNotes(newNotes);
	};

	removeNote = id  => {
		const notes = this.state.notes.filter( note => note.id !== id);

		this.saveNotes(notes);
	};

	saveNotes = notes => {
		this.setState(
			() => ({ notes }),
			() => storage.saveNotes(notes)
		);
	};

	render() {
		const {
			notes,
			catchedError,
		} = this.state;

		if ( catchedError ) {
			return <span>Ops! Something went wrong :(</span>
		}

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
					title='new note'
					className='add-note-btn'
					onClick={this.addNewNote}
				>
					&#43;
				</button>

				<button
					title='settings'
					className='settings-btn'
				>
					&#402;
				</button>
			</div>
		);
	}
}
