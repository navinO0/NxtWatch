import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import ReactPlayer from 'react-player'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'
import Header from '../Header'
import {
  SectionsContainer,
  ConstumeVideoDescription,
  VideoTitle,
  FailureViewContainer,
  LoaderContainer,
  FailureTitle,
  FailureDescription,
  RetryButton,
  VideoReactionButtons,
  VideoReactionText,
  CustumeDetailsPara,
} from '../styledComponents/styledComponents'
import WatchContext from '../../Context/WatchContext'

import LeftNavBar from '../LeftNavBar'

import './index.css'

const getApiStatus = {
  inprogress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

class VideoItemDetail extends Component {
  state = {
    videoDetails: [],
    channelData: [],
    apistatus: getApiStatus.initial,
    reactionstatus: '',
  }

  componentDidMount = () => {
    this.getVideoDetails()
  }

  onClickLike = () => {
    this.setState({reactionstatus: 'liked'})
  }

  onClickDislike = () => {
    this.setState({reactionstatus: 'dislike'})
  }

  onClickRetry = () => {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apistatus: getApiStatus.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const videoDetails = data.video_details

      const videoData = {
        id: videoDetails.id,
        description: videoDetails.description,
        publishedAt: videoDetails.published_at,
        thumbnailUrl: videoDetails.thumbnail_url,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        viewCount: videoDetails.view_count,
      }
      const channelDets = {
        channelName: videoDetails.channel.name,
        channelProfileImageUrl: videoDetails.channel.profile_image_url,
        channelSubscriberCount: videoDetails.channel.subscriber_count,
      }

      this.setState({
        videoDetails: videoData,
        channelData: channelDets,
        apistatus: getApiStatus.success,
      })
    } else {
      this.setState({apistatus: getApiStatus.failure})
    }
  }

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
                We are having some trouble to complete your request. Please try
                again.
              </FailureDescription>
              <RetryButton
                type="button"
                onClick={this.onClickRetry}
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

  renderVideoDetailPage = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case 'SUCCESS':
        return this.renderVideoUi()
      case 'IN_PROGRESS':
        return this.renderLoaderUi()
      case 'FAILURE':
        return this.renderFailureView()

      default:
        return null
    }
  }

  renderVideoUi = () => {
    const {videoDetails, channelData} = this.state
    const {
      publishedAt,
      videoUrl,
      title,
      id,
      viewCount,

      description,
    } = videoDetails
    const savingVideoDets = {
      channel: {
        name: channelData.channelName,
        profileImageUrl: channelData.channelProfileImageUrl,
      },
      id: videoDetails.id,
      publishedAt: videoDetails.publishedAt,
      thumbnailUrl: videoDetails.thumbnailUrl,
      title: videoDetails.title,
      viewCount: videoDetails.viewCount,
    }
    const {reactionstatus} = this.state
    const formattedPublishedDate = formatDistanceToNow(new Date(publishedAt))
    const splittedDate = formattedPublishedDate.split(' ')
    const slicedForamattedDate = splittedDate.slice(1)
    const resultDate = slicedForamattedDate.join(' ')
    const iconsColor = (isSaved, isDark) => {
      if (isDark) {
        return isSaved ? '#2563eb' : '#909090'
      }
      return isSaved ? '#2563eb' : '#616e76'
    }

    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark, savingVideoToList, savedvideos} = value
          const onClickSaveVideo = () => {
            savingVideoToList(savingVideoDets)
          }
          const savedObject = savedvideos.find(eachOne => eachOne.id === id)
          const isSaved = savedObject !== undefined

          return (
            <SectionsContainer data-testid="videoItemDetails" isDark={isDark}>
              <div className="video-player-container">
                <ReactPlayer
                  url={videoUrl}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>

              <div className="title-and-details-container">
                <VideoTitle isDark={isDark}>{title}</VideoTitle>
                <div className="video-published-like-dislike-container">
                  <div className="published-at-views-container">
                    <CustumeDetailsPara
                      isDark={isDark}
                    >{`${viewCount} views`}</CustumeDetailsPara>
                    <CustumeDetailsPara isDark={isDark}>
                      {`• ${resultDate} ago`}
                    </CustumeDetailsPara>
                  </div>
                  <div className="like-dislike-save-container">
                    <VideoReactionButtons
                      type="button"
                      className="like-dislike-container"
                      onClick={this.onClickLike}
                    >
                      <BiLike
                        className="like-icon"
                        color={iconsColor(reactionstatus === 'liked', isDark)}
                      />
                      <VideoReactionText
                        isDark={isDark}
                        isSaved={reactionstatus === 'liked'}
                      >
                        Like
                      </VideoReactionText>
                    </VideoReactionButtons>
                    <VideoReactionButtons
                      type="button"
                      className="like-dislike-container"
                      onClick={this.onClickDislike}
                    >
                      <BiDislike
                        className="like-icon"
                        color={iconsColor(reactionstatus === 'dislike', isDark)}
                      />
                      <VideoReactionText
                        isDark={isDark}
                        isSaved={reactionstatus === 'dislike'}
                      >
                        DisLike
                      </VideoReactionText>
                    </VideoReactionButtons>
                    {isSaved ? (
                      <VideoReactionButtons
                        type="button"
                        onClick={onClickSaveVideo}
                        className="like-dislike-container"
                        isSaved={isSaved}
                      >
                        <BiListPlus
                          className="like-icon"
                          color={iconsColor(isSaved, isDark)}
                        />
                        <VideoReactionText
                          isDark={isDark}
                          type="button"
                          isSaved={isSaved}
                        >
                          Saved
                        </VideoReactionText>
                      </VideoReactionButtons>
                    ) : (
                      <VideoReactionButtons
                        type="button"
                        onClick={onClickSaveVideo}
                        className="like-dislike-container"
                        isSaved={isSaved}
                      >
                        <BiListPlus
                          className="like-icon"
                          color={iconsColor(isSaved, isDark)}
                        />
                        <VideoReactionText
                          isDark={isDark}
                          type="button"
                          isSaved={isSaved}
                        >
                          Save
                        </VideoReactionText>
                      </VideoReactionButtons>
                    )}
                  </div>
                </div>
              </div>
              <hr
                className="hr-line-vid-dets"
                color={isDark ? '#909090' : '#475569'}
              />
              <div className="channel-description-container">
                <div className="profile-image-container">
                  <img
                    src={channelData.channelProfileImageUrl}
                    alt="profile ch"
                    className="channel-profile-image"
                  />
                </div>
                <div className="channel-name-description-sub-count-container">
                  <div className="channel-name-subs-container">
                    <VideoTitle isDark={isDark}>
                      {channelData.channelName}
                    </VideoTitle>
                    <CustumeDetailsPara isDark={isDark}>
                      {`${channelData.channelSubscriberCount} subscribers`}
                    </CustumeDetailsPara>
                  </div>
                  <div className="description-container">
                    <ConstumeVideoDescription isDark={isDark}>
                      {description}
                    </ConstumeVideoDescription>
                  </div>
                </div>
              </div>
            </SectionsContainer>
          )
        }}
      </WatchContext.Consumer>
    )
  }

  render() {
    return (
      <>
        <Header />

        <div className="home-super-container">
          <LeftNavBar />
          {this.renderVideoDetailPage()}
        </div>
      </>
    )
  }
}

export default VideoItemDetail
