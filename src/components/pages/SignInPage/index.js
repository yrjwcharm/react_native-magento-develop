import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, resetAuthState } from '../../../store/actions';
import { Spinner, Text, Button, TextInput } from '../..';
import { NAVIGATION_SIGNUP_SCREEN_PATH } from '../../../navigation/types';
import Status from '../../../magento/Status';

// TODO: create Button to have a style of no background and border
// TODO: Use KeyboardAvoidingView
const SignInPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [form, setValues] = useState({
    email: '',
    password: '',
  });
  const status = useSelector(state => state.auth.signInStatus);
  const errorMessage = useSelector(state => state.auth.signInErrorMessage);

  useEffect(() => (() => {
    // componentWillUnmount
    dispatch(resetAuthState());
  }), []);

  const onSignInPress = () => {
    // TODO: Do validation
    dispatch(signIn(form.email, form.password));
  };

  const renderButtons = () => {
    if (status === Status.LOADING) {
      return <Spinner style={[styles.defaultMargin]} />;
    }
    return (
      <View style={styles.linkContainer}>
        <Button title="signin" style={[styles.defaultMargin]} onPress={onSignInPress} />
        <TouchableOpacity style={[styles.defaultMargin, styles.center]} onPress={() => navigation.navigate(NAVIGATION_SIGNUP_SCREEN_PATH)}>
          <Text>Create an account(Signup)</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleStatusChange = () => {
    if (status === Status.ERROR) {
      return <Text type="subheading" style={styles.errorText}>{errorMessage}</Text>;
    }
    if (status === Status.SUCCESS) {
      navigation.popToTop();
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCorrect={false}
        value={form.email}
        onChangeText={value => setValues({ ...form, email: value })}
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry
        textContentType="password"
        placeholder="Password"
        autoCorrect={false}
        style={[styles.defaultMargin]}
        value={form.password}
        onChangeText={value => setValues({ ...form, password: value })}
      />
      {renderButtons()}
      {handleStatusChange()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultMargin: {
    marginTop: 16,
  },
  center: {
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  }
});

SignInPage.navigationOptions = {
  title: 'Login'
};

SignInPage.propTypes = {};

SignInPage.defaultProps = {};

export default SignInPage;
