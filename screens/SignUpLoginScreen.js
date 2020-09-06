import * as React from 'react';
import {Text,View, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {Header} from 'react-native-elements';

export default class SignUpLoginScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            emailId: '',
            password: ''
        }
    }

    signUp=(emailID,password)=>{
        firebase.auth().createUserWithEmailAndPassword(emailID,password)
        .then((response)=>{
            return Alert.alert("Your account has been created successfully!!");
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
        })
    }

    login=(emailID,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailID,password)
        .then(()=>{
            return Alert.alert("You have successfully logged in!!");
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Header
                    backgroundColor={'#4c9900'}
                    centerComponent={{
                        text: 'BARTER SYSTEM',
                        style: { color: '#fff', fontSize: 20 },
                    }}
                />

                <View>
                    <TextInput 
                        style={styles.inputBox}
                        placeholder='Enter your emailID here'
                        keyboardType = 'email-address'
                        onChangeText={(text)=>{
                            this.setState({emailId: text})
                        }}
                    />

                    <TextInput 
                        style={styles.inputBox}
                        placeholder='Enter your password'
                        secureTextEntry = {true}
                        onChangeText={(text)=>{
                            this.setState({password: text})
                        }}
                    />

                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={()=>{
                            this.login(this.state.emailId,this.state.password);
                        }}
                    >
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>

                    <Text style={styles.info}>Don't have an account?</Text>
                    <Text style={styles.info}>Click below after entering your email & password</Text>

                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={()=>{
                            this.signUp(this.state.emailId,this.state.password);
                        }}
                    >
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#33ff33"
    },
    inputBox: { 
        borderWidth: 3,
        width: '80%',
        height: '20%'
    },
    buttons: {
        backgroundColor: "#336600",
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 15
    },
    info: {
        color: "#336600",
        fontWeight: "bold",
        fontSize: 25
    }
})