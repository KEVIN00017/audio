import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Button, FlatList, StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign';


const Home = () => {
    const [audios, SetAudios] = useState([]);
    const [duracao, SetDuracao] = useState([])

    const Navigation = useNavigation()
    useEffect(() => {
        axios.get('http://10.0.0.225:3200')
            .then(async (audio) => {
                const Audios = await audio.data.map(item => item.uri)

                SetAudios(Audios)

                console.log(duracao)
            })

    }, [])
    async function AudioPlay(audiouri, index) {
        if (!audiouri) {
            console.log("Uri nao encontrada")
            return
        } 
        try {
            const { sound } = await Audio.Sound.createAsync({ uri: audiouri });
            await sound.setPositionAsync(0);
            await sound.playAsync()
            const status = await sound.getStatusAsync()

            await SetDuracao(prev => ([...prev, parseFloat(status.durationMillis / 1000).toFixed(2).replace('.', ':')]))
            console.log(duracao)
        } catch (error) {
            console.log(error)
        }




    }

    const duration = parseInt(duracao / 1000).toFixed(2)
    return (
        <SafeAreaView >
            <FlatList
                data={audios}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center', marginTop: 400 }}>
                            <Pressable onPress={() => AudioPlay(item, index)} style={styles.playButton}>
                                <AntDesign name="play" size={24} color="black" />
                            </Pressable>

                            <View style={styles.progressBar}>
                                <View style={[styles.progress, { width: '50%' }]} />
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
                    onPress={() => Navigation.navigate('Recorder')}


                />
            </View>

        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 10

    },
    playButton: {
        backgroundColor: '#1DB954',
        padding: 10,
        borderRadius: 50,
        marginRight: 15,
    },
    progressBar: {
        flex: 1,
        height: 5,
        backgroundColor: '#777',
        borderRadius: 5,
        overflow: 'hidden'
    },
    progress: {
        height: '100%',
        backgroundColor: '#1DB954'
    },
    time: {
        color: '#000',
        fontSize: 12,
        marginLeft: 10
    },
    Botao: {
        marginTop: 300
        , width: 100,
        marginLeft: '38.1%',
        alignItems: 'center',
    }
})