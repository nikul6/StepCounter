import { StyleSheet, View } from 'react-native'
import React from 'react'
import SVG, { Circle } from 'react-native-svg';

type RingProgressProps = {
  redius?: number;
  strokeWidth?: number;
  progress: number;
}

const color = '#EE0F55';

export default function RingProgress({ redius = 100, strokeWidth = 35, progress }: RingProgressProps) {
  const innerRedius = redius - strokeWidth / 2;
  const cirumference = 2 * Math.PI * innerRedius;
  return (
    <View style={{
      width: redius * 2,
      height: redius * 2,
      alignSelf: 'center'
    }}>
      <SVG>
        <Circle
          cx={redius}
          cy={redius}
          r={innerRedius}
          // fill={'yellow'}
          strokeWidth={strokeWidth}
          stroke={color}
          opacity={0.2}
        />
        <Circle
          r={innerRedius}
          cx={redius}
          cy={redius}
          originX={redius}
          originY={redius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeDasharray={[cirumference * progress, cirumference]}
          strokeLinecap="round"
          rotation="-90"
        />
      </SVG>
    </View>
  )
}

const styles = StyleSheet.create({})