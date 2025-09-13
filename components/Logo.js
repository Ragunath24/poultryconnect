import React from 'react';
import { View } from 'react-native';

// Simple chicken head logo using shapes to avoid assets
export default function Logo({ size = 96 }) {
  const head = { width: size * 0.7, height: size * 0.7, borderRadius: size, backgroundColor: '#FFE8BF' };
  const beak = { width: size * 0.22, height: size * 0.18, backgroundColor: '#FFB27A', borderRadius: 6, position: 'absolute', right: -size * 0.06, top: size * 0.34, transform: [{ rotate: '12deg' }] };
  const comb = { width: size * 0.28, height: size * 0.28, backgroundColor: '#FF7A7A', borderRadius: size, position: 'absolute', left: size * 0.08, top: -size * 0.02 };
  const eye = { width: size * 0.09, height: size * 0.09, backgroundColor: '#1F2937', borderRadius: size, position: 'absolute', left: size * 0.18, top: size * 0.3 };

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute' }}>
        <View style={comb} />
        <View style={head} />
        <View style={eye} />
        <View style={beak} />
      </View>
    </View>
  );
}


