import { useState } from 'react';
import type { Book } from '../types';

interface BooksProps {
  books: Book[];
  onAddBook: (book: Book) => void;
  onDeleteBook: (id: string) => void;
}

const categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Fantasy', 'Romance', 'Dystopian', 'Science Fiction', 'Adventure'];

export function Books({ books, onAddBook, onDeleteBook }: BooksProps) {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publishedYear: new Date().getFullYear(),
    totalCopies: 1,
  });

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm);
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: Book = {
      id: Date.now().toString(),
      ...formData,
      availableCopies: formData.totalCopies,
    };
    onAddBook(newBook);
    setFormData({ title: '', author: '', isbn: '', category: '', publishedYear: new Date().getFullYear(), totalCopies: 1 });
    setShowForm(false);
  };

  return (
    <div className="books-view">
      <h2 className="page-title">Book Management</h2>

      <div className="toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Book'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Add New Book</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>ISBN</label>
                <input
                  type="text"
                  required
                  value={formData.isbn}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Published Year</label>
                <input
                  type="number"
                  required
                  value={formData.publishedYear}
                  onChange={(e) => setFormData({ ...formData, publishedYear: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Total Copies</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.totalCopies}
                  onChange={(e) => setFormData({ ...formData, totalCopies: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Book</button>
          </form>
        </div>
      )}

      <div className="books-grid">
        {filteredBooks.length === 0 ? (
          <div className="empty-state">No books found</div>
        ) : (
          filteredBooks.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-header">
                <span className="book-category">{book.category}</span>
                <button className="btn-delete" onClick={() => onDeleteBook(book.id)}>×</button>
              </div>
              <h4 className="book-title">{book.title}</h4>
              <p className="book-author">by {book.author}</p>
              <div className="book-details">
                <span>ISBN: {book.isbn}</span>
                <span>{book.publishedYear}</span>
              </div>
              <div className="book-availability">
                <div className="availability-bar">
                  <div
                    className="availability-fill"
                    style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                  />
                </div>
                <span>{book.availableCopies}/{book.totalCopies} available</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
