// import bcrypt from "bcrypt"
// import { db } from "../../../firebase"

// export default async (req, res) => {
// 	const { email, password, name } = req.body

// 	async function checkUserEmail(email) {
// 		const user = await db.collection("users").where("email", "==", email).get()
// 		return user
// 	}
// 	const user = await checkUserEmail(email)
// 	user.forEach((doc) => {
// 		console.log(doc.id, " => ", doc.data())
// 	})
// 	if (!user.empty) {
// 		res.status(200).json({
// 			message:
// 				"Email is already used by other person. Please use another email",
// 		})
// 		return
// 	}

// 	const saltRounds = 10
// 	bcrypt.genSalt(saltRounds, function (err, salt) {
// 		bcrypt.hash(password, salt, async function (err, hash) {
// 			console.log("HASH PASSWORD", hash)
// 			//create user
// 			const newUser = await db.collection("users").add({
// 				email,
// 				password: hash,
// 				name,
// 			})
// 			const userId = newUser.id

// 			//create account for that newly created user
// 			const newAccount = await db.collection("accounts").add({
// 				providerType: null,
// 				customSignup: true,
// 				userId,
// 			})
// 			await res.status(200).json({
// 				message: "Welcome. Your account has been created successfully.",
// 			})
// 		})
// 	})
// }
