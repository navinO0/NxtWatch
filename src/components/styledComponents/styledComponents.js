import styled from 'styled-components/macro'

export const CustumeDetailsPara = styled.p`
  color: ${props => (props.isDark ? '#909090' : '#475569')};
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: 400;
  margin-right: 10px;
  margin-bottom: 0px;
`
export const VideoTitle = styled.p`
  font-size: 15px;
  font-family: 'Roboto';
  color: ${props => (props.isDark ? ' #e2e8f0' : '#475569')};
  font-weight: 500;
  margin-bottom: 0px;
`

export const SectionsContainer = styled.div`
  height: 92vh;
  padding: 20px;
  width: 100%;
  overflow-y: auto;
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f1f1f1')};
  @media screen and (max-width: 576px) {
    padding: 0px;
  }
`
export const FailureViewContainer = styled.div`
  height: 92vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow-y: auto;
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f1f1f1')};
`

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 92vh;
  width: 100%;
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f1f1f1')};
`
export const FailureTitle = styled.h1`
  font-size: 30px;
  font-family: Roboto;
  color: ${props => (props.isDark ? ' #ebebeb' : '#000000')};
  font-weight: 700;
  text-align: center;
`
export const FailureDescription = styled.p`
  color: #64748b;
  font-family: 'Roboto';
  font-size: 17px;
  font-weight: 400;
  margin-right: 10px;
  margin-bottom: 0px;
  text-align: center;
`

export const RetryButton = styled.button`
  padding: 10px;
  width: 100px;
  border-radius: 7px;
  border-style: none;
  background-color: #4f46e5;
  color: #ffffff;
  font-family: 'Roboto';
  cursor: pointer;
  margin-top: 30px;
`
export const LeftNavBarMainContainer = styled.div`
  width: 220px;

  min-width: 170px;
  height: 92vh;
  background-color: ${props => (props.isDark ? ' #212121' : '#f9f9f9')};
`

export const HeaderMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => (props.isDark ? ' #212121' : '#f9f9f9')};
  padding-left: 30px;
  padding: 15px;
  @media screen and (max-width: 576px) {
    padding-right: 6px;
  }
  padding-right: 30px;
  align-items: center;
  height: 8vh;
`
export const ActiveLeftNaveButton = styled.button`
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  background-color: ${props => {
    if (!props.isDark) {
      return props.selected ? '#e2e8f0' : 'transparent'
    }
    return props.selected ? '#313131' : 'transparent'
  }};

  padding-left: 20px;
  padding-right: 15px;
  margin-bottom: 0px;
  margin-top: 0px;
  height: 50px;
  width: 100%;
  border-style: none;
  @media screen and (max-width: 576px) {
    border-radius: 50px;
  }
`
export const ActiveLeftIcon = styled.p`
  margin-right: 10px;
`

export const ConstumeVideoDescription = styled.p`
  color: ${props => (props.isDark ? '#606060' : '#616e76')};
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 400;
  margin-right: 10px;
  margin-bottom: 0px;
`

export const CostumeLeftNavSection = styled.p`
  font-family: Roboto;
  font-size: 15px;
  color: ${props => (props.isDark ? '#e2e8f0' : '#475569')};
  align-self: center;
`
export const SectionIconContainer = styled.p`
  color: ${props => {
    if (props.isDark) {
      return props.selected ? '#ff0000' : '#e2e8f0'
    }
    return props.selected ? '#ff0000' : '#475569'
  }};

  font-size: 17px;
  display: flex;
  align-items: center;
`
export const ThemeIconStatus = styled.button`
  color: ${props => (props.isDark ? '#f9f9f9' : '#0f0f0f')};
  background-color: transparent;
  border-style: none;
  cursor: pointer;
  outline: none;
`
export const SeachContainerInput = styled.div`
  background-color: ${props => (props.isDark ? 'transparent' : '#ffffff')};
  display: flex;
  color: ${props => (props.isDark ? '#cbd5e1' : '#616e7c')};
  align-items: stretch;
  margin-top: 20px;
  margin-bottom: 20px;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => (props.isDark ? '#616e7c' : '#cbd5e1')};
  width: 410px;
  @media screen and (max-width: 576px) {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
  justify-content: space-between;
  border-radius: 3px;
`

