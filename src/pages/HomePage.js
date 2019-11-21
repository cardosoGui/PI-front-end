import React, { useEffect, useState } from "react"
import AppContainer from "../layout/AppContainer"
import WineContainer from "../containers/WineContainer"

import { makeStyles } from "@material-ui/core/styles"
import GridListTile from "@material-ui/core/GridListTile"
import { IconButton, GridListTileBar, Fade, GridList } from "@material-ui/core"
import InfoIcon from "@material-ui/icons/Info"
import ProductsContainer from "../containers/ProductsContainer"

const useStyles = makeStyles({
	image: { width: "100%" }
})
const HomePage = ({ history }) => {
	const classes = useStyles()
	const [state, setState] = useState({
		iterator: 0
	})

	const Slides = () => {
		const images = [
			"https://chezfrance.vteximg.com.br/arquivos/ids/163411/clube-set-2019-full.jpg",
			"https://chezfrance.vteximg.com.br/arquivos/ids/163407/vinho-do-mes-09-2019-full-2.jpg",
			"https://chezfrance.vteximg.com.br/arquivos/ids/163414/oferta-set-2019-Rouillere-full.jpg"
		]

		return (
			<div className={classes.image}>
				<img width="100%" src={images[state.iterator]} alt="" />
			</div>
		)
	}

	return (
		<Fade>
			<AppContainer>
				<Slides />
				<ProductsContainer>
					{products => {
						return (
							<GridList
								// style={{ height: "10%" }}
								cellHeight={500}
								spacing={20}
								className={classes.gridList}
								cols={6}
								style={{ padding: "4em" }}>
								{products.map((item, key) => (
									<GridListTile
										onClick={() =>
											history.push(
												`/products/details/${key}`
											)
										}
										key={key}
										cols={item.cols || 1}>
										<img
											src={`/public/${item.id}/images`}
											alt={item.title}
											// height={200}
										/>
										<GridListTileBar
											title={item.title}
											subtitle={
												<span>by: {item.author}</span>
											}
											actionIcon={
												<IconButton
													style={{
														color:
															"rgba(255, 255, 255, 0.54)"
													}}
													aria-label={`info about ${item.title}`}>
													<InfoIcon />
												</IconButton>
											}
										/>
									</GridListTile>
								))}
							</GridList>
						)
					}}
				</ProductsContainer>
			</AppContainer>
		</Fade>
	)
}

export default HomePage
