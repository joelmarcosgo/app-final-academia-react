import React, { useState, useEffect } from "react";
import { 
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert,
    ActivityIndicator,
    StatusBar
} from 'react-native';

import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import AuthInput from "../components/AuthInput";

import { useAuth } from "../context/AuthContext";

import SignInSocialButton from "../components/SignInSocialButton";
import Icon from 'react-native-vector-icons/Feather';

const initialState = {
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    stageNew: false
}

export default function Auth(props) {
    const [data, setData] = useState({...initialState});
    const { user, userStorageLoading, signin, signup, signInWithGoogle } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const signinOrSignup = async () => {
        try{
            if(data.stageNew) {
                await signup(data);
                setData({ ...initialState });
            } else {
                await signin(data);
                setData({ ...initialState });
            }
        } finally {
            setIsLoading(!userStorageLoading);
        }
    }

    // implementar validações de conteúdo
    const validations = []
    validations.push(data.email && data.email.trim().length >= 5);
    validations.push(data.password && data.password.trim().length >= 4);
    if (data.stageNew) {
        validations.push(data.name && data.name.trim().length >= 4);
        validations.push(data.password === data.confirmPassword);
    }
    const validForm = validations.reduce((previous, actual) => previous && actual);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor='transparent'
                translucent
            />
            <View style={styles.header}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>My.Tasks</Text>
                </View>

                <Text style={[styles.signInTitle, {
                    marginBottom: data.stageNew ? 20 : 135
                }]}>
                    Faça seu login com {'\n'}
                    uma das contas abaixo {'\n'}
                    ou Crie sua Conta {'\n'}
                </Text>

                <View style={styles.form}>
                    {data.stageNew && (
                        <AuthInput 
                            style={styles.input} 
                            placeholder="Nome" 
                            value={data.name}
                            onChangeText={name => setData({ ...data, name })}
                            icon='user'
                        />
                    )}

                    <AuthInput 
                        style={styles.input}
                        placeholder="Email" value={data.email}
                        onChangeText={email => setData({ ...data, email })}
                        icon='at'
                    />

                    <AuthInput 
                        style={styles.input} 
                        placeholder="Senha"
                        value={data.password}
                        onChangeText={password => setData({ ...data, password })}
                        secureTextEntry={true}
                        icon='lock'
                    />

                    {data.stageNew && (
                        <AuthInput 
                            style={styles.input} 
                            placeholder="Confirme a senha" 
                            value={data.confirmPassword}
                            onChangeText={confirmPassword => setData({ ...data, confirmPassword })}
                            secureTextEntry={true}
                            icon='asterisk'
                        />
                    )}
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerWrapper}>
                    <TouchableOpacity onPress={signinOrSignup} disabled={!validForm} style={styles.button}>
                        <View style={styles.imagemContainer}>
                            <Icon
                                name={data.stageNew ? 'user-plus' : 'mail' }
                                size={25}
                                color={commonStyles.colors.blue}
                            />
                        </View>
                        <Text style={styles.text}>
                            {data.stageNew ? 'Registrar' : 'Entrar com E-mail' }
                        </Text>
                    </TouchableOpacity>

                    <SignInSocialButton
                        title="Entrar com Google"
                        icon='google'
                        size={30}
                        color={commonStyles.colors.orange}
                        onPress={signInWithGoogle}
                    />

                    <TouchableOpacity 
                        style={{ padding: 10, alignItems: 'center' }}
                        onPress={() => setData({ ...data, stageNew: !data.stageNew })}>
                        <Text style={styles.buttonText}>
                            {data.stageNew ? 'Já tenho uma conta' : 'Ainda não tenho uma conta' }
                        </Text>
                    </TouchableOpacity>

                    {
                        userStorageLoading || isLoading && 
                        <ActivityIndicator
                            color={commonStyles.colors.primary}
                            size={50}
                        />
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: '100%',
        height: '70%',
        backgroundColor: commonStyles.colors.primary,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleWrapper: {
        alignItems: 'center'
    },
    title: {
        fontFamily: commonStyles.fonts.bold,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginBottom: 10, 
        marginTop: 60
    },
    signInTitle: {
        fontFamily: commonStyles.fonts.regular,
        fontSize: 16,
        color:commonStyles.colors.shape,
        textAlign: 'center',
        marginTop: 50,
    },
    footer: {
        width: '100%',
        height: '70%',

        backgroundColor: commonStyles.colors.orange
    },
    footerWrapper: {
        marginTop: '-4%',
        paddingHorizontal: 32,

        justifyContent: 'space-between'
    },
    button: {
        height: 56,
        backgroundColor: commonStyles.colors.shape,
        borderRadius: 7,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16
    },
    imagemContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderColor: commonStyles.colors.background,
        borderRightWidth: 1
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontFamily: commonStyles.fonts.medium,
        fontSize: 14,
        color: commonStyles.colors.blue
    },
    buttonText: {
        fontFamily: commonStyles.fonts.semiBold,
        color: commonStyles.colors.subText,
        fontSize: 18
    },
    form: {
        paddingHorizontal: 32,
        width: '100%'
    },








    // background: {
    //     flex: 1,
    //     width: '100%',
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    // backgroundDark: {
    //     backgroundColor: 'rgba(86, 54, 211, 0.8)',
    //     flex: 1,
    //     width: '100%',
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    // title: {
    //     fontFamily: commonStyles.fonts.bold,
    //     color: commonStyles.colors.secondary,
    //     fontSize: 50,
    //     marginBottom: 10
    // },
    // subtitle: {
    //     fontFamily: commonStyles.fontFamily,
    //     color: '#FFF',
    //     fontSize: 20,
    //     textAlign: 'center',
    //     marginBottom: 10
    // },
    // formContainer: {
    //     backgroundColor: 'rgba(0, 0, 0, 0.8)',
    //     padding: 20,
    //     width: '90%'
    // },
    // input: {
    //     marginVertical: 5,
    //     // padding: Platform.OS === 'ios' ? 15 : 10,
    //     backgroundColor: '#FFF'
    // },
    // button: {
    //     backgroundColor: 'rgba(71,196,235, 1)',
    //     marginTop: 10,
    //     padding: 10,
    //     alignItems: 'center',
    //     borderRadius: 7
    // },
    
    // socialButton: {
    //     marginTop: 16
    // }
});