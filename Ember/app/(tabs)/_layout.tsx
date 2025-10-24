import React from 'react';
import { View, TouchableOpacity, Text, Dimensions} from 'react-native';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const TAB_COUNT = 4;
const TAB_WIDTH = width / TAB_COUNT;

function CustomTabBar({ state, descriptors, navigation }) {
  const translateX = useSharedValue(state.index * TAB_WIDTH);

  React.useEffect(() => {
    translateX.value = withTiming(state.index * TAB_WIDTH, { duration: 250 });
  }, [state.index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#FDD560',
        height: 60,
        position: 'relative',
      }}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 6,
            left: 5,
            width: TAB_WIDTH - 10,
            height: 48,
            borderRadius: 14,
            backgroundColor: '#0AAFF3',
          },
          animatedStyle,
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName =
          route.name === 'index'
            ? isFocused ? 'home-sharp' : 'home-outline'
            : route.name === 'volunteer'

            ? isFocused ? 'fitness-outline' : 'fitness-sharp'
            : route.name === 'cashdonation'

            ? isFocused ? 'cash-outline' : 'cash-sharp'

            : isFocused ? 'hand-right-outline' : 'hand-right-sharp';

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name={iconName} color={isFocused ? 'white' : '#0AAFF3'} size={22} />
            <Text style={{ color: isFocused ? 'white' : '#0AAFF3', fontSize: 12 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#FDD560' },
        headerShadowVisible: false,
        headerTintColor: '#0AAFF3',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="volunteer" options={{ title: 'Volunteering' }} />
      <Tabs.Screen name="cashdonation" options={{ title: 'Cash Donations' }} />
      <Tabs.Screen name="itemdonation" options={{ title: 'Item Donations' }} />
    </Tabs>
  );
}