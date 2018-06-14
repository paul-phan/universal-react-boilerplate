__webpack_public_path__ = '/assets/'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, Subscribe } from 'unstated-x'

import App from './components/App'


console.log(11111)
ReactDOM.hydrate(<App />, window.root)
if (module.hot) {
	module.hot.accept()
	// module.hot.dispose(() => {
	// 	console.log('do something to force update')
	// })
}