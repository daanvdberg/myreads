import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import BookItem from './BookItem';

const BookList = (props) => (
	<Grid doubling columns={4}>
		{props.books.map((book) => (
			<Grid.Column key={book.id}>
				<BookItem
					book={book}
					updateBookList={props.updateBookList}
				/>
			</Grid.Column>
		))}
	</Grid>
);

BookList.propTypes = {
	books: PropTypes.array.isRequired
};

export default BookList;