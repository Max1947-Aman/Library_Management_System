import type { Book, Member, BorrowingRecord } from './types';

export const initialBooks: Book[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', category: 'Fiction', publishedYear: 1925, totalCopies: 5, availableCopies: 3 },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', category: 'Fiction', publishedYear: 1960, totalCopies: 4, availableCopies: 2 },
  { id: '3', title: '1984', author: 'George Orwell', isbn: '978-0451524935', category: 'Dystopian', publishedYear: 1949, totalCopies: 6, availableCopies: 4 },
  { id: '4', title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '978-0316769488', category: 'Fiction', publishedYear: 1951, totalCopies: 3, availableCopies: 1 },
  { id: '5', title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0141439518', category: 'Romance', publishedYear: 1813, totalCopies: 4, availableCopies: 3 },
  { id: '6', title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '978-0547928227', category: 'Fantasy', publishedYear: 1937, totalCopies: 5, availableCopies: 5 },
  { id: '7', title: 'Fahrenheit 451', author: 'Ray Bradbury', isbn: '978-1454905014', category: 'Science Fiction', publishedYear: 1953, totalCopies: 3, availableCopies: 2 },
  { id: '8', title: 'The Alchemist', author: 'Paulo Coelho', isbn: '978-0062315007', category: 'Adventure', publishedYear: 1988, totalCopies: 6, availableCopies: 4 },
];

export const initialMembers: Member[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@email.com', phone: '555-0101', joinDate: '2024-01-15', membershipType: 'premium', borrowedBooks: 2 },
  { id: '2', name: 'Emma Johnson', email: 'emma.j@email.com', phone: '555-0102', joinDate: '2024-02-20', membershipType: 'standard', borrowedBooks: 1 },
  { id: '3', name: 'Michael Brown', email: 'm.brown@email.com', phone: '555-0103', joinDate: '2023-11-10', membershipType: 'premium', borrowedBooks: 3 },
  { id: '4', name: 'Sarah Davis', email: 'sarah.d@email.com', phone: '555-0104', joinDate: '2024-03-05', membershipType: 'standard', borrowedBooks: 0 },
  { id: '5', name: 'David Wilson', email: 'd.wilson@email.com', phone: '555-0105', joinDate: '2024-01-28', membershipType: 'premium', borrowedBooks: 1 },
];

export const initialBorrowingRecords: BorrowingRecord[] = [
  { id: '1', bookId: '1', memberId: '1', borrowDate: '2024-06-01', dueDate: '2024-06-15', returnDate: null, status: 'borrowed' },
  { id: '2', bookId: '3', memberId: '1', borrowDate: '2024-05-20', dueDate: '2024-06-03', returnDate: null, status: 'overdue' },
  { id: '3', bookId: '2', memberId: '2', borrowDate: '2024-05-25', dueDate: '2024-06-08', returnDate: '2024-06-02', status: 'returned' },
  { id: '4', bookId: '6', memberId: '3', borrowDate: '2024-05-15', dueDate: '2024-05-29', returnDate: null, status: 'overdue' },
  { id: '5', bookId: '8', memberId: '3', borrowDate: '2024-05-28', dueDate: '2024-06-11', returnDate: null, status: 'borrowed' },
  { id: '6', bookId: '5', memberId: '5', borrowDate: '2024-05-30', dueDate: '2024-06-13', returnDate: null, status: 'borrowed' },
];
