import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';

class SearchForm extends Component {

	state = {
		term: null
	};

	/**
	 * @description Take search query from URL and add to state
	 */
	componentDidUpdate() {
		if (this.props.searchQuery !== '' && isNull(this.state.term)) {
			this.setState(() => ({
				term: this.props.searchQuery
			}));
		}
	}

	/**
	 * @description Call search API by passing the search term to function in Search.js
	 */
	handleSubmit = () => {
		if (this.state.term.length > 2) {
			this.props.handleBookSearch(this.state.term);
		}
	};

	/**
	 * @description Put entered search term in state and trigger handleSubmit()
	 * @param {object} e - DOM input event from search field
	 * @param {String} value - The string entered into the search field
	 */
	handleSearchInput = (e, { value }) => {
		this.setState({
			term: value
		}, () => {
			this.handleSubmit();
		});
	};

	render() {
		const { searchPending } = this.props;
		const { term } = this.state;
		return (
			<Form
				onSubmit={this.handleSubmit}
				loading={searchPending}
			>
				<Form.Group inline>
					<label>
						Search Books
					</label>
					<Form.Input
						width={10}
						type='search'
						placeholder='Enter Search Term...'
						name='search'
						value={term || ''}
						onChange={this.handleSearchInput}
					/>
				</Form.Group>
			</Form>
		);
	}
}


SearchForm.propTypes = {
	searchPending: PropTypes.bool,
	searchQuery: PropTypes.string.isRequired
};

export default SearchForm;