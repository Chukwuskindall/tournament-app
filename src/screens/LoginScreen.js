import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import {SERVER_URL} from '../utils/constants';

const width = Dimensions.get('window').width;

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Construct the data object for the POST request
    const loginData = {
      email: email,
      password: password,
    };

    // Make the POST request to the Django server for login
    try {
      const response = await fetch(`${SERVER_URL}api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers such as authorization if needed
        },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();
      if (response.ok) {
        // Handle successful login (navigate or show message)
        navigation.navigate('HomeTabs');
      } else {
        // Handle errors (show error message)
        console.error(responseData);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Header text={'LOGIN'} textSub={''} />
        <ScrollView style={styles.scrollView}>
          <CustomTextInput
            name={'Email'}
            placeholder={'Enter Email'}
            text={email}
            onChangeText={setEmail}
          />
          <View style={{height: 20}}></View>
          <CustomTextInput
            name={'Password'}
            placeholder={'Enter Password'}
            text={password}
            onChangeText={setPassword}
          />

          <View>
            <Text
              style={{
                fontSize: 16,
                color: '#0C134F',
                alignSelf: 'flex-end',
                marginRight: width * 0.15,
                marginTop: 25,
              }}>
              Forget Password?
            </Text>
            <View style={{height: 10}}></View>
          </View>
          <CustomButton title={'Login'} onPress={handleLogin} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text style={{fontSize: 16, color: '#4F6F52'}}>
              Don't have an account?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
              <Text style={{fontSize: 16, color: '#567189', fontWeight: '600'}}>
                Sign Up
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default LoginScreen;
