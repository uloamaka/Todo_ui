import React, { useState } from 'react';
import {
  Checkbox,
  Box,
  Text,
  Tooltip,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Stack,
  FormLabel,
  Textarea,
  Select,
  FormControl,
  Input,
  DrawerFooter,
  Flex,
  Button,
  useToast,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import ScrollableFeed from 'react-scrollable-feed';
import { useTodoState } from '../../context/TodoProvider';
import axios from 'axios';

type Props = {
  task: any[];
  fetchTask: any;
};
const ScrollableList: React.FC<Props> = ({ task, fetchTask}) => {
  const { todo, setTodo, selectedTask, setSelectedTask } = useTodoState();

  const [category, setCategory] = useState('default');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('pending');
  const [due_date, setDue_date] = useState('');

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [drawerStates, setDrawerStates] = useState(Array(10).fill(false));

  const openDrawer = (index: number) => {
    const newDrawerStates = [...drawerStates];
    newDrawerStates[index] = true;
    setDrawerStates(newDrawerStates);
  };

  const closeDrawer = (index: number) => {
    const newDrawerStates = [...drawerStates];
    newDrawerStates[index] = false;
    setDrawerStates(newDrawerStates);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const updateTask = async () => {
    setLoading(true);
    if (!selectedTask) return;
    console.log(selectedTask)
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      };
      console.log(category, content, status, due_date);
      const { data } = await axios.put(
        `/api/v1/todo/${selectedTask._id}/edit`,
        { category, content, status, due_date },
        config,
      );
      setTodo(data);
      fetchTask()
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
  const deleteTask = async () => {
    setLoading(true);
    if (!selectedTask) return;
    try {
      await axios.delete(`/api/v1/todo/${selectedTask._id}/delete`);
      fetchTask()
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
    <Box>
      <ScrollableFeed>
        {task &&
          task.map((item, index) => (
            <Box
              padding={2}
              display="flex"
              alignItems="center"
              color="gray.600"
              onClick={() => setSelectedTask(item)}
            >
              <Checkbox colorScheme="orange" mr={2} />
              <Tooltip
                key={index}
                label="Click to view more!"
                placement="top"
                openDelay={1000}
                bg="yellow.400"
                fontSize="xs"
                color={'black'}
              >
                <Text flex="1" onClick={() => openDrawer(index)}>
                  {item.content}
                </Text>
              </Tooltip>
              <ChevronRightIcon marginRight="25px" boxSize={6} />

              <Drawer
                placement="right"
                size="lg"
                isOpen={drawerStates[index]}
                onClose={() => closeDrawer(index)}
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
                        defaultValue={item.content}
                      />
                    </Box>
                    <Box>
                      <FormLabel htmlFor="category">Category: </FormLabel>
                      <Select
                        id="category"
                        onChange={({ target }) => setCategory(target.value)}
                        defaultValue={item.category}
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
                        <FormLabel htmlFor="due-date">Due Date:</FormLabel>
                        <Input
                          type="date"
                          id="due-date"
                          defaultValue={formatDate(item.due_date)}
                          onChange={({ target }) => setDue_date(target.value)}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormLabel htmlFor="status">Status:</FormLabel>
                      <Select
                        id="status"
                        defaultValue={item.status}
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
                        isLoading={loading}
                        onClick={() => {
                          deleteTask();
                          closeDrawer(index);
                        }}
                        >
                        Delete
                      </Button>
                      <Button
                        colorScheme="yellow"
                        isLoading={loading}
                        onClick={() => {
                          updateTask();
                          closeDrawer(index);
                        }}
                      >
                        Save
                      </Button>
                    </Flex>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </Box>
          ))}
      </ScrollableFeed>
    </Box>
  );
};

export default ScrollableList;
