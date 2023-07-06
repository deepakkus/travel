var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({status: false})
});
const AdminController = require('../../../Controller/Auth/Admin');
const TripController = require('../../../Controller/Admin/Trip');
router.post('/admin/login', AdminController.login);
router.post('/admin/register', AdminController.register);
router.post('/admin/trip', TripController.create);
router.put('/admin/trip/:id', TripController.update);
router.delete('/admin/trip/:id', TripController.Delete);
router.get('/admin/trip-details/:id', TripController.viewSingel);
router.get('/admin/trip', TripController.viewAll);
const multer = require('multer');
const middleware  = require('../../../service/middleware').middleware;
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
router.use(middleware);
router.post('/admin/trip/upload', upload.single("image"), TripController.ImageUpload);
module.exports = router;
