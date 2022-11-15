import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import {
  LeftNavBarMainContainer,
  CostumeLeftNavSection,
} from '../styledComponents/styledComponents'
import LeftNavSectionsCard from '../LeftNavSectionsCard/index'
import WatchContext from '../../Context/WatchContext'
import './index.css'

const leftNaveSection = [
  {id: 'HOME', linkto: '/', sectionIcon: 'AiFillHome', sectionText: 'Home'},
  {
    id: 'TRENDING',
    linkto: '/trending',
    sectionText: 'Trending',
  },
  {
    id: 'GAMING',
    linkto: '/gaming',
    sectionText: 'Gaming',
  },
  {
    id: 'SAVEDVIDEOS',
    linkto: '/saved-videos',
    sectionText: 'Saved videos',
  },
]

class LeftNavBar extends Component {
  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <LeftNavBarMainContainer isDark={isDark} className="left-nav-sm">
              <div className="sections-contact-us-container">
                <div className="sections-container">
                  <ul className="ul-list-container-left-nav">
                    {leftNaveSection.map(eachOne => (
                      <LeftNavSectionsCard
                        key={eachOne.id}
                        onClickSectionAct={this.onClickSectionAct}
                        eachOne={eachOne}
                      />
                    ))}
                  </ul>
                </div>
                <div className="contact-us-container">
                  <CostumeLeftNavSection isDark={isDark}>
                    CONTACT US
                  </CostumeLeftNavSection>
                  <div className="social-media-links-section-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                      alt="facebook logo"
                      className="social-images"
                    />
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                      alt="twitter logo"
                      className="social-images"
                    />
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                      alt="linked in logo"
                      className="social-images"
                    />
                  </div>
                  <CostumeLeftNavSection isDark={isDark}>
                    Enjoy! Now to see your channels and recommendations!
                  </CostumeLeftNavSection>
                </div>
              </div>
            </LeftNavBarMainContainer>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default withRouter(LeftNavBar)
