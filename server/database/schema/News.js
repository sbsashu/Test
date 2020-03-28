let News = "CREATE TABLE IF NOT EXISTS news (id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,user_id int(11) NOT NULL, title varchar(255) NOT NULL, description varchar(10000) NOT NULL, image varchar(255), created_at TIMESTAMP DEFAULT now() ON UPDATE now(), updated_at TIMESTAMP DEFAULT now() ON UPDATE now())";

connection.query(News, (err, result) => {
        if(err) throw err;
        if(result)
             console.log("News table created")
})