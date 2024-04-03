const express = require("express");
const cors = require("cors");

const ApiError = require("./app/api-error");

const app = express();

const contactsRouter = require("./app/routes/contact.route");

app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
    res.json({ message: "Welcome to contact book application"});
});

app.use("/api/contacts", contactsRouter);

// handle 404 response
app.use((req, res, next) => {
    //Code ở đay sẽ chạy khi không có route được định nghĩa nào
    //      khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404,"Resource not found"));
});

// define error-handling middware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middware xử lý lỗi tập trung.
    //Trong các đoạn coade xử lý các route, gọi next(error)
    //      sẽ chuyển về middware xử lý lỗi này

    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
    
});

module.exports = app;
