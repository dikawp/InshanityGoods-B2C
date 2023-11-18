import {
  NativeBaseProvider,
  ScrollView,
  Box,
  Image,
  View,
  Text,
  Divider,
} from "native-base";
import { TouchableOpacity } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ItemDetail = ({ route, item }) => {
  const { itemName, itemDesc, itemPrice, itemImage } = route.params;

  const navigation = useNavigation();
  const [Total, setTotal] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [count]);

  const calculateTotal = () => {
    const newTotal = count * itemPrice;
    setTotal([newTotal]);
  };

  let plus = () => {
    setCount(count + 1);
  };
  let minus = () => {
    setCount(count - 1);
  };
  console.log(Total);

  return (
    <NativeBaseProvider>
      <View
        backgroundColor={"white"}
        paddingBottom={76}
        paddingTop={21}
        paddingX={21}
        height={"100%"}
        width={"100%"}
      >
        <ScrollView zIndex={-1}>
          <Image
            alignSelf={"center"}
            marginTop={15}
            width={348}
            height={310}
            alt="image"
            source={{ uri: itemImage }}
          />

          <Box marginLeft={"auto"}>
            <TouchableOpacity >
              <Ionicons
                style={{ marginLeft: "auto" }}
                name={"bookmark-outline"}
                size={45}
              />
            </TouchableOpacity>
          </Box>

          <Text color={"#89580A"} fontWeight={"bold"} fontSize={20}>
            {itemName}
          </Text>

          <View
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Text flex={2} fontSize={16}>
              IDR {itemPrice}
            </Text>

            <TouchableOpacity disabled={count === 0} onPress={minus}>
              <Box
                borderRadius={10}
                height={36}
                width={36}
                backgroundColor={"#89580A"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text color={"white"} fontSize={24}>
                  -
                </Text>
              </Box>
            </TouchableOpacity>

            <Text marginX={5} fontSize={22}>
              {count}
            </Text>

            <TouchableOpacity onPress={plus}>
              <Box
                borderRadius={10}
                height={36}
                width={36}
                backgroundColor={"#89580A"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text color={"white"} fontSize={24}>
                  +
                </Text>
              </Box>
            </TouchableOpacity>
          </View>

          <Divider thickness={2} bg={"black"} my={3} />

          <Text fontWeight={"bold"}>Description</Text>

          <Text>{itemDesc}</Text>
        </ScrollView>
      </View>

      <View
        zIndex={999}
        justifyContent={"space-between"}
        flexDirection={"row"}
        paddingY={1}
        paddingX={21}
        bottom={0}
        position={"absolute"}
        backgroundColor={"#FFFFE7"}
        height={76}
        width={"100%"}
      >
        <View>
          <Text fontSize="2xl" color="#3B454D">
            Payment
          </Text>
          <Text fontSize={18}>IDR {Total.length > 0 ? Total[0] : 0}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Checkout", {
              totalPrice: Total,
              itemName : itemName,
              itemImage : itemImage,
              quantity : count,
              itemPrice : itemPrice,
            })
          }
        >
          <Box
            top={2.5}
            borderRadius={10}
            justifyContent={"center"}
            width={120}
            height={45}
            backgroundColor={"#D19E00"}
          >
            <Text color={"white"} fontSize={"16"} textAlign={"center"}>
              Checkout
            </Text>
          </Box>
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>
  );
};

export default ItemDetail;
