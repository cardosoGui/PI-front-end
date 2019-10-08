import React, { useEffect } from "react"
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
import useReduxState from "../core/useReduxState"

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				e-wine
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}

const useStyles = makeStyles(theme => ({
	"@global": {
		body: {
			color: "white",
			background: " #DA4453  ",
			background: " -webkit-linear-gradient(to right, #89216B, #DA4453) ",
			background: " linear-gradient(to right, #89216B, #DA4453) "
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
	},
	gradient: {
		background: "rgb(36,0,10)",
		background:
			"linear-gradient(21deg, rgba(36,0,10,1) 0%, rgba(223,24,89,1) 55%)"
	},
	text: { color: "#fff" }
}))

export default function LoginPage({ history }) {
	const classes = useStyles()

	const [getState, setState, updateFormField] = useReduxState({})
	const [getLocalUsers, setLocalUsers] = useReduxState({})

	const { local } = getLocalUsers()

	const onSubmit = () => {
		const form = getState()

		local.map((user, i) => {
			if (form.email === user.email && form.password === user.password) {
				const valid_user = user
				if (valid_user) {
					if (user.is_admin) {
						history.push("/painel")
					} else {
						history.push("/")
					}
				} else {
					alert("Usuário Invalido")
				}
			}
		})
	}

	const fetchData = async () => {
		try {
			const data = await localStorage.getItem("tbClientes")
			return data
		} catch (e) {}
	}

	useEffect(() => {
		fetchData().then(payload =>
			setLocalUsers({ local: JSON.parse(payload) })
		)
	}, [])

	return (
		<Container component="main" maxWidth="xs" style={{}}>
			{/* <pre>{JSON.stringify(getState(), null, 4)}</pre> */}
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<form className={classes.text} noValidate>
					<TextField
						className={classes.text}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={e => updateFormField("email")(e.target.value)}
					/>
					<TextField
						className={classes.text}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						onChange={e =>
							updateFormField("password")(e.target.value)
						}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="button"
						fullWidth
						variant="contained"
						color="primary"
						onClick={onSubmit}
						className={classes.submit}>
						Login
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Esqueceu sua senha?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/register" variant="body2">
								{"Cadastra-se Já!"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	)
}
