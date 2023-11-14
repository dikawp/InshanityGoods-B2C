import React from "react";
import { View, Text, Image, ScrollView, Heading, IconButton } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

function DetailScreen({ route }) {
  const { itemId, itemDetail, itemImage } = route.params;
  const navigation = useNavigation();
  console.log("Isi Detail", route)

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <ScrollView>
        <View flexDirection="row" alignItems="center" mt={5} ml={3}>
          <IconButton
            onPress={handleGoBack}
            // variant="outline"
            icon={<Ionicons name="arrow-back" size={25} color="#FFE60D" />}
            size={10}
            // color="black"
            borderRadius="full"
            // borderWidth={1}
            backgroundColor="#89580A"
            p={1}
            mt={5}
          />
          <Heading mt={5} mx={"20"} textAlign="center" fontSize={30} color="#89580A">
            Inspiration
          </Heading>
        </View>
        <Image w="100%" h={200} my={5} source={itemImage} alt="Selected Image" />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          {/* <Text>itemId: {JSON.stringify(itemId)}</Text> */}
          <Text fontSize={"20"} textAlign={'left'}> {JSON.stringify(itemDetail)}</Text>
        </View>
      </ScrollView>
    </>
  );
}

export default DetailScreen;