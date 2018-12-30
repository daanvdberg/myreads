import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Dimmer, Dropdown, Icon, Image, Loader } from 'semantic-ui-react';
import { update } from '../BooksAPI';

const shelfOptions = [
	{ key: 'w', text: 'Want to Read', value: 'wantToRead' },
	{ key: 'c', text: 'Currently Reading', value: 'currentlyReading' },
	{ key: 'r', text: 'Read', value: 'read' },
	{ key: 'n', text: 'None', value: 'none' }
];

class BookItem extends Component {

	state = {
		updatingBook: false,
		activeShelf: 'none'
	};

	componentDidMount() {
		const { shelf } = this.props.book;
		let shelfValue = 'none';
		if (shelf) {
			shelfValue = shelf;
		}
		const activeShelf = shelfOptions[shelfOptions.findIndex((n) => n.value === shelfValue)];
		this.setState({ activeShelf });
	}

	/**
	 * @description Handle the moving of a book to another shelf
	 * @param option
	 */
	handleChange = (option) => {
		this.setState({
			updatingBook: true
		});
		update(this.props.book, option.value)
			.then(() => {
				this.props.updateBookList();
				this.setState({
					activeShelf: option
				}, () => {
					this.setState({
						updatingBook: false
					});
				});
			});
	};

	render() {
		const { book } = this.props;
		const { updatingBook, activeShelf } = this.state;
		return (
			<Card className='book'>
				<Dimmer active={updatingBook} inverted>
					<Loader size='small'>Loading</Loader>
				</Dimmer>
				<div className='book-image'>
					{(book.imageLinks) ? (
						<Image
							fluid
							src={book.imageLinks.thumbnail}
							alt={book.title}
						/>
					) : (
						<Icon
							name='image'
							size='huge'
							color='grey'
						/>
					)}
				</div>
				<Card.Content>
					<Card.Header>
						{book.title}
					</Card.Header>
					<Card.Meta>
						{book.authors &&
						book.authors.map((n) => (
							<span key={n.replace(/\s+/g, '-').toLowerCase()}>{n}</span>
						))
						}
					</Card.Meta>
				</Card.Content>
				<Card.Content extra>
					<Dropdown
						text={activeShelf.text}
						icon='bookmark'
						floating
						labeled
						button
						className='icon'
						value={activeShelf.value}
					>
						<Dropdown.Menu>
							<Dropdown.Header
								icon='location arrow'
								content='Move to shelf...'
							/>
							<Dropdown.Divider />
							{shelfOptions.map((n) => (
								<Dropdown.Item
									key={n.key}
									value={n.value}
									disabled={n.value === activeShelf.value}
									onClick={() => this.handleChange(n)}
								>
									{n.value === activeShelf.value &&
									<Icon
										size='small'
										color='teal'
										name='check'
									/>
									}
									{n.text}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
				</Card.Content>
			</Card>
		);
	}
};

BookItem.propTypes = {
	book: PropTypes.object.isRequired
};

export default BookItem;