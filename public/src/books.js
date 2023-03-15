function findAuthorById(authors, id) {
  /**use the find method to loop through the authors array and return
  the first result that matches the id**/
  let author = authors.find((item) => item.id === id);
  //return the author
  return author;
}

function findBookById(books, id) {
  /**use the find method to loop through the books array and return
  the first result that matches the id**/
  let book = books.find((item) => item.id === id);
  //return the book
  return book;
}

function partitionBooksByBorrowedStatus(books) {
  /**use the filter method to filter 2 different arrays
  one with the checked out books
  two with the books that are not checked out**/
  let borrowed = books.filter((book) => book.borrows[0].returned === false);
  let returned = books.filter((book) => book.borrows[0].returned === true);
  //create a new array with both of the borrowed and returned books
  let totalBooks = [borrowed, returned];
  //return the array
  return totalBooks;
}

function getBorrowersForBook(book, accounts) {
  //destructuring the burrows array in book
  const { borrows } = book;
  //created an array that we can return at the end of the function
  let accountsArray = [];
  //create a counter used for the loop
  let counter = 10;
  /**conditional statement that makes sure that if borrows array is less than 10,
  the length of that array will become the counter for the loop **/ 
  if (book.borrows.length < 10) {
    counter = book.borrows.length;
  }
  //loop over the borrows array
  for (let i = 0; i < counter; i++) {
    //create a variable for the current book borrow in the loop
    let currentBorrow = borrows[i];
    //create a new record from the accounts array when the borrow id equals acc id
    let newBorrow = accounts.find((account) => currentBorrow.id === account.id);
    //add the returned property from the borrows array for that book borrow
    newBorrow.returned = currentBorrow.returned;
    //add the entire object with the account and returned info into the new array
    accountsArray.push(newBorrow);
  }
  //return the accounts array with returned info
  return accountsArray;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
