import { View, Text, StyleSheet } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello everyone. My name is Aidan. Im currently and im a Senior at Crescenta Valley High School.
        This is app is called Ember. Im submitting this as apart of the Congressional App Challenge. My goal with this app was
        to familiarize myself with developing apps and also to test creativity. I grew in California and have seen how bad 
        homelessness is when I tagged along to a volunteer opportunity my Dad attended aiming to help the homeless. Its currently
        an ongoing problem and has been for as long as I can remember. With Ember, I aim to encourage people to find way to help 
        the homeless in any way possible.
      </Text>
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
  }
});