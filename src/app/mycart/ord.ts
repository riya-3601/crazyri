export class Ord{
  constructor(public order_date :number,public order_status : string,public order_paymenttype:string,public order_totalamount:number,public fk_customer_id:string,public fk_address_id:number,
    public customer_id?:number,public customer_emailid?:string,public customer_password?:string,public customer_name?:string,public customer_gender?: string,public customer_mobileno?:number){}
}
