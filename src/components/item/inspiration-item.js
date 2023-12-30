import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, View, Image } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const InspirationItem = ({ item }) => {

  const navigation = useNavigation();

  return (
    <View
      width={"100%"}
      m={"auto"}
      my={2}
      p={2}
      mb={5}
      height={"225px"}
      alignItems={"center"}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Detail Inspiration", {
            itemId: item.id,
            itemName: item.name,
            itemDetail: item.description,
            itemImage: item.image,
            itemProduct: item.items,
          });
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 400, height: 170 }}
          alt="image"
        />
        <Box>
          <Text fontSize={"20px"}>{item.name}</Text>
        </Box>
      </TouchableOpacity>
    </View>
  );
};

export default InspirationItem;
