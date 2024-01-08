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
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAuth } from "@firebase/auth";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { FIRESTORE } from "../../../firebase/credential";
import { snapTransactions } from "./payment";

const Checkout = () => {
  const route = useRoute();

  // const Harga = route.params;
  const { itemName, itemPrice, itemImage, quantity, totalPrice } = route.params;
  const date = new Date().getTime();
  const navigation = useNavigation();
  const user = getAuth().currentUser;
  const [addresses, setAddresses] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userAddressesRef = doc(FIRESTORE, "addresses", user.uid);
        const userAddressesSnapshot = await getDoc(userAddressesRef);

        if (userAddressesSnapshot.exists()) {
          const userData = userAddressesSnapshot.data();
          const addressesData = Object.keys(userData).map((key) => ({
            id: key,
            ...userData[key],
          }));
          setAddresses(
            addressesData.find((address) => address.selected === true)
          );
        } else {
          console.log("User addresses not found");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    const userRef = doc(FIRESTORE, "users", user.uid);

    const fetchData = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        console.log("Document Data (onSnapshot):", data);
        setDisplayName(data);
      } else {
        console.log("Document does not exist!");
      }
    });
    return () => fetchData();
  }, [user.email]);

  const Checkout = async () => {
    const data = {
      transaction_details: {
        order_id: "ORDER-" + date + "-" + user.uid,
        gross_amount: parseInt(totalPrice),
      },
      credit_card: {
        secure: true,
      },
      item_details: {
        name: itemName,
        price: itemPrice,
        quantity: quantity,
      },
      customer_details: {
        name: user.displayName,
        email: user.email,
      },
      shipping_address: {
        tittle: addresses.title,
        address: addresses.fullAddress,
      },
    };

    if (data) {
      try {
        const post = await snapTransactions(data);
        
        const url = post.redirect_url;
        console.log(url);
        navigation.navigate("Payment Gateway", { url, data });
      } catch (error) {
        console.error("Error in Checkout:", error);
      }
    }

    console.log("Data :", data);
  };

  console.log(displayName);

  return (
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
              {displayName.username}
            </Text>
            <Text color={"#89580A"} fontSize={12}>
              {displayName.email}
            </Text>
            <Text color={"#89580A"} fontSize={12}>
              {displayName.phoneNumber}
            </Text>
            <Text fontWeight={"bold"} fontSize={14}>
              {addresses
                ? addresses.fullAddress
                : "pilih alamat terlebih dahulu"}
            </Text>
          </Box>
        </TouchableOpacity>

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
          <Text fontSize={18}>IDR {totalPrice}</Text>
        </View>

        <TouchableOpacity onPress={Checkout}>
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
  );
};

export default Checkout;
