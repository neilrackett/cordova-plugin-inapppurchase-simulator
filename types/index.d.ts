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

	function enable(products?:IProduct[]):void;
	function reset():void;
}
