const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const dishesController = require("./dishes.controller");

// TODO: Implement the /dishes routes needed to make the tests pass
router.route("/").get(dishesController.list);
router.route("/").post(dishesController.create);
router.route("/").all(methodNotAllowed);

router.route("/:dishId").get(dishesController.read);
router.route("/:dishId").put(dishesController.update);
router.route("/:dishId").delete(dishesController.delete);
router.route("/:dishId").all(methodNotAllowed);

module.exports = router;
