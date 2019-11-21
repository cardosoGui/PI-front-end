import React, { useState, useEffect } from "react"
import { Grid, Paper, List } from "@material-ui/core"
import ProductsContainer from "../../containers/ProductsContainer"
import ProductList from "../../components/ProductList"

const CheckoutPage = ({ history }) => {
	const [step, setStep] = useState(0)

	const StepOne = ({ products }) => {
		return (
			<Paper>
				<List>
					{products.map((item, key) => (
						<Grid xs={12}>
							<ProductList product={item} history={history} />
						</Grid>
					))}
				</List>
			</Paper>
		)
	}
	return (
		<Grid container alignItems="center" justify="center" xs={12}>
			<Grid xs={6} item alignItems="center" style={{ marginTop: "6em" }}>
				<ProductsContainer>
					{products => {
						return (
							<div>
								{products && step === 0 && (
									<StepOne products={products} />
								)}
							</div>
						)
					}}
				</ProductsContainer>
			</Grid>
		</Grid>
	)
}

export default CheckoutPage
