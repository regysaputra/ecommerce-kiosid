import axios from "axios";
import React from "react";
import { GlobalContext } from "@/context/GlobalContext";
import Layout from "@/widget/Layout";
import Cookies from "js-cookie";

export default function Transaction () {
  let { state } = React.useContext(GlobalContext);
  let { user } = state;
  const [data, setData] = React.useState(null);
  const [fetchTransactionStatus, setFetchTransactionStatus] = React.useState(true);

  React.useEffect(() => {
    if (user !== undefined) {
      if (fetchTransactionStatus) {
        axios
          .get(
            `https://service-example.sanbercloud.com/api/transaction-user/${user.id}`,
            {
              headers: {
                Authorization:
                  "Bearer " + Cookies.get("token_user"),
              },
            }
          )
          .then((res) => {
            setData(res.data);
          });

        setFetchTransactionStatus(false);
      }
    }
  }, [user, fetchTransactionStatus]);

  const currencyFormat = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const stringFormat = (number) => {
    const str = currencyFormat(number);
    return str.substring(0, str.length - 3);
  };

  const handleTransaction = (event) => {
    let idTransaksi = event.target.value;

    axios
      .post(
        `https://service-example.sanbercloud.com/api/transaction-completed/${idTransaksi}/${user.id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("token_user"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setFetchTransactionStatus(true);
      })
      .catch((err) => {
        alert(err);
      })
  }

  const handleDelete = (event) => {
    let idTransaksi = event.target.value;

    axios
      .delete(
        `https://service-example.sanbercloud.com/api/transaction/${idTransaksi}`,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("token_user"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setFetchTransactionStatus(true);
      })
      .catch((err) => {
        alert(err);
      });
  }

  console.log("data : ", data)

  return (
    <Layout>
      <div className="container mx-auto min-h-screen p-5">
        <h1 className="text-2xl font-bold mb-5">Transaksi</h1>
        <p className="text-gray-500">Transaksi Terdaftar</p>
        <div className="w-full border shadow-md p-5 rounded-md">
          {data !== null &&
            data
              .filter((res) => {
                return res.status === "Transaksi terdaftar";
              })
              .map((res) => {
                return (
                  <div
                    key={res.id}
                    className="flex items-center justify-between w-full p-5 mt-10 rounded-md shadow-md"
                  >
                    <div>
                      <div className="flex gap-2">
                        <p className="text-xs font-bold">
                          {res.status}
                        </p>
                        <p className="text-xs">
                          {res.transaction_code}
                        </p>
                      </div>
                      <div>
                        <p>
                          {res.user.name} :
                          {stringFormat(res.total)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={handleTransaction}
                        value={res.id}
                        type="button"
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        Transaksi selesai
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
        <p className="text-gray-500">Transaksi Selesai</p>
        <div className="w-full border shadow-md p-5 rounded-md">
          {data !== null &&
            data
              .filter((res) => {
                return res.status === "Transaksi selesai";
              })
              .map((res) => {
                return (
                  <div
                    key={res.id}
                    className="flex items-center justify-between w-full p-5 mt-10 rounded-md shadow-md"
                  >
                    <div>
                      <div className="flex gap-2">
                        <p className="text-xs font-bold">
                          {res.status}
                        </p>
                        <p className="text-xs">
                          {res.transaction_code}
                        </p>
                      </div>
                      <div>
                        <p>
                          {res.user.name} :
                          {stringFormat(res.total)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={handleDelete}
                        value={res.id}
                        type="button"
                        className="focus:outline-none text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-red-900"
                      >
                        Hapus transaksi
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </Layout>
  );
}
