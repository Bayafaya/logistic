import fetch from 'node-fetch';


const apiKey = 'AIzaSyAN_1dWOjuPERsKQV7Y60qaglq_7_IBYOw';
// const origin = 'Bishkek';
// const destination = 'Moscow';


// function getFakeDuration(origin, destination, duration) {
//   return duration;
// }

function getDuration(origin, destination) {
  return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const route = data.routes[0];
    const startAddress = route.legs[0].start_address;
    const endAddress = route.legs[0].end_address;
    const duration = route.legs[0].duration.value;

    console.log(`${startAddress} -> ${endAddress}: ${duration}`);

    return duration;
  })
  .catch(error => {
    console.log('Произошла ошибка при получении данных:', error);
  });
}
// getDuration();

function sumArray(arr) {
  let total = 0;
  arr.forEach((num) => {
    total += num;
  })
  return total;
}

function computeCapacity(driver, race) {
  return driver.truckCapacity - sumArray(race.map((order) => order.weight));
}

function computeVolume(driver, race) {
  return driver.truckVolume - sumArray(race.map((order) => order.volume));
}

function getLastOrder(race) {
  let lastOrder = race[0];
  race.forEach((order) => {
    if (order.toDate > lastOrder.toDate) {
      lastOrder = order;
    }
  })
  return lastOrder;
}

function getNextOrder(currentOrder, race) {
  const nextOrders = race.filter((order) => currentOrder.fromDate < order.toDate);
  let nextOrder = nextOrders[0];
  nextOrders.forEach((order) => {
    if (order.toDate < nextOrder.toDate) {
      nextOrder = order;
    }
  })
  return nextOrder;
}

function getSeconds(date, hours, minutes) {
  const result = new Date(date);
  result.setHours(hours);
  result.setMinutes(minutes);
  return result.getTime() / 1000;
}

// const order1 = {
//   fromLocation: 'Flagstaff Unified District, Arizona, USA',
//   toLocation: 'North Lake School District 14, Oregon, USA',
//   weight: 30,
//   volume: 30,
//   fromDate: getSeconds('05.02.2023', 9, 0),
//   toDate: getSeconds('05.03.2023', 6, 30),
// }
const order1 = {
  fromLocation: 'Flagstaff Unified District, Arizona, USA',
  toLocation: 'North Lake School District 14, Oregon, USA',
  weight: 50,
  volume: 30,
  fromDate: getSeconds('05.03.2023', 17, 44),
  toDate: getSeconds('05.03.2023', 6, 30),
}

const order2 = {
  fromLocation: 'Hoehne Reorganized School District 3, Colorado, USA',
  toLocation: 'North Lake School District 14, Oregon, USA',
  weight: 50,
  volume: 50,
  fromDate: getSeconds('05.02.2023', 0, 0),
  toDate: getSeconds('05.03.2023', 1, 24),
}

const currentTime = getSeconds('05.02.2023', 0, 0);

const drivers = [
  {
    activeRaces: [[order2]],
    // currentLocation: 'Big Bow, Kansas 67855, USA',
    currentLocation: 'Hoehne Reorganized School District 3, Colorado, USA',
    truckCapacity: 100,
    truckVolume: 100,
  }
];

for (const driver of drivers) {
  let raceThatCanCarry = null;

  for (const race of driver.activeRaces) {
    const lastOrder = getLastOrder(race);

    if (lastOrder) {
      const fitRace = lastOrder.toDate > order1.fromDate;
      if (!fitRace) {
        continue;
      }
    }
  
    const truckCapacity = computeCapacity(driver, race);
    const truckVolume = computeVolume(driver, race);
  
    const fitWeight = truckCapacity >= order1.weight;
    const fitVolume = truckVolume >= order1.volume;
  
    if (!fitWeight || !fitVolume) {
      continue;
    }
  
    // const durationToOrder = getFakeDuration(race.currentLocation, order1.fromLocation, 152800);
    const durationToOrder = await getDuration(driver.currentLocation, order1.fromLocation);
    const arrivalDate = currentTime + durationToOrder;
    const catchOrder = arrivalDate <= order1.fromDate;
  
    if (!catchOrder) {
      continue;
    }
  
    const nextOrder = getNextOrder(order1, race);
    if (nextOrder) {
      // const durationToNextOrder = getFakeDuration(order1.fromLocation, nextOrder.toLocation, 172800);
      const durationToNextOrder = await getDuration(order1.fromLocation, nextOrder.toLocation);
      const arrivalDate = order1.fromDate + durationToNextOrder;
      const catchNextOrder = arrivalDate <= nextOrder.toDate;
  
      if (!catchNextOrder) {
        continue;
      }
    }

    raceThatCanCarry = race;
  }

  console.log('raceThatCanCarry', raceThatCanCarry);

  if (!raceThatCanCarry) {
    const lastOrder = getLastOrder(driver.activeRaces[driver.activeRaces.length - 1]);
    const durationToOrder = await getDuration(lastOrder.toLocation, order1.fromLocation);
    const arrivalDate = lastOrder.toDate + durationToOrder;
    const catchOrder = arrivalDate <= order1.fromDate;
    console.log('canCarryInNextRace', catchOrder);
  }
}




