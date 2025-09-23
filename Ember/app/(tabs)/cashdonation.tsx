import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Alert,Linking} from "react-native";
import { Link } from 'expo-router';

export default function AboutScreen() {
  const notprofitSlug = "workinprogress";
  const donateUrl = "https://www.every.org/ward-2-mutual-aid#donate";

  const handlePressDonate = async () => {
    try{
      const supported = await Linking.canOpenURL(donateUrl);
      if(supported){
        await Linking.openURL(donateUrl);
      }
      else{
        Alert.alert("Error","Cannot open URL");
      }
    }
    catch(err){
      console.error("Failed to open donate link:",err);
      Alert.alert("Error","Failed to open donation link");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Donation Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handlePressDonate}>
        <Text style={styles.buttonText}>Donate with Every.org</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize:20,
    marginBottom:20,
  },
  button:{
    backgroundColor:"#4CAF50",
    paddingVertical:12,
    paddingHorizontal:20,
    borderRadius:5,
  },
  buttonText:{
    color:"#fff",
    fontSize:16,
  }
});