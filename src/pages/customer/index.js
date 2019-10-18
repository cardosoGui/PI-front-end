import React, { useState, useEffect } from 'react'
import { Grid, Typography, Button, Select, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core'
import InputText from '../../components/forms/InputText'
import request from 'superagent'

const Address = ({ address, setAddress }) => {
	return (
		<Grid container alignContent="center" justify="center" spacing={2}>
			<Grid item xs={10}>
				<InputText
					value={address.postal_code}
					fullwidth
					label="CEP"
					onChange={(e) => setAddress({ ...address, postal_code: e.target.value })}
				/>
			</Grid>
			<Grid item xs={10}>
				<InputText
					value={address.street}
					fullwidth
					label="RUA"
					onChange={(e) => setAddress({ ...address, street: e.target.value })}
				/>
			</Grid>
			<Grid item xs={10}>
				<InputText
					value={address.number}
					fullwidth
					label="NÚMERO"
					onChange={(e) => setAddress({ ...address, number: e.target.value })}
				/>
			</Grid>
			{/* <Grid item xs={10}>
				<InputText fullwidth label="BAIRRO"  onChange={(e) => setAddress({ ...address, street2: e.target.value })} />
			</Grid> */}
			<Grid item xs={10}>
				<InputText
					value={address.city}
					fullwidth
					label="CIDADE"
					onChange={(e) => setAddress({ ...address, city: e.target.value })}
				/>
			</Grid>
			<Grid item xs={10}>
				<InputText
					value={address.country}
					fullwidth
					label="PAÍS"
					onChange={(e) => setAddress({ ...address, country: e.target.value })}
				/>
			</Grid>
		</Grid>
	)
}

const CustomerForm = () => {
	const [ getState, setState ] = useState({})

	const { sending, name, email, phone_first } = getState
	const [ checkboxes, setCheckboxes ] = useState({
		shipping_address: false
	})

	//** type Document identity default RG */
	// const [ docID, setDocID ] = useState({ type: 'RG', number: '' })
	//** type Document identity default CPF */
	const [ docSTD, setDocSTD ] = useState({ type: 'CPF', number: '' })
	const [ address, setAddress ] = useState({
		postal_code: '',
		street: '',
		city: '',
		country: ''
	})
	const [ shipping_address, setShippingAddress ] = useState({
		postal_code: '',
		street: '',
		city: '',
		country: ''
	})

	//requisição na api viacep.com.br entregando o cep e obtendo o endereço completo
	const getviaCepUrl = () => {
		let next_address = request.get(`https://viacep.com.br/ws/${address.postal_code}/json`)
		next_address.end((err, response) => {
			if (err) {
				console.log(err)
			} else {
				const { logradouro, cep, localidade, uf } = response.body
				setAddress({
					...address,
					postal_code: cep,
					street: `${logradouro} - ${localidade}`,
					city: uf
				})
			}
		})
	}

	useEffect(
		() => {
			if (address.postal_code.length === 8) {
				getviaCepUrl()
			}
		},
		[ address ]
	)

	return (
		<form action="javascript:void(0)" onSubmit={() => alert('sdsdd')}>
			<Grid container alignContent="center" justify="center" spacing={2}>
				<Grid item>
					<pre>{JSON.stringify({ getState, address, shipping_address }, null, 4)}</pre>
					<Typography variant="h3" component="h4">
						Formulário de Cadastro
					</Typography>
				</Grid>
				<Grid item xs={10} onChange={(e) => setState({ ...getState, name: e.target.value })}>
					<InputText fullwidth label="Nome" />
				</Grid>
				<Grid item xs={10}>
					<InputText
						fullwidth
						label="E-mail"
						type="email"
						onChange={(e) => setState({ ...getState, email: e.target.value })}
					/>
				</Grid>
				<Grid container xs={10} alignContent="center" alignItems="center">
					<Grid xs={4} item>
						<Select
							fullWidth
							onChange={(e) =>
								setDocSTD({
									...docSTD,
									type: e.target.value
								})}
							label={'DOCUMENTO'}
							value={docSTD.type}
						>
							<MenuItem value="CPF">CPF</MenuItem>
							<MenuItem value="CNPJ">CNPJ</MenuItem>
						</Select>
					</Grid>

					<Grid xs={8} item>
						<InputText
							label="NÚMERO"
							value={docSTD.number}
							onChange={(e) =>
								setDocSTD({
									...docSTD,
									number: e.target.value
								})}
						/>
					</Grid>
				</Grid>
				<Grid item xs={10}>
					<InputText
						fullwidth
						type="password"
						label="SENHA"
						onChange={(e) => setState({ ...getState, password: e.target.value })}
					/>
				</Grid>
				<Grid item xs={10}>
					<InputText
						fullwidth
						type="password"
						label="CONFIRME A SENHA"
						onChange={(e) => setState({ ...getState, confirmPassword: e.target.value })}
					/>
				</Grid>
				<Grid item>
					<Typography variant="h3" component="h4">
						Endereço de Cobrança
					</Typography>
				</Grid>
				<Address address={address} setAddress={setAddress} />
				<Grid item>
					<FormControlLabel
						control={<Checkbox checked={checkboxes.shipping_address} />}
						onChange={(e) =>
							setCheckboxes({ ...checkboxes, shipping_address: !checkboxes.shipping_address })}
						label="Definir Endereço de Entrega"
					/>
				</Grid>
				{checkboxes.shipping_address && (
					<Grid item>
						<Grid item>
							<Typography variant="h3" component="h4">
								Endereço de Entrega
							</Typography>
						</Grid>
						<Address address={shipping_address} setAddress={setShippingAddress} />
					</Grid>
				)}
				<Grid item xs={10}>
					<Button fullWidth variant="contained" color="primary" type="submit">
						Enviar
					</Button>
				</Grid>
			</Grid>
		</form>
	)
}

export default CustomerForm
