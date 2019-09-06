import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import DirectionsIcon from "@material-ui/icons/Directions"

const useStyles = makeStyles({
	header: {
		height: "5vh",
		backgroundColor: "#f8f8f8",
		padding: "1%",
		borderBottom: "1px solid #000"
	},
	headerButtons: { paddingLeft: "1%" },
	root: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		width: 400
	},
	input: {
		marginLeft: "1%",
		flex: 1
	},
	iconButton: {
		padding: 10
	},
	divider: {
		height: 28,
		margin: 4
	}
})

const AppContainer = ({ children }) => {
	const styles = useStyles()

	const SearchInput = () => (
		<Paper className={styles.root}>
			<InputBase
				className={styles.input}
				placeholder="Procurar no site"
				inputProps={{ "aria-label": "Procurar no site" }}
			/>

			<Divider className={styles.divider} orientation="vertical" />
			<IconButton className={styles.iconButton} aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	)

	const Header = () => {
		return (
			<div className={styles.header}>
				<div className="flex-row center-b">
					<img
						src={require("../assets/img/font.png")}
						alt=""
						style={{
							borderRadius: "0.5em",
							border: "1px solid #000"
						}}
					/>
					<div className={styles.headerButtons}>
						<Button variant="outlined" color="pink">
							Vinhos
						</Button>
					</div>
					<div className={styles.headerButtons}>
						<Button variant="outlined" color="#d43664">
							Clube de vinho
						</Button>
					</div>
					<div className={styles.headerButtons}>
						<Button variant="outlined" color="#d43664">
							Clube de vinho
						</Button>
					</div>
					<div
						className="flex-row flex-end center-b"
						style={{ width: "60%" }}>
						<SearchInput />
					</div>
				</div>
			</div>
		)
	}

	return (
		<div>
			<Header />
			{children}
		</div>
	)
}

export default AppContainer
