import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiChevronDown, FiChevronRight, FiLogOut,
  FiGrid, FiBox, FiTruck, FiImage,
  FiUser, FiLock, FiX, FiMenu
} from 'react-icons/fi';

const SidebarItem = ({ title, icon, children, path, toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  const handleNavClick = () => {
    if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
  };

  return (
    <div className="mb-1">
      {path ? (
        <NavLink
          to={path}
          onClick={handleNavClick}
          className={({ isActive }) =>
            `no-underline flex items-center px-3 py-2 rounded-xl transition-all group ${isActive
              ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 text-purple-700 font-medium shadow-sm'
              : 'hover:bg-purple-50/50 text-gray-700'
            }`
          }
        >
          <span className="mr-3 text-xl text-purple-600 group-hover:text-purple-700">
            {icon}
          </span>
          <span className="group-hover:text-gray-900">{title}</span>
        </NavLink>
      ) : (
        <button
          className={`flex justify-between items-center w-full px-3 py-2 rounded-xl text-left transition-all ${open
              ? 'text-gray-900 bg-purple-50/50'
              : 'text-gray-700 hover:bg-purple-50/30'
            }`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center">
            <span className="mr-3 text-xl text-purple-600">{icon}</span>
            <span>{title}</span>
          </div>
          {children &&
            (open ? (
              <FiChevronDown className="text-purple-500 transition-transform duration-300" />
            ) : (
              <FiChevronRight className="text-purple-500 transition-transform duration-300" />
            ))}
        </button>
      )}

      {open && children && (
        <div className="ml-8 mt-1.5 space-y-1.5 py-1.5 border-l-2 border-purple-100">
          {children}
        </div>
      )}
    </div>
  );
};

const SubItem = ({ to, children, toggleSidebar }) => {
  const handleClick = () => {
    if (window.innerWidth < 768 && toggleSidebar) toggleSidebar();
  };

  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={({ isActive }) =>
        `no-underline flex items-center px-3 py-2 rounded-xl transition-all group ${isActive
          ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 text-purple-700 font-medium shadow-sm'
          : 'hover:bg-purple-50/50 text-gray-700'
        }`
      }
    >
      <span className="flex items-center">
        <span className=" rounded-full bg-purple-300 mr-3 group-hover:bg-purple-500 transition-colors"></span>
        {children}
      </span>
    </NavLink>
  );
};

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <div
      className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-purple-100 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:shadow-md
      `}
    >
      {/* Header with close button */}
      <div className="p-3 flex justify-between items-center border-b border-purple-100">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>

        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-purple-100 text-purple-600"
        >
          <FiX className="text-xl" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 overflow-y-auto custom-scrollbar">
        <SidebarItem
          title="Dashboard"
          icon={<FiGrid />}
          path="/"
          toggleSidebar={toggleSidebar}
        />

        <SidebarItem
          title="Products"
          icon={<FiBox />}
          toggleSidebar={toggleSidebar}
        >
          <SubItem to="/add-product" toggleSidebar={toggleSidebar}>Add Product</SubItem>
          <SubItem to="/products" toggleSidebar={toggleSidebar}>All Products</SubItem>
        </SidebarItem>

        <SidebarItem
          title="Banners"
          icon={<FiImage />}
          toggleSidebar={toggleSidebar}
        >
          <SubItem to="/banner" toggleSidebar={toggleSidebar}>Manage Banners</SubItem>
          <SubItem to="/SubBanner" toggleSidebar={toggleSidebar}>Sub BAnners</SubItem>
        </SidebarItem>

        <SidebarItem
          title="Admin"
          icon={<FiUser />}
          toggleSidebar={toggleSidebar}
        >
          <SubItem to="/AdminUsers" toggleSidebar={toggleSidebar}>Admin Users</SubItem>
        </SidebarItem>

        <SidebarItem
          title="Suppliers"
          icon={<FiTruck />}
          toggleSidebar={toggleSidebar}
        >
          <SubItem to="/suppliers" toggleSidebar={toggleSidebar}>All Suppliers</SubItem>
          <SubItem to="/suppliers/add-supplier" toggleSidebar={toggleSidebar}>Add Supplier</SubItem>
          <SubItem to="/suppliers/approve-suppliers" toggleSidebar={toggleSidebar}>Approve Applications</SubItem>
        </SidebarItem>
      </nav>

      {/* Bottom user menu */}
      {/* <div className="absolute bottom-0 left-0 right-0 border-t border-purple-100 p-4 bg-white">
        <div className="space-y-1">
          <NavLink
            to="/profile"
            className="flex items-center px-4 py-2.5 rounded-lg text-gray-700 hover:bg-purple-50/50 transition-colors"
          >
            <FiUser className="mr-3 text-lg text-purple-600" />
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/change-password"
            className="flex items-center px-4 py-2.5 rounded-lg text-gray-700 hover:bg-purple-50/50 transition-colors"
          >
            <FiLock className="mr-3 text-lg text-purple-600" />
            <span>Change Password</span>
          </NavLink>

          <NavLink
            to="/logout"
            className="flex items-center px-4 py-2.5 rounded-lg text-purple-700 hover:bg-purple-50/70 transition-colors"
          >
            <FiLogOut className="mr-3 text-lg text-purple-600" />
            <span>Logout</span>
          </NavLink>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;