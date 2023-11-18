import {
  NativeBaseProvider,
  ScrollView,
  Box,
  Image,
  View,
  Text,
  Radio,
} from "native-base";
import { TouchableOpacity } from "react-native";
import React, { Component, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const Checkout = () => {
  const route = useRoute();

  const Harga = route.params ? route.params.totalPrice : "";
  const { itemName, itemPrice, itemImage, quantity } = route.params;

  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <View
        width={"100%"}
        marginBottom={79}
        alignItems={"center"}
        height={"100%"}
      >
        <ScrollView marginBottom={79}>
          <TouchableOpacity onPress={() => navigation.navigate("Address")}>
            <Box
              justifyContent={"center"}
              padding={3}
              marginY={5}
              height={135}
              width={360}
              backgroundColor={"#FEFFC1"}
              borderRadius={10}
              alignSelf={"center"}
            >
              <Text fontWeight={"bold"} fontSize={16}>
                Brody Pentagon
              </Text>
              <Text color={"#89580A"} fontSize={12}>
                darkside@gmail.com
              </Text>
              <Text color={"#89580A"} fontSize={12}>
                +14987889999
              </Text>
              <Text fontWeight={"bold"} fontSize={14}>
                Leibnizstraße 16, Wohnheim 6, No: 8X Clausthal-Zellerfeld,
                Germany
              </Text>
            </Box>
          </TouchableOpacity>

          <Text fontSize={15} fontWeight={"bold"} color={"#212529"}>
            Payment
          </Text>
          <View justifyContent={"center"} alignItems={"center"}>
            <Radio.Group>
            <Radio shadow={2} value="1">
                <Box
                  width={300}
                  backgroundColor={"#FEFFC1"}
                  p={5}
                  my={3}
                >
                  <View marginRight={3}>
                    <Text color={"#89580A"} fontSize={18}>
                      DANA
                    </Text>
                  </View>
                </Box>
              </Radio>
              <Radio shadow={2} value="2">
                <Box
                  width={300}
                  backgroundColor={"#FEFFC1"}
                  p={5}
                  my={3}
                >
                  <View marginRight={3}>
                    <Text color={"#89580A"} fontSize={18}>
                      Ovoo
                    </Text>
                  </View>
                </Box>
              </Radio>
            </Radio.Group>
          </View>

          <Text my={3}>Item Detail</Text>
          <Box
            padding={3}
            flexDirection={"row"}
            alignSelf={"center"}
            borderRadius={10}
            backgroundColor={"#FEFFC1"}
            height={112}
            width={346}
          >
            <Image
              justifyContent={"center"}
              marginRight={3}
              alignSelf={"center"}
              width={90}
              height={"100%"}
              alt="laci"
              source={{ uri: itemImage }}
            />
            <View justifyContent={"center"} flexDirection={"column"}>
              <Text bold>{itemName}</Text>
              <Text my={2}>Quantity : {quantity}</Text>
              <Text>{itemPrice}</Text>
            </View>
          </Box>
        </ScrollView>
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
            <Text fontSize={18}>IDR {Harga}</Text>
          </View>
          <TouchableOpacity>
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
      </View>
    </NativeBaseProvider>
  );
};

export default Checkout;
