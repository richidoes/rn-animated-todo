/* eslint-disable no-undef */
import React from 'react';
import { 
  Box, 
  Text, 
  VStack, 
  ScrollView, 
  Icon, 
  Image, 
  useColorModeValue
} from 'native-base';
import AnimatedColorBox from '../components/animated-color-box';
import Navbar from '../components/navbar';
import MasterHead from '../components/masterhead';
import LinkButton from '../components/link-button';
import { Feather } from '@expo/vector-icons';

const AboutScreen = () => {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w='full'
    >
      <MasterHead 
        title='About this app'
        image={require('../assets/masterHead.png')}
      >
        <Navbar />
      </MasterHead>
      <ScrollView
        borderTopLeftRadius='20px'
        borderTopRightRadius='20px'
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt='-20px'
        pt='30px'
        p={4}
      >
        <VStack flex={1} space={4}>
          <Box alignItems='center'>
            <Image
              source={require('../assets/richard.jpg')}
              borderRadius='full'
              resizeMode='cover'
              w={120}
              h={120}
              alt='developer'
            />
          </Box>
          <Text fontSize="md" w="full">
            This is a React Native app built based on a tutorial from 
            the YouTube channel called DevAsLife.
          </Text>
          <LinkButton
            w='50%'
            alignSelf='center'
            colorScheme="red"
            size="lg"
            borderRadius="full"
            href="https://www.youtube.com/watch?v=k2h7usLLBhY&list=LL&index=30&t=5174s"
            leftIcon={
              <Icon as={Feather} name="youtube" size="sm" opacity={0.5} />
            }
          >
            Go to Video
          </LinkButton>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  );
};

export default AboutScreen;