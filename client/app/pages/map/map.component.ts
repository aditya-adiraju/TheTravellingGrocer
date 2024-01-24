import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  MappedinLocation,
  MappedinDestinationSet,
  getVenue,
  showVenue,
  MappedinPolygon,
  E_SDK_EVENT,
} from '@mappedin/mappedin-js';
import { augmentedPolygonThings } from './defaultThings';
// import pData from "./products.json";
import { DataService } from '../../../main';
import { ShoppingListComponent } from '../../shared/shopping-list/shopping-list.component';
import { ShoppingListManagerService } from 'client/app/services/shopping-list-manager.service';
import { RouteSolverService } from 'client/app/services/route-solver.service';
import { takeUntil } from 'rxjs';
import { GarbageCollectorComponent } from '../../shared/garbage-collector/garbage-collector.component';
import { solveTSP } from '../../utils/tsp';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

interface Product {
  name: string;
  description: string;
  price: number;
  polygonName: string;
}

const options = {
  venue: 'mappedin-demo-retail-2',
  clientId: '5eab30aa91b055001a68e996',
  clientSecret: 'RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1',
  things: augmentedPolygonThings, // ensures polygon name is fetched
};

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ShoppingListComponent, FormsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent extends GarbageCollectorComponent implements OnInit {
  venue: any;
  mapView: any;
  @ViewChild('app', { static: false }) mapEl!: ElementRef<HTMLElement>;
  productData: Product[] = [];
  itemOrder: number[] = [];

  constructor(
    private dataService: DataService,
    public shopService: ShoppingListManagerService,
    public routeSolver: RouteSolverService
  ) {
    super();
  }
  async getProductData() {
    this.productData = await lastValueFrom(this.dataService.getAllItems());
  }
  update() {
    this.updateMap(this.shopService.getAccessibleShoppingListValue());
  }

  test() {
    this.dataService.getAllItems().subscribe((data) => console.log(data));
  }

  reorderList(src: any[], order: number[]) {
    let newList = new Array();
    for (let i = 0; i < order.length; i++) {
      if (i == 0) continue;
      newList.push(src[order[i] - 1]);
    }
    return newList;
  }

  async updateMap(resultArray: any) {
    const startLocation = this.venue.locations.find(
      (l: any) => l.name == 'Entrance'
    )!;

    //Create an array of locations to use as waypoints for a
    //multi-destination journey.
    let destinations: MappedinPolygon[] = [];
    const products: string[] = [];
    for (let i = 0; i < resultArray.length; i++) {
      let product = this.productData.find(
        (w: any) => w.name === resultArray[i]
      );
      if (product) {
        products.push(product.name);
        destinations.push(
          this.venue.polygons.find((p: any) => p.name === product?.polygonName)!
        );
      }
    }

    const result = this.calculateDistances(products, this.venue);

    const order = solveTSP(result);

    this.routeSolver.updateSolvedRoute(result);


    destinations = this.reorderList(destinations, this.itemOrder);

    //Get directions from the start location to all destinations.
    const directions = startLocation.directionsTo(
      new MappedinDestinationSet(destinations)
    );

    //Pass the directions to Journey to be drawn on the map.
    //Set the paths as interactive so the user can click to
    //highlight each leg in the journey.
    this.mapView.Journey.draw(directions, {
      pathOptions: {
        nearRadius: 0.5,
        farRadius: 0.7,
      },
      inactivePathOptions: {
        nearRadius: 0.4,
        farRadius: 0.4,
        color: 'lightblue',
      },
    });

    //Clickable functionality here
    let step = 0;
    this.mapView.on(E_SDK_EVENT.CLICK, (payload: any) => {
      const currentStep = step % destinations.length;
      if (destinations[currentStep].map !== this.mapView.currentMap) {
        this.mapView.setMap(destinations[currentStep].map);
      } else {
        this.mapView.Journey.setStep(++step % destinations.length);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.venue = await getVenue(options);
    this.mapView = await showVenue(this.mapEl.nativeElement, this.venue);
    this.getProductData();
    let resultArray = new Array();
    this.shopService
      .getAccessibleShoppingList()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((list) => {
        this.updateMap(list);
      });
    this.routeSolver
      .getSolvedRoute()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((ord) => {
        this.itemOrder = ord;
      });

    this.routeSolver.updateSolvedRoute(
      this.calculateDistances(
        this.productData.map((product) => product.name),
        this.venue
      )
    );
  }

  private calculateDistances(products: string[], venue: any) {
    const size = products.length + 1;
    let twoDArray: number[][] = Array.from({ length: size }, () =>
      Array(size).fill(0)
    );

    //Initialize first row/column based on entrance
    let i = 0;
    let start = venue.locations.find((l: any) => l.name == 'Entrance')!;
    for (let j = i + 1; j < size; j++) {
      let product2 = this.productData.find(
        (w: any) => w.name === products[j - 1]
      );
      let end = venue.polygons.find(
        (p: any) => p.name === product2?.polygonName
      );

      let directionsDistance = start?.directionsTo(end!).distance!;
      twoDArray[i][j] = directionsDistance;
      twoDArray[j][i] = directionsDistance;
    }

    //Find rest of distances of products to other products
    for (let i = 1; i < size; i++) {
      let product1 = this.productData.find(
        (v: any) => v.name === products[i - 1]
      );
      let start = venue.polygons.find(
        (p: any) => p.name === product1?.polygonName
      );
      for (let j = i + 1; j < size; j++) {
        let product2 = this.productData.find(
          (w: any) => w.name === products[j - 1]
        );
        let end = venue.polygons.find(
          (p: any) => p.name === product2?.polygonName
        );

        let directionsDistance = start?.directionsTo(end!).distance!;
        twoDArray[i][j] = directionsDistance;
        twoDArray[j][i] = directionsDistance;
      }
    }
    return twoDArray;
  }
}
