let router = require('express').Router();
const auths = require('../middleware/auth');
const Controller = require('../controllers/controller.computers');
router.route('/computers')
    .get(Controller.getAllComputers)
    .post(auths, Controller.createNewComputer)
    .put(auths, Controller.updatePcItem);

module.exports = router;