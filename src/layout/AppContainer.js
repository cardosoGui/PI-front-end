import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
	header: { height: '35px', backgroundColor: '#f8f8f8', padding: '1%', borderBottom: '1px solid #000' },
	headerButtons: { paddingLeft: '1%' }
})

const AppContainer = ({ children }) => {
	const styles = useStyles()

	const Header = () => {
		return (
			<div className={styles.header}>
				<div className="flex-row center-b">
					<img src={require('../assets/img/font.png')} alt="" />
					<div className={styles.headerButtons}>
						<Button variant="outlined" color="pink">
							Home
						</Button>
					</div>
					<div className={styles.headerButtons}>
						<Button variant="outlined" color="#d43664">
							Clube de vinho
						</Button>
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
