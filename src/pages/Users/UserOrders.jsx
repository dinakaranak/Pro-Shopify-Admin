// src/pages/auth/users/UserOrders.jsx
import React, { useState, useEffect } from 'react';
import { 
  CircularProgress, IconButton, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogContent, DialogTitle
} from '@mui/material';
import { Close, Visibility, LocalShipping } from '@mui/icons-material';
import Api from '../../Services/Api';

const UserOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;
      
      setLoading(true);
      try {
        const response = await Api.get(`/orders/users/${userId}/orders`);
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  // Fetch order details
  const fetchOrderDetails = async (orderId) => {
    setSelectedOrder(orderId);
    try {
      const response = await Api.get(`/orders/admin/${orderId}`);
      setOrderDetails(response.data);
    } catch (err) {
      console.error('Error fetching order details:', err);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress className="text-purple-600" />
        </div>
      ) : orders.length > 0 ? (
        <div className="flex-grow">
          <TableContainer className="max-h-[500px]">
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell className="font-semibold">Order ID</TableCell>
                  <TableCell className="font-semibold">Date</TableCell>
                  <TableCell className="font-semibold">Status</TableCell>
                  <TableCell className="font-semibold">Total</TableCell>
                  <TableCell className="font-semibold">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order._id} hover>
                    <TableCell className="font-medium text-purple-700">
                      #{order.trackingId || order._id.slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      ${order.total?.toFixed(2) || '0.00'}
                    </TableCell>
                    <TableCell>
                      <button 
                        onClick={() => fetchOrderDetails(order._id)}
                        className="text-purple-700 hover:text-purple-900"
                      >
                        <Visibility fontSize="small" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <LocalShipping className="text-gray-400 text-4xl mb-4" />
          <p className="text-gray-500">No orders found</p>
        </div>
      )}

      {/* Order Details Modal */}
      <Dialog 
        open={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
        maxWidth="md"
        fullWidth
        PaperProps={{ className: 'rounded-xl' }}
      >
        <DialogTitle className="flex justify-between items-center bg-purple-50">
          <h3 className="text-lg font-bold text-purple-800">
            Order #{selectedOrder?.slice(-6).toUpperCase()}
          </h3>
          <IconButton onClick={() => setSelectedOrder(null)}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent className="p-6">
          {orderDetails ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>{orderDetails.shippingAddress.fullName}</p>
                    <p>{orderDetails.shippingAddress.address}</p>
                    <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}</p>
                    <p>{orderDetails.shippingAddress.zip}, {orderDetails.shippingAddress.country}</p>
                    <p className="mt-2">{orderDetails.shippingAddress.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span>Status:</span>
                      <span className={`font-medium ${
                        orderDetails.status === 'delivered' ? 'text-green-600' :
                        orderDetails.status === 'cancelled' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {orderDetails.status}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span>Date:</span>
                      <span>{new Date(orderDetails.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span>Payment Method:</span>
                      <span className="capitalize">{orderDetails.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span>Items:</span>
                      <span>{orderDetails.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold">
                      <span>Total:</span>
                      <span>${orderDetails.total?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left">Product</th>
                        <th className="py-2 px-4 text-center">Quantity</th>
                        <th className="py-2 px-4 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="bg-gray-200 border-2 border-dashed rounded-md w-10 h-10 mr-3" />
                              <div>
                                <div className="font-medium">{item.productId?.name || 'Product Name'}</div>
                                <div className="text-sm text-gray-500">SKU: {item.productId?.sku || 'N/A'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">{item.quantity}</td>
                          <td className="py-3 px-4 text-right">${item.price?.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <CircularProgress className="text-purple-600" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserOrders;