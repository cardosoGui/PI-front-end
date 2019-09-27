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
			title: "Image",
			author: "author",
			cols: 1
		},
		{
			img: image,
			title: "Image",
			author: "author",
			cols: 1
		},
		{
			img: image,
			title: "Image",
			author: "author",
			cols: 1
		},
		{
			img: image,
			title: "Image",
			author: "author",
			cols: 1
		},
		{
			img: image,
			title: "Image",
			author: "author",
			cols: 1
		},
		{
			img: image,
			title: "Image",
			author: "author",
			cols: 1
		}
	]

	return (
		<div className={classes.root}>
			
			<GridList
				cellHeight={500}
				spacing={20}
				className={classes.gridList}
				cols={3}>
				{children(wineData)}
			</GridList>
		</div>
	)
}

export default WineContainer
