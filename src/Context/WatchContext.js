import React from 'react'

const WatchContext = React.createContext({
  isDark: false,
  toggleTheme: () => {},
  savedvideos: [],
  activeSelected: '',
  onClickActiveSection: () => {},
  savingVideoToList: () => {},
})

export default WatchContext
