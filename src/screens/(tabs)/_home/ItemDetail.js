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
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { FIRESTORE } from "../../../firebase/credential";
import { numberWithCommas } from "../../../components/commas";

const ItemDetail = ({ route }) => {
  const { itemName } = route.params;
  const productRef = collection(FIRESTORE, "products");
  const [detailProduct, setDetailProduct] = useState([""]);

  const q = query(productRef, where("name", "==", itemName));

  useEffect(() => {
    const getListProducts = async () => {
      try {
        const data = await getDocs(q);
        const productList = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDetailProduct(productList);
      } catch (err) {
        console.error(err);
      }
    };
    getListProducts();
  }, []);

  const itemDetail = detailProduct[0];
  const navigation = useNavigation();
  const [Total, setTotal] = useState();
  const [count, setCount] = useState(1);
  const [isSaved, setIsSaved] = useState();

  // AKSES Collection
  const savedCollectionRef = collection(FIRESTORE, "saved");
  const session = getAuth();
  const user = session.currentUser;

  const onBookmarks = async () => {
    try {
      const savedItemRef = doc(savedCollectionRef, user.email);
      const savedItemSnap = await getDoc(savedItemRef);

      if (savedItemSnap.exists()) {
        const savedData = savedItemSnap.data();
        const isItemSaved = savedData.items.includes(itemDetail.id);

        if (isItemSaved) {
          // Lek Item ws ono == hapus
          const updatedItems = savedData.items.filter(
            (id) => id !== itemDetail.id
          );
          await updateDoc(savedItemRef, { items: updatedItems });
          setIsSaved(false);

          console.log("Item removed from savedItem");
        } else {
          // Lek Item drg ono == tambah
          await updateDoc(savedItemRef, {
            items: [...savedData.items, itemDetail.id],
          });
          setIsSaved(true);

          console.log("Item added to savedItem");
        }
      } else {
        // Jika dokumen dengan dokume id == email durung onok, tambah dokumen
        await setDoc(savedItemRef, { items: [itemDetail.id] });

        console.log("Dokumen Donn");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [count]);

  const calculateTotal = () => {
    // Pastikan itemDetail sudah ada dan memiliki properti price
    if (itemDetail) {
      const newTotal = count * itemDetail.price;
      setTotal(newTotal);
    }
  };

  let plus = () => {
    setCount(count + 1);
  };
  let minus = () => {
    setCount(count - 1);
  };

  console.log(itemDetail);
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
            width={348}
            height={350}
            alt="image"
            source={{ uri: itemDetail.image }}
          />

          <Box marginLeft={"auto"}>
            <TouchableOpacity onPress={onBookmarks}>
              <Ionicons
                style={{ marginLeft: "auto" }}
                name={isSaved ? "bookmark" : "bookmark-outline"}
                size={45}
                color={isSaved ? "black" : "black"}
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
            <View>
              <Text flex={2} fontSize={16}>
                IDR {itemDetail.price}
              </Text>
              <Text flex={2} fontSize={16}>
                Stock {itemDetail.stock}
              </Text>
            </View>

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
          <Text fontSize={18}>IDR {Total ? Total : itemDetail.price}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Checkout", {
              totalPrice: Total ? Total : itemDetail.price,
              itemName: itemDetail.name,
              itemImage: itemDetail.image,
              quantity: count,
              itemPrice: itemDetail.price,
            })
          }
          disabled={itemDetail.stock <= 0} 
        >
          <Box
            top={2.5}
            borderRadius={10}
            justifyContent={"center"}
            width={120}
            height={45}
            backgroundColor={itemDetail.stock === 0 ? 'grey' : "#D19E00"}
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
