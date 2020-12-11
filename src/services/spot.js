import axios from "axios";

const spotService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/spots`,
});

export function getAllSpots() {
  //after .get is a path to the server, that I will need to deal with on server side
  return spotService.get("/").then((res) => res.data);
}

// export function getSinlgeSpot(id) {
//   return spotService.get(`/${id}`).then((res) => res.data);
// }
