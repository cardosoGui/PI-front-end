import React from "react"
import AppContainer from "../layout/AppContainer"
import WineContainer from "../containers/WineContainer"
import { Grid, Typography, Input, TextField, Button } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import toCurrency from "../core/toCurrency"

const DetailsProduct = ({ match }) => {
	const id = match.params.id
	console.log(id)

	return (
		<AppContainer>
			<Grid style={{ height: "80vh" }}>
				<WineContainer>
					{wineData =>
						wineData.map((item, key) => {
							if (key == id) {
								return (
									<>
										<Grid lg={3}>
											<Typography
												variant="h2"
												color="textSecondary"
												align="center">
												{item.title}
											</Typography>
											<Typography
												variant="h5"
												color="textSecondary"
												align="center">
												{item.author}
											</Typography>
										</Grid>
										<Grid lg={5} style={{}}>
											<div className="flex-row center-a">
												<img
													src={item.img}
													alt={item.title}
												/>
											</div>
										</Grid>
										<Grid lg={3}>
											<div className="flex-col center-a">
												<Typography
													variant="h2"
													color="textSecondary"
													align="center">
													{toCurrency(12900)}
												</Typography>
												<TextField
													id="outlined-name"
													label="Quantidade"
													type="number"
													margin="normal"
													variant="outlined"
												/>
												<Button
													variant="contained"
													color="primary">
													Comprar
												</Button>
											</div>
										</Grid>
									</>
								)
							}
						})
					}
				</WineContainer>
			</Grid>
		</AppContainer>
	)
}

export default withRouter(DetailsProduct)
