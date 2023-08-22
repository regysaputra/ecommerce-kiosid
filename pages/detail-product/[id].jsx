import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { GlobalContext } from "@/context/GlobalContext";
import Cookies from "js-cookie";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import Error from "next/error";
const DynamicFooter = dynamic(() => import("../../components/Footer"), {
  suspense: true,
});

export default function DetailProduct () {
  let router = useRouter();

  let { id } = router.query;
  let { state, handleFunction } = React.useContext(GlobalContext);
  let { user, setUser, setFetchCheckoutStatus, isSearch, category } = state;

  let { checkCategory } = handleFunction;

  const [dataProduct, setDataProduct] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [display, setDisplay] = React.useState(false);
  const [fetchStatus, setFetchStatus] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFetch, setIsFetch] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState(0);
  const [subTotal, setSubTotal] = React.useState("0");
  const [loadingCheckout, setLoadingCheckout] = React.useState(false);

  const handleQuantityPlus = () => {
    if (quantity < dataProduct.stock) {
      let total = (quantity + 1) * parseInt(dataProduct.price);
      setSubTotal(total.toString());
      setQuantity(quantity + 1);
    }
  };

  const handleQuantityMin = () => {
    if (quantity > 1) {
      let total = (quantity - 1) * parseInt(dataProduct.price);
      setSubTotal(total.toString());
      setQuantity(quantity - 1);
    }
  };

  React.useEffect(() => {
    if (id !== undefined) {
      const getData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(
            `https://service-example.sanbercloud.com/api/product/${id}`
          );
          setDataProduct(res.data);
          setSubTotal(res.data.price);
          setIsFetch(true);
        } catch (error) {
          setErrorCode(500);
        }

        setIsLoading(false);
      };

      getData();
    }
  }, [id]);

  React.useEffect(() => {
    if (isFetch) {
      let fetchData = async () => {
        try {
          let result = await axios.get(
            `https://service-example.sanbercloud.com/api/product/${id}`
          );
          setDataProduct(result.data);
        } catch (error) {
          alert(error);
        }
      };

      if (fetchStatus) {
        fetchData();
        setFetchStatus(false);
      }
    }
  }, [fetchStatus]);

  React.useEffect(() => {
    checkCategory();
    setSubTotal();
    if (Cookies.get("token_user") !== undefined) {
      setUser(JSON.parse(Cookies.get("user")));
    }
  }, []);

  const handleCheckout = (event) => {
    if (!user) {
      alert("Harap login terlebih dahulu untuk menambahkan ke keranjang");
    } else {
      let idProduct = event.target.value;
      let postCheckout = async () => {
        try {
          setLoadingCheckout(true);
          setDisplay(true);
          await axios.post(
            `https://service-example.sanbercloud.com/api/checkout/${user.id}/${idProduct}`,
            { quantity },
            {
              headers: {
                Authorization:
                  "Bearer " + Cookies.get("token_user"),
              },
            }
          );
          setLoadingCheckout(false);
          setDisplay(false);
          setFetchStatus(true);
          setFetchCheckoutStatus(true);
        } catch (error) {
          alert(error);
        }
      };
      postCheckout();
    }
  };

  let searchInactive = "hidden";
  let searchActive = "fixed inset-x-0 bottom-0 top-0 z-40";

  const formatRupiah = (angka) => {
    let number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return "Rp" + rupiah;
  };

  if (errorCode !== 0) {
    return <Error statusCode={errorCode} />;
  }

  // const handleBgFocus = () => {
  //     if (displaySearch) {
  //         setDisplaySearch(false);
  //     }
  //     if (isSearch) {
  //         setIsSearch(false);
  //     }
  // };

  // const currencyFormat = (number) => {
  //     return new Intl.NumberFormat("id-ID", {
  //         style: "currency",
  //         currency: "IDR",
  //     }).format(number);
  // };

  // const stringFormat = (number) => {
  //     let str = currencyFormat(number);
  //     let strCurr = str.substring(0, str.length - 3);

  //     return strCurr.slice(0, 3) + strCurr.slice(4, strCurr.length);
  // };

  return (
    <>
      <Head>
        <title>Detail Produk</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta name="description" content="Kios.id Detail Product" />
      </Head>
      <Navbar />
      <div
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        className={isSearch ? searchActive : searchInactive}
      ></div>
      {isLoading && (
        <div className="min-h-screen dark:bg-gray-800">
          <div className="container mx-auto p-6">
            <div className="flex flex-row justify-center gap-x-16 animate-pulse">
              <div className="h-2/3">
                <div className="flex justify-center items-center h-[350px] w-[350px] rounded bg-gray-300 dark:bg-gray-600">
                  <svg
                    className="w-12 h-12 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col overflow-y-auto w-[450px]">
                <div className="flex flex-col mb-5">
                  <div className="w-full h-5 mb-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="w-10 h-4 mb-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="w-1/3 h-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="flex flex-row mb-5 gap-x-4">
                  <div className="w-12 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="w-14 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="flex flex-col gap-y-2 mb-4">
                  <div className="flex flex-col">
                    <div className="w-12 h-4 mb-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    <div className="w-14 h-4 mb-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    <div className="w-16 h-4 mb-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="w-full h-2 mb-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="w-full h-2 mb-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
              <div className="h-2/3">
                <div className="flex flex-col gap-y-5 p-3 w-64">
                  <div className="w-[100px] h-4 mb-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="flex flex-row gap-x-2 items-center">
                    <div className="w-[120px] h-4 mb-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    <div className="w-16 h-4 mb-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="w-14 h-4 mb-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    <div className="w-16 h-4 mb-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="w-full h-6 mb-1 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="min-h-screen dark:bg-gray-800">
          <div className="container mx-auto p-6">
            <div className="flex flex-row flex-wrap justify-center gap-x-16 gap-y-5">
              <div className="max-h-screen">
                <div className="relative h-60 w-60 lg:h-[350px] lg:w-[350px]">
                  <Image
                    src={dataProduct.image_url}
                    fill
                    alt="Product Image"
                    className="rounded-md"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col overflow-y-auto font-open-sauce-one w-[450px]">
                <div className="flex flex-col mb-5">
                  <h1 className="font-extrabold text-lg leading-6 uppercase tracking-normal opacity-90 mb-1 dark:text-gray-200">
                    {dataProduct.product_name}
                  </h1>
                  <span className="flex flex-row items-center gap-x-1 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="orange"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="orange"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                    <p className="text-sm font-normal leading-5 dark:text-gray-200">
                      {dataProduct.rating}
                    </p>
                  </span>
                  <p className="font-extrabold text-[28px] leading-[34px] opacity-90 dark:text-gray-200">
                    {formatRupiah(dataProduct.price)}
                  </p>
                </div>
                <hr />
                <div className="mb-3 text-sm font-extrabold leading-5 text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                  <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2">
                      <a
                        href="#"
                        className="inline-block py-2 px-4 text-yellow-400 rounded-t-lg border-b-2 border-yellow-400 active dark:text-yellow-500 dark:border-yellow-500"
                        aria-current="page"
                      >
                        Detail
                      </a>
                    </li>
                    <li>
                      <a className="inline-block py-2 px-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
                        Info Penting
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-y-2 mb-4">
                  <div className="flex flex-col">
                    <span className="flex flex-row">
                      <p className="font-normal text-sm leading-5 opacity-60 dark:text-gray-200">
                        Kondisi:
                      </p>
                      <p className="font-normal text-sm leading-5 opacity-90 dark:text-gray-200">
                        Baru
                      </p>
                    </span>
                    <span className="flex flex-row">
                      <p className="font-normal text-sm leading-5 opacity-60 dark:text-gray-200">
                        Berat Satuan:
                      </p>
                      <p className="font-normal text-sm leading-5 opacity-90 dark:text-gray-200">
                        -
                      </p>
                    </span>
                    <span className="flex flex-row">
                      <p className="font-normal text-sm leading-5 opacity-60 dark:text-gray-200">
                        Kategori:
                      </p>
                      {category !== null &&
                        category
                          .filter((res) => {
                            return (
                              res.id ===
                              dataProduct.id_category
                            );
                          })
                          .map((res, index) => {
                            return (
                              <p key={index} className="font-bold text-sm leading-5 text-yellow-400 dark:text-yellow-500">
                                {
                                  res.category_name
                                }
                              </p>
                            );
                          })}
                    </span>
                  </div>
                  <p className="font-normal text-sm leading-5 dark:text-gray-200">
                    {dataProduct.description}
                  </p>
                </div>
                <hr />
              </div>
              <div className="max-h-screen">
                <div className="border shadow-lg flex flex-col gap-y-5 p-3 w-64 rounded-md font-open-sauce-one dark:border-none dark:bg-gray-900">
                  <h1 className="font-extrabold text-base leading-[22px] dark:text-gray-200">
                    Atur Jumlah
                  </h1>
                  <div className="flex flex-row gap-x-2 items-center">
                    <div className="w-[120px]">
                      <div className="relative w-full">
                        <button
                          name="decrement"
                          onClick={handleQuantityMin}
                          className="absolute top-0 left-0 p-1 text-sm font-medium rounded-l-md border dark:border-gray-900"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="orange"
                            class="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M18 12H6"
                            />
                          </svg>
                        </button>
                        <input
                          onChange={() => { }}
                          value={quantity}
                          type="text"
                          id="quantity"
                          className="block py-1 px-2.5 w-full z-20 text-sm text-center text-gray-900 bg-gray-50 rounded-md border-gray-300 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-gray-200 focus:border-gray-100 focus:ring-yellow-400 dark:border-gray-900 dark:focus:border-yellow-500 dark:focus:ring-yellow-500"
                          placeholder="1"
                        />
                        <button
                          name="increment"
                          onClick={handleQuantityPlus}
                          className="absolute top-0 right-0 p-1 text-sm font-medium rounded-r-md border dark:border-gray-900"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="orange"
                            class="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v12m6-6H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <span className="flex flex-row">
                      <p className="font-normal text-sm leading-5 dark:text-gray-200">
                        Stok Total:
                      </p>
                      <p className="font-bold text-sm leading-5 dark:text-gray-200">
                        {dataProduct.stock}
                      </p>
                    </span>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <p className="font-normal text-sm leading-[18px] opacity-60 dark:text-gray-200">
                      Subtotal
                    </p>
                    <p className="font-bold text-lg leading-[26px] dark:text-gray-200">
                      {formatRupiah(subTotal)}
                    </p>
                  </div>
                  {!loadingCheckout && (
                    <button
                      onClick={handleCheckout}
                      value={dataProduct.id}
                      type="button"
                      className="border text-yellow-400 hover:text-white border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center leading-5 w-full dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                    >
                      + Keranjang
                    </button>
                  )}
                  {loadingCheckout && (
                    <button
                      type="button"
                      className="flex justify-center items-center w-full rounded-lg px-5 py-2.5 cursor-not-allowed text-white bg-gray-500 dark:bg-gray-800"
                    >
                      <svg
                        aria-hidden="true"
                        className="mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <p className="font-bold text-sm leading-5">Processing...</p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className="min-h-screen dark:bg-gray-800">
                <div className="container p-5 mx-auto font-open-sauce-one">
                    <h1 className="mb-5 text-2xl font-bold dark:text-white">
                        Detail Product
                    </h1>
                    {isLoading && (
                        <div className="container mx-auto">
                            <div className="flex w-full animate-pulse">
                                <div className="flex justify-center items-center w-1/3 h-80 bg-gray-300 rounded dark:bg-gray-700">
                                    <svg
                                        className="w-12 h-12 text-gray-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 640 512"
                                    >
                                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                                    </svg>
                                </div>
                                <div className="w-2/3 p-4">
                                    <div className="w-1/2 h-4 mb-2 bg-gray-200 rounded"></div>
                                    <div className="w-full h-32 mb-2 bg-gray-200 rounded mb-6"></div>
                                    <div className="flex justify-between mt-3 mb-2 item-center">
                                        <div className="w-32 h-8 bg-gray-200 rounded"></div>
                                        <div className="w-44 h-8 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLoading && (
                        <div className="container mx-auto border dark:border-none">
                            <div className="flex w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-900">
                                <div className="w-1/3">
                                    <Image
                                        src={dataProduct.image_url}
                                        width={500}
                                        height={500}
                                        alt="Product Image"
                                        priority
                                    />
                                </div>
                                <div className="w-2/3 p-4">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        {dataProduct.product_name}
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-100">
                                        {dataProduct.description}
                                    </p>
                                    <div className="flex justify-between mt-3 item-center">
                                        <h1 className="text-xl font-bold text-gray-700 dark:text-gray-100">
                                            {stringFormat(dataProduct.price)}
                                        </h1>
                                        {user && (
                                            <div className="inline">
                                                <div className="flex items-center justify-between border">
                                                    <button
                                                        onClick={
                                                            handleQuantityMin
                                                        }
                                                        className="h-full px-2 text-black bg-gray-200"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        onChange={() => {}}
                                                        value={quantity}
                                                        className="inline-block h-full font-bold text-center focus:outline-none"
                                                        placeholder="1"
                                                    />
                                                    <button
                                                        onClick={
                                                            handleQuantityPlus
                                                        }
                                                        className="h-full px-2 text-black bg-gray-200"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {!display && (
                                            <button
                                                value={dataProduct.id}
                                                onClick={handleCheckout}
                                                className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                                            >
                                                Tambahkan ke Keranjang
                                            </button>
                                        )}

                                        {display && (
                                            <button
                                                value={dataProduct.id}
                                                onClick={handleCheckout}
                                                className="relative flex items-center justify-center w-full p-6 px-3 text-xs font-bold text-white uppercase bg-yellow-300 rounded"
                                            >
                                                <div
                                                    className="absolute"
                                                    role="status"
                                                >
                                                    <svg
                                                        className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                                                        viewBox="0 0 100 101"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                            fill="currentFill"
                                                        />
                                                    </svg>
                                                    <span className="sr-only">
                                                        Loading...
                                                    </span>
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                    <span className="text-sm dark:text-gray-100">
                                        Stok: {dataProduct.stock}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div> */}
      <DynamicFooter />
    </>
  );
}
