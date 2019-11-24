const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");



module.exports.send = function* (msg) {
	return new Promise(function (resolve, reject) {
		sgMail.send(msg, function (err) {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
};


module.exports.sendUserVerificationEmail = function* (email, name, verificationId) {
	return new Promise(function (resolve, reject) {
		sgMail.send({
            to: email,
            from: "admin@socialcognitive.com",
            subject: "Account Verification",
			substitutions: {
				name: name || ""
			},
			templateId: "403f543f-d8d7-4262-853d-03a7119a89bd"
		}, function (err) {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
};



