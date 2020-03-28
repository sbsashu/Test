let Register = "CREATE TABLE IF NOT EXISTS users (id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(100) NOT NULL, email varchar(100) NOT NULL, password varchar(100) NOT NULL, created_at TIMESTAMP DEFAULT now() ON UPDATE now(), updated_at TIMESTAMP DEFAULT now() ON UPDATE now())";

connection.query(Register, (err, result) => {
    if(err) throw err;
    if(result)
        console.log('User table created')
});