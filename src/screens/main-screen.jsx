/* eslint-disable no-undef */
import { 
  VStack,
  Fab,
  Icon,
  useColorModeValue
} from 'native-base';
import React, { useState, useCallback } from 'react';
import { AntDesign } from '@expo/vector-icons';
import shortid from 'shortid';

import AnimatedColorBox from '../components/animated-color-box';
import TaskList from '../components/task-list';
import MasterHead from '../components/masterhead';
import NavBar from '../components/navbar';
import { initialData } from '../utils/initial-data';

const MainScreen = () => {
  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState(null);

  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        done: !item.done
      };
      return newData;
    });
  }, []);
  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        subject: newSubject
      };
      return newData;
    });
  }, []);
  const handleFinishEditingTaskItem = useCallback(() => {
    setEditingItemId(null);
  }, []);
  const handlePressTaskItemLabel = useCallback(item => {
    setEditingItemId(item.id);
  }, []);
  const handleRemoveItem = useCallback(item => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item);
      return newData;
    });
  }, []);

  return (
    <AnimatedColorBox 
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w='full'
    >
      <MasterHead title='Welcome Richard!' image={require('../assets/masterHead.png')}>
        <NavBar />
      </MasterHead>
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt='-20px'
        borderTopLeftRadius='20px'
        borderTopRightRadius='20px'
        pt='20px'
      >
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate();
          setData([
            { id, subject: '', done: false },
            ...data
          ]);
          setEditingItemId(id);
        }}
      />
    </AnimatedColorBox>
  );
};

export default MainScreen;