import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { returnMainId } from 'src/utitlity'
import HeaderTeamSubNav from 'src/components/header/subheaderfeedbackchart'
import TeamFeedbackSubNav from './textFeedbackHeader'
import Header from './'
import HeaderTeamSubNavNew from 'src/components/header/teamSubNavNew'
import HeaderCompanySubNavNew from 'src/components/header/headerCompanySubNav'
import HeaderUserSubNav from 'src/components/header/userSettingsSubHeader'
import FeedbackInputSubNav from './feedbackInputSubNav'

interface Props {
  children?: React.ReactChild | React.ReactChild[]
}

const returnSubNav = (pathname: string): any => {
  if (pathname === '/team/feedbackRequest') {
    return null
  }
  if (
    (pathname.includes('/data/') && pathname.includes('/team/')) ||
    (pathname.includes('/giveFeedback') && pathname.includes('/team/'))
  ) {
    return <HeaderTeamSubNav level1={'feedchart'} />
  }
  if (
    pathname === '/user/generalSettings' ||
    pathname === '/user/teamSettings'
  ) {
    return <HeaderUserSubNav />
  }

  if (pathname.includes('/team/')) {
    if (pathname === '/team/teamFeedback') return <TeamFeedbackSubNav />
    return (
      <>
        <HeaderTeamSubNavNew />
        {pathname.includes('/settings/feedbackInput') && (
          <FeedbackInputSubNav />
        )}
      </>
    )
  }
  if (pathname.includes('/company/')) {
    return <HeaderCompanySubNavNew />
  }

  return null
}

const authClassString = (pathname: string): any => {
  if (pathname == '/') {
    return 'auth'
  } else {
    return 'main'
  }
}

const MainComponent = (props: Props) => {
  const { children } = props
  const { pathname } = useLocation()
  const subnav = returnSubNav(pathname)
  const id = returnMainId(pathname)

  return (
    <main id={id} className={authClassString(pathname)}>
      {(pathname !== '/' && pathname !== '/createAccount' && pathname !== '/resetPassword') && (
        <Header type={pathname === '/home' ? 'white' : undefined}>
          {subnav}
        </Header>
      )}
      {children}
    </main>
  )
}

export default MainComponent
