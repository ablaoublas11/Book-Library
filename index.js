//αυτήν είναι η λίτα στην οποία αποθηκεύουμε τα αντικέιμενα Book
const bookList = [];

//Αυτός είναι ο δομητής της Book
function Book(name, author, numOfPage) {
  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
  this.numOfPages = numOfPage;
  this.hasRead = false;
}

//μέθοδος για την προσθήκη αντικειμένων στην λίστα
function addBookToLibrary(name, author, numOfPage) {
  const book = new Book(name, author, numOfPage);
  bookList.push(book);
  //alert("Added succesfuly");
}

//από αυτό το κομμάτι του κώδικα μπορούμε να χειριζόμαστε το DOM και να προσθέτουμε λειτουργηκότητα σε buttons κλπ
const app = {
  data: bookList,
  init() {
    document.querySelector("#addBook").addEventListener("click", () => {
      const name = document.querySelector("#name").value;
      const author = document.querySelector("#author").value;
      const numOfPages = Number(document.querySelector("#numOfPages").value);

      if (!name || !author || !numOfPages) {
        alert("Please enter name of the book or author's name or book's pages");
        return;
      }

      addBookToLibrary(name, author, numOfPages);
      this.render();
    });
    this.render();
  },
  render() {
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
      removeBtn.onclick = () => app.remove(item.id);

      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = "Have Read";
      toggleBtn.onclick = () => app.toogleRead(item.id);

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
  },
  remove(id) {
    // this.data = this.data.filter((i) => i.id !== id);

    const index = this.data.findIndex( i => i.id === id);
    if (index !== -1){
      this.data.splice(index, 1);
    }
    this.render();
  },
  toogleRead(id) {
    // this.data = this.data.map((item) =>
    //   item.id === id ? { ...item, hasRead: !item.hasRead } : item,
    // );

    const book = this.data.find(i => i.id === id);
    if(book){
      book.hasRead = !book.hasRead;
    }
    this.render();
  },
};
app.init();
