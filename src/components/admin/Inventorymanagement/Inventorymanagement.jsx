

// import React, { useMemo, useRef, useState, useEffect } from 'react';
// import './InventoryManagement.scss';
// import { TopFilterBtn } from '../../common/TopFilters/TopFilterBtn';
// import {
//   AddInventoryIcon,
//   ArrowIcon,
//   DelecteIcon,
//   FilterIcon,
//   LowerStockIcon,
//   SortIcon,
//   TotalBuyersIcon,
//   TotalInventory,
// } from '../../../assets/Svgs/AllSvgs';
// import { AgGridReact } from 'ag-grid-react';
// import { Camera, CircleX, Edit, Trash } from 'lucide-react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const rowSelection = { mode: 'multiRow', headerCheckbox: false };

// export const Inventorymanagement = () => {
//   const [isAddProduct, setIsAddProduct] = useState(false);
//   const [isEditProduct, setIsEditProduct] = useState({ state: false, productData: null });
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const token = Cookies.get('adminToken') || Cookies.get('wholesalerToken') || Cookies.get('retailerToken');

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5555/api/products', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(response.data);
//     } catch (err) {
//       setError('Failed to fetch products');
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:5555/api/categories', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCategories(response.data);
//     } catch (err) {
//       setError('Failed to fetch categories');
//     }
//   };

//   const onEdit = (product) => {
//     setIsEditProduct({ state: true, productData: product });
//   };

//   const onDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await axios.delete(`http://localhost:5555/api/products/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSuccess('Product deleted successfully!');
//         fetchProducts();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete product');
//       }
//     }
//   };

//   const colDefs = useMemo(() => [
//     { field: 'name', headerName: 'Product' },
//     { field: '_id', headerName: 'ID', valueFormatter: (params) => `#${params.value.slice(-5)}` },
//     { field: 'stock', headerName: 'Stock' },
//     { field: 'buyPrice', headerName: 'Buy', valueFormatter: (params) => `$${params.value.toFixed(2)}` },
//     { field: 'sellPrice', headerName: 'Sell', valueFormatter: (params) => `$${params.value.toFixed(2)}` },
//     { field: 'category.name', headerName: 'Category' },
//     { field: 'updatedAt', headerName: 'Last Stock Date', valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
//     { field: 'createdBy.name', headerName: 'User Name' },
//     { field: 'createdBy._id', headerName: 'User ID', valueFormatter: (params) => `#${params.value.slice(-5)}` },
//     {
//       headerName: 'Actions',
//       cellRenderer: (params) => (
//         <div className="flex gap-4 py-2 justify-center items-center">
//           <button
//             className="font-semibold bg-[var(--button-color1)] text-white p-1.5 rounded-full border-none cursor-pointer"
//             onClick={() => onEdit(params.data)}
//           >
//             <Edit size={18} />
//           </button>
//           <button
//             className="font-semibold bg-[var(--Negative-color)] text-white p-1.5 rounded-full border-none cursor-pointer"
//             onClick={() => onDelete(params.data._id)}
//           >
//             <Trash size={18} />
//           </button>
//         </div>
//       ),
//     },
//   ], []);

//   const defaultColDef = useMemo(() => ({
//     filter: true,
//     editable: false,
//   }), []);

//   return (
//     <div className="inventoryManagement__mainWrapper">
//       <div className="IM__topHeadingWrapper">
//         <h3>Inventory Management</h3>
//         <div className="IM__filterWrapper">
//           <TopFilterBtn />
//           <button className="upload__BTN">Upload CSV</button>
//           <button onClick={() => setIsAddProduct(true)} className="upload__BTN">
//             Add Product
//           </button>
//         </div>
//       </div>
//       <div className="IM__reportMainWrapper">
//         <div className="IM__reportCardMainWrapper">
//           <div className="reportCard__iconWrapper"><AddInventoryIcon /></div>
//           <div className="reportCard__contentMainWrapper">
//             <div className="contentBox"><p>Total Products</p><h3>{products.length}</h3></div>
//             <div className="report__percentWrapperr"><span className="report__arrowWrapper up"><ArrowIcon /></span><span className="report__span">+ 4.5 %</span></div>
//           </div>
//         </div>
//         <div className="IM__reportCardMainWrapper">
//           <div className="reportCard__iconWrapper"><TotalBuyersIcon /></div>
//           <div className="reportCard__contentMainWrapper">
//             <div className="contentBox"><p>Total Buy Price</p><h3>${products.reduce((sum, p) => sum + p.buyPrice * p.stock, 0).toFixed(2)}</h3></div>
//             <div className="report__percentWrapperr"><span className="report__arrowWrapper fall"><ArrowIcon /></span><span className="report__span">+ 4.5 %</span></div>
//           </div>
//         </div>
//         <div className="IM__reportCardMainWrapper">
//           <div className="reportCard__iconWrapper"><TotalInventory /></div>
//           <div className="reportCard__contentMainWrapper">
//             <div className="contentBox"><p>Total Inventory</p><h3>{products.reduce((sum, p) => sum + p.stock, 0)}</h3></div>
//             <div className="report__percentWrapperr"><span className="report__arrowWrapper fall"><ArrowIcon /></span><span className="report__span">+ 4.5 %</span></div>
//           </div>
//         </div>
//         <div className="IM__reportCardMainWrapper">
//           <div className="reportCard__iconWrapper"><LowerStockIcon /></div>
//           <div className="reportCard__contentMainWrapper">
//             <div className="contentBox"><p>Low Stock</p><h3>{products.filter(p => p.stock < 10).length}</h3></div>
//             <div className="report__percentWrapperr"><span className="report__arrowWrapper up"><ArrowIcon /></span><span className="report__span">+ 4.5 %</span></div>
//           </div>
//         </div>
//       </div>
//       <div className="IM__userListMainWrapper">
//         <div className="IM__listTopFilterWrapper">
//           <button className="allUser__Btn">All Inventory</button>
//           <div className="filterWrapper">
//             <div className="inputWrapper"><input type="text" placeholder="Search..." /></div>
//             <button><SortIcon /> Sort</button>
//             <button><FilterIcon /> Filter</button>
//             <button><DelecteIcon /></button>
//           </div>
//         </div>
//         <div className="IM__userTableWrapper">
//           <AgGridReact
//             rowData={products}
//             columnDefs={colDefs}
//             defaultColDef={defaultColDef}
//             pagination={true}
//             rowSelection={rowSelection}
//           />
//         </div>
//       </div>
//       {isAddProduct && <AddProductModel setIsAddProduct={setIsAddProduct} categories={categories} fetchProducts={fetchProducts} token={token} setSuccess={setSuccess} setError={setError} />}
//       {isEditProduct.state && isEditProduct.productData && (
//         <EditProductModel
//           isEditProduct={isEditProduct}
//           setIsEditProduct={setIsEditProduct}
//           categories={categories}
//           fetchProducts={fetchProducts}
//           token={token}
//           setSuccess={setSuccess}
//           setError={setError}
//         />
//       )}
//     </div>
//   );
// };

// const AddProductModel = ({ setIsAddProduct, categories, fetchProducts, token, setSuccess, setError }) => {
//   const addImageRef = useRef(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     buyPrice: '',
//     sellPrice: '',
//     stock: '',
//     category: '',
//   });
//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (images.length + files.length > 5) {
//       setError('Maximum 5 images allowed');
//       return;
//     }
//     setImages([...images, ...files]);
//     setPreviews([...previews, ...files.map(file => URL.createObjectURL(file))]);
//   };

//   const removeImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//     setPreviews(previews.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setSuccess('');

//     const data = new FormData();
//     Object.keys(formData).forEach(key => data.append(key, formData[key]));
//     images.forEach(image => data.append('images', image));

//     try {
//       await axios.post('http://localhost:5555/api/products', data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setSuccess('Product added successfully!');
//       setFormData({ name: '', buyPrice: '', sellPrice: '', stock: '', category: '' });
//       setImages([]);
//       setPreviews([]);
//       fetchProducts();
//       setTimeout(() => setIsAddProduct(false), 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add product');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="AddProductModel__mainWrapper">
//       <div className="APM__contentWrapper">
//         <div className="APM__headingWrapper">
//           <h3 className="font-bold mainFont">Add Product</h3>
//           <button onClick={() => setIsAddProduct(false)}><CircleX size={30} /></button>
//         </div>
//         {error && <div className="error-message">{error}</div>}
//         {success && <div className="success-message">{success}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="my-5 min-h-[20vh] flex justify-center items-center bg-[#eeeeee] p-3 rounded-md border border-dashed border-[#d4d4d4] flex-wrap gap-3">
//             {previews.map((preview, index) => (
//               <div key={index} className="h-[7dvw] w-[7dvw] rounded-md overflow-hidden relative">
//                 <img className="w-full h-full object-cover" src={preview} alt="preview" />
//                 <button
//                   className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
//                   onClick={() => removeImage(index)}
//                   type="button"
//                 >
//                   <CircleX size={16} />
//                 </button>
//               </div>
//             ))}
//             <div className="flex flex-col justify-center items-center gap-2">
//               <button
//                 type="button"
//                 onClick={() => addImageRef.current?.click()}
//                 className="bg-[#d4d4d4] cursor-pointer h-[4dvw] w-[4dvw] flex justify-center items-center rounded-full"
//               >
//                 <Camera />
//               </button>
//               <input
//                 ref={addImageRef}
//                 onChange={handleImageChange}
//                 hidden
//                 type="file"
//                 accept="image/jpeg,image/jpg,image/png"
//                 multiple
//               />
//               <p className="text-center font-semibold paraFont text-[1dvw] text-gray-400">
//                 Add up to 5 product images
//               </p>
//             </div>
//           </div>
//           <div className="w-full grid grid-cols-2 gap-4 my-5">
//             <div className="flex flex-col gap-2">
//               <label className="text-[1dvw] paraFont font-[500] text-[#333333]">Product Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="bg-[#f0f0f0] py-2 px-3 rounded-md mainFont outline-none border border-[#d4d4d4]"
//                 placeholder="Enter Product Name..."
//                 required
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <label className="text-[1dvw] paraFont font-[500] text-[#333333]">Buy Price</label>
//               <input
//                 type="number"
//                 name="buyPrice"
//                 value={formData.buyPrice}
//                 onChange={handleChange}
//                 className="bg-[#f0f0f0] py-2 px-3 rounded-md mainFont outline-none border border-[#d4d4d4]"
//                 placeholder="Enter Buy Price..."
//                 required
//                 min="0"
//                 step="0.01"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <label className="text-[1dvw] paraFont font-[500] text-[#333333]">Sell Price</label>
//               <input
//                 type="number"
//                 name="sellPrice"
//                 value={formData.sellPrice}
//                 onChange={handleChange}
//                 className="bg-[#f0f0f0] py-2 px-3 rounded-md mainFont outline-none border border-[#d4d4d4]"
//                 placeholder="Enter Sell Price..."
//                 required
//                 min="0"
//                 step="0.01"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <label className="text-[1dvw] paraFont font-[500] text-[#333333]">In Stock</label>
//               <input
//                 type="number"
//                 name="stock"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 className="bg-[#f0f0f0] py-2 px-3 rounded-md mainFont outline-none border border-[#d4d4d4]"
//                 placeholder="Enter Stock Quantity..."
//                 required
//                 min="0"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <label className="text-[1dvw] paraFont font-[500] text-[#333333]">Category</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="bg-[#f0f0f0] py-2 px-3 rounded-md mainFont outline-none border border-[#d4d4d4]"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map(category => (
//                   <option key={category._id} value={category._id}>{category.name}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="flex justify-end items-center gap-5 my-5">
//             <button
//               type="button"
//               className="bg-[var(--border-color)] cursor-pointer rounded-md font-semibold text-[1.1dvw] px-5 py-1.5"
//               onClick={() => setIsAddProduct(false)}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-[var(--activeTab-color)] text-white cursor-pointer rounded-md font-semibold text-[1.1dvw] px-5 py-1.5"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Adding Product...' : 'Add Product'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const EditProductModel = ({ setIsEditProduct, isEditProduct, categories, fetchProducts, token, setSuccess, setError }) => {
//   const addImageRef = useRef(null);
//   const [formData, setFormData] = useState({
//     name: isEditProduct.productData.name,
//     buyPrice: isEditProduct.productData.buyPrice,
//     sellPrice: isEditProduct.productData.sellPrice,
//     stock: isEditProduct.productData.stock,
//     category: isEditProduct.productData.category._id,
//   });
//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState(isEditProduct.productData.images || []);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (images.length + files.length > 5) {
//       setError('Maximum 5 images allowed');
//       return;
//     }
//     setImages([...images, ...files]);
//     setPreviews([...previews, ...files.map(file => URL.createObjectURL(file))]);
//   };

