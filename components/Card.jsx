import Image from 'next/image';
import Link from 'next/link';

export default function Card({data}) {
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

    const handleText = (param) => {
        if (param === null) {
            return "";
        } else {
            if(param.length < 40) {
                return param;
            } else {
                return param.slice(0, 40) + "...";
            }
            
        }
    };

    return (
        <Link
            href={`/detail-product/${data.id}`}
            className="flex flex-col border shadow-md rounded-lg h-80 w-44 dark:border-none dark:bg-gray-900"
        >
            <div className="relative h-44 w-[174px]">
                <Image
                    src={data.image_url}
                    fill
                    sizes="(max-width: 768px) 15vw,
                            (max-width: 1200px) 15vw,
                            15vw"
                    className="object-cover rounded-t-lg"
                    alt="Product Image"
                    quality={50}
                />
            </div>
            <div className="flex flex-col p-2 gap-1 font-open-sauce-one">
                <p className="font-normal text-xs leading-[18px] dark:text-white">
                    {handleText(data.product_name)}
                </p>
                <p className="font-bold text-sm leading-5 dark:text-white">
                    {formatRupiah(data.price)}
                </p>
                <small>
                    <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold leading-[14px] mr-2 p-1 rounded-lg dark:bg-yellow-200 dark:text-yellow-800 dark:text-white">
                        {data.category.category_name}
                    </span>
                </small>
                <span className="flex gap-x-1 items-center">
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
                    <p className="font-normal text-xs leading-normal dark:text-white">{data.rating}</p>
                </span>
            </div>
        </Link>
    );
}