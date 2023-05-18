import React, { useState } from "react";
import { cartItems } from "../api/cartItems";

const Items = (props: any) => {
  const { checkoutItems } = props;
  const [subtotalArr, setSubtotalArr] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const getItemCount = (checkoutItems: any[]) => {
    let itemsCount: any = [];

    if (checkoutItems.length > 0) {
      checkoutItems.map((element) => {
        itemsCount[element.barcode] = (itemsCount[element.barcode] || 0) + 1;
      });
    }
    return itemsCount;
  };

  const handleItemSubtotalOnSale = (
    _sku: any,
    _price: number,
    _count: number
  ) => {
    let subtotal = 0;

    //Promo 1 on Apple TVs
    if (_sku === "atv" && _count === 3) {
      subtotal = _price * (_count - 1);
    } else if (_sku === "ipd" && _count > 4) {
      //Promo 2 on Super iPad
      let itemPromoPrice = 499.99;
      subtotal = itemPromoPrice * _count;
    } else if (_sku === "mbp") {
      //Promo 3, add a free bundle on MacBook Pro
      subtotal = _price * _count;
    } else if (_sku === "vga") {
      let mackbookItemExists = checkIfItemExists("mbp", checkoutItems);
      if(mackbookItemExists) {
        subtotal = 0;
      } else {
        subtotal = _price * _count;
      }
     
    } else {
      if (_count) {
        subtotal = _price * _count;
      }
    }

    return subtotal;
  };

  const promoBundle = (_sku: string, _count: number) => {
    let message = "";

    if (_sku === "mbp") {
      //Promo 3, add a free bundle on MacBook Pro
      let bundle = cartItems.filter((item) => {
        if (item.sku === "vga") {
          return item;
        } else {
          return null;
        }
      });
      console.log("bundle: ", bundle);
    }
    return message;
  };

  const handleItemSubtotal = (_price: number, _count: number) => {
    let subtotal = 0;

    subtotal = _price * _count;

    return subtotal;
  };

  const handleCheckoutTotal = (itemArr: any) => {
    let total = 0;

    itemArr.map((item: any) => {
      let count = itemCountArr[item.barcode];
      total += item.price * count;
    });

    return total.toFixed(2);
  };

  const handlePromoCheckoutTotal = (itemArr: any, itemCountArr: any) => {
    let total = 0;

    itemArr.map((item: any) => {
      let count = itemCountArr[item.barcode];
      //Promo 1 on Apple TVs
      if (item.sku === "atv" && count=== 3) {
        total += item.price * (count - 1);
      } else if (item.sku === "ipd" && count > 4) {
        //Promo 2 on Super iPad
        let itemPromoPrice = 499.99;
        total += itemPromoPrice * count;
      } else if (item.sku === "mbp") {
        //Promo 3, add a free bundle on MacBook Pro
        total += item.price * count;
      } 
      // else if (item.sku === "vga") {
      //   let mackbookItemExists = checkIfItemExists("mbp", checkoutItems);
      //   if(mackbookItemExists) {
      //     //will not compute
      //   } else {
      //     total += item.price*count;
      //   }
      // }
       else {
        if (count) {
          total += item.price * count;
        }
      }
    });

    return total.toFixed(2);
  };

  const getCartItem = (_sku: string) => {
    const item = cartItems.filter((i) => {
      if (i.sku === _sku) {
        return i;
      }
    });
    console.log("getCart: ", item[0]);
    return item.length > 0 ? item[0] : null;
  };

  const checkIfItemExists = (_sku: string, checkoutItems: any) => {
    const item = checkoutItems.filter((i: any) => {
      console.log(i.sku, "===", _sku);
      if (i.sku === _sku) {
        return true;
      } else {
        return false;
      }
    });
    console.log("ittte: ", item);
    return item.length > 0 ? true : false;
  };

  let itemCountArr = getItemCount(checkoutItems);

  const filteredArr = checkoutItems.reduce((acc: any[], current: any) => {
    const x = acc.find((item) => item.sku === current.sku);

    if (!x) {
      let filteredItem = acc.concat([current]);
      console.log("currr: ", current);
      if (current.sku === "mbp") {
        let itemBundleSku = "vga";
        let freeBundledItem = getCartItem(itemBundleSku);

        filteredItem = filteredItem.concat([freeBundledItem]);
        console.log("Checkpoint: ", filteredItem);
      }
      return filteredItem;
    } else {
      return acc;
    }
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              SKU
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Subtotal
            </th>
          </tr>
         
        </thead>
        <tbody>
          {filteredArr.length > 0
            ? filteredArr.map((item: any, index: any) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.sku}
                  </th>
                  <td className="px-6 py-4 text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-gray-900">${item.price}</td>
                  <td className="px-6 py-4 text-gray-900">
                    {itemCountArr[item.barcode]}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    ${itemCountArr[item.barcode] > 0 ? (
                      handleItemSubtotalOnSale(
                        item.sku,
                        item.price,
                        itemCountArr[item.barcode]
                      ) > 0 ? (
                        handleItemSubtotalOnSale(
                          item.sku,
                          item.price,
                          itemCountArr[item.barcode]
                        )
                      ) : (
                        <>
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            Free Bundle
                          </span>
                          <p className="text-xs font-small text-gray-400 line-through dark:text-white ml-2">
                            ${item.price}
                          </p>
                        </>
                      )
                    ) : (
                      <>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                          Free Bundle
                        </span>
                        <p className="text-xs font-small text-gray-400 line-through dark:text-white ml-2">
                          ${item.price}
                        </p>
                      </>
                    )}
                    <p className="text-gray-400">
                      {promoBundle(item.sku, itemCountArr[item.barcode])}
                    </p>
                  </td>
                </tr>
              ))
            : "No items to display"}
            <tr className="text-md bold text-gray-900">
              <td
                colSpan={4} 
                className="whitespace-nowrap px-6 py-4 font-medium font-black text-gray-700 dark:text-white">
                Total
              </td>
              <td className="font-semibold whitespace-nowrap px-6 py-4 ">${handlePromoCheckoutTotal(filteredArr, itemCountArr)}</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Items;