// import fetch from 'node-fetch';


// const apiKey = 'AIzaSyAN_1dWOjuPERsKQV7Y60qaglq_7_IBYOw';
// // const origin = 'Bishkek';
// // const destination = 'Moscow';


// // function getFakeDuration(origin, destination, duration) {
// //   return duration;
// // }

// function getDuration(origin, destination) {
//   return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`)
//   .then(response => response.json())
//   .then(data => {
//     const route = data.routes[0];
//     const startAddress = route.legs[0].start_address;
//     const endAddress = route.legs[0].end_address;
//     const duration = route.legs[0].duration.value;

//     console.log(`${startAddress} -> ${endAddress}: ${duration}`);

//     return duration;
//   })
//   .catch(error => {
//     console.log('Произошла ошибка при получении данных:', error);
//   });
// }
// // getDuration();

// function sumArray(arr) {
//   let total = 0;
//   arr.forEach((num) => {
//     total += num;
//   })
//   return total;
// }

// function computeCapacity(driver) {
//   return driver.truckCapacity - sumArray(driver.activeOrders.map((order) => order.weight));
// }

// function computeVolume(driver) {
//   return driver.truckVolume - sumArray(driver.activeOrders.map((order) => order.volume));
// }

// function getLastOrder(driver) {
//   let lastOrder = driver.activeOrders[0];
//   driver.activeOrders.forEach((order) => {
//     if (order.toDate > lastOrder.toDate) {
//       lastOrder = order;
//     }
//   })
//   return lastOrder;
// }

// function getNextOrder(driver) {
//   let nextOrder = driver.activeOrders[0];
//   driver.activeOrders.forEach((order) => {
//     if (order.toDate < nextOrder.toDate) {
//       nextOrder = order;
//     }
//   })
//   return nextOrder;
// }

// function getSeconds(date, hours, minutes) {
//   const result = new Date(date);
//   result.setHours(hours);
//   result.setMinutes(minutes);
//   return result.getTime() / 1000;
// }

// const order1 = {
//   fromLocation: 'Flagstaff Unified District, Arizona, USA',
//   toLocation: 'North Lake School District 14, Oregon, USA',
//   weight: 30,
//   volume: 30,
//   fromDate: getSeconds('05.02.2023', 9, 0),
//   toDate: getSeconds('05.03.2023', 6, 30),
// }

// const order2 = {
//   fromLocation: 'Hoehne Reorganized School District 3, Colorado, USA',
//   toLocation: 'North Lake School District 14, Oregon, USA',
//   weight: 50,
//   volume: 50,
//   fromDate: getSeconds('05.02.2023', 0, 0),
//   toDate: getSeconds('05.03.2023', 1, 24),
// }

// const currentTime = getSeconds('05.02.2023', 0, 0);

// const drivers = [
//   {
//     activeOrders: [order2],
//     // currentLocation: 'Big Bow, Kansas 67855, USA',
//     currentLocation: 'Hoehne Reorganized School District 3, Colorado, USA',
//     truckCapacity: 100,
//     truckVolume: 100,
//   }
// ];

// const bestDrivers = [];

// drivers.forEach(async (driver) => {
//   const inCurrentRace = '';
//   console.log('inCurrentRace', inCurrentRace);

//   const truckCapacity = computeCapacity(driver);
//   const truckVolume = computeVolume(driver);

//   const fitWeight = truckCapacity >= order1.weight;
//   const fitVolume = truckVolume >= order1.volume;

//   if (!fitWeight || !fitVolume) {
//     return;
//   }

//   // const durationToOrder = getFakeDuration(driver.currentLocation, order1.fromLocation, 152800);
//   const durationToOrder = await getDuration(driver.currentLocation, order1.fromLocation);
//   const arrivalDate = currentTime + durationToOrder;
//   const catchOrder = arrivalDate <= order1.fromDate;

//   if (!catchOrder) {
//     return;
//   }

//   const nextOrder = getNextOrder(driver);
//   if (nextOrder) {
//     // const durationToNextOrder = getFakeDuration(order1.fromLocation, nextOrder.toLocation, 172800);
//     const durationToNextOrder = await getDuration(order1.fromLocation, nextOrder.toLocation);
//     const arrivalDate = order1.fromDate + durationToNextOrder;
//     const catchNextOrder = arrivalDate <= nextOrder.toDate;

//     if (!catchNextOrder) {
//       return;
//     }
//   }

//   bestDrivers.push(driver);

//   console.log(bestDrivers);
// });
