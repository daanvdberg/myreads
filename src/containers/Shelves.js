import React, { Component } from 'react';
import { Dimmer, Divider, Loader, Segment } from 'semantic-ui-react';
import { getAll } from '../BooksAPI';
import BookList from '../components/BookList';

const shelves = [
	{ key: 'wantToRead', title: 'Want to Read' },
	{ key: 'currentlyReading', title: 'Currently Reading' },
	{ key: 'read', title: 'Read' }
];

class Shelves extends Component {

	state = {
		loadingBooks: false,
		wantToRead: [],
		currentlyReading: [],
		read: []
	};

	componentDidMount() {
		this.updateBookList();
	}

	/**
	 * @description Call getAll API to update the page with the user's list of books
	 */
	updateBookList = () => {
		this.setState({
			loadingBooks: true
		});
		getAll().then(res => {
			this.setState({
				wantToRead: res.filter(n => n.shelf === 'wantToRead'),
				currentlyReading: res.filter(n => n.shelf === 'currentlyReading'),
				read: res.filter(n => n.shelf === 'read')
			}, () => {
				this.setState({
					loadingBooks: false
				});
			});
		});
	};

	render() {
		const { loadingBooks } = this.state;
		return (
			<div className='shelves'>
				{shelves.map((s) => {
					const count = this.state[s.key].length;
					console.log(count);
					return (
						<Segment
							key={s.key}
							basic
							className='shelf'
						>
							<Dimmer active={loadingBooks} inverted>
								<Loader>Loading</Loader>
							</Dimmer>
							<h3>
								{s.title}
								{(count === 1) ? (
									<small>{' — (' + count + ' Book)'}</small>
								) : (
									<small>{' — (' + count + ' Books)'}</small>
								)}
							</h3>
							<Divider />
							<BookList
								books={this.state[s.key]}
								updateBookList={this.updateBookList}
							/>
						</Segment>
					)
				})}
			</div>
		);
	}
}

export default Shelves;