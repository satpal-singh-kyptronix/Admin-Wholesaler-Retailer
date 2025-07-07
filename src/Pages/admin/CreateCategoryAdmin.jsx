// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { AgGridReact } from 'ag-grid-react';
// import { Edit, Trash, CircleX, Camera } from 'lucide-react';

// const CreateCategoryAdmin = () => {
//   const [formData, setFormData] = useState({ name: '' });
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isEdit, setIsEdit] = useState({ state: false, categoryId: null });
//   const [isLoading, setIsLoading] = useState(false);
//   const imageRef = useRef(null);

//   const token = Cookies.get('adminToken');

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:5555/api/admin/get-category', {
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
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const removeImage = () => {
//     setImage(null);
//     setPreview('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setSuccess('');

//     const data = new FormData();
//     data.append('name', formData.name);
//     if (image) {
//       data.append('image', image);
//     }

//     try {
//       if (isEdit.state) {
//         await axios.put(`http://localhost:5555/api/admin/update-category${isEdit.categoryId}`, data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setSuccess('Category updated successfully!');
//       } else {
//         if (!image) {
//           throw new Error('Category image is required');
//         }
//         await axios.post('http://localhost:5555/api/admin/create-category', data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setSuccess('Category created successfully!');
//       }
//       setFormData({ name: '' });
//       setImage(null);
//       setPreview('');
//       setIsEdit({ state: false, categoryId: null });
//       fetchCategories();
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Operation failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (category) => {
//     setFormData({ name: category.name });
//     setPreview(category.image ? `http://localhost:5555/${category.image}` : '');
//     setImage(null);
//     setIsEdit({ state: true, categoryId: category?._id });
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this category?')) {
//       try {
//         await axios.delete(`http://localhost:5555/api/categories/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSuccess('Category deleted successfully!');
//         fetchCategories();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete category');
//       }
//     }
//   };

//   const columnDefs = [
//     { field: 'name', headerName: 'Category Name' },
//     {
//       field: 'image',
//       headerName: 'Image',
//       cellRenderer: (params) => (
//         params.value ? (
//           <img
//             src={`http://localhost:5555/${params.value}`}
//             alt="category"
//             style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
//           />
//         ) : 'No Image'
//       ),
//     },
//     { field: 'createdBy.name', headerName: 'Created By' },
//     { field: 'createdAt', headerName: 'Created At', valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
//     {
//       headerName: 'Actions',
//       cellRenderer: (params) => (
//         <div className="flex gap-4 py-2 justify-center items-center">
//           <button
//             className="font-semibold bg-[var(--button-color1)] text-white p-1.5 rounded-full border-none cursor-pointer"
//             onClick={() => handleEdit(params.data)}
//           >
//             <Edit size={18} />
//           </button>
//           <button
//             className="font-semibold bg-[var(--Negative-color)] text-white p-1.5 rounded-full border-none cursor-pointer"
//             onClick={() => handleDelete(params.data?._id)}
//           >
//             <Trash size={18} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="inventoryManagement__mainWrapper">
//       <div className="IM__topHeadingWrapper">
//         <h3>Category Management</h3>
//       </div>
//       <div className="AddProductModel__mainWrapper">
//         <div className="APM__contentWrapper">
//           <div className="APM__headingWrapper">
//             <h3 className="font-bold mainFont">{isEdit.state ? 'Edit Category' : 'Add Category'}</h3>
//             {isEdit.state && (
//               <button onClick={() => setIsEdit({ state: false, categoryId: null })}>
//                 <CircleX size={30} />
//               </button>
//             )}
//           </div>
//           {error && <div className="error-message">{error}</div>}
//           {success && <div className="success-message">{success}</div>}
//           <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 gap-4 my-5">
//             <div className="my-5 min-h-[10vh] flex justify-center items-center bg-[#eeeeee] p-3 rounded-md border border-dashed border-[#d4d4d4] flex-wrap gap-3">
//               {preview && (
//                 <div className="h-[7dvw] w-[7dvw] rounded-md overflow-hidden relative">
//                   <img className="w-full h-full object-cover" src={preview} alt="preview" />
//                   <button
//                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
//                     onClick={removeImage}
//                     type="button"
//                   >
//                     <CircleX size={16} />
//                   </button>
//                 </div>
//               )}
//               {!preview && (
//                 <div className="flex flex-col justify-center items-center gap-2">
//                   <button
//                     type="button"
//                     onClick={() => imageRef.current?.click()}
//                     className="bg-[#d4d4d4] cursor-pointer h-[4dvw] w-[4dvw] flex justify-center items-center rounded-full"
//                   >
//                     <Camera />
//                   </button>
//                   <input
//                     ref={imageRef}
//                     onChange={handleImageChange}
//                     hidden
//                     type="file"
//                     accept="image/jpeg,image/jpg,image/png"
//                   />
//                   <p className="text-center font-semibold paraFont text-[1dvw] text-gray-400">
//                     Add category image
//                   </p>
//                 </div>
//               )}
//             </div>
//             <div className="flex flex-col gap-2">
//               <label className="text-[1dvw] paraFont font-[500] text-[#333333]">Category Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="bg-[#f0f0f0] py-2 px-3 rounded-md mainFont outline-none border border-[#d4d4d4]"
//                 placeholder="Enter Category Name..."
//                 required
//               />
//             </div>
//             <div className="flex justify-end items-center gap-5 my-5">
//               {isEdit.state && (
//                 <button
//                   type="button"
//                   className="bg-[var(--border-color)] cursor-pointer rounded-md font-semibold text-[1.1dvw] px-5 py-1.5"
//                   onClick={() => {
//                     setIsEdit({ state: false, categoryId: null });
//                     setFormData({ name: '' });
//                     setImage(null);
//                     setPreview('');
//                   }}
//                 >
//                   Cancel
//                 </button>
//               )}
//               <button
//                 type="submit"
//                 className="bg-[var(--activeTab-color)] text-white cursor-pointer rounded-md font-semibold text-[1.1dvw] px-5 py-1.5"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Processing...' : isEdit.state ? 'Update Category' : 'Add Category'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <div className="IM__userListMainWrapper">
//         <div className="IM__userTableWrapper">
//           <AgGridReact
//             rowData={categories}
//             columnDefs={columnDefs}
//             defaultColDef={{ filter: true, editable: false }}
//             pagination={true}
//             rowSelection={{ mode: 'multiRow', headerCheckbox: false }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateCategoryAdmin;

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { AgGridReact } from 'ag-grid-react';
// import { Edit, Trash, CircleX, Camera, Plus } from 'lucide-react';
// import { AdminLayout } from './AdminLayout';

// const CreateCategoryAdmin = () => {
//   const [formData, setFormData] = useState({ name: '' });
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isEdit, setIsEdit] = useState({ state: false, categoryId: null });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const imageRef = useRef(null);

//   const token = Cookies.get('adminToken');

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:5555/api/admin/get-category', {
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
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const removeImage = () => {
//     setImage(null);
//     setPreview('');
//   };

//   const resetForm = () => {
//     setFormData({ name: '' });
//     setImage(null);
//     setPreview('');
//     setIsEdit({ state: false, categoryId: null });
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
//     data.append('name', formData.name);
//     if (image) {
//       data.append('image', image);
//     }

//     try {
//       if (isEdit.state) {
//         await axios.put(`http://localhost:5555/api/admin/update-category${isEdit.categoryId}`, data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setSuccess('Category updated successfully!');
//       } else {
//         if (!image) {
//           throw new Error('Category image is required');
//         }
//         await axios.post('http://localhost:5555/api/admin/create-category', data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setSuccess('Category created successfully!');
//       }
//       fetchCategories();
//       setTimeout(() => {
//         resetForm();
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Operation failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (category) => {
//     setFormData({ name: category.name });
//     setPreview(category.image ? `http://localhost:5555/${category.image}` : '');
//     setImage(null);
//     setIsEdit({ state: true, categoryId: category?._id });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this category?')) {
//       try {
//         await axios.delete(`http://localhost:5555/api/admin/delete-category/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSuccess('Category deleted successfully!');
//         fetchCategories();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete category');
//       }
//     }
//   };

//   const columnDefs = [
//     { field: 'name', headerName: 'Category Name', flex: 1 },
//     {
//       field: 'image',
//       headerName: 'Image',
//       width: 120,
//       cellRenderer: (params) => (
//         params.value ? (
//           <div className="image-cell">
//             <img
//               src={`http://localhost:5555/${params.value}`}
//               alt="category"
//               className="category-image"
//             />
//           </div>
//         ) : <span className="no-image">No Image</span>
//       ),
//     },
//     { field: 'createdBy.name', headerName: 'Created By', flex: 1 },
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
//         <div className="actions-cell">
//           <button
//             className="edit-btn"
//             onClick={() => handleEdit(params.data)}
//             title="Edit Category"
//           >
//             <Edit size={18} />
//           </button>
//           <button
//             className="delete-btn"
//             onClick={() => handleDelete(params.data?._id)}
//             title="Delete Category"
//           >
//             <Trash size={18} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <style jsx>{`
//         .category-management-wrapper {
//           padding: 20px;
//           background: #fff;
//           border-radius: 8px;
//           margin: 20px;
//         }

//         .cm-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 30px;
//           padding-bottom: 20px;
//           border-bottom: 2px solid #f0f0f0;
//         }

//         .cm-header h3 {
//           font-size: 24px;
//           font-weight: 700;
//           color: #333;
//           margin: 0;
//         }

//         .add-category-btn {
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

//         .add-category-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0,123,255,0.3);
//         }

//         .form-section {
//           background: #f8f9fa;
//           padding: 25px;
//           border-radius: 12px;
//           margin-bottom: 30px;
//           border: 1px solid #e9ecef;
//           transition: all 0.3s ease;
//         }

//         .form-section.show {
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

//         .form-input {
//           width: 100%;
//           padding: 12px 16px;
//           background: #fff;
//           border: 1px solid #d4d4d4;
//           border-radius: 8px;
//           font-size: 16px;
//           outline: none;
//           transition: border-color 0.3s ease;
//         }

//         .form-input:focus {
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
//         }

//         .btn-submit:hover {
//           background: #0056b3;
//         }

//         .btn-submit:disabled {
//           background: #6c757d;
//           cursor: not-allowed;
//         }

//         .categories-list {
//           background: #fff;
//           border-radius: 12px;
//           padding: 25px;
//           border: 1px solid #e9ecef;
//         }

//         .list-header {
//           margin-bottom: 20px;
//         }

//         .list-header h4 {
//           font-size: 20px;
//           font-weight: 600;
//           color: #333;
//           margin: 0;
//         }

//         .ag-grid-wrapper {
//           height: 500px;
//           border-radius: 8px;
//           overflow: hidden;
//           border: 1px solid #e9ecef;
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

//         .image-cell {
//           display: flex;
//           align-items: center;
//           height: 100%;
//         }

//         .category-image {
//           width: 50px;
//           height: 50px;
//           object-fit: cover;
//           border-radius: 4px;
//           border: 1px solid #e9ecef;
//         }

//         .no-image {
//           color: #6c757d;
//           font-style: italic;
//         }

//         .actions-cell {
//           display: flex;
//           gap: 8px;
//           align-items: center;
//           justify-content: center;
//           height: 100%;
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
//           transform: scale(1.1);
//         }

//         .delete-btn {
//           background: var(--Negative-color, #dc3545);
//           color: white;
//         }

//         .delete-btn:hover {
//           background: #c82333;
//           transform: scale(1.1);
//         }

//         @media (max-width: 768px) {
//           .category-management-wrapper {
//             margin: 10px;
//             padding: 15px;
//           }

//           .cm-header {
//             flex-direction: column;
//             gap: 15px;
//             align-items: flex-start;
//           }

//           .form-section {
//             padding: 20px;
//           }

//           .ag-grid-wrapper {
//             height: 400px;
//           }
//         }
//       `}</style>

//       <AdminLayout>
//  <div className="category-management-wrapper">
//         <div className="cm-header">
//           <h3>Category Management</h3>
//           {!showForm && (
//             <button 
//               className="add-category-btn"
//               onClick={() => setShowForm(true)}
//             >
//               <Plus size={20} />
//               Add Category
//             </button>
//           )}
//         </div>

//         {showForm && (
//           <div className="form-section show">
//             <div className="form-header">
//               <h4>{isEdit.state ? 'Edit Category' : 'Add New Category'}</h4>
//               <button 
//                 className="close-form-btn"
//                 onClick={resetForm}
//               >
//                 <CircleX size={20} />
//               </button>
//             </div>

//             {error && <div className="message error-message">{error}</div>}
//             {success && <div className="message success-message">{success}</div>}

//             <form onSubmit={handleSubmit}>
//               <div className="image-upload-area">
//                 {preview ? (
//                   <div className="image-preview">
//                     <img src={preview} alt="Category preview" />
//                     <button
//                       type="button"
//                       className="remove-image-btn"
//                       onClick={removeImage}
//                     >
//                       <CircleX size={16} />
//                     </button>
//                   </div>
//                 ) : (
//                   <div style={{ textAlign: 'center' }}>
//                     <button
//                       type="button"
//                       className="upload-button"
//                       onClick={() => imageRef.current?.click()}
//                     >
//                       <Camera size={24} />
//                     </button>
//                     <div className="upload-text">
//                       Add category image
//                     </div>
//                     <input
//                       ref={imageRef}
//                       onChange={handleImageChange}
//                       hidden
//                       type="file"
//                       accept="image/jpeg,image/jpg,image/png"
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Category Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter category name..."
//                   required
//                 />
//               </div>

//               <div className="form-actions">
//                 <button
//                   type="button"
//                   className="btn-cancel"
//                   onClick={resetForm}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn-submit"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Processing...' : isEdit.state ? 'Update Category' : 'Add Category'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         <div className="categories-list">
//           <div className="list-header">
//             <h4>All Categories ({categories.length})</h4>
//           </div>
          
//           <div className="ag-grid-wrapper">
//             <AgGridReact
//               rowData={categories}
//               columnDefs={columnDefs}
//               defaultColDef={{ 
//                 filter: true, 
//                 editable: false,
//                 sortable: true,
//                 resizable: true
//               }}
//               pagination={true}
//               paginationPageSize={10}
//               rowSelection={{ mode: 'multiRow', headerCheckbox: false }}
//               animateRows={true}
//               rowHeight={70}
//             />
//           </div>
//         </div>
//       </div>

//       </AdminLayout>
     
//     </>
//   );
// };

// export default CreateCategoryAdmin;













// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { AgGridReact } from 'ag-grid-react';
// import { Edit, Trash, CircleX, Camera, Plus, ChevronLeft, ChevronRight, Grid3X3, List } from 'lucide-react';
// import { AdminLayout } from './AdminLayout';
// import { motion, AnimatePresence } from 'framer-motion';

// const CreateCategoryAdmin = () => {
//   const [formData, setFormData] = useState({ name: '' });
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [filteredCategories, setFilteredCategories] = useState([]);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isEdit, setIsEdit] = useState({ state: false, categoryId: null });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [viewMode, setViewMode] = useState('table'); // 'card' or 'table'
//   const imageRef = useRef(null);

//   const token = Cookies.get('adminToken');
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     // Filter categories based on search term
//     const filtered = categories.filter(category =>
//       category.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCategories(filtered);
//     setCurrentPage(1); // Reset to first page when searching
//   }, [categories, searchTerm]);

//   const fetchCategories = async () => {
//     try {
//       setFetchLoading(true);
//       const response = await axios.get(`${API_BASE_URL}/api/admin/get-category`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCategories(response.data);
//     } catch (err) {
//       setError('Failed to fetch categories');
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError('');
//     setSuccess('');
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const removeImage = () => {
//     setImage(null);
//     setPreview('');
//   };

//   const resetForm = () => {
//     setFormData({ name: '' });
//     setImage(null);
//     setPreview('');
//     setIsEdit({ state: false, categoryId: null });
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
//     data.append('name', formData.name);
//     if (image) {
//       data.append('image', image);
//     }

//     try {
//       if (isEdit.state) {
//         await axios.put(`${API_BASE_URL}/api/admin/update-category/${isEdit.categoryId}`, data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setSuccess('Category updated successfully!');
//       } else {
//         if (!image) {
//           throw new Error('Category image is required');
//         }
//         await axios.post(`${API_BASE_URL}/api/admin/create-category`, data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setSuccess('Category created successfully!');
//       }
//       fetchCategories();
//       setTimeout(() => {
//         resetForm();
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Operation failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (category) => {
//     setFormData({ name: category.name });
//     setPreview(category.image ? `${API_BASE_URL}/${category.image}` : '');
//     setImage(null);
//     setIsEdit({ state: true, categoryId: category?._id });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this category?')) {
//       try {
//         await axios.delete(`${API_BASE_URL}/api/admin/delete-category/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSuccess('Category deleted successfully!');
//         fetchCategories();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete category');
//       }
//     }
//   };

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentCategories = filteredCategories.slice(startIndex, endIndex);

//   // For table view, we'll use AG-Grid's built-in pagination
//   const tableItemsPerPage = 10;
//   const tableRowData = viewMode === 'table' ? filteredCategories : [];

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

//   // Table column definitions for AG-Grid
//   const columnDefs = [
//     { field: 'name', headerName: 'Category Name', flex: 1 },
//     {
//       field: 'image',
//       headerName: 'Image',
//       width: 120,
//       cellRenderer: (params) => (
//         params.value ? (
//           <div className="image-cell">
//             <img
//               src={`${API_BASE_URL}/${params.value}`}
//               alt="category"
//               className="category-image"
//             />
//           </div>
//         ) : <span className="no-image">No Image</span>
//       ),
//     },
//     { field: 'createdBy.name', headerName: 'Created By', flex: 1 },
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
//             title="Edit Category"
//           >
//             <Edit size={18} />
//           </button>
//           <button
//             className="delete-btn table-delete-btn"
//             onClick={() => handleDelete(params.data?._id)}
//             title="Delete Category"
//           >
//             <Trash size={18} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   // Animation variants
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

//   const CategoryCard = ({ category, index }) => (
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
//         {category.image ? (
//           <img
//             src={`${API_BASE_URL}/${category.image}`}
//             alt={category.name}
//             className="category-card-image"
//           />
//         ) : (
//           <div className="no-image-placeholder">
//             <Camera size={24} />
//           </div>
//         )}
//       </div>
//       <div className="category-card-content">
//         <h4 className="category-name">{category.name}</h4>
//         <p className="category-meta">Created by: {category.createdBy?.name}</p>
//         <p className="category-date">{new Date(category.createdAt).toLocaleDateString()}</p>
//         <div className="category-actions">
//           <motion.button
//             className="edit-btn"
//             onClick={() => handleEdit(category)}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Edit size={16} />
//           </motion.button>
//           <motion.button
//             className="delete-btn"
//             onClick={() => handleDelete(category._id)}
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
//         .category-management-wrapper {
//           padding: 20px;
//           background: #fff;
//           border-radius: 8px;
//           margin: 20px;
//           min-height: calc(100vh - 140px);
//           overflow-y: auto;
//           max-height: calc(100vh - 140px);
//         }

//         .cm-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 30px;
//           padding-bottom: 20px;
//           border-bottom: 2px solid #f0f0f0;
//         }

//         .cm-header h3 {
//           font-size: 24px;
//           font-weight: 700;
//           color: #333;
//           margin: 0;
//         }

//         .add-category-btn {
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

//         .add-category-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0,123,255,0.3);
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

//         .form-input {
//           width: 100%;
//           padding: 12px 16px;
//           background: #fff;
//           border: 1px solid #d4d4d4;
//           border-radius: 8px;
//           font-size: 16px;
//           outline: none;
//           transition: border-color 0.3s ease;
//         }

//         .form-input:focus {
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

//         .categories-section {
//           background: #fff;
//           border-radius: 12px;
//           padding: 25px;
//           border: 1px solid #e9ecef;
//         }

//         .categories-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//           flex-wrap: wrap;
//           gap: 15px;
//         }

//         .categories-header h4 {
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

//         .categories-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 20px;
//           margin-bottom: 20px;
//           min-height: 300px;
//         }

//         .table-view {
//           /* Changed from fixed height to auto for dynamic height */
//           height: auto;
//           max-height: none;
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
//           .category-management-wrapper {
//             margin: 10px;
//             padding: 15px;
//             max-height: calc(100vh - 120px);
//           }

//           .cm-header {
//             flex-direction: column;
//             gap: 15px;
//             align-items: flex-start;
//           }

//           .categories-header {
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

//           .categories-grid {
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
//           .category-management-wrapper {
//             margin: 15px;
//             padding: 18px;
//           }

//           .categories-grid {
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
//           .category-management-wrapper {
//             margin: 16px;
//             padding: 19px;
//           }

//           .table-view {
//             height: auto;
//           }
//         }
//       `}</style>

//       <AdminLayout>
//         <motion.div 
//           className="category-management-wrapper"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.div className="cm-header" variants={itemVariants}>
//             <h3>Category Management</h3>
//             {!showForm && (
//               <motion.button 
//                 className="add-category-btn"
//                 onClick={() => setShowForm(true)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Plus size={20} />
//                 Add Category
//               </motion.button>
//             )}
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
//                   <h4>{isEdit.state ? 'Edit Category' : 'Add New Category'}</h4>
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
//                       {preview ? (
//                         <motion.div 
//                           className="image-preview"
//                           initial={{ opacity: 0, scale: 0.8 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           exit={{ opacity: 0, scale: 0.8 }}
//                         >
//                           <img src={preview} alt="Category preview" />
//                           <motion.button
//                             type="button"
//                             className="remove-image-btn"
//                             onClick={removeImage}
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                           >
//                             <CircleX size={16} />
//                           </motion.button>
//                         </motion.div>
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
//                             Add category image
//                           </div>
//                           <input
//                             ref={imageRef}
//                             onChange={handleImageChange}
//                             hidden
//                             type="file"
//                             accept="image/jpeg,image/jpg,image/png"
//                           />
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>

//                   <motion.div 
//                     className="form-group"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 }}
//                   >
//                     <label className="form-label">Category Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="Enter category name..."
//                       required
//                     />
//                   </motion.div>

//                   <motion.div 
//                     className="form-actions"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
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
//                       {isLoading ? 'Processing...' : isEdit.state ? 'Update Category' : 'Add Category'}
//                     </motion.button>
//                   </motion.div>
//                 </form>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <motion.div className="categories-section" variants={itemVariants}>
//             <div className="categories-header">
//               <h4>All Categories ({filteredCategories.length})</h4>
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
//                   placeholder="Search categories..."
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
//                 <div className="loading-text">Loading categories...</div>
//               </motion.div>
//             ) : filteredCategories.length === 0 ? (
//               <motion.div 
//                 className="empty-state"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <div className="empty-state-icon">📂</div>
//                 <h4>No categories found</h4>
//                 <p>{searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first category'}</p>
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
//                         className="categories-grid"
//                         layout
//                       >
//                         <AnimatePresence>
//                           {currentCategories.map((category, index) => (
//                             <CategoryCard 
//                               key={category._id} 
//                               category={category} 
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
//                             Showing {startIndex + 1}-{Math.min(endIndex, filteredCategories.length)} of {filteredCategories.length}
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
//       </AdminLayout>
//     </>
//   );
// };

// export default CreateCategoryAdmin;



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AgGridReact } from 'ag-grid-react';
import { Edit, Trash, CircleX, Camera, Plus, ChevronLeft, ChevronRight, Grid3X3, List } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';

const CreateCategoryAdmin = () => {
  const [formData, setFormData] = useState({ name: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEdit, setIsEdit] = useState({ state: false, categoryId: null });
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [showDeleteModal, setShowDeleteModal] = useState({ state: false, categoryId: null, categoryName: '' });
  const imageRef = useRef(null);

  const token = Cookies.get('adminToken');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1);
  }, [categories, searchTerm]);

  const fetchCategories = async () => {
    try {
      setFetchLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/admin/get-category`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview('');
  };

  const resetForm = () => {
    setFormData({ name: '' });
    setImage(null);
    setPreview('');
    setIsEdit({ state: false, categoryId: null });
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
    data.append('name', formData.name);
    if (image) {
      data.append('image', image);
    }

    try {
      if (isEdit.state) {
        await axios.put(`${API_BASE_URL}/api/admin/update-category/${isEdit.categoryId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccess('Category updated successfully!');
      } else {
        if (!image) {
          throw new Error('Category image is required');
        }
        await axios.post(`${API_BASE_URL}/api/admin/create-category`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccess('Category created successfully!');
      }
      fetchCategories();
      setTimeout(() => {
        resetForm();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name });
    setPreview(category.image ? `${API_BASE_URL}/${category.image}` : '');
    setImage(null);
    setIsEdit({ state: true, categoryId: category?._id });
    setShowForm(true);
  };

  const handleDelete = (id, categoryName) => {
    setShowDeleteModal({ state: true, categoryId: id, categoryName });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/delete-category/${showDeleteModal.categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Category deleted successfully!');
      fetchCategories();
      setShowDeleteModal({ state: false, categoryId: null, categoryName: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete category');
      setShowDeleteModal({ state: false, categoryId: null, categoryName: '' });
    }
  };

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);
  const tableItemsPerPage = 10;
  const tableRowData = viewMode === 'table' ? filteredCategories : [];

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

  const columnDefs = [
    { field: 'name', headerName: 'Category Name', flex: 1 },
    {
      field: 'image',
      headerName: 'Image',
      width: 120,
      cellRenderer: (params) => (
        params.value ? (
          <div className="image-cell">
            <img
              src={`${API_BASE_URL}/${params.value}`}
              alt="category"
              className="category-image"
            />
          </div>
        ) : <span className="no-image">No Image</span>
      ),
    },
    { field: 'createdBy.name', headerName: 'Created By', flex: 1 },
    { 
      field: 'createdAt', 
      headerName: 'Created At', 
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString() 
    },
    {
      headerName: 'Actions',
      width: 120,
      cellRenderer: (params) => (
        <div className="actions-cell my-4" style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
          <button
            className="edit-btn table-edit-btn"
            onClick={() => handleEdit(params.data)}
            title="Edit Category"
          >
            <Edit size={18} />
          </button>
          <button
            className="delete-btn table-delete-btn"
            onClick={() => handleDelete(params.data?._id, params.data.name)}
            title="Delete Category"
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } }
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
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="spinner-ring"></div>
    </motion.div>
  );

  const CategoryCard = ({ category, index }) => (
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
        {category.image ? (
          <img
            src={`${API_BASE_URL}/${category.image}`}
            alt={category.name}
            className="category-card-image"
          />
        ) : (
          <div className="no-image-placeholder">
            <Camera size={24} />
          </div>
        )}
      </div>
      <div className="category-card-content">
        <h4 className="category-name">{category.name}</h4>
        <p className="category-meta">Created by: {category.createdBy?.name}</p>
        <p className="category-date">{new Date(category.createdAt).toLocaleDateString()}</p>
        <div className="category-actions">
          <motion.button
            className="edit-btn"
            onClick={() => handleEdit(category)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit size={16} />
          </motion.button>
          <motion.button
            className="delete-btn"
            onClick={() => handleDelete(category._id, category.name)}
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
            onClick={() => setShowDeleteModal({ state: false, categoryId: null, categoryName: '' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <CircleX size={20} />
          </motion.button>
        </div>
        <p>Are you sure you want to delete the category "<strong>{showDeleteModal.categoryName}</strong>"? This action cannot be undone.</p>
        <div className="modal-actions">
          <motion.button
            className="btn-cancel"
            onClick={() => setShowDeleteModal({ state: false, categoryId: null, categoryName: '' })}
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
        .category-management-wrapper {
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          margin: 20px;
          min-height: calc(100vh - 140px);
          overflow-y: auto;
          max-height: calc(100vh - 140px);
        }

        .cm-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }

        .cm-header h3 {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }

        .add-category-btn {
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

        .add-category-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,123,255,0.3);
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

        .form-input {
          width: 100%;
          padding: 12px 16px;
          background: #fff;
          border: 1px solid #d4d4d4;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
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

        .categories-section {
          background: #fff;
          border-radius: 12px;
          padding: 25px;
          border: 1px solid #e9ecef;
        }

        .categories-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .categories-header h4 {
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

        .categories-grid {
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
          .category-management-wrapper {
            margin: 10px;
            padding: 15px;
            max-height: calc(100vh - 120px);
          }

          .cm-header {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }

          .categories-header {
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

          .categories-grid {
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
          .category-management-wrapper {
            margin: 15px;
            padding: 18px;
          }

          .categories-grid {
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
          .category-management-wrapper {
            margin: 16px;
            padding: 19px;
          }

          .table-view {
            height: auto;
          }
        }
      `}</style>

      <AdminLayout>
        <motion.div 
          className="category-management-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="cm-header" variants={itemVariants}>
            <h3>Category Management</h3>
            {!showForm && (
              <motion.button 
                className="add-category-btn"
                onClick={() => setShowForm(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={20} />
                Add Category
              </motion.button>
            )}
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
                  <h4>{isEdit.state ? 'Edit Category' : 'Add New Category'}</h4>
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
                      {preview ? (
                        <motion.div 
                          className="image-preview"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <img src={preview} alt="Category preview" />
                          <motion.button
                            type="button"
                            className="remove-image-btn"
                            onClick={removeImage}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <CircleX size={16} />
                          </motion.button>
                        </motion.div>
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
                            Add category image
                          </div>
                          <input
                            ref={imageRef}
                            onChange={handleImageChange}
                            hidden
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div 
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter category name..."
                      required
                    />
                  </motion.div>

                  <motion.div 
                    className="form-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
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
                      {isLoading ? 'Processing...' : isEdit.state ? 'Update Category' : 'Add Category'}
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className="categories-section" variants={itemVariants}>
            <div className="categories-header">
              <h4>All Categories ({filteredCategories.length})</h4>
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
                  placeholder="Search categories..."
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
                <div className="loading-text">Loading categories...</div>
              </motion.div>
            ) : filteredCategories.length === 0 ? (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="empty-state-icon">📂</div>
                <h4>No categories found</h4>
                <p>{searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first category'}</p>
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
                        className="categories-grid"
                        layout
                      >
                        <AnimatePresence>
                          {currentCategories.map((category, index) => (
                            <CategoryCard 
                              key={category._id} 
                              category={category} 
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
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredCategories.length)} of {filteredCategories.length}
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
                            resizable: true
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
      </AdminLayout>
    </>
  );
};

export default CreateCategoryAdmin;