In-App Purchase Sandbox plugin for Cordova
==========================================

This is a simple Cordova plugin that overrides and approximates the following methods of `cordova-plugin-inapppurchase` to enable developers to test their in-app purchase workflow in a local sandbox with the minimum of effort on Android and iOS devices:

```javascript
inAppPurchase.buy(productId);
inAppPurchase.subscribe(productId); // Not currently implemented
inAppPurchase.consume(type, receipt, signature);
inAppPurchase.restorePurchases();
inAppPurchase.getReceipt(); // Not currently implemented
```

Installation
------------

```
cordova plugin add cordova-plugin-inapppurchase-sandbox
```

Use
---

To enable the local sandbox, add the following command in your `"deviceready"` event handler:

```javascript
inAppPurchaseSanbox.enable();
```

To clear any test purchases you've made, add:

```javascript
inAppPurchaseSanbox.reset();
```

That's it!

Make a donation
---------------

If you find this project useful, why not buy us a coffee (or as many as you think it's worth)?

[![Make a donation](https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif)](http://bit.ly/2JsLDDE)
