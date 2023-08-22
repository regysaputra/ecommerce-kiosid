import { Carousel } from 'flowbite-react';
import Image from 'next/image';
import bannerPic1 from "@/public/img1.webp"
import bannerPic2 from "@/public/img2.webp"

export default function Banner() {
  return (
		<div className="h-56 mt-10 mb-10 sm:h-64 xl:h-80 2xl:h-96">
			<Carousel>
				<div className="relative h-56 sm:h-64 xl:h-80 2xl:h-96">
					<Image
						src={bannerPic1}
						fill
						sizes="(max-width: 768px) 80vw,
                        (max-width: 1200px) 80vw,
                        80vw"
						alt="Gambar Banner"
						className="object-cover object-center"
						quality={50}
						priority
					/>
				</div>
				<div className="relative h-56 sm:h-64 xl:h-80 2xl:h-96">
					<Image
						src={bannerPic2}
						fill
						sizes="(max-width: 768px) 80vw,
                        (max-width: 1200px) 80vw,
                        80vw"
						alt="Gambar Banner"
						className="object-cover object-center"
						quality={50}
						priority
					/>
				</div>
			</Carousel>
		</div>
	)
}
