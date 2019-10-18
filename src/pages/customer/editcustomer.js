import React from "react"
import CustomerForm from "./addcustomer"

const EditCustomerPage = ({ history, match }) => {
	return (
		<div>
			<CustomerForm match={match} />
		</div>
	)
}

export default EditCustomerPage
