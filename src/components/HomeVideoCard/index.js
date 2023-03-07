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

  //   const getDenomination = () => {
  //     const dinominationInWord = viewCount[viewCount.length - 1]
  //     const getNumOnly = viewCount.slice(0, viewCount.length - 1)
  //     const getNumInNormal = parseFloat(getNumOnly) * 1000

  //     switch (dinominationInWord) {
  //       case 'K':
  //         return new Intl.NumberFormat('en-IN', {
  //           maximumSignificantDigits: 3,
  //         }).format(getNumInNormal)
  //       case 'M':
  //         return ''

  //       default:
  //         return viewCount
  //     }
  //   }

  //   const normalCount = getDenomination()

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
              </div>
              <div className="profile-image-details-container">
                <div className="profile-image-container">
                  <img
                    src={channel.profileImageUrl}
                    alt="channel logo"
                    className="channel-profile-image"
                  />
                </div>
                <div className="details-container">
                  <VideoTitle isDark={isDark}>{title}</VideoTitle>
                  <CustumeDetailsPara isDark={isDark}>
                    {channel.name}
                  </CustumeDetailsPara>
                  <div className="views-published-at-container">
                    <CustumeDetailsPara
                      isDark={isDark}
                    >{`${viewCount} views`}</CustumeDetailsPara>
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
