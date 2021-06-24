import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';


import Header from './src/components/Header';
import LoginForm from './src/LoginForm';
import CardSection from './src/components/CardSection';

import Spinner from './src/components/Spinner';
import Button from './src/components/Button';


class Main extends Component {
  state = { loggedIn: null };
  componentDidMount() {
    firebase.initializeApp({
   
    apiKey: 'AIzaSyC4iX30dtuh1ShTh4aUMCaVngFZqGDZjpg',
    authDomain: 'kimlikdogrulama-7a583.firebaseapp.com',
    projectId: 'kimlikdogrulama-7a583',
    storageBucket: 'kimlikdogrulama-7a583.appspot.com',
   messagingSenderId: '761441863963',
    appId: '1:761441863963:web:65f27d15a07b38b4452bbe',
    measurementId: 'G-M4BS9FY3NP'
  });

  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  clickLogout() {
    firebase.auth().signOut();
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return (
        <CardSection>
            <Header headerText="PrOFİLE" />
          <Button onPress={this.clickLogout.bind(this)}> LOG OUT </Button>
        </CardSection>
      );
      case false:
        return (
          <LoginForm />
      );
      default:
       return (
         <View>
          <Spinner size="large" />
         </View>
       );

    }
  }


  render() {
    return (
      <View>
        <Header headerText="Login Page" />
        {this.renderContent()}
      </View>
    );
  }
}

export default Main;