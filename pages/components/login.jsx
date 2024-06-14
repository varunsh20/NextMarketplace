import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {Box,Flex,Button,TextInput,Text,Input,InputGroup} from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
    <Box pt={40} mb={10}>
        <Flex  pr={"20"} alignItems={"center"} justifyContent={"center"} mr={"auto"}>
            <Box mt={50} h="60vh" w="40%" pt={2} pb={4}  bg="rgba(21, 34, 57, 0.6)"  boxShadow={ '0px 0px 10px 0.2px #5684db'}
            border="solid 0.9px #253350" borderRadius={"25px"}  zIndex={2} mb="15px">
                    
                <Box mt={2} p="30px">
                    
                    <Box display={"flex"} alignItems={"flex-start"} mb={"2px"}>
                        <Text fontSize={"22px"}  color="white" pl= "2px" mt={2}>Email :</Text>
                    </Box>
                    <InputGroup>
                    <Input h = {"40px"} placeholder="123@"  size='sm' bg="rgb(93 132 202 / 60%)" color="white"
                    fontSize={"22px"} value={email} onChange={(e) => setEmail(e.target.value)} required={true}/>
                    </InputGroup>
                    <Box display={"flex"} alignItems={"flex-start"} mb={"2px"}>
                        <Text fontSize={"22px"}  color="white" pl= "2px" mt={2}>Password :</Text>
                    </Box>
                    <InputGroup>
                    <Input h = {"40px"} placeholder="****"  size='sm' bg="rgb(93 132 202 / 60%)" color="white"
                    fontSize={"22px"} value={password} onChange={(e) => setPassword(e.target.value)} required={true} type='password'/>
                    </InputGroup>
                </Box>
                <Box p="30px">
                    <Button  w="100%" h="60px" fontSize={"24px"} color={"white"} 
                    bgColor={"#ea6969"}  _hover={{ bgColor:"#d43b3b", 
                    cursor:"pointer"}}  onClick={handleSubmit}>
                    Login 
                </Button>
                </Box>
            </Box>
        </Flex>
        <ToastContainer/>
        </Box>
    </>
  );
};

export default Login;