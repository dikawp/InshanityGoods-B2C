import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Correct import
import { Box, Text, Image } from "native-base";

// Create a query against the collection.

const RelatedItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Item Detail", {
          itemName: item.name || item.nama,
        })
      }
    >
      <Box>
        <Image
          height={120}
          width={120}
          source={{ uri: item.image }}
          alt="Selected Image"
          mx={4}
        />
        <Text textAlign={"center"}>{item.nama || item.name}</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default RelatedItem;
