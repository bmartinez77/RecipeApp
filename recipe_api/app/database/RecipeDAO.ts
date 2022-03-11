import { Recipe } from "../models/Recipe";
import * as mysql from "mysql";
import * as util from "util";

export class RecipeDAO
{
    private host:string = "";
    private port:number = 3306;
    private username:string = "";
    private password:string = "";
    private schema:string = "cst391";
    private pool = this.initDbConnection();
    
    /**
     * Non-default constructor.
     * 
     * @param host Database Hostname
     * @param username Database Username
     * @param password Database Password
     */
    
    constructor(host:string, port:number, username:string, password:string)
    {
        // Set all class properties
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.pool = this.initDbConnection();
    }    

    /**
     * CRUD method to return all Recipes.
     * 
     * @param callback Callback function with an Array of type Album.
     */
    
    public findAllRecipes(callback: any)
    {
         // List of Albums to return
         let recipes:Recipe[] = [];

        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and run query to get all Albums
            connection.query = util.promisify(connection.query);
            let rows = await connection.query('SELECT * FROM Recipe');
            for(let x=0;x < rows.length;++x)
            {
                // Add Album and its Tracks to the list
                recipes.push(new Recipe(rows[x]['RECIPE_ID'], rows[x].NAME, rows[x].INSTRUCTIONS, rows[x].DIFFICULTY, rows[x].DATE));
            }

            // Do a callback to return the results
            callback(recipes);
         });
    }

    /**
     * CRUD method to searches for all Albums by a wildard search in Artist.
     * 
     * @param search wildcard Artist to search Albums for.
     * @param callback Callback function with an Array of type Album.
     */
    
    public findRecipeByName(search:string, callback: any)
    {
         // List of Albums to return
         let albums:Recipe[] = [];

        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and run query to get all Albums for search partial Artist
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query("SELECT * FROM Recipe WHERE NAME LIKE ? ORDER BY RECIPE_ID", ['%' + search + '%']);
            for(let x=0;x < result1.length;++x)
            {
                 // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                // let albumId = result1[x].RECIPE_ID;
                // let tracks:Recipe[] = [];

                // Add Album and its Tracks to the list
                albums.push(new Recipe(result1[x].RECIPE_ID, result1[x].NAME, result1[x].INSTRUCTIONS, result1[x].DIFFICULTY, result1[x].DATE)); 
            }

            // Do a callback to return the results
            callback(albums);
         });
    }            


    /**
     * CRUD method to searches for all Albums by a wildard search in Artist.
     * 
     * @param search wildcard Artist to search Albums for.
     * @param callback Callback function with an Array of type Album.
     */
    
     public findRecipeByInstruction(search:string, callback: any)
     {
          // List of Albums to return
          let albums:Recipe[] = [];
 
         // Get pooled database connection and run queries   
         this.pool.getConnection(async function(err:any, connection:any)
         {
             // Release connection in the pool
             connection.release();
 
             // Throw error if an error
             if (err) throw err;
 
             // Use Promisfy Util to make an async function and run query to get all Albums for search partial Artist
             connection.query = util.promisify(connection.query);
             let result1 = await connection.query("SELECT * FROM Recipe WHERE INSTRUCTIONS LIKE ? ORDER BY RECIPE_ID", ['%' + search + '%']);
             for(let x=0;x < result1.length;++x)
             {
                  // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                 let albumId = result1[x].RECIPE_ID;
                 let tracks:Recipe[] = [];
 
                 // Add Album and its Tracks to the list
                 albums.push(new Recipe(result1[x].RECIPE_ID, result1[x].NAME, result1[x].INSTRUCTIONS, result1[x].DIFFICULTY, result1[x].DATE)); 
             }
 
             // Do a callback to return the results
             callback(albums);
          });
     }  

     public findRecipeByDifficulty(search:string, callback: any)
     {
          // List of Albums to return
          let albums:Recipe[] = [];
 
         // Get pooled database connection and run queries   
         this.pool.getConnection(async function(err:any, connection:any)
         {
             // Release connection in the pool
             connection.release();
 
             // Throw error if an error
             if (err) throw err;
 
             // Use Promisfy Util to make an async function and run query to get all Albums for search partial Artist
             connection.query = util.promisify(connection.query);
             let result1 = await connection.query("SELECT * FROM Recipe WHERE DIFFICULTY LIKE ? ORDER BY RECIPE_ID", ['%' + search + '%']);
             for(let x=0;x < result1.length;++x)
             {
                  // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                 let albumId = result1[x].RECIPE_ID;
                 let tracks:Recipe[] = [];
 
                 // Add Album and its Tracks to the list
                 albums.push(new Recipe(result1[x].RECIPE_ID, result1[x].NAME, result1[x].INSTRUCTIONS, result1[x].DIFFICULTY, result1[x].DATE)); 
             }
 
             // Do a callback to return the results
             callback(albums);
          });
     } 
    
    /**
     * CRUD method to return an Album.
     * 
     * @param albumId Album ID to retrieve Album for.
     * @param callback Callback function with an Array of type Album.
     */
    
    public findRecipeId(recipeId:number, callback: any)
    {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and run query to get all Albums for specific Artist
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('SELECT * FROM Recipe WHERE RECIPE_ID=?', [recipeId]);
            if(result1.length != 1)
                callback(null);

            // Create an Album and its Tracks for return
            let album = new Recipe(result1[recipeId].RECIPE_ID, result1[recipeId].NAME, result1[recipeId].INSTRUCTIONS, result1[recipeId].DIFFICULTY, result1[recipeId].DATE); 

            // Do a callback to return the results
            callback(album);
         });
    }

    /**
     * CRUD method to create an Album.
     * 
     * @param album Album to insert.
     * @param callback Callback function with -1 if an error else Album ID created.  
     */
    
    public create(album:Recipe, callback: any)
    {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and insert Album
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('INSERT INTO Recipe (NAME, INSTRUCTIONS, DIFFICULTY, DATE) VALUES(?,?,?,?)', [album.Name, album.Instructions, album.Difficulty, album.Date]);
            if(result1.affectedRows != 1)
               callback(-1);

            // Use Promisfy Util to make an async function and run query to insert all Tracks for this Album
            let albumId = result1.insertId;
            // for(let y=0;y < album.Tracks.length;++y)
            // {
            //     let result2 = await connection.query('INSERT INTO TRACK (ALBUM_ID, TITLE, NUMBER, VIDEO_URL) VALUES(?,?,?,?)', [albumId, album.Tracks[y].Title, album.Tracks[y].Number, album.Tracks[y].Video]);
            // }

            // Do a callback to return the results
            callback(albumId);
        });
    }

    /**
     * CRUD method to update an Album.
     * 
     * @param album Album to update.
     * @param callback Callback function with number of rows updated.  
     */
    
    public update(album:Recipe, callback: any)
    {
         // Get pooled database connection and run queries   
         this.pool.getConnection(async function(err:any, connection:any)
         {
             // Release connection in the pool
             connection.release();
 
             // Throw error if an error
            if (err) throw err;
 
             // Use Promisfy Util to make an async function and update Album
             let changes = 0;
             connection.query = util.promisify(connection.query);
            let result1 = await connection.query('UPDATE Recipe SET Name=?, INSTRUCTIONS=?, DIFFICULTY=?, DATE=? WHERE RECIPE_ID=?', [album.Name, album.Instructions, album.Difficulty, album.Date, album.Id]);
            if(result1.changedRows != 0)
                ++changes;

            //  // Use Promisfy Util to make an async function and run query to update all Tracks for this Album
            //  for(let y=0;y < album.Tracks.length;++y)
            // {
            //      let result2 = await connection.query('UPDATE TRACK SET TITLE=?, NUMBER=?, VIDEO_URL=? WHERE ID=? AND ALBUM_ID=?', [album.Tracks[y].Title, album.Tracks[y].Number, album.Tracks[y].Video, album.Tracks[y].Id, album.Id]);
            //      if(result2.changedRows != 0)
            //         ++changes;
            // }
 
            // Do a callback to return the results
            callback(changes);
         });
     }

     /**
     * CRUD method to delete an Album.
     * 
     * @param album Album ID to delete.
     * @param callback Callback function with number of rows deleted.  
     * */
    
    public delete(albumId:number, callback: any)
    {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
           if (err) throw err;

            // Use Promisfy Util to make an async function and run query to delete the tracks for an Album
            let changes = 0;
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('DELETE FROM Recipe WHERE RECIPE_ID=?', [albumId]);
            changes = changes + result1.affectedRows;
            
            // Do a callback to return the results
            callback(changes);
        });
    }

    //* **************** Private Helper Methods **************** */

    /**
     * Private helper method to initialie a Database Connection
     */
    
    private initDbConnection():any
    {
        return mysql.createPool({host: this.host, port: this.port, user: this.username, password: this.password, database: this.schema, connectionLimit: 10});
    }
    
}
