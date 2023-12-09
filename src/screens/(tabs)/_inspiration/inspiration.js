import { useEffect, useState } from "react";
import { ScrollView, Heading, VStack, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import Categories from "../../../components/categories-inspiration";
// import inspiration_data from "../../../dummy/data";
import ProductItem from "../../../components/item/inspiration-item";

// DATABASE
import { FIRESTORE } from "../../../firebase/credential";
import { getDocs, collection } from "firebase/firestore";
import { getAuth } from "@firebase/auth";

const InspirationScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [listProducts, setListProducts] = useState([]);
  const [listInspiration, setListInspirations] = useState([]);
  const [filteredInspirations, setFilteredInspirations] = useState([]);

  const productsCollectionRef = collection(FIRESTORE, "inspirations");

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

  const categoriesHandler = (categoryName) => {
    setActiveCategory(categoryName);
    // filterProducts(categoryName);
  };

  // useEffect(() => {
  //   filterProducts(activeCategory);
  // }, [activeCategory, listProducts]);

  // const filterProducts = (category) => {

  //   console.log(activeCategory)
  //   if (category === "All") {
  //     setFilteredProducts(listProducts);
  //   } else {
  //     console.log(`ini ELSE telah bekerja`)
  //     const filtered = listProducts.filter(
  //       (item) => item.category === activeCategory
  //     );
  //     // console.log(filtered)
  //     setFilteredProducts(filtered);
  //   }
  // };

  if (listProducts) {
    useEffect(() => {
      const filteredItems = listProducts.filter(
        (product) => product.category === activeCategory
      );
      
      if (filteredItems) {
        console.log(`true`)
      }
      setListInspirations(filteredItems);
    }, [activeCategory, setFilteredInspirations]);
    // console.log('test')
  }
  
  console.log(activeCategory)
  console.log(listInspiration)
  // useEffect(() => {
  //   console.log("Updated List Inspirations:", listInspiration);
  // }, [listInspiration]);
  
  // useEffect(() => {
  //   console.log("listProducts:", JSON.stringify(filteredProducts));
  //   filterProducts(activeCategory);
  // }, [activeCategory, listProducts]);
  // console.log(` INI ADLAH TEST filtered : ${listInspiration}`)

  // Switch case
  // const planTerakhir = () => {
  //   switch(listProducts) {

  //     case activeCategory === 'All':  
  //      return listProducts.map((item) => {
  //       <ProductItem item={item} key={item.id} />;
  //      });
  //     case "two":   return <ComponentB />;
  //     case "three": return <ComponentC />;
  //     case "four":  return <ComponentD />;

  
  //   }
  // }
  return (
    <ScrollView mx={14} mt={12} scrollIndicatorInsets={false}>
      <Heading mt={1} textAlign={"center"} fontSize={30} color={"#89580A"}>
        Inspiration
      </Heading>
      <Categories onChange={categoriesHandler} />
      <VStack>
      {activeCategory === "all"
          ? listProducts.map((listProducts) => (
              <ProductItem item={listProducts} key={listProducts.id} />
            ))
          : listInspiration.map((product) => (
              <ProductItem item={product} key={product.id} />
            ))
        }
        {/* {listProducts.map((product) => {

        if (activeCategory === "All") {
          return <ProductItem item={product} key={product.id} />;
        } else {
          console.log(activeCategory)
          console.log(JSON.stringify(listInspiration))
        }
        return null;
      })} */}
      </VStack>
    </ScrollView>
  );
};
export default InspirationScreen;
