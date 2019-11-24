let mongoose = require("mongoose");
let User = mongoose.model("User");
let ResetRequest = mongoose.model("ResetRequest");
let md5 = require('md5');


module.exports.authorize = function*({email, password}){
	return yield User.findOne({email, password:md5(password)});
};

module.exports.register = function*(userData){
	let existingUser = yield User.findOne({email:userData.email});
	if(existingUser){
		let error = new Error();
		error.statusCode = 400;
		error.message = "User already exist";
		throw error
	}
	userData.password = md5(userData.password);
	let newUser = yield User.create(userData);
	return newUser;
};


module.exports.raiseResetRequest = function*(email){
    let existingUser = yield yield User.findOne({email:email});
    if(existingUser){
        let request = ResetRequest.create({user:existingUser._id, status:"pending"});
        console.log(request)
	}
    let error = new Error();
    error.statusCode = 400;
    error.message = "User doesn't exist";
    throw error
}

module.exports.resetPassword = function*(requestId, userId, password) {
	let existingRequest = ResetRequest.findOne({_id:requestId, user:userId, status:"pending"})
	if(existingRequest){
		yield User.update({_id:userId}, {password:md5(password)})
		yield ResetRequest.update({_id:requestId, status:"done"})
		return
	}
	else{
        let error = new Error();
        error.statusCode = 400;
        error.message = "Unauthorized";
        throw error
	}
}