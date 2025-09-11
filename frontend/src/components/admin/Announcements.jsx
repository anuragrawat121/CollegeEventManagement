import React, { useState } from 'react';
import { 
  Plus, 
  Send, 
  Edit, 
  Trash2, 
  Eye,
  Megaphone,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Calendar,
  User
} from 'lucide-react';

const Announcements = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [targetFilter, setTargetFilter] = useState('all');

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'New Event Registration Guidelines',
      content: 'We have updated our event registration process. All organizers must now submit events at least 2 weeks in advance for approval. Please review the new guidelines in the organizer portal.',
      targetAudience: 'organizers',
      status: 'sent',
      createdAt: '2024-01-20',
      sentAt: '2024-01-20 14:30:00',
      recipients: 45,
      readCount: 38,
      priority: 'high',
      createdBy: 'Admin'
    },
    {
      id: 2,
      title: 'Campus Event Calendar Update',
      content: 'The campus event calendar has been updated with new features including better filtering and mobile responsiveness. Check out the new interface and let us know your feedback.',
      targetAudience: 'all',
      status: 'sent',
      createdAt: '2024-01-18',
      sentAt: '2024-01-18 10:00:00',
      recipients: 2847,
      readCount: 1923,
      priority: 'medium',
      createdBy: 'Admin'
    },
    {
      id: 3,
      title: 'Upcoming Tech Symposium - Early Bird Pricing',
      content: 'Don\'t miss out on the Tech Symposium 2024! Early bird tickets are available until February 1st. Register now and save 20% on ticket prices.',
      targetAudience: 'participants',
      status: 'draft',
      createdAt: '2024-01-22',
      sentAt: null,
      recipients: 0,
      readCount: 0,
      priority: 'medium',
      createdBy: 'Admin'
    },
    {
      id: 4,
      title: 'System Maintenance Scheduled',
      content: 'Our system will undergo scheduled maintenance on January 30th from 2:00 AM to 4:00 AM. During this time, the platform may be temporarily unavailable.',
      targetAudience: 'all',
      status: 'scheduled',
      createdAt: '2024-01-21',
      sentAt: null,
      recipients: 2847,
      readCount: 0,
      priority: 'high',
      createdBy: 'Admin',
      scheduledFor: '2024-01-25 09:00:00'
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    targetAudience: 'all',
    priority: 'medium',
    sendNow: true,
    scheduledFor: ''
  });

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter;
    const matchesTarget = targetFilter === 'all' || announcement.targetAudience === targetFilter;
    
    return matchesSearch && matchesStatus && matchesTarget;
  });

  const handleCreateAnnouncement = () => {
    const announcement = {
      id: announcements.length + 1,
      ...newAnnouncement,
      status: newAnnouncement.sendNow ? 'sent' : (newAnnouncement.scheduledFor ? 'scheduled' : 'draft'),
      createdAt: new Date().toISOString().split('T')[0],
      sentAt: newAnnouncement.sendNow ? new Date().toISOString() : null,
      recipients: newAnnouncement.targetAudience === 'all' ? 2847 : 
                  newAnnouncement.targetAudience === 'organizers' ? 45 : 2802,
      readCount: 0,
      createdBy: 'Admin'
    };

    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({
      title: '',
      content: '',
      targetAudience: 'all',
      priority: 'medium',
      sendNow: true,
      scheduledFor: ''
    });
    setShowCreateModal(false);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const handleSendDraft = (id) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? {
        ...a,
        status: 'sent',
        sentAt: new Date().toISOString(),
        recipients: a.targetAudience === 'all' ? 2847 : 
                   a.targetAudience === 'organizers' ? 45 : 2802
      } : a
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTargetAudienceIcon = (audience) => {
    switch (audience) {
      case 'all': return <Users className="w-4 h-4" />;
      case 'organizers': return <User className="w-4 h-4" />;
      case 'participants': return <Users className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const CreateAnnouncementModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Create New Announcement</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter announcement title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter announcement content..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <select
                  value={newAnnouncement.targetAudience}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, targetAudience: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Users</option>
                  <option value="organizers">Organizers Only</option>
                  <option value="participants">Participants Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newAnnouncement.sendNow}
                  onChange={(e) => setNewAnnouncement({
                    ...newAnnouncement, 
                    sendNow: e.target.checked,
                    scheduledFor: e.target.checked ? '' : newAnnouncement.scheduledFor
                  })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="text-sm text-gray-700">Send immediately</span>
              </label>
            </div>

            {!newAnnouncement.sendNow && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule For
                </label>
                <input
                  type="datetime-local"
                  value={newAnnouncement.scheduledFor}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, scheduledFor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateAnnouncement}
              disabled={!newAnnouncement.title || !newAnnouncement.content}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {newAnnouncement.sendNow ? 'Send Now' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ViewAnnouncementModal = ({ announcement, onClose }) => {
    if (!announcement) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{announcement.title}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(announcement.status)}`}>
                    {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <Eye className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Content</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    {getTargetAudienceIcon(announcement.targetAudience)}
                    <span className="ml-2 text-gray-600">Target:</span>
                    <span className="ml-2 font-medium">
                      {announcement.targetAudience === 'all' ? 'All Users' : 
                       announcement.targetAudience.charAt(0).toUpperCase() + announcement.targetAudience.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">Created:</span>
                    <span className="ml-2 font-medium">{announcement.createdAt}</span>
                  </div>
                  {announcement.sentAt && (
                    <div className="flex items-center text-sm">
                      <Send className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">Sent:</span>
                      <span className="ml-2 font-medium">{announcement.sentAt}</span>
                    </div>
                  )}
                  {announcement.scheduledFor && (
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">Scheduled:</span>
                      <span className="ml-2 font-medium">{announcement.scheduledFor}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{announcement.recipients}</div>
                    <div className="text-sm text-gray-600">Recipients</div>
                  </div>
                  {announcement.status === 'sent' && (
                    <>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{announcement.readCount}</div>
                        <div className="text-sm text-gray-600">Read</div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">
                          {Math.round((announcement.readCount / announcement.recipients) * 100)}%
                        </div>
                        <div className="text-sm text-gray-600">Read Rate</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const stats = {
    total: announcements.length,
    sent: announcements.filter(a => a.status === 'sent').length,
    drafts: announcements.filter(a => a.status === 'draft').length,
    scheduled: announcements.filter(a => a.status === 'scheduled').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Announcements & Notifications</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Announcement
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Megaphone className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sent</p>
              <p className="text-2xl font-bold text-gray-900">{stats.sent}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gray-100">
              <Edit className="w-6 h-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.drafts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{stats.scheduled}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>

          <select
            value={targetFilter}
            onChange={(e) => setTargetFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Audiences</option>
            <option value="all">All Users</option>
            <option value="organizers">Organizers</option>
            <option value="participants">Participants</option>
          </select>
        </div>
      </div>

      {/* Announcements List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(announcement.status)}`}>
                      {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {announcement.content.length > 150 
                      ? announcement.content.substring(0, 150) + '...' 
                      : announcement.content}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      {getTargetAudienceIcon(announcement.targetAudience)}
                      <span className="ml-1">
                        {announcement.targetAudience === 'all' ? 'All Users' : 
                         announcement.targetAudience.charAt(0).toUpperCase() + announcement.targetAudience.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{announcement.createdAt}</span>
                    </div>
                    {announcement.status === 'sent' && (
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{announcement.recipients} recipients</span>
                      </div>
                    )}
                    {announcement.status === 'sent' && (
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{announcement.readCount} read ({Math.round((announcement.readCount / announcement.recipients) * 100)}%)</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    onClick={() => {
                      setSelectedAnnouncement(announcement);
                      setShowViewModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  {announcement.status === 'draft' && (
                    <button 
                      onClick={() => handleSendDraft(announcement.id)}
                      className="text-green-600 hover:text-green-900"
                      title="Send Now"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button className="text-gray-600 hover:text-gray-900" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button 
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <Megaphone className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No announcements found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria, or create a new announcement.
            </p>
          </div>
        )}
      </div>

      {/* Create Announcement Modal */}
      {showCreateModal && <CreateAnnouncementModal />}

      {/* View Announcement Modal */}
      {showViewModal && (
        <ViewAnnouncementModal 
          announcement={selectedAnnouncement}
          onClose={() => {
            setShowViewModal(false);
            setSelectedAnnouncement(null);
          }}
        />
      )}
    </div>
  );
};

export default Announcements;