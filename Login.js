import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      password: "",
      horas: 0,
      minutos: 0,
      segundos: 0,
      corriendo: false,
    };
  }


  entrar = () => {
    const { correo, password } = this.state;
    let _this = this;
    var http = new XMLHttpRequest();
    var url = 'http://148.202.152.33/cucei/autentificacion_siauu_temporal.php';
    var params = 'codigo=' + encodeURIComponent(correo) + '&nip=' + encodeURIComponent(password);
  
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
        if (http.responseText == '0') {
          alert('datos incorrectos');
        } else {
          let pc = http.responseText.split(',');
          let nc = pc[2];
          let cd = pc[1];
          //console.log("----- " + cd + " -----");
          _this.props.navigation.navigate("Current", {nombre: nc, codigo: cd});
        }
      }
    };
  
    http.send(params);
  }

  CorreoChange = (correo) => {
    this.setState({ correo });
  }

  PasswordChange = (password) => {
    this.setState({password});
  }

  render() {
   
    return (
      <>
      <View>

      <ImageBackground source={require('./Imagenes/fondo.jpg')}
       style={{width:400,height:800}}>

      <View style={{marginTop: 10}}>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 30, color: 'white'}}>Login</Text>
      </View>

        <View style={{ marginTop: 75}}>
          <TextInput placeholder='codigo' onChangeText={this.CorreoChange}>
          </TextInput>
        </View>

        <View style={{marginTop:30}}>
          <TextInput placeholder='contraseña' onChangeText={this.PasswordChange} secureTextEntry={true}>
          </TextInput>
        </View>

        <View style={{marginTop: 35, borderWidth: 2, borderRadius: 15, height: 35, marginRight: 75, marginLeft: 75, backgroundColor: '#ffaf7a'}}>
          <TouchableOpacity style={{alignItems: 'center'}} onPress={this.entrar}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>Iniciar sesion</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
        </View>
      
      </>
    );
  }
}
