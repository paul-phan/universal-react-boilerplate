__webpack_public_path__ = '/assets/'
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

hydrate(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
)

if (module.hot) {
	module.hot.accept()
	// module.hot.dispose(() => {
	// 	console.log('do something to force update')
	// })
}