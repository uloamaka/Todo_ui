import React, { useState } from 'react';
import {
  Checkbox,
  Box,
  Text,
  Tooltip,
  Stack,
  FormLabel,
  Textarea,
  Select,
  FormControl,
  Input,
  Flex,
  Button,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { IoClose } from 'react-icons/io5';
import ScrollableFeed from 'react-scrollable-feed';
import { useTodoState } from '../../context/TodoProvider';
import axios from 'axios';

type Props = {
  task: any[];
  fetchTask: any;
};

const ScrollableList: React.FC<Props> = ({ task, fetchTask }) => {
  const { selectedTask, setSelectedTask } = useTodoState();

  const [category, setCategory] = useState<string>('default');
  const [content, setContent] = useState<string>('');
  const [status, setStatus] = useState<string>('pending');
  const [due_date, setDue_date] = useState<string | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [sidebarIndex, setSidebarIndex] = useState<number | null>(null);

  const openSidebar = (index: number) => {
    setSidebarIndex(index);
    setSelectedTask(task[index]);
    setContent(task[index].content);
    setCategory(task[index].category);
    setStatus(task[index].status);
    setDue_date(formatDate(task[index].due_date));
  };

  const closeSidebar = () => {
    setSidebarIndex(null);
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
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      };
      await axios.put(
        `/api/v1/todo/${selectedTask._id}/edit`,
        { category, content, status, due_date },
        config,
      );
      fetchTask();
      setLoading(false);
      closeSidebar();
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

  const deleteTask = async () => {
    setLoading(true);
    if (!selectedTask) return;
    try {
      await axios.delete(`/api/v1/todo/${selectedTask._id}/delete`);
      fetchTask();
      setLoading(false);
      closeSidebar();
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

  return (
    <Box display="flex">
      <Box flex="1">
        <ScrollableFeed>
          {task &&
            task.map((item, index) => (
              <Box
                key={index}
                padding={2}
                display="flex"
                alignItems="center"
                color="gray.600"
                onClick={() => setSelectedTask(item)}
              >
                <Checkbox colorScheme="orange" mr={2} />
                <Tooltip
                  label="Click to view more!"
                  placement="top"
                  openDelay={1000}
                  bg="yellow.400"
                  fontSize="xs"
                  color="black"
                >
                  <Text flex="1" onClick={() => openSidebar(index)}>
                    {item.content}
                  </Text>
                </Tooltip>
                <ChevronRightIcon marginRight="25px" boxSize={6} />
              </Box>
            ))}
        </ScrollableFeed>
      </Box>

      {sidebarIndex !== null && (
        <Box
          position="fixed"
          top="0"
          right="0"
          width="30%"
          height="100%"
          bg="#e8e7e6"
          p={4}
          boxShadow="lg"
        >
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              Task:
            </Text>
            <IconButton aria-label="Close Sidebar" onClick={closeSidebar}>
              <IoClose />
            </IconButton>
          </Flex>
          <Stack spacing="24px">
            <Box>
              <FormLabel htmlFor="content">Type here...</FormLabel>
              <Textarea
                id="content"
                placeholder="Enter task details"
                onChange={({ target }) => setContent(target.value)}
                resize="none"
                value={content}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="category">Category: </FormLabel>
              <Select
                id="category"
                onChange={({ target }) => setCategory(target.value)}
                value={category}
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
                  value={due_date}
                  onChange={({ target }) => setDue_date(target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormLabel htmlFor="status">Status:</FormLabel>
              <Select
                id="status"
                value={status}
                onChange={({ target }) => setStatus(target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </Select>
            </Box>
          </Stack>
          <Flex justifyContent="space-between" mt={4}>
            <Button variant="outline" isLoading={loading} onClick={deleteTask}>
              Delete
            </Button>
            <Button
              colorScheme="yellow"
              isLoading={loading}
              onClick={updateTask}
            >
              Save
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default ScrollableList;
