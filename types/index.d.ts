/**
 * In-app purchase simulator for testing apps that use cordova-plugin-inapppurchase
 * @author	Neil Rackett
 */
declare namespace inAppPurchaseSimulator
{
	/**
	 * Product descriptor
	 */
	interface IProduct
	{
		productId:string;
		title:string;
		description:string;
		currency:string;
		price:string;
		priceAsDecimal:number;
	}

	/**
	 * Enables the IAP simulator if the app is running in a browser or a simulator/emulator
	 */
	function autoEnable(products?:IProduct[]):boolean;

	/**
	 * Enables the IAP simulator
	 */
	function enable(products?:IProduct[]):void;
	
	/**
	 * Clears all test purchases stored in the simulator
	 */
	function reset():void;
}
