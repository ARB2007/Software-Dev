import React, {useState} from "react";
import {Text,View,StyleSheet,TextInput,Button,FlatList} from 'react-native';
import { searchNonProfits } from "../api/orghunter";

export default function AboutScreen(){
    const [query,setQuery] = useState("");
    const [results,setResults] = useState([]);

    const handleSearch = async () => {
        const data = await searchNonProfits(query);
        if(data && data.data){
            setResults(data?.data||[]);
        }
        else{
            setResults([]);
        }
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item Donation Screen</Text>

      {/* Search box */}
      <TextInput
        style={styles.input}
        placeholder="Search for a nonprofit..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={setQuery}
      />

      <Button title="Search" onPress={handleSearch} />

      {/* Results list */}
      <FlatList
        data={results}
        keyExtractor={(item,index) => (item.ein ? item.ein.toString():index.toString())}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.charityName}</Text>
            <Text style={styles.details}>
              {item.city}, {item.state}
            </Text>
            <Text style={styles.details}>EIN: {item.ein}</Text>
          </View>
        )}
      />
    </View>
  );
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#25292e',
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
});