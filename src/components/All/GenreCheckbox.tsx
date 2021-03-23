import { Checkbox, WrapItem } from '@chakra-ui/react'
import React from 'react'

interface Props {
  category: string
  removeGenre: () => void
  addGenre: () => void
}

const GenreCheckbox: React.FC<Props> = ({
  category,
  removeGenre,
  addGenre,
}): JSX.Element => {
  return (
    <WrapItem>
      <Checkbox
        onChange={(e) => {
          if (e.target.checked) {
            addGenre()
          } else {
            removeGenre()
          }
        }}
      >
        {category}
      </Checkbox>
    </WrapItem>
  )
}

export default GenreCheckbox
