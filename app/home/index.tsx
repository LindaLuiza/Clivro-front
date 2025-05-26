import {Text, View} from 'react-native';
import {NavBar} from "@/components/Navigation";
import {styles} from './styles';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={{fontSize: 24}}>Home Content Here</Text>
            </View>
            <NavBar/>
        </View>
    );
}
