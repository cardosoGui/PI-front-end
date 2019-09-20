const toCurrency = (value = 0, currency = "BRL") => {
	value /= 100
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency
	}).format((value || 0).toString().replace(/,/g, ""))
}

export default toCurrency
