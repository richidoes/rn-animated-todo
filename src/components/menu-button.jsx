import React from 'react';
import { Button, Icon, useColorModeValue } from 'native-base';

import { Feather } from '@expo/vector-icons';
import { bool, string, node } from 'prop-types';

const MenuButton = ({ active, icon, children, ...props }) => {
  const colorScheme = useColorModeValue('blue', 'darkBlue');
  const inactiveTextColor = useColorModeValue('blue.500', undefined);
  const pressedBgColor = useColorModeValue('primary.100', 'primary.600');

  return (
    <Button
      size='lg' 
      colorScheme={colorScheme}
      bg={ active ? undefined : 'transparent' }
      _pressed={{ bg: pressedBgColor }}
      _text={{ color: active ? 'blue.50' : inactiveTextColor }}
      variant='solid'
      justifyContent='flex-start'
      leftIcon={<Icon as={Feather} name={icon} size='sm' opacity={0.5} />}
      {...props}
    >
      {children}
    </Button>
  );
};

MenuButton.propTypes = {
  active: bool,
  icon: string,
  children: node
};

export default MenuButton;