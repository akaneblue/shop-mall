import { Navigate, useNavigate, useParams } from "react-router-dom"
import api from "../api/api";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const ProductInfo = () => {
  // Url 경로 추출
  const {id} = useParams();
  const [product, setProduct] = useState(null);

  //DB에서 해당Id 상품 가져오기
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log("상품 상세 조회 에러",error);
      }
    }
    fetchProduct();
  },[id]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    if(window.confirm("정말 삭제 하시겠습니까?")){
      try {
        await api.delete(`/products/${id}`);
        alert("상품이 삭제 되었습니다.")
        navigate("/products");
      } catch (error) {
        alert("상품 삭제 중 오류 발생", error)
      }
    }
  }

  return (
    <div className="product-info">
        <h2>상품 상세 페이지</h2>
        {product &&(
          <div className="detail">
            <p>상품명: {product.product_name}</p>
            <p>설명: {product.description}</p>
            <p>가격: {product.price}원</p>
            <p>등록일: {dayjs(product.created_at).format("YYYY-MM-DD HH:mm:ss")}</p>
            
         </div>
        )}
         <div>
            <button onClick={() => {navigate("/products")}}>목록 보기</button>
            <button onClick={() => {navigate(`/products/update/${id}`)}}>수정</button>
            <button onClick={handleDelete}>삭제</button>
         </div>
    </div>
  )
}

export default ProductInfo