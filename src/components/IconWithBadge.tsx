import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface IconWithBadgeProps {
  name: string | any;
  badgeCount: number;
  color: string;
  size: number;
}

export default function IconWithBadge({
  name,
  badgeCount,
  color,
  size,
}: IconWithBadgeProps) {
  return (
    <View style={styles.iconView}>
      <MaterialIcon name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View style={styles.badgeCountView}>
          <Text style={styles.badgeCountText}>
            {badgeCount > 10 ? '10+' : badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconView: {
    width: 24,
    height: 24,
    margin: 5,
  },
  badgeCountView: {
    position: 'absolute',
    right: -12,
    top: -9,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCountText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
});
