import WatchContext from '../../Context/WatchContext'
import {
  SectionsContainer,
  ErrorTitle,
  ErrorDescription,
} from '../styledComponents/styledComponents'
import Header from '../Header/index'
import LeftNavBar from '../LeftNavBar'
import './index.css'

const NotFound = () => (
  <WatchContext.Consumer>
    {value => {
      const {isDark} = value
      const ThemeImg = () => {
        if (isDark) {
          return 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        }
        return 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      }
      return (
        <>
          <Header />

          <div className="home-super-container">
            <LeftNavBar />
            <>
              <SectionsContainer isDark={isDark}>
                <div className="not-found-main-container">
                  <div className="not-found-card-container">
                    <img
                      src={ThemeImg()}
                      alt="not found"
                      className="not-found-image"
                    />
                    <ErrorTitle isDark={isDark}>Page Not Found</ErrorTitle>
                    <ErrorDescription>
                      we are sorry, the page you requested could not be found.
                    </ErrorDescription>
                  </div>
                </div>
              </SectionsContainer>
            </>
          </div>
        </>
      )
    }}
  </WatchContext.Consumer>
)

export default NotFound
