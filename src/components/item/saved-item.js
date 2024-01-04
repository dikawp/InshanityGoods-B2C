import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box, View, Text, Image } from "native-base";
import { doc, getDoc, updateDoc, collection } from "firebase/firestore";
import { FIRESTORE } from "../../firebase/credential";
import { getAuth } from "firebase/auth";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native"; 

const savedCollectionRef = collection(FIRESTORE, "saved");
const session = getAuth();

const toggleBookmark = async (itemId) => {
  try {
    const savedDocRef = doc(savedCollectionRef, session.currentUser.email);
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

const SavedItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Item Detail", {
          itemId: item.id,
          itemName: item.name,
        })
      }
    >
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
          alt="wibu"
        />
        <View>
          <Text fontSize={16} marginBottom={2} fontWeight="bold" color="black">
            {item.name}
          </Text>
          <Text style={{ fontSize: 12, color: "#89580A", marginBottom: 10 }}>
            {item.category}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>{item.price}</Text>
        </View>
        <Ionicons
          style={{ marginLeft: "auto" }}
          name={item.bookmarked ? "bookmark-outline" : "bookmark"}
          size={28}
          color={item.bookmarked ? "black" : "black"}
          onPress={() => toggleBookmark(item.id)}
        />
      </Box>
    </Pressable>
  );
};

export default SavedItem;
