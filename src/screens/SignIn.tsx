import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import * as React from 'react';
import {
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

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const loginUser = () => {
    firestore()
      .collection('users')
      .where('email', '==', password)
      .get()
      .then(res => {
        console.log(JSON.stringify(res.docs[0].data()));
      });
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
          <TouchableOpacity style={styles.button} onPress={() => {
            loginUser()
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
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  Title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 40,
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
    marginTop: 30,
    alignSelf: 'center',
    width: '60%',
  },
  signUpButton: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20,
  },
});
