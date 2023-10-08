import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";
import yahooImage from "@/assets/finance-site/yahoo.png"
import tiprankImage from "@/assets/finance-site/tiprank.png"

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <div className="card w-full bg-base-100 transition-shadow hover:shadow-xl">
    <Link
      href={"/products/" + product.id}
      
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure></Link>
      <div className="card-body">
        <div className="flex items-center">
          <h2 className="card-title">{product.name}</h2>
          <PriceTag price={product.price} />
        </div>
        
        {isNew && <div className="badge badge-secondary">NEW</div>}
        <p>{product.description}</p>
        <p className="flex gap-4">
        <Link
              href={`https://finance.yahoo.com/quote/${product.name}`}
              target="_blank"
            >
              <Image
                className="rounded-full"
<<<<<<< HEAD
                src="/finance-site/yahoo.png"
=======
                src={yahooImage}
>>>>>>> c2d71e551114c6c2f0f438284a39beb5e53aa27a
                alt="fin"
                width={30}
                height={30}
              />
            </Link>
            <Link
              href={`https://www.tipranks.com/stocks/${product.name}`}
              target="_blank"
            >
              <Image
<<<<<<< HEAD
                src="/finance-site/tiprank.png"
=======
                src={tiprankImage}
>>>>>>> c2d71e551114c6c2f0f438284a39beb5e53aa27a
                alt="fin"
                width={30}
                height={30}
                className="rounded-full"
              />
            </Link>
        </p>
      </div>
    
    </div>
  );
}
