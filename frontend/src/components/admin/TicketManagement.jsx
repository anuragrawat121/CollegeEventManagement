import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  QrCode,
  User,
  Calendar,
  MapPin,
  DollarSign,
  Ticket,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

const TicketManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Dummy tickets data
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-001',
      eventId: 1,
      eventTitle: 'Tech Symposium 2024',
      eventDate: '2024-02-15',
      eventVenue: 'Main Auditorium',
      userId: 1,
      userName: 'John Doe',
      userEmail: 'john.doe@college.edu',
      purchaseDate: '2024-01-10',
      price: 25,
      status: 'active',
      qrCode: 'TKT001QR2024',
      paymentId: 'PAY-12345',
      seatNumber: 'A-15',
      checkInTime: null,
      isUsed: false
    },
    {
      id: 'TKT-002',
      eventId: 2,
      eventTitle: 'Cultural Night 2024',
      eventDate: '2024-02-20',
      eventVenue: 'College Ground',
      userId: 2,
      userName: 'Jane Smith',
      userEmail: 'jane.smith@college.edu',
      purchaseDate: '2024-01-15',
      price: 15,
      status: 'used',
      qrCode: 'TKT002QR2024',
      paymentId: 'PAY-12346',
      seatNumber: 'B-22',
      checkInTime: '2024-02-20 18:30:00',
      isUsed: true
    },
    {
      id: 'TKT-003',
      eventId: 3,
      eventTitle: 'Annual Sports Meet',
      eventDate: '2024-02-25',
      eventVenue: 'Sports Complex',
      userId: 3,
      userName: 'Mike Johnson',
      userEmail: 'mike.johnson@college.edu',
      purchaseDate: '2024-01-08',
      price: 10,
      status: 'cancelled',
      qrCode: 'TKT003QR2024',
      paymentId: 'PAY-12347',
      seatNumber: 'C-08',
      checkInTime: null,
      isUsed: false
    },
    {
      id: 'TKT-004',
      eventId: 1,
      eventTitle: 'Tech Symposium 2024',
      eventDate: '2024-02-15',
      eventVenue: 'Main Auditorium',
      userId: 4,
      userName: 'Sarah Wilson',
      userEmail: 'sarah.wilson@college.edu',
      purchaseDate: '2024-01-20',
      price: 25,
      status: 'active',
      qrCode: 'TKT004QR2024',
      paymentId: 'PAY-12348',
      seatNumber: 'A-16',
      checkInTime: null,
      isUsed: false
    },
    {
      id: 'TKT-005',
      eventId: 2,
      eventTitle: 'Cultural Night 2024',
      eventDate: '2024-02-20',
      eventVenue: 'College Ground',
      userId: 5,
      userName: 'David Brown',
      userEmail: 'david.brown@college.edu',
      purchaseDate: '2024-01-12',
      price: 15,
      status: 'refunded',
      qrCode: 'TKT005QR2024',
      paymentId: 'PAY-12349',
      seatNumber: 'B-23',
      checkInTime: null,
      isUsed: false
    }
  ]);

  const events = [
    { id: 1, title: 'Tech Symposium 2024' },
    { id: 2, title: 'Cultural Night 2024' },
    { id: 3, title: 'Annual Sports Meet' },
    { id: 4, title: 'Startup Pitch Competition' }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = eventFilter === 'all' || ticket.eventId.toString() === eventFilter;
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    
    return matchesSearch && matchesEvent && matchesStatus;
  });

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    ));
  };

  const handleValidateTicket = (ticketId) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { 
        ...ticket, 
        status: 'used', 
        isUsed: true,
        checkInTime: new Date().toISOString()
      } : ticket
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'used': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'used': return <QrCode className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'refunded': return <RefreshCw className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const TicketModal = ({ ticket, onClose }) => {
    if (!ticket) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Ticket className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{ticket.id}</h2>
                  <p className="text-gray-600">{ticket.eventTitle}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Ticket className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">Ticket ID:</span>
                    <span className="ml-2 font-medium">{ticket.id}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">Event Date:</span>
                    <span className="ml-2 font-medium">{ticket.eventDate}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">Venue:</span>
                    <span className="ml-2 font-medium">{ticket.eventVenue}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">Price:</span>
                    <span className="ml-2 font-medium">${ticket.price}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600">Seat:</span>
                    <span className="ml-2 font-medium">{ticket.seatNumber}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Info</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="ml-2 text-sm font-medium">{ticket.userName}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="ml-2 text-sm font-medium">{ticket.userEmail}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Purchase Date:</span>
                    <span className="ml-2 text-sm font-medium">{ticket.purchaseDate}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Payment ID:</span>
                    <span className="ml-2 text-sm font-medium">{ticket.paymentId}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* QR Code Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code</h3>
              <div className="flex items-center justify-center">
                <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">{ticket.qrCode}</p>
            </div>
            
            {ticket.checkInTime && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-900">
                    Checked in at: {ticket.checkInTime}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            {ticket.status === 'active' && (
              <>
                <button 
                  onClick={() => {
                    handleValidateTicket(ticket.id);
                    onClose();
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Validate Ticket
                </button>
                <button 
                  onClick={() => {
                    handleStatusChange(ticket.id, 'cancelled');
                    onClose();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Cancel Ticket
                </button>
              </>
            )}
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
    total: tickets.length,
    active: tickets.filter(t => t.status === 'active').length,
    used: tickets.filter(t => t.status === 'used').length,
    cancelled: tickets.filter(t => t.status === 'cancelled').length,
    refunded: tickets.filter(t => t.status === 'refunded').length,
    totalRevenue: tickets.filter(t => t.status !== 'cancelled' && t.status !== 'refunded').reduce((sum, t) => sum + t.price, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Ticket Management</h1>
        <div className="mt-4 sm:mt-0 flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Tickets
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Tickets</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.used}</p>
            <p className="text-sm text-gray-600">Used</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
            <p className="text-sm text-gray-600">Cancelled</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.refunded}</p>
            <p className="text-sm text-gray-600">Refunded</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">${stats.totalRevenue}</p>
            <p className="text-sm text-gray-600">Revenue</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tickets, users, or events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Event Filter */}
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Events</option>
            {events.map(event => (
              <option key={event.id} value={event.id.toString()}>{event.title}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="used">Used</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchase Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <QrCode className="w-5 h-5 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                        <div className="text-sm text-gray-500">Seat: {ticket.seatNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{ticket.eventTitle}</div>
                      <div className="text-sm text-gray-500">{ticket.eventDate} • {ticket.eventVenue}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{ticket.userName}</div>
                      <div className="text-sm text-gray-500">{ticket.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${ticket.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {getStatusIcon(ticket.status)}
                      <span className="ml-1">{ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.purchaseDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {ticket.status === 'active' && (
                        <button 
                          onClick={() => handleValidateTicket(ticket.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Validate Ticket"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {ticket.status === 'active' && (
                        <button 
                          onClick={() => handleStatusChange(ticket.id, 'cancelled')}
                          className="text-red-600 hover:text-red-900"
                          title="Cancel Ticket"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <Ticket className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Ticket Details Modal */}
      {showModal && (
        <TicketModal 
          ticket={selectedTicket} 
          onClose={() => {
            setShowModal(false);
            setSelectedTicket(null);
          }} 
        />
      )}
    </div>
  );
};

export default TicketManagement;