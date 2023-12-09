import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Box, Center, Heading} from 'native-base';

import { FIRESTORE } from "../../firebase/credential";
import { getDocs, collection, query, where, doc, getDoc } from "firebase/firestore";
import { getAuth } from "@firebase/auth";


const SavedScreen = () => {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
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

  // Membuat Query
  // const q = query(savedCollectionRef, where('email', '=', user.email))
  // const matchingItem = savedCollectionRef.find((item) => item.user === user.displayName);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create a query to find documents with the matching email
        const q = query(savedCollectionRef, where('email', '==', user.email));

        // Perform the query to Firestore
        const querySnapshot = await getDocs(q);

         // Extract the items from the query results and store them in state
         const itemsData = querySnapshot.docs.map((doc) => doc.data().items);
         setFetchedItems(itemsData);
        // console.log(item)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = [];
        for (const value of fetchedItems) {
          const q = doc(FIRESTORE, "products", value);
          const docSnap = await getDoc(q)
          // console.log(docSnap.data())

          if (docSnap.exists()) {
            // Access the document data and ID
            const productData = docSnap.data();

            // Save the data to results
            results.push(productData);
          } else {
            console.log(`Document with value '${value}' does not exist.`);
          }
        }
        setDisplayedItems(results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

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
      <Center marginTop={12}>
      <Heading mt={1} textAlign={"center"} fontSize={30} color={"#89580A"}>
        Saved Items
      </Heading>
      {/* {
        displayedItems.map((product) => {
         console.log(product)
        })
      } */}
        {/* {displayedItems.map((item) => (
          <Box
            key={item.id}
            flexDirection="row"
            alignItems="center"
            marginTop={5}
            backgroundColor="white"
            borderRadius={8}
            padding={8}
            width={350}
            height={160}
            shadow={5}
            onPress={() => toggleBookmark(item.id)}
          >
            <Image source={item.image} style={{ width: 80, height: 80, marginRight: 15 }} />
            <View>
              <Text fontSize={16} marginBottom={2} fontWeight="bold" color="black">
                {item.title}
              </Text>
              <Text style={{fontSize:12, color:"#89580A", marginBottom:10}}>
                {item.descriptions[0]}
              </Text>
              <Text style={{fontSize: 12, fontWeight:"bold"}}>
                {item.descriptions[1]}
              </Text>
            </View>
            <Ionicons
              style={{ marginLeft: 'auto' }}
              name={item.bookmarked ? 'bookmark-outline' : 'bookmark'}
              size={28}
              color={item.bookmarked ? 'black' : 'black'}
              onPress={() => toggleBookmark(item.id)}
            />
          </Box>
        ))} */}
        {displayedItems.map((item) => (
          <Box
            key={item.name}  // Assuming 'name' is a unique identifier for each item
            flexDirection="row"
            alignItems="center"
            marginTop={5}
            backgroundColor="white"
            borderRadius={8}
            padding={8}
            width={350}
            height={160}
            shadow={5}
            onPress={() => toggleBookmark(item.id)}
          >
            <Image source={{ uri: item.image }} style={{ width: 80, height: 80, marginRight: 15 }} />
            <View>
              <Text fontSize={16} marginBottom={2} fontWeight="bold" color="black">
                {item.name}
              </Text>
              <Text style={{ fontSize: 12, color: "#89580A", marginBottom: 10 }}>
                {item.desc}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {item.price}
              </Text>
            </View>
            <Ionicons
              style={{ marginLeft: 'auto' }}
              name={item.bookmarked ? 'bookmark-outline' : 'bookmark'}
              size={28}
              color={item.bookmarked ? 'black' : 'black'}
              onPress={() => toggleBookmark(item.id)}
            />
          </Box>
        ))}
      </Center>
  );
}

export default SavedScreen;