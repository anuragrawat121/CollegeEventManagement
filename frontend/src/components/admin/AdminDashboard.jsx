import React from 'react';
import { 
  Users, 
  Calendar, 
  Ticket, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  CheckCircle,
  Clock
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard = () => {
  // Dummy data
  const stats = [
    { 
      title: 'Total Users', 
      value: '2,847', 
      change: '+12.5%', 
      trend: 'up', 
      icon: Users,
      color: 'bg-blue-500'
    },
    { 
      title: 'Total Events', 
      value: '156', 
      change: '+8.2%', 
      trend: 'up', 
      icon: Calendar,
      color: 'bg-green-500'
    },
    { 
      title: 'Tickets Sold', 
      value: '8,924', 
      change: '+23.1%', 
      trend: 'up', 
      icon: Ticket,
      color: 'bg-purple-500'
    },
    { 
      title: 'Total Revenue', 
      value: '$124,850', 
      change: '+15.7%', 
      trend: 'up', 
      icon: DollarSign,
      color: 'bg-yellow-500'
    },
  ];

  const monthlyData = [
    { month: 'Jan', tickets: 400, revenue: 2400 },
    { month: 'Feb', tickets: 300, revenue: 1398 },
    { month: 'Mar', tickets: 600, revenue: 9800 },
    { month: 'Apr', tickets: 800, revenue: 3908 },
    { month: 'May', tickets: 700, revenue: 4800 },
    { month: 'Jun', tickets: 900, revenue: 3800 },
    { month: 'Jul', tickets: 1200, revenue: 4300 },
  ];

  const eventRevenueData = [
    { name: 'Tech Fest 2024', revenue: 15000, participants: 500 },
    { name: 'Cultural Night', revenue: 8500, participants: 300 },
    { name: 'Sports Meet', revenue: 12000, participants: 450 },
    { name: 'Annual Day', revenue: 20000, participants: 800 },
    { name: 'Hackathon', revenue: 6000, participants: 150 },
  ];

  const eventStatusData = [
    { name: 'Approved', value: 85, color: '#10b981' },
    { name: 'Pending', value: 23, color: '#f59e0b' },
    { name: 'Rejected', value: 12, color: '#ef4444' },
  ];

  const recentEvents = [
    { 
      id: 1, 
      title: 'Tech Symposium 2024', 
      organizer: 'John Doe', 
      date: '2024-01-15', 
      status: 'approved',
      participants: 250 
    },
    { 
      id: 2, 
      title: 'Music Festival', 
      organizer: 'Jane Smith', 
      date: '2024-01-20', 
      status: 'pending',
      participants: 180 
    },
    { 
      id: 3, 
      title: 'Art Exhibition', 
      organizer: 'Mike Johnson', 
      date: '2024-01-25', 
      status: 'approved',
      participants: 120 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendIcon className={`w-4 h-4 mr-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Ticket Sales & Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="tickets" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Tickets Sold"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Event Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={eventStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {eventStatusData.map((entry, index) => (
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

      {/* Recent Events & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Events */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Events</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Calendar className="w-10 h-10 text-gray-400 bg-gray-100 p-2 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-500">by {event.organizer}</p>
                    <p className="text-xs text-gray-400">{event.date} • {event.participants} participants</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    event.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : event.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {event.status === 'approved' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                    {event.status === 'pending' && <Clock className="w-3 h-3 inline mr-1" />}
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Calendar className="w-5 h-5 mr-2" />
              Approve Pending Events
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Megaphone className="w-5 h-5 mr-2" />
              Send Announcement
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Users className="w-5 h-5 mr-2" />
              Manage Users
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Analytics
            </button>
          </div>

          {/* System Status */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">System Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server Status</span>
                <span className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Gateway</span>
                <span className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;