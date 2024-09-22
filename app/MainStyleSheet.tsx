import { StyleSheet } from 'react-native';

const mainStyles = StyleSheet.create({
    input: {
        height: 40,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
        padding: 10,
        borderWidth: .3,
        borderColor: '#ffffff',
        borderRadius: 20
    },
    multilineInput: {
        height: 100,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
        padding: 10,
        borderWidth: .3,
        borderColor: '#ffffff',
        borderRadius: 20
    },
    label: {
        marginBottom: 5,
        color: '#ffffff',
        paddingLeft: 12,
    },
    button: {
        height: 50,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#483C32',
        borderRadius: 30
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20
    }
  });

export default mainStyles;