import { useState } from "react";
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

const initialForm = {
    lugar:"",
    perfil:"",
    descripcion:"",
    telefono:"",
    email: "",
    salario: "",
}
/*Lugar donde se requiere el servicio.
Definir el perfil de la persona que se busca para realizar el trabajo.
Descripción del trabajo que se desea realizar.
Número y correo de contacto.
Salario (opcional).
*/
const Post = () => {
    const [form, setForm] = useState(initialForm);

    const onSubmit = () =>{
        if(form.lugar != "" 
            && form.perfil != "" 
            && form.descripcion != ""
            && form.telefono != ""
            && form.email != ""
            && form.salario != ""){
                Toast.show({
                  type: "success",
                  text1: "Posted successfully ✅",
                  text2: "Your post was sent successfully 👋",
                });
        }else{
                Toast.show({
                  type: "error",
                  text1: "Missing places 😧❌",
                  text2: "Please complete all the fields 👍",
                });
        }
        console.log("Sending post...");
        setForm(initialForm);
    }
    return(
    <View style={styles.container}>
        
        <View style={styles.tostada}>
            <Toast                 
                topOffset={5}
            />
        </View>
        <View>
            <Text style={styles.title}>Postulación de Empleo</Text>
            <TextInput
                name="title"
                style={styles.input}
                placeholder="Lugar donde se ofrece el servicio"
                value={form.lugar}
                onChangeText={(lugar) => setForm({[lugar]:lugar})}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo de servicio a ofrecer"
                value={form.perfil}
                onChangeText={(perfil) => setForm({[perfil]:perfil})}
            />
            <TextInput
                multiline={true}
                style={[styles.input, styles.textArea]}
                placeholder="Descripción del servicio que ofrece"
                value={form.descripcion}
                onChangeText={(descripcion) => setForm({[descripcion]:descripcion})}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de teléfono"
                value={form.telefono}
                onChangeText={(telefono) => setForm({[telefono]:telefono})}
            />
            <TextInput
                style={styles.input}
                placeholder="Precio del servicio por hora"
                value={form.salario}
                onChangeText={(salario) => setForm({[salario]:salario})}
            />
            <TouchableHighlight
                style={styles.button}
                onPress={onSubmit}
            >
                <Text style={styles.textButton}> Subir mi servicio</Text>
            </TouchableHighlight>

        </View>

    </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#F5FCFF",
        padding: 20
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 5
    },
    textArea: {
        height:100
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#01C13D",
        padding: 15,
        borderRadius: 5
    },
    textButton: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold"
    },
    tostada:{
        backgroundColor: "white",
        zIndex: 9000,
        elevation: 300000
    },
});
export default Post;