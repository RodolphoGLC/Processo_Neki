import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { AxiosInstance } from '../api/AxiosInstance';
import { DataContext } from '../context/DataContext';
import { useFocusEffect } from '@react-navigation/native';

export const LoginScreen = ({ navigation }) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const { armazenarDadosUsuario, armazenarLogin, login } = useContext(DataContext);

  const [usuario, setUsuario] = useState(login.user);
  const [senha, setSenha] = useState(login.senha);
  const [validacao, setValidacao] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setUsuario(login.user)
      setSenha(login.senha)
      setValidacao(false)
    }, []))

  const handleLogin = async () => {
    try {
      const resultado = await AxiosInstance.post('/auth/signin', {
        username: usuario,
        password: senha
      });

      if (resultado.status === 200) {
        console.log('deu certo');
        var jwtToken = resultado.data;
        armazenarDadosUsuario(jwtToken["accessToken"]);
        armazenarLogin(usuario, senha, validacao);
        setUsuario("")
        setSenha("");
        navigation.navigate('EscolhaTela');
      }
    } catch (error) {
      console.log('erro: ' + error);
      setErro('Usuário ou senha incorretos');
    }
  };

  const handleCadastro = async () => {
    navigation.navigate('Cadastro');
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
        placeholder={usuario || "Usuário"}
      />
      <View style={styles.senhaContainer}>
        <TextInput
          style={styles.inputSenha}
          onChangeText={setSenha}
          value={senha}
          placeholder={senha || "Senha"}
          secureTextEntry={!mostrarSenha}
        />
        <TouchableOpacity style={styles.olhoButton} onPress={alternarVisibilidadeSenha}>
          <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => {
          setValidacao(!validacao)
        }}
      >
        <Ionicons
          name={validacao ? 'checkbox' : 'checkbox-outline'}
          size={24}
          color={validacao ? 'black' : '#D9D9D9'}
          style={styles.checkboxIcon}
        />
        <Text style={styles.checkboxLabel}>Deseja lembrar a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.txtButton}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.txtButton}>Cadastro</Text>
      </TouchableOpacity>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
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
    marginTop: 41,
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
    marginTop: 20,
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
    top: 29,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    color: '#000',
    width: 134,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#000',
    borderWidth: 1,
  },
  txtButton: {
    color: '#000',
  },
  erro: {
    color: 'red',
    marginTop: 10,
  },
  tinyLogo: {
    width: 200,
    height: 200,
    marginLeft: 15,
    marginBottom: 20,
    resizeMode: 'stretch',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30
  },
  checkboxIcon: {
    marginRight: 10,
  },
  checkboxLabel: {
    color: '#D9D9D9',
    fontSize: 15,
  },
});