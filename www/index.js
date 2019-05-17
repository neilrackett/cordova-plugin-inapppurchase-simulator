'use strict';

var getPurchases = function()
{
	return JSON.parse(localStorage.getItem('inAppPurchaseSandbox_purchases')) || [];
};

var setPurchases = function(purchases)
{
	localStorage.setItem('inAppPurchaseSandbox_purchases', JSON.stringify(purchases));
};

var clearPurchases = function()
{
	localStorage.removeItem('inAppPurchaseSandbox_purchases');
};

/**
 * In-App Purchase Sandbox for conbo-plugin-inapppurchase
 * @author	Neil Rackett
 */
var inAppPurchaseSandbox =
{
	enable: function()
	{
		// inAppPurchase.getProducts = function(productIds) 
		
		inAppPurchase.buy = function(productId) 
		{
			return new Promise(function(resolve, reject)
			{
				navigator.notification.confirm
				(
					'Tap Buy to confirm your In-App Purchase of 1 '+productId+'\n\n'+
					'[Environment: Local]',

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
										transactionId: 'FAKE_TRANSACTION_'+Date.now(),
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

						reject('In-App Purchase cancelled');
					},

					'Confirm Your In-App Purchase',
					['Buy', 'Cancel']
				)
			});
		};
		
		inAppPurchase.subscribe = function(productId)
		{
			// TODO Implement this?
			return Promise.reject('cordova-plugin-inapppurchase-sandbox does not currently support subscribe');
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
			return Promise.reject('cordova-plugin-inapppurchase-sandbox does not currently support getReceipt');
		};
	},

	reset: function()
	{
		clearPurchases();
	},
};

module.exports = inAppPurchaseSandbox;
