import React from "react";
import { View, Text, Image, ScrollView, Heading, IconButton, Center } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

function DetailScreen({ route }) {
  const { itemId, itemDetail, itemImage } = route.params;
  const navigation = useNavigation();
  // console.log("Isi Detail", route)

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <ScrollView>
        <Center>
          <Heading mt={5} mx={"20"} textAlign="center" fontSize={30} color="#89580A">
            Inspiration
          </Heading>
        </Center>
        <Image  style={{ width: 400, height: 200 }} source={{uri: itemImage}} alt="Selected Image" />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          {/* <Text>itemId: {JSON.stringify(itemId)}</Text> */}
          <Text fontSize={"20"} textAlign={'left'}> {JSON.stringify(itemDetail)}</Text>
        </View>
      </ScrollView>
    </>
  );
}

export default DetailScreen;