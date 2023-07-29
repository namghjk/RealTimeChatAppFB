import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    SafeAreaView,
  } from 'react-native';
  import React, {useState} from 'react';
  import {useNavigation} from '@react-navigation/native';
  import uuid from 'react-native-uuid';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  import firestore from '@react-native-firebase/firestore'
  
  
  
  const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const navigation = useNavigation();
    const registerUser = () => {
      const userId = uuid.v4();
      firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
      })
      .then(res => {
        console.log('user created ');
        navigation.navigate('SignIn');
      })
      .catch(error => {
        console.log(error);
      });
    };

    const validate = () =>{
      let isValid = true;
      if (name == ''){
        isValid = false
      }
      if (email == ''){
        isValid = false
      }
      if (password == ''){
        isValid = false
      }
      if (mobile == ''){
        isValid = false
      }
      if(confirmPassword !=password){
        isValid = false
      }
      return isValid
    }
  
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
              placeholder="Enter name"
              style={[styles.textInput, {marginTop: 40}]}
              value={name}
              onChangeText={txt => setName(txt)}></TextInput>
            <TextInput
              placeholder="Enter email"
              style={styles.textInput}
              value={email}
              onChangeText={txt => setEmail(txt)}></TextInput>
            <TextInput
              placeholder="Enter mobile"
              style={styles.textInput}
              value={mobile}
              onChangeText={txt => setMobile(txt)}></TextInput>
            <TextInput
              placeholder="Enter password"
              style={styles.textInput}
              value={password}
              onChangeText={txt => setPassword(txt)}></TextInput>
            <TextInput
              placeholder="Enter confirm password"
              style={styles.textInput}
              value={confirmPassword}
              onChangeText={txt => setconfirmPassword(txt)}></TextInput>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if(validate() == true){
                  registerUser()
                  Alert.alert("SignUp success")
                }else{
                  Alert.alert("Please enter correct data")
                }
              }}>
              <View
                style={{
                  backgroundColor: '#f08080',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: 'white', fontSize: 20}}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              <Text style={styles.loginButton}>or SignIn</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  };
  
  export default SignUp;
  
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
    loginButton: {
      textDecorationLine: 'underline',
      alignSelf: 'center',
      marginTop: 20,
      fontSize: 20,
    },
  });
  