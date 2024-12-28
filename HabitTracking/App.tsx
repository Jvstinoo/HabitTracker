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

  const handleCancel = () => {
    onAddHabit('');
    setHabitTitle('');
  };

  return (
    <View style={{width:'90%', height: '40%', backgroundColor:'#25274D', justifyContent:'center', alignItems:'center', borderRadius: 10}}>
      <View style={{width:'80%'}}>
        <Text style={{color:'white', paddingStart: 2, marginBottom:5}}>Enter habit title:</Text>
        <TextInput 
         onChangeText={newText => setHabitTitle(newText)}
         defaultValue={habitTitle}
         style={{width:'100%', height:'25%', backgroundColor:'#AAABB8', marginBottom:25, borderRadius: 5}}>
        </TextInput>
        <Text style={{color:'white', paddingStart:2, marginBottom:5}}>Choose color:</Text>
        <TextInput 
          style={{width:'100%', height:'25%', backgroundColor:'#AAABB8', borderRadius: 5}}>
        </TextInput>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between', width:'80%'}}>
        <TouchableOpacity
          style={{backgroundColor:'#464886', width: 120, height: 40, borderRadius: 5, justifyContent:'center', alignItems:'center'}} 
          onPress={(handleSave)}>
          <Text style={{color:'white'}}>Create Habit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'#464886', width: 80, height: 40, borderRadius: 5, justifyContent:'center', alignItems:'center'}} 
          onPress={(handleCancel)}>
          <Text style={{color:'white'}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function App() {
  const [habits, setHabits] = useState<{ id: number; title: string }[]>([]);
  const [showAddHabitBox, setShowAddHabitBox] = useState<Boolean>(false);

  const addHabit = (title: string) => {
    if (title.length != 0) {
      setHabits((prev) => [...prev, { id: prev.length + 1, title }]);
    }
    setShowAddHabitBox(false);
  };

  return (
    <View style={styles.container}>
      {showAddHabitBox === true ? (
        <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
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
  },
  header: {
    fontFamily: 'Didot',
    fontSize: 38,
    color: 'white',
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 50,
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
