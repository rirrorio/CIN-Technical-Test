let bookingData = require("../data/bookings.json");
const dataName = "./data/bookings.json";
const helper = require("../helpers/helper.js");

function getBookings() {
  return new Promise((resolve, reject) => {
    if (bookingData.length === 0) {
      reject({
        message: "no bookings have been made",
        status: 202,
      });
    } else resolve(bookingData);
  });
}

function createBookings(newBookingData) {
  //   console.log(bookingData.length, bookingData[bookingData.length-1]);
  const id = { id: helper.getNewId(bookingData) };
  const newBookingDate = new Date(newBookingData.bookingDate);
  const newBookingHour = Number(newBookingData.bookingHour);
  const newBookingDuration = Number(newBookingData.bookingDuration);

  return new Promise((resolve, reject) => {
    // console.log(newBookingDate);
    for (let i = 0; i < bookingData.length; i++) {
      // console.log((bookingData[i]));
      // console.log( JSON.stringify(newBookingDate), JSON.stringify(newBookingDate)===JSON.stringify(new Date(bookingData[i].bookingDate)), JSON.stringify(new Date(bookingData[i].bookingDate)));
      if (
        JSON.stringify(newBookingDate) ===
        JSON.stringify(new Date(bookingData[i].bookingDate))
      ) {
        if (newBookingHour === bookingData[i].bookingHour) {
          reject({
            message: "false, room is occupied at this hour",
            status: 406,
          });
        } else if (
          newBookingHour + newBookingDuration >
          bookingData[i].bookingHour + bookingData[i].bookingDuration
        ) {
          reject({
            message: "false, room is still occupied from previous reservation",
            status: 406,
          });
        } else {
          newBookingData = {
            ...id,
            bookingDate: newBookingDate,
            bookingHour: newBookingHour,
            bookingDuration: newBookingDuration,
          };
          bookingData.push(newBookingData);
          helper.writeJSONFile(dataName, bookingData);
          resolve(newBookingData);
        }
      }
    }
  });
}
module.exports = {
  getBookings,
  createBookings,
};
