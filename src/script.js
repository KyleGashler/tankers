const vehicles = require("../data/Vehicle");
const trucks = require("../data/Truck");
const containers = require("../data/Container");

console.log("\n-----------------------------");
console.log("🗂  Booster Fuel Inventory  🗂");
console.log("-----------------------------\n");

console.log("Example: node script.js\n");

const getTruck = () => {
  const truckWithContainers = trucks.map((truck) => {
    truck.containers = containers.filter(
      (containers) => containers.truckId === truck._id
    );
    return truck;
  });

  const truckToSend = truckWithContainers.find((truck) => {
    let isGood = false;

    for (const container of truck.containers) {
      if (container.currentLevel > 0) {
        isGood = true;
        break;
      }
    }

    if (isGood === true) return truck;
  });

  return truckToSend;
};

const sendTruck = (truck) => {
  return fuelVehicles(truck);
};

const fuelVehicles = (truck) => {
  let containerItterator = 0;
  let container = truck.containers[containerItterator];

  return vehicles.map((vehicle) => {
    retData = {
      vehicleId: vehicle._id,
      vehicleInfo: vehicle.info,
      transactions: [],
    };

    while (vehicle.gallons > 0) {
      console.log("vehicle.gallons", vehicle.gallons);
      const remainingFuelInTanker = container.currentLevel - vehicle.gallons;
      if (remainingFuelInTanker <= vehicle.gallons) {
        console.log("containerItterator", containerItterator);
        retData.transactions.push({
          gallons: remainingFuelInTanker,
          truckId: truck._id,
          containerId: truck.containers[containerItterator]._id,
        });
        containerItterator++;
        vehicle.gallons -= remainingFuelInTanker;
      } else {
        retData.transactions.push({
          gallons: vehicle.gallons,
          truckId: truck._id,
          containerId: truck.containers[containerItterator]._id,
        });
        vehicle.gallons = 0;
      }
    }

    return retData;
  });
};

const returnAndReport = (fuelingResult) => {
  console.log("vehicles fueled: ", JSON.stringify(fuelingResult, null, 2));
};

function main() {
  const truck = getTruck();
  const fuelingResult = sendTruck(truck);
  returnAndReport(fuelingResult);
}

main();
