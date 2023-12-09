import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Box } from 'your-box-library'; // Replace with your actual Box library import
import { doc, setDoc, deleteDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from 'path-to-your-firebase-config'; // Replace with your actual Firebase configuration import

const SaveButton = ({ itemId, isSavedInitially }) => {
  const [isSaved, setIsSaved] = useState(isSavedInitially);

   // AKSES Table 
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

  const toggleSave = async () => {
    const itemDocRef = doc(db, 'yourCollection', itemId); // Replace 'yourCollection' with your Firestore collection name

    if (isSaved) {
      // Item is already saved, so remove it
      await deleteDoc(itemDocRef);
    } else {
      // Item is not saved, so save it
      await setDoc(itemDocRef, { saved: true });
    }

    // Update the local state to reflect the change
    setIsSaved(!isSaved);
  };

  return (
    <Box marginLeft="auto">
      <TouchableOpacity onPress={toggleSave}>
        <Ionicons
          style={{ marginLeft: 'auto' }}
          name={isSaved ? 'bookmark' : 'bookmark-outline'}
          size={45}
        />
      </TouchableOpacity>
    </Box>
  );
};

export default SaveButton;