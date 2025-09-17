import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
            backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle:{
            backgroundColor:'#25292e',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="volunteer"
        options={{
          title: 'Volunteering',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'fitness-outline' : 'fitness-sharp'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
      name="cashdonation"
      options={{
        title:'Cash Donations',
        tabBarIcon:({ color , focused}) => (
            <Ionicons name = {focused ? 'cash-outline' : 'cash-sharp'} color={color} size={24}/>
        ),
      }}
      />
      <Tabs.Screen
      name="itemdonation"
      options={{
        title:'Item Donations',
        tabBarIcon:({ color , focused}) => (
            <Ionicons name = {focused ? 'hand-right-outline' : 'hand-right-sharp'} color={color} size={24}/>
        ),
      }}
      />
    </Tabs>
  );
}
