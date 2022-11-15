import {HiFire} from 'react-icons/hi'
import WatchContext from '../../Context/WatchContext'

import {
  SectionsContainer,
  SectionBannerContainer,
  SectionBannerIconContainer,
  SectionBannerTitle,
  ErrorDescription,
  ErrorTitle,
} from '../styledComponents/styledComponents'

import Header from '../Header/index'
import TrendingVideoCard from '../TrendingVideoCard/index'

import LeftNavBar from '../LeftNavBar/index'
import './index.css'

const SavedRoute = () => (
  <WatchContext.Consumer>
    {value => {
      const {savedvideos, isDark} = value
      const noVids = savedvideos.length === 0
      return (
        <>
          <Header />

          <div className="home-super-container">
            <LeftNavBar />
            <>
              <SectionsContainer data-testid="savedVideos" isDark={isDark}>
                {noVids ? (
                  <div className="no-videos-main-container">
                    <div className="no-videos-card">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                        className="nosavedvideos"
                      />
                      <ErrorTitle isDark={isDark}>
                        No Saved Videos found
                      </ErrorTitle>
                      <ErrorDescription isDark={isDark}>
                        You can save your videos while watching them
                      </ErrorDescription>
                    </div>
                  </div>
                ) : (
                  <>
                    <SectionBannerContainer isDark={isDark}>
                      <SectionBannerIconContainer isDark={isDark}>
                        <HiFire className="section-banner-icon" />
                      </SectionBannerIconContainer>
                      <SectionBannerTitle isDark={isDark}>
                        Saved Videos
                      </SectionBannerTitle>
                    </SectionBannerContainer>
                    <ul className="trendi-videos-ul-list-container">
                      {savedvideos.map(eachOne => (
                        <TrendingVideoCard key={eachOne.id} eachOne={eachOne} />
                      ))}
                    </ul>
                  </>
                )}
              </SectionsContainer>
            </>
          </div>
        </>
      )
    }}
  </WatchContext.Consumer>
)

export default SavedRoute
