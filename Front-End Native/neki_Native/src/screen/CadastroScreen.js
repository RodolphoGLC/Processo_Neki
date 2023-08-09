import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { AxiosInstance } from '../api/AxiosInstance';

export const CadastroScreen = ({ navigation }) => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacao, setConfirmacao] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [cadastroHabilitado, setCadastroHabilitado] = useState(false);
    const [erro, setErro] = useState('');

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setShowSuccess(false);
    }, []);

    const handleCadastro = async () => {
        try {
            if (senha === confirmacao) {
                const resultado = await AxiosInstance.post('/auth/signup', {
                    username: usuario,
                    password: senha
                });

                if (resultado.status === 200) {
                    console.log('Cadastro Funcionou');
                    setShowSuccess(true);
                    setTimeout(() => {
                        setShowSuccess(false);
                        navigation.navigate('Login');
                    }, 2000);

                } else {
                    console.log('erro');
                }
            }
            else {
                setErro('Senhas não batem');
            }
        } catch (error) {
            console.log('erro: ' + error);
        }
    };

    const alternarVisibilidadeSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={{ uri: 'https://neki-it.com.br/wp-content/uploads/2023/01/LogoNeki-1.png' }}
            />

            <TextInput
                style={styles.input}
                onChangeText={setUsuario}
                value={usuario}
                placeholder="Usuário"
            />
            <View style={styles.senhaContainer}>
                <TextInput
                    style={styles.inputSenha}
                    onChangeText={setSenha}
                    value={senha}
                    placeholder="Senha"
                    secureTextEntry={!mostrarSenha}
                />
                <TouchableOpacity style={styles.olhoButton} onPress={alternarVisibilidadeSenha}>
                    <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.senhaContainer}>
                <TextInput
                    style={styles.inputSenha}
                    onChangeText={(text) => {
                        setConfirmacao(text);
                        if (text === senha) {
                            setErro('');
                            setCadastroHabilitado(true);
                        } else {
                            setErro('Senhas não batem');
                            setCadastroHabilitado(false);
                        }
                    }}
                    value={confirmacao}
                    placeholder="Confirmação Senha"
                    secureTextEntry={!mostrarSenha}
                />
                {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
                <TouchableOpacity style={styles.olhoButton} onPress={alternarVisibilidadeSenha}>
                    <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleCadastro} disabled={!cadastroHabilitado}>
                <Text style={styles.txtButton}>Cadastro</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Login") }}>
                <Text style={styles.txtButton}>Login</Text>
            </TouchableOpacity>

            {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
            {showSuccess && (
                <View style={styles.resposta}>
                    <Text style={styles.textoResposta}>Cadastro realizado com sucesso</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#116a7b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 40,
        fontWeight: 'bold',
        marginVertical: 0,
        color: '#000',
    },
    input: {
        height: 42,
        width: 330,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#D9D9D9',
        color: '#000'
    },
    senhaContainer: {
        position: 'relative',
        width: 330,
    },
    inputSenha: {
        marginBottom: 20,
        height: 42,
        width: '100%',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#D9D9D9',
    },
    olhoButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    button: {
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        width: 134,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        marginTop: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: '#000',
        borderWidth: 1,
    },
    txtButton: {
        color: '#000',
        fontSize: 18,
    },
    erro: {
        color: 'red',
        marginTop: 10,
    },
    tinyLogo: {
        width: 200,
        height: 200,
        marginLeft: 15,
        marginBottom: 30,
        resizeMode: 'stretch',
    },
    resposta: {
        display: 'flex',
        marginTop: 30,
        width: 300,
        height: "auto",
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    textoResposta: {
        color: "#009617",
        padding: 5,
        fontSize: 18,
        fontWeight: "bold"
    }
});