import React, { useState, useEffect } from "react"
import {
	Grid,
	Typography,
	Button,
	Select,
	MenuItem,
	FormControlLabel,
	Checkbox
} from "@material-ui/core"
import InputText from "../../components/forms/InputText"
import request from "superagent"
import { CPFValidation, CNPJValidation, notEmpty } from "../../core/validation"

const Address = ({ address, setAddress, valid }) => {
	return (
		<Grid container alignContent="center" justify="center" spacing={2}>
			<Grid item xs={10}>
				<InputText
					value={address.postal_code}
					fullwidth
					label="CEP"
					error={notEmpty(!address.postal_code) ? !valid : false}
					onChange={e =>
						setAddress({
							...address,
							postal_code: e.target.value,
							valid: true
						})
					}
				/>
			</Grid>
			<Grid item xs={10}>
				<InputText
					value={address.street}
					fullwidth
					label="RUA"
					error={notEmpty(!address.street) ? !valid : false}
					onChange={e =>
						setAddress({
							...address,
							street: e.target.value,
							valid: true
						})
					}
				/>
			</Grid>
			<Grid item xs={10}>
				<InputText
					value={address.number}
					fullwidth
					label="NÚMERO"
					error={notEmpty(!address.number) ? !valid : false}
					onChange={e =>
						setAddress({
							...address,
							number: e.target.value,
							valid: true
						})
					}
				/>
			</Grid>
			{/* <Grid item xs={10}>
				<InputText fullwidth label="BAIRRO"  onChange={(e) => setAddress({ ...address, street2: e.target.value,valid: true })} />
			</Grid> */}
			<Grid item xs={10}>
				<InputText
					value={address.city}
					fullwidth
					label="CIDADE"
					error={notEmpty(!address.city) ? !valid : false}
					onChange={e =>
						setAddress({
							...address,
							city: e.target.value,
							valid: true
						})
					}
				/>
			</Grid>
			<Grid item xs={10}>
				<InputText
					value={address.country}
					fullwidth
					label="PAÍS"
					onChange={e =>
						setAddress({
							...address,
							country: e.target.value,
							valid: true
						})
					}
				/>
			</Grid>
		</Grid>
	)
}

