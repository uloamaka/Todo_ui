import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  Button,
  Input,
  useToast,
  FormLabel,
  Center,
  Link,
} from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ForgetPass = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const redirectToLogin = () => {
    history.push('/login');
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!email) {
      toast({
        title: 'Please enter a valid email address!',
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
      await axios.post('/api/v1/auth/forget-password', { email }, config);
      toast({
        title: 'Reset Email sent successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });

      setLoading(false);
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
          <FormLabel fontSize="2.5rem"> Forgot Password </FormLabel>
          <Input
            mt={3}
            placeholder="Enter your email"
            onChange={({ target }) => setEmail(target.value)}
          ></Input>
          <Button
            colorScheme="yellow"
            width={'100%'}
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
            mt={3}
          >
            Forgot Password
          </Button>
          <Link
            onClick={redirectToLogin}
            color="grey"
            fontWeight="semibold"
            fontSize="md"
            mt={3}
            display="block"
          >
            Remeber now?
          </Link>
        </FormControl>
      </Center>
    </VStack>
  );
};

export default ForgetPass;
