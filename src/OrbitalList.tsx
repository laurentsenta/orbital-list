import React from 'react'
import OrbitalWrapper from './OrbitalWrapper'
// import styles from './styles.module.css'

interface IProps {}

const OrbitalList: React.FC<IProps> = ({ children }) => {
  return <OrbitalWrapper>{children}</OrbitalWrapper>
}

export default OrbitalList
