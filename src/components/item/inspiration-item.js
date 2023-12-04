import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, View, Image } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';

const InspirationItem = ({ item }) => {
  const navigation= useNavigation ();
  // console.log("Isi image", item.image)
  const { width, height } = Dimensions.get('window');
  const imageUri = item.items[0].image;
  console.log(`ini adalah hasil dari inspirations: ${item.category}`)
  console.log('INI ADALAH BATAS =====================')
  return (
    <View width={'100%'} m={"auto"} my={-3} p={2} height={'225px'} alignItems={'center'}>
        <TouchableOpacity
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Detail Inspiration', {
            itemId: item.id,
            itemDetail: item.description,
            itemImage: imageUri
          });
        }}
      >
        {/* DI IMAGE CUMAN PERLU OTAK ATIK BAGIAN STYLE */}
        {/* NOTE** STYLE SEADANYA DIKERANEKAN MEMAKAN WAKTU BANYAK  */}
        {/* NOTE LAGI** STYLE GABISA DIKASIH PERCENTAGE, CAPE GW */}
        {/* KALAU MAU COBA PAKAI `${60}%` */}
        <Image source={{ uri: imageUri }} style={{ width: 400, height: 120 }} alt="image" />
        <Box>
          <Text fontSize={"20px"}>{item.name}</Text>
        </Box>
        </TouchableOpacity>
    </View>
  );
};

export default InspirationItem;