//   const removeImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//     setPreviews(previews.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setSuccess('');

//     const data = new FormData();
//     Object.keys(formData).forEach(key => data.append(key, formData[key]));
//     images.forEach(image => data.append('images', image));

//     try {
//       await axios.put(`http://localhost:5555/api/products/${isEditProduct.productData._id}`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setSuccess('Product updated successfully!');
//       fetchProducts();
//       setTimeout(() => setIsEditProduct({ state: false, productData: null }), 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update product');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="AddProductModel__mainWrapper">
//       <div className="APM__contentWrapper">
//         <div className="APM__headingWrapper">
//           <h3 className="font-bold mainFont">Edit Product</h3>
//           <button onClick={() => setIsEditProduct({ state: false, productData: null })}><CircleX size={30} /></button>
//         </div>
//         {error && <div className="error-message">{error}</div>}
//         {success && <div className="success-message">{success}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="my-5 min-h-[20vh] flex justify-center items-center bg-[#eeeeee] p-3 rounded-md border border-dashed border-[#d4d4d4] flex-wrap gap-3">
//             {previews.map((preview, index) => (
//               <div key={index} className="h-[7dvw] w-[7dvw] rounded-md overflow-hidden relative">
//                 <img className="w-full h-full object-cover" src={preview.startsWith('uploads') ? `http://localhost:5555/${preview}` : preview} alt="preview" />
//                 <button
//                   className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
//                   onClick={() => removeImage(index)}
//                   type="button"
//                 >
//                   <CircleX size={16} />
//                 </button>
//               </div>
//             ))}
//             <div className="flex flex-col justify-center items-center gap-2">
//               <button
//                 type="button"
//                 onClick={() => addImageRef.current?.click()}
//                 className="bg-[#d4d4d4] cursor-pointer h-[4dvw] w-[4dvw] flex justify-center items-center rounded-full"
//               >
//                 <Camera />
//               </button>
//               <input
//                 ref={addImageRef}
//                 onChange={handleImageChange}
//                 hidden
//                 type="file"
//                 accept="image/jpeg,image/jpg,image/png"
//                 multiple
//               />
//               <p className="text-center font-semibold paraFont text-[1dvw] text-gray-400">
//                 Add up to 5 product images
//               </p>
//             </div>
//           </div>
//           <div className="w-full grid grid-cols-2 gap-4 my-5">
//             <div className="flex flex-col gap-2">
//               <label className="text-[1dvw] paraFont font-[500] text-[#333333]">Product Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="bg-[#f0f0f0] py-2 px-3 rounded-md mainFont outline-none border border-[#d4d4d4]"
//                 placeholder="Enter Product Name..."
//                 required
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <label className="text-[1dvw] paraFont font-[500] text-[#333333]">Buy Price</label>
//               <input
//                 type="number"
//                 name="buyPrice"
//                 value={formData.buyPrice}
//                 onChange={handleChange}
//                 className="bg-[#f0f0f0] py-2 px-3 rounded-md mainFont outline-none border border-[#d4d4d4]"
//                 placeholder="Enter Buy Price..."
//                 required
//                 min="0"
//                 step="0.01"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <label className="text-[1dvw] paraFont font-[500] text-[#333333]">Sell Price</label>
//               <input
//                 type="number"
//                 name="sellPrice"
//                 value={formData.sellPrice}
//                 onChange={handleChange}
//                 className="bg-[#f0f0f0] py-2 px-3 rounded-md mainFont outline-none border border-[#d4d4d4]"
//                 placeholder="Enter Sell Price..."
//                 required
//                 min="0"
//                 step="0.01"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <label className="text-[1dvw] paraFont font-[500] text-[#333333]">In Stock</label>
//               <input
//                 type="number"
//                 name="stock"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 className="bg-[#f0f0f0] py-2 px-3 rounded-md mainFont outline-none border border-[#d4d4d4]"
//                 placeholder="Enter Stock Quantity..."
//                 required
//                 min="0"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <label className="text-[1dvw] paraFont font-[500] text-[#333333]">Category</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="bg-[#f0f0f0] py-2 px-3 rounded-md mainFont outline-none border border-[#d4d4d4]"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map(category => (
//                   <option key={category._id} value={category._id}>{category.name}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="flex justify-end items-center gap-5 my-5">
//             <button
//               type="button"
//               className="bg-[var(--border-color)] cursor-pointer rounded-md font-semibold text-[1.1dvw] px-5 py-1.5"
//               onClick={() => setIsEditProduct({ state: false, productData: null })}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-[var(--activeTab-color)] text-white cursor-pointer rounded-md font-semibold text-[1.1dvw] px-5 py-1.5"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Updating Product...' : 'Update Product'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


// import React, { useState, useEffect, useRef } from 'react';
// import {
//   AddInventoryIcon,
//   ArrowIcon,
//   DelecteIcon,
//   FilterIcon,
//   LowerStockIcon,
//   SortIcon,
//   TotalBuyersIcon,
//   TotalInventory,
// } from '../../../assets/Svgs/AllSvgs';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { AgGridReact } from 'ag-grid-react';
// import { Edit, Trash, CircleX, Camera, Plus, ChevronLeft, ChevronRight, Grid3X3, List } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './InventoryManagement.scss';

// export const Inventorymanagement = () => {
//   const [formData, setFormData] = useState({ name: '', buyPrice: '', sellPrice: '', stock: '', category: '' });
//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isEdit, setIsEdit] = useState({ state: false, productId: null });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [viewMode, setViewMode] = useState('table');
//   const imageRef = useRef(null);

//   const token = Cookies.get('adminToken') ;
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const filtered = products.filter(product =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//     setCurrentPage(1);
//   }, [products, searchTerm]);

//   const fetchProducts = async () => {
//     try {
//       setFetchLoading(true);
//       const response = await axios.get(`${API_BASE_URL}/api/admin/get-products`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(response.data);
//     } catch (err) {
//       setError('Failed to fetch products');
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/admin/get-category`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCategories(response.data);
//     } catch (err) {
//       setError('Failed to fetch categories');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError('');
//     setSuccess('');
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (images.length + files.length > 10) {
//       setError('Maximum 10 images allowed');
//       return;
//     }
//     setImages([...images, ...files]);
//     setPreviews([...previews, ...files.map(file => URL.createObjectURL(file))]);
//   };

//   const removeImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//     setPreviews(previews.filter((_, i) => i !== index));
//   };

//   const resetForm = () => {
//     setFormData({ name: '', buyPrice: '', sellPrice: '', stock: '', category: '' });
//     setImages([]);
//     setPreviews([]);
//     setIsEdit({ state: false, productId: null });
//     setShowForm(false);
//     setError('');
//     setSuccess('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setSuccess('');

//     const data = new FormData();
//     Object.keys(formData).forEach(key => data.append(key, formData[key]));
//     images.forEach(image => data.append('images', image));

//     try {
//       if (isEdit.state) {
//         await axios.put(`${API_BASE_URL}/api/admin/update-products/${isEdit.productId}`, data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setSuccess('Product updated successfully!');
//       } else {
//         if (images.length === 0) {
//           throw new Error('At least one product image is required');
//         }
//         await axios.post(`${API_BASE_URL}/api/admin/create-product`, data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setSuccess('Product created successfully!');
//       }
//       fetchProducts();
//       setTimeout(() => {
//         resetForm();
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Operation failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (product) => {
//     setFormData({
//       name: product.name,
//       buyPrice: product.buyPrice,
//       sellPrice: product.sellPrice,
//       stock: product.stock,
//       category: product.category._id,
//     });
//     setPreviews(product.images.map(img => `${API_BASE_URL}/${img}`));
//     setImages([]);
//     setIsEdit({ state: true, productId: product._id });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await axios.delete(`${API_BASE_URL}/api/admin/delete-product/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSuccess('Product deleted successfully!');
//         fetchProducts();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete product');
//       }
//     }
//   };

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentProducts = filteredProducts.slice(startIndex, endIndex);
//   const tableItemsPerPage = 10;
//   const tableRowData = viewMode === 'table' ? filteredProducts : [];

//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   const goToPrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const goToNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const summaryData = [
//     {
//       title: 'Total Products',
//       value: products.length,
//       icon: <Plus size={24} />,
//       change: '+4.5%',
//       trend: 'up',
//     },
//     {
//       title: 'Total Buy Price',
//       value: `$${products.reduce((sum, p) => sum + p.buyPrice * p.stock, 0).toFixed(2)}`,
//       icon: <TotalInventory size={24} />,
//       change: '-2.3%',
//       trend: 'down',
//     },
//     {
//       title: 'Total Inventory',
//       value: products.reduce((sum, p) => sum + p.stock, 0),
//       icon: <TotalInventory size={24} />,
//       change: '+1.8%',
//       trend: 'up',
//     },
//     {
//       title: 'Low Stock',
//       value: products.filter(p => p.stock < 10).length,
//       icon: <LowerStockIcon size={24} />,
//       change: '+3.2%',
//       trend: 'up',
//     },
//   ];

//   const columnDefs = [
//     { field: 'name', headerName: 'Product Name', flex: 1 },
//     {
//       field: 'images',
//       headerName: 'Images',
//       width: 120,
//       cellRenderer: (params) => (
//         params.value && params.value.length > 0 ? (
//           <div className="image-cell">
//             <img
//               src={`${API_BASE_URL}/${params.value[0]}`}
//               alt="product"
//               className="category-image"
//             />
//           </div>
//         ) : <span className="no-image">No Image</span>
//       ),
//     },
//     { field: 'buyPrice', headerName: 'Buy Price', flex: 1, valueFormatter: (params) => `$${params.value.toFixed(2)}` },
//     { field: 'sellPrice', headerName: 'Sell Price', flex: 1, valueFormatter: (params) => `$${params.value.toFixed(2)}` },
//     { field: 'stock', headerName: 'Stock', flex: 1 },
//     { field: 'category.name', headerName: 'Category', flex: 1 },
//     { 
//       field: 'createdBy.name', 
//       headerName: 'Created By', 
//       flex: 1 
//     },
//     { 
//       field: 'createdAt', 
//       headerName: 'Created At', 
//       flex: 1,
//       valueFormatter: (params) => new Date(params.value).toLocaleDateString() 
//     },
//     {
//       headerName: 'Actions',
//       width: 120,
//       cellRenderer: (params) => (
//         <div className="actions-cell my-4" style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
//           <button
//             className="edit-btn table-edit-btn"
//             onClick={() => handleEdit(params.data)}
//             title="Edit Product"
//           >
//             <Edit size={18} />
//           </button>
//           <button
//             className="delete-btn table-delete-btn"
//             onClick={() => handleDelete(params.data._id)}
//             title="Delete Product"
//           >
//             <Trash size={18} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   const formVariants = {
//     hidden: { opacity: 0, scale: 0.95, y: -20 },
//     visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
//     exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } }
//   };

//   const LoadingSpinner = () => (
//     <motion.div 
//       className="loading-spinner"
//       animate={{ rotate: 360 }}
//       transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//     >
//       <div className="spinner-ring"></div>
//     </motion.div>
//   );

//   const ProductCard = ({ product, index }) => (
//     <motion.div
//       className="category-card"
//       variants={itemVariants}
//       initial="hidden"
//       animate="visible"
//       transition={{ delay: index * 0.1 }}
//       whileHover={{ y: -5, scale: 1.02 }}
//       layout
//     >
//       <div className="category-image-container">
//         {product.images && product.images.length > 0 ? (
//           <img
//             src={`${API_BASE_URL}/${product.images[0]}`}
//             alt={product.name}
//             className="category-card-image"
//           />
//         ) : (
//           <div className="no-image-placeholder">
//             <Camera size={24} />
//           </div>
//         )}
//       </div>
//       <div className="category-card-content">
//         <h4 className="category-name">{product.name}</h4>
//         <p className="category-meta">Category: {product.category?.name}</p>
//         <p className="category-meta">Buy: ${product.buyPrice.toFixed(2)}</p>
//         <p className="category-meta">Sell: ${product.sellPrice.toFixed(2)}</p>
//         <p className="category-meta">Stock: {product.stock}</p>
//         <p className="category-date">{new Date(product.createdAt).toLocaleDateString()}</p>
//         <div className="category-actions">
//           <motion.button
//             className="edit-btn"
//             onClick={() => handleEdit(product)}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Edit size={16} />
//           </motion.button>
//           <motion.button
//             className="delete-btn"
//             onClick={() => handleDelete(product._id)}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Trash size={16} />
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );

