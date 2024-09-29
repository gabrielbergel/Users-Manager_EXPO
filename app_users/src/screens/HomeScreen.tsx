
import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import UserCard from "../components/UserCard"; 
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  CreateUser: { onCreateUser: () => void }; 
  EditUser: { userId: number }; 
};

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

type User = {
  id: number;
  name: string;
  email: string;
  login: string;
  password: string;
  city: string;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.1.100:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {

    await fetchUsers();
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`http://192.168.1.100:3000/users/${id}`);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        navigation={navigation} 
        onCreateUser={handleCreateUser}
      />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            id={item.id}
            name={item.name}
            email={item.email}
            onDelete={handleDeleteUser} 
          />
        )}
        contentContainerStyle={styles.list}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  list: {
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
