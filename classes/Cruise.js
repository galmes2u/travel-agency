const Destination = require("./Destination");

class Cruise extends Destination {
  constructor(name, description, startDate, endDate, cost, startPort, endPort){
    super(name, description, "cruise", startDate, endDate, cost)
    this.startPort = startPort;
    this.endPort = endPort;
  }
}

module.exports = Cruise