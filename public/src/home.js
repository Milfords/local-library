function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  //create a counter variable to return at the end
  let counter = 0;
  //loop through the books array
  books.forEach((book)=> {
    //create a variable that represents the current books first borrow
    let currentBorrow = book.borrows[0];
    /**conditional statement that if the current borrow is false, then it adds
    to the counter as this means the book is currently borrowed**/ 
    if (currentBorrow.returned === false) {
      counter ++;
    }
  });
  //return the counter variable
  return counter;
}

//HELPER FUNCTION FOR GETMOSTCOMMONGENRES()
function getGenres(books) {
  //creating an empty array that will be returned at the end of the function
  let commonGenres = [];
  //will hold an object all genres and numbers they appear in the books array
  let genres = books.reduce((totalGenres, book) => {
    //variable that holds current genre for the book object
    const currentGenre = book.genre;
    /**if the property with the current genre name does NOT exist in the object
     *  then create a property with the name of the genre and set the count = 0**/
    if (totalGenres[currentGenre] == null) totalGenres[currentGenre] = 0;
    /**now that the property for the current genre exists, add 1 to the count
     * of the property **/
    totalGenres[currentGenre] += 1;
    //returns the object with all the properties for each genre with the count value
    return totalGenres;
  }, {});

  //loop over the genre object that has all of the properties of genres and counts
  for (let prop in genres) {
    //for each property in genres, create a new object
    let genre = {};
    //set the name property for the new object to what the genre is in genres object
    genre.name = prop;
    /**set the count property to the value of each individual property
     * (IE: genre) in genres object **/
    genre.count = genres[prop];
    //add the new genre object which should have all the genres and counts in a single object
    commonGenres.push(genre);
  }
  //return the array of ALL genres and ALL counts for the genres in an array of objects
  return commonGenres;
}


function getMostCommonGenres(books) {
  /**set the genres variable to the returned array from the helper function
   * IE: should have an array with all genres and counts for each genre in an object **/
  let genres = getGenres(books);
  //sort the array so that the highest count objects are at the beginning of the array
  genres.sort((one, two) => one.count > two.count ? -1 : 1);
  //set the length of the final returned array to 5
  let mostCommon = 5;
  //conditional statement checking to see if there is AT LEAST 5 genres
  if (genres.length < 5) {
    //if there are less than 5 genres, set the length of the final array to how many genres there are
    mostCommon = genres.length;
  }
  //splice the array so that AT MOST 5 objects are returned with their genre and counts
  let mostCommonGenres = genres.splice(0, mostCommon);
  //return the final genre array with the most common genres
  return mostCommonGenres;
}

//HELPER FUNCTION FOR GETMOSTPOPULARBOOKS()
function getBooksWithCount(books) {
  //create an empty array we will return at the end of the function
  let booksWithCount = [];
  //loop through all the books in the array
  for (let item in books) {
    //create an empty object
    let book = {};
    //add the name property and set the title of the book to the value
    book.name = books[item].title;
    //add the count property and set it to the count of times the book was borrowed
    book.count = books[item].count;
    //add the object with title and count to the array
    booksWithCount.push(book);
  }
  //return the array with the title of the book and the count of # of times borrowed
  return booksWithCount;
}

function getMostPopularBooks(books) {
  //create a new array with the spread operator
  let booksWithCount = [...books];
  //add a counnt property to all the books that is equal to the # of times it was borrowed
  booksWithCount.forEach((book) => book.count = book.borrows.length);
  //sort the array based on how many times it was borrowed with most at the beginning
  booksWithCount.sort((one, two) => one.count > two.count ? -1 : 1);
  //use helper method to return an array with only the titles and count from booksWithCount
  let popularBooks = getBooksWithCount(booksWithCount);
  //create max results that will be returned in final array
  let maxResults = 5;
  //conditional statement to see if there are less than 5 books
  if (popularBooks < 5) {
    //if there are less than 5 books, then we will return the # of books there are
    maxResults = popularBooks.length;
  }
  //splice the array so that they are only the top 5 or less results with the most times borrowed
  let mostPopularBooks = popularBooks.splice(0, maxResults);
  //return the array with the most popular books that were borrowed the most
  return mostPopularBooks;
}

//HELPER FUNCTION FOR GETMOSTPOPULARAUTHORS()
function getAuthorsWithCount(authors) {
  //create an empty array to return at the end of the function
  let authorsWithCount = [];
  //loop over the array of author objects
  for (let item in authors) {
    //create an empty object for an author
    let author = {};
    //set the first variable to the authors first name
    let first = authors[item].name.first;
    //set the last variable to the authors last name
    let last = authors[item].name.last;
    //use a temperate literal to add the names together in the name property
    author.name = `${first} ${last}`;
    //add a count property from that authors count (done in another method)
    author.count = authors[item].count;
    //add the new author object to the array
    authorsWithCount.push(author);
  }
  //return the array with the authors first and last name and count
  return authorsWithCount;
}

function getMostPopularAuthors(books, authors) {
  //create a new array with the spread operator
  let authorsWithCount = [...authors];
  //loop the authors for (let author in authors)
  for (let author in authorsWithCount) {
    //made a counter that we will add the total amount of borrows the author had to
    let count = 0;
    //loop over the books in the books array
    books.forEach((book) => {
      //conditional statement to see if the authorId in books matches the authors id
      if (authorsWithCount[author].id === book.authorId) {
        //add the amount of borrows that book has to the counter
        count += book.borrows.length;
      }
    });
    //after the loop, add up the total counter for the authors borrows and add the property
    authorsWithCount[author].count = count;
  }
  //sort the array to have the authors with the most borrows at the beginning
  authorsWithCount.sort((one, two) => one.count > two.count ? -1 : 1);
  //create a new array with objects with first/last name and counts with helper method
  let popularAuthors = getAuthorsWithCount(authorsWithCount);
  //make the max results for the final array = 5
  let maxResults = 5;
  //if the array of authors is less than 5, then make the max results = to how many authors
  if (popularAuthors < 5) {
    maxResults = popularAuthors.length;
  }
  //splice the final array with the 5 most popular authors
  let mostPopularAuthors = popularAuthors.splice(0, maxResults);
  //return the array with the 5 or less most popular authors
  return mostPopularAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
