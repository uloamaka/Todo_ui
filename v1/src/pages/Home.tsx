import * as React from 'react';
import {
  Flex,
  Box,
  Button,
  Link,
  Heading,
  Text,
  Divider,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { ArrowForwardIcon } from '@chakra-ui/icons';

interface IHomepageProps {}

const Homepage: React.FunctionComponent<IHomepageProps> = (props) => {
  const history = useHistory();

  const submitHandler = async () => {
    history.push('/login');
  };

  const redirectToSignUp = () => {
    history.push('/register');
  };

  return (
    <Flex color="white" minHeight={'100vh'} padding={0} border={0}>
      <Box
        width="50%"
        display={'flex'}
        background="black"
        padding={6}
        backgroundImage={'../toa-heftiba-y04kaycRhL4-unsplash.jpg'}
        backgroundSize={'cover'}
        backgroundPosition={'center'}
        rounded="lg"
      >
        <Text fontSize="5xl">Zeit</Text>
      </Box>
      <Box
        width="50%"
        background="white"
        padding={10}
        color={'black'}
        textAlign={'center'}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        marginTop={'100px'}
      >
        <Heading as="h2" fontSize="4xl" mb={4}>
          {' '}
          Zeit Productivity
        </Heading>
        <Text fontSize="md" mb={6}>
          With only the features you need, Zeit is customized
          <br /> for individuals seeking a stress-free way to stay
          <br /> focused on their goals, projects and tasks.
        </Text>
        <br />
        <Button
          colorScheme="yellow"
          variant="solid"
          width={{ base: '100%', sm: '80%' }}
          onClick={submitHandler}
        >
          Get Started
        </Button>
        <Box textAlign="center">
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" color="gray.300">
              or
            </AbsoluteCenter>
          </Box>
          <Flex alignItems="center" justifyContent="center">
            <Link
              onClick={redirectToSignUp}
              color="grey"
              fontWeight="semibold"
              fontSize="md"
              cursor="pointer" // Set cursor to pointer for better UX
            >
              Don't have an account? Sign Up
            </Link>
            <ArrowForwardIcon ml={2} color="grey" />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Homepage;
