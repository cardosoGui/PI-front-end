import React, { useEffect, useState } from "react"
import AppContainer from "../layout/AppContainer"
import WineContainer from "../containers/WineContainer"

import { makeStyles } from "@material-ui/core/styles"
import GridListTile from "@material-ui/core/GridListTile"
import { IconButton, GridListTileBar, Fade } from "@material-ui/core"
import InfoIcon from "@material-ui/icons/Info"

const useStyles = makeStyles({
	image: { width: "100%" }
})
const HomePage = () => {
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

				<WineContainer>
					{wineData =>
						wineData.map((item, key) => (
							<GridListTile key={key} cols={item.cols || 1}>
								<img src={item.img} alt={item.title} />
								<GridListTileBar
									title={item.title}
									subtitle={<span>by: {item.author}</span>}
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
						))
					}
				</WineContainer>
			</AppContainer>
		</Fade>
	)
}

export default HomePage
