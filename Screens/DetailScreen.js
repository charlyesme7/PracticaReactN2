import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements'



const DetailScreen = ({route}) => {
    const {lat,lon} = route.params;
    const [datos, setDatos]=useState([]);
    const [wait, setWait]=useState(false);
    useEffect(()=>{
        const apikey ="32f8dd88c90cd07cf7953cc26459fa6f";
        const api_url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apikey}&units=metric`;
        fetch(api_url)
            .then(data => {
                return data.json()
            }).then(resultado=>
            {   
                setDatos(resultado);
                setWait(true);
            });

    },[])

    const createDate=(dt,ix)=> {
        if (ix===0)
        {
            return "Hoy";
        }
        else
        {
            var day = new Date(dt * 1000);
            return day.toLocaleString("es-mx", { weekday: "long" }).toUpperCase(); 
        }

    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    wait
                    ?
                    datos.daily.map((a,b)=>
                        <Card key={b}>
                            <Card.Title style={{color: 'black', textAlign: 'left', fontSize: 20, margin: 10, fontWeight: 'bold',}} >{createDate(a.dt,b)}</Card.Title>
                            <Card.Divider></Card.Divider>
                            <View>
                                <Text style={{color: 'black', textAlign: 'center', fontSize: 20, margin: 10, fontWeight: 'bold',}}>
                                    {a.temp.day}°C
                                </Text>
                                <Text style={styles.texto}>
                                    Min: {a.temp.min}°C
                                </Text>
                                <Text style={styles.texto}>
                                    Max: {a.temp.max}°C
                                </Text>
                            </View>
                        </Card>
                    )
                    :
                    <Text></Text>                    

                }
            </ScrollView>
        </View>
    );
}
 
export default DetailScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#B3A7AB',
    },
    texto:{
      color: '#000000', 
      textAlign: 'center', 
      fontSize: 20,
    },
  });