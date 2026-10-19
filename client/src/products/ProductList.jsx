import { Link } from "react-router-dom"
import api from "../api/api"
import { useEffect, useState } from "react"

const ProductList = () => {

    const [products, setProducts] = useState([]);

    // 검색 키워드 상태 관리
    const [searchKeyword, setSearchKeyword] = useState("");

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

    // 검색된 상품목록 필터링
    const filterProducts = products.filter(product => product.product_name.toLowerCase().includes(searchKeyword.toLowerCase()));

    return (
        <div className="product-list">
            {/* 검색 기능 */}
            <div className="search-bar">
                <input type="text" placeholder="상품명으로 검색" onChange={(e) => setSearchKeyword(e.target.value)}/>
            </div>
            {/* 상품 목록 */}
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {filterProducts.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td><Link to={`/products/${p.id}`}>{p.product_name}</Link></td>
                            <td>{p.price}</td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            <div className="btn-add">
                <Link to='/products/new'>
                    <button>상품 등록</button>
                </Link>
            </div>
        </div>
    )
}

export default ProductList