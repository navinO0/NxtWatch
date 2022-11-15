import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import WatchContext from '../../Context/WatchContext'
import './index.css'

import {
  VideoTitle,
  CustumeDetailsPara,
} from '../styledComponents/styledComponents'

const TrendingVideoCard = props => {
  const {eachOne} = props
  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = eachOne
  const formattedPublishedDate = formatDistanceToNow(new Date(publishedAt))
  const splittedDate = formattedPublishedDate.split(' ')
  const slicedForamattedDate = splittedDate.slice(1)
  const resultDate = slicedForamattedDate.join(' ')
  return (
    <WatchContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <Link to={`/videos/${id}`} className="video-link-item">
            <li className="trendi-list-item-container">
              <div className="thumbnail-container">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="trendi-thumb-image"
                />
              </div>
              <div className="details-container-trendi">
                <div className="trendi-channel-logo">
                  <img
                    src={channel.profileImageUrl}
                    alt="channel logo"
                    className="ch-prof-image"
                  />
                </div>
                <div className="title-other-dts-sm">
                  <VideoTitle isDark={isDark}>{title}</VideoTitle>
                  <div className="dets-sm">
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
              </div>
            </li>
          </Link>
        )
      }}
    </WatchContext.Consumer>
  )
}
export default TrendingVideoCard
