import React from "react";
import { GlobalContext } from "@/context/GlobalContext";
import LayoutDashboard from "@/widget/LayoutDashboard";

export default function Dashboard () {
  let { state, handleFunction } = React.useContext(GlobalContext);
  let {
    product,
    category,
    checkout,
    transaksi,
    theme,
    setTheme,
    isClick,
    setIsClick,
  } = state;
  let { checkProduct, checkCategory, checkCheckout, checkTransaksi } = handleFunction;

  // useEffect(() => {
  //     if(isClick) {
  //         if (
  //             localStorage.theme === "dark" ||
  //             (!("theme" in localStorage) &&
  //                 window.matchMedia("(prefers-color-scheme: dark)").matches)
  //         ) {
  //             document.documentElement.classList.add("dark");
  //         } else {
  //             document.documentElement.classList.remove("dark");
  //         }
  //     }
  // }, [theme]);

  useEffect(() => {
    checkProduct();
    checkCategory();
    checkCheckout();
    checkTransaksi();
  }, []);

  return (
    <LayoutDashboard>
      <div className="container mx-auto p-6">
        <h1 className="font-bold text-2xl mb-5 dark:text-gray-200">
          Dashboard
        </h1>
        <div className="flex gap-8">
          <div className="border bg-white shadow-lg p-3 rounded-md dark:bg-gray-500">
            <p className="text-xs">Product</p>
            <p className="font-bold text-lg">
              {product !== null && product.length}
            </p>
          </div>
          <div className="border bg-white shadow-lg p-3 rounded-md dark:bg-gray-500">
            <p className="text-xs">Category</p>
            <p className="font-bold text-lg">
              {category !== null && category.length}
            </p>
          </div>
          <div className="border bg-white shadow-lg p-3 rounded-md dark:bg-gray-500">
            <p className="text-xs">Checkout</p>
            <p className="font-bold text-lg">
              {checkout !== null && checkout.length}
            </p>
          </div>
          <div className="border bg-white shadow-lg p-3 rounded-md dark:bg-gray-500">
            <p className="text-xs">Transaksi</p>
            <p className="font-bold text-lg">
              {transaksi !== null && transaksi.length}
            </p>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}
