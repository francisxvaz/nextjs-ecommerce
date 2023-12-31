import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";
import FinanceSites from "./FinanceSites";
import PercentageBadge from "./PercentageBadge";

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
        <PercentageBadge percentageDiff={product.percentageChange!} />
        {/* {isNew && <div className="badge badge-secondary">{product.percentageChange?.toFixed(2)}</div>} */}
        <p>{product.description}</p>
        <FinanceSites name={product.name} />
      </div>
    
    </div>
  );
}
