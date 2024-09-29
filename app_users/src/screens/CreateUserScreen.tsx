
import React from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  CreateUser: { onCreateUser: () => void };
};

type CreateUserScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CreateUser'>;
  route: { params: { onCreateUser: () => void } }; 
};

const CreateUserScreen: React.FC<CreateUserScreenProps> = ({ navigation, route }) => {
  const { onCreateUser } = route.params; 
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [city, setCity] = React.useState("");

  const handleCreateUser = async () => {
    try {
      const userData = { name, email, login, password, city };
      const response = await axios.post("http://192.168.1.100:3000/users", userData);

      if (response.status === 201) {
        Alert.alert("Usuário criado com sucesso!");
        setName("");
        setEmail("");
        setLogin("");
        setPassword("");
        setCity("");

        onCreateUser();
        navigation.navigate("HomeTab"); 
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      Alert.alert("Erro ao criar usuário", "Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Usuário</Text>
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
      <Button title="Criar Usuário" onPress={handleCreateUser} />
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

export default CreateUserScreen;
