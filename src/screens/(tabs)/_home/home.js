import { useEffect, useState } from "react";
import {
  HStack,
  ScrollView,
  Image,
  Flex,
  Box,
  Text,
  Heading,
} from "native-base";
import { TouchableOpacity } from "react-native";
import Categories from "../../../components/categories";
import ProductItem from "../../../components/item/product-Item";
import { useNavigation } from "@react-navigation/native";

// DATABASE
import { FIRESTORE } from "../../../firebase/credential";
import { getDocs, collection, doc, onSnapshot } from "firebase/firestore";
import { getAuth } from "@firebase/auth";


const Home = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [listProducts, setListProducts] = useState([]);
  const [displayName, setDisplayName] = useState([]);
  const [products, setProducts] = useState([]);
  const session = getAuth();
  const user = session.currentUser;

  // AKSES Table 
  const productsCollectionRef = collection(FIRESTORE, "products");

  // NGAMBIL DATA USER
  useEffect(() => {
    const userRef = doc(FIRESTORE, "users", user.uid);

    const fetchData = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setDisplayName(data.username);
      } else {
        console.log("Document does not exist!");
      }
    });
    return () => fetchData();
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

  const categoriesHandler = (categoryName) => {
    setActiveCategory(categoryName);
  };

  if (listProducts) {
    useEffect(() => {
      const filteredItems = listProducts.filter(
        (product) => product.category === activeCategory
      );

      setProducts(filteredItems);
    }, [activeCategory, listProducts]);
  }


  return (
    <ScrollView mx={14} mt={20} showsVerticalScrollIndicator={false}>
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize={24}>Hi {displayName},</Text>
          <Text fontSize={18}>Welcome back</Text>
        </Box>
        <TouchableOpacity onPress={() => navigation.navigate("Edit Profile")}>
          <Image
            size={"64px"}
            borderRadius={100}
            source={require("../../../images/brody.png")}
            alt="hitam"
          />
        </TouchableOpacity>
      </Flex>
      <TouchableOpacity onPress={() => navigation.navigate("Discount")}>
        <Image
          height={150}
          width="100%"
          mt={30}
          source={require("../../../images/promo_poster.png")}
          alt="diskon"
        />
      </TouchableOpacity>
      <Heading mt={5}>Categories</Heading>
      
      <Categories onChange={categoriesHandler} />

      <HStack flexWrap={"wrap"} justifyContent={"space-between"}>
        {activeCategory === "all"
          ? listProducts.map((listProducts) => (
              <ProductItem item={listProducts} key={listProducts.id} />
            ))
          : products.map((product) => (
              <ProductItem item={product} key={product.id} />
            ))}
      </HStack>
    </ScrollView>
    
  );
};

export default Home;
