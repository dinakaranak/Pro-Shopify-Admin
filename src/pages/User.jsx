// src/pages/admin/UserManagementPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaUserPlus, 
  FaEdit, 
  FaTrash, 
  FaToggleOn, 
  FaToggleOff, 
  FaUserShield, 
  FaUser, 
  FaUserTie,
  FaFilter,
  FaSync
} from 'react-icons/fa';

const User = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulating API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers = [
        {
          id: 1,
          name: 'John Smith',
          email: 'john@example.com',
          role: 'admin',
          status: 'active',
          lastLogin: '2023-06-15',
          joinDate: '2022-01-15',
          orders: 42,
          avatar: '/avatar1.png',
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          role: 'customer',
          status: 'active',
          lastLogin: '2023-06-20',
          joinDate: '2021-11-03',
          orders: 18,
          avatar: '/avatar2.png',
        },
        {
          id: 3,
          name: 'Michael Brown',
          email: 'michael@example.com',
          role: 'supplier',
          status: 'active',
          lastLogin: '2023-06-18',
          joinDate: '2022-03-22',
          orders: 0,
          avatar: '/avatar3.png',
        },
        {
          id: 4,
          name: 'Emily Davis',
          email: 'emily@example.com',
          role: 'customer',
          status: 'inactive',
          lastLogin: '2023-05-28',
          joinDate: '2023-02-10',
          orders: 7,
          avatar: '/avatar4.png',
        },
        {
          id: 5,
          name: 'David Wilson',
          email: 'david@example.com',
          role: 'admin',
          status: 'active',
          lastLogin: '2023-06-22',
          joinDate: '2020-09-15',
          orders: 92,
          avatar: '/avatar5.png',
        },
        {
          id: 6,
          name: 'Jennifer Lee',
          email: 'jennifer@example.com',
          role: 'customer',
          status: 'active',
          lastLogin: '2023-06-21',
          joinDate: '2022-12-01',
          orders: 31,
          avatar: '/avatar6.png',
        },
        {
          id: 7,
          name: 'Robert Garcia',
          email: 'robert@example.com',
          role: 'supplier',
          status: 'inactive',
          lastLogin: '2023-06-10',
          joinDate: '2021-07-19',
          orders: 0,
          avatar: '/avatar7.png',
        },
        {
          id: 8,
          name: 'Lisa Chen',
          email: 'lisa@example.com',
          role: 'customer',
          status: 'active',
          lastLogin: '2023-06-19',
          joinDate: '2023-01-25',
          orders: 14,
          avatar: '/avatar8.png',
        },
        {
          id: 9,
          name: 'Thomas Anderson',
          email: 'thomas@example.com',
          role: 'admin',
          status: 'active',
          lastLogin: '2023-06-23',
          joinDate: '2019-05-30',
          orders: 127,
          avatar: '/avatar9.png',
        },
        {
          id: 10,
          name: 'Amanda Roberts',
          email: 'amanda@example.com',
          role: 'customer',
          status: 'inactive',
          lastLogin: '2023-05-15',
          joinDate: '2022-08-12',
          orders: 5,
          avatar: '/avatar10.png',
        },
      ];
      
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
      setLoading(false);
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = users;
    
    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term)
      );
    }
    
    setFilteredUsers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [users, roleFilter, statusFilter, searchTerm]);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Handle user actions
  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setShowDeleteModal(false);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <FaUserShield className="text-indigo-600" />;
      case 'supplier': return <FaUserTie className="text-purple-600" />;
      default: return <FaUser className="text-blue-500" />;
    }
  };

  const getStatusBadge = (status) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {status === 'active' ? 'Active' : 'Inactive'}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
            <p className="text-gray-600 mt-2">
              Manage all users of your e-commerce platform
            </p>
          </div>
          <button className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg flex items-center transition-colors">
            <FaUserPlus className="mr-2" /> Add New User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-gray-500 text-sm">Total Users</div>
            <div className="text-3xl font-bold text-gray-800 mt-1">{users.length}</div>
            <div className="text-green-500 text-sm mt-2 flex items-center">
              <span>↑ 12% from last month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-gray-500 text-sm">Active Users</div>
            <div className="text-3xl font-bold text-gray-800 mt-1">
              {users.filter(u => u.status === 'active').length}
            </div>
            <div className="text-gray-500 text-sm mt-2">
              {Math.round((users.filter(u => u.status === 'active').length / users.length) * 100)}% of total
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-gray-500 text-sm">Customers</div>
            <div className="text-3xl font-bold text-gray-800 mt-1">
              {users.filter(u => u.role === 'customer').length}
            </div>
            <div className="text-gray-500 text-sm mt-2">
              Avg. orders: 18.6
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-gray-500 text-sm">Admins & Suppliers</div>
            <div className="text-3xl font-bold text-gray-800 mt-1">
              {users.filter(u => u.role === 'admin' || u.role === 'supplier').length}
            </div>
            <div className="text-gray-500 text-sm mt-2">
              3 admins, 2 suppliers
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                  <option value="supplier">Supplier</option>
                </select>
              </div>
              
              <div className="relative">
                <select
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <button 
                onClick={fetchUsers}
                className="px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 flex items-center"
              >
                <FaSync />
              </button>
            </div>
          </div>
        </div>

        {/* User Table */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center">
            <div className="bg-red-100 text-red-600 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Failed to load users</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button 
              onClick={fetchUsers}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center text-gray-500">
                              {user.avatar ? (
                                <img className="w-10 h-10 rounded-full" src={user.avatar} alt={user.name} />
                              ) : (
                                <FaUser className="text-xl" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getRoleIcon(user.role)}
                            <span className="ml-2 text-sm text-gray-900 capitalize">{user.role}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(user.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.orders} orders
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className="text-gray-600 hover:text-indigo-900"
                              title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                            >
                              {user.status === 'active' ? (
                                <FaToggleOn className="text-2xl text-green-500" />
                              ) : (
                                <FaToggleOff className="text-2xl text-gray-400" />
                              )}
                            </button>
                            <button
                              className="text-gray-600 hover:text-blue-600"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowDeleteModal(true);
                              }}
                              className="text-gray-600 hover:text-red-600"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 bg-white rounded-xl shadow-sm p-4">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastUser, filteredUsers.length)}
                </span> of{' '}
                <span className="font-medium">{filteredUsers.length}</span> users
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Confirm Deletion</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-red-100 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-2">
                  Are you sure you want to delete this user?
                </p>
                <p className="font-medium text-gray-900">{selectedUser.name}</p>
                <p className="text-gray-500 mt-2 text-sm">
                  {selectedUser.email}
                </p>
                <p className="text-red-600 mt-4 text-sm bg-red-50 py-2 px-4 rounded-lg">
                  This action cannot be undone. All user data will be permanently removed.
                </p>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(selectedUser.id)}
                className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-orange-600 rounded-lg shadow-sm hover:from-red-700 hover:to-orange-700"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;