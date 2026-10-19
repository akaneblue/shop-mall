import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"

const AddProduct = () => {
    // 폼 데이터(객체) 상태 관리
    const [formData, setFormData] = useState({
        productName : "",
        price : "",
        description : ""
    })

    const {productName, price, description} = formData;

    // 페이지 이동
    const navigate = useNavigate();

    // 입력값 변경 핸들러
    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormData({...formData, [name]: value})
    }

    // 폼 제출 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("상품 추가: ",formData);

        // 입력값 검증
        if(!formData.productName.trim() || !formData.price || !formData.description.trim()){
            alert("모든 필드를 입력하세요");
            return;
        }

        if(isNaN(formData.price) || formData.price <= 0){
            alert("가격은 0보다 큰 숫자를 입력하세요.");
            return;
        }

        // 서버에 데이터 전송
        try {
            await api.post("/products", formData);
            alert("상품이 등록되었습니다.");
            navigate("/products"); //상품 등록 후 목록 페이지로 이동
        } catch (error) {
            console.log("상품 등록 중 오류 발생", error);
            return;
        }

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
        <div className="add-product">
            <h2>상품 등록</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productName">상품명</label>
                    <input type="text" id="productName" name="productName" placeholder="상품명을 입력하세요." value={productName} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="price">가격</label>
                    <input type="text" id="price" name="price" placeholder="가격을 입력하세요." value={price} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="description">설명</label>
                    <textarea name="description" rows={5} id="description" placeholder="상품 설명을 입력하세요." value={description} onChange={handleInputChange}></textarea>
                </div>
                <div>
                    <button type="submit">등록</button>
                    <button type="button" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct