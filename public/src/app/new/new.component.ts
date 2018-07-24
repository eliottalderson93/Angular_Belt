import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newProduct : any;
  nameError : String;
  qtyError : String;
  priceError : String;
  frontName : String;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.newProduct = {name : "", num : 0, price : 0};
    this.nameError = "";
    this.qtyError = "";
    this.priceError = "";
  }
  reset(){
    this.newProduct = {name : "", num : 0, price : 0};
    this.nameError = "";
    this.qtyError = "";
    this.priceError = "";
  }
  submit(){
    console.log("submitting form");
      this._httpService.createNew(this.newProduct).subscribe(newProdObs =>{
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
          this.reset();
          this.back();
        }
      });
  }
  back(){
    let route = "products"
    this._router.navigate([route]);
  }
}
