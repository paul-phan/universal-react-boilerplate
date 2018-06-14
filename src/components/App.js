import React, { Component } from 'react'
import routes from '../routes'
import { Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import NoMatch from './NoMatch'
import styled from 'styled-components'

// language=SCSS
const Div = styled.div`
	background-color: #3a8ba2;
`

export default class App extends Component {
	render() {
		return (
			<Div>
				<Navbar />

				<Switch>
					{routes.map(({ path, exact, component: C, ...rest }) => (
						<Route
							key={path}
							path={path}
							exact={exact}
							render={props => <C {...props} {...rest} />}
						/>
					))}
					<Route render={props => <NoMatch {...props} />} />
				</Switch>
			</Div>
		)
	}
}
