import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

const SwayingSkipText = () => {
  const swayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(swayAnim, {
          toValue: 10,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(swayAnim, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [swayAnim]);

  return (
    <Animated.Text
      style={{
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        marginTop: 20,
        transform: [{ translateX: swayAnim }],
      }}
    >
      Skip →
    </Animated.Text>
  );
};

export default SwayingSkipText;
