import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Heading,
  Text,
  Divider,
  Button,
  Badge,
  Input,
  Textarea,
  Stack,
  FormLabel,
  FormControl,
  FormHelperText,
  useToast,
  HStack,
  Tag,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import {
  HamburgerIcon,
  AddIcon,
  CloseIcon,
  ArrowBackIcon,
  SettingsIcon,
  TimeIcon,
  AttachmentIcon,
  CalendarIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from '@chakra-ui/icons';
import ScrollableList from './scrollableList';
import { useTodoState } from '../../context/TodoProvider';
import axios from 'axios';
import Loading from '../misc/loading';
import { IoClose } from 'react-icons/io5';

const Main = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    content: '',
    category: 'default',
    status: 'pending',
    due_date: '',
  });
  const { todo, setTodo, selectedTask, setSelectedTask } = useTodoState();
  const [maxPages, setMaxPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const toast = useToast();

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/v1/todo', {
        params: { page, status: 'pending' },
        withCredentials: true,
      });
      setMaxPages(data.data.totalPages);
      setTodo(data.data.docs);
    } catch (error: any) {
      toast({
        title: 'Error fetching tasks',
        description:
          error.response?.data.message || 'Oops, something went wrong!',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTaskClick = (task: any) => {
    setTaskData({
      title: task.title,
      content: task.content,
      category: task.category,
      status: task.status,
      due_date: task.due_date || '',
    });
    setSelectedTask(task);
    setRightSidebarOpen(true);
  };

  const handleTaskSubmit = async () => {
    if (!taskData.content) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in the task content.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      await axios.post('/api/v1/todo/create', taskData, config);

      toast({
        title: 'Task saved',  
        description: selectedTask
          ? 'Task updated successfully!'
          : 'Task created successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setRightSidebarOpen(false);
      fetchTasks();
    } catch (error: any) {
      toast({
        title: 'Error saving task',
        description:
          error.response?.data.message || 'Oops, something went wrong!',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: 'personal', label: 'Personal' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'wishlist', label: 'Wishlist' },
    { value: 'work', label: 'Work' },
    { value: 'default', label: 'Default' },
  ];

  return (
    <Flex minH="100vh" bg="gray.50">
      {/* Left Sidebar */}
      {isLeftSidebarOpen && (
        <Box
          w="25%"
          bg="#e8e7e6"
          p={4}
          shadow="md"
          borderRight="1px solid"
          borderColor="gray.200"
        >
          {/* Menu Header */}
          <Flex justify="space-between" mb={6} align="center">
            <Heading size="md">Menu</Heading>
            <IconButton
              icon={<HamburgerIcon />}
              aria-label="Toggle Sidebar"
              onClick={() => setLeftSidebarOpen(!isLeftSidebarOpen)}
              size="sm"
            />
          </Flex>

          {/* Search Bar */}
          <Flex mb={6}>
            <Input
              placeholder="Search"
              size="sm"
              bg="white"
              borderRadius="md"
              borderColor="gray.300"
            />
          </Flex>

          {/* Tasks Section */}
          <Box mb={6}>
            <Heading
              size="xs"
              color="gray.500"
              textTransform="uppercase"
              mb={2}
            >
              Tasks
            </Heading>
            <Button
              variant="ghost"
              justifyContent="space-between"
              w="100%"
              mb={2}
            >
              <Flex align="center">
                <ChevronRightIcon mr={2} color="gray" />
                Upcoming
              </Flex>
              <Badge colorScheme="gray" borderRadius="md">
                0
              </Badge>
            </Button>
            <Button
              variant="ghost"
              justifyContent="space-between"
              w="100%"
              mb={2}
            >
              <Flex align="center">
                <CalendarIcon mr={2} color="gray" />
                Today
              </Flex>
              <Badge colorScheme="gray" borderRadius="md">
                0
              </Badge>
            </Button>
            <Button
              variant="ghost"
              justifyContent="space-between"
              w="100%"
              mb={2}
            >
              <Flex align="center">
                <AttachmentIcon mr={2} color="gray" />
                Sticky Wall
              </Flex>
            </Button>
          </Box>

          {/* Category Section */}
          <Box mb={6}>
            <Heading
              size="xs"
              color="gray.500"
              textTransform="uppercase"
              mb={2}
            >
              Category
            </Heading>
            <Button
              variant="ghost"
              justifyContent="space-between"
              w="100%"
              mb={2}
            >
              <Flex align="center">
                <CheckCircleIcon mr={2} color="red.500" />
                Personal
              </Flex>
              <Badge borderRadius="md">0</Badge>
            </Button>
            <Button
              variant="ghost"
              justifyContent="space-between"
              w="100%"
              mb={2}
            >
              <Flex align="center">
                <CheckCircleIcon mr={2} color="blue.500" />
                Work
              </Flex>
              <Badge borderRadius="md"> 0 </Badge>
            </Button>
            <Button
              variant="ghost"
              justifyContent="space-between"
              w="100%"
              mb={2}
            >
              <Flex align="center">
                <CheckCircleIcon mr={2} color="yellow.500" />
                Shopping
              </Flex>
              <Badge borderRadius="md">0</Badge>
            </Button>
            <Button
              variant="ghost"
              justifyContent="space-between"
              w="100%"
              mb={2}
            >
              <Flex align="center">
                <CheckCircleIcon mr={2} color="green.500" />
                Wishlist
              </Flex>
              <Badge borderRadius="md">0</Badge>
            </Button>
            <Button
              variant="ghost"
              justifyContent="space-between"
              w="100%"
              mb={2}
            >
              <Flex align="center">
                <CheckCircleIcon mr={2} color="pink.500" />
                Default
              </Flex>
              <Badge borderRadius="md">0</Badge>
            </Button>
          </Box>

          {/* Footer */}
          <Box mt="auto">
            <Button
              leftIcon={<ArrowBackIcon />}
              variant="ghost"
              w="100%"
              justifyContent="flex-start"
            >
              Sign out
            </Button>
          </Box>
        </Box>
      )}

      {/* Main Content */}
      <Flex
        flex="1"
        flexDirection="column"
        p={6}
        pl={isLeftSidebarOpen ? 6 : 32}
        bg="white"
      >
        <Flex justify="space-between" align="center" mb={4}>
          {!isLeftSidebarOpen && (
            <IconButton
              icon={<HamburgerIcon />}
              aria-label="Toggle Sidebar"
              onClick={() => setLeftSidebarOpen(!isLeftSidebarOpen)}
              size="sm"
              ml={0}
            />
          )}
          <Heading
            size="lg"
            textAlign="left"
            flex="1"
            ml={!isLeftSidebarOpen ? 4 : 0}
          >
            Today
          </Heading>
        </Flex>
        <Button
          leftIcon={<AddIcon boxSize={2.5} />}
          variant="ghost"
          width="100%"
          color="gray"
          justifyContent="flex-start"
          onClick={() => {
            setTaskData({
              content: '',
              category: 'default',
              status: 'pending',
              due_date: '',
            });
            setSelectedTask(null);
            setRightSidebarOpen(true);
          }}
        >
          Add New Task
        </Button>

        {loading ? (
          <Loading />
        ) : (
          <>
            <ScrollableList task={todo} fetchTask={handleTaskClick} />
            <Divider my={4} />
            <Flex justify="space-between">
              <Button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                isDisabled={page === 1}
              >
                Previous
              </Button>
              <Button
                onClick={() => setPage((prev) => Math.min(prev + 1, maxPages))}
                isDisabled={page === maxPages}
              >
                Next
              </Button>
            </Flex>
          </>
        )}
      </Flex>

      {/* Right Sidebar */}
      {isRightSidebarOpen && (
        <Box
          w="30%"
          bg="#e8e7e6"
          p={4}
          shadow="md"
          borderRight="1px solid"
          borderColor="gray.200"
        >
          <Flex justifyContent="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight="bold">
              Task:
            </Text>
            <IconButton
              aria-label="Close Sidebar"
              onClick={() => setRightSidebarOpen(false)}
            >
              <IoClose />
            </IconButton>
          </Flex>
          <Stack spacing="24px">
            <Box>
              <Textarea
                id="content"
                placeholder="Title"
                size="sm"
                resize="none"
                onChange={(e) =>
                  setTaskData({ ...taskData, title: e.target.value })
                }
                value={taskData.title}
              />
            </Box>
            <Box>
              <Textarea
                id="content"
                placeholder="Description"
                onChange={(e) =>
                  setTaskData({ ...taskData, content: e.target.value })
                }
                value={taskData.content}
              />
            </Box>
            <Box>
              <HStack spacing="24px" align="center">
                <FormLabel htmlFor="category">Category:</FormLabel>
                <Select
                  id="category"
                  options={categoryOptions}
                  onChange={(selectedOption) =>
                    setTaskData({
                      ...taskData,
                      category: selectedOption
                        ? selectedOption.value
                        : 'default',
                    })
                  }
                  value={
                    categoryOptions.find(
                      (option) => option.value === taskData.category,
                    ) ||
                    categoryOptions.find((option) => option.value === 'default')
                  }
                  // Styling props
                  chakraStyles={{
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? '#e8e7e6' : 'white',
                      color: 'black',
                      _hover: {
                        backgroundColor: '#e8e7e6',
                      },
                    }),
                    control: (provided) => ({
                      ...provided,
                      borderColor: '#e8e7e6',
                      _hover: {
                        borderColor: '#e8e7e6',
                      },
                    }),
                  }}
                />
              </HStack>
            </Box>
            <Box>
              <HStack spacing="24px" align="center">
                <FormLabel htmlFor="due-date">Due Date:</FormLabel>
                <Input
                  type="date"
                  id="due-date"
                  value={taskData.due_date}
                  onChange={(e) =>
                    setTaskData({ ...taskData, due_date: e.target.value })
                  }
                />
              </HStack>
            </Box>
          </Stack>
          <Flex justifyContent="flex-end" mt={4}>
            <Button
              colorScheme="yellow"
              isLoading={loading}
              onClick={handleTaskSubmit}
            >
              Save
            </Button>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default Main;
