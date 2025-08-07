const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

let books = [
  { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
  { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
];

// GET all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// POST a new book
app.post('/books', (req, res) => {
  const newBook = req.body;
  if (!newBook.title || !newBook.author) {
    return res.status(400).send('Title and author are required.');
  }
  newBook.id = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (Update) a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;
  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...updatedBook };
    res.status(200).json(books[bookIndex]);
  } else {
    res.status(404).send('Book not found.');
  }
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const initialLength = books.length;
  books = books.filter(book => book.id !== bookId);

  if (books.length < initialLength) {
    res.status(200).send('Book deleted successfully.');
  } else {
    res.status(404).send('Book not found.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Welcome to the Book shubham API!');
});