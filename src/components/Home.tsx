import React from "react";
import { useState, useEffect } from "react";
import Items from "./Items";
import { cartItems } from "../api/cartItems";

const Home = () => {
  const [checkoutItemsArr, setcheckoutItemsArr] = useState<string[]>([]);
  const [itemsCountArr, setItemsCountArr] = useState([]);
  const [onPromo, setOnPromo] = useState(true);
  const [codeInput, setCodeInput] = useState("");
  const [inputOption, setInputOption] = useState("manual");

  useEffect(() => {
    console.log("checkoutItemsArr: ", checkoutItemsArr);
  });

  const handleBarcodeScanned = (event: any) => {
    event.preventDefault();
    console.log("barcode input: ", event.target.value);

    if (event !== null) {
      let barcodeValue = event.target.value;
      // setCodeInput(event.target.value)
      let elementArr: any = [];

      //check if array contains object
      const isFound = cartItems.some((element: any) => {
        if (element.barcode === barcodeValue) {
          elementArr = element;
          return true;
        }
        return false;
      });

      if (barcodeValue !== "" && isFound) {
        setcheckoutItemsArr((arr) => [...arr, elementArr]);
      }
      setCodeInput("");
    }
  };

  const onInputOptionChange = (event: any) => {
    console.log("input option: ", event.target.value);
    setInputOption(event.target.value);
  };

  return (
    <div className="md:container md:mx-auto mt-12 border-2 rounded p-10">
      <div className="row">
        <div className="flex justify-end">
          <div className="flex items-center h-5">
            <input
              id="promo-checkbox"
              checked
              aria-describedby="helper-checkbox-text"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="ml-1 text-sm">
            <label
              htmlFor="promo-checkbox"
              className="font-medium text-gray-900 dark:text-gray-300"
            >
              Opening Promo?
            </label>
            {/* <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">On opening promotion</p> */}
          </div>
        </div>
      </div>
      <div className="row">
        {/* Input Field for the barcode or manual input */}
        {/* <div id="qr-reader" className="input-field border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500">
              <span className="block text-sm font-medium text-slate-700">Barcode</span>
              <input id="barcode_input" className="barcode" type="text" />
              <button id="manual-barcode-input" type="button" className="">Enter</button>
            </div> */}
        <fieldset>
          <input
            id="scanner"
            className="peer/scanner"
            type="radio"
            name="status"
            checked={inputOption === "Scanner"}
            value="Scanner"
            onChange={onInputOptionChange}
          />
          <label
            htmlFor="scanner"
            className="peer-checked/scanner:text-sky-500"
          >
            Scanner
          </label>

          <input
            id="manual"
            className="peer/manual ml-4"
            type="radio"
            name="status"
            checked={inputOption === "Manual"}
            value="Manual"
            onChange={onInputOptionChange}
          />
          <label htmlFor="manual" className="peer-checked/manual:text-sky-500">
            Manual
          </label>
        </fieldset>
        <form>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="input-barcode"
          >
            Barcode
          </label>
          <form onSubmit={handleBarcodeScanned}>
            <input
              name="input-barcode"
              id="input-barcode"
              className="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={codeInput}
              onChange={(event) => setCodeInput(event.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
          <input
            name="input-barcode"
            id="input-barcode"
            className="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            onChange={handleBarcodeScanned}
            value={codeInput}
          />
        </form>
      </div>

      <div className="row">
        {checkoutItemsArr.length > 0 ? (
          <Items checkoutItems={checkoutItemsArr} />
        ) : (
          <p> No items scanned. </p>
        )}
      </div>
    </div>
  );
};

export default Home;
