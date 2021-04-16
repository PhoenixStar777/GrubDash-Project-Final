const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const ordersController = require("./orders.controller");

// TODO: Implement the /orders routes needed to make the tests pass
router.route("/").get(ordersController.list);
router.route("/").post(ordersController.create);
router.route("/").all(methodNotAllowed);

router.route("/:orderId").get(ordersController.read);
router.route("/:orderId").put(ordersController.update);
router.route("/:orderId").delete(ordersController.delete);
router.route("/:orderId").all(methodNotAllowed);


module.exports = router;
