import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  allProducts : any[any];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.allProducts = [];
    this._httpService.findAll().subscribe(all=>{
      console.log("found all products: ",all);
      this.allProducts = all['data'];
    });
  }
  createRoute(){
    let route = "products/new";
    this._router.navigate([route]);
  }
  detailsRoute(id : String){
    let route = "product/" + id;
    this._router.navigate([route]);
  }
  editRoute(id : String){
    let route = "product/"+id+"/edit";
    this._router.navigate([route]);
  }
}
