import React from 'react';
import { Box, VStack, Heading, Image } from 'native-base';
import { string, object, node } from 'prop-types';

const MasterHead = ({ title, image, children }) => {
  return (
    <VStack h='300px' pb={5}>
      <Image 
        position='absolute'
        left={0}
        right={0}
        bottom={0}
        w='full'
        h='300px'
        resizeMode='cover'
        source={image}
        alt='Master Head image'  
      />
      {children}
      <Box flex={1} />
      <Heading color='white' p={6} size='xl'>
        {title}
      </Heading>
    </VStack>
  );
};

MasterHead.propTypes = {
  title: string,
  children: object,
  image: node
};

export default MasterHead;