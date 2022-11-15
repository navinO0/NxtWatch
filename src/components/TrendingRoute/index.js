import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {HiFire} from 'react-icons/hi'

import Header from '../Header'

import LeftNavBar from '../LeftNavBar'

import WatchContext from '../../Context/WatchContext'

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
import TrendingVideoCard from '../TrendingVideoCard'

const getApiStatus = {
  inprogress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

class TrendingRoute extends Component {
  state = {videosdata: [], apistatus: getApiStatus.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apistatus: getApiStatus.inprogress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const trendingData = await response.json()
      const {videos} = trendingData
      const updatedTrendingData = videos.map(e => ({
        channel: {
          name: e.channel.name,
          profileImageUrl: e.channel.profile_image_url,
        },
        id: e.id,
        publishedAt: e.published_at,
        thumbnailUrl: e.thumbnail_url,
        title: e.title,
        viewCount: e.view_count,
      }))
      this.setState({
        videosdata: updatedTrendingData,
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
                onClick={this.getTrendingVideos}
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

  renderTrendingVideos = () => {
    const {videosdata} = this.state

    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <SectionsContainer data-testid="trending" isDark={isDark}>
              <SectionBannerContainer isDark={isDark}>
                <SectionBannerIconContainer isDark={isDark}>
                  <HiFire className="section-banner-icon" />
                </SectionBannerIconContainer>
                <SectionBannerTitle isDark={isDark}>
                  Trending
                </SectionBannerTitle>
              </SectionBannerContainer>
              <ul className="trendi-videos-ul-list-container">
                {videosdata.map(eachOne => (
                  <TrendingVideoCard key={eachOne.id} eachOne={eachOne} />
                ))}
              </ul>
            </SectionsContainer>
          )
        }}
      </WatchContext.Consumer>
    )
  }

  renderTrendingVidPage = () => {
    const {apistatus} = this.state

    switch (apistatus) {
      case 'IN_PROGRESS':
        return this.renderLoaderUi()
      case 'FAILURE':
        return this.renderFailureView()
      case 'SUCCESS':
        return this.renderTrendingVideos()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-super-container">
          <LeftNavBar />
          {this.renderTrendingVidPage()}
        </div>
      </>
    )
  }
}

export default TrendingRoute
