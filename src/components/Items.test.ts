import { render, screen } from '@testing-library/react';
import Items from './Items';

const cartItems = [
    { barcode: "ABC-abc-1234", sku: "ipd", name: "Super iPad", price: 549.99 },
    {
      barcode: "CDE-cde-4567",
      sku: "mbp",
      name: "MacBook Pro",
      price: 1399.99,
    },
    { barcode: "FGH-fgh-8910", sku: "atv", name: "Apple TV", price: 109.5 },
    { barcode: "ABC-abc-1234", sku: "ipd", name: "Super iPad", price: 549.99 }
  ];

  const expectedItemsCount =  [
    { barcode: "ABC-abc-1234", sku: "ipd", name: "Super iPad", price: 549.99 },
    {
      barcode: "CDE-cde-4567",
      sku: "mbp",
      name: "MacBook Pro",
      price: 1399.99,
    },
    { barcode: "FGH-fgh-8910", sku: "atv", name: "Apple TV", price: 109.5 }
  ];


  test("should display a blank login form, with remember me checked by default", async () => {
   
  });