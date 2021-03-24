import { InfoIcon } from '@chakra-ui/icons'
import { ListItem, ListIcon } from '@chakra-ui/react'
import React from 'react'
import { IProduct } from 'types'

interface Props {
  item: IProduct
}

const InfoList: React.FC<Props> = ({ item }): JSX.Element => {
  const { platform, date, description, price, category, name } = item
  return (
    <>
      <ListItem>
        <ListIcon as={InfoIcon} color="facebook.500" />
        Game name: <b>{name}</b>
      </ListItem>
      <ListItem>
        <ListIcon as={InfoIcon} color="facebook.500" />
        Categories: <b>{category.split(',').join(' | ')}</b>
      </ListItem>
      <ListItem>
        <ListIcon as={InfoIcon} color="facebook.500" />
        Publish Date: <b>{date}</b>
      </ListItem>
      <ListItem>
        <ListIcon as={InfoIcon} color="facebook.500" />
        Platform: <b>{platform}</b>
      </ListItem>
      <ListItem textAlign="justify">
        <ListIcon as={InfoIcon} color="facebook.500" />
        About: {description}
      </ListItem>
      <ListItem textAlign="justify">
        <ListIcon as={InfoIcon} color="facebook.500" />
        Price: <b>{price}$</b>
      </ListItem>
    </>
  )
}

export default InfoList
