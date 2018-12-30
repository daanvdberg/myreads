import React from 'react';
import { Container, Icon, Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

const Navigation = (props) => (
	<Menu fixed='top'>
		<Container>

			<Menu.Item as='div' header>
				<Icon name='book' />
				MyReads
			</Menu.Item>

			<Menu.Item
				as='div'
				active={props.location.pathname === '/'}
			>
				<Link to='/'>My Books</Link>
			</Menu.Item>

			<Menu.Item
				as='div'
				active={props.location.pathname === '/search'}
			>
				<Link to='/search'>Search</Link>
			</Menu.Item>

		</Container>
	</Menu>
);

export default withRouter(Navigation);