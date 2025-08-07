const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' }
];
// GET /books - Return all books
app.get('/books', (req, res) => {
    res.json(books);
});
// POST /books - Add a new book
app.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});
// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;
    const index = books.findIndex(book => book.id === bookId);

    if (index !== -1) {
        books[index] = { ...books[index], ...updatedBook };
        res.json(books[index]);
    } else {
        res.status(404).send('Book not found.');
    }
});
// DELETE /books/:id - Remove a book by ID
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const initialLength = books.length;
    books = books.filter(book => book.id !== bookId);

    if (books.length < initialLength) {
        res.status(204).send(); // 204 No Content
    } else {
        res.status(404).send('Book not found.');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});