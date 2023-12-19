import React, { useState, useEffect } from "react";
import { Center, Heading, ScrollView } from "native-base";

import { FIRESTORE } from "../../firebase/credential";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import SavedItem from "../../components/item/saved-item";

const SavedScreen = () => {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const session = getAuth();
  const user = session.currentUser;
  const savedCollectionRef = collection(FIRESTORE, "saved");
  const productsCollectionRef = collection(FIRESTORE, "products");

  useEffect(() => {
    const docRef = doc(savedCollectionRef, user.email);

    // Tambahkan listener onSnapshot
    const fetchData = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        console.log("Document Data (onSnapshot):", data);
        setFetchedItems(data);
      } else {
        console.log("Document does not exist!");
      }
    });
    return () => fetchData();
  }, [user.email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = [];
        if (fetchedItems && fetchedItems.items) {
          for (const value of fetchedItems.items) {
            const q = doc(productsCollectionRef, value);
            const docSnap = await getDoc(q);

            if (docSnap.exists()) {
              // Access the document data and ID
              const productData = docSnap.data();
              const productId = docSnap.id;
              // Save the data to results
              results.push({ id: productId, ...productData });
            } else {
              console.log(`Document with value '${value}' does not exist.`);
            }
          }
        }
        setDisplayedItems(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fetchedItems]);

  console.log(displayedItems);
  // console.log(fetchedItems);

  return (
    <ScrollView mx={14} mt={12} pb={5}>
      <Heading mt={1} textAlign={"center"} fontSize={30} color={"#89580A"}>
        Saved Items
      </Heading>
      <Center marginTop={4}>
        {displayedItems.map((item) => {
          return <SavedItem item={item} key={item.id} />;
        })}
      </Center>
    </ScrollView>
  );
};

export default SavedScreen;
