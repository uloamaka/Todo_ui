import React, { useState } from 'react';
import {
  Checkbox,
  Box,
  Text,
  Tooltip,
  Divider,
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
  FormHelperText,
  DrawerFooter,
  Flex,
  Button,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import ScrollableFeed from 'react-scrollable-feed';
import { useTodoState } from '../../context/TodoProvider';

type Props = {
  task: any[];
};

const ScrollableList: React.FC<Props> = ({ task }) => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  //   const { todo, setTodo, selectedTask, setSetselectedTask } = useTodoState();

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
            >
              <Checkbox colorScheme="orange" mr={2} />
              <Tooltip
                key={index}
                label="Click to view more!"
                placement="top"
                openDelay={1000}
                bg="yellow.400"
                fontSize="xs"
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
                        <FormLabel htmlFor="due-date">Due Date:</FormLabel>
                        <Input
                          type="date"
                          id="due-date"
                          onChange={({ target }) => setDue_date(target.value)}
                        />
                        <FormHelperText>
                          {' '}
                          If not manually changed, it will be automatically set
                          to 7 days ahead.
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
                      <Button variant="outline" mr={3}>
                        Delete
                      </Button>
                      <Button colorScheme="yellow" isLoading={loading}>
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
