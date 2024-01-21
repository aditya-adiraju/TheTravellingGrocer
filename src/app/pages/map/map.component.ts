import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MappedinLocation, MappedinDestinationSet, getVenue, showVenue } from "@mappedin/mappedin-js";
import { augmentedPolygonThings } from "./defaultThings";
import productData from "./products.json";

const options = {
  venue: "mappedin-demo-retail-2",
  clientId: "5eab30aa91b055001a68e996",
  clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1",
  things: augmentedPolygonThings // ensures polygon name is fetched
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


    const start = venue.locations.find((l) => l.name == "Entrance")!;

    const product1 = productData[1];
    const destination = venue.polygons.find((p) => p.name === product1.polygonName)!

    setTimeout(() => console.log(venue.polygons), 2000);

    const directions = start.directionsTo(destination);
    mapView.Journey.draw(directions, {pathOptions: {nearRadius: 0.5, farRadius: 0.7}});


    // const startLocation = venue.locations.find((l) => l.name == "Entrance")!;

    // //Create an array of locations to use as waypoints for a
    // //multi-destination journey.
    // const destinations = [
    //   venue.polygons.find((p) => p.name === productData[1].polygonName),
    //   // venue.polygons.find((p) => p.name === productData[2].polygonName),
    //   // venue.polygons.find((p) => p.name === productData[3].polygonName),
    //   // venue.polygons.find((p) => p.name === productData[4].polygonName)
    // ] as MappedinLocation[];

    // //Get directions from the start location to all destinations.
    // const directions = startLocation.directionsTo(new MappedinDestinationSet(destinations));

    // //Pass the directions to Journey to be drawn on the map.
    // //Set the paths as interactive so the user can click to
    // //highlight each leg in the journey.
    // mapView.Journey.draw(directions, {
    //   pathOptions: {
    //     nearRadius: 2.5,
    //     farRadius: 2.5
    //   },
    //   inactivePathOptions: {
    //     nearRadius: 2,
    //     farRadius: 2,
    //     color: "lightblue"
    //   }
    // });
  }

  @ViewChild("app", { static: false }) mapEl!: ElementRef<HTMLElement>;
}

