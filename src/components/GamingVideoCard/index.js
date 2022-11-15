import {Link} from 'react-router-dom'

import './index.css'
import WatchContext from '../../Context/WatchContext'

import {
  CustumeDetailsPara,
  VideoTitle,
} from '../styledComponents/styledComponents'

const GamingVideoCard = props => {
  const {eachOne} = props
  const {id, thumbnailUrl, title, viewCount} = eachOne

  return (
    <WatchContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <Link to={`/videos/${id}`} className="video-link-item">
            <li className="gaming-thumbnail-list-item-container">
              <div className="gaming-thumbnail-container">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="thumbnail-image-gaming"
                />
              </div>
              <div className="details-container-gaming">
                <VideoTitle isDark={isDark}>{title}</VideoTitle>
                <CustumeDetailsPara
                  isDark={isDark}
                >{`${viewCount} Watching Worldwide`}</CustumeDetailsPara>
              </div>
            </li>
          </Link>
        )
      }}
    </WatchContext.Consumer>
  )
}
export default GamingVideoCard
