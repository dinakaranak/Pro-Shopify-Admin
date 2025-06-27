import React, { useState, useEffect } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

import { toast } from 'react-toastify';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';

const ApproveSuppliers = () => {
  const [pendingSuppliers, setPendingSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingSuppliers();
  }, []);

  const fetchPendingSuppliers = async () => {
    try {
      setLoading(true);
      // This would be implemented with your backend approval endpoint
      const response = await Api.get('/admin-users/pending');
      setPendingSuppliers(response.data);
    } catch (error) {
      toast.error('Failed to fetch pending suppliers');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      // This would be implemented with your backend approval endpoint
      await Api.patch(`/admin-users/${id}/approve`);
      toast.success('Supplier approved successfully');
      fetchPendingSuppliers();
    } catch (error) {
      toast.error('Failed to approve supplier');
    }
  };

  const handleReject = async (id) => {
    try {
      await Api.delete(`/admin-users/${id}`)
      toast.success('Supplier application rejected');
      fetchPendingSuppliers();
    } catch (error) {
      toast.error('Failed to reject supplier application');
    }
  };

  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { 
      key: 'createdAt', 
      title: 'Applied On',
      render: (item) => new Date(item.createdAt).toLocaleDateString()
    },
    { 
      key: 'status', 
      title: 'Status',
      render: () => <StatusBadge isActive={false} text="Pending" />
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Supplier Applications</h2>
      
      {pendingSuppliers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">No pending applications</div>
          <div className="text-gray-400">All supplier applications have been processed</div>
        </div>
      ) : (
        <DataTable 
          data={pendingSuppliers}
          columns={columns}
          showActions={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onToggleStatus={() => {}}
          customActions={(item) => (
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleApprove(item._id)}
                className="text-green-600 hover:text-green-800"
                title="Approve"
              >
                <FiCheck size={18} />
              </button>
              <button
                onClick={() => handleReject(item._id)}
                className="text-red-600 hover:text-red-800"
                title="Reject"
              >
                <FiX size={18} />
              </button>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default ApproveSuppliers;