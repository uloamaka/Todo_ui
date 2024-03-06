import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Badge,
  Input,
  Stack,
  FormLabel,
  Select,
  Textarea,
} from '@chakra-ui/react';
import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import axios from 'axios';
import { AddIcon, ArrowRightIcon, DragHandleIcon } from '@chakra-ui/icons';

const main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = React.useRef();
  const firstField: any = React.useRef();

  return (
    <Flex minHeight={'100vh'} padding={0} border={0}>
      <Box
        width="25%"
        background={'#f2f1ed'}
        padding={6}
        backgroundSize={'cover'}
        backgroundPosition={'center'}
        rounded="lg"
        marginLeft={3}
      >
        <Heading as="h3" size="lg">
          menu
        </Heading>
        <br />
        <Heading as="h5" size="sm">
          Tasks
        </Heading>
        <Button
          leftIcon={<ArrowRightIcon boxSize={2.5} />}
          variant="ghost"
          width={'auto'}
        >
          Upcoming
          <Badge ml="1" fontSize="0.8em" colorScheme="green">
            {/* {notificationCount} */}
          </Badge>
        </Button>
        <br />
        <Button
          leftIcon={<DragHandleIcon boxSize={2.5} />}
          variant="ghost"
          width={'auto'}
        >
          Today
          <Badge ml="1" fontSize="0.8em" colorScheme="green">
            {/* {notificationCount} */}
          </Badge>
        </Button>
      </Box>
      <Box width="75%" marginLeft={3}>
        <Heading marginBottom={4}> Today </Heading>
        <Button
          leftIcon={<AddIcon boxSize={2.5} />}
          variant="ghost"
          width={'100%'}
          color="gray"
          justifyContent="flex-start"
          ref={btnRef}
          onClick={onOpen}
        >
          Add New Task
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="lg"
        >
          <DrawerOverlay />
          <DrawerContent bg="gray.100" borderRadius="md">
            <DrawerCloseButton color="gray.500" />
            <DrawerHeader borderBottomWidth="1px">Task:</DrawerHeader>
            <Stack spacing="24px" p={4}>
              <Box>
                <FormLabel htmlFor="content">Type here...</FormLabel>
                <Textarea
                  id="content"
                  placeholder="Enter task details"
                  resize="none"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="category">Category: </FormLabel>
                <Select id="category" defaultValue="default">
                  <option value="personal">Personal</option>
                  <option value="shopping">Shopping</option>
                  <option value="wishlist">Wishlist</option>
                  <option value="work">Work</option>
                  <option value="default">Default</option>
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="due-date">Due Date:</FormLabel>
                <Input type="date" id="dueDate" />
              </Box>
              <Box>
                <FormLabel htmlFor="status">Status:</FormLabel>
                <Select id="status" defaultValue="pending">
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </Select>
              </Box>
            </Stack>
            <DrawerFooter borderTopWidth="1px" p={4}>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </Flex>
  );
};

export default main;
