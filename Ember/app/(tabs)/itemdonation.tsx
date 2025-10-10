import React, { useState } from "react";
import {Text,View,StyleSheet,TextInput,FlatList,TouchableOpacity,Modal,Button,Linking,} from "react-native";
import { searchNonProfits } from "../API/everyorg";

interface Nonprofit {
  ein: string;
  charityName: string;
  city: string;
  state: string;
  slug: string;
}
export default function AboutScreen() {
const [query, setQuery] = useState("");
const [results, setResults] = useState<Nonprofit[]>([]);
const [selected, setSelected] = useState<Nonprofit | null>(null);
const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }
    const response = await searchNonProfits(text);
    setResults(response.data);
  };

  const openDetails = (item: Nonprofit) => {
    setSelected(item);
    setModalVisible(true);
  };

  const closeDetails = () => {
    setModalVisible(false);
    setSelected(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a Nonprofit</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for a nonprofit..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={handleSearch}
      />
      {results.length > 0 && (
        <FlatList
          style={styles.dropdown}
          data={results}
          keyExtractor={(item, index) =>
            item.ein ? item.ein.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openDetails(item)}>
              <View style={styles.dropdownItem}>
                <Text style={styles.name}>{item.charityName}</Text>
                <Text style={styles.details}>
                  {item.city}, {item.state}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeDetails}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selected && (
              <>
                <Text style={styles.modalTitle}>{selected.charityName}</Text>
                <Text style={styles.modalText}>EIN: {selected.ein}</Text>
                <Text style={styles.modalText}>
                  Location: {selected.city}, {selected.state}
                </Text>
                <Button
                  title="Donate via Every.org"
                  onPress={() =>
                    Linking.openURL(
                      `https://www.every.org/${selected.slug}#donate`
                    )
                  }
                />
                <Button title="Close" onPress={closeDetails} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A5A40",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5,
    padding: 10,
    color: "#fff",
    backgroundColor: "#333",
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: "#444",
    borderRadius: 5,
    maxHeight: 300,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
  },
  details: {
    color: "#aaa",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
