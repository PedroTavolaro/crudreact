import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Box,
} from '@chakra-ui/react'

import styles from '../styles/ModalComp.css';

import React, { useState } from 'react'

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || '');
    const [email, setEmail] = useState(dataEdit.email || '')
    const [entrada, setEntrada] = useState(dataEdit.entrada || '❌');
    const [saida, setSaida] = useState(dataEdit.saida || ' ❌ ');
    const [countAdvrt, setCountAdvrt] = useState(dataEdit.countAdvrt || 0);
    const [count, setCount] = useState(dataEdit.count || 0);
    
    const handleSave = () => {
        if(!name || !email ) return;

        if(emailAlreadyExists()){
            return alert("E-mail já cadastrado")
        }

        if(Object.keys(dataEdit).length) {
            data[dataEdit.index] = {name, email, entrada, saida, count, countAdvrt}
        }

        const newDataArray = !Object.keys(dataEdit).length
        ? [...(data ? data : []), {name, email, entrada, saida, count, countAdvrt}]
        : [...(data ? data : [])];

        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
        setData(newDataArray);
        onClose();
    }

    const emailAlreadyExists = () =>{
        if(dataEdit.email !== email && data?.length) {
            return data.find((item) => item.email === email)
        }
        return false;
    };

    const handleIncrement = () =>{
        setCount(count + 1)
    }

     const handleDecrement = () => {
        setCount(count - 1)
    }

    const handleIncrementAdvrt = () => {
        setCountAdvrt(countAdvrt + 1);
    }

    const handleDecrementAdvrt = () => {
        setCountAdvrt(countAdvrt - 1);
    }

 

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Clientes</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display='flex' flexDir='column' gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input 
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>

                            <Box className='email'>
                                <FormLabel>E-mail</FormLabel>
                                <Input 
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            
                            <div className='master'>
                                <Box>
                                    <div className='entrada'>
                                        <strong>Entrada</strong>
                                        <div className='container'>
                                            <div>
                                                <input type="checkbox" id='scales' name='scales' value=" ✔️ " onChange={(e) => setEntrada(e.target.value)}/>
                                                <label for="scales"> Sim</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" id='horns' name='horns' value=" ❌ " onChange={(e) => setEntrada(e.target.value)}/>
                                                <label for="horns"> Nao</label>
                                            </div>
                                        </div>
                                    </div>   
                                </Box>

                                <Box>
                                <div className='saida'>
                                    <strong>Saida</strong>
                                        <div className='container'>
                                            <div>
                                                <input type="checkbox" id='scales' name='scales' value=" ✔️ " onChange={(e) => setSaida(e.target.value)}/>
                                                <label for="scales"> Sim</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" id='horns' name='horns' value=" ❌ " onChange={(e) => setSaida(e.target.value)}/>
                                                <label for="horns"> Nao</label>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                            </div>

                            <div className='masterBonus'>
                            <Box>
                                <div className='bonus'>
                                <strong>Bônus</strong>
                                    <div className='containerBonus'>
                                        <button className='decrement' onClick={handleDecrement}> - </button>
                                            <input 
                                                type='number'
                                                value={count}
                                                readOnly
                                                id='my-input'
                                                onChange={(e) => setCount(e.target.value)}
                                            />
                                        <button className='increment' onClick={handleIncrement}> + </button>
                                    </div>
                                </div>
                            </Box>

                            <Box>
                                <div className='bonus'>
                                <strong>Advertência</strong>
                                    <div className='containerBonus'>
                                        <button className='decrement' onClick={handleDecrementAdvrt}> - </button>
                                            <input 
                                                type='number'
                                                value={countAdvrt}
                                                readOnly
                                                id='my-input'
                                                onChange={(e) => setCountAdvrt(e.target.value)}
                                            />
                                        <button className='increment' onClick={handleIncrementAdvrt}> + </button>
                                    </div>
                                </div>
                            </Box>
                            </div>

                            </FormControl>
                            </ModalBody>

                            <ModalFooter justifyContent='center'>
                                <Button type='submit' colorScheme='green' mr={3} onClick={handleSave}>
                                    Salvar
                                </Button>
                                <Button colorScheme='red' onClick={onClose}>
                                    Cancelar
                                </Button>
                            </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default ModalComp;