//   return (
//     <>
//       <style jsx>{`
//         .inventory-management-wrapper {
//           padding: 20px;
//           background: #fff;
//           border-radius: 8px;
//           margin: 20px;
//           min-height: calc(100vh - 140px);
//           overflow-y: auto;
//           max-height: calc(100vh - 140px);
//         }

//         .im-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 30px;
//           padding-bottom: 20px;
//           border-bottom: 2px solid #f0f0f0;
//         }

//         .im-header h3 {
//           font-size: 24px;
//           font-weight: 700;
//           color: #333;
//           margin: 0;
//         }

//         .add-product-btn {
//           background: var(--activeTab-color, #007bff);
//           color: white;
//           border: none;
//           padding: 12px 24px;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           transition: all 0.3s ease;
//         }

//         .add-product-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0,123,255,0.3);
//         }

//         .summary-section {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//           gap: 20px;
//           margin-bottom: 30px;
//         }

//         .summary-card {
//           background: #f8f9fa;
//           padding: 20px;
//           border-radius: 12px;
//           border: 1px solid #e9ecef;
//           display: flex;
//           align-items: center;
//           gap: 15px;
//         }

//         .summary-icon {
//           background: #007bff;
//           color: white;
//           padding: 10px;
//           border-radius: 8px;
//         }

//         .summary-content p {
//           margin: 0;
//           font-size: 14px;
//           color: #6c757d;
//         }

//         .summary-content h3 {
//           margin: 5px 0 0;
//           font-size: 20px;
//           color: #333;
//         }

//         .summary-trend {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           margin-top: 10px;
//         }

//         .summary-trend.up {
//           color: #28a745;
//         }

//         .summary-trend.down {
//           color: #dc3545;
//         }

//         .form-section {
//           background: #f8f9fa;
//           padding: 25px;
//           border-radius: 12px;
//           margin-bottom: 30px;
//           border: 1px solid #e9ecef;
//           box-shadow: 0 4px 20px rgba(0,0,0,0.1);
//         }

//         .form-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }

//         .form-header h4 {
//           font-size: 20px;
//           font-weight: 600;
//           color: #333;
//           margin: 0;
//         }

//         .close-form-btn {
//           background: #6c757d;
//           color: white;
//           border: none;
//           padding: 8px;
//           border-radius: 50%;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .image-upload-area {
//           min-height: 150px;
//           display: flex;
//          policy: nowrap;
//           justify-content: center;
//           align-items: center;
//           background: #fff;
//           padding: 20px;
//           border-radius: 8px;
//           border: 2px dashed #d4d4d4;
//           margin-bottom: 20px;
//           transition: border-color 0.3s ease;
//         }

//         .image-upload-area:hover {
//           border-color: #007bff;
//  колон        }

//         .image-preview {
//           position: relative;
//           width: 120px;
//           height: 120px;
//           border-radius: 8px;
//           overflow: hidden;
//         }

//         .image-preview img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .remove-image-btn {
//           position: absolute;
//           top: 5px;
//           right: 5px;
//           background: #dc3545;
//           color: white;
//           border: none;
//           border-radius: 50%;
//           padding: 4px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .upload-button {
//           background: #e9ecef;
//           border: none;
//           width: 80px;
//           height: 80px;
//           border-radius: 50%;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #6c757d;
//           transition: all 0.3s ease;
//         }

//         .upload-button:hover {
//           background: #dee2e6;
//           transform: scale(1.05);
//         }

//         .upload-text {
//           text-align: center;
//           font-weight: 600;
//           color: #6c757d;
//           margin-top: 10px;
//         }

//         .form-group {
//           margin-bottom: 20px;
//         }

//         .form-label {
//           display: block;
//           font-weight: 600;
//           color: #333;
//           margin-bottom: 8px;
//         }

//         .form-input, .form-select {
//           width: 100%;
//           padding: 12px 16px;
//           background: #fff;
//           border: 1px solid #d4d4d4;
//           border-radius: 8px;
//           font-size: 16px;
//           outline: none;
//           transition: border-color 0.3s ease;
//         }

//         .form-input:focus, .form-select:focus {
//           border-color: #007bff;
//           box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
//         }

//         .form-actions {
//           display: flex;
//           justify-content: flex-end;
//           gap: 12px;
//           margin-top: 25px;
//         }

//         .btn-cancel {
//           background: #6c757d;
//           color: white;
//           border: none;
//           padding: 12px 24px;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.3s ease;
//         }

//         .btn-cancel:hover {
//           background: #5a6268;
//         }

//         .btn-submit {
//           background: var(--activeTab-color, #007bff);
//           color: white;
//           border: none;
//           padding: 12px 24px;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.3s ease;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .btn-submit:hover {
//           background: #0056b3;
//         }

//         .btn-submit:disabled {
//           background: #6c757d;
//           cursor: not-allowed;
//         }

//         .products-section {
//           background: #fff;
//           border-radius: 12px;
//           padding: 25px;
//           border: 1px solid #e9ecef;
//         }

//         .products-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//           flex-wrap: wrap;
//           gap: 15px;
//         }

//         .products-header h4 {
//           font-size: 20px;
//           font-weight: 600;
//           color: #333;
//           margin: 0;
//         }

//         .header-controls {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           flex-wrap: wrap;
//         }

//         .view-toggle {
//           display: flex;
//           background: #f8f9fa;
//           border-radius: 8px;
//           padding: 4px;
//           border: 1px solid #e9ecef;
//         }

//         .view-toggle-btn {
//           background: transparent;
//           border: none;
//           padding: 8px 12px;
//           border-radius: 6px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           transition: all 0.3s ease;
//           font-weight: 500;
//           color: #6c757d;
//         }

//         .view-toggle-btn.active {
//           background: #007bff;
//           color: white;
//           box-shadow: 0 2px 4px rgba(0,123,255,0.2);
//         }

//         .view-toggle-btn:hover:not(.active) {
//           background: #e9ecef;
//           color: #495057;
//         }

//         .search-input {
//           padding: 8px 16px;
//           border: 1px solid #d4d4d4;
//           border-radius: 8px;
//           outline: none;
//           width: 250px;
//           transition: border-color 0.3s ease;
//         }

//         .search-input:focus {
//           border-color: #007bff;
//           box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
//         }

//         .products-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 20px;
//           margin-bottom: 20px;
//           min-height: 300px;
//         }

//         .table-view {
//           height: auto;
//           border-radius: 8px;
//           overflow: hidden;
//           border: 1px solid #e9ecef;
//           margin-bottom: 20px;
//         }

//         .category-card {
//           background: #fff;
//           border: 1px solid #e9ecef;
//           border-radius: 12px;
//           overflow: hidden;
//           transition: all 0.3s ease;
//           cursor: pointer;
//         }

//         .category-card:hover {
//           box-shadow: 0 8px 25px rgba(0,0,0,0.1);
//         }

//         .category-image-container {
//           height: 160px;
//           background: #f8f9fa;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//         }

//         .category-card-image {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .no-image-placeholder {
//           color: #6c757d;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           height: 100%;
//         }

//         .category-card-content {
//           padding: 15px;
//         }

//         .category-name {
//           font-size: 18px;
//           font-weight: 600;
//           color: #333;
//           margin: 0 0 8px 0;
//         }

//         .category-meta {
//           font-size: 14px;
//           color: #6c757d;
//           margin: 0 0 4px 0;
//         }

//         .category-date {
//           font-size: 12px;
//           color: #9ca3af;
//           margin: 0 0 15px 0;
//         }

//         .category-actions {
//           display: flex;
//           gap: 8px;
//           justify-content: flex-end;
//         }

//         .edit-btn, .delete-btn {
//           border: none;
//           padding: 8px;
//           border-radius: 50%;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.3s ease;
//         }

//         .edit-btn {
//           background: var(--button-color1, #007bff);
//           color: white;
//         }

//         .edit-btn:hover {
//           background: #0056b3;
//         }

//         .delete-btn {
//           background: var(--Negative-color, #dc3545);
//           color: white;
//         }

//         .delete-btn:hover {
//           background: #c82333;
//         }

//         .pagination-wrapper {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           gap: 8px;
//           margin-top: 15px;
//           padding: 10px 0;
//           flex-wrap: wrap;
//           background: #f8f9fa;
//           border-radius: 8px;
//           padding: 15px;
//           margin: 15px 0;
//         }

//         .pagination-info {
//           color: #6c757d;
//           font-size: 14px;
//           margin-right: 15px;
//           margin-bottom: 5px;
//           white-space: nowrap;
//         }

//         .pagination-btn {
//           background: #fff;
//           border: 1px solid #d4d4d4;
//           padding: 6px 10px;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           min-width: 32px;
//           height: 32px;
//           font-size: 14px;
//         }

//         .pagination-btn:hover {
//           background: #f8f9fa;
//           border-color: #007bff;
//         }

//         .pagination-btn:disabled {
//           background: #f8f9fa;
//           color: #6c757d;
//           cursor: not-allowed;
//           border-color: #e9ecef;
//         }

//         .pagination-btn.active {
//           background: #007bff;
//           color: white;
//           border-color: #007bff;
//         }

//         .loading-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 300px;
//           flex-direction: column;
//           gap: 20px;
//         }

