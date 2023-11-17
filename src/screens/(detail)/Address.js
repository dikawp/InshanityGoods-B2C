import {
  NativeBaseProvider,
  ScrollView,
  Flex,
  Box,
  Image,
  View,
  Pressable,
  Text,
  Container,
  Divider,
  Radio,
} from "native-base";
import { TouchableOpacity } from "react-native";
import React, { Component, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Address = () => {
  const [value, setValue] = React.useState("one");
  const navigation = useNavigation()
  return (
    <View>
      <View padding={21} height={"100%"} width={"100%"}>
        <ScrollView>
          <Text color={"#89580A"} fontSize={14}>
            Choose And Address
          </Text>
          <View alignItems={"center"}>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={value}
              onChange={(nextValue) => {
                setValue(nextValue);
              }}
            >
              <Radio shadow={2} value="one" my="2">
                <Box
                  value="one"
                  style={
                    setValue === "one"
                      ? styles.selectedRadioButton
                      : styles.unselectedRadioButton
                  }
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
                    <Text color={"#89580A"} fontSize={11}>
                      My Office
                    </Text>
                    <Text fontWeight={"bold"} color={"#89580A"} fontSize={14}>
                      Brody Pendragon
                    </Text>
                    <Text color={"#89580A"} fontSize={14}>
                      Leibnizstraße 16, Wohnheim 6, No: 8X Clausthal-Zellerfeld,
                      Germany
                    </Text>
                  </View>
                  <Image
                    justifyContent={"center"}
                    zIndex={4}
                    size={6}
                    source={require("../../images/edit.png")}
                    alt="yolo"
                  />
                </Box>
              </Radio>
              <Radio shadow={2} value="two" my="2">
                <Box
                  value="one"
                  style={
                    setValue === "two"
                      ? styles.selectedRadioButton
                      : styles.unselectedRadioButton
                  }
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
                    <Text color={"#89580A"} fontSize={11}>
                      My Office
                    </Text>
                    <Text fontWeight={"bold"} color={"#89580A"} fontSize={14}>
                      Brody Pendragon
                    </Text>
                    <Text color={"#89580A"} fontSize={14}>
                      Leibnizstraße 16, Wohnheim 6, No: 8X Clausthal-Zellerfeld,
                      Germany
                    </Text>
                  </View>
                  <Image
                    justifyContent={"center"}
                    zIndex={4}
                    size={6}
                    source={require("../../images/edit.png")}
                    alt="yolo"
                  />
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
          <TouchableOpacity onPress={() => navigation.navigate("FormAddress")}>
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
    </View>
  );
};

const styles = {
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  selectedRadioButton: {
    backgroundColor: "#FFFD86", // Ganti warna latar belakang saat dipilih
  },
  unselectedRadioButton: {
    backgroundColor: "#FEFFC1", // Ganti warna latar belakang saat tidak dipilih
  },
};

export default Address;
