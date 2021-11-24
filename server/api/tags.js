const router = require('express').Router();
const Sequelize = require('sequelize');
const { models: { User, Tag, Location } } = require('../db');

module.exports = router;

// Get all tags
router.get('/', async (req, res, next) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).send(tags)
    } catch (error) {
        next(error)
    }
})

//Get single tag
router.route('/:id')
    .get(async (req, res, next) => {
        // Get a single tag
        try {
            const singleTag = await Tag.findByPk(req.params.id);
            res.status(200).send(singleTag);
        } catch (error) {
            next(error);
        }
    }).put(async (req, res, next) => {
        //Edit a single tag
        try {
            const singleTag = await Tag.findByPk(req.params.id);
            const { title, description, imageUrl } = req.body
            await singleTag.update({ title, description, imageUrl })
            res.status(200).send(singleTag);
        } catch (error) {
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        //Delete a single tag
        try {
            const singleTag = await Tag.findByPk(req.params.id);
            singleTag.destroy();
            res.status(202).send(singleTag);
        } catch (error) {
            next(error);
        }
    })

router.route('/:locationId')
    .post(async (req, res, next) => {
        //Create a single tag
        try {
            const location = await Location.findByPk(req.params.locationId)
            const newTag = await Tag.create(req.body);
            location.setTag(newTag);
            res.status(200).send(newTag);
        } catch (error) {
            next(error);
        }
    })