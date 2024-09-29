
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  CreateUser: { onCreateUser: () => void };
};

type HeaderProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  onCreateUser: () => void; 
};

const Header: React.FC<HeaderProps> = ({ navigation, onCreateUser }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Usuários</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("CreateUser", { onCreateUser });
        }}
      >
        <Text style={styles.buttonText}>Criar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#6200ea", 
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row", 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", 
  },
  button: {
    backgroundColor: "#F8F8FF", 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#6200ea", 
    fontWeight: "bold",
  },
});

export default Header;
