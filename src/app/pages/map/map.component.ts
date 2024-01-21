import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MappedinDestinationSet, getVenue, showVenue } from "@mappedin/mappedin-js";
// import { augmentedPolygonThings } from "./defaultThings";
import productData from "./products.json";

const options = {
  venue: "mappedin-demo-retail-2",
  clientId: "5eab30aa91b055001a68e996",
  clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1",
  // things: augmentedPolygonThings // ensures polygon name is fetched
};

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  async ngOnInit(): Promise<void> {
    const venue = await getVenue(options);
    const mapView = await showVenue(this.mapEl.nativeElement, venue);

    const product1 = productData[1];
    const start = venue.polygons.find((p) => p.name === product1.polygonName)!
    // console.log(venue.polygons);
    // setTimeout((p) => console.log(venue.polygons), 2000);

    const product2 = productData[2];
    const destination = venue.polygons.find((p) => p.name === product2.polygonName)!;

    // const from = venue.locations.find((l) => l.name == "Entrance")!;
    const directions = start.directionsTo(destination);
    mapView.Journey.draw(directions);
  }

  @ViewChild("app", { static: false }) mapEl!: ElementRef<HTMLElement>;
}

