const Board = require("./lib/board");
const Column = require("./lib/column");
const Ticket = require("./lib/ticket");

const myBoard = new Board();
const colLength = myBoard.columns.length;
myBoard.addTicket(new Ticket("test"));
myBoard.addTicket(new Ticket("test1"), Column.STATUS.done);
myBoard.addTicket(new Ticket("test2"), Column.STATUS.todo);
myBoard.addTicket(new Ticket("test3"), Column.STATUS.todo);


//get max length out of all columns
function largestColumn(columns) {
  let longest = 0;

  columns.forEach((column) => {
    let currentLen = column.tickets.length;
    if (currentLen > longest) {
      longest = currentLen;
    }
  });

  return longest;
}

//given largest amount of rows, create an array of sub arrays
//each element is an array that represents a single row
  //each element within the sub array represents a ticket within the cooresponding column
function retrieveRows(maxRows, columns) {
  //declare a counter starting at 0
  //declare a return array
  //create a loop that will end only when counter goes over maxrows
  //declare a subarray that is empty initially
  //iterate over the columns array
    //for each column use its tickests array
    //append the ticket in index of counter to the subarray
      //if doesn't exist, append null or undefined
    //increment counter
  //return array
  let counter = 0;
  const rows = [];

  while (counter < maxRows) {
    let row = [];

    for (let index = 0; index < columns.length; index += 1) {
      let column = columns[index];
      let ticket = column.tickets[counter];

      row.push(ticket);
    }

    rows.push(row);
    counter += 1;
  }

  return rows;
}

console.log(largestColumn(myBoard.columns));
console.log(retrieveRows(largestColumn(myBoard.columns), myBoard.columns));