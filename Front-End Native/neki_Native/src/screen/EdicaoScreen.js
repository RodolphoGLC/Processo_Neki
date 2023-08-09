import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AxiosInstance } from '../api/AxiosInstance';
import { DataContext } from '../context/DataContext';

export const EdicaoScreen = ({ navigation }) => {
    const [url, setUrl] = useState("");
    const [nome, setNome] = useState("");
    const [level, setLevel] = useState("")
    const [descricao, setDescricao] = useState("");
    const [erro, setErro] = useState('');

    const { dadosUsuario, Editar } = useContext(DataContext);
    const [cadastroHabilitado, setCadastroHabilitado] = useState(false);

    const idSkill = parseInt(Editar.id);

    const handleSubmitData = async () => {
        let newUserData = {
            id: idSkill,
            urlImg: url || Editar.urlImg,
            nome: nome || Editar.nome,
            level: parseInt(level) || Editar.level,
            descricao: descricao || Editar.descricao,
            usuario: dadosUsuario
        };

        console.log(typeof (idSkill))

        console.log(newUserData)

        await AxiosInstance.post(`/skills`, newUserData, {
            headers: { Authorization: `Bearer ${dadosUsuario.token}` },
        })
            .then(() => {
                console.log("Sucesso")
                navigation.navigate('EscolhaTela');
            })
            .catch((e) => {
                console.log(e)
            })
    };

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Edição</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>URL</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setUrl(text)}
                    value={url}
                    placeholder={Editar.urlImg}
                />
            </View>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setNome(text)}
                value={nome}
                placeholder={Editar.nome}
            />

            <Text style={styles.label}>Level</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => {
                    const numericValue = parseInt(text);
                    if (!isNaN(numericValue)) {
                        if (numericValue >= 0 && numericValue <= 10) {
                            setLevel(numericValue.toString());
                            setErro('');
                            setCadastroHabilitado(true);
                        } else {
                            setLevel(text);
                            setCadastroHabilitado(false);
                            setErro('Digite um valor entre 0 e 10');
                        }
                    } else {
                        setLevel(text);
                        setCadastroHabilitado(false);
                        setErro('Só pode números');
                    }
                }}
                value={level}
                placeholder={Editar.level.toString()}
                keyboardType="numeric"
            />
            {erro && <Text style={styles.erro}>{erro}</Text>}

            <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={styles.input}
                value={descricao}
                onChangeText={text => setDescricao(text)}
                placeholder={Editar.descricao}
            />

            <TouchableOpacity style={styles.button} disabled={!cadastroHabilitado} onPress={() => { handleSubmitData() }}>
                <Text style={styles.txtButton}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCancel} onPress={() => { navigation.navigate("EscolhaTela") }}>
                <Text style={styles.txtButtonCancel}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C2DEDC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 35,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    input: {
        height: 42,
        width: 330,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#D9D9D9',
        color: '#000'
    },
    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5
    },
    button: {
        borderRadius: 20,
        backgroundColor: '#116a7b',
        width: 134,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
        marginTop: 41,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#000',
        borderWidth: 1,
    },
    buttonCancel: {
        borderRadius: 20,
        backgroundColor: '#116a7b',
        width: 134,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#000',
        borderWidth: 1,
    },
    txtButton: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    txtButtonCancel: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    erro: {
        color: 'red',
        marginTop: 10,
    },
});
