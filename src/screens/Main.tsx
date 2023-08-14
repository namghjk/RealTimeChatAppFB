import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Users from '../tabs/Users';
import Setting from '../tabs/Setting';

const Main = () => {
  const [didTabSelected, SetDidTabSelect] = useState(0);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {didTabSelected == 0 ? <Users /> : <Setting/>}
        <View style={styles.bottomTab}>
          <TouchableOpacity style={styles.tab} onPress={()=>{SetDidTabSelect(0)}}>
            <Image
              source={require('../../Access/Images/group.png')}
              style={[
                styles.tabIcon,
                {
                  width: 40,
                  height: 40,
                  tintColor: didTabSelected == 0 ? 'white' : 'gray',
                },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={()=>{SetDidTabSelect(1)}}>
            <Image
              source={require('../../Access/Images/settingIcon.png')}
              style={[
                styles.tabIcon,
                {tintColor: didTabSelected == 1 ? 'white' : 'gray'},
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;
const styles = StyleSheet.create({
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 35,
    height: 35,
  },
});
