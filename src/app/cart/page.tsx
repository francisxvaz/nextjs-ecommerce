import { ShoppingCart, getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import CartEntry from "./CartEntry";
import { addToPortfolio, setProductQuantity } from "./actions";
import AddToPortfolioButton from "./AddToPortfolioButton";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Your Cart - EJV Capital",
};

export default async function CartPage() {
  const cart = await getCart();

  const addCartToPortfolio = async (cart: ShoppingCart | null) => {
    "use server"
    await addToPortfolio(cart)
    revalidatePath("/cart")
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty.</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <AddToPortfolioButton cart={cart} addCartToPortfolio={addCartToPortfolio} />
      </div>
    </div>
  );
}
