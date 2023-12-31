import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Container } from '../../styled'

const index = ({ children }) => {
  return (
    <div>
      <Header />
      <Container
        direction="column"
        height="90vh"
        overflow="auto"
        background="#dcdcdc"
      >
        {children}
      </Container>
    </div>
  )
}
export default index
