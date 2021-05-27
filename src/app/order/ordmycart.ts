export class Ordmycart{
  constructor(public order_id:number,public order_date :string,public order_status : string,public order_paymenttype:string,public order_totalamount:number,public fk_customer_id?:number,
    public customer_id?:number,public customer_emailid?:string,public customer_password?:string,public customer_name?:string,public customer_gender?: string,public customer_mobileno?:number,
    public orderdetails_id?:number,public orderdetails_quantity?:number,public fk_order_id?:number,public fk_book_id?:number,
    public book_id?:number,public book_isbn?:number,public book_title ?: string,public book_author?:string,public book_price?:number,public book_publisher?:string,public book_ratings?:number,public book_image?:string,
    public employee_id?:number,public employee_name?:string,public employee_mobileno?:number,public employee_password?:string,
    public delivery_id?:number,public delivery_status?:string,public fk_employee_id?:number,
    public address_id?:number,public address_1?:string,public address_2?:string,public city?:string,public state?:string,public pincode?:number,public address_type?:string){}
}
