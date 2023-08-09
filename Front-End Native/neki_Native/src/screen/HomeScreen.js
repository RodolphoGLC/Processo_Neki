import React, { useState, useContext, useEffect } from "react"
import { View, StyleSheet, FlatList, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native"
import { DataContext } from '../context/DataContext';
import { AxiosInstance } from '../api/AxiosInstance';

export const Home = ({ navigation }) => {
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { dadosUsuario, armazenarEditar } = useContext(DataContext);

    useEffect(() => {
        SkillsUsuario();
    }, []);

    const SkillsUsuario = async () => {
        await AxiosInstance.get(`/skills/usuario/${dadosUsuario.id}`, {
            headers: { Authorization: `Bearer ${dadosUsuario.token}` },
        })
            .then((response) => {
                console.log(response.data);
                setSkills(response.data);
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setIsLoading(false);
            });
    };

    const deletarSkill = async (id) => {
        await AxiosInstance.delete(`/skills/${id}`, {
            headers: { Authorization: `Bearer ${dadosUsuario.token}` },
        })
            .then(() => {
                console.log("Entrou")
                navigation.navigate('EscolhaTela');
                navigation.navigate("HomeA");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const paginaEdicao = (skill) => {
        armazenarEditar(skill);
        navigation.navigate('Edicao');
    }

    const Skill = ({ skill }) => {
        return (
            <View style={styles.item} key={skill.id}>
                <Image style={styles.imagem} source={{ uri: `${skill.urlImg}` }} />
                <Text style={styles.nome}>{skill.nome} - {skill.level}</Text>
                <Text style={styles.descricao}>{skill.descricao}</Text>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { paginaEdicao(skill) }}>
                        <Text style={styles.txtButton}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { deletarSkill(skill.id) }}>
                        <Text style={styles.txtButton}>Deletar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#116A7B" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonVoltar} onPress={() => { navigation.navigate("EscolhaTela") }}>
                <Image style={styles.imagemVoltar} source={require(`../../assets/desfazer.png`)} />
            </TouchableOpacity>
            <Text style={styles.titulo}>Minhas Skills</Text>

            {skills.length === 0 ? (
                <Text style={styles.semSkill}>Não foi possível encontrar skills, tente cadastrar alguma!!</Text>
            ) : (
                <FlatList
                    data={skills}
                    renderItem={({ item }) => <Skill skill={item} />}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
        width: '100%',
        backgroundColor: '#C2DEDC',
    },
    titulo: {
        alignSelf: 'center',
        marginTop: 40,
        fontWeight: 'bold',
        fontSize: 30,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    semSkill: {
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
    },
    item: {
        display: 'flex',
        backgroundColor: '#FFF',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '60%',
        height: 'auto',
        borderRadius: 20,
        marginTop: 20,
        paddingTop: 30,
        paddingBottom: 30,
    },

    imagem: {
        width: 100,
        height: 100,
        borderRadius: 5,
        backgroundColor: 'white'
    },

    nome: {
        padding: 10,
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 10,
        color: '#242323',
    },
    descricao: {
        padding: 10,
        fontSize: 22,
        marginTop: 10,
        textAlign: 'center',
        color: '#242323',
    },
    button: {
        borderRadius: 20,
        backgroundColor: '#116a7b',
        color: '#FFF',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#000',
        borderWidth: 1,
    },
    buttonVoltar: {
        position: 'absolute',
        top: 45,
        left: 30,
    },
    imagemVoltar: {
        width: 30,
        height: 30,
    },
    txtButton: {
        color: '#FFF',
        fontSize: 16,
    },
})