import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, Center, Heading, ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import { FIRESTORE } from "../../firebase/credential";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { getAuth } from "@firebase/auth";

const SavedScreen = () => {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const session = getAuth();
  const user = session.currentUser;

  const savedCollectionRef = collection(FIRESTORE, "saved");
  const productsCollectionRef = collection(FIRESTORE, "products");


  useEffect(() => {
    const unsubscribe = onSnapshot(savedCollectionRef, (snapshot) => {
      const savedList = snapshot.docs.map((doc) => ({
        email: doc.id,
        ...doc.data(),
      }));
      setFetchedItems(savedList);
    }, (error) => {
      console.error("Error fetching data:", error);
    });
  
    return () => unsubscribe(); 
  }, []);

  // NGAMBIL DATA PRODUCT
  useEffect(() => {
    const getListProducts = async () => {
      try {
        const data = await getDocs(productsCollectionRef);
        const productList = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListProducts(productList);
      } catch (err) {
        console.error(err);
      }
    };
    getListProducts();
  }, []);

  // NGATUR DISPLAYED ITEMS
  useEffect(() => {
    const getAllItems = async () => {
      try {
        const savedId = await fetchedItems[0].items
        const filteredProducts = listProducts.filter((product) =>
          savedId.includes(product.id)
        );
  
        setDisplayedItems(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  
    getAllItems();
  }, [fetchedItems]);
  

const toggleBookmark = async (itemId) => {
  try {
    const savedDocRef = doc(savedCollectionRef, user.email);
    const savedDocSnap = await getDoc(savedDocRef);

    if (savedDocSnap.exists()) {
      const savedData = savedDocSnap.data();
      const updatedItems = savedData.items.filter((id) => id !== itemId);

      // Perbarui dokumen saved dengan array items yang baru
      await updateDoc(savedDocRef, { items: updatedItems });


      console.log("Item removed from saved");
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error);
  }
};


  console.log(fetchedItems);
  // console.log(listProducts);

    fetchData();
  }, [fetchedItems])

  useEffect(() => {
    // Lakukan sesuatu ketika displayedItems berubah
    console.log("Displayed items changed:", displayedItems);
  
    // Contoh: Akses displayedItems dan lakukan sesuatu
    displayedItems.forEach(item => {
      console.log(item);
    });
  }, [displayedItems]);

  // console.log(`Ini adlaah savedItems ${displayedItems}`)

  return (
    <ScrollView mx={14} mt={12} pb={5} scrollIndicatorInsets={false}>
      <Heading mt={1} textAlign={"center"} fontSize={30} color={"#89580A"}>
        Saved Items
      </Heading>
      <Center marginTop={4}>
        {displayedItems.map((item) => (
          console.log(item.id),
          <Box
            key={item.name}
            flexDirection="row"
            alignItems="center"
            mt={5}
            backgroundColor="white"
            borderRadius={8}
            padding={8}
            width={350}
            height={160}
            shadow={5}
            onPress={() => toggleBookmark(item.id)}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 80, height: 80, marginRight: 15 }}
            />
            <View>
              <Text
                fontSize={16}
                marginBottom={2}
                fontWeight="bold"
                color="black"
              >
                {item.name}
              </Text>
              <Text
                style={{ fontSize: 12, color: "#89580A", marginBottom: 10 }}
              >
                {item.category}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {item.price}
              </Text>
            </View>
            <Ionicons
              style={{ marginLeft: "auto" }}
              name={item.bookmarked ? "bookmark-outline" : "bookmark"}
              size={28}
              color={item.bookmarked ? "black" : "black"}
              onPress={() => toggleBookmark(item.id)}
            />
          </Box>
        ))}
      </Center>
    </ScrollView>
  );
};

export default SavedScreen;