export const SearchInputIconCont = styled.button`
  background-color: ${props => (props.isDark ? ' #1e293b' : '#f1f5f9')};
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  margin-left: 10px;
  color: ${props => (props.isDark ? '#cbd5e1' : '#616e7c')};
  border: none;
  border-left-style: solid;
  border-width: 1px;
  border-color: ${props => (props.isDark ? '#616e7c' : '#cbd5e1')};
  width: 70px;
`
export const SectionBannerContainer = styled.div`
  display: flex;
  color: ${props => (props.isDark ? '#616e7c' : '#cbd5e1')};
  background-color: ${props => (props.isDark ? '#181818' : '#ebebeb')};
  align-items: center;
  padding: 30px;
  height: 160px;
  @media screen and (max-width: 576px) {
    padding: 30px;
    height: 120px;
  }
`

export const SectionBannerIconContainer = styled.div`
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#cbd5e1')};
  height: 80px;
  width: 80px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 26px;
  color: #ff0000;
`

export const SectionBannerTitle = styled.h1`
  font-family: 'Roboto';
  color: ${props => (props.isDark ? ' #ebebeb' : '#000000')};
`
export const ErrorTitle = styled.h1`
  font-size: 30px;
  font-family: Roboto;
  color: ${props => (props.isDark ? ' #ebebeb' : '#000000')};
  font-weight: 700;
  text-align: center;
`

export const ErrorDescription = styled.p`
  color: #64748b;
  font-family: 'Roboto';
  font-size: 17px;
  font-weight: 400;
  margin-right: 10px;
  margin-bottom: 0px;
  text-align: center;
`
export const VideoReactionButtons = styled.button`
  display: flex;
  align-items: center;
  margin-left: 0px;
  cursor: pointer;
  background-color: transparent;
  border-style: none;
  width: 90px;
  padding: 0px;
  justify-content: flex-start;
  font-family: 'Roboto';
  font-size: 12px;
`

export const VideoReactionText = styled.p`
  font-family: 'Roboto';

  color: ${props => {
    if (props.isDark) {
      return props.isSaved ? '#2563eb' : '#909090'
    }
    return props.isSaved ? '#2563eb' : '#616e76'
  }};

  font-family: 'Roboto';
  font-size: 14px;
`
export const HeaderLogoutButton = styled.button`
  border-style: solid;
  background-color: transparent;
  cursor: pointer;
  font-family: 'Roboto';
  height: 30px;
  font-size: 17px;
  font-weight: 400;
  border-width: 1px;
  width: 100px;

  color: ${props => (props.isDark ? '#ffffff' : '#4f46e5')};
  border-color: ${props => (props.isDark ? '#ffffff' : '#4f46e5')};
`
export const CostumeInput = styled.input`
  width: 100%;
  height: 35px;
  padding: 10px;
  font-family: 'Roboto';
  border-style: none;
  outline: none;
  font-size: 14px;
  background-color: transparent;
  color: ${props => (props.isDark ? '#909090' : '#475569')};
`
export const OptContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  width: 200px;
  margin-left: auto;
  margin-right: auto;

  background-color: ${props => (props.isDark ? ' #212121' : '#f9f9f9')};
`
export const PopContainer = styled.div`
  border-radius: 7px;
  width: 300px;

  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${props => (props.isDark ? ' #212121' : '#f9f9f9')};
`

export const PopContainerSections = styled.div`
  border-radius: 7px;
  width: 100%;

  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${props => (props.isDark ? ' #212121' : '#f9f9f9')};
`
export const PopCloseBtn = styled.button`
  font-size: 16px;
  font-weight: 400;
  font-family: 'Roboto';
  color: white;
  padding: 8px 15px 8px 15px;
  margin: 8px;
  border-color: #909090;
  background-color: transparent;
  color: #909090;
  border: solid;
  border-width: 1px;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
`

export const PopLogoutBtn = styled.button`
  font-size: 16px;
  font-weight: 400;
  font-family: 'Roboto';
  cursor: pointer;
  color: white;
  padding: 8px 15px 8px 15px;
  margin: 8px;
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  outline: none;
`
export const PopSuperContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
`
export const PopCloseBtnOpt = styled.button`
  font-size: 25px;
  font-weight: 400;
  align-self: flex-end;
  font-family: 'Roboto';

  padding: 8px 15px 8px 15px;
  margin: 8px;
  border-color: #909090;
  background-color: transparent;
  color: ${props => (props.isDark ? '#e2e8f0' : '#616e76')};
  border: none;
  margin-right: 30px;
  margin-top: 30px;
  border-width: 1px;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
`
