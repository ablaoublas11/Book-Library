//Αντικατάσταση του δομητή με μια κλάση
class Book{
  constructor(name, author, numOfPages){
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.numOfPages = numOfPages;
    this.hasRead = false;
  }
}

class Library {
    constructor(){
        this.data = [];
    }

    init(){}

    render(){}

    remove(){}

    toggleRead(){}

    addBookToLibrary(){}
}