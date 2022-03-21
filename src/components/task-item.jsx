import React, { useCallback } from 'react';
import {
  Pressable,
  Box,
  HStack,
  useColorModeValue,
  Icon,
  Input,
  useToken
} from 'native-base';
import AnimatedCheckBox from './animated-checkbox';
import AnimatedTaskLabel from './animated-task-label';
import SwipeableView from './swipeable-view';
import { Feather } from '@expo/vector-icons';
import { string, object, bool, func } from 'prop-types';

const taskRef = React.createRef();

const TaskItem = (props) => {
  const {
    isEditing,
    isDone,
    onToggleCheckbox, 
    onPressLabel,
    onRemove,
    onChangeSubject,
    onFinishEditing,
    subject } = props;
  
  const highlightColor = useToken(
    'colors',
    useColorModeValue('blue.500', 'blue.400')
  );
  const boxStroke = useToken(
    'colors',
    useColorModeValue('muted.300', 'muted.500')
  );
  
  const checkmarkColor = useToken('colors', useColorModeValue('white', 'white'));
  
  const activeTextColor = useToken(
    'colors',
    useColorModeValue('darkText', 'lightText')
  );
  const doneTextColor = useToken(
    'colors',
    useColorModeValue('muted.400', 'muted.600')
  );
  
  const handleChangeSubject = useCallback(
    (e) => {
      onChangeSubject && onChangeSubject(e.nativeEvent.text);
    },
    [onChangeSubject]
  );
  

  return (
    <SwipeableView 
      simultaneousHandlers={taskRef}
      onSwipeLeft={onRemove}
      backView={
        <Box 
          w='full' 
          h='full' 
          bg='red.500' 
          alignItems='flex-end'  
          justifyContent='center' 
          pr={4}
        >
          <Icon color='white' as={<Feather name='trash-2' size="sm"/>} />
        </Box>
      }  
    >
      <HStack
        alignItems='center'
        w='full'
        px={4}
        py={2}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
      >
        <Box width={30} height={30} mr={2}>
          <Pressable onPress={onToggleCheckbox}>
            <AnimatedCheckBox
              highlightColor={highlightColor}
              checkmarkColor={checkmarkColor}
              boxOutlineColor={boxStroke}
              checked={isDone} />
          </Pressable>
        </Box>
        {
          isEditing ? (
            <Input
              placeholder='Task'
              value={subject}
              variant='unstyled'
              fontSize={19}
              px={1}
              py={0}
              autoFocus
              blurOnSubmit
              onChange={handleChangeSubject}
              onBlur={onFinishEditing}
            />
          ) : (
            <AnimatedTaskLabel
              textColor={activeTextColor}
              inactiveTextColor={doneTextColor}
              strikethrough={isDone}
              onPressLabel={onPressLabel}
            >
              {subject}
            </AnimatedTaskLabel>
          )
        }  
      </HStack>
    </SwipeableView>
  );
};

TaskItem.propTypes = {
  isDone: bool,
  onToggleCheckbox: func,
  onPressLabel: func,
  onRemove: func,
  subject: string,
  simultaneousHandlers: object,
  isEditing: bool,
  onChangeSubject: func,
  onFinishEditing: func
};

export default TaskItem;