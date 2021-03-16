import { Flex } from '@chakra-ui/react'
import React from 'react'
import { NextSeo } from 'next-seo'
interface LayoutProps {
  title: string
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <NextSeo
        title={title}
        description="Shop build with DatoCMS and firebase"
      />
      <Flex w="100%" minH="100vh">
        {children}
      </Flex>
    </>
  )
}

export default Layout
