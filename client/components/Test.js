import React from 'react'

export default class Test extends React.Component {
	state = {
		test: () => null
	}

	componentDidMount() {
		import('./Test1.js').then(module => {
			console.log(module)
			this.setState({ test: module.default })
		})
		import(/* webpackChunkName: "unstated" */ 'unstated-x').then(module => {
			console.log('unstated', module)
		})
	}
	render() {
		const Test = this.state.test
		return (
			<div>
				Test.........
				<Test />
			</div>
		)
	}
}
