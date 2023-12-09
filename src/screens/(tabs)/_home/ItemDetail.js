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
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE } from "../../../firebase/credential";


const ItemDetail = ({ route }) => {
  const { itemName } = route.params;
  const productRef = collection(FIRESTORE, "products");
  const [detailProduct, setDetailProduct] = useState(['']);



  const q = query(productRef, where("name", "==", itemName));

  useEffect(() => {
    const getListProducts = async () => {
      try {
        const data = await getDocs(q);
        const productList = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        setDetailProduct(productList);
      } catch (err) {
        console.error(err);
      }
    };
    getListProducts();
  }, []);

  // console.log(detailProduct);

  const itemDetail = detailProduct[0];
  const navigation = useNavigation();
  const [Total, setTotal] = useState([]);
  const [count, setCount] = useState(1);
  const [isSaved, setIsSaved] = useState(true);

  // AKSES Table 
  const savedCollectionRef = collection(FIRESTORE, "saved");
  const session = getAuth();
  const auth = getAuth();
  const user = session.currentUser;
  const userSaved = user.email
  const onBookmarks = async () => {
    try {
      const test = await addDoc(savedCollectionRef, {
        items: itemId,
        email: userSaved
      });

      if(test) {
        console.log('SUDAH BERHASIL ')
          // passing data to saved.js
      }
    } catch (err) {
      console.log(err)
    }

  }
  // Use onAuthStateChanged to listen for changes in the user's authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const userSaved = user.email;

    if (userSaved) {
      console.log('User Display Name:', userSaved);
    } else {
      console.log('User Display Name is not set.');
    }
  } else {
    // User is signed out
    console.log('User is signed out.');
  }
});

  console.log(itemDetail);

  useEffect(() => {
    calculateTotal();
  }, [count]);

  const calculateTotal = () => {
    const newTotal = count * itemDetail.price;
    setTotal([newTotal]);
  };

  let plus = () => {
    setCount(count + 1);
  };
  let minus = () => {
    setCount(count - 1);
  };


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
            source={{ uri: itemDetail.image }}
          />

          <Box marginLeft={"auto"}>
            <TouchableOpacity onPress={onBookmarks}>
              <Ionicons
                style={{ marginLeft: "auto" }}
                name={"bookmark-outline"}
                size={45}
              />
            </TouchableOpacity>
          </Box>

          <Text color={"#89580A"} fontWeight={"bold"} fontSize={20}>
            {itemDetail.name}
          </Text>

          <View
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Text flex={2} fontSize={16}>
              IDR {itemDetail.price}
            </Text>

            <TouchableOpacity disabled={count === 1} onPress={minus}>
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

          <Text>{itemDetail.desc}</Text>
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
              itemName : itemDetail.name,
              itemImage : itemDetail.image,
              quantity : count,
              itemPrice : itemDetail.price,
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
