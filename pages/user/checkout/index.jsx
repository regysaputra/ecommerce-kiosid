import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { GlobalContext } from "@/context/GlobalContext";
import Layout from "@/widget/Layout";
import { FaUser } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/router";

export default function Checkout () {
  const router = useRouter();
  let { state } = React.useContext(GlobalContext);
  let { user, setFetchCheckoutStatus } = state;
  const [data, setData] = React.useState(null);
  const [bank, setBank] = React.useState(null);
  const [fetchBankStatus, setFetchBankStatus] = React.useState(true);
  const [optionBankId, setOptionBankId] = React.useState(-1);
  const [input, setInput] = React.useState({
    message: "",
  });
  const [display, setDisplay] = React.useState(false);
  let form = React.useRef();

  const getTotalPrice = (arr) => {
    let getPrice = arr
      .filter((res) => {
        return res.is_transaction === 0;
      })
      .map((res) => {
        return res.unit_price;
      });

    let totalUnitPrice = getPrice.map(Number);

    return totalUnitPrice.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ).toString();
  };

  React.useEffect(() => {
    if (user !== undefined) {
      axios
        .get(
          `https://service-example.sanbercloud.com/api/checkout-product-user/${user.id}`,
          {
            headers: {
              Authorization:
                "Bearer " + Cookies.get("token_user"),
            },
          }
        )
        .then((res) => {
          let result = res.data;

          if (result.length === 0) {
            setInput({
              ...input,
              message: "Tidak ada checkout",
            });
          } else {
            setData(result);
            // getArrayCheckout();
            let nama_produk = result
              .filter((r) => {
                return r.is_transaction === 0;
              })
              .map((r) => {
                return r.product.product_name;
              });

            setInput({
              ...input,
              message: `Anda memiliki transaksi di kios.id dengan nama produk :\n- ${nama_produk.join(
                "\n-"
              )}\n\nDengan total pembayaran: ${formatRupiah(
                getTotalPrice(result)
              )}\nSilakan lakukan pembayaran segera.`,
            });
          }
        });
    }

    // let getArrayCheckout = async () => {
    //     let { data } = await axios.get(
    //         `https://service-example.sanbercloud.com/api/checkout-product-user/${user.id}`,
    //         {
    //             headers: {
    //                 Authorization: "Bearer " + Cookies.get("token_user"),
    //             },
    //         }
    //     );

    //     let result = data.map((res) => {
    //         return res.product.product_name;
    //     });

    //     setInput({
    //         ...input,
    //         message: `Anda memiliki transaksi di kios.id dengan nama produk :\n- ${result.join(
    //             "\n-"
    //         )}\n\nDengan total pembayaran: ${stringFormat(
    //             getTotalPrice(data)
    //         )}`,
    //     });
    // };

    let getBank = async () => {
      let { data } = await axios.get(
        "https://service-example.sanbercloud.com/api/bank"
      );
      setBank(data);
    };

    if (fetchBankStatus) {
      getBank();
      setFetchBankStatus(false);
    }
  }, [user]);

  const handleOption = (event) => {
    setOptionBankId(event.target.value);
  };

  const handleTransaction = (event) => {
    event.preventDefault();
    setDisplay(true);

    if (optionBankId === -1) {
      alert("Kamu belum memilih bank");
    } else {
      axios
        .post(
          `https://service-example.sanbercloud.com/api/transaction/${user.id}`,
          { id_bank: optionBankId },
          {
            headers: {
              Authorization:
                "Bearer " + Cookies.get("token_user"),
            },
          }
        )
        .then((res) => {
          emailjs
            .sendForm(
              "service_xq3axi7",
              "template_14re848",
              form.current,
              "QfqM7atcYiP3vXtMG"
            )
            .then(
              (result) => {
                alert(result.text);
              },
              (error) => {
                alert(error.text);
              }
            );

          setDisplay(false);
          setFetchCheckoutStatus(true);
          router.push("/");
        })
        .catch((err) => {
          alert(err);
          setDisplay(false);
        });
    }
  };

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

  // const currencyFormat = (number) => {
  //     return new Intl.NumberFormat("id-ID", {
  //         style: "currency",
  //         currency: "IDR",
  //     }).format(number);
  // };

  // const stringFormat = (number) => {
  //     const str = currencyFormat(number);
  //     return str.substring(0, str.length - 3);
  // };

  return (
    <Layout>
      <div className="container mx-auto min-h-screen p-5">
        <h1 className="text-2xl font-bold mb-5">Keranjang</h1>
        <div className="w-full border shadow-md p-5 rounded-md">
          {data !== null &&
            data
              .filter((res) => {
                return res.is_transaction === 0;
              })
              .map((res) => {
                return (
                  <div
                    key={res.id}
                    className="w-full border shadow-md p-5 rounded-md"
                  >
                    <div>
                      <span className="font-bold text-xs">
                        {res.product.product_name}
                      </span>
                      <span className="text-xs">
                        : {res.quantity} unit
                      </span>
                    </div>
                    <p className="text-xs">
                      Harga :{" "}
                      {formatRupiah(res.unit_price)}
                    </p>
                  </div>
                );
              })}
          <form onSubmit={handleTransaction} ref={form}>
            <div className="w-full p-5 border rounded-md">
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pilih bank transaksi Anda
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={optionBankId}
                  onChange={handleOption}
                >
                  <option defaultValue={-1}>
                    Pilih bank
                  </option>
                  {bank !== null &&
                    bank.map((res) => {
                      return (
                        <option
                          key={res.id}
                          value={res.id}
                        >
                          {res.bank_name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="website-admin"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <FaUser />
                  </span>
                  <input
                    name="user_name"
                    type="text"
                    id="website-admin"
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your Name"
                  />
                </div>
                <label
                  htmlFor="input-group-1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    name="user_email"
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="your_email@domain.com"
                  />
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    defaultValue={input.message}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-5">
              <h1 className="text-xl font-bold text-gray-700">
                Total Harga :{" "}
                {data !== null &&
                  formatRupiah(getTotalPrice(data))}
              </h1>
              {!display && (
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-bold text-white uppercase bg-yellow-300 rounded"
                >
                  Beli
                </button>
              )}
              {display && (
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-bold text-white uppercase bg-yellow-300 rounded"
                >
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          </form>
        </div>
      </div>
    </Layout>
  );
}
