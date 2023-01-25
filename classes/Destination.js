

class Destination {
  constructor(name, description, type, startDate, endDate, cost){
    this.name = name;
    this.description = description;
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
    this.cost = cost;
    this.travelers = [];
  }

  printInfo(){
    return `
  Name: ${this.name},
  Description: ${this.description},
  Start Date: ${this.startDate},
  End Date: ${this.endDate},
  Cost: ${this.cost}
  `
  }

  addTraveller(traveller){
    this.travelers.push(traveller)
  }
}

module.exports = Destination;