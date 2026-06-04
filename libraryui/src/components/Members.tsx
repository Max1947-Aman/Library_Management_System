import { useState } from 'react';
import type { Member } from '../types';

interface MembersProps {
  members: Member[];
  onAddMember: (member: Member) => void;
  onDeleteMember: (id: string) => void;
}

export function Members({ members, onAddMember, onDeleteMember }: MembersProps) {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: 'standard' as 'standard' | 'premium',
  });

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: Member = {
      id: Date.now().toString(),
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
      borrowedBooks: 0,
    };
    onAddMember(newMember);
    setFormData({ name: '', email: '', phone: '', membershipType: 'standard' });
    setShowForm(false);
  };

  return (
    <div className="members-view">
      <h2 className="page-title">Member Management</h2>

      <div className="toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Member'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Add New Member</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Membership Type</label>
                <select
                  value={formData.membershipType}
                  onChange={(e) => setFormData({ ...formData, membershipType: e.target.value as 'standard' | 'premium' })}
                >
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Member</button>
          </form>
        </div>
      )}

      <div className="members-list">
        {filteredMembers.length === 0 ? (
          <div className="empty-state">No members found</div>
        ) : (
          filteredMembers.map(member => (
            <div key={member.id} className="member-card">
              <div className="member-avatar">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="member-info">
                <h4 className="member-name">{member.name}</h4>
                <p className="member-email">{member.email}</p>
                <p className="member-phone">{member.phone}</p>
                <div className="member-meta">
                  <span className={`membership-badge ${member.membershipType}`}>
                    {member.membershipType}
                  </span>
                  <span className="join-date">Joined: {member.joinDate}</span>
                </div>
              </div>
              <div className="member-stats">
                <span className="stat">{member.borrowedBooks}</span>
                <span className="stat-label">Borrowed</span>
              </div>
              <button className="btn-delete" onClick={() => onDeleteMember(member.id)}>×</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
