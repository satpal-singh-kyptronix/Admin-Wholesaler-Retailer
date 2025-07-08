import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShippingAndLogistic.scss";
import {
  ArrowIcon,
  DelecteIcon,
  DispatchShipmentIcon,
  FilterIcon,
  PenndingShipment,
  SortIcon,
  TotalCompletedShipmentIcon,
  TotalShipmentIcon,
} from "../../../assets/Svgs/AllSvgs";

export const ShippingAndLogistic = () => {
  const API = import.meta.env.VITE_API_BASE_URL;
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const res = await axios.get(`${API}/api/auth/all-shipments`);
      setShipments(res.data.shipments);
    } catch (error) {
      console.error("Failed to fetch shipments:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "status-delivered";
      case "pending":
        return "status-pending";
      case "shipped":
        return "status-shipped";
      default:
        return "status-default";
    }
  };

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch = 
      shipment.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || shipment.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="shippingAndLogistic__mainWrapper">
      <div className="page-header">
        <h3>Shipping & Logistics</h3>
        <p className="page-subtitle">Manage and track all your shipments in one place</p>
      </div>

      {/* Summary Cards */}
      <div className="SAL__reportMainWrapper">
        <SummaryCard
          title="Total Shipments"
          count={shipments.length}
          icon={<TotalShipmentIcon />}
          trend="+12.5%"
          trendUp={true}
        />
        <SummaryCard
          title="Completed"
          count={shipments.filter((s) => s.status === "delivered").length}
          icon={<TotalCompletedShipmentIcon />}
          trend="+8.3%"
          trendUp={true}
          highlight="success"
        />
        <SummaryCard
          title="Pending"
          count={shipments.filter((s) => s.status === "pending").length}
          icon={<PenndingShipment />}
          trend="-2.1%"
          trendUp={false}
          highlight="warning"
        />
        <SummaryCard
          title="Dispatched"
          count={shipments.filter((s) => s.status === "shipped").length}
          icon={<DispatchShipmentIcon />}
          trend="+4.5%"
          trendUp={true}
          highlight="info"
        />
      </div>

      {/* Table */}
      <div className="SAL__userListMainWrapper">
        <div className="SAL__listTopFilterWrapper">
          <div className="filter-tabs">
            <button 
              className={`tab-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All Orders
            </button>
            <button 
              className={`tab-btn ${filterStatus === 'pending' ? 'active' : ''}`}
              onClick={() => setFilterStatus('pending')}
            >
              Pending
            </button>
            <button 
              className={`tab-btn ${filterStatus === 'shipped' ? 'active' : ''}`}
              onClick={() => setFilterStatus('shipped')}
            >
              Shipped
            </button>
            <button 
              className={`tab-btn ${filterStatus === 'delivered' ? 'active' : ''}`}
              onClick={() => setFilterStatus('delivered')}
            >
              Delivered
            </button>
          </div>
          <div className="filterWrapper">
            <div className="inputWrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search orders..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="filter-btn">
              <SortIcon /> 
              <span>Sort</span>
            </button>
            <button className="filter-btn">
              <FilterIcon /> 
              <span>Filter</span>
            </button>
            <button className="delete-btn">
              <DelecteIcon />
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="shipmentTable">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Buyer</th>
                <th>Email</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Shipped On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    <div className="empty-state-content">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 9h6v6h-6z"/>
                        <path d="M3 3h18v18H3z"/>
                      </svg>
                      <p>No shipments found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredShipments.map((s, index) => (
                  <tr key={index}>
                    <td className="order-id">{s.orderId}</td>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {s.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span>{s.user?.name}</span>
                      </div>
                    </td>
                    <td className="email">{s.user?.email}</td>
                    <td className="destination">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {s.address?.city}, {s.address?.state}
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusColor(s.status)}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="date">
                      {new Date(s.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => setSelectedShipment(s)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedShipment && (
        <div className="shipment-modal" onClick={() => setSelectedShipment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Shipment Details</h3>
              <button 
                className="modal-close"
                onClick={() => setSelectedShipment(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <h4>Order Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Order ID</span>
                    <span className="value">{selectedShipment.orderId}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Status</span>
                    <span className={`status-badge ${getStatusColor(selectedShipment.status)}`}>
                      {selectedShipment.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Customer Details</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Name</span>
                    <span className="value">{selectedShipment.user?.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Email</span>
                    <span className="value">{selectedShipment.user?.email}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Shipping Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Tracking Number</span>
                    <span className="value">{selectedShipment.shipping?.trackingNumber || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Shipping Address</span>
                    <span className="value">
                      {selectedShipment.address?.addressLine1}, {selectedShipment.address?.city}, {selectedShipment.address?.state}
                    </span>
                  </div>
                </div>
                
                {selectedShipment.trackingUrl && (
                  <div className="detail-item">
                    <span className="label">Tracking URL</span>
                    <a href={selectedShipment.trackingUrl} target="_blank" className="link-value">
                      Track Package
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  </div>
                )}
                
                {selectedShipment.shipping?.labelDownload?.pdf && (
                  <div className="detail-item">
                    <span className="label">Shipping Label</span>
                    <a href={selectedShipment.shipping.labelDownload.pdf} target="_blank" className="link-value">
                      Download PDF
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </a>
                  </div>
                )}
              </div>

              {selectedShipment.productDetails && selectedShipment.productDetails.length > 0 && (
                <div className="detail-section">
                  <h4>Products</h4>
                  <div className="products-list">
                    {selectedShipment.productDetails.map((p, i) => (
                      <div key={i} className="product-item">
                        <div className="product-info">
                          <span className="product-name">{p.name}</span>
                          <span className="product-qty">Qty: {p.quantity}</span>
                        </div>
                        <span className="product-price">₹{p.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SummaryCard = ({ title, count, icon, trend, trendUp, highlight }) => (
  <div className={`SAL__reportCardMainWrapper ${highlight ? `highlight-${highlight}` : ''}`}>
    <div className="reportCard__iconWrapper">{icon}</div>
    <div className="reportCard__contentMainWrapper">
      <div className="contentBox">
        <p>{title}</p>
        <h3>{count}</h3>
      </div>
      <div className="report__percentWrapper">
        <span className={`report__arrowWrapper ${trendUp ? 'up' : 'down'}`}>
          <ArrowIcon />
        </span>
        <span className={`report__span ${trendUp ? 'positive' : 'negative'}`}>
          {trend}
        </span>
      </div>
    </div>
  </div>
);