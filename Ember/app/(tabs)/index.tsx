import {Text,View,StyleSheet} from 'react-native';
import {useFonts} from 'expo-font';

export default function AboutScreen(){
    return(
        <View style={styles.container}>
            <Text style = {styles.text}>Hello, welcome to Second Wind! My name is Aidan, and im currently a Senior at
            Crescenta Valley High School in La Crescenta, California. As I grew up in California I always see housing 
            and homelessness at the top of News pages. Around the time I was in Elementary School my Dad volunteered 
            for a event to help the homeless. And what I can say is that after years of not seeing any change is that
            getting out of that state in life is very difficult. Thats where you guys step in. Second Wind aims to provide
            Volunteer Opportunities and access to donation pages. This not only helps combat homelessness but also gives 
            students opportunities for community service hours, which looks very good for schools. Well thats it for me,
            feel free to email me at aidanroebriesewitz@gmail.com for issues or concerns.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#5D8863',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    text:{
        color:'#e6cc00',
        fontFamily:'Arial',
        fontSize:15,
    },
});