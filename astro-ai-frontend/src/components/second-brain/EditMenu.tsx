import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react'
import React from 'react'
import { BsChevronDown, BsThreeDots } from 'react-icons/bs'

const EditMenu = () => {
  return <Menu>
  <MenuButton as={Button} variant={'ghost'}>
    <BsThreeDots />
  </MenuButton>
  <MenuList>
    <MenuItem>Delete Note</MenuItem>
    <MenuItem>Summerize Note</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Add as Task</MenuItem>
    <MenuItem>Add to plans</MenuItem>
  </MenuList>
</Menu>
}

export default EditMenu
