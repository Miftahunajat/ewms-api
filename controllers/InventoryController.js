const User = require('../models').User;
const Item = require('../models').Item;
const Inventory = require('../models').Inventory;

module.exports = {
	list(req, res) {
		return Inventory
		.findAll({
			include: [
			{
				model: Item,
				as: 'items'
			}, 
			{
                model: User,
                as: 'user'
            }],
			order: [
				['createdAt', 'DESC'],
				[{ model: Item, as: 'items' }, 'createdAt', 'DESC']
			],
		})
		.then((inventories) => res.status(200).send(inventories))
		.catch((error) => { res.status(400).send(error); });
	},
	
	getById(req, res) {
		return Inventory
		.findById(req.params.id, {
			include: [
			{
				model: Item,
				as: 'items'
			}, 
			{
                model: User,
                as: 'user'
			}
			],
		})
		.then((inventory) => {
			if (!inventory) {
				return res.status(404).send({
					message: 'Inventory not found!',
				});
			}
			return res.status(200).send(inventory);
		})
		.catch((error) => res.status(400).send(error));
	},
	
	add(req, res) {
		let user_id = req.body.user_id;
		if (!user_id) {
			res.status(404).send({'msg': 'Field cannot be null!'});
		} else {
			return Inventory
			.create({
				user_id: user_id
			})
			.then((inventory) => res.status(201).send(inventory))
			.catch((error) => res.status(400).send(error));
		}
	},
	
	update(req, res) {
		let user_id = req.body.user_id;
		if (!user_id) {
			res.status(404).send({'msg': 'Field cannot be null!'});
		} else {
			return Inventory
			.findById(req.params.id, {
				include: [{
					model: Item,
					as: 'items'
				}, {
					model: User,
					as: 'user'
				}],
			})
			.then(inventory => {
				if (!inventory) {
					return res.status(404).send({
						message: 'Inventory Not Found!',
					});
				}
				return inventory
				.update({
					user_id: user_id || inventory.user_id
				})
				.then(() => res.status(200).send(inventory))
				.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
		}
	},
	
	delete(req, res) {
		return Inventory
		.findById(req.params.id)
		.then(inventory => {
			if (!inventory) {
				return res.status(400).send({
					message: 'Inventory Not Found!',
				});
			}
			return inventory
			.destroy()
			.then(() => res.status(204).send())
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
};