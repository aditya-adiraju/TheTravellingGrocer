import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MappedinLocation, MappedinDestinationSet, getVenue, showVenue, MappedinPolygon, E_SDK_EVENT, Mappedin, MapView } from "@mappedin/mappedin-js";
import { augmentedPolygonThings } from "./defaultThings";
import productData from "./products.json";
import {DataService} from "../../../main";
import {ShoppingListComponent} from "../../shared/shopping-list/shopping-list.component";
import { ShoppingListManagerService } from 'client/app/services/shopping-list-manager.service';
import {takeUntil} from "rxjs";
import {GarbageCollectorComponent} from "../../shared/garbage-collector/garbage-collector.component";

const options = {
  venue: "mappedin-demo-retail-2",
  clientId: "5eab30aa91b055001a68e996",
  clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1",
  things: augmentedPolygonThings // ensures polygon name is fetched
};

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    ShoppingListComponent
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent extends GarbageCollectorComponent implements OnInit {
  @ViewChild("app", { static: false }) mapEl!: ElementRef<HTMLElement>;
  constructor(private dataService: DataService, public shopService:ShoppingListManagerService){
    super();
  }
  test(){
    this.dataService.getAllItems().subscribe((data)=>console.log(data))
  }

  async ngOnInit(): Promise<void> {
    const venue = await getVenue(options);
    const mapView = await showVenue(this.mapEl.nativeElement, venue);


    // resultArray = ["Unico Pasta Sauce, Original", "Tortillas", "Cadbury Caramilk Dome Cake"]; TEST 

    const innerHelper = (products: string[]) => {
    // //SAMPLE STRING
    // let products: string[] = ["Unico Pasta Sauce, Original", "Tortillas", "Cadbury Caramilk Dome Cake"];

    //Size of 2D array is length +1 so for the starting entrance
    let twoDArray: number[][] = this.calculateDistances(products, venue);

    console.log(twoDArray);
    let inputArray: number[] = []; 
    this.dataService.getOptimalRoute(twoDArray).subscribe((data)=>{
      // this.drawMap(data, twoDArray, products, venue, mapView)
      console.log(data);
    })

  }
  this.shopService.getAccessibleShoppingList().pipe(
    takeUntil(this.unsubscribe)
  ).subscribe((list)=>{
    innerHelper(list);
  });

}


  private drawMap(inputArray: number[], twoDArray: number[][], products: string[], venue: Mappedin, mapView: MapView) {
    let resultArray = new Array();

    //Turn the list of distance values into a list of items based on the 2D array
    let startIndex = 0;
    for (let i = 0; i < inputArray.length; i++) {
      startIndex = twoDArray[startIndex].findIndex((num) => num == inputArray[i]);
      resultArray.push(products[startIndex - 1]);
    }

    console.log(resultArray);


    const startLocation = venue.locations.find((l) => l.name == "Entrance")!;

    //Create an array of locations to use as waypoints for a
    //multi-destination journey.
    let destinations: MappedinPolygon[] = [];
    for (let i = 0; i < resultArray.length; i++) {
      let product = productData.find((w: any) => w.name === resultArray[i]);
      destinations.push(venue.polygons.find((p) => p.name === product?.polygonName)!);
    }

    console.log(destinations);


    //Get directions from the start location to all destinations.
    const directions = startLocation.directionsTo(new MappedinDestinationSet(destinations));

    //Pass the directions to Journey to be drawn on the map.
    //Set the paths as interactive so the user can click to
    //highlight each leg in the journey.
    mapView.Journey.draw(directions, {
      pathOptions: {
        nearRadius: 0.5,
        farRadius: 0.7
      },
      inactivePathOptions: {
        nearRadius: 0.4,
        farRadius: 0.4,
        color: "lightblue"
      }
    });

    //Clickable functionality here
    let step = 0;
    mapView.on(E_SDK_EVENT.CLICK, (payload) => {
      const currentStep = step % destinations.length;
      if (destinations[currentStep].map !== mapView.currentMap) {
        mapView.setMap(destinations[currentStep].map);
      } else {
        mapView.Journey.setStep(++step % destinations.length);
      }
    });
  }

  private calculateDistances(products: string[], venue: Mappedin) {
    const size = products.length + 1;
    let twoDArray: number[][] = Array.from({ length: size }, () => Array(size).fill(0));

    //Initialize first row/column based on entrance
    let i = 0;
    let start = venue.locations.find((l) => l.name == "Entrance")!;
    for (let j = i + 1; j < size; j++) {
      let product2 = productData.find((w: any) => w.name === products[j - 1]);
      let end = venue.polygons.find((p) => p.name === product2?.polygonName);

      let directionsDistance = start?.directionsTo(end!).distance!;
      twoDArray[i][j] = directionsDistance;
      twoDArray[j][i] = directionsDistance;
    }

    //Find rest of distances of products to other products
    for (let i = 1; i < size; i++) {
      let product1 = productData.find((v: any) => v.name === products[i - 1]);
      let start = venue.polygons.find((p) => p.name === product1?.polygonName);
      for (let j = i + 1; j < size; j++) {
        let product2 = productData.find((w: any) => w.name === products[j - 1]);
        let end = venue.polygons.find((p) => p.name === product2?.polygonName);

        let directionsDistance = start?.directionsTo(end!).distance!;
        twoDArray[i][j] = directionsDistance;
        twoDArray[j][i] = directionsDistance;
      }
    }
    return twoDArray;
  }
}

