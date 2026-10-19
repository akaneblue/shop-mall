import { useNavigate, useParams } from "react-router-dom"
import api from "../api/api";
import { useEffect, useState } from "react";

const UpdateProduct = () => {
    const {id} = useParams();

    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        description: "",
    })

    const {productName, price, description} = formData;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setFormData({
                    productName: response.data.product_name,
                    price: response.data.price,
                    description: response.data.description,
                });
            } catch (error) {
                console.log("상품 조회 중 에러 발생",error);
            }
        }
        fetchProduct();
    },[id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(window.confirm("수정하시겠습니까?")){
            try {
                await api.put(`/products/${id}`,formData);
                alert("상품이 수정되었습니다.")
                navigate(`/products/${id}`);
            } catch (error) {
                console.log("상품 수정 중 오류 발생",error);
            }
        }
        
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormData({...formData, [name]: value})
    }

    const handleCancel = (e) => {
        e.preventDefault();
        
        setFormData({
            productName: "",
            price: "",
            description: "",
        })
    }

    return (
        <div className="update-product">
            <h2>상품 수정</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productName">상품명</label>
                    <input type="text" id="productName" name="productName" value={productName} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="price">가격</label>
                    <input type="number" id="price" name="price" value={price} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="description">설명</label>
                    <textarea name="description" rows={5} id="description" value={description} onChange={handleInputChange}></textarea>
                </div>
                <div>
                    <button type="submit">수정</button>
                    <button type="button" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProduct