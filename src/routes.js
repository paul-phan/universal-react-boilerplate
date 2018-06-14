import Home from './components/Home'
import Grid from './components/Grid'
import { fetchPopularRepos } from './helpers/api'

const routes = [
	{
		path: '/',
		exact: true,
		component: Home
	},
	{
		path: '/popular/:id',
		component: Grid,
		fetchInitialData: (path = '') => {
			console.log(path)
			return fetchPopularRepos(path.split('/').pop())
		}

	}
]

export default routes
