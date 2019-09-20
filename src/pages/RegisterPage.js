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
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
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
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}))

export default function RegisterPage({ history }) {
	const classes = useStyles()

	const [getState, setState] = useReduxState({})
	const [getForm, setForm, updateFormField] = useReduxState({})

	const form = getForm()

	var tbClientes = localStorage.getItem("tbClientes") // Recupera os dados armazenados
	tbClientes = JSON.parse(tbClientes) // Converte string para objeto
	if (tbClientes == null) tbClientes = []

	function Adicionar() {
		// var cliente = JSON.stringify(form)
		if (form.email !== "" && form.password !== "") {
			tbClientes.push(form)
			localStorage.setItem("tbClientes", JSON.stringify(tbClientes))
			alert("Usuário Cadastrado.")
			history.goBack()
		} else {
			alert("Preencha os campos")
		}
	}

	useEffect(() => {
		// handleForm()
	}, [])

	const onSubmit = form => {
		// prev_form.push(form)
		// // const next_form = e.push(form)
		// console.log(prev_form)
		// localStorage.setItem("form", JSON.stringify(prev_form))
		// // history.push("/login")
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Registrar
				</Typography>
				{/* <pre>{JSON.stringify(form, null, 4)}</pre> */}
				<form
					className={classes.form}
					noValidate
					// onChange={() => handleForm(form)}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								onChange={e => {
									updateFormField("first_name")(
										e.target.value
									)
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								onChange={e => {
									updateFormField("last_name")(e.target.value)
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={e => {
									updateFormField("email")(e.target.value)
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={e => {
									updateFormField("password")(e.target.value)
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										onChange={e => {
											updateFormField("is_admin")(
												e.target.checked
											)
										}}
										value={getState().is_admin}
										color="primary"
									/>
								}
								label="Admin"
							/>
						</Grid>
					</Grid>
					<Button
						onClick={() => Adicionar()}
						type="button"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						Registrar
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Ja é cadastrado? faça login
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	)
}
