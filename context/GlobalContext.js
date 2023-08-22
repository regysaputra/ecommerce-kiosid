import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  // state data
  const [user, setUser] = useState(undefined);
  const [admin, setAdmin] = useState(undefined);
  const [getCheckoutUser, setCheckoutUser] = useState(0);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [transaksi, setTransaksi] = useState(null);
  const [id, setId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [paramProduct, setParamProduct] = useState({
    idCategory: 1,
    productName: "",
    description: "",
    imageUrl: "",
    stock: 0,
    rating: 0,
    price: 0,
    available: -1,
  });
  const [theme, setTheme] = useState("light");

  //indikator
  const [fetchStatus, setFetchStatus] = useState(false);
  const [fetchCheckoutStatus, setFetchCheckoutStatus] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [randomIndex, setRandomIndex] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isFormModal, setIsFormModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [action, setAction] = useState("");
  const [isClick, setIsClick] = useState(false);

  let fetchCheckoutUser = async () => {
    try {
      let result = await axios.get(
        `https://service-example.sanbercloud.com/api/checkout-product-user/${user.id}`,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("token_user"),
          },
        }
      );

      let data = result.data.filter((res) => {
        return res.is_transaction === 0;
      });

      setCheckoutUser(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  let checkProduct = async () => {
    try {
      let result = await axios.get(
        "https://service-example.sanbercloud.com/api/product"
      );

      setProduct(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  let checkCategory = async () => {
    try {
      let result = await axios.get(
        "https://service-example.sanbercloud.com/api/category"
      );

      setCategory(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  let checkCheckout = async () => {
    try {
      let result = await axios.get(
        "https://service-example.sanbercloud.com/api/checkout",
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("token_admin"),
          },
        }
      );

      setCheckout(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  let checkTransaksi = async () => {
    try {
      let result = await axios.get(
        "https://service-example.sanbercloud.com/api/transaction",
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("token_admin"),
          },
        }
      );

      setTransaksi(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  let state = {
    user,
    setUser,
    fetchStatus,
    setFetchStatus,
    fetchCheckoutStatus,
    setFetchCheckoutStatus,
    getCheckoutUser,
    setCheckoutUser,
    isSearch,
    setIsSearch,
    displaySearch,
    setDisplaySearch,
    randomIndex,
    setRandomIndex,
    admin,
    setAdmin,
    product,
    setProduct,
    category,
    setCategory,
    checkout,
    setCheckout,
    transaksi,
    setTransaksi,
    isDeleteModal,
    setIsDeleteModal,
    isFormModal,
    setIsFormModal,
    isDelete,
    setIsDelete,
    id,
    setId,
    categoryName,
    setCategoryName,
    action,
    setAction,
    paramProduct,
    setParamProduct,
    theme,
    setTheme,
    isClick,
    setIsClick,
  };

  let handleFunction = {
    fetchCheckoutUser,
    checkProduct,
    checkCategory,
    checkCheckout,
    checkTransaksi,
  };

  return (
    <GlobalContext.Provider value={{ state, handleFunction }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
