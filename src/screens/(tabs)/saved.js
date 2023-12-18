import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
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
import ProductItem from "../../components/item/product-Item";

const SavedScreen = () => {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const session = getAuth();
  const user = session.currentUser;
  const savedCollectionRef = collection(FIRESTORE, "saved");
  const productsCollectionRef = collection(FIRESTORE, "products");


 // NGAMBIL DATA
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



useEffect(() => {
  const docRef = doc(savedCollectionRef, user.email); 

  const fetchData = async () => {
    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Document Data:', data);
        setFetchedItems(data)
      } else {
        console.log('Document does not exist!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  };

  fetchData();
}, [user.email]); 


useEffect(() => {
  const fetchData = async () => {
    try {
      const results = [];
      if(fetchedItems && fetchedItems.items) {

      
        for (const value of fetchedItems.items) {
          const q = doc(productsCollectionRef, value);
          const docSnap = await getDoc(q);
          
          if (docSnap.exists()) {
            // Access the document data and ID
            const productData = docSnap.data();
            // Save the data to results
            results.push(productData);
          } else {
            console.log(`Document with value '${value}' does not exist.`);
          }
        }
      }
      setDisplayedItems(results);
      console.log(`Berikut adalah results ${JSON.stringify(results)}`)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [fetchedItems]);

useEffect(() => {
  console.log(displayedItems)
}, [])


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
  // console.log(displayedItems)

  return (
    <ScrollView mx={14} mt={12} pb={5} scrollIndicatorInsets={false}>
      <Heading mt={1} textAlign={"center"} fontSize={30} color={"#89580A"}>
        Saved Items
      </Heading>
      <Center marginTop={4}>
      {displayedItems.map((item) => {
        console.log(` Berikut adlaah item.id ${listProducts.id}`)  

        return (
          <ProductItem item={item}  />
        )
        
        })}
      </Center>
    </ScrollView>
  );
};

export default SavedScreen;
