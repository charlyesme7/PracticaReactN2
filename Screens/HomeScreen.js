import React, {useState} from 'react';
import {ToastAndroid,StyleSheet, Text, View, Button} from 'react-native';
import {SearchBar} from 'react-native-elements';

const HomeScreen = ({navigation}) => {
    const [Tempactual, setTempactual]=useState([""]);
    const [Tempmax, setTempmax]=useState([""]); 
    const [Tempmin, setTempmin]=useState([""]);
    const [Ciudad, setCiudad]=useState([""]);   
    const [consultado, setConsultado]= useState(false);
    const [lat, setLati]= useState("");
    const [lon, setLongi]= useState("");
    
    const buscar = (ciudad) => {
        const apikey ="32f8dd88c90cd07cf7953cc26459fa6f";
        const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apikey}&units=metric`;
        
        fetch(api_url)
          .then(data => {
            return data.json();
          })
          .then(resultado => {

            if(resultado.cod == 404 || resultado.cod == 400){
                console.log('No se encuentra la ciudad')
                    ToastAndroid.showWithGravityAndOffset(
                      "No se encuentra la ciudad",
                      ToastAndroid.SHORT,
                      ToastAndroid.BOTTOM,
                      25,
                      80
                    );
                setConsultado(false);

               }
            else
            {
                setTempactual(resultado.main.temp);
                setTempmin(resultado.main.temp_min);
                setTempmax(resultado.main.temp_max);
                setConsultado(true);
                setLati(resultado.coord.lat);
                setLongi(resultado.coord.lon);
            }
          });
    };
     


    return (
        <View style={styles.container}>

        <View  style={styles.bar}>
        <SearchBar
                lightTheme
                platform="default"
                containerStyle={{
                    backgroundColor:'#EDEDED',
                    borderTopWidth:0,
                    borderBottomWidth:0,
                }}
                inputStyle={{backgroundColor:'white'}}
                onChangeText={(texto)=>{
                    setCiudad(texto);
                    buscar(texto);
                }}
                onClear={()=>{
                    setCiudad("");
                    setConsultado(false);
                }}
                value={Ciudad}
                placeholder="Escribe la ciudad..."
            />
        </View>
            

            <View style={styles.datos}>
                {
                    consultado 
                    ?
                    
                    <>
                    
                        <Text style={styles.texto}>
                            actual: {Tempactual}°C    
                        </Text>
                        <Text style={styles.texto}>
                            minima: {Tempmin}°C
                        </Text>
                        <Text style={styles.texto}>
                            maxima: {Tempmax}°C 
                        </Text>

                        <Button
                            color= "#818181"
                            style={styles.bar}
                            title="Pronóstico"
                            onPress={() => navigation.navigate('DetailScreen', { lat, lon, Ciudad })} />
                    
                    
                    
                    </>
                    :

                    <Text style={styles.texto}>
                        Realiza una Búsqueda
                    </Text>
                }

            </View>
        </View>);
}
 
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: '#EDEDED',
    },
    bar:{
        marginTop: 20,
    },
    datos:{
      margin:20, 
      alignItems:'center', 
      justifyContent:'center',

    },
    texto:{
        color: '#000000', 
        textAlign: 'center', 
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
    }
});
  