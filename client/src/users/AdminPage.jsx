import { useEffect, useState } from "react"
import api from "../api/api"
import dayjs from "dayjs"

const AdminPage = ({userRole}) => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);

    // 상품 목록 회원 목록 조회
    useEffect(() => {
        const fetchData = async() => {
            try {
                const [productRes, userRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/users'),
                ])

                setProducts(productRes.data);
                setUsers(userRes.data);
            } catch (error) {
                console.log("관리자 대시보드 조회 중 오류 발생",error);
            }
        };
        fetchData();
    },[userRole])

    // 전체 상품 수
    console.log("상품 수: ",products.length);
    
    // 전체 회원 수
    console.log("회원 수: ",users.length);

    // 관리자 수
    const adminCount = users.filter(user => user.role === "admin").length

    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

    // 평균 가격 (정수로 반올림)
    const avgPrice = Math.round(totalPrice/users.length);
    
    //최근 등록 상품 5개(등록일 기준 내림차순)
    const recentProducts = [...products].sort(
        (a,b) => b.created_at.valueOf() - a.created_at.valueOf()).slice(0,5);

    return (
        <div className="admin-page">
            <h2>관리자 대시보드</h2>
            {/* 요약카드 */}
            <div className="admin-cards">
                <div className="admin-card">
                    <p>전체 상품</p>
                    <strong>{products.length}개</strong>
                </div>
                <div className="admin-card">
                    <p>전체 회원</p>
                    <strong>{userRole.length}명</strong>
                </div>
                <div className="admin-card">
                    <p>관리자</p>
                    <strong>{adminCount}명</strong>
                </div>
                <div className="admin-card">
                    <p>평균 상품 가격</p>
                    <strong>{avgPrice}원</strong>
                </div>
            </div>

            {/* 최근 등록 상품 */}
            <h3>최근 등록 상품</h3>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {recentProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.price}</td>
                            <td>{dayjs(product.created_at).format("YYYY-MM-DD HH:mm:ss")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 회원 목록 */}
            <h3>회원 목록</h3>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>ID</th>
                        <th>이메일</th>
                        <th>권한</th>
                        <th>가입일</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role === "admin" ? "관리자" : "일반회원"}</td>
                            <td>{dayjs(user.created_at).format("YYYY-MM-DD HH:mm:ss")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default AdminPage