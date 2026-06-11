import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import categoryService from '../services/categoryService';
import "../styles/createCategory.css";

const CreateCategory = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', description: '', icon: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await categoryService.createCategory(formData);
            alert("Category created successfully!");
            navigate('/admin-dashboard');
        } catch (err) {
            console.error("Error creating category:", err);
            alert("Failed to create category.");
        }
    };

    return (
        <div className="cat-form-page">
            <form onSubmit={handleSubmit} className="cat-create-form">
                <h2>Create Category</h2>
                
                <div className="cat-form-group">
                    <label htmlFor="name">Category Name</label>
                    <input 
                        id="name"
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required 
                    />
                </div>
                
                <div className="cat-form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                </div>
                
                <div className="cat-form-group">
                    <label htmlFor="icon">Icon</label>
                    <input 
                        id="icon"
                        type="text" 
                        value={formData.icon}
                        onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    />
                </div>

                <div className="cat-form-buttons">
                    <button type="button" className="cat-btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
                    <button type="submit" className="cat-btn-save">Create</button>
                </div>
            </form>
        </div>
    );
};

export default CreateCategory;