import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  DollarSign, 
  Ticket,
  Download,
  Filter,
  Eye,
  Award,
  Target,
  Clock
} from 'lucide-react';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('attendance');

  // Dummy analytics data
  const attendanceTrends = [
    { month: 'Jul', events: 8, attendance: 1200, avgAttendance: 150 },
    { month: 'Aug', events: 12, attendance: 1800, avgAttendance: 150 },
    { month: 'Sep', events: 15, attendance: 2400, avgAttendance: 160 },
    { month: 'Oct', events: 18, attendance: 3200, avgAttendance: 178 },
    { month: 'Nov', events: 22, attendance: 4100, avgAttendance: 186 },
    { month: 'Dec', events: 25, attendance: 4800, avgAttendance: 192 },
  ];

  const popularEvents = [
    { name: 'Tech Symposium 2024', attendance: 850, capacity: 900, rating: 4.8 },
    { name: 'Cultural Night', attendance: 720, capacity: 800, rating: 4.6 },
    { name: 'Annual Sports Meet', attendance: 680, capacity: 1000, rating: 4.4 },
    { name: 'Startup Pitch Competition', attendance: 320, capacity: 350, rating: 4.7 },
    { name: 'Music Festival', attendance: 450, capacity: 500, rating: 4.5 },
  ];

  const revenueGrowth = [
    { month: 'Jul', revenue: 8500, growth: 5.2 },
    { month: 'Aug', revenue: 12400, growth: 45.9 },
    { month: 'Sep', revenue: 15800, growth: 27.4 },
    { month: 'Oct', revenue: 18200, growth: 15.2 },
    { month: 'Nov', revenue: 22100, growth: 21.4 },
    { month: 'Dec', revenue: 28500, growth: 28.9 },
  ];

  const eventCategoryData = [
    { name: 'Technology', value: 35, color: '#3b82f6', events: 28 },
    { name: 'Cultural', value: 25, color: '#10b981', events: 20 },
    { name: 'Sports', value: 20, color: '#f59e0b', events: 16 },
    { name: 'Academic', value: 12, color: '#ef4444', events: 10 },
    { name: 'Business', value: 8, color: '#8b5cf6', events: 6 },
  ];

  const userEngagementData = [
    { month: 'Jul', newUsers: 120, activeUsers: 1450, retention: 68 },
    { month: 'Aug', newUsers: 180, activeUsers: 1580, retention: 72 },
    { month: 'Sep', newUsers: 220, activeUsers: 1750, retention: 75 },
    { month: 'Oct', newUsers: 280, activeUsers: 1920, retention: 78 },
    { month: 'Nov', newUsers: 320, activeUsers: 2100, retention: 80 },
    { month: 'Dec', newUsers: 380, activeUsers: 2350, retention: 82 },
  ];

  const topPerformers = [
    { name: 'John Doe', role: 'Organizer', eventsCreated: 12, avgAttendance: 245, rating: 4.8 },
    { name: 'Jane Smith', role: 'Organizer', eventsCreated: 10, avgAttendance: 220, rating: 4.7 },
    { name: 'Mike Johnson', role: 'Organizer', eventsCreated: 8, avgAttendance: 198, rating: 4.6 },
    { name: 'Sarah Wilson', role: 'Organizer', eventsCreated: 7, avgAttendance: 180, rating: 4.5 },
    { name: 'David Brown', role: 'Organizer', eventsCreated: 6, avgAttendance: 165, rating: 4.4 },
  ];

  const eventTimingAnalysis = [
    { time: '9 AM', events: 5, avgAttendance: 120 },
    { time: '10 AM', events: 12, avgAttendance: 180 },
    { time: '11 AM', events: 18, avgAttendance: 220 },
    { time: '2 PM', events: 25, avgAttendance: 280 },
    { time: '3 PM', events: 22, avgAttendance: 260 },
    { time: '4 PM', events: 15, avgAttendance: 200 },
    { time: '6 PM', events: 30, avgAttendance: 320 },
    { time: '7 PM', events: 28, avgAttendance: 300 },
  ];

  const stats = [
    { 
      title: 'Total Events', 
      value: '156', 
      change: '+23%', 
      trend: 'up', 
      icon: Calendar,
      color: 'bg-blue-500'
    },
    { 
      title: 'Total Attendance', 
      value: '18,420', 
      change: '+18%', 
      trend: 'up', 
      icon: Users,
      color: 'bg-green-500'
    },
    { 
      title: 'Avg. Attendance', 
      value: '118', 
      change: '+12%', 
      trend: 'up', 
      icon: Target,
      color: 'bg-purple-500'
    },
    { 
      title: 'Revenue Growth', 
      value: '28.9%', 
      change: '+5.2%', 
      trend: 'up', 
      icon: TrendingUp,
      color: 'bg-yellow-500'
    },
  ];

  const downloadReport = (type) => {
    // In real implementation, this would generate and download the report
    alert(`Downloading ${type} analytics report...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="mt-4 sm:mt-0 flex space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button 
            onClick={() => downloadReport('analytics')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

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
                    <span className="text-sm text-gray-500 ml-1">from last period</span>
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

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={attendanceTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="attendance" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3}
                name="Total Attendance"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Growth */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Event Categories & User Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Categories */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Categories Distribution</h3>
          <div className="flex">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={eventCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {eventCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="ml-4 space-y-2">
              {eventCategoryData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="text-sm">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-gray-500">{item.events} events</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Engagement */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userEngagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="newUsers" fill="#3b82f6" name="New Users" />
              <Bar dataKey="activeUsers" fill="#10b981" name="Active Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Event Timing Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimal Event Timing Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={eventTimingAnalysis}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="events" fill="#8b5cf6" name="Number of Events" />
            <Bar dataKey="avgAttendance" fill="#f59e0b" name="Avg Attendance" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Popular Events */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Most Popular Events</h3>
            <Award className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {popularEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{event.name}</div>
                  <div className="text-sm text-gray-500">
                    {event.attendance}/{event.capacity} attendees
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(event.attendance / event.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="font-semibold text-yellow-600">★ {event.rating}</div>
                  <div className="text-sm text-gray-500">
                    {Math.round((event.attendance / event.capacity) * 100)}% full
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Organizers */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Organizers</h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            {topPerformers.map((organizer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">
                      {organizer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{organizer.name}</div>
                    <div className="text-sm text-gray-500">
                      {organizer.eventsCreated} events created
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{organizer.avgAttendance}</div>
                  <div className="text-sm text-gray-500">avg attendance</div>
                  <div className="text-xs text-yellow-600">★ {organizer.rating}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="font-semibold text-blue-900">Growth Trend</h4>
            </div>
            <p className="text-sm text-blue-800">
              Event attendance has grown by 28.9% over the last 6 months, with technology events leading the growth.
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="font-semibold text-green-900">Peak Hours</h4>
            </div>
            <p className="text-sm text-green-800">
              Events scheduled between 6-7 PM have the highest attendance rates, averaging 320 participants.
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Award className="w-5 h-5 text-yellow-600 mr-2" />
              <h4 className="font-semibold text-yellow-900">Top Category</h4>
            </div>
            <p className="text-sm text-yellow-800">
              Technology events make up 35% of all events and consistently achieve 95%+ capacity utilization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;