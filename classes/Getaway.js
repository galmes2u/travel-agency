const Destination = require("./Destination");

class Getaway extends Destination {
  constructor(name, description, startDate, endDate, cost, startAirport, endAirport){
    super(name, description, "getaway", startDate, endDate, cost)
    this.startAirport = startAirport;
    this.endAirport = endAirport;
  }

  checkFlightStatus(){
    // calls some outside function based on the airport
  }
}

module.exports = Getaway;