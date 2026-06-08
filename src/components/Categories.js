import React, { useState, useEffect } from "react";
import { Music, Cpu, Award, Image, Briefcase, Laugh } from "lucide-react";
import "../styles/categories.css";
import categoryService from "../services/categoryService";
import { useNavigate } from "react-router-dom";

const iconMap = {
  "Music": <Music size={32} />,
  "Cpu": <Cpu size={32} />,
  "Award": <Award size={32} />,
  "Image": <Image size={32} />,
  "Briefcase": <Briefcase size={32} />,
  "Laugh": <Laugh size={32} />
};

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    categoryService.getAllCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories from backend:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Loading Categories...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="categories-section">
      <div className="section-header">
        <span className="section-subtitle">Categories</span>
        <h2 className="section-title">Explore Venues by Interest</h2>
        <div className="title-underline"></div>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} 
            className="category-card"
            onClick={() => navigate(`/events?categoryId=${category.id}`)}>
            <div className="category-icon-wrapper">
              {iconMap[category.icon] || <Award size={32} />} 
            </div>
            <h3 className="category-card-title">{category.name}</h3>
            <p className="category-card-desc">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;