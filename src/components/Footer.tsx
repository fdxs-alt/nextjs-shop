import { Box, Heading } from '@chakra-ui/layout'
import React from 'react'

const Footer = () => {
  return (
    <Box w="100%" p="50px" background="red.600">
      <Heading fontSize={22} color="white" fontWeight="500" textAlign="center">
        Created in 2021 by Jakub Sukiennik ®
      </Heading>
    </Box>
  )
}

export default Footer
