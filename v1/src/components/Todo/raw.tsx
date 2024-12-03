import React, { useEffect, useState } from 'react';
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
  useToast,
  FormHelperText,
  FormControl,
  Divider,
  IconButton,
  DrawerBody,
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
import { AddIcon, ArrowRightIcon, DragHandleIcon, HamburgerIcon } from '@chakra-ui/icons';
import Loading from '../misc/loading';
import { useTodoState } from '../../context/TodoProvider';
import ScrollableList from './scrollableList';

const main = () => {
  const menuDisclosure = useDisclosure(); // For the left menu drawer
  const taskDisclosure = useDisclosure(); // For the task creation drawer
  const btnRef: any = React.useRef();

  const { todo, setTodo, selectedTask } = useTodoState();
  const [category, setCategory] = useState<string>('default');
  const [content, setContent] = useState<string>('');
  const [status, setStatus] = useState<string>('pending');
  const [due_date, setDue_date] = useState<string | undefined>(undefined);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchTask = async () => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get('/api/v1/todo', {
        ...config,
        params: {
          page,
          status: 'pending',
        },
      });
      setMaxPages(data.data.totalPages);
      setTodo(data.data.docs);
      setLoading(false);
    } catch (error: any) {
      handleFetchError(error);
    }
  };

  const submitTask = async () => {
    setLoading(true);
    if (!content) {
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
        withCredentials: true,
      };
      await axios.post(
        '/api/v1/todo/create',
        { category, content, status, due_date },
        config,
      );
      toast({
        title: 'Task created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });

      fetchTask();
      setLoading(false);
      setTimeout(() => {
        taskDisclosure.onClose();
      }, 1000);
    } catch (error: any) {
      toast({
        title: 'Error occurred',
        description:
          error.response?.data.message || 'Oops something went wrong!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setLoading(false);
    }
  };

  const handleFetchError = (error: any): void => {
    toast({
      title: 'Error occurred',
      description: error.response?.data.message || 'Oops something went wrong!',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchTask();
  }, [selectedTask]);

  return (
    <>
      <Flex minHeight={'100vh'} padding={0} border={0}>
        {/* Left Menu Drawer */}
        <Box>
          <IconButton
            icon={<HamburgerIcon />}
            variant="outline"
            aria-label="Open Menu"
            onClick={menuDisclosure.onOpen}
            margin={3}
          />

          <Drawer
            isOpen={menuDisclosure.isOpen}
            placement="left"
            onClose={menuDisclosure.onClose}
          >
            <DrawerOverlay />
            <DrawerContent bg="#f2f1ed">
              <DrawerCloseButton />
              <DrawerBody padding={6}>
                <Box>
                  <Heading as="h3" size="lg">
                    Menu
                  </Heading>
                  <br />
                  <Heading as="h5" size="sm">
                    Tasks
                  </Heading>
                  <Button
                    leftIcon={<ArrowRightIcon boxSize={2.5} />}
                    variant="ghost"
                    width={'100%'}
                  >
                    Upcoming
                    <Badge ml="1" fontSize="0.8em" colorScheme="green"></Badge>
                  </Button>
                  <br />
                  <Button
                    leftIcon={<DragHandleIcon boxSize={2.5} />}
                    variant="ghost"
                    width={'100%'}
                  >
                    Today
                    <Badge ml="1" fontSize="0.8em" colorScheme="green"></Badge>
                  </Button>
                </Box>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box width="100%" marginLeft={3}>
          <Heading marginBottom={4}>Today</Heading>
          <Button
            leftIcon={<AddIcon boxSize={2.5} />}
            variant="ghost"
            width={'100%'}
            color="gray"
            justifyContent="flex-start"
            onClick={taskDisclosure.onOpen}
          >
            Add New Task
          </Button>
          {todo ? (
            <>
              <ScrollableList task={todo} fetchTask={fetchTask} />
              <Divider></Divider>
              <Button
                background={'white'}
                color={'black'}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous Page
              </Button>
              <Button
                background={'white'}
                color={'black'}
                onClick={() => setPage((prev) => Math.min(prev + 1, maxPages))}
              >
                Next Page
              </Button>
            </>
          ) : (
            <Loading />
          )}

          {/* Task Creation Drawer */}
          <Drawer
            isOpen={taskDisclosure.isOpen}
            placement="right"
            onClose={taskDisclosure.onClose}
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
                    onChange={({ target }) => setContent(target.value)}
                    resize="none"
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="category">Category: </FormLabel>
                  <Select
                    id="category"
                    onChange={({ target }) => setCategory(target.value)}
                    defaultValue="default"
                  >
                    <option value="personal">Personal</option>
                    <option value="shopping">Shopping</option>
                    <option value="wishlist">Wishlist</option>
                    <option value="work">Work</option>
                    <option value="default">Default</option>
                  </Select>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel htmlFor="due_date">Due Date:</FormLabel>
                    <Input
                      type="date"
                      id="due_date"
                      value={due_date}
                      onChange={({ target }) => setDue_date(target.value)}
                    />
                    <FormHelperText>
                      If not manually changed, it will be automatically set to 7
                      days ahead.
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box>
                  <FormLabel htmlFor="status">Status:</FormLabel>
                  <Select
                    id="status"
                    defaultValue={'pending'}
                    onChange={({ target }) => setStatus(target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </Select>
                </Box>
              </Stack>
              <DrawerFooter borderTopWidth="1px" p={4}>
                <Flex justifyContent="space-between" width="100%">
                  <Button
                    variant="outline"
                    mr={3}
                    onClick={taskDisclosure.onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="yellow"
                    onClick={submitTask}
                    isLoading={loading}
                  >
                    Create
                  </Button>
                </Flex>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
    </>
  );
};

export default main;
