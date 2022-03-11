"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipeDAO = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Recipe = require("../models/Recipe");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var RecipeDAO = /*#__PURE__*/function () {
  /**
   * Non-default constructor.
   * 
   * @param host Database Hostname
   * @param username Database Username
   * @param password Database Password
   */
  function RecipeDAO(host, port, username, password) {
    (0, _classCallCheck2.default)(this, RecipeDAO);
    (0, _defineProperty2.default)(this, "host", "");
    (0, _defineProperty2.default)(this, "port", 3306);
    (0, _defineProperty2.default)(this, "username", "");
    (0, _defineProperty2.default)(this, "password", "");
    (0, _defineProperty2.default)(this, "schema", "cst391");
    (0, _defineProperty2.default)(this, "pool", this.initDbConnection());
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


  (0, _createClass2.default)(RecipeDAO, [{
    key: "findAllRecipes",
    value: function findAllRecipes(callback) {
      // List of Albums to return
      var recipes = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, connection) {
          var rows, x;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all Albums
                  connection.query = util.promisify(connection.query);
                  _context.next = 6;
                  return connection.query('SELECT * FROM Recipe');

                case 6:
                  rows = _context.sent;

                  for (x = 0; x < rows.length; ++x) {
                    // Add Album and its Tracks to the list
                    recipes.push(new _Recipe.Recipe(rows[x]['RECIPE_ID'], rows[x].NAME, rows[x].INSTRUCTIONS, rows[x].DIFFICULTY, rows[x].DATE));
                  } // Do a callback to return the results


                  callback(recipes);

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to searches for all Albums by a wildard search in Artist.
     * 
     * @param search wildcard Artist to search Albums for.
     * @param callback Callback function with an Array of type Album.
     */

  }, {
    key: "findRecipeByName",
    value: function findRecipeByName(search, callback) {
      // List of Albums to return
      var albums = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, connection) {
          var result1, x;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context2.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all Albums for search partial Artist
                  connection.query = util.promisify(connection.query);
                  _context2.next = 6;
                  return connection.query("SELECT * FROM Recipe WHERE NAME LIKE ? ORDER BY RECIPE_ID", ['%' + search + '%']);

                case 6:
                  result1 = _context2.sent;

                  for (x = 0; x < result1.length; ++x) {
                    // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                    // let albumId = result1[x].RECIPE_ID;
                    // let tracks:Recipe[] = [];
                    // Add Album and its Tracks to the list
                    albums.push(new _Recipe.Recipe(result1[x].RECIPE_ID, result1[x].NAME, result1[x].INSTRUCTIONS, result1[x].DIFFICULTY, result1[x].DATE));
                  } // Do a callback to return the results


                  callback(albums);

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to searches for all Albums by a wildard search in Artist.
     * 
     * @param search wildcard Artist to search Albums for.
     * @param callback Callback function with an Array of type Album.
     */

  }, {
    key: "findRecipeByInstruction",
    value: function findRecipeByInstruction(search, callback) {
      // List of Albums to return
      var albums = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(err, connection) {
          var result1, x, albumId, tracks;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context3.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all Albums for search partial Artist
                  connection.query = util.promisify(connection.query);
                  _context3.next = 6;
                  return connection.query("SELECT * FROM Recipe WHERE INSTRUCTIONS LIKE ? ORDER BY RECIPE_ID", ['%' + search + '%']);

                case 6:
                  result1 = _context3.sent;

                  for (x = 0; x < result1.length; ++x) {
                    // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                    albumId = result1[x].RECIPE_ID;
                    tracks = []; // Add Album and its Tracks to the list

                    albums.push(new _Recipe.Recipe(result1[x].RECIPE_ID, result1[x].NAME, result1[x].INSTRUCTIONS, result1[x].DIFFICULTY, result1[x].DATE));
                  } // Do a callback to return the results


                  callback(albums);

                case 9:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "findRecipeByDifficulty",
    value: function findRecipeByDifficulty(search, callback) {
      // List of Albums to return
      var albums = []; // Get pooled database connection and run queries   

      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
          var result1, x, albumId, tracks;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context4.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all Albums for search partial Artist
                  connection.query = util.promisify(connection.query);
                  _context4.next = 6;
                  return connection.query("SELECT * FROM Recipe WHERE DIFFICULTY LIKE ? ORDER BY RECIPE_ID", ['%' + search + '%']);

                case 6:
                  result1 = _context4.sent;

                  for (x = 0; x < result1.length; ++x) {
                    // Use Promisfy Util to make an async function and run query to get all Tracks for this Album
                    albumId = result1[x].RECIPE_ID;
                    tracks = []; // Add Album and its Tracks to the list

                    albums.push(new _Recipe.Recipe(result1[x].RECIPE_ID, result1[x].NAME, result1[x].INSTRUCTIONS, result1[x].DIFFICULTY, result1[x].DATE));
                  } // Do a callback to return the results


                  callback(albums);

                case 9:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to return an Album.
     * 
     * @param albumId Album ID to retrieve Album for.
     * @param callback Callback function with an Array of type Album.
     */

  }, {
    key: "findRecipeId",
    value: function findRecipeId(recipeId, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(err, connection) {
          var result1, album;
          return _regenerator.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context5.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to get all Albums for specific Artist
                  connection.query = util.promisify(connection.query);
                  _context5.next = 6;
                  return connection.query('SELECT * FROM Recipe WHERE RECIPE_ID=?', [recipeId]);

                case 6:
                  result1 = _context5.sent;
                  if (result1.length != 1) callback(null); // Create an Album and its Tracks for return

                  album = new _Recipe.Recipe(result1[recipeId].RECIPE_ID, result1[recipeId].NAME, result1[recipeId].INSTRUCTIONS, result1[recipeId].DIFFICULTY, result1[recipeId].DATE); // Do a callback to return the results

                  callback(album);

                case 10:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to create an Album.
     * 
     * @param album Album to insert.
     * @param callback Callback function with -1 if an error else Album ID created.  
     */

  }, {
    key: "create",
    value: function create(album, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(err, connection) {
          var result1, albumId;
          return _regenerator.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context6.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and insert Album
                  connection.query = util.promisify(connection.query);
                  _context6.next = 6;
                  return connection.query('INSERT INTO Recipe (NAME, INSTRUCTIONS, DIFFICULTY, DATE) VALUES(?,?,?,?)', [album.Name, album.Instructions, album.Difficulty, album.Date]);

                case 6:
                  result1 = _context6.sent;
                  if (result1.affectedRows != 1) callback(-1); // Use Promisfy Util to make an async function and run query to insert all Tracks for this Album

                  albumId = result1.insertId; // for(let y=0;y < album.Tracks.length;++y)
                  // {
                  //     let result2 = await connection.query('INSERT INTO TRACK (ALBUM_ID, TITLE, NUMBER, VIDEO_URL) VALUES(?,?,?,?)', [albumId, album.Tracks[y].Title, album.Tracks[y].Number, album.Tracks[y].Video]);
                  // }
                  // Do a callback to return the results

                  callback(albumId);

                case 10:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
    /**
     * CRUD method to update an Album.
     * 
     * @param album Album to update.
     * @param callback Callback function with number of rows updated.  
     */

  }, {
    key: "update",
    value: function update(album, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(err, connection) {
          var changes, result1;
          return _regenerator.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context7.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and update Album
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context7.next = 7;
                  return connection.query('UPDATE Recipe SET Name=?, INSTRUCTIONS=?, DIFFICULTY=?, DATE=? WHERE RECIPE_ID=?', [album.Name, album.Instructions, album.Difficulty, album.Date, album.Id]);

                case 7:
                  result1 = _context7.sent;
                  if (result1.changedRows != 0) ++changes; //  // Use Promisfy Util to make an async function and run query to update all Tracks for this Album
                  //  for(let y=0;y < album.Tracks.length;++y)
                  // {
                  //      let result2 = await connection.query('UPDATE TRACK SET TITLE=?, NUMBER=?, VIDEO_URL=? WHERE ID=? AND ALBUM_ID=?', [album.Tracks[y].Title, album.Tracks[y].Number, album.Tracks[y].Video, album.Tracks[y].Id, album.Id]);
                  //      if(result2.changedRows != 0)
                  //         ++changes;
                  // }
                  // Do a callback to return the results

                  callback(changes);

                case 10:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }));

        return function (_x13, _x14) {
          return _ref7.apply(this, arguments);
        };
      }());
    }
    /**
    * CRUD method to delete an Album.
    * 
    * @param album Album ID to delete.
    * @param callback Callback function with number of rows deleted.  
    * */

  }, {
    key: "delete",
    value: function _delete(albumId, callback) {
      // Get pooled database connection and run queries   
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(err, connection) {
          var changes, result1;
          return _regenerator.default.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  // Release connection in the pool
                  connection.release(); // Throw error if an error

                  if (!err) {
                    _context8.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use Promisfy Util to make an async function and run query to delete the tracks for an Album
                  changes = 0;
                  connection.query = util.promisify(connection.query);
                  _context8.next = 7;
                  return connection.query('DELETE FROM Recipe WHERE RECIPE_ID=?', [albumId]);

                case 7:
                  result1 = _context8.sent;
                  changes = changes + result1.affectedRows; // Do a callback to return the results

                  callback(changes);

                case 10:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8);
        }));

        return function (_x15, _x16) {
          return _ref8.apply(this, arguments);
        };
      }());
    } //* **************** Private Helper Methods **************** */

    /**
     * Private helper method to initialie a Database Connection
     */

  }, {
    key: "initDbConnection",
    value: function initDbConnection() {
      return mysql.createPool({
        host: this.host,
        port: this.port,
        user: this.username,
        password: this.password,
        database: this.schema,
        connectionLimit: 10
      });
    }
  }]);
  return RecipeDAO;
}();

exports.RecipeDAO = RecipeDAO;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9SZWNpcGVEQU8udHMiXSwibmFtZXMiOlsiUmVjaXBlREFPIiwiaG9zdCIsInBvcnQiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiaW5pdERiQ29ubmVjdGlvbiIsInBvb2wiLCJjYWxsYmFjayIsInJlY2lwZXMiLCJnZXRDb25uZWN0aW9uIiwiZXJyIiwiY29ubmVjdGlvbiIsInJlbGVhc2UiLCJxdWVyeSIsInV0aWwiLCJwcm9taXNpZnkiLCJyb3dzIiwieCIsImxlbmd0aCIsInB1c2giLCJSZWNpcGUiLCJOQU1FIiwiSU5TVFJVQ1RJT05TIiwiRElGRklDVUxUWSIsIkRBVEUiLCJzZWFyY2giLCJhbGJ1bXMiLCJyZXN1bHQxIiwiUkVDSVBFX0lEIiwiYWxidW1JZCIsInRyYWNrcyIsInJlY2lwZUlkIiwiYWxidW0iLCJOYW1lIiwiSW5zdHJ1Y3Rpb25zIiwiRGlmZmljdWx0eSIsIkRhdGUiLCJhZmZlY3RlZFJvd3MiLCJpbnNlcnRJZCIsImNoYW5nZXMiLCJJZCIsImNoYW5nZWRSb3dzIiwibXlzcWwiLCJjcmVhdGVQb29sIiwidXNlciIsImRhdGFiYXNlIiwic2NoZW1hIiwiY29ubmVjdGlvbkxpbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0lBRWFBLFM7QUFTVDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVJLHFCQUFZQyxJQUFaLEVBQXlCQyxJQUF6QixFQUFzQ0MsUUFBdEMsRUFBdURDLFFBQXZELEVBQ0E7QUFBQTtBQUFBLGdEQWhCc0IsRUFnQnRCO0FBQUEsZ0RBZnNCLElBZXRCO0FBQUEsb0RBZDBCLEVBYzFCO0FBQUEsb0RBYjBCLEVBYTFCO0FBQUEsa0RBWndCLFFBWXhCO0FBQUEsZ0RBWGUsS0FBS0MsZ0JBQUwsRUFXZjtBQUNJO0FBQ0EsU0FBS0osSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtFLElBQUwsR0FBWSxLQUFLRCxnQkFBTCxFQUFaO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7OztXQUVJLHdCQUFzQkUsUUFBdEIsRUFDQTtBQUNLO0FBQ0EsVUFBSUMsT0FBZ0IsR0FBRyxFQUF2QixDQUZMLENBSUk7O0FBQ0EsV0FBS0YsSUFBTCxDQUFVRyxhQUFWO0FBQUEsMkZBQXdCLGlCQUFlQyxHQUFmLEVBQXdCQyxVQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFcEI7QUFDQUEsa0JBQUFBLFVBQVUsQ0FBQ0MsT0FBWCxHQUhvQixDQUtwQjs7QUFMb0IsdUJBTWhCRixHQU5nQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSx3QkFNTEEsR0FOSzs7QUFBQTtBQVFwQjtBQUNBQyxrQkFBQUEsVUFBVSxDQUFDRSxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUosVUFBVSxDQUFDRSxLQUExQixDQUFuQjtBQVRvQjtBQUFBLHlCQVVIRixVQUFVLENBQUNFLEtBQVgsQ0FBaUIsc0JBQWpCLENBVkc7O0FBQUE7QUFVaEJHLGtCQUFBQSxJQVZnQjs7QUFXcEIsdUJBQVFDLENBQVIsR0FBVSxDQUFWLEVBQVlBLENBQUMsR0FBR0QsSUFBSSxDQUFDRSxNQUFyQixFQUE0QixFQUFFRCxDQUE5QixFQUNBO0FBQ0k7QUFDQVQsb0JBQUFBLE9BQU8sQ0FBQ1csSUFBUixDQUFhLElBQUlDLGNBQUosQ0FBV0osSUFBSSxDQUFDQyxDQUFELENBQUosQ0FBUSxXQUFSLENBQVgsRUFBaUNELElBQUksQ0FBQ0MsQ0FBRCxDQUFKLENBQVFJLElBQXpDLEVBQStDTCxJQUFJLENBQUNDLENBQUQsQ0FBSixDQUFRSyxZQUF2RCxFQUFxRU4sSUFBSSxDQUFDQyxDQUFELENBQUosQ0FBUU0sVUFBN0UsRUFBeUZQLElBQUksQ0FBQ0MsQ0FBRCxDQUFKLENBQVFPLElBQWpHLENBQWI7QUFDSCxtQkFmbUIsQ0FpQnBCOzs7QUFDQWpCLGtCQUFBQSxRQUFRLENBQUNDLE9BQUQsQ0FBUjs7QUFsQm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBb0JIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1dBRUksMEJBQXdCaUIsTUFBeEIsRUFBdUNsQixRQUF2QyxFQUNBO0FBQ0s7QUFDQSxVQUFJbUIsTUFBZSxHQUFHLEVBQXRCLENBRkwsQ0FJSTs7QUFDQSxXQUFLcEIsSUFBTCxDQUFVRyxhQUFWO0FBQUEsNEZBQXdCLGtCQUFlQyxHQUFmLEVBQXdCQyxVQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFcEI7QUFDQUEsa0JBQUFBLFVBQVUsQ0FBQ0MsT0FBWCxHQUhvQixDQUtwQjs7QUFMb0IsdUJBTWhCRixHQU5nQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSx3QkFNTEEsR0FOSzs7QUFBQTtBQVFwQjtBQUNBQyxrQkFBQUEsVUFBVSxDQUFDRSxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUosVUFBVSxDQUFDRSxLQUExQixDQUFuQjtBQVRvQjtBQUFBLHlCQVVBRixVQUFVLENBQUNFLEtBQVgsQ0FBaUIsMkRBQWpCLEVBQThFLENBQUMsTUFBTVksTUFBTixHQUFlLEdBQWhCLENBQTlFLENBVkE7O0FBQUE7QUFVaEJFLGtCQUFBQSxPQVZnQjs7QUFXcEIsdUJBQVFWLENBQVIsR0FBVSxDQUFWLEVBQVlBLENBQUMsR0FBR1UsT0FBTyxDQUFDVCxNQUF4QixFQUErQixFQUFFRCxDQUFqQyxFQUNBO0FBQ0s7QUFDRDtBQUNBO0FBRUE7QUFDQVMsb0JBQUFBLE1BQU0sQ0FBQ1AsSUFBUCxDQUFZLElBQUlDLGNBQUosQ0FBV08sT0FBTyxDQUFDVixDQUFELENBQVAsQ0FBV1csU0FBdEIsRUFBaUNELE9BQU8sQ0FBQ1YsQ0FBRCxDQUFQLENBQVdJLElBQTVDLEVBQWtETSxPQUFPLENBQUNWLENBQUQsQ0FBUCxDQUFXSyxZQUE3RCxFQUEyRUssT0FBTyxDQUFDVixDQUFELENBQVAsQ0FBV00sVUFBdEYsRUFBa0dJLE9BQU8sQ0FBQ1YsQ0FBRCxDQUFQLENBQVdPLElBQTdHLENBQVo7QUFDSCxtQkFuQm1CLENBcUJwQjs7O0FBQ0FqQixrQkFBQUEsUUFBUSxDQUFDbUIsTUFBRCxDQUFSOztBQXRCb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF3Qkg7QUFHRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7V0FFSyxpQ0FBK0JELE1BQS9CLEVBQThDbEIsUUFBOUMsRUFDQTtBQUNLO0FBQ0EsVUFBSW1CLE1BQWUsR0FBRyxFQUF0QixDQUZMLENBSUk7O0FBQ0EsV0FBS3BCLElBQUwsQ0FBVUcsYUFBVjtBQUFBLDRGQUF3QixrQkFBZUMsR0FBZixFQUF3QkMsVUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRXBCO0FBQ0FBLGtCQUFBQSxVQUFVLENBQUNDLE9BQVgsR0FIb0IsQ0FLcEI7O0FBTG9CLHVCQU1oQkYsR0FOZ0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsd0JBTUxBLEdBTks7O0FBQUE7QUFRcEI7QUFDQUMsa0JBQUFBLFVBQVUsQ0FBQ0UsS0FBWCxHQUFtQkMsSUFBSSxDQUFDQyxTQUFMLENBQWVKLFVBQVUsQ0FBQ0UsS0FBMUIsQ0FBbkI7QUFUb0I7QUFBQSx5QkFVQUYsVUFBVSxDQUFDRSxLQUFYLENBQWlCLG1FQUFqQixFQUFzRixDQUFDLE1BQU1ZLE1BQU4sR0FBZSxHQUFoQixDQUF0RixDQVZBOztBQUFBO0FBVWhCRSxrQkFBQUEsT0FWZ0I7O0FBV3BCLHVCQUFRVixDQUFSLEdBQVUsQ0FBVixFQUFZQSxDQUFDLEdBQUdVLE9BQU8sQ0FBQ1QsTUFBeEIsRUFBK0IsRUFBRUQsQ0FBakMsRUFDQTtBQUNLO0FBQ0dZLG9CQUFBQSxPQUZSLEdBRWtCRixPQUFPLENBQUNWLENBQUQsQ0FBUCxDQUFXVyxTQUY3QjtBQUdRRSxvQkFBQUEsTUFIUixHQUcwQixFQUgxQixFQUtJOztBQUNBSixvQkFBQUEsTUFBTSxDQUFDUCxJQUFQLENBQVksSUFBSUMsY0FBSixDQUFXTyxPQUFPLENBQUNWLENBQUQsQ0FBUCxDQUFXVyxTQUF0QixFQUFpQ0QsT0FBTyxDQUFDVixDQUFELENBQVAsQ0FBV0ksSUFBNUMsRUFBa0RNLE9BQU8sQ0FBQ1YsQ0FBRCxDQUFQLENBQVdLLFlBQTdELEVBQTJFSyxPQUFPLENBQUNWLENBQUQsQ0FBUCxDQUFXTSxVQUF0RixFQUFrR0ksT0FBTyxDQUFDVixDQUFELENBQVAsQ0FBV08sSUFBN0csQ0FBWjtBQUNILG1CQW5CbUIsQ0FxQnBCOzs7QUFDQWpCLGtCQUFBQSxRQUFRLENBQUNtQixNQUFELENBQVI7O0FBdEJvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXdCSDs7O1dBRUQsZ0NBQThCRCxNQUE5QixFQUE2Q2xCLFFBQTdDLEVBQ0E7QUFDSztBQUNBLFVBQUltQixNQUFlLEdBQUcsRUFBdEIsQ0FGTCxDQUlJOztBQUNBLFdBQUtwQixJQUFMLENBQVVHLGFBQVY7QUFBQSw0RkFBd0Isa0JBQWVDLEdBQWYsRUFBd0JDLFVBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVwQjtBQUNBQSxrQkFBQUEsVUFBVSxDQUFDQyxPQUFYLEdBSG9CLENBS3BCOztBQUxvQix1QkFNaEJGLEdBTmdCO0FBQUE7QUFBQTtBQUFBOztBQUFBLHdCQU1MQSxHQU5LOztBQUFBO0FBUXBCO0FBQ0FDLGtCQUFBQSxVQUFVLENBQUNFLEtBQVgsR0FBbUJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSixVQUFVLENBQUNFLEtBQTFCLENBQW5CO0FBVG9CO0FBQUEseUJBVUFGLFVBQVUsQ0FBQ0UsS0FBWCxDQUFpQixpRUFBakIsRUFBb0YsQ0FBQyxNQUFNWSxNQUFOLEdBQWUsR0FBaEIsQ0FBcEYsQ0FWQTs7QUFBQTtBQVVoQkUsa0JBQUFBLE9BVmdCOztBQVdwQix1QkFBUVYsQ0FBUixHQUFVLENBQVYsRUFBWUEsQ0FBQyxHQUFHVSxPQUFPLENBQUNULE1BQXhCLEVBQStCLEVBQUVELENBQWpDLEVBQ0E7QUFDSztBQUNHWSxvQkFBQUEsT0FGUixHQUVrQkYsT0FBTyxDQUFDVixDQUFELENBQVAsQ0FBV1csU0FGN0I7QUFHUUUsb0JBQUFBLE1BSFIsR0FHMEIsRUFIMUIsRUFLSTs7QUFDQUosb0JBQUFBLE1BQU0sQ0FBQ1AsSUFBUCxDQUFZLElBQUlDLGNBQUosQ0FBV08sT0FBTyxDQUFDVixDQUFELENBQVAsQ0FBV1csU0FBdEIsRUFBaUNELE9BQU8sQ0FBQ1YsQ0FBRCxDQUFQLENBQVdJLElBQTVDLEVBQWtETSxPQUFPLENBQUNWLENBQUQsQ0FBUCxDQUFXSyxZQUE3RCxFQUEyRUssT0FBTyxDQUFDVixDQUFELENBQVAsQ0FBV00sVUFBdEYsRUFBa0dJLE9BQU8sQ0FBQ1YsQ0FBRCxDQUFQLENBQVdPLElBQTdHLENBQVo7QUFDSCxtQkFuQm1CLENBcUJwQjs7O0FBQ0FqQixrQkFBQUEsUUFBUSxDQUFDbUIsTUFBRCxDQUFSOztBQXRCb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF3Qkg7QUFFRjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7V0FFSSxzQkFBb0JLLFFBQXBCLEVBQXFDeEIsUUFBckMsRUFDQTtBQUNJO0FBQ0EsV0FBS0QsSUFBTCxDQUFVRyxhQUFWO0FBQUEsNEZBQXdCLGtCQUFlQyxHQUFmLEVBQXdCQyxVQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFcEI7QUFDQUEsa0JBQUFBLFVBQVUsQ0FBQ0MsT0FBWCxHQUhvQixDQUtwQjs7QUFMb0IsdUJBTWhCRixHQU5nQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSx3QkFNTEEsR0FOSzs7QUFBQTtBQVFwQjtBQUNBQyxrQkFBQUEsVUFBVSxDQUFDRSxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUosVUFBVSxDQUFDRSxLQUExQixDQUFuQjtBQVRvQjtBQUFBLHlCQVVBRixVQUFVLENBQUNFLEtBQVgsQ0FBaUIsd0NBQWpCLEVBQTJELENBQUNrQixRQUFELENBQTNELENBVkE7O0FBQUE7QUFVaEJKLGtCQUFBQSxPQVZnQjtBQVdwQixzQkFBR0EsT0FBTyxDQUFDVCxNQUFSLElBQWtCLENBQXJCLEVBQ0lYLFFBQVEsQ0FBQyxJQUFELENBQVIsQ0FaZ0IsQ0FjcEI7O0FBQ0l5QixrQkFBQUEsS0FmZ0IsR0FlUixJQUFJWixjQUFKLENBQVdPLE9BQU8sQ0FBQ0ksUUFBRCxDQUFQLENBQWtCSCxTQUE3QixFQUF3Q0QsT0FBTyxDQUFDSSxRQUFELENBQVAsQ0FBa0JWLElBQTFELEVBQWdFTSxPQUFPLENBQUNJLFFBQUQsQ0FBUCxDQUFrQlQsWUFBbEYsRUFBZ0dLLE9BQU8sQ0FBQ0ksUUFBRCxDQUFQLENBQWtCUixVQUFsSCxFQUE4SEksT0FBTyxDQUFDSSxRQUFELENBQVAsQ0FBa0JQLElBQWhKLENBZlEsRUFpQnBCOztBQUNBakIsa0JBQUFBLFFBQVEsQ0FBQ3lCLEtBQUQsQ0FBUjs7QUFsQm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBb0JIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1dBRUksZ0JBQWNBLEtBQWQsRUFBNEJ6QixRQUE1QixFQUNBO0FBQ0k7QUFDQSxXQUFLRCxJQUFMLENBQVVHLGFBQVY7QUFBQSw0RkFBd0Isa0JBQWVDLEdBQWYsRUFBd0JDLFVBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVwQjtBQUNBQSxrQkFBQUEsVUFBVSxDQUFDQyxPQUFYLEdBSG9CLENBS3BCOztBQUxvQix1QkFNaEJGLEdBTmdCO0FBQUE7QUFBQTtBQUFBOztBQUFBLHdCQU1MQSxHQU5LOztBQUFBO0FBUXBCO0FBQ0FDLGtCQUFBQSxVQUFVLENBQUNFLEtBQVgsR0FBbUJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSixVQUFVLENBQUNFLEtBQTFCLENBQW5CO0FBVG9CO0FBQUEseUJBVUFGLFVBQVUsQ0FBQ0UsS0FBWCxDQUFpQiwyRUFBakIsRUFBOEYsQ0FBQ21CLEtBQUssQ0FBQ0MsSUFBUCxFQUFhRCxLQUFLLENBQUNFLFlBQW5CLEVBQWlDRixLQUFLLENBQUNHLFVBQXZDLEVBQW1ESCxLQUFLLENBQUNJLElBQXpELENBQTlGLENBVkE7O0FBQUE7QUFVaEJULGtCQUFBQSxPQVZnQjtBQVdwQixzQkFBR0EsT0FBTyxDQUFDVSxZQUFSLElBQXdCLENBQTNCLEVBQ0c5QixRQUFRLENBQUMsQ0FBQyxDQUFGLENBQVIsQ0FaaUIsQ0FjcEI7O0FBQ0lzQixrQkFBQUEsT0FmZ0IsR0FlTkYsT0FBTyxDQUFDVyxRQWZGLEVBZ0JwQjtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBL0Isa0JBQUFBLFFBQVEsQ0FBQ3NCLE9BQUQsQ0FBUjs7QUF0Qm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQXhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBd0JIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1dBRUksZ0JBQWNHLEtBQWQsRUFBNEJ6QixRQUE1QixFQUNBO0FBQ0s7QUFDQSxXQUFLRCxJQUFMLENBQVVHLGFBQVY7QUFBQSw0RkFBd0Isa0JBQWVDLEdBQWYsRUFBd0JDLFVBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVwQjtBQUNBQSxrQkFBQUEsVUFBVSxDQUFDQyxPQUFYLEdBSG9CLENBS3BCOztBQUxvQix1QkFNakJGLEdBTmlCO0FBQUE7QUFBQTtBQUFBOztBQUFBLHdCQU1OQSxHQU5NOztBQUFBO0FBUXBCO0FBQ0k2QixrQkFBQUEsT0FUZ0IsR0FTTixDQVRNO0FBVXBCNUIsa0JBQUFBLFVBQVUsQ0FBQ0UsS0FBWCxHQUFtQkMsSUFBSSxDQUFDQyxTQUFMLENBQWVKLFVBQVUsQ0FBQ0UsS0FBMUIsQ0FBbkI7QUFWb0I7QUFBQSx5QkFXREYsVUFBVSxDQUFDRSxLQUFYLENBQWlCLGtGQUFqQixFQUFxRyxDQUFDbUIsS0FBSyxDQUFDQyxJQUFQLEVBQWFELEtBQUssQ0FBQ0UsWUFBbkIsRUFBaUNGLEtBQUssQ0FBQ0csVUFBdkMsRUFBbURILEtBQUssQ0FBQ0ksSUFBekQsRUFBK0RKLEtBQUssQ0FBQ1EsRUFBckUsQ0FBckcsQ0FYQzs7QUFBQTtBQVdqQmIsa0JBQUFBLE9BWGlCO0FBWXJCLHNCQUFHQSxPQUFPLENBQUNjLFdBQVIsSUFBdUIsQ0FBMUIsRUFDSSxFQUFFRixPQUFGLENBYmlCLENBZXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0FoQyxrQkFBQUEsUUFBUSxDQUFDZ0MsT0FBRCxDQUFSOztBQXhCcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUEwQkg7QUFFRDtBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7V0FFSSxpQkFBY1YsT0FBZCxFQUE4QnRCLFFBQTlCLEVBQ0E7QUFDSTtBQUNBLFdBQUtELElBQUwsQ0FBVUcsYUFBVjtBQUFBLDRGQUF3QixrQkFBZUMsR0FBZixFQUF3QkMsVUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRXBCO0FBQ0FBLGtCQUFBQSxVQUFVLENBQUNDLE9BQVgsR0FIb0IsQ0FLcEI7O0FBTG9CLHVCQU1qQkYsR0FOaUI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsd0JBTU5BLEdBTk07O0FBQUE7QUFRcEI7QUFDSTZCLGtCQUFBQSxPQVRnQixHQVNOLENBVE07QUFVcEI1QixrQkFBQUEsVUFBVSxDQUFDRSxLQUFYLEdBQW1CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUosVUFBVSxDQUFDRSxLQUExQixDQUFuQjtBQVZvQjtBQUFBLHlCQVdBRixVQUFVLENBQUNFLEtBQVgsQ0FBaUIsc0NBQWpCLEVBQXlELENBQUNnQixPQUFELENBQXpELENBWEE7O0FBQUE7QUFXaEJGLGtCQUFBQSxPQVhnQjtBQVlwQlksa0JBQUFBLE9BQU8sR0FBR0EsT0FBTyxHQUFHWixPQUFPLENBQUNVLFlBQTVCLENBWm9CLENBY3BCOztBQUNBOUIsa0JBQUFBLFFBQVEsQ0FBQ2dDLE9BQUQsQ0FBUjs7QUFmb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBeEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQkgsSyxDQUVEOztBQUVBO0FBQ0o7QUFDQTs7OztXQUVJLDRCQUNBO0FBQ0ksYUFBT0csS0FBSyxDQUFDQyxVQUFOLENBQWlCO0FBQUMxQyxRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBWjtBQUFrQkMsUUFBQUEsSUFBSSxFQUFFLEtBQUtBLElBQTdCO0FBQW1DMEMsUUFBQUEsSUFBSSxFQUFFLEtBQUt6QyxRQUE5QztBQUF3REMsUUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBQXZFO0FBQWlGeUMsUUFBQUEsUUFBUSxFQUFFLEtBQUtDLE1BQWhHO0FBQXdHQyxRQUFBQSxlQUFlLEVBQUU7QUFBekgsT0FBakIsQ0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjaXBlIH0gZnJvbSBcIi4uL21vZGVscy9SZWNpcGVcIjtcbmltcG9ydCAqIGFzIG15c3FsIGZyb20gXCJteXNxbFwiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xuXG5leHBvcnQgY2xhc3MgUmVjaXBlREFPXG57XG4gICAgcHJpdmF0ZSBob3N0OnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBwb3J0Om51bWJlciA9IDMzMDY7XG4gICAgcHJpdmF0ZSB1c2VybmFtZTpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgcGFzc3dvcmQ6c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHNjaGVtYTpzdHJpbmcgPSBcImNzdDM5MVwiO1xuICAgIHByaXZhdGUgcG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xuICAgIFxuICAgIC8qKlxuICAgICAqIE5vbi1kZWZhdWx0IGNvbnN0cnVjdG9yLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBob3N0IERhdGFiYXNlIEhvc3RuYW1lXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIERhdGFiYXNlIFVzZXJuYW1lXG4gICAgICogQHBhcmFtIHBhc3N3b3JkIERhdGFiYXNlIFBhc3N3b3JkXG4gICAgICovXG4gICAgXG4gICAgY29uc3RydWN0b3IoaG9zdDpzdHJpbmcsIHBvcnQ6bnVtYmVyLCB1c2VybmFtZTpzdHJpbmcsIHBhc3N3b3JkOnN0cmluZylcbiAgICB7XG4gICAgICAgIC8vIFNldCBhbGwgY2xhc3MgcHJvcGVydGllc1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgICAgICB0aGlzLnBvcnQgPSBwb3J0O1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICAgICAgdGhpcy5wb29sID0gdGhpcy5pbml0RGJDb25uZWN0aW9uKCk7XG4gICAgfSAgICBcblxuICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHJldHVybiBhbGwgUmVjaXBlcy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBcnJheSBvZiB0eXBlIEFsYnVtLlxuICAgICAqL1xuICAgIFxuICAgIHB1YmxpYyBmaW5kQWxsUmVjaXBlcyhjYWxsYmFjazogYW55KVxuICAgIHtcbiAgICAgICAgIC8vIExpc3Qgb2YgQWxidW1zIHRvIHJldHVyblxuICAgICAgICAgbGV0IHJlY2lwZXM6UmVjaXBlW10gPSBbXTtcblxuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBBbGJ1bXNcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByb3dzID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSBSZWNpcGUnKTtcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByb3dzLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIEFsYnVtIGFuZCBpdHMgVHJhY2tzIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgcmVjaXBlcy5wdXNoKG5ldyBSZWNpcGUocm93c1t4XVsnUkVDSVBFX0lEJ10sIHJvd3NbeF0uTkFNRSwgcm93c1t4XS5JTlNUUlVDVElPTlMsIHJvd3NbeF0uRElGRklDVUxUWSwgcm93c1t4XS5EQVRFKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhyZWNpcGVzKTtcbiAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHNlYXJjaGVzIGZvciBhbGwgQWxidW1zIGJ5IGEgd2lsZGFyZCBzZWFyY2ggaW4gQXJ0aXN0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBzZWFyY2ggd2lsZGNhcmQgQXJ0aXN0IHRvIHNlYXJjaCBBbGJ1bXMgZm9yLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIGFuIEFycmF5IG9mIHR5cGUgQWxidW0uXG4gICAgICovXG4gICAgXG4gICAgcHVibGljIGZpbmRSZWNpcGVCeU5hbWUoc2VhcmNoOnN0cmluZywgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgICAvLyBMaXN0IG9mIEFsYnVtcyB0byByZXR1cm5cbiAgICAgICAgIGxldCBhbGJ1bXM6UmVjaXBlW10gPSBbXTtcblxuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBBbGJ1bXMgZm9yIHNlYXJjaCBwYXJ0aWFsIEFydGlzdFxuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBSZWNpcGUgV0hFUkUgTkFNRSBMSUtFID8gT1JERVIgQlkgUkVDSVBFX0lEXCIsIFsnJScgKyBzZWFyY2ggKyAnJSddKTtcbiAgICAgICAgICAgIGZvcihsZXQgeD0wO3ggPCByZXN1bHQxLmxlbmd0aDsrK3gpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFRyYWNrcyBmb3IgdGhpcyBBbGJ1bVxuICAgICAgICAgICAgICAgIC8vIGxldCBhbGJ1bUlkID0gcmVzdWx0MVt4XS5SRUNJUEVfSUQ7XG4gICAgICAgICAgICAgICAgLy8gbGV0IHRyYWNrczpSZWNpcGVbXSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIEFsYnVtIGFuZCBpdHMgVHJhY2tzIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgYWxidW1zLnB1c2gobmV3IFJlY2lwZShyZXN1bHQxW3hdLlJFQ0lQRV9JRCwgcmVzdWx0MVt4XS5OQU1FLCByZXN1bHQxW3hdLklOU1RSVUNUSU9OUywgcmVzdWx0MVt4XS5ESUZGSUNVTFRZLCByZXN1bHQxW3hdLkRBVEUpKTsgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhhbGJ1bXMpO1xuICAgICAgICAgfSk7XG4gICAgfSAgICAgICAgICAgIFxuXG5cbiAgICAvKipcbiAgICAgKiBDUlVEIG1ldGhvZCB0byBzZWFyY2hlcyBmb3IgYWxsIEFsYnVtcyBieSBhIHdpbGRhcmQgc2VhcmNoIGluIEFydGlzdC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc2VhcmNoIHdpbGRjYXJkIEFydGlzdCB0byBzZWFyY2ggQWxidW1zIGZvci5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBcnJheSBvZiB0eXBlIEFsYnVtLlxuICAgICAqL1xuICAgIFxuICAgICBwdWJsaWMgZmluZFJlY2lwZUJ5SW5zdHJ1Y3Rpb24oc2VhcmNoOnN0cmluZywgY2FsbGJhY2s6IGFueSlcbiAgICAge1xuICAgICAgICAgIC8vIExpc3Qgb2YgQWxidW1zIHRvIHJldHVyblxuICAgICAgICAgIGxldCBhbGJ1bXM6UmVjaXBlW10gPSBbXTtcbiBcbiAgICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICAge1xuICAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuIFxuICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuIFxuICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIEFsYnVtcyBmb3Igc2VhcmNoIHBhcnRpYWwgQXJ0aXN0XG4gICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gUmVjaXBlIFdIRVJFIElOU1RSVUNUSU9OUyBMSUtFID8gT1JERVIgQlkgUkVDSVBFX0lEXCIsIFsnJScgKyBzZWFyY2ggKyAnJSddKTtcbiAgICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFRyYWNrcyBmb3IgdGhpcyBBbGJ1bVxuICAgICAgICAgICAgICAgICBsZXQgYWxidW1JZCA9IHJlc3VsdDFbeF0uUkVDSVBFX0lEO1xuICAgICAgICAgICAgICAgICBsZXQgdHJhY2tzOlJlY2lwZVtdID0gW107XG4gXG4gICAgICAgICAgICAgICAgIC8vIEFkZCBBbGJ1bSBhbmQgaXRzIFRyYWNrcyB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgICBhbGJ1bXMucHVzaChuZXcgUmVjaXBlKHJlc3VsdDFbeF0uUkVDSVBFX0lELCByZXN1bHQxW3hdLk5BTUUsIHJlc3VsdDFbeF0uSU5TVFJVQ1RJT05TLCByZXN1bHQxW3hdLkRJRkZJQ1VMVFksIHJlc3VsdDFbeF0uREFURSkpOyBcbiAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgICBjYWxsYmFjayhhbGJ1bXMpO1xuICAgICAgICAgIH0pO1xuICAgICB9ICBcblxuICAgICBwdWJsaWMgZmluZFJlY2lwZUJ5RGlmZmljdWx0eShzZWFyY2g6c3RyaW5nLCBjYWxsYmFjazogYW55KVxuICAgICB7XG4gICAgICAgICAgLy8gTGlzdCBvZiBBbGJ1bXMgdG8gcmV0dXJuXG4gICAgICAgICAgbGV0IGFsYnVtczpSZWNpcGVbXSA9IFtdO1xuIFxuICAgICAgICAgLy8gR2V0IHBvb2xlZCBkYXRhYmFzZSBjb25uZWN0aW9uIGFuZCBydW4gcXVlcmllcyAgIFxuICAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgICB7XG4gICAgICAgICAgICAgLy8gUmVsZWFzZSBjb25uZWN0aW9uIGluIHRoZSBwb29sXG4gICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG4gXG4gICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaWYgYW4gZXJyb3JcbiAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gXG4gICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgQWxidW1zIGZvciBzZWFyY2ggcGFydGlhbCBBcnRpc3RcbiAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBSZWNpcGUgV0hFUkUgRElGRklDVUxUWSBMSUtFID8gT1JERVIgQlkgUkVDSVBFX0lEXCIsIFsnJScgKyBzZWFyY2ggKyAnJSddKTtcbiAgICAgICAgICAgICBmb3IobGV0IHg9MDt4IDwgcmVzdWx0MS5sZW5ndGg7Kyt4KVxuICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIFRyYWNrcyBmb3IgdGhpcyBBbGJ1bVxuICAgICAgICAgICAgICAgICBsZXQgYWxidW1JZCA9IHJlc3VsdDFbeF0uUkVDSVBFX0lEO1xuICAgICAgICAgICAgICAgICBsZXQgdHJhY2tzOlJlY2lwZVtdID0gW107XG4gXG4gICAgICAgICAgICAgICAgIC8vIEFkZCBBbGJ1bSBhbmQgaXRzIFRyYWNrcyB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgICBhbGJ1bXMucHVzaChuZXcgUmVjaXBlKHJlc3VsdDFbeF0uUkVDSVBFX0lELCByZXN1bHQxW3hdLk5BTUUsIHJlc3VsdDFbeF0uSU5TVFJVQ1RJT05TLCByZXN1bHQxW3hdLkRJRkZJQ1VMVFksIHJlc3VsdDFbeF0uREFURSkpOyBcbiAgICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgICBjYWxsYmFjayhhbGJ1bXMpO1xuICAgICAgICAgIH0pO1xuICAgICB9IFxuICAgIFxuICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHJldHVybiBhbiBBbGJ1bS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gYWxidW1JZCBBbGJ1bSBJRCB0byByZXRyaWV2ZSBBbGJ1bSBmb3IuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gQXJyYXkgb2YgdHlwZSBBbGJ1bS5cbiAgICAgKi9cbiAgICBcbiAgICBwdWJsaWMgZmluZFJlY2lwZUlkKHJlY2lwZUlkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIEFsYnVtcyBmb3Igc3BlY2lmaWMgQXJ0aXN0XG4gICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gUmVjaXBlIFdIRVJFIFJFQ0lQRV9JRD0/JywgW3JlY2lwZUlkXSk7XG4gICAgICAgICAgICBpZihyZXN1bHQxLmxlbmd0aCAhPSAxKVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYW4gQWxidW0gYW5kIGl0cyBUcmFja3MgZm9yIHJldHVyblxuICAgICAgICAgICAgbGV0IGFsYnVtID0gbmV3IFJlY2lwZShyZXN1bHQxW3JlY2lwZUlkXS5SRUNJUEVfSUQsIHJlc3VsdDFbcmVjaXBlSWRdLk5BTUUsIHJlc3VsdDFbcmVjaXBlSWRdLklOU1RSVUNUSU9OUywgcmVzdWx0MVtyZWNpcGVJZF0uRElGRklDVUxUWSwgcmVzdWx0MVtyZWNpcGVJZF0uREFURSk7IFxuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soYWxidW0pO1xuICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gY3JlYXRlIGFuIEFsYnVtLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBhbGJ1bSBBbGJ1bSB0byBpbnNlcnQuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggLTEgaWYgYW4gZXJyb3IgZWxzZSBBbGJ1bSBJRCBjcmVhdGVkLiAgXG4gICAgICovXG4gICAgXG4gICAgcHVibGljIGNyZWF0ZShhbGJ1bTpSZWNpcGUsIGNhbGxiYWNrOiBhbnkpXG4gICAge1xuICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uKGVycjphbnksIGNvbm5lY3Rpb246YW55KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xuXG4gICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBpbnNlcnQgQWxidW1cbiAgICAgICAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQxID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnSU5TRVJUIElOVE8gUmVjaXBlIChOQU1FLCBJTlNUUlVDVElPTlMsIERJRkZJQ1VMVFksIERBVEUpIFZBTFVFUyg/LD8sPyw/KScsIFthbGJ1bS5OYW1lLCBhbGJ1bS5JbnN0cnVjdGlvbnMsIGFsYnVtLkRpZmZpY3VsdHksIGFsYnVtLkRhdGVdKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuYWZmZWN0ZWRSb3dzICE9IDEpXG4gICAgICAgICAgICAgICBjYWxsYmFjaygtMSk7XG5cbiAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBpbnNlcnQgYWxsIFRyYWNrcyBmb3IgdGhpcyBBbGJ1bVxuICAgICAgICAgICAgbGV0IGFsYnVtSWQgPSByZXN1bHQxLmluc2VydElkO1xuICAgICAgICAgICAgLy8gZm9yKGxldCB5PTA7eSA8IGFsYnVtLlRyYWNrcy5sZW5ndGg7Kyt5KVxuICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgLy8gICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnSU5TRVJUIElOVE8gVFJBQ0sgKEFMQlVNX0lELCBUSVRMRSwgTlVNQkVSLCBWSURFT19VUkwpIFZBTFVFUyg/LD8sPyw/KScsIFthbGJ1bUlkLCBhbGJ1bS5UcmFja3NbeV0uVGl0bGUsIGFsYnVtLlRyYWNrc1t5XS5OdW1iZXIsIGFsYnVtLlRyYWNrc1t5XS5WaWRlb10pO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAvLyBEbyBhIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgcmVzdWx0c1xuICAgICAgICAgICAgY2FsbGJhY2soYWxidW1JZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENSVUQgbWV0aG9kIHRvIHVwZGF0ZSBhbiBBbGJ1bS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gYWxidW0gQWxidW0gdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbiB3aXRoIG51bWJlciBvZiByb3dzIHVwZGF0ZWQuICBcbiAgICAgKi9cbiAgICBcbiAgICBwdWJsaWMgdXBkYXRlKGFsYnVtOlJlY2lwZSwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgICAvLyBHZXQgcG9vbGVkIGRhdGFiYXNlIGNvbm5lY3Rpb24gYW5kIHJ1biBxdWVyaWVzICAgXG4gICAgICAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbihlcnI6YW55LCBjb25uZWN0aW9uOmFueSlcbiAgICAgICAgIHtcbiAgICAgICAgICAgICAvLyBSZWxlYXNlIGNvbm5lY3Rpb24gaW4gdGhlIHBvb2xcbiAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcbiBcbiAgICAgICAgICAgICAvLyBUaHJvdyBlcnJvciBpZiBhbiBlcnJvclxuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuIFxuICAgICAgICAgICAgIC8vIFVzZSBQcm9taXNmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHVwZGF0ZSBBbGJ1bVxuICAgICAgICAgICAgIGxldCBjaGFuZ2VzID0gMDtcbiAgICAgICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoJ1VQREFURSBSZWNpcGUgU0VUIE5hbWU9PywgSU5TVFJVQ1RJT05TPT8sIERJRkZJQ1VMVFk9PywgREFURT0/IFdIRVJFIFJFQ0lQRV9JRD0/JywgW2FsYnVtLk5hbWUsIGFsYnVtLkluc3RydWN0aW9ucywgYWxidW0uRGlmZmljdWx0eSwgYWxidW0uRGF0ZSwgYWxidW0uSWRdKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdDEuY2hhbmdlZFJvd3MgIT0gMClcbiAgICAgICAgICAgICAgICArK2NoYW5nZXM7XG5cbiAgICAgICAgICAgIC8vICAvLyBVc2UgUHJvbWlzZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gdXBkYXRlIGFsbCBUcmFja3MgZm9yIHRoaXMgQWxidW1cbiAgICAgICAgICAgIC8vICBmb3IobGV0IHk9MDt5IDwgYWxidW0uVHJhY2tzLmxlbmd0aDsrK3kpXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAvLyAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeSgnVVBEQVRFIFRSQUNLIFNFVCBUSVRMRT0/LCBOVU1CRVI9PywgVklERU9fVVJMPT8gV0hFUkUgSUQ9PyBBTkQgQUxCVU1fSUQ9PycsIFthbGJ1bS5UcmFja3NbeV0uVGl0bGUsIGFsYnVtLlRyYWNrc1t5XS5OdW1iZXIsIGFsYnVtLlRyYWNrc1t5XS5WaWRlbywgYWxidW0uVHJhY2tzW3ldLklkLCBhbGJ1bS5JZF0pO1xuICAgICAgICAgICAgLy8gICAgICBpZihyZXN1bHQyLmNoYW5nZWRSb3dzICE9IDApXG4gICAgICAgICAgICAvLyAgICAgICAgICsrY2hhbmdlcztcbiAgICAgICAgICAgIC8vIH1cbiBcbiAgICAgICAgICAgIC8vIERvIGEgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2VzKTtcbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgLyoqXG4gICAgICogQ1JVRCBtZXRob2QgdG8gZGVsZXRlIGFuIEFsYnVtLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBhbGJ1bSBBbGJ1bSBJRCB0byBkZWxldGUuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uIHdpdGggbnVtYmVyIG9mIHJvd3MgZGVsZXRlZC4gIFxuICAgICAqICovXG4gICAgXG4gICAgcHVibGljIGRlbGV0ZShhbGJ1bUlkOm51bWJlciwgY2FsbGJhY2s6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIEdldCBwb29sZWQgZGF0YWJhc2UgY29ubmVjdGlvbiBhbmQgcnVuIHF1ZXJpZXMgICBcbiAgICAgICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24oZXJyOmFueSwgY29ubmVjdGlvbjphbnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJlbGVhc2UgY29ubmVjdGlvbiBpbiB0aGUgcG9vbFxuICAgICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGlmIGFuIGVycm9yXG4gICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgLy8gVXNlIFByb21pc2Z5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGRlbGV0ZSB0aGUgdHJhY2tzIGZvciBhbiBBbGJ1bVxuICAgICAgICAgICAgbGV0IGNoYW5nZXMgPSAwO1xuICAgICAgICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KCdERUxFVEUgRlJPTSBSZWNpcGUgV0hFUkUgUkVDSVBFX0lEPT8nLCBbYWxidW1JZF0pO1xuICAgICAgICAgICAgY2hhbmdlcyA9IGNoYW5nZXMgKyByZXN1bHQxLmFmZmVjdGVkUm93cztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRG8gYSBjYWxsYmFjayB0byByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAgICAgICAgIGNhbGxiYWNrKGNoYW5nZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyogKioqKioqKioqKioqKioqKiBQcml2YXRlIEhlbHBlciBNZXRob2RzICoqKioqKioqKioqKioqKiogKi9cblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgaGVscGVyIG1ldGhvZCB0byBpbml0aWFsaWUgYSBEYXRhYmFzZSBDb25uZWN0aW9uXG4gICAgICovXG4gICAgXG4gICAgcHJpdmF0ZSBpbml0RGJDb25uZWN0aW9uKCk6YW55XG4gICAge1xuICAgICAgICByZXR1cm4gbXlzcWwuY3JlYXRlUG9vbCh7aG9zdDogdGhpcy5ob3N0LCBwb3J0OiB0aGlzLnBvcnQsIHVzZXI6IHRoaXMudXNlcm5hbWUsIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLCBkYXRhYmFzZTogdGhpcy5zY2hlbWEsIGNvbm5lY3Rpb25MaW1pdDogMTB9KTtcbiAgICB9XG4gICAgXG59XG4iXX0=