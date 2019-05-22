'use strict';

var _products;

function getProduct(productId)
{
	var products = _products.filter(function(product)
	{
		return product.productId == productId;
	});

	var product = products.pop();

	return product || {
		productId: productId,
		title: productId,
		description: 'Simulated product',
		currency: 'GBP',
		price: '£0.00',
		priceAsDecimal: 0
	}
}

function getPurchases()
{
	return JSON.parse(localStorage.getItem('inAppPurchaseSimulator_purchases')) || [];
}

function setPurchases(purchases)
{
	localStorage.setItem('inAppPurchaseSimulator_purchases', JSON.stringify(purchases));
}

function clearPurchases()
{
	localStorage.removeItem('inAppPurchaseSimulator_purchases');
}

/**
 * In-App Purchase Sandbox for conbo-plugin-inapppurchase
 * @author	Neil Rackett
 */
var inAppPurchaseSimulator =
{
	autoEnable: function(products)
	{
		var enabled = cordova.platformId == 'browser' || device.isVirtual;

		if (enabled)
		{
			this.enable(products);
		}

		return enabled;
	},

	enable: function(products)
	{
		// To enable testing on unsupported platforms, like "browser"
		window.inAppPurchase || (window.inAppPurchase = {});

		_products = products || [];

		inAppPurchase.getProducts = function(productIds)
		{
			return new Promise(function(resolve, reject)
			{
				if (!productIds)
				{
					return reject('');
				}

				resolve(productIds.map(function(productId)
				{
					return getProduct(productId);
				}));
			});
		};
		
		inAppPurchase.buy = function(productId) 
		{
			var product = getProduct(productId);

			return new Promise(function(resolve, reject)
			{
				navigator.notification.confirm
				(
					'Tap Buy to confirm your In-App Purchase of 1 '+product.title+' for '+product.price+'.\n\n'+
					'This is a simulated purchase, you will not be charged.',

					function(choice)
					{
						if (choice == 1) 
						{
							var purchases = getPurchases();

							purchases.push
							({
								productId: productId,
								state: 0,
								transactionId: '',
								date: Date.now(),
								productType: '',
								receipt: productId,
								signature: ''
							});

							setPurchases(purchases);

							navigator.notification.alert
							(
								'Your purchase was successful.',
								function() 
								{
									resolve
									({
										transactionId: 'SIMULATED_TRANSACTION_'+Date.now(),
										receipt: productId,
										signature: '',
										productType: ''
									}); 
								},
								'You\'re all set',
								'OK'
							);

							return;
						}

						reject({errorMessage:'User cancelled in-app purchase', errorCode:2});
					},

					'Confirm Your In-App Purchase',
					['Buy', 'Cancel']
				)
			});
		};
		
		inAppPurchase.subscribe = function(productId)
		{
			// TODO Implement this?
			return Promise.reject('cordova-plugin-inapppurchase-simulator does not currently support subscribe');
		};
		
		inAppPurchase.consume = function(type, receipt, signature) 
		{
			setPurchases(getPurchases().filter(function(purchase) 
			{
				return purchase.productId != receipt;
			}));
			
			return Promise.resolve();
		};
		
		inAppPurchase.restorePurchases = function() 
		{
			return Promise.resolve(getPurchases());
		};
		
		inAppPurchase.getReceipt = function () 
		{
			// TODO Implement this?
			return Promise.reject('cordova-plugin-inapppurchase-simulator does not currently support getReceipt');
		};
	},

	reset: function()
	{
		clearPurchases();
	},
};

module.exports = inAppPurchaseSimulator;
