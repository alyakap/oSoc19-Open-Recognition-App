const authors = require('./model');

const controller = {};

// routes =>

/* ------------------- INDEX -------------------*/
// GET  "/"                     => greetings

controller.welcome = (req, res) => {
  console.log("-- GET /all --");
  res.send("hi, you're at the authors api");
}

/* ------------------- INDEX -------------------*/
// GET  "/all"                     => show all authors

controller.get_all = (req, res) => {
  console.log("-- GET /all --");
  authors.find()
    // modify the next line based on your project's needs
    .then((db_response) => { res.send(db_response) })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
}

/* ------------------- CREATE -------------------*/
// GET  "/add"                => instructions
// POST "/add"                => Create new authors

controller.get_add = (req, res) => {
    console.log("-- GET /add --");
    res.send('put a new author\'s name in the body and send a post request to this address: { first_name: "string" }. you\'ll get back the new author\'s entry');
}

controller.post_add = (req, res) => {
    console.log("-- POST /add --");
    const new_name = req.body.first_name;
    const new_author = { first_name: new_name };
    authors.create(new_author)
      // modify the next line based on your project's needs
      .then((db_response) => { res.send(db_response) })
      .catch((err) => {
        res.status(500).send({
          message: err.message
        });
      });
}


/* ------------------- READ -------------------*/
// GET  "/:id"             => View authors Info with id ...


controller.get_id = (req, res) => {
    const author_id = req.params.id;
    console.log("-- GET /"+author_id+" --");
    const id_object = { _id: author_id };
    authors.find(id_object)
      // modify the next line based on your project's needs
      .then((db_response) => { res.send(db_response) })
      .catch((err) => {
        res.status(500).send({
          message: err.message
        });
      });
}



/* ------------------- UPDATE -------------------*/
// GET  "/:id/update"     => instructions
// POST "/:id/update"     => update authors with id...


controller.get_id_update = (req, res) => {
    const author_id = req.params.id;
    console.log("-- GET /"+author_id+"/update --");
    res.send('send a post request to this address a first_name in the body');
}

controller.post_id_update = (req, res) => {
    const author_id = req.params.id;
    console.log("-- POST /"+author_id+"/update --");
    const id_object = { _id: author_id };
    const first_name = req.body.first_name;
    const name_object = { first_name: first_name };
    authors.update(id_object, name_object)
      // modify the next line based on your project's needs
      .then((db_response) => { res.send(db_response) })
      .catch((err) => {
        res.status(500).send({
          message: err.message
        });
      });
}

/* ------------------- DELETE -------------------*/
// GET  "/:id/delete"     => instructions
// POST "/:id/delete"     => delete authors with id...


controller.get_id_delete = (req, res) => {
    const author_id = req.params.id;
    console.log("-- GET /"+author_id+"/delete --");
    res.send('send a post request to this address with an author ID, it will be deleted');
}

controller.post_id_delete = (req, res) => {
    const author_id = req.params.id;
    console.log("-- POST /"+author_id+"/delete --");
    const id_object = { _id: author_id };
    authors.remove(id_object)
      // modify the next line based on your project's needs
      .then((db_response) => { res.send(db_response) })
      .catch((err) => {
        res.status(500).send({
          message: err.message
        });
      });
}


module.exports = controller;
