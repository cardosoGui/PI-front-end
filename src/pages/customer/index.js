import React from "react"
import UserItem from "../../components/UserItem"
import { Grid, List } from "@material-ui/core"

const CustomerPage = () => {
	const customers = JSON.parse(localStorage.getItem("customer"))
	return (
		<Grid container xs={12}>
			<List>
				{customers.map(user => (
					<Grid item xs={12}>
						<UserItem user={user} />
					</Grid>
				))}
			</List>
		</Grid>
	)
}

export default CustomerPage
