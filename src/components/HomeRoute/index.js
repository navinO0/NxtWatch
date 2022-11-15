import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {IoMdClose} from 'react-icons/io'
import Cookies from 'js-cookie'

import {BiSearch} from 'react-icons/bi'
import WatchContext from '../../Context/WatchContext'

import {
  SectionsContainer,
  FailureViewContainer,
  LoaderContainer,
  FailureTitle,
  FailureDescription,
  RetryButton,
  SeachContainerInput,
  SearchInputIconCont,
  ErrorTitle,
  ErrorDescription,
  CostumeInput,
} from '../styledComponents/styledComponents'

import HomeVideoCard from '../HomeVideoCard'

import './index.css'
import LeftNavBar from '../LeftNavBar'
import Header from '../Header'

const getApiStatus = {
  inprogress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

class HomeRoute extends Component {
  state = {
    listofvideosdata: [],
    apistatus: getApiStatus.initial,
    searchInput: '',
    showBanner: true,
  }

  componentDidMount() {
    this.getListOfVideos()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getListOfVideos()
  }

  getListOfVideos = async () => {
    const {searchInput} = this.state
    this.setState({apistatus: getApiStatus.inprogress})
    const Token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },

      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {videos} = data

      const updatedVideoListData = videos.map(each => ({
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
      }))

      this.setState({
        listofvideosdata: updatedVideoListData,
        apistatus: getApiStatus.success,
      })
    } else {
      this.setState({apistatus: getApiStatus.failure})
    }
  }

  onClickCloseBanner = () => {
    this.setState({showBanner: false})
  }

  renderVideosHome = () => {
    const {listofvideosdata, searchInput, showBanner} = this.state
    const isEamty = listofvideosdata.length !== 0
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <SectionsContainer data-testid="home" isDark={isDark}>
              <div
                className={`home-banner-container ${
                  !showBanner ? 'd-none' : ''
                } `}
                data-testid="banner"
              >
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                    className="home-nxt-image"
                  />
                  <p className="prem-promo-text">
                    Buy Nxt Watch Premium prepaid plans with UPI
                  </p>
                  <button type="button" className="getitnow-btn">
                    GET IT NOW
                  </button>
                </div>
                <button
                  type="button"
                  data-testid="close"
                  onClick={this.onClickCloseBanner}
                  className="bannerClose-button"
                >
                  <IoMdClose />
                </button>
              </div>
              <SeachContainerInput isDark={isDark}>
                <CostumeInput
                  isDark={isDark}
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
                <SearchInputIconCont
                  isDark={isDark}
                  data-testid="searchButton"
                  onClick={this.onClickSearch}
                >
                  <BiSearch className="search-icon" />
                </SearchInputIconCont>
              </SeachContainerInput>
              {isEamty ? (
                <div className="home-main-container">
                  <div className="videos-container">
                    <ul className="videos-ul-list-container">
                      {listofvideosdata.map(eachOne => (
                        <HomeVideoCard key={eachOne.id} eachOne={eachOne} />
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="no-videos-main-container">
                  <div className="no-videos-card">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
                      alt="no videos"
                      className="nosavedvideos"
                    />
                    <ErrorTitle isDark={isDark}>
                      No Search results found
                    </ErrorTitle>
                    <ErrorDescription isDark={isDark}>
                      Try different key words or remove search filter
                    </ErrorDescription>
                    <RetryButton
                      type="button"
                      onClick={this.onClickSearch}
                      className="retry-btn"
                    >
                      Retry
                    </RetryButton>
                  </div>
                </div>
              )}
            </SectionsContainer>
          )
        }}
      </WatchContext.Consumer>
    )
  }

  renderHomeUi = () => {
    const {apistatus} = this.state

    switch (apistatus) {
      case 'IN_PROGRESS':
        return this.renderLoaderUi()
      case 'FAILURE':
        return this.renderFailureView()
      case 'SUCCESS':
        return this.renderVideosHome()
      default:
        return null
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
                onClick={this.onClickSearch}
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

  render() {
    return (
      <>
        <Header />

        <div className="home-super-container">
          <LeftNavBar />
          {this.renderHomeUi()}
        </div>
      </>
    )
  }
}

export default HomeRoute
