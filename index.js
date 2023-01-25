const inquirer = require("inquirer")

const Company = require("./classes/Company")
const Customer = require("./classes/Customer")
const Destination = require("./classes/Destination")
const Cruise = require("./classes/Cruise")
const Getaway = require("./classes/Getaway")


/*
  Let's load up some dummy data
*/

const customers = [
  new Customer("Sally", "111 Elm Street", "Cleveland", "sally@gmail.com", "2023-04-15", "10000"),
  new Customer("Barry", "123 Pine Street", "St Louis", "barry@gmail.com", "2023-07-10", "14000"),
  new Customer("Harry", "103 Spruce Street", "Peoria", "harry@gmail.com", "2023-09-01", "5000")
]

const destinations = [
  new Cruise("Jamaica At Sea", "blah blah blah", "2023-05-20", "2023-05-27", 6000, "Orlando", "Miami"),
  new Getaway("Climb Mt Everest", "blah blah blah", "2023-08-10", "2023-08-14", 12000, "LaGuardia", "Dulles")
]

const myCompany = new Company("Acme Travel", destinations, customers);


/*
  All the code above represents code we might have to support our travel agency. Each class is responsible 
  for the properties and methods specific to the entity it's in charge of.

  For instance: the Destination class is in charge of all data and methods that would be needed by any 
  Destination. If there's anything needed specifically for a cruise, the Cruise class handles it.

  Now, we'll use inquirer to bring our app to life.

*/


function bookTheTrip(dest){
  inquirer.prompt([
    {
      type: "input",
      message: "Great choice! Let's get you signed up. What's your name?",
      name: "name"
    },
    {
      type: "input",
      message: "What's your address?",
      name: "address"
    },
    {
      type: "input",
      message: "Please provide your city:",
      name: "city"
    },
    {
      type: "input",
      message: "And your email address:",
      name: "email"
    },
    {
      type: "input",
      message: "What date are you available?",
      name: "vacationDate"
    },
    {
      type: "list",
      message: `This trip will cost ${dest.cost}. Is that ok?`,
      choices: [ "Yes", "No" ],
      name: "okToBook"
    }
  ]).then( answerObj => {
    if( answerObj.okToBook === "No" ){
      inquirer.prompt([
        { 
          type: "list",
          message: "Bummer. Would you like to start over?",
          choices: [ "Yes", "No" ],
          name: "startOver"
        }
      ]).then( ({ startOver }) => {
        if( startOver === "Yes"){
          start()
        } else {
          process.exit();
        }
      })
    } else {
      const { name, address, city, email, vacationDate, budget } = answerObj
      myCompany.addCustomer( new Customer( name, address, city, email, vacationDate, budget ))
      inquirer.prompt([
        { 
          type: "list",
          message: "You're signed up! Would you like to start over?",
          choices: [ "Yes", "No" ],
          name: "startOver"
        }
      ]).then( ({ startOver }) => {
        if( startOver === "Yes"){
          start()
        } else {
          process.exit();
        }
      })
    }
  })
}


function planATrip(){
  inquirer.prompt([
    {
      type: "list",
      message: "Choose the destination you're interested in:",
      choices: myCompany.listDestinations(),
      name: "destination"
    }
  ]).then( answerObj => {
    const chosenDestination = myCompany.getDestination(answerObj.destination)
    bookTheTrip(chosenDestination)
  })
}


function lookupDestination(destName){
  const targetDest = myCompany.getDestination(destName)
  console.log(`
Here's what we found:
  ${targetDest.printInfo()}
`)
process.exit();
}



function getDestinations(){
  inquirer.prompt([
    {
      type: "list",
      message: "Choose the destination you're interested in:",
      choices: myCompany.listDestinations(),
      name: "destination"
    }
  ]).then( answerObj => {
    lookupDestination(answerObj.destination)
  })
}


function start(){
  inquirer.prompt([
    {
      type: "list",
      message: `Welcome to ${myCompany.name}! What would you like to do?`,
      choices: [ "See Destinations", "Plan A Trip", "Check Flight Status" ],
      name: "startOption"
    }
  ]).then( answerObj => {
    switch(answerObj.startOption){
      case "See Destinations":
        getDestinations();
        break;

      case "Plan A Trip":
        planATrip();
        break;

      case "Check Flight Status":
        checkFlight();
        break;

      default:
        start();
    }
  })
}


start();