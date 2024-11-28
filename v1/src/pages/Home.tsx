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
        width="45%"
        display={'flex'}
        background="white"
        padding={6}
        margin={2}
        backgroundImage={'../toa-heftiba-y04kaycRhL4-unsplash.jpg'}
        backgroundSize={'cover'}
        backgroundPosition={'center'}
        rounded="lg"
      >
        <Text fontSize="5xl">Zeit</Text>
      </Box>
      <Flex width="55%" alignItems="center" justifyContent="center" padding={6}>
        <Box
          width="80%"
          background="white"
          padding={10}
          color={'black'}
          textAlign={'left'}
          borderRadius="md"
        >
          <Heading as="h2" fontSize="4xl" mb={4}>
            {' '}
            Zeit Productivity
          </Heading>
          <Text fontSize="md" mb={2}>
            With only the features you need, Zeit is customized
            <br /> for individuals seeking a stress-free way to stay
            <br /> focused on their goals, projects and tasks.
          </Text>
          <br />
          <Box width="100%" textAlign="center" mt={4}>
            <Button colorScheme="yellow" width="100%" onClick={submitHandler}>
              Get Started
            </Button>
          </Box>
          <Box textAlign="center">
            <Box position="relative" padding="4">
              <Divider />
              <AbsoluteCenter bg="white" px={4} color="gray.500" fontSize="sm">
                or
              </AbsoluteCenter>
            </Box>
            <Flex alignItems="center" justifyContent="center" mt={4}>
              <Link
                onClick={redirectToSignUp}
                color="grey"
                fontWeight="semibold"
                fontSize="md"
                cursor="pointer"
              >
                Don't have an account? Sign Up
              </Link>
              <ArrowForwardIcon ml={2} color="grey" />
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Homepage;
