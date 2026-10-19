import express, { json } from "express"
import mysql from "mysql2"
import cors from "cors"

// app 객체 생성
const app = express();
const PORT = 8000;

app.use(json());
// cors (Cross Origin Resource Sharing)
// 브라우저가 보안상의 이유로 하는 api 요청 차단을 방지
app.use(cors({
    origin: "http://localhost:5173",
}))

// db 연결 설정
const db = mysql.createConnection({
    host: "localhost",
    user: "jsuser",
    password: "1234",
    database: "jsdb"
});

// DB 연결
db.connect((err) => {
    if(err){
        console.log("DB 연결 오류",err);
        return;
    }
    console.log("DB에 연결 되었습니다.");
    
});

app.get("/", (req, res) => {
      res.send("<h1>API 서버와 DB 연동</h1>")  
})

// 상품 목록 조회
// db.query(sql, 데이터, 콜백 함수)
app.get("/api/products", (req, res) => {
    const sql = "select * from product;"
    db.query(sql,(err, result) => {
        if(err){
            console.log("상품 조회 오류", err);
            res.send("상품 조회 중 오류 발생");
            return;
        }
        res.json(result);   //json 형태로 응답
    });
})

// 상품 등록
app.post("/api/products", (req,res) => {
    const {productName, price, description} = req.body;
    const sql = "insert into product(product_name, price, description) values(?,?,?)";
    db.query(sql, [productName, price, description], (err) => {
        if(err){
            console.log("상품 등록 오류", err);
            res.send("상품 등록 중 오류 발생");
            return;
        }
        res.send("상품이 성공적으로 등록되었습니다.");
    });

})

// 상품 단건 조회
app.get("/api/products/:id", (req, res) => {
    const p_id = req.params.id;
    const sql = "select * from product where id = ?"
    db.query(sql,[p_id], (err, result) => {
        if(err){
            console.log("상품 조회 오류", err);
            res.send("상품 조회 중 오류 발생");
            return;
        }
        res.json(result[0]);
    })
})

// 상품 수정
app.put("/api/products/:id", (req, res) => {
    const p_id = req.params.id;
    const {productName, price, description} = req.body;
    const sql = "update product set product_name = ? , price = ?, description = ? where id = ?;"

    db.query(sql,[productName,price,description,p_id], (err) => {
        if(err){
            console.log("상품 수정 오류", err);
            res.send("상품 수정 중 오류 발생");
            return;
        }
        res.send("상품이 성공적으로 수정되었습니다.")
    })
})

// 상품 삭제
app.delete("/api/products/:id", (req,res) => {
    const p_id = req.params.id;
    const sql = "delete from product where id = ?"
    db.query(sql,[p_id], (err) => {
        if(err){
            console.log("상품 수정 오류", err);
            res.send("상품 수정 중 오류 발생");
            return;
        }
        res.send("상품이 성공적으로 삭제되었습니다.")
    })
})

// 회원 목록
app.get("/api/users", (req, res) => {
    const sql = "select * from users";
    db.query(sql,(err, results) => {
        if(err){
            console.log("회원 조회 오류", err);
            res.send("회원 조회 중 오류 발생")
            return;
        }
        res.json(results);
    })
})

// 회원 단건 조회
app.get("/api/users/:username", (req, res) => {
    const sql = "select * from users where username = ?"
    const username = req.params.username;
    db.query(sql, username, (err, results) => {
        if(err){
            console.log("회원 상세 조회 오류", err);
            res.send("회원 상세 조회 중 오류 발생");
            return;
        }
        res.json(results)
    })
})

// 회원 가입
app.post("/api/users", (req, res) => {
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body);
    const sql = "insert into users (username, password, email) values (?, ?, ?)"
    const {username, password, email} = req.body;
    db.query(sql, [username, password, email],(err) => {
        if(err){
            console.log("회원 가입 오류", err);
            res.send("회원 가입 중 오류 발생");
            return;
        }
        res.send("회원이 성공적으로 가입되었습니다.");
    })
})

// 서버 실행
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}에서 서버 실행 중 ... `);
})