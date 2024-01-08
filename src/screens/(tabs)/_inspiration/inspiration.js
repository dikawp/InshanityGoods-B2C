import { useEffect, useState } from "react";
import { ScrollView, Heading, VStack, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import Categories from "../../../components/categories-inspiration";

import ProductItem from "../../../components/item/inspiration-item";

// DATABASE
import { FIRESTORE } from "../../../firebase/credential";
import { getDocs, collection } from "firebase/firestore";

const InspirationScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const [listInspiration, setListInspirations] = useState([]);
  const [inspiration, setInspirations] = useState([]);

  const inspirationsCollectionRef = collection(FIRESTORE, "inspirations");

  useEffect(() => {
    const getListProducts = async () => {
      try {
        const data = await getDocs(inspirationsCollectionRef);
        const productList = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListInspirations(productList);
      } catch (err) {
        console.error(err);
      }
    };
    getListProducts();
  }, []);

  const categoriesHandler = (categoryName) => {
    setActiveCategory(categoryName);
  };

  if (listInspiration) {
    useEffect(() => {
      const filteredItems = listInspiration.filter(
        (inspiration) => inspiration.category === activeCategory
      );
      
      if (filteredItems) {
        console.log(`true`)
      }
      setInspirations(filteredItems);
    }, [activeCategory, listInspiration]);
  }

  return (
    <ScrollView mx={14} mt={12} scrollIndicatorInsets={false}>
      <Heading mt={1} textAlign={"center"} fontSize={30} color={"#89580A"}>
        Inspiration
      </Heading>
      <Categories onChange={categoriesHandler} />
      <VStack>
      {activeCategory === "all"
          ? listInspiration.map((listInspiration) => (
              <ProductItem item={listInspiration} key={listInspiration.id} />

            ))
          : inspiration.map((inspiration) => (
              <ProductItem item={inspiration} key={inspiration.id} />
            ))
        }
      </VStack>
    </ScrollView>
  );
};
export default InspirationScreen;
