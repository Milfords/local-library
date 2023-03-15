function findAccountById(accounts, id) {
  //if the accounts array or id is null, then return null
  if (!accounts || !id) return null;
  //if the accounts array is empty or if the id is empty, then return null
  if (!accounts.length || !id.length) return null;
  //empty variable to return at the end of the function
  let account = null;
  //loop through accounts array
  accounts.forEach((currentAccount) => {
    //conditional statement verifying if the current account id is equal to input
    if (currentAccount.id === id) {
      //set current account to variable
      account = currentAccount;
    }
  });
  //return account with id
  return account;
}

function sortAccountsByLastName(accounts) {
  //if the accounts array is null, then return null
  if (!accounts) return null;
  //if the accounts array is empty, then return null
  if (!accounts.length) return null;
  //sort the accounts array alphabetically by last name
  accounts.sort((a, b) => a.name.last.toLowerCase() < b.name.last.toLowerCase() ? -1 : 1);
  //return the accounts array sorted by last name
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  //destucture the account id so that it looks better
  const { id } = account;
  //create a counter variable to return at the end
  let counter = 0;
  //loop through the books array
  for (let item in books) {
    //create another variable for the the borrows array
    const borrows = books[item].borrows;
    //loop through the borrows array
    borrows.forEach((borrow) => {
      //add one to the counter when the id matches the acc id
      if (borrow.id === id) {
        counter ++;
      }
    });
  }
  return counter;
}

function getBooksPossessedByAccount(account, books, authors) {
  
  /**use the filter method to loop through the books array and return all the examples
   * of borrowed books that are currently checked out by the account **/
  let found = books.filter((book) => book.borrows[0].id === account.id && book.borrows[0].returned === false);
  //loop over the new array with the currently checked out books
  for (let item in found) {
    //create a variable for the current item in the array
    let finds = found[item];
    /**use the find method to return the result into the newAuthor variable if the author id
       is equal to authorId inside the returned book array**/
    let newAuthor = authors.find((author) => author.id === finds.authorId);
    //adds a property to the found array called 'author' that has the author id and first/last name
    finds.author = newAuthor;
  }
  //return the array with the new properties
  return found;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
