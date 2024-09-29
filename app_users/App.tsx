
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons"; 
import HomeScreen from "./src/screens/HomeScreen";
import UserDetailsScreen from "./src/screens/UserDetailsScreen";
import AboutScreen from "./src/screens/AboutScreen";
import CreateUserScreen from "./src/screens/CreateUserScreen";
import EditUserScreen from "./src/screens/EditUserScreen"; 

type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
  Tabs: undefined;
  CreateUser: undefined;
  EditUser: { userId: number };
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          tabBarLabel: "Início",
        }}
      />
      <Tab.Screen
        name="AboutTab"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="information-circle-outline" color={color} size={size} />
          ),
          tabBarLabel: "Sobre",
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetailsScreen}
        options={{ title: "Detalhes do Usuário" }} 
      />
      <Stack.Screen
        name="CreateUser"
        component={CreateUserScreen}
        options={{ title: "Criar Usuário" }} 
      />
      <Stack.Screen
        name="EditUser"
        component={EditUserScreen}
        options={{ title: "Editar Usuário" }}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeStack">
        <Drawer.Screen name="Home Stack" component={HomeStackNavigator} />
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
