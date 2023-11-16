import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Correct import
import { Box, Text, Image, HStack, VStack, Heading } from "native-base";


const ProductItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={()=> navigation.navigate('ItemDetail', {
        itemName : item.nama,
        itemDesc : item.deskripsi,
        itemPrice : item.harga,
        itemImage : item.image
      })}
      >
      <Box
        height={240}
        width={170}
        mt={1}
        mx={1}
        m={5}
        p={3}
        backgroundColor={"#FEFFC1"}
        borderRadius={10}
        shadow={3}
      >
        <Image source={{ uri : item.image }} height="60%" borderRadius={10} alt="null" />
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <VStack space={0.5} mt={2}>
            <Heading size="xs">{item.nama}</Heading>
            <Text fontSize="sm">{item.kategori}</Text>
            <Heading mt={3} size={"sm"}>
              IDR: {item.harga}
            </Heading>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
};

export default ProductItem;
