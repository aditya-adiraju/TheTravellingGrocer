import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(private http:HttpClient) { }

  public sampleAPICall():Observable<any>{
    return this.http.get("https://random-word-api.herokuapp.com/all");
  }
}
