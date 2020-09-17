export const LIST_BRANCHES = `
query ($latitude: String, $longitude: String) {
  branches(latitude: $latitude, longitude: $longitude) {
    id
    latitude
    longitude
    name
    company {
      type
      name
    }
  }
}`;
