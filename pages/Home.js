import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, FlatList,StyleSheet,View,Text, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import {Ionicons} from '@expo/vector-icons'


const Home = ()=>{
const [audios,SetAudios]=useState([]);
const [duracao,SetDuracao]=useState([])
const Navigation=useNavigation()
    useEffect( ()=>{
        axios.get('http://10.0.0.225:3200')
        .then(async(audio)=>{
            const Audios= await audio.data.map(item=>item.uri)
            SetAudios(Audios)
            console.log(duracao)
        })
        
    },[])
    async function AudioPlay(audiouri){
       if(!audiouri){
        console.log("Uri nao encontrada")
        return
       }
       try {
        const{sound}=await Audio.Sound.createAsync({uri:audiouri});
           await sound.setPositionAsync(0);
           await sound.playAsync()
           const status=await sound.getStatusAsync()
          await SetDuracao([...duracao,status.durationMillis])
           console.log(duracao)
       } catch (error) {
        console.log(error)
       }
        
       
           
        
}
const duration=parseInt(duracao/1000).toFixed(2)
    return(
        <SafeAreaView >
            <FlatList
            data={audios}
            renderItem={({item,index})=>{
                return(
                    <View style={styles.container}>    
                    <Pressable  onPress={()=>AudioPlay(item) } style={styles.playButton}>
                        <Ionicons
                        size={30}
                        color='#FFF'
                        />
                        </Pressable>           
              
                    <View style={styles.progressBar}>
                    <View style={[styles.progress,{width:'50%'}]} />
                    </View>
                <Text style={styles.time}>{duracao[index]}</Text>
                </View>
 
                )
            }
            }
            />
            <View style={styles.Botao}>
            <Button
            title="Ir Gravar"
            onPress={()=>Navigation.navigate('Recorder')}
            
            
            />
            </View>
            
        </SafeAreaView>
    )
}

export default Home

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#333',
        padding:10,
        borderRadius:10
       
    },
    playButton:{
        backgroundColor:'#1DB954',
        padding:10,
        borderRadius:50,
        marginRight:15,
    },
    progressBar:{
        flex:1,
        height:5,
        backgroundColor:'#777',
        borderRadius:5,
        overflow:'hidden'
    },
    progress:{
        height:'100%',
        backgroundColor:'#1DB954'
    },
    time:{
        color:'#FFF',
        fontSize:12,
        marginLeft:10
    },
    Botao:{
        marginTop:60
    }
})