import { Link } from "react-router-dom"
import api from "../api/api"
import { useEffect, useState } from "react"

const ProductList = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // 'http://localhost:8000/api/products'
                const response = await api.get('/products')
                setProducts(response.data); //data 속성 호출
            } catch (error) {
                console.log("상품 목록 조회 에러: ",error);
            }
        }
        fetchProducts();
    },[]);

    return (
        <div className="product-list">
            <h2>상품 리스트</h2>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td><Link to={`/products/${p.id}`}>{p.product_name}</Link></td>
                            <td>{p.price}</td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            <div className="btn-add">
                <Link to='/add-product'>
                    <button>상품 등록</button>
                </Link>
            </div>
        </div>
    )
}

export default ProductList