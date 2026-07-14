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

    init(){
      const addButton = document.querySelector(".add-book");
      addButton.addEventListener("click", () => {
        document.querySelector(".insertBook").classList.toggle("showing");
        addButton.textContent = addButton.textContent === "Add Book" ? "Close" : "Add Book";
      });

      const name = document.querySelector("#name");
      const author = document.querySelector("#author");
      const numOfPages = document.querySelector("#numOfPages");
      document.querySelector("#addBook").addEventListener("click", () => {
       if (!name.value || !author.value || !Number(numOfPages.value)) {
         alert("Please enter name of the book or author's name or book's pages");
         return;
       }

       this.addBookToLibrary(name.value, author.value, Number(numOfPages.value));

       name.value = "";
       author.value = "";
       numOfPages.value = "";

       this.render();
     });
     this.render();
    }

    //μέθοδος για την εμφάνιση των βιβλίων στην λίστα
    render(){
      const showingContainer = document.querySelector("#bookShowingArea");
      showingContainer.innerHTML = "";

      if (this.data.length === 0) {
        const empty = document.createElement("span");
        empty.id = "empty";
        empty.textContent = "Empty book list";
        showingContainer.append(empty);
        return;
      }

      this.data.forEach((item) => {
        const div = document.createElement("div");
        div.className = "book-item";

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.onclick = () => this.remove(item.id);

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Have Read";
        toggleBtn.onclick = () => this.toggleRead(item.id);

        div.append(
          Object.assign(document.createElement("span"), {
            innerHTML: `Title: <strong>${item.name}</strong>`,
          }),
          " ",
          Object.assign(document.createElement("span"), {
            innerHTML: `Author: <strong>${item.author}</strong>`,
          }),
          " ",
          Object.assign(document.createElement("span"), {
            innerHTML: `Pages: <strong>${item.numOfPages}</strong>`,
          }),
          " ",
          Object.assign(document.createElement("span"), {
            innerHTML: `Read: <strong>${item.hasRead ? "Yes" : "No"}</strong>`,
          }),
          removeBtn,
          toggleBtn,
        );

        showingContainer.append(div);
      });
    }

    remove(id){
      const index = this.data.findIndex(i => i.id === id);
      if(index !== -1){
        this.data.splice(index,1);
      }
      this.render();
    }

    toggleRead(id){
      const book = this.data.find(i => i.id === id);
      if(book){
        book.hasRead = !book.hasRead;
      }
      this.render();
    }

    //Μέθοδος για την προσθήκη ενός βιβλίου στην λίστα μας
    addBookToLibrary(name, author, numOfPage){
      const book = new Book(name, author, numOfPage);
      this.data.push(book);
    }
}

const library = new Library();
library.init();