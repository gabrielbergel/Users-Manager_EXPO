
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
  EditUser: { userId: number }; 
};

type UserCardNavigationProp = StackNavigationProp<RootStackParamList, "UserDetails">;

type UserCardProps = {
  id: number;
  name: string;
  email: string;
  onDelete: (id: number) => void; 
};

const UserCard: React.FC<UserCardProps> = ({ id, name, email, onDelete }) => {
  const navigation = useNavigation<UserCardNavigationProp>();

  const handleDelete = () => {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja deletar este usuário?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: () => onDelete(id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate("UserDetails", { userId: id })}
      >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditUser", { userId: id })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff", 
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333", 
  },
  email: {
    fontSize: 14,
    color: "#777", 
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#4CAF50", 
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5, 
  },
  deleteButton: {
    backgroundColor: "#f44336", 
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center", 
  },
});

export default UserCard;
