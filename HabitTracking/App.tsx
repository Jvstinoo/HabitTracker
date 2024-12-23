import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput, ScrollView} from 'react-native';
import CompletionButton from './components/atoms/completionButton'
import Heatmap from './components/molecules/heatmap';
import HabitBox from './components/organisms/habitBox';

interface AddHabitDetailsProps {
  onAddHabit: (habitTitle: string) => void;
}

const AddHabitDetails: React.FC<AddHabitDetailsProps> = ({onAddHabit}) => {
  const [habitTitle, setHabitTitle] = useState<string>('')

  const handleSave = () => {
    if (habitTitle.trim()) {
      onAddHabit(habitTitle);
      setHabitTitle('');
    }
  };

  return (
    <View style={{width:'90%', height: '60%', backgroundColor:'grey', justifyContent:'center', alignItems:'center', borderRadius: 10}}>
      <TextInput 
        placeholder='Enter habit title'
        onChangeText={newText => setHabitTitle(newText)}
        defaultValue={habitTitle}
        style={{width:'60%', height:'20%', backgroundColor:'white', marginBottom:40}}>
      </TextInput>
      <TouchableOpacity
        style={{backgroundColor:'black', width: 80, height: 30, borderRadius: 5, justifyContent:'center', alignItems:'center'}} 
        onPress={(handleSave)}>
        <Text style={{color:'white'}}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function App() {
  const [habits, setHabits] = useState<{ id: number; title: string }[]>([]);
  const [showAddHabitBox, setShowAddHabitBox] = useState<Boolean>(false);

  const addHabit = (title: string) => {
    setHabits((prev) => [...prev, { id: prev.length + 1, title }]);
    setShowAddHabitBox(false);
  };

  return (
    <View style={styles.container}>
      {showAddHabitBox === true ? (
        <View>
          <AddHabitDetails onAddHabit={addHabit}/>
        </View>
      ) : (
      <View style={{flex:1}}>
       <View> 
          <Text style={styles.header}>Habits</Text>
       </View>
        <ScrollView contentContainerStyle={styles.habitsScroll}>
          {habits.length === 0 ? (
            <Text>Add a habit to begin tracking!</Text>
          ): (
          habits.map((habit) => (
            <View key={habit.id} style={{width:'95%', alignContent:'center'}}>
              <HabitBox habitTitle={habit.title}/>
            </View>
          )))}
        </ScrollView>
        <View style={styles.footerForAddButton}>
          <TouchableOpacity style={styles.addHabitButton} onPress={() => setShowAddHabitBox(true)}>
            <Text style={{color:"blue", fontSize: 30}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50,
  },
  header: {
    fontFamily: 'Didot',
    fontSize: 38,
    color: 'white',
    paddingLeft: 10,
    marginBottom: 10,
  },
  title: {
    color: 'white',
  },
  habitsScroll: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitTitle: {
    fontSize: 48,
    color: 'white',
  },
  addHabitButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerForAddButton: {
    height: 100,
    alignItems: 'flex-end',
    paddingRight: 30,
  }
});
