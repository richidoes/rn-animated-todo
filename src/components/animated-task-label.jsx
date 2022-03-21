import React, { useEffect, memo} from 'react';
import { HStack, Text, Box, Pressable } from 'native-base';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  interpolateColor,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import { string, func, bool } from 'prop-types';

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AnimatedText = Animated.createAnimatedComponent(Text);

// eslint-disable-next-line react/display-name
const AnimatedTaskLabel = memo((props) => {
  const {
    strikethrough,
    textColor,
    inactiveTextColor,
    onPressLabel,
    children
  } = props;

  const hstackOffset = useSharedValue(0);
  const hstackAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [{ translateX: hstackOffset.value }]
    }),
    [strikethrough]
  );

  const textColorProgress = useSharedValue(0);
  const textColorAnimatedStyles = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorProgress.value,
        [0,1],
        [textColor, inactiveTextColor]
      )
    }),
    [strikethrough, textColor, inactiveTextColor]
  );

  const strikethroughWidth = useSharedValue(0);
  const strikethroughAnimatedStyles = useAnimatedStyle(
    () => ({
      width: `${strikethroughWidth.value * 100}%`,
      borderBottomColor: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      )
    }),
    [strikethrough, textColor, inactiveTextColor]
  );

  useEffect(() => {
    const easing = Easing.out(Easing.quad);
    if (strikethrough) {
      hstackOffset.value = withSequence(
        withTiming(4, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      );
      strikethroughWidth.value = withTiming(1, { duration: 400, easing });
      textColorProgress.value = withDelay(
        1000,
        withTiming(1, { duration: 400, easing })
      );
    } else {
      strikethroughWidth.value = withTiming(0, { duration: 400, easing });
      textColorProgress.value = withTiming(0, { duration: 400, easing });
    }
  });
  

  return (
    <Pressable onPress={onPressLabel}>
      <AnimatedHStack 
        alignItems='center'
        style={[hstackAnimatedStyles]}
      >
        <AnimatedText 
          fontSize={19}
          noOfLines={1}
          isTruncated
          px={1}
          style={[textColorAnimatedStyles]}
        >
          {children}
        </AnimatedText>
        <AnimatedBox 
          position='absolute' 
          h={1} 
          borderBottomWidth={1}
          style={[strikethroughAnimatedStyles]}
        />
      </AnimatedHStack>
    </Pressable>
  );
});

AnimatedTaskLabel.propTypes = {
  strikethrough: bool,
  textColor: string,
  inactiveTextColor: string,
  onPressLabel: func,
  children: func
};

export default AnimatedTaskLabel;