const defaultThings = {
    venue: [
      "slug",
      "name",
      "defaultMap",
      "metadata",
      "countrycode",
      "tzid",
      "logo",
      "externalId"
    ],
    nodes: ["externalId", "x", "y", "paths", "accessible", "operationHours"],
    vortexes: ["externalId", "nodes", "types", "accessible"],
    polygons: [
      "vertexes",
      "geometry",
      "canvasBounds",
      "layer",
      "externalId",
      "entrances"
    ],
    locations: [
      "externalId",
      "name",
      "type",
      "picture",
      "description",
      "icon",
      "logo",
      "sortOrder",
      "phone",
      "operationHours",
      "social",
      "color",
      "toMap",
      "tags",
      "shortName",
      "detailsUrl",
      "locationState",
      "metadata",
      "siblingGroups",
      "gallery",
      "showSmartLabelWhenImagePresent"
    ],
    categories: ["name", "color", "sortOrder", "parents"],
    maps: [
      "name",
      "elevation",
      "height",
      "width",
      "layers",
      "shortName",
      "scene",
      "group",
      "x_scale"
    ],
    mapGroups: ["name"],
    themes: ["name", "themeData"],
    rankings: ["polygons"]
  };
  
  export const augmentedPolygonThings = {
    ...defaultThings,
    polygons: [...defaultThings.polygons, "name"]
  };
  