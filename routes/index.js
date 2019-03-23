var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});
//resturant        
router.get('/resturant', ensureAuthenticated, function(req, res){
	res.render('resturant');
});
//contact
router.get('/contact', ensureAuthenticated, function (req, res) {
	res.render('contact');
});   
//image
/*router.get('/image', ensureAuthenticated, function (req, res) {
	res.render('image');
});  
*/
// router.get('/image', ensureAuthenticated, function (req, res) {
// 	res.render('image', { username: req.user.username });
// });  

//employee
router.get('/employee', ensureAuthenticated, function (req, res) {
	res.render('employee');
});   



// Contact us

var Cont  = require('../models/cont');
router.post('/contact', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
    var country = req.body.country;
    var phone = req.body.phone;
    var message = req.body.message;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('phone', 'Phoneno is required').notEmpty();
	req.checkBody('country', 'Country is required').notEmpty();
	req.checkBody('message', 'Message is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.render('contact', {                    //dont forget to put in contact.handlebars
			errors: errors
		});
	}
	
				else {
					var newCont = new Cont({
						name: name,
						email: email,
						country: country,
                        phone: phone,
                        message: message
					});
					//console.log("user model is : ",ContModel);
					Cont.createCont(newCont, function (err, cont) {
						if (err) throw err;
						console.log(cont);
					});
         	req.flash('success_msg', 'your message has been submitted we will reply ASAP :-)');
					res.redirect('/contact');
				}

			});
			


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}          

module.exports = router;