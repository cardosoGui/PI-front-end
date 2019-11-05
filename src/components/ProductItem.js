import React from "react"

const ProductItem = ({ product }) => {
	return (
		<div>
			<ul>
				<li>nome: {product.name}</li>
				<li>descrição{product.description}</li>
				<li>quantidade{product.quantity}</li>
				<li>preço{product.price}</li>
			</ul>
		</div>
	)
}

export default ProductItem
