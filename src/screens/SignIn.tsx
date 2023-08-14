import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import * as React from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const loginUser = () => {
    setVisible(true);
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        setVisible(false);
        if (res.docs !== []) {
          console.log(JSON.stringify(res.docs[0].data()));
          goToNext(
            res.docs[0].data().name,
            res.docs[0].data().email,
            res.docs[0].data().userId,
          );
        } else {
          Alert.alert('User not found');
        }
      })
      .catch(error => {
        setVisible(false);
        console.log(error);
        Alert.alert('User not found');
      });
  };
  const goToNext = async (name, email, userId) => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', userId);
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
        style={{flex: 1}}
        extraScrollHeight={100}
        enableOnAndroid={true}
        extraHeight={80}>
        <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
          <Text style={styles.Title}>SignUp</Text>
          <TextInput
            placeholder="Enter email"
            style={styles.textInput}
            value={email}
            onChangeText={txt => setEmail(txt)}></TextInput>
          <TextInput
            placeholder="Enter password"
            style={styles.textInput}
            value={password}
            onChangeText={txt => setPassword(txt)}></TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              loginUser();
            }}>
            <View
              style={{
                backgroundColor: '#f08080',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{color: 'white', fontSize: 20}}>Sign In</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={styles.signUpButton}>or SignUp</Text>
          </TouchableOpacity>
          <Loader visible={visible} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  Title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 80,
    alignSelf: 'center',
  },
  textInput: {
    width: '90%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    alignSelf: 'center',
    marginTop: 20,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 70,
    alignSelf: 'center',
    width: '60%',
  },
  signUpButton: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: 40,
    fontSize: 20,
  },
});
