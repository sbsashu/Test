let config = require('../config/index');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

module.exports = {
	SignUp: async (req, res) => {
		let { name, password, email } = req.body;
		 if(!name || !password || !password) {
			return res.status(401).send({
				success: false,
				message: "Fields are missing"
			})
		 }
		 if(typeof name !== 'string' || typeof password !== 'string' || typeof email !== 'string') {
		 		return res.status(401).send({
				success: false,
				message: "Invalid type"
			})
		 }

		 try {
		 	let user = "SELECT * FROM users WHERE email = '"+ email +"'";
				connection.query(user, (err, result) => {
					if(err) throw err;

					if(result.length > 0) {
						return res.status(200).send({
							success: false,
							message: 'User already exists'
						})
					} else {
						bcrypt.genSalt(10, function(err, salt) {
							bcrypt.hash(password, salt, function(err, hash) {
								let addUser = "INSERT INTO `users` (name, email, password) VALUES ('"+name+"','"+email+"','"+hash+"')"
								connection.query(addUser, (err, result) => {
									if(err) throw err;
				
									return res.status(200).send({
										success: true,
										message: 'Successfully SignUp'
									})
								})
							});
						});
					}
				})
	 } catch (e) {
	 	console.log(e.message);
	 	return res.status(500).send({
	 		success: false,
	 		message: 'Server Error'
	 	});
	 }
	},
	Login: async (req, res) => {
		let { email, password} = req.body;
		if(!password || !password) {
			return res.status(401).send({
				success: false,
				message: "Fields are missing"
			})
		 }
		 if(typeof password !== 'string' || typeof email !== 'string') {
		 		return res.status(401).send({
				success: false,
				message: "Invalid type"
			})
		 }
		let user = "SELECT * FROM users WHERE email = '"+email+"'";	
		connection.query(user, (err, result) => {
			if(err) throw err;
			if(result.length > 0) {
				bcrypt.compare(password, result[0].password, function(err, data) {
					if(err) throw err;
					if(data) {
					 let token = jwt.sign({
							data: {
								id: result[0].id,
								name: result[0].name,
								email: result[0].email
							}
						  }, config.SECRET, { expiresIn: '1h' })
							return res.status(200).send({
								success: true,
								data: token
							})
					} else {
						return res.status(200).send({
							success: false,
							message: "Password is wrong"
						})
					}
				});
			} else {
				return res.status(404).send({
					success: false,
					message: 'User not found'
				})
			}
		})
	}
}