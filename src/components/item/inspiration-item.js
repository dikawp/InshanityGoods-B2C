import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, View, Image } from "native-base";
import { useNavigation } from "@react-navigation/native";

const InspirationItem = ({ item }) => {
  const navigation= useNavigation ();
  console.log("Isi image", item.image)
  return (
    <View width={'100%'} m={"auto"} my={-3} p={2} height={'225px'} alignItems={'center'}>
        <TouchableOpacity
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Detail Inspiration', {
            itemId: item.id,
            itemDetail: item.deskripsi,
            itemImage: item.image
          });
        }}
      >
        <Image source={item.image} maxH={'150px'} alt="null"/>
        <Box>
          <Text fontSize={"20px"}>{item.judul}</Text>
        </Box>
        </TouchableOpacity>
    </View>
  );
};

export default InspirationItem;