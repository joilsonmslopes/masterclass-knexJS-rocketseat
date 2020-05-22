
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'joilsonmsl', email: 'contato@joilson.com' },
        { username: 'taranttini', email: 'contato@tarantini.com' }
      ]);
    });
};
