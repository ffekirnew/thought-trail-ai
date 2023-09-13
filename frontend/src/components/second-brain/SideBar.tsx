import { Button, Flex, Spacer, VStack } from '@chakra-ui/react'
import { BsGraphUpArrow, BsHouse, BsListTask, BsNodePlus, BsSuitDiamond } from 'react-icons/bs'
import SideBarOption from './SideBarOption'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate();

  return <Flex align={'left'} height={'100vh'} flexDirection={'column'} gap={5} paddingY={5} width={'100%'}>
    <VStack align={'left'} width={'100%'} gap={2}>
      <SideBarOption text='Knowledge' icon={<BsHouse />} />
      <SideBarOption text='Random Notions' icon={<BsSuitDiamond />} />
      <SideBarOption text='Summary' icon={<BsNodePlus />} />
      <SideBarOption text='Tasks' icon={<BsListTask />} />
      <SideBarOption text='Plans' icon={<BsGraphUpArrow />} />
    </VStack>
    <Spacer />
    <VStack align={'left'}>
      <Button background='brand.primary' onClick={() => navigate('/')} variant={'solid'}>Sign Out</Button>
    </VStack>
  </Flex>
}

export default SideBar