const CustomerForm = ({ match }) => {
	console.log(match)

	const [getState, setState] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		valid: true
	})

	const {
		sending,
		name,
		email,
		password,
		confirmPassword,
		phone_first,
		valid
	} = getState
	const [checkboxes, setCheckboxes] = useState({
		shipping_address: false
	})

	//** type Document identity default RG */
	// const [ docID, setDocID ] = useState({ type: 'RG', number: '' })
	//** type Document identity default CPF */
	const [docSTD, setDocSTD] = useState({ type: "CPF", number: "" })
	const [address, setAddress] = useState({
		postal_code: "",
		street: "",
		city: "",
		country: ""
	})
	const [shipping_address, setShippingAddress] = useState({
		postal_code: "",
		street: "",
		city: "",
		country: ""
	})

	useEffect(() => {
		if (localStorage.getItem("customer")) {
			if (match.params.id) {
				const customers = JSON.parse(localStorage.getItem("customer"))

				customers.map(user => {
					if (user.id == match.params.id) {
						alert(JSON.stringify(user))
						setState({ ...user })
						setDocSTD(user.document)
						setAddress(user.address)
						setShippingAddress(user.shipping_address)
						setCheckboxes(user.checkboxes)
					}
				})
			}
		} else {
			localStorage.setItem("customer", "[]")
		}

		console.log(localStorage.getItem("customer"))
	}, [])

	//requisição na api viacep.com.br entregando o cep e obtendo o endereço completo
	const getviaCepUrl = () => {
		let next_address = request.get(
			`https://viacep.com.br/ws/${
				checkboxes.shipping_address
					? shipping_address.postal_code
					: address.postal_code
			}/json`
		)
		next_address.end((err, response) => {
			if (err) {
				console.log(err)
			} else {
				const { logradouro, cep, localidade, uf } = response.body

				checkboxes.shipping_address
					? setShippingAddress({
							...shipping_address,
							postal_code: cep,
							street: `${logradouro} - ${localidade}`,
							city: uf
					  })
					: setAddress({
							...address,
							postal_code: cep,
							street: `${logradouro} - ${localidade}`,
							city: uf
					  })
			}
		})
	}

	const onSubmit = () => {
		const store = JSON.parse(localStorage.getItem("customer"))
		let email

		const form = {
			...getState,
			checkboxes,
			document: { ...docSTD },
			shipping_address: checkboxes.shipping_address
				? { ...shipping_address }
				: { ...address },
			address
		}

		store.map(item => {
			if (item.email === form.email) {
				email = item.email
				return
			}
			return
		})

		if (form) {
			if (form.name.length > 3) {
				if (
					getState.password.length === 0 ||
					getState.confirmPassword.length === 0
				) {
					alert("As senhas não conferem")
				} else {
					if (getState.password === getState.confirmPassword) {
						if (
							address.postal_code.length === 0 ||
							address.street.length === 0
						) {
							alert("O campo endereço de cobrança é obrigatório")
						} else {
							if (email === form.email) {
								alert("email igual")
							} else {
								store.push(form)
								console.log(store)

								localStorage.setItem(
									"customer",
									JSON.stringify(store)
								)
							}
						}
					}
				}
			} else {
				alert("Nome deve contar mais que 3 letras")
			}
		}

		alert(JSON.stringify(store, null, 4))
	}

	useEffect(() => {
		if (address.postal_code.length === 8) {
			getviaCepUrl()
		}
	}, [address])

	useEffect(() => {
		if (shipping_address.postal_code.length === 8) {
			getviaCepUrl()
		}
	}, [shipping_address])

	return (
		<form
			action="javascript:void(0)"
			onSubmit={() =>
				CPFValidation(docSTD.number)
					? onSubmit()
					: alert("insira CPF válido")
			}>
			<Grid container alignContent="center" justify="center" spacing={2}>
				<Grid item>
					{/* <pre>
						{JSON.stringify(
							{ getState, address, shipping_address, docSTD },
							null,
							4
						)}
					</pre> */}
					<Typography variant="h3" component="h4">
						Formulário de Cadastro
					</Typography>
				</Grid>
				<Grid item xs={10}>
					<InputText
						fullwidth
						label="Nome"
						error={notEmpty(!name) ? !valid : false}
						value={name}
						onChange={e =>
							setState({
								...getState,
								name: e.target.value,
								id: +new Date(),
								valid: true
							})
						}
					/>
				</Grid>
				<Grid item xs={10}>
					<InputText
						fullwidth
						label="E-mail"
						type="email"
						value={email}
						error={notEmpty(!email) ? !valid : false}
						onChange={e =>
							setState({
								...getState,
								id: +new Date(),
								email: e.target.value,
								valid: true
							})
						}
					/>
				</Grid>
				<Grid
					container
					xs={10}
					alignContent="center"
					alignItems="center">
					<Grid xs={4} item>
						<Select
							fullWidth
							onChange={e =>
								setDocSTD({
									...docSTD,
									type: e.target.value,
									valid: true
								})
							}
							label={"DOCUMENTO"}
							value={docSTD.type}>
							<MenuItem value="CPF">CPF</MenuItem>
							<MenuItem value="CNPJ">CNPJ</MenuItem>
						</Select>
					</Grid>

					<Grid xs={8} item>
						<InputText
							label="NÚMERO"
							value={docSTD.number}
							error={notEmpty(!docSTD.number) ? !valid : false}
							onChange={e =>
								setDocSTD({
									...docSTD,
									number: e.target.value,
									valid: true
								})
							}
						/>
					</Grid>
				</Grid>
				<Grid item xs={10}>
					<InputText
						fullwidth
						type="password"
						label="SENHA"
						value={password}
						error={notEmpty(!password) ? !valid : false}
						onChange={e =>
							setState({
								...getState,
								password: e.target.value,
								valid: true
							})
						}
					/>
				</Grid>
				<Grid item xs={10}>
					<InputText
						fullwidth
						type="password"
						label="CONFIRME A SENHA"
						value={confirmPassword}
						error={notEmpty(!confirmPassword) ? !valid : false}
						onChange={e =>
							setState({
								...getState,
								confirmPassword: e.target.value,
								valid: true
							})
						}
					/>
				</Grid>
				<Grid item>
					<Typography variant="h3" component="h4">
						Endereço de Cobrança
					</Typography>
				</Grid>
				<Address
					address={address}
					setAddress={setAddress}
					valid={valid}
				/>
				<Grid item>
					<FormControlLabel
						control={
							<Checkbox checked={checkboxes.shipping_address} />
						}
						onChange={e =>
							setCheckboxes({
								...checkboxes,
								shipping_address: !checkboxes.shipping_address
							})
						}
						label="Definir Endereço de Entrega"
					/>
				</Grid>
				{checkboxes.shipping_address && (
					<Grid container justify="center" item>
						<Grid item>
							<Typography variant="h3" component="h4">
								Endereço de Entrega
							</Typography>
						</Grid>
						<Address
							address={shipping_address}
							setAddress={setShippingAddress}
							valid={valid}
						/>
					</Grid>
				)}
				<Grid item xs={10}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						type="submit">
						Enviar
					</Button>
				</Grid>
			</Grid>
		</form>
	)
}

export default CustomerForm
