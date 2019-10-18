import React, { useState } from "react"
import {
	Grid,
	Avatar,
	Typography,
	makeStyles,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider,
	ListItemIcon,
	ListItemSecondaryAction,
	IconButton,
	Popover
} from "@material-ui/core"
import EmailIcon from "@material-ui/icons/Email"
import { Link } from "react-router-dom"
import MenuIcon from "@material-ui/icons/MoreVert"

const useStyles = makeStyles(theme => ({
	typography: {
		padding: theme.spacing(2)
	}
}))

const UserItem = ({ user }) => {
	const classes = useStyles()

	const [anchorEl, setAnchorEl] = React.useState(null)

	function handleClick(event) {
		setAnchorEl(event.currentTarget)
	}

	function handleClose() {
		setAnchorEl(null)
	}

	// const onDeletePartner = async () => {
	// 	try {

	// 		await api.delete(`/partners/${partner.id}`)
	// 		alert('Deletado')
	// 	} catch (e) {
	// 		console.log(e)
	// 	}
	// }

	const open = Boolean(anchorEl)
	const id = open ? "simple-popover" : undefined

	return (
		<React.Fragment>
			<ListItem alignItems="center">
				<ListItemAvatar>
					<Avatar alt="Remy Sharp">{(user.name || "")[0]}</Avatar>
				</ListItemAvatar>

				<ListItemText
					primary={user.name}
					secondary={
						<ListItemIcon>
							<EmailIcon />
							<Typography
								style={{ marginLeft: 8 }}
								variant="body2"
								className="flex-row center-b"
								color="textPrimary">
								{user.email}
							</Typography>
						</ListItemIcon>
					}
				/>
				<ListItemSecondaryAction>
					<IconButton
						edge="end"
						aria-label="delete"
						onClick={handleClick}>
						<MenuIcon />
					</IconButton>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center"
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "center"
						}}>
						<ListItem
							button
							component={Link}
							to={`/customer/register/${user.id}`}>
							<Typography className={classes.typography}>
								Editar Usuário
							</Typography>
						</ListItem>
						{/* <ListItem button onClick={onDeletePartner}>
							<Typography className={classes.typography}>
								Deletar Parceiro
							</Typography>
						</ListItem> */}
					</Popover>
				</ListItemSecondaryAction>
			</ListItem>
			<Divider variant="inset" component="li" />
		</React.Fragment>
	)
}
export default UserItem
