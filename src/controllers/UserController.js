const knex = require("../database");
const { validationResult } = require("express-validator");

module.exports = {
  async index(req, res) {
    const  results = await knex('users')
    .where('deleted_at', null)

    return res.json(results);
  },
  async create(req, res,next) {

    try {
      const { username, email } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array()})
      }
      
      await knex('users').insert({
        username,
        email
      });

      return res.status(201).send();
    } catch (error) {
      next(error)
    }
  },
  async update(req, res, next) {
    try {
      const { username, email } = req.body;
      const { id } = req.params;

      await knex('users')
      .update({ username, email })
      .where({ id })

      return res.send();
    } catch (error) {
      next(error)
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await knex('users')
      .where({ id })
      .update('deleted_at', new Date());
      // .del()

      return res.send();
    } catch (error) {
      next(error)
    }
  }
};