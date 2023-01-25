

class Company {
  constructor(name, destinations, customers){
    this.name = name;
    this.destinations = destinations;
    this.customers = customers;
  }

  sendMessage(customer, msg){
    // access some outside process for sending mail to the customer
  }

  addCustomer(customer){
    this.customers.push(customer)
  }

  listDestinations(){
    return this.destinations.map( dest => dest.name )
  }

  getDestination(name){
    return this.destinations.find( dest => dest.name === name )
  }
}

module.exports = Company