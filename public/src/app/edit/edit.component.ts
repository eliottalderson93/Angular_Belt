import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  oldProduct : any;
  editProduct : any;
  nameError : String;
  qtyError : String;
  priceError : String;
  routeID : String;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    //initialize so no error on load
    this.routeID = "";
    this.oldProduct = {name : "",num:0,price:0};
    this.editProduct = {name : "",num:0,price:0};
    //find parameter then find product
    this._route.params.subscribe((params: Params) => {
      console.log("route parameter ID: ",params['ID'])
      this.routeID = params['ID'];
      this._httpService.findOne(this.routeID).subscribe(prod =>{
        console.log("found product: ",prod);
        this.oldProduct = prod['data'];
        if(prod['message'] !== "Success"){
          this.back(); //redirect if json responds with anything but success
        }
        console.log("oldProduct:",this.oldProduct);
      })
    });
    this._route.params.subscribe((params: Params) => {
      console.log("route parameter ID: ",params['ID'])
      this.routeID = params['ID'];
      this._httpService.findOne(this.routeID).subscribe(prod =>{
        console.log("found product: ",prod);
        this.editProduct = prod['data'];

        if(prod['message'] !== "Success"){
          this.back(); //redirect if json responds with anything but success
        }
        console.log("editProduct:",this.editProduct);
      })
    });
    this.nameError = "";
    this.qtyError = "";
    this.priceError = "";
  }
  submit(){
    console.log("submitting form for edit: ",this.routeID);
      this._httpService.editOne(this.editProduct,this.routeID).subscribe(newProdObs =>{
        console.log("posted product: ",newProdObs);
        if(newProdObs['message'] == "saveError"){
          //validation error
          if(newProdObs['error'].errors.name){
            this.nameError = newProdObs['error'].errors.name.message;
          }
          if(newProdObs['error'].errors.num){
            this.qtyError = newProdObs['error'].errors.num.message;
          }
          if(newProdObs['error'].errors.price){
            this.priceError = newProdObs['error'].errors.price.message;
          }
        }
        else{ //success
          //this.reset();
          this.back();
        }
      });
  }
  reset(){
    console.log("old editProduct:",this.editProduct);
    this.editProduct = this.oldProduct;
    console.log("new editProduct:",this.editProduct);
    this.nameError = "";
    this.qtyError = "";
    this.priceError = "";
  }
  back(){
    let route = "products"
    this._router.navigate([route]);
  }
}
