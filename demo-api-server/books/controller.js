const books = require('./model');

const controller = {};

// routes =>

/* ------------------- INDEX -------------------*/
// GET  "/"                     => greetings

controller.welcome = (req, res) => {
  console.log("-- GET /all --");
  res.send("hi, you're at the books api");
}

/* ------------------- INDEX -------------------*/
// GET  "/all"                     => show all books

controller.get_all = (req, res) => {
  console.log("-- GET /all --");
  books.find()
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
// POST "/add"                => Create new books

controller.get_add = (req, res) => {
    console.log("-- GET /add --");
    res.send('put a new author\'s title in the body and send a post request to this address: { title: "string" }. you\'ll get back the new author\'s entry');
}

controller.post_add = (req, res) => {
    console.log("-- POST /add --");
    const new_title = req.body.title;
    const new_author = { title: new_title };
    books.create(new_author)
      // modify the next line based on your project's needs
      .then((db_response) => { res.send(db_response) })
      .catch((err) => {
        res.status(500).send({
          message: err.message
        });
      });
}


/* ------------------- READ -------------------*/
// GET  "/find/:id"             => View books Info with id ...


controller.get_id = (req, res) => {
    const author_id = req.params.id;
    console.log("-- GET /"+author_id+"/find --");
    const id_object = { _id: author_id };
    books.find(id_object)
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
// POST "/:id/update"     => update books with id...


controller.get_id_update = (req, res) => {
    const author_id = req.params.id;
    console.log("-- GET /"+author_id+"/update --");
    res.send('send a post request to this address a title in the body');
}

controller.post_id_update = (req, res) => {
    const author_id = req.params.id;
    console.log("-- POST /"+author_id+"/update --");
    const id_object = { _id: author_id };
    const title = req.body.title;
    const title_object = { title: title };
    books.update(id_object, title_object)
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
// POST "/:id/delete"     => delete books with id...


controller.get_id_delete = (req, res) => {
    const author_id = req.params.id;
    console.log("-- GET /"+author_id+"/delete --");
    res.send('send a post request to this address with an author ID, it will be deleted');
}

controller.post_id_delete = (req, res) => {
    const author_id = req.params.id;
    console.log("-- POST /"+author_id+"/delete --");
    const id_object = { _id: author_id };
    books.remove(id_object)
      // modify the next line based on your project's needs
      .then((db_response) => { res.send(db_response) })
      .catch((err) => {
        res.status(500).send({
          message: err.message
        });
      });
}


module.exports = controller;
