'use strict'

const Joi = require('joi');

module.exports = {
    method: Joi.string().valid('GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD', 'OPTIONS').required(),
    path: Joi.string().required(),
    payload: Joi.any().required()
}