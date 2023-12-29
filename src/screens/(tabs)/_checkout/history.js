import React, { useState, useEffect } from "react";
import { Center, ScrollView, Text } from "native-base";
import { Box, View } from "native-base";
import { doc, onSnapshot } from "firebase/firestore";
import { FIRESTORE } from "../../../firebase/credential";
import { getAuth } from "firebase/auth";

const History = () => {
  const user = getAuth().currentUser;
  const [history, setHistory] = useState([]);

  // Ambil data transaksi Rill-time
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(FIRESTORE, "history", user.email), (doc) => {
      const data = doc.data().paid;
      console.log("Current data: ", data);
      setHistory(data);
    });
    
    return () => unsubscribe();
  }, [user.email]);

  return (
    <ScrollView mx={14} mt={2} pb={5}>
      {history.map((item, index) => (
        <Box key={index} borderBottomWidth={1} p={2}>
          <Text fontSize="lg">{item.name}</Text>
          <Text>Order ID: {item.order_id}</Text>
          <Text>Price: {item.price}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Status: {item.status}</Text>
        </Box>
      ))}
    </ScrollView>
  );
};

export default History;
