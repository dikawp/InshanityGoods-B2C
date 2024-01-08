import React from "react";
import { Text, Image, ScrollView, Heading, Center, Box } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import RelatedItem from "../../../components/item/related-item";

function DetailScreen({ route }) {
  const { itemDetail, itemImage, itemName, itemProduct } = route.params;

  console.log(itemProduct[0]);

  return (
    <>
      <ScrollView>
        <Center>
          <Heading
            my={5}
            mx={"20"}
            textAlign="center"
            fontSize={30}
            color="#89580A"
          >
            Inspiration
          </Heading>
        </Center>
        <Image
          style={{ width: 400, height: 200 }}
          source={{ uri: itemImage }}
          alt="Selected Image"
        />
        <Box flex={1} mx={2} my={2}>
          <Text fontSize={"24"} fontWeight={"bold"}>
            {JSON.stringify(itemName)}
          </Text>
          <Text fontSize={"16"} textAlign={"justify"}>
            {itemDetail}
          </Text>
          <Box>
            <Text fontSize={"24"} fontWeight={"bold"} my={4}>
              Related Items
            </Text>
            
            <Box width="100%" height={240} flexDirection={"row"}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {itemProduct.map((itemProduct, index) => (
                  <RelatedItem
                    item={itemProduct}
                    key={index}
                  />
                ))}
              </ScrollView>
            </Box>

          </Box>
        </Box>
      </ScrollView>
    </>
  );
}

export default DetailScreen;
