import * as React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import ResetPass from '../components/Auth/resetPass';

interface IResetPassPageProps {}

const ResetPassPage: React.FunctionComponent<IResetPassPageProps> = (props) => {
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
      <Box
        width="55%"
        background="white"
        padding={10}
        color={'black'}
        textAlign={'center'}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        marginTop={'100px'}
      >
        <ResetPass />
      </Box>
    </Flex>
  );
};

export default ResetPassPage;
