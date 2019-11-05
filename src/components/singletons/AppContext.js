import React from 'react'

const AppContext = React.createContext({
	user: null,
	rootNavigation: null,
	loading: false,
	collapsed: false,
	setAppState() {}
})

export const useAppContext = () => React.useContext(AppContext)

export default AppContext
