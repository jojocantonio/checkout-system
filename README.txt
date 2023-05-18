Code Instructions:
a) Products in the catalog:
   SKU	Name	     Price
   ipd	Super iPad	 $549.99
   mbp	MacBook Pro	 $1399.99
   atv	Apple TV	 $109.50
   vga	VGA adapter	 $30.00

b) Opening day specials: How long will the opening day specials will run?
   - 3-for-2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
      If # of items for Apple TVS in is 3, then price is only for 2

   - the brand new Super iPad will have a bulk discount applied, where the price will drop to $499.99 each if someone buys more than 4
       If # of items for Super iPad > 4 then each item will drop to $499.99 instead of $549.99

   - we will bundle in a free VGA adapter free of charge with every MacBook Pro sold
       If checkout cart has item MacBook Pro, then add VGA adapter buudle for free
       
c) Pricing rules should be as flexible as possible as they can change in the future with little notice.

d) Checkout system can scan items in any order

e) Checkout co = new Checkout(pricingRules); co.scan(item1); co.scan(item2); co.total();

Example scenarios:

SKUs Scanned: atv, atv, atv, vga Total expected: $249.00

SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95

SKUs Scanned: mbp, vga, ipd Total expected: $1949.98