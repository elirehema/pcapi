let router = require('express').Router();
const auths = require('../middleware/auth');
const Controller = require('../controllers/controller.computers');
router.route('/computers')
    .get(Controller.getAllComputers)
    .post(auths, Controller.createNewComputer)
    .put(auths, Controller.updatePcItem);
router.route('/computers/:pcid')
    .delete(auths, Controller.deleteComputerById)
    .put(auths, Controller.updateComputerById)
    .patch(auths, Controller.updateComputerById);

module.exports = router;