
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useRoute } from '@react-navigation/native';

const EditUserScreen = () => {
  const route = useRoute();
  const { userId } = route.params; 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.100:3000/users/${userId}`);
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setLogin(userData.login);
        setPassword(userData.password);
        setCity(userData.city);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdateUser = async () => {
    try {
      const userData = { name, email, login, password, city };
      const response = await axios.put(`http://192.168.1.100:3000/users/${userId}`, userData);

      if (response.status === 200) {
        Alert.alert("Usuário atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      Alert.alert("Erro ao atualizar usuário", "Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Atualizar Usuário" onPress={handleUpdateUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default EditUserScreen;
