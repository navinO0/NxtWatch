import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import WatchContext from '../../Context/WatchContext'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import GamingVideoCard from '../GamingVideoCard'

import {
  SectionsContainer,
  FailureViewContainer,
  LoaderContainer,
  FailureTitle,
  FailureDescription,
  RetryButton,
  SectionBannerContainer,
  SectionBannerIconContainer,
  SectionBannerTitle,
} from '../styledComponents/styledComponents'

import './index.css'

const getApiStatus = {
  inprogress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

class GameRoute extends Component {
  state = {videoData: [], apistatus: getApiStatus.initial}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apistatus: getApiStatus.inprogress})
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/videos/gaming'
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {videos} = data
      const updatedVidData = videos.map(e => ({
        id: e.id,
        title: e.title,
        viewCount: e.view_count,
        thumbnailUrl: e.thumbnail_url,
      }))
      this.setState({
        videoData: updatedVidData,
        apistatus: getApiStatus.success,
      })
    } else {
      this.setState({apistatus: getApiStatus.failure})
    }
  }

  renderFailureView = () => (
    <WatchContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <FailureViewContainer isDark={isDark}>
            <div className="failure-view-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                alt="failure view"
                className="failure-view-image"
              />
              <FailureTitle isDark={isDark}>
                Oops! Something Went Wrong
              </FailureTitle>
              <FailureDescription isDark={isDark}>
                We are having some trouble to complete your request
                <br /> Please try again
              </FailureDescription>
              <RetryButton
                type="button"
                onClick={this.getGamingVideos}
                className="retry-btn"
              >
                Retry
              </RetryButton>
            </div>
          </FailureViewContainer>
        )
      }}
    </WatchContext.Consumer>
  )

  renderLoaderUi = () => (
    <WatchContext.Consumer>
      {value => {
        const {isDark} = value
        const colo = isDark ? '#ffffff' : '#000000'
        return (
          <LoaderContainer data-testid="loader" isDark={isDark}>
            <Loader type="ThreeDots" color={colo} height="50" width="50" />
          </LoaderContainer>
        )
      }}
    </WatchContext.Consumer>
  )

  renderGameVideos = () => {
    const {videoData} = this.state

    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <>
              <>
                <SectionBannerContainer isDark={isDark}>
                  <SectionBannerIconContainer isDark={isDark}>
                    <SiYoutubegaming className="section-banner-icon" />
                  </SectionBannerIconContainer>
                  <SectionBannerTitle isDark={isDark}>
                    Gaming
                  </SectionBannerTitle>
                </SectionBannerContainer>
                <ul className="gaming-videos-list-ul-container">
                  {videoData.map(eachOne => (
                    <GamingVideoCard key={eachOne.id} eachOne={eachOne} />
                  ))}
                </ul>
              </>
            </>
          )
        }}
      </WatchContext.Consumer>
    )
  }

  renderGamePage = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case 'SUCCESS':
        return this.renderGameVideos()
      case 'IN_PROGRESS':
        return this.renderLoaderUi()
      case 'FAILURE':
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <>
              <Header />

              <div className="home-super-container">
                <LeftNavBar />
                <SectionsContainer data-testid="gaming" isDark={isDark}>
                  {this.renderGamePage()}
                </SectionsContainer>
              </div>
            </>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default GameRoute
