import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "./_home/home";
import Inspiration from "./_inspiration/inspiration";
import Saved from "../(tabs)/saved";
import Setting from "./_setting/setting";

const Tab = createBottomTabNavigator();
const noHead = { headerShown: false };

const Tabs = () => {
  return (
      <Tab.Navigator        
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Inspiration":
              iconName = "bulb-outline";
              break;
            case "Saved":
              iconName = "bookmark-outline";
              break;
            case "Setting":
              iconName = "settings-outline";
              break;
          }
          return (
            <Ionicons
              name={iconName}
              size={32}
              color={focused ? "#89580A" : color}
            />
          );
        },
        tabBarStyle: {
          height: 70,
          backgroundColor: '#FFFFE7',
          // margin: 20 ,
        },
        tabBarShowLabel: false,
      })}>
        <Tab.Screen name="Home" component={Home} options={noHead} />
        <Tab.Screen name="Inspiration" component={Inspiration} options={noHead}/>
        <Tab.Screen name="Saved" component={Saved} options={noHead}/>
        <Tab.Screen name="Setting" component={Setting} options={noHead}/>
      </Tab.Navigator>
  );
};

export default Tabs;