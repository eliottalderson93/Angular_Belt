import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product : any;
  routeID : String;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    //initialize so no errors on load
    this.product = {name : "", num:0,price:0};
    this._route.params.subscribe((params: Params) => {
      console.log("route parameter ID: ",params['ID'])
      this.routeID = params['ID'];
      this._httpService.findOne(this.routeID).subscribe(prod =>{
        console.log("found product: ",prod);
        if(prod['message'] !== "Success"){
          this.back(); //redirect if json responds with anything but success
        }
        else{
          this.product = prod['data'];
        }
      });
    });
  }
  back(){
    let route = "products"
    this._router.navigate([route]);
  }
  delete(id : String){
    this._httpService.deleteOne(id).subscribe(deleted =>{
      console.log("deleted product: ",deleted);
      this.back();
    });
  }
}
