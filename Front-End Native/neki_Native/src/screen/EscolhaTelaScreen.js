import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

export const EscolhaTela = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={{ uri: 'https://neki-it.com.br/wp-content/uploads/2023/01/LogoNeki-1.png' }}
            />

            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('HomeA') }}>
                <Text style={styles.txtButton}>Minhas Skills</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('CadSkillA') }}>
                <Text style={styles.txtButton}>Cadastrar Skill</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { 
                navigation.reset({
                    index:0,
                    routes: [{name: 'Login'}]
                }) 
                
                }}>
                <Text style={styles.txtButton}>LogOut</Text>
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
    button: {
        borderRadius: 20,
        backgroundColor: '#116a7b',
        color: '#000',
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        marginTop: 20,
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
    },
    txtButton: {
        color: '#FFF',
        fontSize: 18,
    },
    tinyLogo: {
        width: 200,
        height: 200,
        marginLeft: 15,
        marginBottom: 40,
        resizeMode: 'stretch',
    },
});