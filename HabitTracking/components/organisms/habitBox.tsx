import { StyleSheet, Text, View, Button, TextInput, ScrollView} from 'react-native';
import CompletionButton from "../atoms/completionButton"
import Heatmap from "../molecules/heatmap"

interface HabitBoxProps {
    habitTitle: string;
}

const HabitBox: React.FC<HabitBoxProps> = ({habitTitle}) => {
  return (
    <View style={styles.habitBox}>
        <Text style={{color: 'black', fontSize: 18}}>{habitTitle}</Text>
        <Heatmap/>
        <CompletionButton/>
    </View>
  )
}

const styles = StyleSheet.create({
    habitBox: {
        height: 120,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15,
    }
})
export default HabitBox;