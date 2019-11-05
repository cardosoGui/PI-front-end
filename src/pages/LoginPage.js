import React from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { useAppContext } from "../components/singletons/AppContext"
import api from "../core/api"
import useReduxState from "../core/useReduxState"
import { withRouter } from "react-router-dom"
import { SnackbarProvider, useSnackbar } from "notistack"
import CircularProgress from "@material-ui/core/CircularProgress"

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{". Built with "}
			<Link color="inherit" href="https://material-ui.com/">
				Material-UI.
			</Link>
		</Typography>
	)
}

const useStyles = makeStyles(theme => ({
	"@global": {
		body: {
			backgroundColor: theme.palette.common.white
		}
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}))

const LoginPage = withRouter(({ history }) => {
	const { rootNavigation, setAppState } = useAppContext()
	const [getForm, setForm, updateFormField] = useReduxState({
		email: "",
		password: "",
		loading: false
	})
	const [getError, setErrorInput] = useReduxState({
		email: false,
		password: false
	})

	// const { enqueueSnackbar } = useSnackbar()

	const handleClickVariant = variant => () => {
		// variant could be success, error, warning, info, or default
		// enqueueSnackbar("This is a warning message!", variant)
	}

	async function authenticate() {
		const form = getForm()

		setForm({ loading: true })

		if (form.email.length > 0 && form.password.length > 0) {
			delete form.loading
			try {
				const { status, data } = await api.post(
					"/auth/login/admin",
					form
				)
				const { token, user } = data
				api.token = token
				localStorage.setItem("token", token)
				history.push("/")
			} catch (e) {
				// enqueueSnackbar("Email ou Senha Inválidos")
				setForm({ loading: false })
			} finally {
				setForm({ loading: false })
			}
		} else {
			setForm({ loading: false })
			if (!form.email) {
				setErrorInput({ email: true })
				alert("Por favor preencha o email")
				// enqueueSnackbar("Por favor preencha o Email")
			}
			if (!form.password) {
				// enqueueSnackbar("Por favor preencha sua Senha")
				alert("Por favor preencha sua Senha")

				setErrorInput({ password: true })
			}
		}
	}

	const handleInput = (keyInput, e) => {
		setForm({ [keyInput]: e.target.value.toLowerCase() })
		if (getError().email) {
			setErrorInput({ email: false })
		}
		if (getError().password) {
			setErrorInput({ password: false })
		}
	}

	const classes = useStyles()

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Medita Painel
				</Typography>
				<form
					action={"javascript:void(0)"}
					onSubmit={authenticate}
					className={classes.form}
					noValidate>
					<TextField
						error={getError().email}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email"
						name="email"
						value={getForm().email}
						autoComplete="email"
						onChange={event => handleInput("email", event)}
						autoFocus
					/>
					<TextField
						error={getError().password}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Senha"
						type="password"
						value={getForm().password}
						id="password"
						autoComplete="current-password"
						onChange={event => handleInput("password", event)}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Lembrar me"
					/>
					<Button
						disabled={getForm().loading}
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						Entrar
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Esqueceu sua senha?
							</Link>
						</Grid>
						{/* <Grid item>
							<Link href="#" variant="body2">
							{}
							</Link>
						</Grid> */}
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	)
})

export default LoginPage
