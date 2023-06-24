import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue
} from '@chakra-ui/react'

import { useState, useEffect } from 'react'


import ModalComp from './components/ModalComp'

const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({})

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
    ? JSON.parse(localStorage.getItem("cad_cliente"))
    : [];
    setData(db_costumer);
  }, [setData]);
  
  
  useEffect(() => {
    const db = localStorage.getItem("cad_cliente")
    console.log(db)
})

  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email);

    setData(newArray);

    localStorage.setItem("cad_cliente", JSON.stringify(newArray))
  }

  return (

    <Flex
      className='containerMaster'
      h='100vh'
      fontSize='20px'
      fontFamily='poppins'
    >
      <Box className='tableContainer' w='100%' h='100vh' py={10} px={2} >
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          Novo Cadastro
        </Button>
        <Box  overflowY='auto' height='100%'>
        <Table  mt='6'>
          <Thead >
              <tr >
                <th className='table' maxW={isMobile ? 5 : 100} >
                  Nome
                </th>
                <th className='table' maxW={isMobile ? 5 : 100} >
                  E-mail
                </th>
                <th className='table' maxW={isMobile ? 5 : 100} >
                  Entrada
                </th>
                <th className='table' maxW={isMobile ? 5 : 100} >
                  Saida
                </th>
                <th className='table' maxW={isMobile ? 5 : 100} >
                  Bônus
                </th>
                <th className='table' maxW={isMobile ? 5 : 100} >
                  Advertência
                </th>
               
                <th className='table' p={0}></th>
                <th className='table' p={0}></th>
              </tr>
          </Thead>
          
          <Tbody>
            {data.map(({name, email, entrada, saida, count, countAdvrt }, index) => (
              <Tr key={index} cursor="pointer" _hover={{bg: "gray.100"}}>
                <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                <td className='editIcon' maxW={isMobile ? 5 : 100}>{entrada}</td>
                <td className='editIcon' maxW={isMobile ? 5 : 100}>{saida}</td>
                <td className='editIcon' maxW={isMobile ? 5 : 100}>{count}</td>
                <td className='editIcon' maxW={isMobile ? 5 : 100}>{countAdvrt}</td>
                <td className='editIcon' p={0}>
                  <EditIcon 
                    fontSize={20}
                    onClick={() => [
                      setDataEdit({ name, email, entrada, saida, count, countAdvrt, index}),
                      onOpen(),
                    ]}
                  />
                </td>
                <td className='editIcon' p={0}>
                      <DeleteIcon 
                        fontSize={20}
                        onClick={() => handleRemove(email)}
                      />
                  </td>
              </Tr>
            ))}
          </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        setData={setData}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  )
}

export default App
