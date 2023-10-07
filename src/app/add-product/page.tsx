import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import data from "../../../data/latest-shares.json";
export const metadata = {
  title: "Add Product - Flowmazon",
};
async function updateProductPrice(name, newPrice) {
  try {
    // Find the product
    const product = await prisma.product.findFirst({
      where: {
        name,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // Update the price
    product.price = newPrice;

    // Update the product in the database
    const updatedProduct = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        price: newPrice,
      },
    });

    return updatedProduct;
  } catch (error) {
    console.error("Error updating product price:", error);
    throw error;
  } finally {
    // Close the Prisma Client
    await prisma.$disconnect();
  }
}

// Usage example
updateProductPrice(1, 19.99)
  .then((updatedProduct) => {
    console.log("Product price updated:", updatedProduct);
  })
  .catch((error) => {
    console.error("Error updating product price:", error);
  });

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  data.map(async (share) => {
    const name = share.name;
    // const description = share.name;
    // const imageUrl = `https://raw.githubusercontent.com/francisxvaz/nextjs-ecommerce/c1300ded38bb29139706bbb2c95d9d9d0b7b0471/public/logos/${name}.svg`;
    const price = Number(share.price) * 100;
    updateProductPrice(name, price)
  });

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  //redirect("/");
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
          value="All"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
          value={`All`}
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
          value={`https://raw.githubusercontent.com/francisxvaz/nextjs-ecommerce/c1300ded38bb29139706bbb2c95d9d9d0b7b0471/public/logos/AAPL.svg`}
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
          value="900"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
