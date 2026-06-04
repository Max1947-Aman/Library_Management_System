import { useState } from 'react';
import type { View, Book, Member, BorrowingRecord } from './types';
import { initialBooks, initialMembers, initialBorrowingRecords } from './data';
import { Dashboard } from './components/Dashboard';
import { Books } from './components/Books';
import { Members } from './components/Members';
import { Borrowing } from './components/Borrowing';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [borrowingRecords, setBorrowingRecords] = useState<BorrowingRecord[]>(initialBorrowingRecords);

  const handleAddBook = (book: Book) => {
    setBooks([...books, book]);
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter(b => b.id !== id));
  };

  const handleAddMember = (member: Member) => {
    setMembers([...members, member]);
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const handleBorrow = (record: BorrowingRecord) => {
    setBorrowingRecords([...borrowingRecords, record]);
    setBooks(books.map(book =>
      book.id === record.bookId
        ? { ...book, availableCopies: book.availableCopies - 1 }
        : book
    ));
    setMembers(members.map(member =>
      member.id === record.memberId
        ? { ...member, borrowedBooks: member.borrowedBooks + 1 }
        : member
    ));
  };

  const handleReturn = (recordId: string) => {
    const record = borrowingRecords.find(r => r.id === recordId);
    if (!record) return;

    setBorrowingRecords(borrowingRecords.map(r =>
      r.id === recordId
        ? { ...r, returnDate: new Date().toISOString().split('T')[0], status: 'returned' }
        : r
    ));
    setBooks(books.map(book =>
      book.id === record.bookId
        ? { ...book, availableCopies: book.availableCopies + 1 }
        : book
    ));
    setMembers(members.map(member =>
      member.id === record.memberId
        ? { ...member, borrowedBooks: Math.max(0, member.borrowedBooks - 1) }
        : member
    ));
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">Library</span>
        </div>
        <nav className="nav-menu">
          <button
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </button>
          <button
            className={`nav-item ${currentView === 'books' ? 'active' : ''}`}
            onClick={() => setCurrentView('books')}
          >
            <span className="nav-icon">📚</span>
            <span>Books</span>
          </button>
          <button
            className={`nav-item ${currentView === 'members' ? 'active' : ''}`}
            onClick={() => setCurrentView('members')}
          >
            <span className="nav-icon">👥</span>
            <span>Members</span>
          </button>
          <button
            className={`nav-item ${currentView === 'borrowing' ? 'active' : ''}`}
            onClick={() => setCurrentView('borrowing')}
          >
            <span className="nav-icon">📋</span>
            <span>Borrowing</span>
          </button>
        </nav>
      </aside>

      <main className="main-content">
        {currentView === 'dashboard' && (
          <Dashboard books={books} members={members} borrowingRecords={borrowingRecords} />
        )}
        {currentView === 'books' && (
          <Books books={books} onAddBook={handleAddBook} onDeleteBook={handleDeleteBook} />
        )}
        {currentView === 'members' && (
          <Members members={members} onAddMember={handleAddMember} onDeleteMember={handleDeleteMember} />
        )}
        {currentView === 'borrowing' && (
          <Borrowing
            books={books}
            members={members}
            borrowingRecords={borrowingRecords}
            onBorrow={handleBorrow}
            onReturn={handleReturn}
          />
        )}
      </main>
    </div>
  );
}

export default App;
