import React, { useCallback, useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'moti';
import TaskItem from './task-item';
import { func, object, bool, array, string } from 'prop-types';

const AnimatedTaskItem = (props) => {
  const { 
    simultaneousHandlers,
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemove
  } = props;

  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data);
  }, [data, onToggleItem]);
  const handleChangeSubject = useCallback(
    subject => {
      onChangeSubject(data, subject);
    },
    [data, onChangeSubject]
  );
  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data);
  }, [data, onFinishEditing]);
  const handlePressLabel = useCallback(() => {
    onPressLabel(data);
  }, [data, onPressLabel]);
  const handleRemove = useCallback(() => {
    onRemove(data);
  }, [data, onRemove]);

  return (
    <View 
      style={{ width: '100%' }}
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data?.subject}
        isDone={data?.done}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </View>
  );
};

const TaskList = (props) => {
  const {
    data,
    editingItemId,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemoveItem
  } = props;
  const refScrollView = useRef(null);
  
  return (
    <ScrollView
      ref={refScrollView}
      style={{ width: '100%'}}
    >
      {data.map( item => (
        <AnimatedTaskItem
          key={item.id}
          data={item}
          simultaneousHandlers={refScrollView}
          isEditing={item.id === editingItemId}
          onToggleItem={onToggleItem}
          onChangeSubject={onChangeSubject}
          onFinishEditing={onFinishEditing}
          onPressLabel={onPressLabel}
          onRemove={onRemoveItem}
        />
      ))}
    </ScrollView>
  );

};

AnimatedTaskItem.propTypes = {
  simultaneousHandlers: object,
  data: object,
  isEditing: bool,
  onToggleItem: func,
  onToggleCheckbox: func,
  onChangeSubject: func,
  onFinishEditing: func,
  onPressLabel: func,
  onRemove: func
};

TaskList.propTypes = {
  data: array,
  editingItemId: string,
  onToggleItem: func,
  onChangeSubject: func,
  onFinishEditing: func,
  onPressLabel: func,
  onRemoveItem: func
};

TaskList.defaultProps = {
  editingItemId: null
};

export default TaskList;