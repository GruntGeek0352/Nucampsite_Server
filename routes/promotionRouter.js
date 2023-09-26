const express = require('express');
const promotionRouter = express.Router();
const Promotion = require('../models/promotion');

promotionRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        Promotion.find({})
            .then(promotions => {
                res.status(200).json(promotions);
            })
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        Promotion.create(req.body)
            .then(promotion => {
                console.log('Promotion Created: ', promotion);
                res.status(201).json(promotion);
            })
            .catch(err => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res, next) => {
        Promotion.deleteMany({})
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => next(err));
    });

promotionRouter.route('/:promotionId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        Promotion.findById(req.params.promotionId)
            .then(promotion => {
                res.status(200).json(promotion);
            })
            .catch(err => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
    })
    .put((req, res, next) => {
        Promotion.findByIdAndUpdate(req.params.promotionId, { $set: req.body }, { new: true })
            .then(promotion => {
                res.status(200).json(promotion);
            })
            .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Promotion.findByIdAndDelete(req.params.promotionId)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => next(err));
    });

module.exports = promotionRouter;
