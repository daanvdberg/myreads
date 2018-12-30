import React, { Component } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import SearchForm from '../components/SearchForm';
import { getAll, search } from '../BooksAPI';
import { isEmpty, debounce } from 'lodash';
import SearchResults from '../components/SearchResults';

class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			savedBooks: [],
			searchPending: false,
			searchResult: [],
			searchQuery: ''
		};

		this.handleBookSearch = debounce(this.handleBookSearch, 1000);
	}

	componentDidMount() {
		getAll().then(res => {
			this.setState({
				savedBooks: res
			}, () => this.queryBasedSearch());
		});
	}

	/**
	 * @description Get query from URL, set to state and trigger a new search
	 */
	queryBasedSearch = () => {
		const values = queryString.parse(this.props.location.search);
		if (!isEmpty(values.query)) {
			this.setState({
				searchQuery: values.query
			}, () => this.handleBookSearch(values.query));
		}
	};

	/**
	 * @description Use the passed query to do a request to the search API after adding the query to the URL
	 * @param query
	 */
	handleBookSearch = (query) => {
		this.setState({
			searchPending: true
		});

		this.props.history.push({
			pathname: '/search',
			search: '?' + new URLSearchParams({ query: query }).toString()
		});

		search(query).then((res) => {
			let results = res;
			if (!res.error) {
				results = res.map(r => {
					let result = r;
					let match = this.state.savedBooks.find(b => b.id === r.id);
					if (match) {
						result.shelf = match.shelf;
					}
					return result;
				});
			}
			this.setState({
				searchResult: results,
				searchPending: false
			});
		});
	};

	render() {
		const { searchPending, searchResult, searchQuery } = this.state;
		const { location } = this.props;
		return (
			<div>
				<SearchForm searchPending={searchPending}
				            handleBookSearch={this.handleBookSearch}
				            searchQuery={searchQuery} />
				<SearchResults location={location}
				               searchResult={searchResult}
				               queryBasedSearch={this.queryBasedSearch} />
			</div>
		);
	}
}

export default withRouter(Search);