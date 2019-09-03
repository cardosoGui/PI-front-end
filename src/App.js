import React, { useMemo } from "react"
import HomePage from "./pages/HomePage"
import { Router, Route } from "react-router-dom"
import { createBrowserHistory } from "history"

function App({ key }) {
	const history = useMemo(() => createBrowserHistory(), [])

	return (
		<Router history={history}>
			{/* <SnackbarProvider maxSnack={3} autoHideDuration={2000}> */}
			{/* <Route path="/login" exact component={LoginPage} /> */}
			{/* <Route path="/register" exact component={RegisterPage} /> */}
			<Route path="/" exact component={HomePage} />
			{/* <Route path="/produtos" exact component={VideosPage} />
				<Route path="/produtos/add" exact component={AddVideo} />
				<Route
					path="/produtos/edit/:productId"
					exact
					component={EditVideo}
				/>

				<Route path="/users" exact component={UsersPage} />
				<Route path="/users/edit/:userId" exact component={EditUser} />

				<Route path="/categories" exact component={CategoriesPage} />
				<Route path="/categories/add" exact component={CategoriesAdd} />
				<Route
					path="/categories/edit/:id"
					exact
					component={CategoryEdit}
				/> */}
			{/* </SnackbarProvider> */}
		</Router>
	)
}

export default App
