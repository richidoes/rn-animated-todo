import React, { useCallback } from 'react';
import * as Linking from 'expo-linking';
import { Button } from 'native-base';
import { string } from 'prop-types';

const LinkButton = ({ href, ...props }) => {
  const handlePress = useCallback(() => {
    Linking.openURL(href);
  },[]);
  
  return <Button {...props} onPress={handlePress} />;
};

LinkButton.propTypes = {
  href: string
};

export default LinkButton;