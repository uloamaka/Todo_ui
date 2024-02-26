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
} from '@chakra-ui/react';
import axios from 'axios';

const Register = () => {
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
      await axios.post('/api/v1/auth/register', { email, password }, config);
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
      <FormControl>
          <FormLabel fontSize={"3rem"}>Sign up</FormLabel>
      <Input
        placeholder="Enter your email"
        onChange={({ target }) => setEmail(target.value)}
      ></Input>
      <InputGroup>
              <Input
                  style={{ marginTop: 10 }}
          type={show ? 'text' : 'password'}
          placeholder="Enter your password"
          onChange={({ target }) => setPassword(target.value)}
        ></Input>
        <InputRightElement width={'4.5rem'}>
          <Button h="1.75rem" size={'sm'} onClick={handleClick}>
            {show ? 'Hide' : 'show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        colorScheme="yellow"
        width={'100%'}
        color={'white'}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign up
          </Button>
 <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Text fontSize="sm">or</Text>
        <Link href="#" color="gray.500" ml={2}>
          Already have an account? Sign In
        </Link>
      </Box>
    </FormControl>
  );
};

export default Register;
