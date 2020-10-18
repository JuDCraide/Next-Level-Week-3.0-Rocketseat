import React, { useState } from 'react';
import { ScrollView, View, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../../../services/api';

import styles from './style';

interface RouteParamsPosition {
  latitude: number,
  longitude: number,
}

export default function OrphanageData() {

  const route = useRoute();
  const position = route.params as RouteParamsPosition;

  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [openHours, setOpenHours] = useState("");
  const [openOnWeekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  async function handleCreateOrphanage() {
    console.log(
      name,
      about,
      instructions,
      openHours,
      openOnWeekends,
      position,
    );

    const data = new FormData

    data.append('name', name);
    data.append('about', about);
    if (position.latitude !== 0 && position.longitude !== 0) {
      data.append('latitude', String(position.latitude));
      data.append('longitude', String(position.longitude));
    }
    data.append('instructions', instructions);
    data.append('open_hours', openHours);
    data.append('open_on_weekends', String(openOnWeekends));
    images.forEach((image, index) =>
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any)
    );

    await api.post('orphanages', data);

    navigation.navigate('OrphanageMap');
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Ei, precisamos de acesso às suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (result.cancelled) return;

    const { uri } = result;

    setImages([...images, uri]);

  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />
      {/* 
      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      /> */}

      <Text style={styles.label}>Fotos</Text>
      <ScrollView horizontal style={styles.uploadedImagesContainer}>
        {
          images.map(img => {
            return <Image key={img} source={{ uri: img }} style={styles.uploadedImage} />
          })
        }
      </ScrollView>
      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horário de visitas</Text>
      <TextInput
        style={styles.input}
        value={openHours}
        onChangeText={setOpenHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={openOnWeekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}
