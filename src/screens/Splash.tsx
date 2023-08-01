import { useNavigation } from '@react-navigation/native';
import  { useEffect } from 'react';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Spalsh = () => {

  const navigation = useNavigation()
  useEffect(()=>{
   setTimeout(()=>{
    navigation.navigate('SignIn')
   },2000)
  },[])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.text}>Firebase chat app</Text>
      </View>
    </SafeAreaView>
  );
};

export default Spalsh;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{color: 'white', fontSize: 40,textAlign:'center'}
});
