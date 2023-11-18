import {
  ScrollView,
  Box,
  Image,
  View,
  Text,
  Radio,
} from "native-base";
import { TouchableOpacity } from "react-native";
import React, { Component, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const Address = () => {
  const navigation = useNavigation()
  return (
      <View padding={21} height={"100%"} width={"100%"}>
        <ScrollView>
          <Text color={"#89580A"} fontSize={14}>
            Choose And Address
          </Text>
          <View alignItems={"center"}>
            <Radio.Group>
              <Radio shadow={2} value="1">
                <Box
                  value="one"
                  padding={3}
                  justifyContent={"center"}
                  my={3}
                  borderRadius={10}
                  alignSelf={"center"}
                  height={105}
                  width={300}
                  backgroundColor={"#FEFFC1"}
                  flexDirection={"row"}
                >
                  <View marginRight={3}>
                    <Text color={"#89580A"} fontSize={11} mt={3}>
                      My Office
                    </Text>
                    <Text color={"#89580A"} fontSize={14}>
                      Leibnizstraße 16, Wohnheim 6, No: 8X Clausthal-Zellerfeld,
                      Germany
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="create-outline" size={28}></Ionicons>
                  </TouchableOpacity>
                </Box>
              </Radio>
              <Radio shadow={2} value="2">
                <Box
                  padding={3}
                  justifyContent={"center"}
                  my={3}
                  borderRadius={10}
                  alignSelf={"center"}
                  height={105}
                  width={300}
                  backgroundColor={"#FEFFC1"}
                  flexDirection={"row"}
                >
                  <View marginRight={3}>
                    <Text color={"#89580A"} fontSize={11} mt={3}>
                      My Office
                    </Text>
                    <Text color={"#89580A"} fontSize={14}>
                      Leibnizstraße 16, Wohnheim 6, No: 8X Clausthal-Zellerfeld,
                      Germany
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="create-outline" size={28}></Ionicons>
                  </TouchableOpacity>
                </Box>
              </Radio>
            </Radio.Group>
          </View>
        </ScrollView>
        <View
          justifyContent={"space-between"}
          marginY={2}
          width={"100%"}
          position={"absolute"}
          paddingY={2}
          height={130}
          flexDirection={"column"}
          bottom={0}
          alignSelf={"center"}
          alignItems={"center"}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Form Address")}>
            <Box
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={"#FEFFC1"}
              width={344}
              height={50}
              borderRadius={4}
              borderColor={"#FFE60D"}
              borderWidth={3}
            >
              Add New Address
            </Box>
          </TouchableOpacity>
          <TouchableOpacity>
            <Box
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={"#FFE60D"}
              width={344}
              height={50}
              borderRadius={4}
            >
              Save
            </Box>
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default Address;
