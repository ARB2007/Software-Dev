import React, {useState} from "react";
import {Text,View,StyleSheet,TextInput,Button,FlatList,Modal,TouchableOpacity} from 'react-native';
import { searchNonProfits } from "../API/everyorg";

interface Nonprofit{
  ein:string;
  charityName:string;
  city:string;
  state:string;
}

export default function AboutScreen(){
    const [query,setQuery] = useState("");
    const [results,setResults] = useState<Nonprofit[]>([]);
    const [selected, setSelected] = useState<Nonprofit | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSearch = async () => {
      try{
        const response = await searchNonProfits(query);
        console.log("API Response:",response);
      }
      catch(error){
        console.error("Search failed:",error);
        setResults([]);
      }
    };
    const openDetails = (item : Nonprofit)=> {
      setSelected(item);
      setModalVisible(true);
    };
    const closeDetails = () => {
      setModalVisible(false);
      setSelected(null);
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item Donation Screen</Text>

      <TextInput
      // Search Box
        style={styles.input}
        placeholder="Search for a nonprofit..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={setQuery}
      />

      <Button title="Search" onPress={handleSearch} />

      <FlatList
      //Result List
        data={results}
        keyExtractor={(item,index) => (item.ein ? item.ein.toString():index.toString())}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openDetails(item)}>
            <View style={styles.card}>
              <Text style = {styles.name}>{item.charityName}</Text>
              <Text style={styles.details}>
                {item.city},{item.state}
              </Text>
              <Text style = {styles.details}>EIN: {item.ein} </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeDetails}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selected && (
              <>
              <Text style = {styles.modalTitle}>{selected.charityName}</Text>
              <Text style = {styles.modalText}>EIN:{selected.ein}</Text>
              <Text style = {styles.modalText}> Location: {selected.city},{selected.state}</Text>
              <Button title="Close" onPress={closeDetails}/>
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
        backgroundColor:'#3A5A40',
        padding:20,
    },
    title:{
        color:"#fff",
        fontSize:20,
        fontWeight:"bold",
        marginBottom:15,
        textAlign:"center",
    },
    input:{
        borderWidth:1,
        borderColor:'#555',
        borderRadius:5,
        padding:10,
        marginBottom:10,
        color:"#fff",
        backgroundColor:"#333",
    },
    card:{
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:"#444",
    },
    name:{
        color:"#fff",
        fontWeight:"bold",
    },
    details:{
        color:"#aaa",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.6)",
      justifyContent: "center",
      alignItems : "center",
    },
    modalContent : {
      backgroundColor:"#fff",
      padding: 20,
      borderRadius: 10,
      width:"80%",
    },
    modalTitle : {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 5,
    },
});