import Image from "next/image";
import { FC, useCallback, useState } from "react";
import { useAddCart } from "../../hooks/addToCart";
import { ProductData, RawProductData } from "../../models";
import { inferQueryOutput } from "../../utils/trpc";
import { Layover } from "../layover";

interface ShopProps {
  products?: inferQueryOutput<"stripe.all-products">;
  params: string;
}
const Products: FC<ShopProps> = (props): JSX.Element => {

  const [overlay, openOverlay] = useState(false);
  const [productData, setProductData] = useState<RawProductData>({
    images: [""],
    default_price: "",
    name: "",
    unit_amount: 0,
    quantity: 0,
    description: "",
  });

  const handleClick = (data: RawProductData) => {
    setProductData(data);
    productData !== undefined && openOverlay(true);
  };

  return (
    <>
      <div className="z-1 relative w-full flex flex-col items-center justify-start">
        <h1 className="text-center p-5 text-2xl">{props.params}</h1>
        <div className="lg:w-2/3 w-full h-full flex flex-row lg:justify-start justify-center flex-wrap">
          {props.products?.map(data => {
            return (
              <div key={data.name} className="">
                {data.metadata.category !== props.params && (
                  <div className="w-80 m-6 flex flex-col bg-white items-center">
                    <button
                      className="w-full hover:blur cursor-pointer h-[17rem] overflow-clipflex items-center justify-center"
                      onClick={() => {
                        handleClick({
                          images: data.images,
                          default_price: data.default_price,
                          name: data.name,
                          unit_amount: data.unit_amount,
                          description: data.description,
                          quantity: 1,
                        });
                      }}
                    >
                      <Image alt={`kleanse product ${data.name}`} src={data.images[0] ?? ""} height={400} width={400} />
                    </button>
                    <AddToCartButton
                      data={{
                        images: data.images,
                        default_price: data.default_price,
                        name: data.name,
                        unit_amount: data.unit_amount,
                        quantity: 1,
                        description: data.description,
                      }}
                    />
                  </div>
                )}
              </div>
            );
            // renders static data ( stripe product data) to elements
          })}
        </div>
      </div>
      {overlay && <ProductOverlay onCloseOverlay={() => openOverlay(false)} data={productData} />}
    </>
  );
};
export default Products;

interface ProductOverlayProps {
  onCloseOverlay: () => void;
  data: RawProductData;
}
export const ProductOverlay: FC<ProductOverlayProps> = ({ onCloseOverlay, data }): JSX.Element => {

  const classes = {
    container: "flex flex-col",
    header: "h-20 w-full bg-grey flex justify-end",
    exitButton: "w-2/6 bg-grey flex justify-center items-center p-auto text-white",
    addToCartWrapper: "lg:w-1/6 md:w-1/6 w-5/6",
    productWrapper: "",
    infoWrapper: "",
    main: "",
  }
      
  const callBack = useCallback(() => {
    onCloseOverlay();
  }, [onCloseOverlay]);

  return (
    <>
      <Layover>
        <div className={classes.main}>
            <header className={classes.header}>
              <button className={classes.exitButton} onClick={callBack}>X</button>
            </header>
            <main className={classes.main}>
                <section id="product-view" className={classes.productWrapper}>
                  <Image
                    alt={`kleanse product ${data.name}`}
                    src={data.images[0] ?? ""}
                    height={122.4}
                    width={130} />
                </section>
                <section id="product-info" className={classes.infoWrapper}>
                  <span className={classes.addToCartWrapper}>
                    <AddToCartButton data={data} />
                  </span>
                </section>
            </main>
        </div>
      </Layover>
    </>
  );
};

interface AddToCartButtonProps {
  data: RawProductData;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ data }): JSX.Element => {
  const { addToCart } = useAddCart();

  const handleClick = () => {
    if (!data.default_price) return;
    const item = {
      image: data.images[0] ? data.images[0] : "",
      name: data.name,
      amount: data.unit_amount ? data.unit_amount : 0,
      default_price: JSON.stringify(data.default_price),
      quantity: 1,
    };
    addToCart(item);
  };

  return (
    <button
      className="shadow w-full flex flex-row justify-center items-center p-2"
      onClick={() => handleClick()}
      disabled={data.default_price === undefined || data.default_price === null}
    >
      <span className="w-full h-full flex flex-row justify-center items-center">
        <p className="w-4/6">Add to cart</p>
        <span className="h-full w-2/6">
          <Image alt="kleanse" src="/images/kleanse-logos/kleanse-wing.svg" height={40} width={40} />
        </span>
      </span>
    </button>
  );
};

export const setLocalStorage = (data: Array<ProductData>) => {
  if (!data) return console.log(data);
  window.localStorage.clear();
  window.localStorage.setItem("cart", JSON.stringify(data));
};
