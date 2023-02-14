import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import {
  CustumeDetailsPara,
  VideoTitle,
} from '../styledComponents/styledComponents'
import WatchContext from '../../Context/WatchContext'
import './index.css'

const HomeVideoCard = props => {
  const {eachOne} = props
  const {channel, id, title, publishedAt, thumbnailUrl, viewCount} = eachOne
  const formattedPublishedDate = formatDistanceToNow(new Date(publishedAt))
  const splittedDate = formattedPublishedDate.split(' ')
  const slicedForamattedDate = splittedDate.slice(1)
  const resultDate = slicedForamattedDate.join(' ')
  const dinominationInWord = viewCount[viewCount.length - 1]

  const getDenomination = () => {
    const getNumOnly = viewCount.slice(0, viewCount.length - 1)
    const getNumInNormal = parseFloat(getNumOnly) * 1000
    const stringedVal = getNumInNormal.toString()
    const getAfterThousandDenomination = stringedVal.slice(
      stringedVal.length - 3,
      stringedVal.length + 1,
    )
    const getThousandDenominations = stringedVal.slice(0, 2)
    const resultViews = `${getThousandDenominations}, ${getAfterThousandDenomination}`

    switch (dinominationInWord) {
      case 'K':
        return resultViews
      case 'M':
        return ''

      default:
        return viewCount
    }
  }

  const normalCount = getDenomination()

  return (
    <WatchContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <Link to={`/videos/${id}`} className="video-link-item">
            <li className="video-cart-list-container">
              <div className="video-thumbnail-img-container">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="video-thumbnail-image"
                />
                <div className="profile-image-container">
                  <img
                    src={channel.profileImageUrl}
                    alt="channel logo"
                    className="channel-profile-image"
                  />
                </div>
              </div>
              <div className="profile-image-details-container">
                <div className="details-container">
                  <VideoTitle isDark={isDark}>{title}</VideoTitle>
                  <CustumeDetailsPara isDark={isDark}>
                    {channel.name}
                  </CustumeDetailsPara>
                  <div className="views-published-at-container">
                    <CustumeDetailsPara
                      isDark={isDark}
                    >{`${normalCount} views`}</CustumeDetailsPara>
                    <CustumeDetailsPara isDark={isDark}>
                      {`• ${resultDate} ago`}
                    </CustumeDetailsPara>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </WatchContext.Consumer>
  )
}
export default HomeVideoCard
