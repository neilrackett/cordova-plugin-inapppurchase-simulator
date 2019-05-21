declare namespace inAppPurchaseSimulator
{
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
	function autoEnable():boolean;

	/**
	 * Enables the IAP simulator
	 */
	function enable(products?:IProduct[]):void;
	
	/**
	 * Clears all user purchases stored in the simulator
	 */
	function reset():void;
}
