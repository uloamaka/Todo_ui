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
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const history = useHistory();
  const handleClick = () => setShow(!show);

  const redirectToSignIn = () => {
    history.push('/login');
  };

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

      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        { email, password },
        config,
      );
      console.log(response);
      toast({
        title: 'Welcome To Zeit!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      setLoading(false);
      history.push('/todo');
    } catch (error: any) {
      toast({
        title: 'Error occured',
        description:
          error.response?.data.message || 'Opps something went wrong!',
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
          <FormLabel fontSize="3rem">Sign Up</FormLabel>
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
            Sign Up
          </Button>
          <Box mt={6} textAlign="center">
            <Text fontSize="sm" fontWeight="semibold" color="gray.300" mb={2}>
              ——————————— or ———————————
            </Text>
            <Flex alignItems="center" justifyContent="center">
              <Link
                onClick={redirectToSignIn}
                color="grey"
                fontWeight="semibold"
                fontSize="md"
              >
                Already have an account? Sign In
              </Link>
              <ArrowForwardIcon ml={2} color="grey" />
            </Flex>
          </Box>
        </FormControl>
      </Center>
    </VStack>
  );
};

export default Register;
