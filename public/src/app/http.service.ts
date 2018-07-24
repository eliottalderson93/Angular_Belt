import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  allRoot : string;
  oneRoot : string;
  constructor(
    private _http: HttpClient
  ) {
    this.allRoot = "/server/products";
    this.oneRoot = "/server/product";
    }
    //API/server calls and return obs here  
    findAll(){
      let obs = this._http.get(this.allRoot);
      return obs;
    }
    findOne(ID : String){
      let route = this.oneRoot + "/" + ID;
      let obs = this._http.get(route);
      return obs;
    }
    createNew(postData){
      let route = this.oneRoot + "/new"
      let obs = this._http.post(route,postData);
      return obs;
    }
    editOne(putData, ID : String){
      let route = this.oneRoot + "/" + ID + "/edit";
      let obs = this._http.put(route,putData);
      return obs;
    }
    deleteOne(ID : String){
      let route = this.oneRoot + "/" + ID + "/delete";
      let obs = this._http.delete(route);
      return obs;
    }
}