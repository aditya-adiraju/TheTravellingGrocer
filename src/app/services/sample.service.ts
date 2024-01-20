import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor() { }

  public sampleAPICall(){
    // return http.get("https://random-word-api.herokuapp.com/all");
  }
}
