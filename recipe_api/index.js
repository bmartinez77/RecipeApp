// Application Dependencies
const { Recipe } = require('./lib/app/models/Recipe');
const { RecipeDAO } = require('./lib/app/database/RecipeDAO.js')

const bodyParser = require('body-parser');
const cors = require('cors');

// Create instance of an Express Application on Port 3000
const express = require('express');
const app = express();
const port = 5000;

// Database configuration
const dbHost = "localhost"
const dbPort = 3306;
const dbUsername = "root"
const dbPassword = "root"

// Set location of static resources and use the JSON body parser
app.use(express.static('app/images'))
app.use(bodyParser.json());
app.use(cors());

// Route code begins
// GET Route at Root '/' that returns a Test Text message
app.get('/', function (_req, res)
{
    // Return Test Text
    console.log('In GET / Route');
    res.send('This is the default root Route.');
})

// GET Route at '/recipes' that returns all Albums from the database
app.get('/recipes', function (req, res)
{
    // Return Albums List as JSON, call MusicDAO.findAllAlbums(), and return JSON array of Albums
    console.log('In GET /recipes Route ');
    let dao = new RecipeDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.findAllRecipes(function(recipe)
    {
        res.json(recipe);
    });
})

// GET Route at '/recipes'/:artist that returns all Albums for an Artist from the database
app.get('/recipes/:id', function (req, res)
{
    // Return Albums List as JSON, call MusicDAO.findAlbums(), and return JSON array of Albums
    console.log('In GET /recipe Route for ' + req.params.id);
    let dao = new RecipeDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.findRecipeId(req.params.id, function(recipe)
    {
        res.json(recipe);
    });
})
// // GET Route at '/recipes'/:name that returns all Albums for an Artist from the database
// app.get('/recipes/:name', function (req, res)
// {
//     // Return Albums List as JSON, call MusicDAO.findAlbums(), and return JSON array of Albums
//     console.log('In GET /albums Route for ' + req.params.name);
//     let dao = new RecipeDAO(dbHost, dbPort, dbUsername, dbPassword);
//     dao.findRecipeId(req.params.name, function(recipe)
//     {
//         res.json(recipe);
//     });
// })


// GET Route at '/albums/search/artist/:search' that does a wildcard search for all Albums searching by Artist from the database
app.get('/recipes/search/name/:search', function (req, res)
{
    // Return Albums List as JSON, call MusicDAO.findAlbumsByArtist(), and return JSON array of Albums
    console.log('In GET /recipe/search/name Route for ' + req.params.search);
    let dao = new RecipeDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.findRecipeByName(req.params.search, function(recipe) // findAlbumsByArtist
    {
        res.json(recipe);
    });
})

// GET Route at '/albums/search/artist/:search' that does a wildcard search for all Albums searching by Artist from the database
app.get('/recipes/search/instruction/:search', function (req, res)
{
    // Return Albums List as JSON, call MusicDAO.findAlbumsByArtist(), and return JSON array of Albums
    console.log('In GET /recipe/search/instruction Route for ' + req.params.search);
    let dao = new RecipeDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.findRecipeByInstruction(req.params.search, function(recipe) // findAlbumsByArtist
    {
        res.json(recipe);
    });
})

// GET Route at '/albums/search/artist/:search' that does a wildcard search for all Albums searching by Artist from the database
app.get('/recipes/search/difficulty/:search', function (req, res)
{
    // Return Albums List as JSON, call MusicDAO.findAlbumsByArtist(), and return JSON array of Albums
    console.log('In GET /recipe/search/instruction Route for ' + req.params.search);
    let dao = new RecipeDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.findRecipeByDifficulty(req.params.search, function(recipe) // findAlbumsByArtist
    {
        res.json(recipe);
    });
})

// POST Route at '/albums' that adds an Album and its Tracks to the database
app.post('/recipes', function (req, res)
{
    console.log(req);
    
    // If invalid POST Body then return 400 response else add Album and Tracks to the database
    console.log('In POST /recipes Route with Post of ' + JSON.stringify(req.body));
    if(!req.body.name)
    {
        // Check for valid POST Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid Recipe Posted"});
    }
    else
    {
    
        let album = new Recipe(-1, req.body.name, req.body.instructions, req.body.difficulty, req.body.date);

        // Call RecipeDAO.create() to create an Album from Posted Data and return an OK response     
        let dao = new RecipeDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.create(album, function(albumId)
        {
            if(albumId == -1)
                res.status(200).json({"error" : "Creating Recipe failed"})
            else
                res.status(200).json({"success" : "Creating Recipe passed with an Recipe ID of " + albumId});
        });     
      }
})

// PUT Route at '/albums' that updates an Album and its Tracks in the database
app.put('/recipes', function (req, res)
{
    // If invalid PUT Body then return 400 response else update Album and Tracks to the database
    console.log('In PUT /recipes Route with Post of ' + JSON.stringify(req.body));
    if(!req.body.name)
    {
        // Check for valid PUT Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid Recipe Posted"});
    }
    else
    {

        let album = new Recipe(req.body.id, req.body.name, req.body.instructions, req.body.difficulty, req.body.date);

        // Call RecipeDAO.update() to update an Album from Posted Data and return an OK response     
        let dao = new RecipeDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.update(album, function(changes)
        {
            if(changes == 0)
                res.status(200).json({"error" : "Updating Recipe passed but nothing was changed"})
            else
                res.status(200).json({"success" : "Updating Recipe passed and data was changed"});
        });     
      }
})



// DELETE Route at '/albums/:artist/:id' that deletes an Album given an Album ID from the database
app.delete('/recipes/:id', function (req, res)
{
    // Get the Album
    console.log('In DELETE /recipes Route with ID of ' + req.params.id);
    let albumId = Number(req.params.id);
 
    // Call MusicDAO.delete() to delete an Album from the database and return if passed
    let dao = new RecipeDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.delete(albumId, function(changes)
    {
        if(changes == 0)
            res.status(200).json({"error" : "Delete Recipe failed"})
        else
            res.status(200).json({"success" : "Delete Recipe passed"})
    });
 })

// Route code ends
// Start the Server
app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}!`);
});
