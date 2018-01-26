import React from 'react';
import Note from './Note';
import './Board.css';


export default class NotesBoard extends React.Component {
	state = { notes: [] };

	saveNotes = notes => {
		this.setState({ notes });
		// chrome.storage.local.set({notes: arr}, function () {

	  //       self.setState({notes: arr});
		// });
	};

	addNewNote = text => {
		const note = { id: Date.now(), body: text };

		this.saveNotes([...this.state.notes, note]);
	};

	updateNote = (body, id) => {
		const notes = this.state.notes.map( note => {
			if ( note.id === id ) {
				note.body = body;
			}
			return note;
		});

		this.saveNotes(notes);
	};

	removeNote = id  => {
		const notes = this.state.notes.filter( note => note.id !== id);

		this.saveNotes(notes);
	};

	render() {
		const { notes } = this.state;

		return (
			<div className='notes-board'>
				{notes.map( note =>
					<Note
						key={note.id}
						note={note}
						onChange={this.updateNote}
						onRemove={this.removeNote}
					/>
				)}

				<button
					className='add-note-btn'
					onClick={() => this.addNewNote('')}
				>
				ADD NOTE
				</button>
			</div>
		);
	}
}
