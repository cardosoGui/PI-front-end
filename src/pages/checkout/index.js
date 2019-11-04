import React, { useState } from 'react'
import { Grid, Paper } from '@material-ui/core'

const CheckoutPage = () => {
	const [ step, setStep ] = useState(0)
	const StepOne = () => {
		return (
			<Paper>
				<Grid container xs={6} style={{ height: '60vh' }} />
			</Paper>
		)
	}
	return (
		<Grid container xs={12} justify="center" alignItems="center" style={{ height: '100vh' }}>
			{step === 0 && <StepOne />}
		</Grid>
	)
}

export default CheckoutPage
