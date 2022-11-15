import {Component} from 'react'

import {withRouter, Link} from 'react-router-dom'

import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import {FaMoon} from 'react-icons/fa'

import {GiHamburgerMenu} from 'react-icons/gi'

import {RiSunLine} from 'react-icons/ri'

import {IoMdClose} from 'react-icons/io'

import {FiLogOut} from 'react-icons/fi'

import LeftNavSectionsCard from '../LeftNavSectionsCard/index'

import './index.css'

import {
  HeaderMainContainer,
  ThemeIconStatus,
  HeaderLogoutButton,
  OptContainer,
  VideoTitle,
  PopCloseBtn,
  PopLogoutBtn,
  PopContainer,
  PopSuperContainer,
  PopCloseBtnOpt,
  PopContainerSections,
} from '../styledComponents/styledComponents'

import WactContext from '../../Context/WatchContext'

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

class Header extends Component {
  onClickToggleOptions = () => {
    this.setState(prevState => ({showOpts: !prevState.showOpts}))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <WactContext.Consumer>
        {value => {
          const {isDark, toggleTheme, onClickActiveSection} = value
          const clickedHome = () => {
            onClickActiveSection('HOME')
          }

          const onClickTheme = () => {
            toggleTheme()
          }
          const WatchLogo = () => {
            if (isDark) {
              return 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            }
            return 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }

          return (
            <>
              <HeaderMainContainer isDark={isDark}>
                <Link to="/" className="logo-link-item" onClick={clickedHome}>
                  <div className="header-image-logo-container">
                    <img
                      src={WatchLogo()}
                      alt="website logo"
                      className="next-watch-image-header"
                    />
                  </div>
                </Link>
                <>
                  <div className="theme-profile-logout-btn-container-sm">
                    <ThemeIconStatus
                      onClick={onClickTheme}
                      data-testid="theme"
                      isDark={isDark}
                    >
                      {isDark ? (
                        <RiSunLine className="dark-them-icon" />
                      ) : (
                        <FaMoon className="dark-them-icon" />
                      )}
                    </ThemeIconStatus>

                    <div className="popup-container">
                      <Popup
                        modal
                        trigger={
                          <ThemeIconStatus isDark={isDark} type="button">
                            <GiHamburgerMenu className="dark-them-icon" />
                          </ThemeIconStatus>
                        }
                      >
                        {close => (
                          <PopSuperContainer isDark={isDark}>
                            <PopContainerSections isDark={isDark}>
                              <PopCloseBtnOpt
                                type="button"
                                onClick={() => close()}
                                isDark={isDark}
                                className="section-pop-container"
                              >
                                <IoMdClose />
                              </PopCloseBtnOpt>
                              <OptContainer isDark={isDark}>
                                <ul className="ul-list-container-left-nav">
                                  {leftNaveSection.map(eachOne => (
                                    <LeftNavSectionsCard
                                      key={eachOne.id}
                                      onClickSectionAct={this.onClickSectionAct}
                                      eachOne={eachOne}
                                    />
                                  ))}
                                </ul>
                              </OptContainer>
                            </PopContainerSections>
                          </PopSuperContainer>
                        )}
                      </Popup>
                    </div>
                    <div className="popup-container">
                      <Popup
                        modal
                        trigger={
                          <button
                            type="button"
                            className="header-logout-btn-sm "
                          >
                            <ThemeIconStatus isDark={isDark}>
                              <FiLogOut className="dark-them-icon" />
                            </ThemeIconStatus>
                          </button>
                        }
                      >
                        {close => (
                          <div className="pooped">
                            <PopSuperContainer isDark={isDark}>
                              <PopContainer isDark={isDark}>
                                <div>
                                  <div>
                                    <VideoTitle isDark={isDark}>
                                      Are you sure you want to logout?
                                    </VideoTitle>
                                  </div>
                                  <div>
                                    <PopCloseBtn
                                      type="button"
                                      isDark={isDark}
                                      onClick={() => close()}
                                    >
                                      Cancel
                                    </PopCloseBtn>
                                    <PopLogoutBtn
                                      onClick={this.onClickLogout}
                                      isDark={isDark}
                                      type="button"
                                    >
                                      Confirm
                                    </PopLogoutBtn>
                                  </div>
                                </div>
                              </PopContainer>
                            </PopSuperContainer>
                          </div>
                        )}
                      </Popup>
                    </div>
                  </div>

                  <div className="theme-profile-logout-btn-container">
                    <ThemeIconStatus
                      onClick={onClickTheme}
                      data-testid="theme"
                      isDark={isDark}
                    >
                      {isDark ? (
                        <RiSunLine className="dark-them-icon" />
                      ) : (
                        <FaMoon className="dark-them-icon" />
                      )}
                    </ThemeIconStatus>

                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                      alt="profile"
                      className="header-profile-image"
                    />

                    <div className="popup-container">
                      <Popup
                        modal
                        trigger={
                          <HeaderLogoutButton type="button" isDark={isDark}>
                            Logout
                          </HeaderLogoutButton>
                        }
                      >
                        {close => (
                          <PopSuperContainer isDark={isDark}>
                            <PopContainer isDark={isDark}>
                              <div>
                                <VideoTitle isDark={isDark}>
                                  Are you sure, you want to logout?
                                </VideoTitle>
                              </div>
                              <div>
                                <PopCloseBtn
                                  type="button"
                                  onClick={() => close()}
                                  isDark={isDark}
                                >
                                  Cancel
                                </PopCloseBtn>
                                <PopLogoutBtn
                                  isDark={isDark}
                                  onClick={this.onClickLogout}
                                  type="button"
                                >
                                  Confirm
                                </PopLogoutBtn>
                              </div>
                            </PopContainer>
                          </PopSuperContainer>
                        )}
                      </Popup>
                    </div>
                  </div>
                </>
              </HeaderMainContainer>
            </>
          )
        }}
      </WactContext.Consumer>
    )
  }
}

export default withRouter(Header)
