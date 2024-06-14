import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {Box,Flex,Button,Grid,Text,List,ListItem,ListIcon,Image} from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';


const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  console.log(products);
  return (
    <>
            <Flex direction="column" mb={1} mt={18} pl={16}>
             <Flex direction="column" w="100%" mt="100px" pl={10}>
                        <Text fontWeight="bold" fontSize="25px" mb={5} color="white" mt="10px">
                            Available Products
                        </Text>
                    <Grid marginBottom="4" w="100%" direction="row" templateColumns='repeat(4, 1fr)' gap={5}> 
                    {products.map((product) => (
                        <Flex w="100%" >
                                <List  h="90%" w="75%" key="low" borderWidth="1px" borderColor={"#253350"}
                                    borderRadius="md" background="#4c689d" padding="6" marginRight="5"
                                    textAlign="left" fontSize="20px" spacing={3} marginBottom="8">
                                    <>
                                    <ListItem>
                                    <Image src={product.imageURL} alt="product" w={40} height={40}></Image>
                                    </ListItem>
                                        <ListItem color = "white" fontStyle="bold">
                                            Product - {product.name}.
                                        </ListItem>
                                        <ListItem color = "white" fontStyle="bold">
                                            Company -  {product.company}.
                                        </ListItem>
                                        <ListItem color = "white" fontStyle="bold">
                                            Description - {product.description}.
                                        </ListItem>
                                        <ListItem color = "white" fontStyle="bold">
                                            Only @ {product.price}.
                                        </ListItem>
                                    </>
                                    <Box display="flex" alignItems = "center" justifyContent="center">
                                         <Button  mt="10px" fontSize="20px" background="#ea6969"
                                         color={"white"} 
                                         _hover={{ bg: "#d43b3b" }}
                                         
                                         >
                                        Buy Product</Button>
                                    </Box>
                                </List>
                        </Flex>
                        ))}
                    </Grid>
            </Flex>
            </Flex>
            <ToastContainer/>
    </>);
    }

export default Dashboard;