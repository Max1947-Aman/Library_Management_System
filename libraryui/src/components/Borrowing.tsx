import { useState } from 'react';
import type { Book, Member, BorrowingRecord } from '../types';

interface BorrowingProps {
  books: Book[];
  members: Member[];
  borrowingRecords: BorrowingRecord[];
  onBorrow: (record: BorrowingRecord) => void;
  onReturn: (recordId: string) => void;
}

export function Borrowing({ books, members, borrowingRecords, onBorrow, onReturn }: BorrowingProps) {
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    days: 14,
  });

  const filteredRecords = borrowingRecords.filter(record =>
    !filterStatus || record.status === filterStatus
  );

  const availableBooks = books.filter(book => book.availableCopies > 0);
  const activeMembers = members;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + formData.days);

    const newRecord: BorrowingRecord = {
      id: Date.now().toString(),
      bookId: formData.bookId,
      memberId: formData.memberId,
      borrowDate: new Date().toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      returnDate: null,
      status: 'borrowed',
    };
    onBorrow(newRecord);
    setFormData({ bookId: '', memberId: '', days: 14 });
    setShowForm(false);
  };

  const handleReturn = (recordId: string) => {
    onReturn(recordId);
  };

  return (
    <div className="borrowing-view">
      <h2 className="page-title">Borrowing & Returns</h2>

      <div className="toolbar">
        <div className="filter-group">
          <label>Filter by Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All</option>
            <option value="borrowed">Borrowed</option>
            <option value="returned">Returned</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Borrow'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Issue New Book</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Select Book</label>
                <select
                  required
                  value={formData.bookId}
                  onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
                >
                  <option value="">Choose a book</option>
                  {availableBooks.map(book => (
                    <option key={book.id} value={book.id}>
                      {book.title} - {book.availableCopies} available
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Select Member</label>
                <select
                  required
                  value={formData.memberId}
                  onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                >
                  <option value="">Choose a member</option>
                  {activeMembers.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.membershipType})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Loan Period (days)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="30"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Issue Book</button>
          </form>
        </div>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Book</th>
            <th>Member</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length === 0 ? (
            <tr><td colSpan={6} className="empty-message">No records found</td></tr>
          ) : (
            filteredRecords.map(record => {
              const book = books.find(b => b.id === record.bookId);
              const member = members.find(m => m.id === record.memberId);
              return (
                <tr key={record.id}>
                  <td>{book?.title || 'Unknown'}</td>
                  <td>{member?.name || 'Unknown'}</td>
                  <td>{record.borrowDate}</td>
                  <td>{record.dueDate}</td>
                  <td>
                    <span className={`status-badge ${record.status}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    {record.status !== 'returned' && (
                      <button
                        className="btn btn-small btn-success"
                        onClick={() => handleReturn(record.id)}
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
