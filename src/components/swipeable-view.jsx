import React from 'react';
import { Dimensions } from 'react-native';
import {
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { Box } from 'native-base';
import { func, object } from 'prop-types';

const StyledView = Animated.View;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2;

const SwipeView = (props) => {
  const { children, backView, onSwipeLeft, simultaneousHandlers } = props;
  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = Math.max(-128, Math.min(0, event.translationX));
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        onSwipeLeft && runOnJS(onSwipeLeft)();
      } else {
        translateX.value = withTiming(0);
      }
    }
  });

  const facadeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));

  return (
    <StyledView style={{ width: '100%' }}>
      {backView && (
        <Box position='absolute' left={0} right={0} top={0} bottom={0}>
          {backView}
        </Box>
      )}
      <PanGestureHandler 
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}
      >
        <StyledView style={facadeStyle}>
          {children}
        </StyledView>
      </PanGestureHandler>
    </StyledView>
  );
};

SwipeView.propTypes = {
  children: func,
  backView: func,
  onSwipeLeft: func,
  simultaneousHandlers: object
};

export default SwipeView;