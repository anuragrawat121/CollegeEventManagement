import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  DollarSign,
  CreditCard,
  TrendingUp,
  Calendar,
  User,
  FileText,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const PaymentRevenue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Dummy transactions data
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-001',
      paymentId: 'PAY-12345',
      userId: 1,
      userName: 'John Doe',
      userEmail: 'john.doe@college.edu',
      eventId: 1,
      eventTitle: 'Tech Symposium 2024',
      amount: 25,
      status: 'success',
      paymentMethod: 'Credit Card',
      transactionDate: '2024-01-10 14:30:00',
      ticketId: 'TKT-001',
      processingFee: 1.25,
      netAmount: 23.75,
      gatewayResponse: 'Transaction successful'
    },
    {
      id: 'TXN-002',
      paymentId: 'PAY-12346',
      userId: 2,
      userName: 'Jane Smith',
      userEmail: 'jane.smith@college.edu',
      eventId: 2,
      eventTitle: 'Cultural Night 2024',
      amount: 15,
      status: 'success',
      paymentMethod: 'Debit Card',
      transactionDate: '2024-01-15 16:45:00',
      ticketId: 'TKT-002',
      processingFee: 0.75,
      netAmount: 14.25,
      gatewayResponse: 'Transaction successful'
    },
    {
      id: 'TXN-003',
      paymentId: 'PAY-12347',
      userId: 3,
      userName: 'Mike Johnson',
      userEmail: 'mike.johnson@college.edu',
      eventId: 3,
      eventTitle: 'Annual Sports Meet',
      amount: 10,
      status: 'failed',
      paymentMethod: 'Credit Card',
      transactionDate: '2024-01-08 12:20:00',
      ticketId: null,
      processingFee: 0,
      netAmount: 0,
      gatewayResponse: 'Insufficient funds'
    },
    {
      id: 'TXN-004',
      paymentId: 'PAY-12348',
      userId: 4,
      userName: 'Sarah Wilson',
      userEmail: 'sarah.wilson@college.edu',
      eventId: 1,
      eventTitle: 'Tech Symposium 2024',
      amount: 25,
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      transactionDate: '2024-01-20 10:15:00',
      ticketId: 'TKT-004',
      processingFee: 0,
      netAmount: 25,
      gatewayResponse: 'Payment processing'
    },
    {
      id: 'TXN-005',
      paymentId: 'PAY-12349',
      userId: 5,
      userName: 'David Brown',
      userEmail: 'david.brown@college.edu',
      eventId: 2,
      eventTitle: 'Cultural Night 2024',
      amount: 15,
      status: 'refunded',
      paymentMethod: 'Credit Card',
      transactionDate: '2024-01-12 09:30:00',
      ticketId: 'TKT-005',
      processingFee: 0.75,
      netAmount: 14.25,
      gatewayResponse: 'Refund processed'
    }
  ]);

  const events = [
    { id: 1, title: 'Tech Symposium 2024' },
    { id: 2, title: 'Cultural Night 2024' },
    { id: 3, title: 'Annual Sports Meet' },
    { id: 4, title: 'Startup Pitch Competition' }
  ];

  // Revenue data for charts
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 2400, transactions: 45 },
    { month: 'Feb', revenue: 1398, transactions: 32 },
    { month: 'Mar', revenue: 9800, transactions: 78 },
    { month: 'Apr', revenue: 3908, transactions: 56 },
    { month: 'May', revenue: 4800, transactions: 69 },
    { month: 'Jun', revenue: 3800, transactions: 52 },
  ];

  const eventRevenueData = [
    { name: 'Tech Symposium', revenue: 12500, color: '#3b82f6' },
    { name: 'Cultural Night', revenue: 8500, color: '#10b981' },
    { name: 'Sports Meet', revenue: 6000, color: '#f59e0b' },
    { name: 'Startup Pitch', revenue: 4500, color: '#ef4444' },
  ];

  const paymentMethodData = [
    { name: 'Credit Card', value: 45, color: '#3b82f6' },
    { name: 'Debit Card', value: 30, color: '#10b981' },
    { name: 'Bank Transfer', value: 15, color: '#f59e0b' },
    { name: 'Digital Wallet', value: 10, color: '#ef4444' },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesEvent = eventFilter === 'all' || transaction.eventId.toString() === eventFilter;
    
    return matchesSearch && matchesStatus && matchesEvent;
  });

  const handleStatusChange = (transactionId, newStatus) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === transactionId ? { ...transaction, status: newStatus } : transaction
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'refunded': return <RefreshCw className="w-4 h-4" />;
      default: return null;
    }
  };

  const TransactionModal = ({ transaction, onClose }) => {
    if (!transaction) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{transaction.id}</h2>
                  <p className="text-gray-600">{transaction.eventTitle}</p>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="ml-2 font-medium">{transaction.paymentId}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">Amount:</span>
                    <span className="ml-2 font-medium">${transaction.amount}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600">Processing Fee:</span>
                    <span className="ml-2 font-medium">${transaction.processingFee}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600">Net Amount:</span>
                    <span className="ml-2 font-medium">${transaction.netAmount}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="ml-2 font-medium">{transaction.paymentMethod}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Info</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="ml-2 text-sm font-medium">{transaction.userName}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="ml-2 text-sm font-medium">{transaction.userEmail}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Transaction Date:</span>
                    <span className="ml-2 text-sm font-medium">{transaction.transactionDate}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Ticket ID:</span>
                    <span className="ml-2 text-sm font-medium">{transaction.ticketId || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gateway Response</h3>
              <p className="text-sm text-gray-600">{transaction.gatewayResponse}</p>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            {transaction.status === 'success' && (
              <button 
                onClick={() => {
                  handleStatusChange(transaction.id, 'refunded');
                  onClose();
                }}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Process Refund
              </button>
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
    totalRevenue: transactions.filter(t => t.status === 'success').reduce((sum, t) => sum + t.amount, 0),
    successfulTransactions: transactions.filter(t => t.status === 'success').length,
    pendingTransactions: transactions.filter(t => t.status === 'pending').length,
    failedTransactions: transactions.filter(t => t.status === 'failed').length,
    refundedAmount: transactions.filter(t => t.status === 'refunded').reduce((sum, t) => sum + t.amount, 0),
    processingFees: transactions.filter(t => t.status === 'success').reduce((sum, t) => sum + t.processingFee, 0)
  };

  const downloadReport = (format) => {
    // In real implementation, this would generate and download the report
    alert(`Downloading ${format.toUpperCase()} report...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Payment & Revenue</h1>
        <div className="mt-4 sm:mt-0 flex space-x-4">
          <button 
            onClick={() => downloadReport('csv')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Download className="w-4 h-4 mr-2" />
            CSV Report
          </button>
          <button 
            onClick={() => downloadReport('pdf')}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            PDF Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">${stats.totalRevenue}</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.successfulTransactions}</p>
            <p className="text-sm text-gray-600">Successful</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingTransactions}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{stats.failedTransactions}</p>
            <p className="text-sm text-gray-600">Failed</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">${stats.refundedAmount}</p>
            <p className="text-sm text-gray-600">Refunded</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-600">${stats.processingFees.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Fees</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Event Revenue Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Event</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={eventRevenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

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

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                        <div className="text-sm text-gray-500">{transaction.paymentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{transaction.userName}</div>
                      <div className="text-sm text-gray-500">{transaction.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.eventTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${transaction.amount}</div>
                    {transaction.processingFee > 0 && (
                      <div className="text-xs text-gray-500">Fee: ${transaction.processingFee}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      <span className="ml-1">{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.transactionDate.split(' ')[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      {showModal && (
        <TransactionModal 
          transaction={selectedTransaction} 
          onClose={() => {
            setShowModal(false);
            setSelectedTransaction(null);
          }} 
        />
      )}
    </div>
  );
};

export default PaymentRevenue;