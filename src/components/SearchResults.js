import React from 'react';
import queryString from 'query-string';
import { Divider } from 'semantic-ui-react';
import BookList from './BookList';

const SearchResults = (props) => {
	const searchQuery = queryString.parse(props.location.search).query;
	return (
		<div className='search-results-header'>
			{searchQuery &&
				<div>
					<h3>Search Results for: <i>{searchQuery}</i></h3>
					<Divider />
				</div>
			}
			{(props.searchResult.error && props.searchResult.error === 'empty query') ? (
				<span>Couldn't find any books... Please adjust your search terms.</span>
			) : (
				<BookList
					books={props.searchResult}
					updateBookList={props.queryBasedSearch}
				/>
			)}

		</div>
	);
};

export default SearchResults;