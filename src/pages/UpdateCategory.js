import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import categoryService from '../services/categoryService';
import '../styles/createCategory.css'; 

const UpdateCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', description: '', icon: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const category = await categoryService.getCategoryById(id);
                setFormData(category);
            } catch (err) {
                console.error("Failed to fetch category:", err);
                alert("Error loading category details.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await categoryService.updateCategory(id, formData);
            alert("Category updated successfully!");
            navigate('/admin-dashboard');
        } catch (err) {
            console.error("Error updating category:", err);
            alert("Failed to update category.");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="cat-form-page">
            <form onSubmit={handleSubmit} className="cat-create-form">
                <h2>Update Category</h2>
                
                <div className="cat-form-group">
                    <label>Category Name</label>
                    <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required 
                    />
                </div>
                
                <div className="cat-form-group">
                    <label>Description</label>
                    <textarea 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                </div>
                
                <div className="cat-form-group">
                    <label>Icon Name (e.g., FaMusic)</label>
                    <input 
                        type="text" 
                        value={formData.icon}
                        onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    />
                </div>

                <div className="cat-form-buttons">
                    <button type="button" className="cat-btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
                    <button type="submit" className="cat-btn-save">Update Category</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCategory;