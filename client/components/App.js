import React from 'react'

export default class App extends React.Component {
	state = {
		count: 0,
		test: () => null
	}

	up = () => {
		this.setState(({ count }) => {
			console.log(count)
			return {
				count: count + 1
			}
		})
	}

	componentDidMount() {
		import('./Test.js').then(module => {
			console.log(module)
			this.setState({ test: module.default })
		})
	}

	render() {
		const Test = this.state.test
		return (
			<div>
				{this.state.count}
				<button onClick={this.up}>2222222222</button>
				<Test />
			</div>
		)
	}
}
