import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { AppDispatch } from 'src/configureStore'
import { setWindowWidth } from 'src/redux/auth/actions'

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setWindowWidth: (width: number) => dispatch(setWindowWidth(width)),
})

const connector = connect(null, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

const ViewPort = (props: Props) => {
  const { setWindowWidth } = props
  useEffect(() => {
    window.addEventListener('resize', () => {
      
      setWindowWidth(window.innerWidth)
    })
  }, [])

  return null
}

export default connector(ViewPort)
