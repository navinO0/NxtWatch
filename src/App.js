import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'

import './App.css'
import HomeRoute from './components/HomeRoute'
import LoginRoute from './components/LoginRoute'
import TrendingRoute from './components/TrendingRoute'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import GameRoute from './components/GameRoute'
import VideoItemDetail from './components/VideoItemDetail'
import NotFound from './components/NotFound'
import SavedRounte from './components/SavedRoute'
import WatchContext from './Context/WatchContext'

// Replace your code here

class App extends Component {
  state = {isDarkEn: false, savedVideos: [], activesection: 'HOME'}

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkEn: !prevState.isDarkEn,
    }))
  }

  onClickActiveSection = id => {
    this.setState({activesection: id})
  }

  savingVideoToList = videoItem => {
    const {savedVideos} = this.state
    const videoObject = savedVideos.find(eachOne => eachOne.id === videoItem.id)
    if (!videoObject) {
      this.setState(prevState => ({
        savedVideos: [...prevState.savedVideos, videoItem],
      }))
    } else {
      this.setState({
        savedVideos: savedVideos.filter(each => each.id !== videoItem.id),
      })
    }
  }

  render() {
    const {isDarkEn, savedVideos, activesection} = this.state

    return (
      <WatchContext.Provider
        value={{
          isDark: isDarkEn,
          activeSelected: activesection,
          savedvideos: savedVideos,
          toggleTheme: this.toggleTheme,
          savingVideoToList: this.savingVideoToList,
          onClickActiveSection: this.onClickActiveSection,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={LoginRoute} />
            <ProtectedRoute exact path="/" component={HomeRoute} />
            <ProtectedRoute exact path="/trending" component={TrendingRoute} />
            <ProtectedRoute exact path="/gaming" component={GameRoute} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetail}
            />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedRounte}
            />
            <Route component={NotFound} />
          </Switch>
        </>
      </WatchContext.Provider>
    )
  }
}

export default App
