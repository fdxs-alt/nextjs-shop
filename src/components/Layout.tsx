import { Flex } from '@chakra-ui/react'
import React from 'react'
import { NextSeo } from 'next-seo'
import Navbar from './Navbar'
import Footer from './Footer'
interface LayoutProps {
  title: string
  isWithNavbar?: boolean
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  isWithNavbar = false,
}) => {
  return (
    <>
      <NextSeo title={title} description="Shop build with DatoCMS" />
      <Flex
        w="100%"
        flexDirection={isWithNavbar ? 'column' : 'row'}
        minHeight="100vh"
        justifyContent="space-between"
      >
        {isWithNavbar && <Navbar />}
        {children}
        {isWithNavbar && <Footer />}
      </Flex>
    </>
  )
}

export default Layout
