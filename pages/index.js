import React from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import Error from 'next/error';
import Navbar from '@/components/Navbar';
import Banner from '@/components/Banner';
import dynamic from 'next/dynamic';
const DynamicRandomProduct = dynamic(
  () => import("@/components/RandomProduct"),
  {
    suspense: true,
  }
)
const DynamicProduct = dynamic(
  () => import("@/components/AllProduct"),
  {
    suspense: true
  }
)
const DynamicFooter = dynamic(
  () => import("@/components/Footer"),
  {
    suspense: true
  }
)

export async function getServerSideProps () {
  const res = await fetch(
    "https://service-example.sanbercloud.com/api/product"
  );
  const errorCode = res.ok ? false : res.status;
  const Product = await res.json();

  return {
    props: { errorCode, Product },
  };
}

export default function Home ({ errorCode, Product }) {
  // console.log("Product : ", Product)

  let { state } = React.useContext(GlobalContext);
  const [dataProduct] = React.useState(Product);
  const [category, setCategory] = React.useState(undefined);

  let { isSearch, setRandomIndex } = state;

  React.useEffect(() => {
    if (Product !== undefined) {
      let filter = Product.filter((res) => {
        return res.available === 1;
      });

      let random = Math.floor(Math.random() * filter.length);
      setRandomIndex(random);

      let categoryProduct = Product.map(
        (item) => item.category.category_name
      ).filter((value, index, self) => self.indexOf(value) === index);

      categoryProduct.unshift("All");

      setCategory(categoryProduct);
    }

    // console.log("HALLO = ", query);
  }, []);

  let searchInactive = "hidden";
  let searchActive = "fixed inset-x-0 bottom-0 top-0 z-40";

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <>
      <Navbar />
      <div
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        className={isSearch ? searchActive : searchInactive}
      ></div>
      <div className="min-h-screen dark:bg-gray-800">
        <div className="container p-5 mx-auto">
          <Banner />
          <h1 className="my-5 text-2xl font-bold dark:text-white">
            Kategori Produk
          </h1>
          <div
            className="flex flex-wrap gap-5 mb-20 rounded-md"
            role="group"
          >
            {category !== undefined &&
              category.map((res) => {
                return (
                  <button
                    key={Math.random() * 100}
                    name="category"
                    value={res}
                    type="button"
                    className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                  >
                    {res}
                  </button>
                );
              })}
          </div>
          <h1 className="my-5 text-2xl font-bold dark:text-white">
            Produk Rekomendasi
          </h1>
          <DynamicRandomProduct data={dataProduct} />
          <h1 className="my-5 text-2xl font-bold dark:text-white">
            Semua Produk
          </h1>
          <DynamicProduct data={dataProduct} />
        </div>
      </div>
      <DynamicFooter />
    </>
  )
}
