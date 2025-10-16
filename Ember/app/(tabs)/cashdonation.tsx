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
    try {
    if (!query.trim()) return;
    const response = await searchNonProfits(query);
    console.log("API Response:", response);
    setResults(response.data);
    }catch (error) {
    console.error("Search failed:", error);
    setResults([]);
    }
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
      <Text style={styles.title}>Search for Donation Pages</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for a nonprofit..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          if(text.length > 2){
            searchNonProfits(text).then((response)=>setResults(response.data));
          }
          else {
            setResults([]);
          }
        }}
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
    backgroundColor: "#00386B",
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
    color: "#0AAFF3",
    fontWeight: "bold",
  },
  details: {
    color: "#0AAFF3",
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
