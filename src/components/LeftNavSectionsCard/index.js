import {Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'

import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {
  ActiveLeftNaveButton,
  SectionIconContainer,
  CostumeLeftNavSection,
} from '../styledComponents/styledComponents'
import WatchContext from '../../Context/WatchContext'
import './index.css'

const LeftNavSectionsCard = props => {
  const {eachOne} = props
  const {linkto, sectionText, id} = eachOne

  const renderSectionIcons = () => {
    switch (id) {
      case 'HOME':
        return <AiFillHome className="section-icon" />
      case 'GAMING':
        return <SiYoutubegaming className="section-icon" />
      case 'SAVEDVIDEOS':
        return <BiListPlus className="section-icon" />
      case 'TRENDING':
        return <HiFire className="section-icon" />

      default:
        return null
    }
  }
  return (
    <WatchContext.Consumer>
      {value => {
        const {isDark, onClickActiveSection, activeSelected} = value
        const activeTab = id === activeSelected

        const clicked = () => {
          onClickActiveSection(id)
        }

        return (
          <Link to={`${linkto}`} onClick={clicked} className="link-item">
            <li>
              <ActiveLeftNaveButton
                type="button"
                selected={activeTab}
                isDark={isDark}
              >
                <SectionIconContainer selected={activeTab} isDark={isDark}>
                  {/* <AiFillHome className="section-icon" /> */}
                  {renderSectionIcons()}
                </SectionIconContainer>

                <CostumeLeftNavSection
                  isDark={isDark}
                  className="hover-underline-animation"
                >
                  {sectionText}
                </CostumeLeftNavSection>
              </ActiveLeftNaveButton>
            </li>
          </Link>
        )
      }}
    </WatchContext.Consumer>
  )
}

export default LeftNavSectionsCard
