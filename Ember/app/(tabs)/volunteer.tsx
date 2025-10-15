import {Text,View,StyleSheet} from 'react-native';

export default function AboutScreen(){
    return(
        <View style={styles.container}>
            <Text style = {styles.text}>Volunteer Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#00386B',
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        color:'#0AAFF3',
    },
});