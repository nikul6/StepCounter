import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import SVG, { Circle, CircleProps } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingProgressProps = {
  redius?: number;
  strokeWidth?: number;
  progress: number;
}

const color = '#EE0F55';

export default function RingProgress({ redius = 100, strokeWidth = 35, progress }: RingProgressProps) {
  const innerRedius = redius - strokeWidth / 2;
  const cirumference = 2 * Math.PI * innerRedius;

  const fill = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(progress, { duration: 1500 });
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [cirumference * fill.value, cirumference],
  }))

  const circleDefualtProps: CircleProps = {
    r: innerRedius,
    cx: redius,
    cy: redius,
    originX: redius,
    originY: redius,
    strokeWidth: strokeWidth,
    stroke: color,
    strokeLinecap: "round",
    rotation: "-90"
  }

  return (
    <View style={{
      width: redius * 2,
      height: redius * 2,
      alignSelf: 'center'
    }}>
      <SVG>
        <Circle
          {...circleDefualtProps}
          opacity={0.2}
        />
        <AnimatedCircle
          animatedProps={animatedProps}
          {...circleDefualtProps}
        />
      </SVG>
      <AntDesign
        name="arrowright"
        size={strokeWidth * 0.8}
        color="#000"
        style={{ position: 'absolute', alignSelf: 'center', top: strokeWidth * 0.1 }} />
    </View>
  )
}

const styles = StyleSheet.create({})