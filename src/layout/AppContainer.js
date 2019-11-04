import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Link, Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import DirectionsIcon from '@material-ui/icons/Directions'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles({
	header: {
		height: '5em',
		backgroundColor: '#f8f8f8',
		padding: '1%',
		borderBottom: '1px solid #000'
	},
	headerButtons: { paddingLeft: '1%' },
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400
	},
	input: {
		marginLeft: '1%',
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
	const [ open, setOpen ] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const SearchInput = () => (
		<Paper className={styles.root}>
			<InputBase
				className={styles.input}
				placeholder="Procurar no site"
				inputProps={{ 'aria-label': 'Procurar no site' }}
			/>

			<Divider className={styles.divider} orientation="vertical" />
			<IconButton className={styles.iconButton} aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	)

	const Header = () => {
		return (
			<Paper>
				<Grid container alignItems="center" xs={12} style={{ height: '3em' }}>
					<img
						src={require('../assets/img/font.png')}
						alt=""
						style={{
							borderRadius: '0.5em',
							border: '1px solid #000'
						}}
					/>
					<Grid container xs={6} spacing={2}>
						<Grid item>
							<Button variant="outlined" color="pink">
								Vinhos
							</Button>
						</Grid>
						<Grid item>
							<Button variant="outlined" color="pink">
								Clube de vinho
							</Button>
						</Grid>
						<Grid item>
							<Button variant="outlined" color="pink">
								Produtos
							</Button>
						</Grid>
						<Grid item>
							<Button variant="outlined" color="pink">
								Contato
							</Button>
						</Grid>
					</Grid>
					<Grid container xs={5} justify="flex-end">
						<IconButton className={styles.iconButton} onClick={handleClickOpen} aria-label="search">
							<ShoppingCartIcon />
						</IconButton>
						<Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
							<DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
							<DialogContent>
								<DialogContentText>
									Let Google help apps determine location. This means sending anonymous location data
									to Google, even when no apps are running.
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button autoFocus onClick={handleClose} color="primary">
									Disagree
								</Button>
								<Button onClick={handleClose} color="primary" autoFocus>
									Agree
								</Button>
							</DialogActions>
						</Dialog>
					</Grid>
				</Grid>
			</Paper>
		)
	}

	// const Header = () => {
	// 	return (
	// 		<div className={styles.header}>
	// 			<div className="flex-row center-b">
	// 				<img
	// 					src={require('../assets/img/font.png')}
	// 					alt=""
	// 					style={{
	// 						borderRadius: '0.5em',
	// 						border: '1px solid #000'
	// 					}}
	// 				/>
	// 				<div className={styles.headerButtons}>
	// 					<Button variant="outlined" color="pink">
	// 						Vinhos
	// 					</Button>
	// 				</div>
	// 				<div className={styles.headerButtons}>
	// 					<Button variant="outlined" color="#d43664">
	// 						Clube de vinho
	// 					</Button>
	// 				</div>
	// 				<div className={styles.headerButtons}>
	// 					<Button variant="outlined" color="#d43664">
	// 						Clube de vinho
	// 					</Button>
	// 				</div>
	// 				<div className="flex-row flex-end center-b" style={{ width: '60%' }}>
	// 					<SearchInput />
	// 				</div>
	// 			</div>
	// 		</div>
	// 	)
	// }

	function Copyright() {
		return (
			<Typography style={{ padding: '1em' }} variant="body2" color="textSecondary" align="center">
				{'Copyright © '}
				<Link color="inherit" href="https://material-ui.com/">
					e-wine
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		)
	}

	return (
		<div>
			<div style={{ position: 'fixed', top: 0, width: '100%', zIndex: '999' }}>
				<Header />
			</div>
			{children}

			<Copyright />
		</div>
	)
}

export default AppContainer
