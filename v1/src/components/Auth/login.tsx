import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  InputRightElement,
  Button,
  Input,
  useToast,
  InputGroup,
  FormLabel,
  Link,
  Text,
  Box,
  Center,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please Fill all the Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      await axios.post('/api/v1/auth/login', { email, password }, config);
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });

      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error occured',
        description: 'hi',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing={4}>
      <Center width={{ base: '100%', sm: '70%' }}>
        <FormControl>
          <FormLabel fontSize="3rem">Sign In</FormLabel>
          <Input
            placeholder="Enter your email"
            onChange={({ target }) => setEmail(target.value)}
          ></Input>
          <InputGroup style={{ marginTop: 10 }}>
            <Input
              type={show ? 'text' : 'password'}
              placeholder="Enter your password"
              onChange={({ target }) => setPassword(target.value)}
            ></Input>
            <InputRightElement width={'4rem'}>
              <Button size={'sm'} onClick={handleClick} background={'white'}>
                <Icon as={show ? ViewOffIcon : ViewIcon} />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            colorScheme="yellow"
            width={'100%'}
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
          >
            Sign In
          </Button>
          <Box mt={6} textAlign="center">
            <Text fontSize="sm" fontWeight="semibold" color="gray.300" mb={2}>
              ——————————— or ———————————
            </Text>
            <Flex alignItems="center" justifyContent="center">
              <Link href="#" color="grey" fontWeight="semibold" fontSize="md">
                Don't have an account? Sign Up
              </Link>
              <ArrowForwardIcon ml={2} color="grey" />
            </Flex>
          </Box>
        </FormControl>
      </Center>
    </VStack>
  );
};

export default Login;
