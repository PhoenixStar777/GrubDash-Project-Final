const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
function listDishes(req, res, next) {
    res.json({data: dishes});
}

function createDish(req, res, next) {
    const {data: {id, name, description, price, image_url } = {}} = req.body;
    const newDish = {
        id: nextId(),
        name: name,
        description: description,
        price: price,
        image_url: image_url,
    };
    dishes.push(newDish);
    res.status(201).json({data: newDish});
    

}

function dishExists(req, res, next) {
    const dishId = req.params.dishId;
    const foundDish = dishes.find((dish) => dish.id === dishId);

    
    if (foundDish) {
      res.locals.dish = foundDish;
      return next();
    }

    next({
      status: 404,
      message: `Dish ID '${dishId}' Doesn't Exist`,
    });
  }

function deleteExists(req, res, next) {
    const dishId = req.params.dishId;
    const foundDish = dishes.find((dish) => dish.id === dishId);

    
    if (foundDish) {
      res.locals.dish = foundDish;
      next({
        status: 405,
      });
      return next();
    }
    next({
      status: 405,
      message: `Dish ID '${dishId}' Doesn't Exist`,
    });
  }

function readDish(req, res, next) {
    res.json({data: res.locals.dish});
}

function updateDish(req, res) {
    const dishId = req.params.dishId;
    const foundDish = dishes.find((dish) => dish.id === dishId);
    const { data: { name, description, price, image_url } = {} } = req.body;
  
    foundDish.name = name;
    foundDish.description = description;
    foundDish.price = price;
    foundDish.image_url = image_url;
  
    res.json({ data: foundDish });
    
  }
  

function deleteDish(req, res, next) {
    const {dishId} = req.params;
    const index = dishes.findIndex((dish) => dish.id === Number(dishId));
    if(index > -1) {
        dishes.splice(index, 1);
    }
    res.sendStatus(204);
}

function isValidDish(req, res, next) {
    const {
        data: { name, description, price, image_url },
    } = req.body;
  
//   console.log(req.body)
    if (!name || name === ''){
      return next({
        status: 400,
        message: `Dish must include a name`,
      });
    }
//       if(`id != $dishId`)
//       return next({
//         status: 400,
//         message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}`,
//       });
      
//     if (name === '')
//       return next({
//         status: 400,
//         message: `Dish must include a name`,
//       });
    if (!description)
      return next({
        status: 400,
        message: `Dish must include a description`,
      });
    if (description === '')
      return next({
        status: 400,
        message: `Dish must include a description`,
      });
    if (!price)
      return next({
        status: 400,
        message: `Dish must include a price`,
      });
    if (price <= 0)
      return next({
        status: 400,
        message: `Dish must have a price that is an integer greater than 0`,
      });
    if (typeof price !== 'number')
      return next({
        status: 400,
        message: `Dish must have a price that is an integer greater than 0`,
      });
    if (!image_url)
      return next({
        status: 400,
        message: `Dish must include a image_url`,
      });
  
    if (image_url === '')
      return next({
        status: 400,
        message: `Dish must include a image_url`,
      });
    res.locals.dish = { data: { name, description, price, image_url } };
    return next();

}
function checkDishId(req,res,next) { 
  const { dishId } = req.params
    const { data : {id} = {} } = req.body
    if(!id || id === dishId) {
		res.locals.dishId = dishId;
		return next();
	}
	next({
		status: 400,
		message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}`
	});
}


// function checkDishId(req, res, next){
//   const dishId = req.params.dishId;
//   const id = req.body.data.id;
//   if(dishId !== id) {
//     return next({
//       status: 400,
//       message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}`;
//     })
//   }
//   return next();
// }

 

module.exports = {
    list: [listDishes],
    create:[isValidDish, createDish],
//     read: [isValidDish, dishExists, readDish],
    read: [dishExists, readDish],
    update: [dishExists, isValidDish, checkDishId, updateDish],
    delete: [deleteExists, deleteDish]
    
}
