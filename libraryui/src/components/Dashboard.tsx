import type { Book, Member, BorrowingRecord } from '../types';

interface DashboardProps {
  books: Book[];
  members: Member[];
  borrowingRecords: BorrowingRecord[];
}

export function Dashboard({ books, members, borrowingRecords }: DashboardProps) {
  const totalBooks = books.reduce((acc, book) => acc + book.totalCopies, 0);
  const availableBooks = books.reduce((acc, book) => acc + book.availableCopies, 0);
  const borrowedBooks = totalBooks - availableBooks;
  const overdueRecords = borrowingRecords.filter(r => r.status === 'overdue').length;
  const activeMembers = members.filter(m => m.borrowedBooks > 0).length;

  const stats = [
    { label: 'Total Books', value: totalBooks, color: '#6366f1', icon: '📚' },
    { label: 'Available', value: availableBooks, color: '#10b981', icon: '✅' },
    { label: 'Borrowed', value: borrowedBooks, color: '#f59e0b', icon: '📖' },
    { label: 'Overdue', value: overdueRecords, color: '#ef4444', icon: '⚠️' },
    { label: 'Active Members', value: activeMembers, color: '#8b5cf6', icon: '👥' },
    { label: 'Total Members', value: members.length, color: '#06b6d4', icon: '👤' },
  ];

  const recentBorrows = borrowingRecords
    .filter(r => r.status !== 'returned')
    .slice(0, 5);

  return (
    <div className="dashboard">
      <h2 className="page-title">Dashboard</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <span className="stat-icon">{stat.icon}</span>
            <div className="stat-info">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <h3 className="section-title">Recent Borrows & Returns</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Member</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBorrows.length === 0 ? (
                <tr><td colSpan={4} className="empty-message">No recent borrows</td></tr>
              ) : (
                recentBorrows.map(record => {
                  const book = books.find(b => b.id === record.bookId);
                  const member = members.find(m => m.id === record.memberId);
                  return (
                    <tr key={record.id}>
                      <td>{book?.title || 'Unknown'}</td>
                      <td>{member?.name || 'Unknown'}</td>
                      <td>{record.dueDate}</td>
                      <td>
                        <span className={`status-badge ${record.status}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="section-card">
          <h3 className="section-title">Library Overview</h3>
          <div className="overview-list">
            <div className="overview-item">
              <span className="overview-label">Total Copies</span>
              <span className="overview-value">{totalBooks}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Categories</span>
              <span className="overview-value">{[...new Set(books.map(b => b.category))].length}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Authors</span>
              <span className="overview-value">{[...new Set(books.map(b => b.author))].length}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Borrow Rate</span>
              <span className="overview-value">{totalBooks > 0 ? Math.round((borrowedBooks / totalBooks) * 100) : 0}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
