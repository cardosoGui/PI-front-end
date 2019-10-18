import React from 'react'
import { TextField } from '@material-ui/core'

const InputText = ({ label, ...props }) => (
	<TextField {...props} variant="outlined" margin="normal" label={label} fullWidth />
)

export default InputText
