import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import GridList from "@material-ui/core/GridList"

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: "#f8f8f8"
	},
	gridList: {
		width: 1000,
		height: 850
	}
}))

const WineContainer = ({ children }) => {
	const classes = useStyles()

	const image =
		"https://chezfrance.vteximg.com.br/arquivos/ids/163379-230-364/espumante-frances-bourgogne-cremant-da-bourgone-blanc-de-blancs.jpg?v=637021662587330000"

	const wineData = [
		{
			img: image,
			title: "VINHO TINTO CHÂTEAU CABEZAC LE PETIT ARTHUR 2017",
			author:
				"Sua cor brilhante é de um vermelho grená. O nariz é expressivo, com uma primeira nota de vegetação rasteira que evolui para frutas pretas. A boca redonda apresenta taninos fundidos e termina com aromas de ameixa seca, frutas vermelhas e couro.",
			cols: 1
		},
		{
			img: image,
			title: "VINHO TINTO CHÂTEAU",
			author:
				"Sua cor brilhante é de um vermelho grená. O nariz é expressivo, com uma primeira nota de vegetação rasteira que evolui para frutas pretas. A boca redonda apresenta taninos fundidos e termina com aromas de ameixa seca, frutas vermelhas e couro.",
			cols: 1
		},
		{
			img: image,
			title: "VINHO TINTO  LE PETIT ARTHUR 2017",
			author:
				"Sua cor brilhante é de um vermelho grená. O nariz é expressivo, com uma primeira nota de vegetação rasteira que evolui para frutas pretas. A boca redonda apresenta taninos fundidos e termina com aromas de ameixa seca, frutas vermelhas e couro.",
			cols: 1
		},
		{
			img: image,
			title: "VINHO TINTO CHÂTEAU CABEZAC LE PETIT ARTHUR 2017",
			author:
				"Sua cor brilhante é de um vermelho grená. O nariz é expressivo, com uma primeira nota de vegetação rasteira que evolui para frutas pretas. A boca redonda apresenta taninos fundidos e termina com aromas de ameixa seca, frutas vermelhas e couro.",
			cols: 1
		},
		{
			img: image,
			title: "VINHO TINTO CHÂTEAU CABEZAC LE",
			author:
				"Sua cor brilhante é de um vermelho grená. O nariz é expressivo, com uma primeira nota de vegetação rasteira que evolui para frutas pretas. A boca redonda apresenta taninos fundidos e termina com aromas de ameixa seca, frutas vermelhas e couro.",
			cols: 1
		},
		{
			img: image,
			title: "VINHO TINTO 2017",
			author:
				"Sua cor brilhante é de um vermelho grená. O nariz é expressivo, com uma primeira nota de vegetação rasteira que evolui para frutas pretas. A boca redonda apresenta taninos fundidos e termina com aromas de ameixa seca, frutas vermelhas e couro.",
			cols: 1
		},
		{
			img: image,
			title: "VINHO TINTO CHÂTEAU CABEZAC LE PETIT ARTHUR 2017",
			author:
				"Sua cor brilhante é de um vermelho grená. O nariz é expressivo, com uma primeira nota de vegetação rasteira que evolui para frutas pretas. A boca redonda apresenta taninos fundidos e termina com aromas de ameixa seca, frutas vermelhas e couro.",
			cols: 1
		},
		{
			img: image,
			title: "VINHO TINTO  CABEZAC LE PETIT ARTHUR 2017",
			author:
				"Sua cor brilhante é de um vermelho grená. O nariz é expressivo, com uma primeira nota de vegetação rasteira que evolui para frutas pretas. A boca redonda apresenta taninos fundidos e termina com aromas de ameixa seca, frutas vermelhas e couro.",
			cols: 1
		},
		{
			img: image,
			title: "VINHO TINTO CHÂTEAU CABEZAC LE PETIT ARTHUR 2017",
			author:
				"Sua cor brilhante é de um vermelho grená. O nariz é expressivo, com uma primeira nota de vegetação rasteira que evolui para frutas pretas. A boca redonda apresenta taninos fundidos e termina com aromas de ameixa seca, frutas vermelhas e couro.",
			cols: 1
		},
		{
			img: image,
			title: "VINHO TINTO CHÂTEAU CABEZAC LE PETIT ARTHUR 2017",
			author:
				"Sua cor brilhante é de um vermelho grená. O nariz é expressivo, com uma primeira nota de vegetação rasteira que evolui para frutas pretas. A boca redonda apresenta taninos fundidos e termina com aromas de ameixa seca, frutas vermelhas e couro.",
			cols: 1
		},
		{
			img: image,
			title: "VINHO TINTO CHÂTEAU CABEZAC LE PETIT ARTHUR 2017",
			author:
				"Sua cor brilhante é de um vermelho grená. O nariz é expressivo, com uma primeira nota de vegetação rasteira que evolui para frutas pretas. A boca redonda apresenta taninos fundidos e termina com aromas de ameixa seca, frutas vermelhas e couro.",
			cols: 1
		},
		{
			img: image,
			title: "VINHO TINTO CHÂTEAU CABEZAC LE PETIT ARTHUR 2017",
			author:
				"Sua cor brilhante é de um vermelho grená. O nariz é expressivo, com uma primeira nota de vegetação rasteira que evolui para frutas pretas. A boca redonda apresenta taninos fundidos e termina com aromas de ameixa seca, frutas vermelhas e couro.",
			cols: 1
		}
	]

	return <div className={classes.root}>{children(wineData)}</div>
}

export default WineContainer
