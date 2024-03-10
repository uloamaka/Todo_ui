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
  Center,
  Icon,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ResetPass = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!newPassword || !confirmPassword) {
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
      await axios.post(
        '/api/v1/auth/reset-password',
        { newPassword, confirmPassword },
        config,
      );
      toast({
        title: 'Password reset success',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });

      setLoading(false);
      history.push('/login');
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
          <FormLabel fontSize="2.5rem">Reset Password</FormLabel>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter your new password"
            onChange={({ target }) => setNewPassword(target.value)}
            mb={2}
          ></Input>
          <InputGroup style={{ marginTop: 10 }}>
            <Input
              type={show ? 'text' : 'password'}
              placeholder="Confirm your new password"
              onChange={({ target }) => setConfirmPassword(target.value)}
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
            Reset Password
          </Button>
        </FormControl>
      </Center>
    </VStack>
  );
};

export default ResetPass;
