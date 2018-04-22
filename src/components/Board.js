import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Note from './Note';
import SettingsPanel from './SettingsPanel';
import * as storage from '../storage_api';
import {
	createNote,
} from '../helpers';
import {
	DEFAULT_STORAGE_STATE,
} from '../CONSTANTS';

import './Board.css';


export const ThemeContext = React.createContext();

export default class NotesBoard extends React.Component {
	state = {
		...DEFAULT_STORAGE_STATE,
		toggleSettings: false,
		catchedError: false,
	};

	componentDidMount() {
		// listen to ctr+enter to add new
		document.addEventListener('keydown',this.keydownHandler);
		// load storage state
		const storageState = this.getFromStore();
		this.setState(
			prevState => ({...prevState, ...storageState})
		);
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

	// storage api calls
	saveToStore = obj => {
		this.setState(
		 	prevState => ({...prevState, ...obj}),
			() => storage.save(obj)
		)
	};

	getFromStore = () => {
		const storageState = storage.load();
		this.setState(storageState);
	};

	toggleSettings = () => this.setState({toggleSettings: !this.state.toggleSettings});

	updateNoteStyle = (newProp={}) => {
		const updatedProps = {
			...this.state.noteStyle,
			...newProp
		};
		this.saveToStore({noteStyle: updatedProps});
	};

	// reSortNotes = () => {
	// 	const removeFixedStyle = note => ({...note, style: {}});
	// 	const updatedNotes = this.state.notes.map(removeFixedStyle);
	// 	this.saveToStore({notes: updatedNotes});
	// }

	keydownHandler = evt => {
		// ctr + enter
		if ( evt.keyCode === 13 && evt.ctrlKey ) {
			this.addNewNote();
		}
	};

	addNewNote = () => {
		const note = createNote();
		this.saveToStore({notes: [...this.state.notes, note]});
	};

	updateNote = updatedNote => {
		const notes = this.state.notes.map(note => (note.id === updatedNote.id) ? updatedNote : note);
		this.saveToStore({notes});
	};

	removeNote = id  => {
		const notes = this.state.notes.filter(note => note.id !== id);
		this.saveToStore({notes});
	};

	render() {
		const {
			notes,
			noteStyle,
			toggleSettings,
			catchedError,
		} = this.state;

		const noteBoxes = notes.map( note =>
			<Note
				key={note.id}
				note={note}
				updateFn={this.updateNote}
				removeFn={this.removeNote}
			/>
		);

		if ( catchedError ) {
			return <span>Ops! Something went wrong :(</span>
		}

		return (
			<div className='notes-board' >
				<ThemeContext.Provider
					value={{
						style: noteStyle,
						update: this.updateNoteStyle
					}}
				>
					<ReactCSSTransitionGroup
						transitionName='note'
						transitionAppear
						transitionEnter
						transitionAppearTimeout={500}
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}
					>
						{noteBoxes}
					</ReactCSSTransitionGroup>

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
						onClick={this.toggleSettings}
					>
						&#402;
					</button>
					<div className={`${toggleSettings ? 'board-settings' : 'hide'}`}>
						<SettingsPanel />
					</div>
				</ThemeContext.Provider>
			</div>
		);
	}
}
