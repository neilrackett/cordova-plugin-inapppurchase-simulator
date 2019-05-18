In-App Purchase Sandbox plugin for Cordova
==========================================

This is a simple Cordova plugin that overrides and approximates all of the methods of `cordova-plugin-inapppurchase` to enable developers to test their in-app purchase workflow on Android and iOS devices, or in the browser, by creating local sandbox that simulates its functionality.

The following methods are currently supported:

```javascript
inAppPurchase.getProducts(productIds);
inAppPurchase.buy(productId);
inAppPurchase.subscribe(productId); // Not currently implemented
inAppPurchase.consume(type, receipt, signature);
inAppPurchase.restorePurchases();
inAppPurchase.getReceipt(); // Not currently implemented
```

Don't forget to test your apps using the official App Store and/or Google Play sandbox environments before 

Installation
------------

```
cordova plugin add cordova-plugin-inapppurchase-sandbox
```

Use
---

The quickest way to enable the local sandbox is to add the following command in your `"deviceready"` event handler:

```javascript
inAppPurchaseSanbox.enable();
```

However, to make things more realistic, you can pass an array of products into the `enable` method in the same format as those returned by the original plugin, which will be used to populate `buy` dialogues, etc, for example:

```javascript

let productsIds =
[{
	productId: 'my.awesome.product',
	title: 'My Awesome Product',
	description: 'A super awesome product you definitely want to buy',
	currency: 'GBP',
	price: '£1.23',
	priceAsDecimal: 1.23
}];

inAppPurchaseSanbox.enable(productIds);
```

To clear any test purchases you've made, use:

```javascript
inAppPurchaseSanbox.reset();
```

That's it!

Released under BSD 3-Clause license.

Make a donation
---------------

If you find this project useful, why not buy us a coffee (or as many as you think it's worth)?

[![Make a donation](https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif)](http://bit.ly/2JsLDDE)
