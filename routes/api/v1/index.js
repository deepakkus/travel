var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({status: false})
});
const AdminController = require('../../../Controller/Auth/Admin');
const TripController = require('../../../Controller/Admin/Trip');
const BannerController = require('../../../Controller/Admin/Banner');
const CountryController = require('../../../Controller/Admin/Country');
router.post('/admin/login', AdminController.login);
router.post('/admin/register', AdminController.register);
router.post('/admin/trip', TripController.create);
router.post('/admin/banner', BannerController.create);
router.post('/admin/country', CountryController.create);

router.put('/admin/trip/:id', TripController.update);
router.put('/admin/banner/:id', BannerController.update);
router.put('/admin/country/:id', CountryController.update);

router.delete('/admin/trip/:id', TripController.Delete);
router.delete('/admin/banner/:id', BannerController.Delete);
router.delete('/admin/country/:id', CountryController.Delete);

router.get('/admin/trip-details/:id', TripController.viewSingel);
router.get('/admin/banner-details/:id', BannerController.viewSingel);
router.get('/admin/country-details/:id', CountryController.viewSingel);

router.get('/admin/trip', TripController.viewAll);
router.get('/admin/banner', BannerController.viewAll);
router.get('/admin/country', CountryController.viewAll);
const multer = require('multer');
const middleware  = require('../../../service/middleware').middleware;
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
router.use(middleware);
router.post('/admin/trip/upload', upload.single("image"), TripController.ImageUpload);
router.post('/admin/banner/upload', upload.single("image"), BannerController.ImageUpload);
module.exports = router;
