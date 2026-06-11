import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';
import categoryService from '../services/categoryService'; 

const CategoryList = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getAllCategories();
                setCategories(data);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchCategories();
    }, []);

    const filteredCategories = categories.filter(category =>
        category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (id) => {
        navigate(`/update-category/${id}`);
    }

    const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
        return;
    }
    try {
        await categoryService.deleteCategory(id);
        setCategories(categories.filter(c => c.id !== id));
        alert("Category deleted successfully!");
    } catch (err) {
        console.error("Delete error:", err);

        if (err.response && err.response.status === 409) {
            alert("Cannot delete: This category is currently being used by existing events.");
        } else {
            alert("Failed to delete category. Please check your network connection.");
        }
    }
};

    return (
        <div className="cat-list-manager">
            <div className="cat-toolbar">
                <input
                    type="text"
                    placeholder="🔍 Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="cat-search-input"
                />
                <button className="cat-btn-primary" onClick={() => navigate("/create-category")}>
                    + Add New Category
                </button>
            </div>

            <div className="cat-grid">
                {filteredCategories.map(category => (
                    <div key={category.id} className="cat-card">
                        <div className="cat-card-header">
                            <h3>{category.name}</h3>
                        </div>
                        <div className="cat-card-body">
                            <p className="cat-description">
                                {category.description || 'No description provided'}
                            </p>
                        </div>
                        <div className="cat-card-actions">
                            <button className="cat-btn-edit" onClick={() => handleEdit(category.id)}>Edit</button>
                            <button className="cat-btn-delete" onClick={() => handleDelete(category.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;