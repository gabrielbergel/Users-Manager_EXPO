import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";

type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
};

type UserDetailsScreenRouteProp = RouteProp<RootStackParamList, "UserDetails">;

type UserDetailsScreenProps = {
  route: UserDetailsScreenRouteProp;
};

type User = {
  id: number;
  name: string;
  email: string;
  login: string;
  password: string;
  city: string;
};

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({ route }) => {
  const { userId } = route.params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.100:3000/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ea" />;
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text>Erro ao carregar os dados do usuário.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.detail}>Email: {user.email}</Text>
      <Text style={styles.detail}>Login: {user.login}</Text>
      <Text style={styles.detail}>Senha: {user.password}</Text>
      <Text style={styles.detail}>Cidade: {user.city}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserDetailsScreen;
