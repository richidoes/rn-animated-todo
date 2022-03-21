/* eslint-disable no-undef */
import React, { useCallback } from 'react';
import { 
  HStack,
  VStack,
  Center, 
  Avatar, 
  Heading, 
  IconButton,
  useColorModeValue
} from 'native-base';

import AnimatedColorBox from './animated-color-box';
import ThemeToggle from './theme-toggle';
import { Feather } from '@expo/vector-icons';
import MenuButton from './menu-button';
import { object } from 'prop-types';

const Sidebar = (props) => {
  const { state, navigation } = props;
  const currentRoute = state.routeNames[state.index];

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer();  
  },[navigation]);
  
  const handlePressMenuMain = useCallback(() => {
    navigation.navigate('Main');
  },
  []);
  
  const handlePressMenuAbout = useCallback(() => {
    navigation.navigate('About');  
  },[]);
  
  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue('blue.50', 'darkBlue.800')}
      p={7}
    >
      <VStack flex={1} space={2}>
        <HStack justifyContent='flex-end'>
          <IconButton 
            onPress={handlePressBackButton}
            borderRadius={100}
            variant='outline'
            borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
            _icon={{
              as: Feather,
              name: 'chevron-left',
              size: 6,
              color: useColorModeValue('blue.800', 'darkBlue.700')
            }}
          />
        </HStack>
        <Avatar
          source={require('../assets/profile-image.png')}
          size='xl'
          borderRadius={100}
          mb={6}
          borderColor='secondary.500'
          borderWidth={3}
        />
        <Heading mb={4} size='xl'>
          Ricardo De Leon
        </Heading>
        <MenuButton
          active={currentRoute === 'Main'}
          onPress={handlePressMenuMain}
          icon='inbox'
        >
          Tasks
        </MenuButton>
        <MenuButton
          active={currentRoute === 'About'}
          onPress={handlePressMenuAbout}
          icon='info'
        >
          About
        </MenuButton>
      </VStack>
      <Center>
        <ThemeToggle />
      </Center>
    </AnimatedColorBox>
  );

};

Sidebar.propTypes = {
  state: object,
  navigation: object
};

export default Sidebar;