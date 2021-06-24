import React, { Component } from 'react';
import { View, TextInput,Alert } from 'react-native';
import firebase from 'firebase';

import Button from './components/Button';
import Card from './components/Card';
import CardSection from './components/CardSection';
import Spinner from './components/Spinner';



class LoginForm extends Component {
    state = { email: '', password: '', loading: false };
    
    clickLogin() {


        this.setState({ loading: true });
        const { email, password } = this.state;

        if(email==='' || password === ''){
            Alert.alert(
                'Warning',
                'Fill the blanks to log in',
                [
                    { text : 'OK', onPress :() => null }
                ]
            );
            this.setState({ loading: false });
        }
        else{
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.loginSucces.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.loginSucces.bind(this))
                    .catch(this.loginFail.bind(this));
            });
        }
        
    }
    loginSucces() {
        console.log(this.state.email + ' başarıyla giriş yaptı');
        this.setState({ loading: false });
    }

    loginFail() {
        console.log('Hatalı');
        this.setState({ loading: false });
        Alert.alert(
            'Message',
            'Either your email or password is incorrect',
            [
                { text : 'OK', onPress :() => null }
            ]
        );
    }

    renderButton() {
        if (!this.state.loading) {
            return <Button onPress={this.clickLogin.bind(this)}> LOG IN </Button>;
        }
        else {
            return <Spinner size="large" />
        }

    }
    render() {
        const { inputStyle } = styles;
        return (
            <Card>
                <CardSection>
                    <TextInput
                        placeholder="E-mail"
                        style={inputStyle}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        style={inputStyle}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {

    inputStyle: {

        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        flex: 1
    },

};

export default LoginForm;