//         .loading-spinner {
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .spinner-ring {
//           width: 40px;
//           height: 40px;
//           border: 4px solid #f3f3f3;
//           border-top: 4px solid #007bff;
//           border-radius: 50%;
//         }

//         .loading-text {
//           color: #6c757d;
//           font-weight: 600;
//         }

//         .empty-state {
//           text-align: center;
//           padding: 30px;
//           color: #6c757d;
//         }

//         .empty-state-icon {
//           font-size: 48px;
//           margin-bottom: 16px;
//           opacity: 0.5;
//         }

//         .pagination-controls {
//           display: flex;
//           gap: 6px;
//           align-items: center;
//           justify-content: center;
//           flex-wrap: wrap;
//         }

//         .message {
//           padding: 12px 16px;
//           border-radius: 8px;
//           margin-bottom: 20px;
//           font-weight: 600;
//         }

//         .error-message {
//           background: #f8d7da;
//           color: #721c24;
//           border: 1px solid #f5c6cb;
//         }

//         .success-message {
//           background: #d4edda;
//           color: #155724;
//           border: 1px solid #c3e6cb;
//         }

//         @media (max-width: 768px) {
//           .inventory-management-wrapper {
//             margin: 10px;
//             padding: 15px;
//             max-height: calc(100vh - 120px);
//           }

//           .im-header {
//             flex-direction: column;
//             gap: 15px;
//             align-items: flex-start;
//           }

//           .products-header {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .header-controls {
//             width: 100%;
//             justify-content: space-between;
//             flex-direction: column;
//             gap: 10px;
//           }

//           .search-input {
//             width: 100%;
//             max-width: none;
//           }

//           .products-grid {
//             grid-template-columns: 1fr;
//             gap: 15px;
//             min-height: 200px;
//           }

//           .table-view {
//             height: auto;
//           }

//           .pagination-wrapper {
//             flex-direction: column;
//             gap: 10px;
//             padding: 10px;
//           }

//           .pagination-info {
//             margin-right: 0;
//             margin-bottom: 10px;
//             text-align: center;
//           }

//           .pagination-controls {
//             display: flex;
//             gap: 5px;
//             justify-content: center;
//             flex-wrap: wrap;
//           }
//         }

//         @media (max-width: 1200px) {
//           .inventory-management-wrapper {
//             margin: 15px;
//             padding: 18px;
//           }

//           .products-grid {
//             grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//             gap: 18px;
//           }

//           .pagination-wrapper {
//             gap: 6px;
//             padding: 12px;
//           }

//           .pagination-btn {
//             padding: 5px 8px;
//             min-width: 30px;
//             height: 30px;
//             font-size: 13px;
//           }
//         }

//         @media (max-width: 1400px) {
//           .inventory-management-wrapper {
//             margin: 16px;
//             padding: 19px;
//           }

//           .table-view {
//             height: auto;
//           }
//         }
//       `}</style>

     
//         <motion.div 
//           className="inventory-management-wrapper"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.div className="im-header" variants={itemVariants}>
//             <h3>Inventory Management</h3>
//             {!showForm && (
//               <motion.button 
//                 className="add-product-btn"
//                 onClick={() => setShowForm(true)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Plus size={20} />
//                 Add Product
//               </motion.button>
//             )}
//           </motion.div>

//           <motion.div className="summary-section" variants={itemVariants}>
//             {summaryData.map((item, index) => (
//               <motion.div
//                 key={index}
//                 className="summary-card"
//                 variants={itemVariants}
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="summary-icon">{item.icon}</div>
//                 <div className="summary-content">
//                   <p>{item.title}</p>
//                   <h3>{item.value}</h3>
//                   <div className={`summary-trend ${item.trend}`}>
//                     <span>{item.change}</span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           <AnimatePresence>
//             {showForm && (
//               <motion.div 
//                 className="form-section"
//                 variants={formVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//               >
//                 <div className="form-header">
//                   <h4>{isEdit.state ? 'Edit Product' : 'Add New Product'}</h4>
//                   <motion.button 
//                     className="close-form-btn"
//                     onClick={resetForm}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <CircleX size={20} />
//                   </motion.button>
//                 </div>

//                 <AnimatePresence>
//                   {error && (
//                     <motion.div 
//                       className="message error-message"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                     >
//                       {error}
//                     </motion.div>
//                   )}
//                   {success && (
//                     <motion.div 
//                       className="message success-message"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                     >
//                       {success}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <form onSubmit={handleSubmit}>
//                   <motion.div 
//                     className="image-upload-area"
//                     whileHover={{ borderColor: '#007bff' }}
//                   >
//                     <AnimatePresence>
//                       {previews.length > 0 ? (
//                         <div className="flex flex-wrap gap-3 justify-center">
//                           {previews.map((preview, index) => (
//                             <motion.div 
//                               key={index}
//                               className="image-preview"
//                               initial={{ opacity: 0, scale: 0.8 }}
//                               animate={{ opacity: 1, scale: 1 }}
//                               exit={{ opacity: 0, scale: 0.8 }}
//                             >
//                               <img src={preview} alt="Product preview" />
//                               <motion.button
//                                 type="button"
//                                 className="remove-image-btn"
//                                 onClick={() => removeImage(index)}
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                               >
//                                 <CircleX size={16} />
//                               </motion.button>
//                             </motion.div>
//                           ))}
//                         </div>
//                       ) : (
//                         <motion.div 
//                           style={{ textAlign: 'center' }}
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                         >
//                           <motion.button
//                             type="button"
//                             className="upload-button"
//                             onClick={() => imageRef.current?.click()}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                           >
//                             <Camera size={24} />
//                           </motion.button>
//                           <div className="upload-text">
//                             Add up to 10 product images
//                           </div>
//                           <input
//                             ref={imageRef}
//                             onChange={handleImageChange}
//                             hidden
//                             type="file"
//                             accept="image/jpeg,image/jpg,image/png"
//                             multiple
//                           />
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <motion.div 
//                       className="form-group"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.1 }}
//                     >
//                       <label className="form-label">Product Name</label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="form-input"
//                         placeholder="Enter product name..."
//                         required
//                       />
//                     </motion.div>
//                     <motion.div 
//                       className="form-group"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.2 }}
//                     >
//                       <label className="form-label">Buy Price</label>
//                       <input
//                         type="number"
//                         name="buyPrice"
//                         value={formData.buyPrice}
//                         onChange={handleChange}
//                         className="form-input"
//                         placeholder="Enter buy price..."
//                         required
//                         min="0"
//                         step="0.01"
//                       />
//                     </motion.div>
//                     <motion.div 
//                       className="form-group"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.3 }}
//                     >
//                       <label className="form-label">Sell Price</label>
//                       <input
//                         type="number"
//                         name="sellPrice"
//                         value={formData.sellPrice}
//                         onChange={handleChange}
//                         className="form-input"
//                         placeholder="Enter sell price..."
//                         required
//                         min="0"
//                         step="0.01"
//                       />
//                     </motion.div>
//                     <motion.div 
//                       className="form-group"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.4 }}
//                     >
//                       <label className="form-label">Stock Quantity</label>
//                       <input
//                         type="number"
//                         name="stock"
//                         value={formData.stock}
//                         onChange={handleChange}
//                         className="form-input"
//                         placeholder="Enter stock quantity..."
//                         required
//                         min="0"
//                       />
//                     </motion.div>
//                     <motion.div 
//                       className="form-group"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.5 }}
//                     >
//                       <label className="form-label">Category</label>
//                       <select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                         className="form-select"
//                         required
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map(category => (
//                           <option key={category._id} value={category._id}>{category.name}</option>
//                         ))}
//                       </select>
//                     </motion.div>
//                   </div>

//                   <motion.div 
//                     className="form-actions"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.6 }}
//                   >
//                     <motion.button
//                       type="button"
//                       className="btn-cancel"
//                       onClick={resetForm}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Cancel
//                     </motion.button>
//                     <motion.button
//                       type="submit"
//                       className="btn-submit"
//                       disabled={isLoading}
//                       whileHover={{ scale: isLoading ? 1 : 1.05 }}
//                       whileTap={{ scale: isLoading ? 1 : 0.95 }}
//                     >
//                       {isLoading && <LoadingSpinner />}
//                       {isLoading ? 'Processing...' : isEdit.state ? 'Update Product' : 'Add Product'}
//                     </motion.button>
//                   </motion.div>
//                 </form>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <motion.div className="products-section" variants={itemVariants}>
//             <div className="products-header">
//               <h4>All Products ({filteredProducts.length})</h4>
//               <div className="header-controls">
//                 <motion.div 
//                   className="view-toggle"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   <motion.button
//                     className={`view-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
//                     onClick={() => setViewMode('card')}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Grid3X3 size={16} />
//                     Cards
//                   </motion.button>
//                   <motion.button
//                     className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
//                     onClick={() => setViewMode('table')}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <List size={16} />
//                     Table
//                   </motion.button>
//                 </motion.div>
//                 <motion.input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="search-input"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.3 }}
//                 />
//               </div>
//             </div>
            
//             {fetchLoading ? (
//               <motion.div 
//                 className="loading-container"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//               >
//                 <LoadingSpinner />
//                 <div className="loading-text">Loading products...</div>
//               </motion.div>
//             ) : filteredProducts.length === 0 ? (
//               <motion.div 
//                 className="empty-state"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <div className="empty-state-icon">📦</div>
//                 <h4>No products found</h4>
//                 <p>{searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first product'}</p>
//               </motion.div>
//             ) : (
//               <>
//                 <AnimatePresence mode="wait">
//                   {viewMode === 'card' ? (
//                     <motion.div
//                       key="card-view"
//                       className="view-transition"
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <motion.div 
//                         className="products-grid"
//                         layout
//                       >
//                         <AnimatePresence>
//                           {currentProducts.map((product, index) => (
//                             <ProductCard 
//                               key={product._id} 
//                               product={product} 
//                               index={index}
//                             />
//                           ))}
//                         </AnimatePresence>
//                       </motion.div>

//                       {totalPages > 1 && (
//                         <motion.div 
//                           className="pagination-wrapper"
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 0.4 }}
//                         >
//                           <div className="pagination-info">
//                             Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}
//                           </div>
                          
//                           <div className="pagination-controls">
//                             <motion.button
//                               className="pagination-btn"
//                               onClick={goToPrevious}
//                               disabled={currentPage === 1}
//                               whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
//                               whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
//                             >
//                               <ChevronLeft size={16} />
//                             </motion.button>

//                             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                               <motion.button
//                                 key={page}
//                                 className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
//                                 onClick={() => goToPage(page)}
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                               >
//                                 {page}
//                               </motion.button>
//                             ))}

//                             <motion.button
//                               className="pagination-btn"
//                               onClick={goToNext}
//                               disabled={currentPage === totalPages}
//                               whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
//                               whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
//                             >
//                               <ChevronRight size={16} />
//                             </motion.button>
//                           </div>
//                         </motion.div>
//                       )}
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       key="table-view"
//                       className="view-transition"
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <div className="table-view">
//                         <AgGridReact
//                           rowData={tableRowData}
//                           columnDefs={columnDefs}
//                           defaultColDef={{ 
//                             filter: true, 
//                             editable: false,
//                             sortable: true,
//                             resizable: true
//                           }}
//                           pagination={true}
//                           paginationPageSize={tableItemsPerPage}
//                           rowSelection={{ mode: 'multiRow', headerCheckbox: false }}
//                           animateRows={true}
//                           rowHeight={70}
//                           domLayout="autoHeight"

//                         />
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </>
//             )}
//           </motion.div>
//         </motion.div>
   
//     </>
//   );
// };



// import React, { useState, useEffect, useRef } from 'react';
// import {
//   AddInventoryIcon,
//   ArrowIcon,
//   DelecteIcon,
//   FilterIcon,
//   LowerStockIcon,
//   SortIcon,
//   TotalBuyersIcon,
//   TotalInventory,
// } from '../../../assets/Svgs/AllSvgs';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { AgGridReact } from 'ag-grid-react';
// import { Edit, Trash, CircleX, Camera, Plus, ChevronLeft, ChevronRight, Grid3X3, List } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// export const Inventorymanagement = () => {
//   const [formData, setFormData] = useState({ name: '', buyPrice: '', sellPrice: '', stock: '', category: '' });
//   const [newImages, setNewImages] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isEdit, setIsEdit] = useState({ state: false, productId: null });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [viewMode, setViewMode] = useState('table');
//   const imageRef = useRef(null);

//   const token = Cookies.get('adminToken');
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const filtered = products.filter(product =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//     setCurrentPage(1);
//   }, [products, searchTerm]);

//   const fetchProducts = async () => {
//     try {
//       setFetchLoading(true);
//       const response = await axios.get(`${API_BASE_URL}/api/admin/get-products`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(response.data);
//     } catch (err) {
//       setError('Failed to fetch products');
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/admin/get-category`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCategories(response.data);
//     } catch (err) {
//       setError('Failed to fetch categories');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError('');
//     setSuccess('');
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const totalImages = newImages.length + existingImages.length + files.length;
//     if (totalImages > 10) {
//       setError('Maximum 10 images allowed');
//       return;
//     }
//     setNewImages([...newImages, ...files]);
//     setPreviews([...previews, ...files.map(file => URL.createObjectURL(file))]);
//   };

//   const removeImage = (index) => {
//     const isExistingImage = index < existingImages.length;
//     if (isExistingImage) {
//       setExistingImages(existingImages.filter((_, i) => i !== index));
//     } else {
//       const newImageIndex = index - existingImages.length;
//       setNewImages(newImages.filter((_, i) => i !== newImageIndex));
//     }
//     setPreviews(previews.filter((_, i) => i !== index));
//   };

//   const resetForm = () => {
//     setFormData({ name: '', buyPrice: '', sellPrice: '', stock: '', category: '' });
//     setNewImages([]);
//     setExistingImages([]);
//     setPreviews([]);
//     setIsEdit({ state: false, productId: null });
//     setShowForm(false);
//     setError('');
//     setSuccess('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setSuccess('');

//     const data = new FormData();
//     Object.keys(formData).forEach(key => data.append(key, formData[key]));
//     newImages.forEach(image => data.append('images', image));
//     data.append('existingImages', JSON.stringify(existingImages));

//     try {
//       if (isEdit.state) {
//         if (existingImages.length + newImages.length === 0) {
//           throw new Error('At least one product image is required');
//         }
//         await axios.put(`${API_BASE_URL}/api/admin/update-products/${isEdit.productId}`, data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setSuccess('Product updated successfully!');
//       } else {
//         if (newImages.length === 0) {
//           throw new Error('At least one product image is required');
//         }
//         await axios.post(`${API_BASE_URL}/api/admin/create-product`, data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setSuccess('Product created successfully!');
//       }
//       fetchProducts();
//       setTimeout(() => {
//         resetForm();
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Operation failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (product) => {
//     setFormData({
//       name: product.name,
//       buyPrice: product.buyPrice,
//       sellPrice: product.sellPrice,
//       stock: product.stock,
//       category: product.category._id,
//     });
//     const imageUrls = product.images.map(img => `${API_BASE_URL}/${img}`);
//     setExistingImages(product.images);
//     setNewImages([]);
//     setPreviews(imageUrls);
//     setIsEdit({ state: true, productId: product._id });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await axios.delete(`${API_BASE_URL}/api/admin/delete-product/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSuccess('Product deleted successfully!');
//         fetchProducts();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete product');
//       }
//     }
//   };

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentProducts = filteredProducts.slice(startIndex, endIndex);
//   const tableItemsPerPage = 10;
//   const tableRowData = viewMode === 'table' ? filteredProducts : [];

//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   const goToPrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const goToNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const summaryData = [
//     {
//       title: 'Total Products',
//       value: products.length,
//       icon: <Plus size={24} />,
//       change: '+4.5%',
//       trend: 'up',
//     },
//     {
//       title: 'Total Buy Price',
//       value: `$${products.reduce((sum, p) => sum + p.buyPrice * p.stock, 0).toFixed(2)}`,
//       icon: <TotalInventory size={24} />,
//       change: '-2.3%',
//       trend: 'down',
//     },
//     {
//       title: 'Total Inventory',
//       value: products.reduce((sum, p) => sum + p.stock, 0),
//       icon: <TotalInventory size={24} />,
//       change: '+1.8%',
//       trend: 'up',
//     },
//     {
//       title: 'Low Stock',
//       value: products.filter(p => p.stock < 10).length,
//       icon: <LowerStockIcon size={24} />,
//       change: '+3.2%',
//       trend: 'up',
//     },
//   ];

//   const columnDefs = [
//     { field: 'name', headerName: 'Product Name', flex: 1 },
//     {
//       field: 'images',
//       headerName: 'Images',
//       width: 120,
//       cellRenderer: (params) => (
//         params.value && params.value.length > 0 ? (
//           <div className="image-cell">
//             <img
//               src={`${API_BASE_URL}/${params.value[0]}`}
//               alt="product"
//               className="category-image"
//             />
//           </div>
//         ) : <span className="no-image">No Image</span>
//       ),
//     },
//     { field: 'buyPrice', headerName: 'Buy Price', flex: 1, valueFormatter: (params) => `$${params.value.toFixed(2)}` },
//     { field: 'sellPrice', headerName: 'Sell Price', flex: 1, valueFormatter: (params) => `$${params.value.toFixed(2)}` },
//     { field: 'stock', headerName: 'Stock', flex: 1 },
//     { field: 'category.name', headerName: 'Category', flex: 1 },
//     { field: 'createdBy.name', headerName: 'Created By', flex: 1 },
//     {
//       field: 'createdAt',
//       headerName: 'Created At',
//       flex: 1,
//       valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
//     },
//     {
//       headerName: 'Actions',
//       width: 120,
//       cellRenderer: (params) => (
//         <div className="actions-cell my-4" style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
//           <button
//             className="edit-btn table-edit-btn"
//             onClick={() => handleEdit(params.data)}
//             title="Edit Product"
//           >
//             <Edit size={18} />
//           </button>
//           <button
//             className="delete-btn table-delete-btn"
//             onClick={() => handleDelete(params.data._id)}
//             title="Delete Product"
//           >
//             <Trash size={18} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const formVariants = {
//     hidden: { opacity: 0, scale: 0.95, y: -20 },
//     visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
//     exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } },
//   };

//   const LoadingSpinner = () => (
//     <motion.div
//       className="loading-spinner"
//       animate={{ rotate: 360 }}
//       transition={{ duration: 1, repeat: 'infinite', ease: 'linear' }}
//     >
//       <div className="spinner-ring"></div>
//     </motion.div>
//   );

//   const ProductCard = ({ product, index }) => (
//     <motion.div
//       className="category-card"
//       variants={itemVariants}
//       initial="hidden"
//       animate="visible"
//       transition={{ delay: index * 0.1 }}
//       whileHover={{ y: -5, scale: 1.02 }}
//       layout
//     >
//       <div className="category-image-container">
//         {product.images && product.images.length > 0 ? (
//           <img
//             src={`${API_BASE_URL}/${product.images[0]}`}
//             alt={product.name}
//             className="category-card-image"
//           />
//         ) : (
//           <div className="no-image-placeholder">
//             <Camera size={24} />
//           </div>
//         )}
//       </div>
//       <div className="category-card-content">
//         <h4 className="category-name">{product.name}</h4>
//         <p className="category-meta">Category: {product.category?.name}</p>
//         <p className="category-meta">Buy: ${product.buyPrice.toFixed(2)}</p>
//         <p className="category-meta">Sell: ${product.sellPrice.toFixed(2)}</p>
//         <p className="category-meta">Stock: {product.stock}</p>
//         <p className="category-date">{new Date(product.createdAt).toLocaleDateString()}</p>
//         <div className="category-actions">
//           <motion.button
//             className="edit-btn"
//             onClick={() => handleEdit(product)}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Edit size={16} />
//           </motion.button>
//           <motion.button
//             className="delete-btn"
//             onClick={() => handleDelete(product._id)}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Trash size={16} />
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );

//   return (
//     <>
//       <style jsx>{`
//         .inventory-management-wrapper {
//           padding: 20px;
//           background: #fff;
//           border-radius: 8px;
//           margin: 20px;
//           min-height: calc(100vh - 140px);
//           overflow-y: auto;
//           max-height: calc(100vh - 140px);
//         }
//         .im-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 30px;
//           padding-bottom: 20px;
//           border-bottom: 2px solid #f0f0f0;
//         }
//         .im-header h3 {
//           font-size: 24px;
//           font-weight: 700;
//           color: #333;
//           margin: 0;
//         }
//         .add-product-btn {
//           background: var(--activeTab-color, #007bff);
//           color: white;
//           border: none;
//           padding: 12px 24px;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           transition: all 0.3s ease;
//         }
//         .add-product-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0,123,255,0.3);
//         }
//         .summary-section {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//           gap: 20px;
//           margin-bottom: 30px;
//         }
//         .summary-card {
//           background: #f8f9fa;
//           padding: 20px;
//           border-radius: 12px;
//           border: 1px solid #e9ecef;
//           display: flex;
//           align-items: center;
//           gap: 15px;
//         }
//         .summary-icon {
//           background: #007bff;
//           color: white;
//           padding: 10px;
//           border-radius: 8px;
//         }
//         .summary-content p {
//           margin: 0;
//           font-size: 14px;
//           color: #6c757d;
//         }
//         .summary-content h3 {
//           margin: 5px 0 0;
//           font-size: 20px;
//           color: #333;
//         }
//         .summary-trend {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           margin-top: 10px;
//         }
//         .summary-trend.up {
//           color: #28a745;
//         }
//         .summary-trend.down {
//           color: #dc3545;
//         }
//         .form-section {
//           background: #f8f9fa;
//           padding: 25px;
//           border-radius: 12px;
//           margin-bottom: 30px;
//           border: 1px solid #e9ecef;
//           box-shadow: 0 4px 20px rgba(0,0,0,0.1);
//         }
//         .form-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }
//         .form-header h4 {
//           font-size: 20px;
//           font-weight: 600;
//           color: #333;
//           margin: 0;
//         }
//         .close-form-btn {
//           background: #6c757d;
//           color: white;
//           border: none;
//           padding: 8px;
//           border-radius: 50%;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .image-upload-area {
//           min-height: 150px;
//           display: flex;
//           flex-wrap: wrap;
//           justify-content: center;
//           align-items: center;
//           background: #fff;
//           padding: 20px;
//           border-radius: 8px;
//           border: 2px dashed #d4d4d4;
//           margin-bottom: 20px;
//           transition: border-color 0.3s ease;
//         }
//         .image-upload-area:hover {
//           border-color: #007bff;
//         }
//         .image-preview {
//           position: relative;
//           width: 120px;
//           height: 120px;
//           border-radius: 8px;
//           overflow: hidden;
//         }
//         .image-preview img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
//         .remove-image-btn {
//           position: absolute;
//           top: 5px;
//           right: 5px;
//           background: #dc3545;
//           color: white;
//           border: none;
//           border-radius: 50%;
//           padding: 4px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .upload-button {
//           background: #e9ecef;
//           border: none;
//           width: 80px;
//           height: 80px;
//           border-radius: 50%;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #6c757d;
//           transition: all 0.3s ease;
//         }
//         .upload-button:hover {
//           background: #dee2e6;
//           transform: scale(1.05);
//         }
//         .upload-text {
//           text-align: center;
//           font-weight: 600;
//           color: #6c757d;
//           margin-top: 10px;
//         }
//         .form-group {
//           margin-bottom: 20px;
//         }
//         .form-label {
//           display: block;
//           font-weight: 600;
//           color: #333;
//           margin-bottom: 8px;
//         }
//         .form-input, .form-select {
//           width: 100%;
//           padding: 12px 16px;
//           background: #fff;
//           border: 1px solid #d4d4d4;
//           border-radius: 8px;
//           font-size: 16px;
//           outline: none;
//           transition: border-color 0.3s ease;
//         }
//         .form-input:focus, .form-select:focus {
//           border-color: #007bff;
//           box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
//         }
//         .form-actions {
//           display: flex;
//           justify-content: flex-end;
//           gap: 12px;
//           margin-top: 25px;
//         }
//         .btn-cancel {
//           background: #6c757d;
//           color: white;
//           border: none;
//           padding: 12px 24px;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.3s ease;
//         }
//         .btn-cancel:hover {
//           background: #5a6268;
//         }
//         .btn-submit {
//           background: var(--activeTab-color, #007bff);
//           color: white;
//           border: none;
//           padding: 12px 24px;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.3s ease;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }
//         .btn-submit:hover {
//           background: #0056b3;
//         }
//         .btn-submit:disabled {
//           background: #6c757d;
//           cursor: not-allowed;
//         }
//         .products-section {
//           background: #fff;
//           border-radius: 12px;
//           padding: 25px;
//           border: 1px solid #e9ecef;
//         }
//         .products-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//           flex-wrap: wrap;
//           gap: 15px;
//         }
//         .products-header h4 {
//           font-size: 20px;
//           font-weight: 600;
//           color: #333;
//           margin: 0;
//         }
//         .header-controls {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           flex-wrap: wrap;
//         }
//         .view-toggle {
//           display: flex;
//           background: #f8f9fa;
//           border-radius: 8px;
//           padding: 4px;
//           border: 1px solid #e9ecef;
//         }
//         .view-toggle-btn {
//           background: transparent;
//           border: none;
//           padding: 8px 12px;
//           border-radius: 6px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           transition: all 0.3s ease;
//           font-weight: 500;
//           color: #6c757d;
//         }
//         .view-toggle-btn.active {
//           background: #007bff;
//           color: white;
//           box-shadow: 0 2px 4px rgba(0,123,255,0.2);
//         }
//         .view-toggle-btn:hover:not(.active) {
//           background: #e9ecef;
//           color: #495057;
//         }
//         .search-input {
//           padding: 8px 16px;
//           border: 1px solid #d4d4d4;
//           border-radius: 8px;
//           outline: none;
//           width: 250px;
//           transition: border-color 0.3s ease;
//         }
//         .search-input:focus {
//           border-color: #007bff;
//           box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
//         }
//         .products-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 20px;
//           margin-bottom: 20px;
//           min-height: 300px;
//         }
//         .table-view {
//           height: auto;
//           border-radius: 8px;
//           overflow: hidden;
//           border: 1px solid #e9ecef;
//           margin-bottom: 20px;
//         }
//         .category-card {
//           background: #fff;
//           border: 1px solid #e9ecef;
//           border-radius: 12px;
//           overflow: hidden;
//           transition: all 0.3s ease;
//           cursor: pointer;
//         }
//         .category-card:hover {
//           box-shadow: 0 8px 25px rgba(0,0,0,0.1);
//         }
//         .category-image-container {
//           height: 160px;
//           background: #f8f9fa;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//         }
//         .category-card-image {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
//         .no-image-placeholder {
//           color: #6c757d;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           height: 100%;
//         }
//         .category-card-content {
//           padding: 15px;
//         }
//         .category-name {
//           font-size: 18px;
//           font-weight: 600;
//           color: #333;
//           margin: 0 0 8px 0;
//         }
//         .category-meta {
//           font-size: 14px;
//           color: #6c757d;
//           margin: 0 0 4px 0;
//         }
//         .category-date {
//           font-size: 12px;
//           color: #9ca3af;
//           margin: 0 0 15px 0;
//         }
//         .category-actions {
//           display: flex;
//           gap: 8px;
//           justify-content: flex-end;
//         }
//         .edit-btn, .delete-btn {
//           border: none;
//           padding: 8px;
//           border-radius: 50%;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.3s ease;
//         }
//         .edit-btn {
//           background: var(--button-color1, #007bff);
//           color: white;
//         }
//         .edit-btn:hover {
//           background: #0056b3;
//         }
//         .delete-btn {
//           background: var(--Negative-color, #dc3545);
//           color: white;
//         }
//         .delete-btn:hover {
//           background: #c82333;
//         }
//         .pagination-wrapper {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           gap: 8px;
//           margin-top: 15px;
//           padding: 10px 0;
//           flex-wrap: wrap;
//           background: #f8f9fa;
//           border-radius: 8px;
//           padding: 15px;
//           margin: 15px 0;
//         }
//         .pagination-info {
//           color: #6c757d;
//           font-size: 14px;
//           margin-right: 15px;
//           margin-bottom: 5px;
//           white-space: nowrap;
//         }
//         .pagination-btn {
//           background: #fff;
//           border: 1px solid #d4d4d4;
//           padding: 6px 10px;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           min-width: 32px;
//           height: 32px;
//           font-size: 14px;
//         }
//         .pagination-btn:hover {
//           background: #f8f9fa;
//           border-color: #007bff;
//         }
//         .pagination-btn:disabled {
//           background: #f8f9fa;
//           color: #6c757d;
//           cursor: not-allowed;
//           border-color: #e9ecef;
//         }
//         .pagination-btn.active {
//           background: #007bff;
//           color: white;
//           border-color: #007bff;
//         }
//         .loading-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 300px;
//           flex-direction: column;
//           gap: 20px;
//         }
//         .loading-spinner {
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .spinner-ring {
//           width: 40px;
//           height: 40px;
//           border: 4px solid #f3f3f3;
//           border-top: 4px solid #007bff;
//           border-radius: 50%;
//         }
//         .loading-text {
//           color: #6c757d;
//           font-weight: 600;
//         }
//         .empty-state {
//           text-align: center;
//           padding: 30px;
//           color: #6c757d;
//         }
//         .empty-state-icon {
//           font-size: 48px;
//           margin-bottom: 16px;
//           opacity: 0.5;
//         }
//         .pagination-controls {
//           display: flex;
//           gap: 6px;
//           align-items: center;
//           justify-content: center;
//           flex-wrap: wrap;
//         }
//         .message {
//           padding: 12px 16px;
//           border-radius: 8px;
//           margin-bottom: 20px;
//           font-weight: 600;
//         }
//         .error-message {
//           background: #f8d7da;
//           color: #721c24;
//           border: 1px solid #f5c6cb;
//         }
//         .success-message {
//           background: #d4edda;
//           color: #155724;
//           border: 1px solid #c3e6cb;
//         }
//         @media (max-width: 768px) {
//           .inventory-management-wrapper {
//             margin: 10px;
//             padding: 15px;
//             max-height: calc(100vh - 120px);
//           }
//           .im-header {
//             flex-direction: column;
//             gap: 15px;
//             align-items: flex-start;
//           }
//           .products-header {
//             flex-direction: column;
//             align-items: flex-start;
//           }
//           .header-controls {
//             width: 100%;
//             justify-content: space-between;
//             flex-direction: column;
//             gap: 10px;
//           }
//           .search-input {
//             width: 100%;
//             max-width: none;
//           }
//           .products-grid {
//             grid-template-columns: 1fr;
//             gap: 15px;
//             min-height: 200px;
//           }
//           .table-view {
//             height: auto;
//           }
//           .pagination-wrapper {
//             flex-direction: column;
//             gap: 10px;
//             padding: 10px;
//           }
//           .pagination-info {
//             margin-right: 0;
//             margin-bottom: 10px;
//             text-align: center;
//           }
//           .pagination-controls {
//             display: flex;
//             gap: 5px;
//             justify-content: center;
//             flex-wrap: wrap;
//           }
//         }
//         @media (max-width: 1200px) {
//           .inventory-management-wrapper {
//             margin: 15px;
//             padding: 18px;
//           }
//           .products-grid {
//             grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//             gap: 18px;
//           }
//           .pagination-wrapper {
//             gap: 6px;
//             padding: 12px;
//           }
//           .pagination-btn {
//             padding: 5px 8px;
//             min-width: 30px;
//             height: 30px;
//             font-size: 13px;
//           }
//         }
//         @media (max-width: 1400px) {
//           .inventory-management-wrapper {
//             margin: 16px;
//             padding: 19px;
//           }
//           .table-view {
//             height: auto;
//           }
//         }
//       `}</style>
//       <motion.div
//         className="inventory-management-wrapper"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.div className="im-header" variants={itemVariants}>
//           <h3>Inventory Management</h3>
//           {!showForm && (
//             <motion.button
//               className="add-product-btn"
//               onClick={() => setShowForm(true)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Plus size={20} />
//               Add Product
//             </motion.button>
//           )}
//         </motion.div>
//         <motion.div className="summary-section" variants={itemVariants}>
//           {summaryData.map((item, index) => (
//             <motion.div
//               key={index}
//               className="summary-card"
//               variants={itemVariants}
//               whileHover={{ y: -5 }}
//             >
//               <div className="summary-icon">{item.icon}</div>
//               <div className="summary-content">
//                 <p>{item.title}</p>
//                 <h3>{item.value}</h3>
//                 <div className={`summary-trend ${item.trend}`}>
//                   <span>{item.change}</span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//         <AnimatePresence>
//           {showForm && (
//             <motion.div
//               className="form-section"
//               variants={formVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               <div className="form-header">
//                 <h4>{isEdit.state ? 'Edit Product' : 'Add New Product'}</h4>
//                 <motion.button
//                   className="close-form-btn"
//                   onClick={resetForm}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <CircleX size={20} />
//                 </motion.button>
//               </div>
//               <AnimatePresence>
//                 {error && (
//                   <motion.div
//                     className="message error-message"
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                   >
//                     {error}
//                   </motion.div>
//                 )}
//                 {success && (
//                   <motion.div
//                     className="message success-message"
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                   >
//                     {success}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//               <form onSubmit={handleSubmit}>
//                 <motion.div
//                   className="image-upload-area"
//                   whileHover={{ borderColor: '#007bff' }}
//                 >
//                   <AnimatePresence>
//                     {previews.length > 0 ? (
//                       <div className="flex flex-wrap gap-3 justify-center">
//                         {previews.map((preview, index) => (
//                           <motion.div
//                             key={index}
//                             className="image-preview"
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.8 }}
//                           >
//                             <img src={preview} alt="Product preview" />
//                             <motion.button
//                               type="button"
//                               className="remove-image-btn"
//                               onClick={() => removeImage(index)}
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                             >
//                               <CircleX size={16} />
//                             </motion.button>
//                           </motion.div>
//                         ))}
//                         <motion.button
//                           type="button"
//                           className="upload-button"
//                           onClick={() => imageRef.current?.click()}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                         >
//                           <Camera size={24} />
//                         </motion.button>
//                       </div>
//                     ) : (
//                       <motion.div
//                         style={{ textAlign: 'center' }}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                       >
//                         <motion.button
//                           type="button"
//                           className="upload-button"
//                           onClick={() => imageRef.current?.click()}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                         >
//                           <Camera size={24} />
//                         </motion.button>
//                         <div className="upload-text">
//                           Add up to 10 product images {isEdit.state && '(remove images to update)'}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                   <input
//                     ref={imageRef}
//                     onChange={handleImageChange}
//                     hidden
//                     type="file"
//                     accept="image/jpeg,image/jpg,image/png"
//                     multiple
//                   />
//                 </motion.div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <motion.div
//                     className="form-group"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 }}
//                   >
//                     <label className="form-label">Product Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="Enter product name..."
//                       required
//                     />
//                   </motion.div>
//                   <motion.div
//                     className="form-group"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     <label className="form-label">Buy Price</label>
//                     <input
//                       type="number"
//                       name="buyPrice"
//                       value={formData.buyPrice}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="Enter buy price..."
//                       required
//                       min="0"
//                       step="0.01"
//                     />
//                   </motion.div>
//                   <motion.div
//                     className="form-group"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.3 }}
//                   >
//                     <label className="form-label">Sell Price</label>
//                     <input
//                       type="number"
//                       name="sellPrice"
//                       value={formData.sellPrice}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="Enter sell price..."
//                       required
//                       min="0"
//                       step="0.01"
//                     />
//                   </motion.div>
//                   <motion.div
//                     className="form-group"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4 }}
//                   >
//                     <label className="form-label">Stock Quantity</label>
//                     <input
//                       type="number"
//                       name="stock"
//                       value={formData.stock}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="Enter stock quantity..."
//                       required
//                       min="0"
//                     />
//                   </motion.div>
//                   <motion.div
//                     className="form-group"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.5 }}
//                   >
//                     <label className="form-label">Category</label>
//                     <select
//                       name="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                       className="form-select"
//                       required
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map(category => (
//                         <option key={category._id} value={category._id}>{category.name}</option>
//                       ))}
//                     </select>
//                   </motion.div>
//                 </div>
//                 <motion.div
//                   className="form-actions"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 }}
//                 >
//                   <motion.button
//                     type="button"
//                     className="btn-cancel"
//                     onClick={resetForm}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Cancel
//                   </motion.button>
//                   <motion.button
//                     type="submit"
//                     className="btn-submit"
//                     disabled={isLoading}
//                     whileHover={{ scale: isLoading ? 1 : 1.05 }}
//                     whileTap={{ scale: isLoading ? 1 : 0.95 }}
//                   >
//                     {isLoading && <LoadingSpinner />}
//                     {isLoading ? 'Processing...' : isEdit.state ? 'Update Product' : 'Add Product'}
//                   </motion.button>
//                 </motion.div>
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <motion.div className="products-section" variants={itemVariants}>
//           <div className="products-header">
//             <h4>All Products ({filteredProducts.length})</h4>
//             <div className="header-controls">
//               <motion.div
//                 className="view-toggle"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <motion.button
//                   className={`view-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
//                   onClick={() => setViewMode('card')}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Grid3X3 size={16} />
//                   Cards
//                 </motion.button>
//                 <motion.button
//                   className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
//                   onClick={() => setViewMode('table')}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <List size={16} />
//                   Table
//                 </motion.button>
//               </motion.div>
//               <motion.input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="search-input"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//               />
//             </div>
//           </div>
//           {fetchLoading ? (
//             <motion.div
//               className="loading-container"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <LoadingSpinner />
//               <div className="loading-text">Loading products...</div>
//             </motion.div>
//           ) : filteredProducts.length === 0 ? (
//             <motion.div
//               className="empty-state"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <div className="empty-state-icon">📦</div>
//               <h4>No products found</h4>
//               <p>{searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first product'}</p>
//             </motion.div>
//           ) : (
//             <>
//               <AnimatePresence mode="wait">
//                 {viewMode === 'card' ? (
//                   <motion.div
//                     key="card-view"
//                     className="view-transition"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <motion.div
//                       className="products-grid"
//                       layout
//                     >
//                       <AnimatePresence>
//                         {currentProducts.map((product, index) => (
//                           <ProductCard
//                             key={product._id}
//                             product={product}
//                             index={index}
//                           />
//                         ))}
//                       </AnimatePresence>
//                     </motion.div>
//                     {totalPages > 1 && (
//                       <motion.div
//                         className="pagination-wrapper"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.4 }}
//                       >
//                         <div className="pagination-info">
//                           Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}
//                         </div>
//                         <div className="pagination-controls">
//                           <motion.button
//                             className="pagination-btn"
//                             onClick={goToPrevious}
//                             disabled={currentPage === 1}
//                             whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
//                             whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
//                           >
//                             <ChevronLeft size={16} />
//                           </motion.button>
//                           {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                             <motion.button
//                               key={page}
//                               className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
//                               onClick={() => goToPage(page)}
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                             >
//                               {page}
//                             </motion.button>
//                           ))}
//                           <motion.button
//                             className="pagination-btn"
//                             onClick={goToNext}
//                             disabled={currentPage === totalPages}
//                             whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
//                             whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
//                           >
//                             <ChevronRight size={16} />
//                           </motion.button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="table-view"
//                     className="view-transition"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <div className="table-view">
//                       <AgGridReact
//                         rowData={tableRowData}
//                         columnDefs={columnDefs}
//                         defaultColDef={{
//                           filter: true,
//                           editable: false,
//                           sortable: true,
//                           resizable: true,
//                         }}
//                         pagination={true}
//                         paginationPageSize={tableItemsPerPage}
//                         rowSelection={{ mode: 'multiRow', headerCheckbox: false }}
//                         animateRows={true}
//                         rowHeight={70}
//                         domLayout="autoHeight"
//                       />
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </>
//           )}
//         </motion.div>
//       </motion.div>
//     </>
//   );
// };



import React, { useState, useEffect, useRef } from 'react';
import {
  AddInventoryIcon,
  ArrowIcon,
  TotalInventory,
  LowerStockIcon
} from '../../../assets/Svgs/AllSvgs';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AgGridReact } from 'ag-grid-react';
import { Edit, Trash, CircleX, Camera, Plus, ChevronLeft, ChevronRight, Grid3X3, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Inventorymanagement = () => {
  const [formData, setFormData] = useState({ name: '', buyPrice: '', sellPrice: '', stock: '', category: '' });
  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEdit, setIsEdit] = useState({ state: false, productId: null });
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [showDeleteModal, setShowDeleteModal] = useState({ state: false, productId: null, productName: '' });
  const imageRef = useRef(null);

  const token = Cookies.get('adminToken');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm]);

  const fetchProducts = async () => {
    try {
      setFetchLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/admin/get-products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/get-category`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = newImages.length + existingImages.length + files.length;
    if (totalImages > 10) {
      setError('Maximum 10 images allowed');
      return;
    }
    setNewImages([...newImages, ...files]);
    setPreviews([...previews, ...files.map(file => URL.createObjectURL(file))]);
  };

  const removeImage = (index) => {
    const isExistingImage = index < existingImages.length;
    if (isExistingImage) {
      setExistingImages(existingImages.filter((_, i) => i !== index));
    } else {
      const newImageIndex = index - existingImages.length;
      setNewImages(newImages.filter((_, i) => i !== newImageIndex));
    }
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({ name: '', buyPrice: '', sellPrice: '', stock: '', category: '' });
    setNewImages([]);
    setExistingImages([]);
    setPreviews([]);
    setIsEdit({ state: false, productId: null });
    setShowForm(false);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    newImages.forEach(image => data.append('images', image));
    data.append('existingImages', JSON.stringify(existingImages));

    try {
      if (isEdit.state) {
        if (existingImages.length + newImages.length === 0) {
          throw new Error('At least one product image is required');
        }
        await axios.put(`${API_BASE_URL}/update-products/${isEdit.productId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccess('Product updated successfully!');
      } else {
        if (newImages.length === 0) {
          throw new Error('At least one product image is required');
        }
        await axios.post(`${API_BASE_URL}/api/admin/create-product`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccess('Product created successfully!');
      }
      fetchProducts();
      setTimeout(() => {
        resetForm();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      buyPrice: product.buyPrice,
      sellPrice: product.sellPrice,
      stock: product.stock,
      category: product.category?._id || '',
    });
    const imageUrls = product.images ? product.images.map(img => `${API_BASE_URL}/${img}`) : [];
    setExistingImages(product.images || []);
    setNewImages([]);
    setPreviews(imageUrls);
    setIsEdit({ state: true, productId: product._id });
    setShowForm(true);
  };

  const handleDelete = (id, productName) => {
    setShowDeleteModal({ state: true, productId: id, productName });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/delete-product/${showDeleteModal.productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Product deleted successfully!');
      fetchProducts();
      setShowDeleteModal({ state: false, productId: null, productName: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
      setShowDeleteModal({ state: false, productId: null, productName: '' });
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  const tableItemsPerPage = 10;
  const tableRowData = viewMode === 'table' ? filteredProducts : [];

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const summaryData = [
    {
      title: 'Total Products',
      value: products.length,
      icon: <AddInventoryIcon size={24} />,
      change: '+4.5%',
      trend: 'up',
    },
    {
      title: 'Total Buy Price',
      value: `$${products.reduce((sum, p) => sum + p.buyPrice * p.stock, 0).toFixed(2)}`,
      icon: <TotalInventory size={24} />,
      change: '-2.3%',
      trend: 'down',
    },
    {
      title: 'Total Inventory',
      value: products.reduce((sum, p) => sum + p.stock, 0),
      icon: <TotalInventory size={24} />,
      change: '+1.8%',
      trend: 'up',
    },
    {
      title: 'Low Stock',
      value: products.filter(p => p.stock < 10).length,
      icon: <LowerStockIcon size={24} />,
      change: '+3.2%',
      trend: 'up',
    },
  ];

  const columnDefs = [
    { field: 'name', headerName: 'Product Name', flex: 1 },
    {
      field: 'images',
      headerName: 'Images',
      width: 120,
      cellRenderer: (params) => (
        params.value && params.value.length > 0 ? (
          <div className="image-cell">
            <img
              src={`${API_BASE_URL}/${params.value[0]}`}
              alt="product"
              className="category-image"
            />
          </div>
        ) : <span className="no-image">No Image</span>
      ),
    },
    { field: 'buyPrice', headerName: 'Buy Price', flex: 1, valueFormatter: (params) => `$${params.value.toFixed(2)}` },
    { field: 'sellPrice', headerName: 'Sell Price', flex: 1, valueFormatter: (params) => `$${params.value.toFixed(2)}` },
    { field: 'stock', headerName: 'Stock', flex: 1 },
    { field: 'category.name', headerName: 'Category', flex: 1 },
    { field: 'createdBy.name', headerName: 'Created By', flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      headerName: 'Actions',
      width: 120,
      cellRenderer: (params) => (
        <div className="actions-cell my-4" style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
          <button
            className="edit-btn table-edit-btn"
            onClick={() => handleEdit(params.data)}
            title="Edit Product"
          >
            <Edit size={18} />
          </button>
          <button
            className="delete-btn table-delete-btn"
            onClick={() => handleDelete(params.data._id, params.data.name)}
            title="Delete Product"
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const LoadingSpinner = () => (
    <motion.div
      className="loading-spinner"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <div className="spinner-ring"></div>
    </motion.div>
  );

  const ProductCard = ({ product, index }) => (
    <motion.div
      className="category-card"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      layout
    >
      <div className="category-image-container">
        {product.images && product.images.length > 0 ? (
          <img
            src={`${API_BASE_URL}/${product.images[0]}`}
            alt={product.name}
            className="category-card-image"
          />
        ) : (
          <div className="no-image-placeholder">
            <Camera size={24} />
          </div>
        )}
      </div>
      <div className="category-card-content">
        <h4 className="category-name">{product.name}</h4>
        <p className="category-meta">Category: {product.category?.name}</p>
        <p className="category-meta">Buy: ${product.buyPrice.toFixed(2)}</p>
        <p className="category-meta">Sell: ${product.sellPrice.toFixed(2)}</p>
        <p className="category-meta">Stock: ${product.stock}</p>
        <p className="category-date">{new Date(product.createdAt).toLocaleDateString()}</p>
        <div className="category-actions">
          <motion.button
            className="edit-btn"
            onClick={() => handleEdit(product)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit size={16} />
          </motion.button>
          <motion.button
            className="delete-btn"
            onClick={() => handleDelete(product._id, product.name)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const DeleteConfirmationModal = () => (
    <motion.div
      className="delete-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="delete-modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="modal-header">
          <h4>Confirm Deletion</h4>
          <motion.button
            className="close-modal-btn"
            onClick={() => setShowDeleteModal({ state: false, productId: null, productName: '' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <CircleX size={20} />
          </motion.button>
        </div>
        <p>Are you sure you want to delete the product "<strong>{showDeleteModal.productName}</strong>"? This action cannot be undone.</p>
        <div className="modal-actions">
          <motion.button
            className="btn-cancel"
            onClick={() => setShowDeleteModal({ state: false, productId: null, productName: '' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button
            className="btn-delete"
            onClick={confirmDelete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Delete
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <style jsx>{`
        .inventory-management-wrapper {
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          margin: 20px;
          min-height: calc(100vh - 140px);
          overflow-y: auto;
          max-height: calc(100vh - 140px);
        }
        .im-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }
        .im-header h3 {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }
        .add-product-btn {
          background: var(--activeTab-color, #007bff);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        .add-product-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,123,255,0.3);
        }
        .summary-section {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .summary-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .summary-icon {
          background: #007bff;
          color: white;
          padding: 10px;
          border-radius: 8px;
        }
        .summary-content p {
          margin: 0;
          font-size: 14px;
          color: #6c757d;
        }
        .summary-content h3 {
          margin: 5px 0 0;
          font-size: 20px;
          color: #333;
        }
        .summary-trend {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 10px;
        }
        .summary-trend.up {
          color: #28a745;
        }
        .summary-trend.down {
          color: #dc3545;
        }
        .form-section {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 30px;
          border: 1px solid #e9ecef;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .form-header h4 {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        .close-form-btn {
          background: #6c757d;
          color: white;
          border: none;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .image-upload-area {
          min-height: 150px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          border: 2px dashed #d4d4d4;
          margin-bottom: 20px;
          transition: border-color 0.3s ease;
        }
        .image-upload-area:hover {
          border-color: #007bff;
        }
        .image-preview {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 8px;
          overflow: hidden;
        }
        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .remove-image-btn {
          position: absolute;
          top: 5px;
          right: 5px;
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 50%;
          padding: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .upload-button {
          background: #e9ecef;
          border: none;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6c757d;
          transition: all 0.3s ease;
        }
        .upload-button:hover {
          background: #dee2e6;
          transform: scale(1.05);
        }
        .upload-text {
          text-align: center;
          font-weight: 600;
          color: #6c757d;
          margin-top: 10px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }
        .form-input, .form-select {
          width: 100%;
          padding: 12px 16px;
          background: #fff;
          border: 1px solid #d4d4d4;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .form-input:focus, .form-select:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 25px;
        }
        .btn-cancel {
          background: #6c757d;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .btn-cancel:hover {
          background: #5a6268;
        }
        .btn-submit {
          background: var(--activeTab-color, #007bff);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-submit:hover {
          background: #0056b3;
        }
        .btn-submit:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }
        .products-section {
          background: #fff;
          border-radius: 12px;
          padding: 25px;
          border: 1px solid #e9ecef;
        }
        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }
        .products-header h4 {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        .header-controls {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        .view-toggle {
          display: flex;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 4px;
          border: 1px solid #e9ecef;
        }
        .view-toggle-btn {
          background: transparent;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
          font-weight: 500;
          color: #6c757d;
        }
        .view-toggle-btn.active {
          background: #007bff;
          color: white;
          box-shadow: 0 2px 4px rgba(0,123,255,0.2);
        }
        .view-toggle-btn:hover:not(.active) {
          background: #e9ecef;
          color: #495057;
        }
        .search-input {
          padding: 8px 16px;
          border: 1px solid #d4d4d4;
          border-radius: 8px;
          outline: none;
          width: 250px;
          transition: border-color 0.3s ease;
        }
        .search-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
          min-height: 300px;
        }
        .table-view {
          height: auto;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e9ecef;
          margin-bottom: 20px;
        }
        .category-card {
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .category-card:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .category-image-container {
          height: 160px;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .category-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .no-image-placeholder {
          color: #6c757d;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .category-card-content {
          padding: 15px;
        }
        .category-name {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px 0;
        }
        .category-meta {
          font-size: 14px;
          color: #6c757d;
          margin: 0 0 4px 0;
        }
        .category-date {
          font-size: 12px;
          color: #9ca3af;
          margin: 0 0 15px 0;
        }
        .category-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }
        .edit-btn, .delete-btn {
          border: none;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .edit-btn {
          background: var(--button-color1, #007bff);
          color: white;
        }
        .edit-btn:hover {
          background: #0056b3;
        }
        .delete-btn {
          background: var(--Negative-color, #dc3545);
          color: white;
        }
        .delete-btn:hover {
          background: #c82333;
        }
        .pagination-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 15px;
          padding: 10px 0;
          flex-wrap: wrap;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
          margin: 15px 0;
        }
        .pagination-info {
          color: #6c757d;
          font-size: 14px;
          margin-right: 15px;
          margin-bottom: 5px;
          white-space: nowrap;
        }
        .pagination-btn {
          background: #fff;
          border: 1px solid #d4d4d4;
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          height: 32px;
          font-size: 14px;
        }
        .pagination-btn:hover {
          background: #f8f9fa;
          border-color: #007bff;
        }
        .pagination-btn:disabled {
          background: #f8f9fa;
          color: #6c757d;
          cursor: not-allowed;
          border-color: #e9ecef;
        }
        .pagination-btn.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 300px;
          flex-direction: column;
          gap: 20px;
        }
        .loading-spinner {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .spinner-ring {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #007bff;
          border-radius: 50%;
        }
        .loading-text {
          color: #6c757d;
          font-weight: 600;
        }
        .empty-state {
          text-align: center;
          padding: 30px;
          color: #6c757d;
        }
        .empty-state-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }
        .pagination-controls {
          display: flex;
          gap: 6px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        .message {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .error-message {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        .success-message {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .delete-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .delete-modal {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .modal-header h4 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        .close-modal-btn {
          background: #6c757d;
          color: white;
          border: none;
          padding: 6px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .delete-modal p {
          font-size: 14px;
          color: #333;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .btn-delete {
          background: var(--Negative-color, #dc3545);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .btn-delete:hover {
          background: #c82333;
        }
        @media (max-width: 768px) {
          .inventory-management-wrapper {
            margin: 10px;
            padding: 15px;
            max-height: calc(100vh - 120px);
          }
          .im-header {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }
          .products-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .header-controls {
            width: 100%;
            justify-content: space-between;
            flex-direction: column;
            gap: 10px;
          }
          .search-input {
            width: 100%;
            max-width: none;
          }
          .products-grid {
            grid-template-columns: 1fr;
            gap: 15px;
            min-height: 200px;
          }
          .table-view {
            height: auto;
          }
          .pagination-wrapper {
            flex-direction: column;
            gap: 10px;
            padding: 10px;
          }
          .pagination-info {
            margin-right: 0;
            margin-bottom: 10px;
            text-align: center;
          }
          .pagination-controls {
            display: flex;
            gap: 5px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .delete-modal {
            width: 90%;
            padding: 15px;
          }
        }
        @media (max-width: 1200px) {
          .inventory-management-wrapper {
            margin: 15px;
            padding: 18px;
          }
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 18px;
          }
          .pagination-wrapper {
            gap: 6px;
            padding: 12px;
          }
          .pagination-btn {
            padding: 5px 8px;
            min-width: 30px;
            height: 30px;
            font-size: 13px;
          }
        }
        @media (max-width: 1400px) {
          .inventory-management-wrapper {
            margin: 16px;
            padding: 19px;
          }
          .table-view {
            height: auto;
          }
        }
      `}</style>
      <motion.div
        className="inventory-management-wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="im-header" variants={itemVariants}>
          <h3>Inventory Management</h3>
          {!showForm && (
            <motion.button
              className="add-product-btn"
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              Add Product
            </motion.button>
          )}
        </motion.div>
        <motion.div className="summary-section" variants={itemVariants}>
          {summaryData.map((item, index) => (
            <motion.div
              key={index}
              className="summary-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="summary-icon">{item.icon}</div>
              <div className="summary-content">
                <p>{item.title}</p>
                <h3>{item.value}</h3>
                <div className={`summary-trend ${item.trend}`}>
                  <span>{item.change}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="form-section"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="form-header">
                <h4>{isEdit.state ? 'Edit Product' : 'Add New Product'}</h4>
                <motion.button
                  className="close-form-btn"
                  onClick={resetForm}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CircleX size={20} />
                </motion.button>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="message error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    className="message success-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>
              <form onSubmit={handleSubmit}>
                <motion.div
                  className="image-upload-area"
                  whileHover={{ borderColor: '#007bff' }}
                >
                  <AnimatePresence>
                    {previews.length > 0 ? (
                      <div className="flex flex-wrap gap-3 justify-center">
                        {previews.map((preview, index) => (
                          <motion.div
                            key={index}
                            className="image-preview"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          >
                            <img src={preview} alt="Product preview" />
                            <motion.button
                              type="button"
                              className="remove-image-btn"
                              onClick={() => removeImage(index)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <CircleX size={16} />
                            </motion.button>
                          </motion.div>
                        ))}
                        <motion.button
                          type="button"
                          className="upload-button"
                          onClick={() => imageRef.current?.click()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Camera size={24} />
                        </motion.button>
                      </div>
                    ) : (
                      <motion.div
                        style={{ textAlign: 'center' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.button
                          type="button"
                          className="upload-button"
                          onClick={() => imageRef.current?.click()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Camera size={24} />
                        </motion.button>
                        <div className="upload-text">
                          Add up to 10 product images {isEdit.state && '(remove images to update)'}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <input
                    ref={imageRef}
                    onChange={handleImageChange}
                    hidden
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    multiple
                  />
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter product name..."
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="form-label">Buy Price</label>
                    <input
                      type="number"
                      name="buyPrice"
                      value={formData.buyPrice}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter buy price..."
                      required
                      min="0"
                      step="0.01"
                    />
                  </motion.div>
                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="form-label">Sell Price</label>
                    <input
                      type="number"
                      name="sellPrice"
                      value={formData.sellPrice}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter sell price..."
                      required
                      min="0"
                      step="0.01"
                    />
                  </motion.div>
                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="form-label">Stock Quantity</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter stock quantity..."
                      required
                      min="0"
                    />
                  </motion.div>
                  <motion.div
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="form-label">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                      ))}
                    </select>
                  </motion.div>
                </div>
                <motion.div
                  className="form-actions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    type="button"
                    className="btn-cancel"
                    onClick={resetForm}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="btn-submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                  >
                    {isLoading && <LoadingSpinner />}
                    {isLoading ? 'Processing...' : isEdit.state ? 'Update Product' : 'Add Product'}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div className="products-section" variants={itemVariants}>
          <div className="products-header">
            <h4>All Products ({filteredProducts.length})</h4>
            <div className="header-controls">
              <motion.div
                className="view-toggle"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  className={`view-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
                  onClick={() => setViewMode('card')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid3X3 size={16} />
                  Cards
                </motion.button>
                <motion.button
                  className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List size={16} />
                  Table
                </motion.button>
              </motion.div>
              <motion.input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              />
            </div>
          </div>
          {fetchLoading ? (
            <motion.div
              className="loading-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <LoadingSpinner />
              <div className="loading-text">Loading products...</div>
            </motion.div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="empty-state-icon">📦</div>
              <h4>No products found</h4>
              <p>{searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first product'}</p>
            </motion.div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                {viewMode === 'card' ? (
                  <motion.div
                    key="card-view"
                    className="view-transition"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="products-grid"
                      layout
                    >
                      <AnimatePresence>
                        {currentProducts.map((product, index) => (
                          <ProductCard
                            key={product._id}
                            product={product}
                            index={index}
                          />
                        ))}
                      </AnimatePresence>
                    </motion.div>
                    {totalPages > 1 && (
                      <motion.div
                        className="pagination-wrapper"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="pagination-info">
                          Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}
                        </div>
                        <div className="pagination-controls">
                          <motion.button
                            className="pagination-btn"
                            onClick={goToPrevious}
                            disabled={currentPage === 1}
                            whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                            whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                          >
                            <ChevronLeft size={16} />
                          </motion.button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <motion.button
                              key={page}
                              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                              onClick={() => goToPage(page)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {page}
                            </motion.button>
                          ))}
                          <motion.button
                            className="pagination-btn"
                            onClick={goToNext}
                            disabled={currentPage === totalPages}
                            whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                            whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                          >
                            <ChevronRight size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="table-view"
                    className="view-transition"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="table-view">
                      <AgGridReact
                        rowData={tableRowData}
                        columnDefs={columnDefs}
                        defaultColDef={{
                          filter: true,
                          editable: false,
                          sortable: true,
                          resizable: true,
                        }}
                        pagination={true}
                        paginationPageSize={tableItemsPerPage}
                        rowSelection={{ mode: 'multiRow', headerCheckbox: false }}
                        animateRows={true}
                        rowHeight={70}
                        domLayout="autoHeight"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>
        <AnimatePresence>
          {showDeleteModal.state && <DeleteConfirmationModal />}
        </AnimatePresence>
      </motion.div>
    </>
  );
};