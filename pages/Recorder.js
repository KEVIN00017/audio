import React, { useEffect, useState } from 'react';
import { View, Button, Alert,Pressable,Text,StyleSheet } from 'react-native';
import { Audio,InterruptionModeIOS,InterruptionModeAndroid } from 'expo-av';
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";


const Recorder=()=>{
const [Recording,setRecording]=useState(null);
const [RecordingUri,setRecordingUri]=useState(null);

const Navigation=useNavigation()
async function StartRecording(){
    try {
        
    const {granted}=await Audio.getPermissionsAsync();
    if(granted){
        const {recording}=await Audio.Recording.createAsync();
       
        setRecording(recording)
    }
    } catch (error) {
        console.log(error)
       Alert.alert("Nao foi possivel gravar o audio")
    }
}

async function StopRecording(){
try {
    if(Recording){
        await Recording.stopAndUnloadAsync();
        const fileUri=Recording.getURI()
         setRecordingUri(fileUri)
         setRecording(null)
        console.log(fileUri)
        await axios.post("http://10.0.0.225:3200/postar",{
            uri:fileUri,
            
        })
    }
} catch (error) {
    console.log(error)
    Alert.alert("Erro ao parar o audio")
}
   
}
    async function AudioPlay(){
        if(RecordingUri){
           const{sound}=await Audio.Sound.createAsync({uri:RecordingUri},{shouldPlay:true});
           await sound.setPositionAsync(0);
           await sound.playAsync()
           
        }
}
    useEffect(()=>{
        Audio
        .requestPermissionsAsync()
        .then(({granted})=>{
            if(granted){
                Audio.setAudioModeAsync({
                    allowsRecordingIOS:true,
                    interruptionModeIOS:InterruptionModeIOS.DoNotMix,
                    playsInSilentModeIOS:true,
                    shouldDuckAndroid:true,
                    interruptionModeAndroid:InterruptionModeAndroid.DoNotMix,
                    playThroughEarpieceAndroid:true
                })
            }
        })
        
    },[])
    return(
    <View style={styles.container}>
        
        <Pressable
        onPressIn={StartRecording}
        onPressOut={StopRecording}
        >
              <FontAwesome name="microphone" size={24} color="black" />
        </Pressable>
        {RecordingUri &&
        <Button
        title='Ouvir Audio'
        onPress={AudioPlay}
        />
        }
          <Button
            title="Ir para  o feed"
            onPress={()=>Navigation.navigate('Home')}
            
            />
    </View>)
}

export default Recorder;
const styles=StyleSheet.create({
    container:{
        marginTop:50
       
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
    }
})