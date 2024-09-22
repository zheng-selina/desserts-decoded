import { Text, Pressable, View } from "react-native";
import mainStyles from "./MainStyleSheet";

export default function Start({ navigation }) {
    const goToSignIn = () => navigation.navigate('signin');
    const goToSignUp = () => navigation.navigate('signup');

    return (
        <View style={{ height: '100%', backgroundColor: '#6F4E37', padding: 20 }}>
            <Pressable style={mainStyles.button} onPress={goToSignIn}>
                <Text style={mainStyles.buttonText}>Sign In</Text>
            </Pressable>
            <Pressable style={mainStyles.button} onPress={goToSignUp}>
                <Text style={mainStyles.buttonText}>Sign Up</Text>
            </Pressable>
        </View>
    )
}
