import React, { useMemo } from 'react'
import HomePage from './pages/HomePage'

import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './layout/css/App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PanelPage from './pages/panel/PanelPage'
import Dashboard from './layout/Dashboard'
import ProductsPage from './pages/panel/products'
import ProductsForm from './components/forms/ProductsForm'
import ProductsEdit from './pages/panel/products/editproduct'
import DetailsProduct from './components/DetailsProduct'
import CustomerForm from './pages/customer/addcustomer'
import CustomerPage from './pages/customer'
import EditCustomerPage from './pages/customer/editcustomer'
import CheckoutPage from './pages/checkout'

function App({ key }) {
	const history = useMemo(() => createBrowserHistory(), [])

	const Products = () => (
		<Dashboard>
			<ProductsPage />
		</Dashboard>
	)
	const ProductsAdd = () => (
		<Dashboard>
			<ProductsForm />
		</Dashboard>
	)

	return (
		<Router history={history}>
			{/* <SnackbarProvider maxSnack={3} autoHideDuration={2000}> */}
			{/* <Route path="/login" exact component={LoginPage} /> */}
			{/* <Route path="/register" exact component={RegisterPage} /> */}
			<Route path="/" exact component={HomePage} />
			<Route path="/login" exact component={LoginPage} />
			<Route path="/register" exact component={RegisterPage} />
			<Route path="/painel" exact component={PanelPage} />
			<Route path="/products" exact component={Products} />
			<Route path="/customers" exact component={CustomerPage} />
			<Route path="/products/add" exact component={ProductsAdd} />
			<Route path="/products/details/:id" exact component={DetailsProduct} />
			<Route path="/customer/register" exact component={CustomerForm} />
			<Route path="/customer/edit/:id" exact component={EditCustomerPage} />

			<Route path="/products/edit/:productId" exact component={ProductsEdit} />
			<Route path="/checkout" exact component={CheckoutPage} />

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
