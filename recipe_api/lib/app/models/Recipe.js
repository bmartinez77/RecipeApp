"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Recipe = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Recipe = /*#__PURE__*/function () {
  function Recipe(id, name, instructions, difficulty, dateTime) {
    (0, _classCallCheck2.default)(this, Recipe);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "name", "");
    (0, _defineProperty2.default)(this, "instructions", "");
    (0, _defineProperty2.default)(this, "difficulty", 0);
    (0, _defineProperty2.default)(this, "date", "");
    this.id = id;
    this.name = name;
    this.instructions = instructions;
    this.difficulty = difficulty;
    this.date = dateTime;
  }

  (0, _createClass2.default)(Recipe, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
    }
  }, {
    key: "Name",
    get: function get() {
      return this.name;
    },
    set: function set(name) {
      this.name = name;
    }
  }, {
    key: "Instructions",
    get: function get() {
      return this.instructions;
    },
    set: function set(instructions) {
      this.instructions = instructions;
    }
  }, {
    key: "Difficulty",
    get: function get() {
      return this.difficulty;
    },
    set: function set(difficulty) {
      this.difficulty = difficulty;
    }
  }, {
    key: "Date",
    get: function get() {
      return this.date;
    },
    set: function set(date) {
      this.Date = date;
    }
  }]);
  return Recipe;
}();

exports.Recipe = Recipe;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvUmVjaXBlLnRzIl0sIm5hbWVzIjpbIlJlY2lwZSIsImlkIiwibmFtZSIsImluc3RydWN0aW9ucyIsImRpZmZpY3VsdHkiLCJkYXRlVGltZSIsImRhdGUiLCJEYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFBYUEsTTtBQVFULGtCQUFZQyxFQUFaLEVBQXVCQyxJQUF2QixFQUFvQ0MsWUFBcEMsRUFBeURDLFVBQXpELEVBQTRFQyxRQUE1RSxFQUNBO0FBQUE7QUFBQSw4Q0FQcUIsQ0FBQyxDQU90QjtBQUFBLGdEQU51QixFQU12QjtBQUFBLHdEQUwrQixFQUsvQjtBQUFBLHNEQUo2QixDQUk3QjtBQUFBLGdEQUh1QixFQUd2QjtBQUNJLFNBQUtKLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLRSxJQUFMLEdBQVlELFFBQVo7QUFDSDs7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtKLEVBQVo7QUFDSCxLO1NBQ0QsYUFBT0EsRUFBUCxFQUNBO0FBQ0ksV0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLElBQVo7QUFDSCxLO1NBQ0QsYUFBU0EsSUFBVCxFQUNBO0FBQ0ksV0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtDLFlBQVo7QUFDSCxLO1NBQ0QsYUFBaUJBLFlBQWpCLEVBQ0E7QUFDSSxXQUFLQSxZQUFMLEdBQW9CQSxZQUFwQjtBQUNIOzs7U0FFRCxlQUNBO0FBQ0ksYUFBTyxLQUFLQyxVQUFaO0FBQ0gsSztTQUNELGFBQWVBLFVBQWYsRUFDQTtBQUNJLFdBQUtBLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0g7OztTQUVELGVBQ0E7QUFDSSxhQUFPLEtBQUtFLElBQVo7QUFDSCxLO1NBRUQsYUFBZ0JBLElBQWhCLEVBQ0E7QUFDSSxXQUFLQyxJQUFMLEdBQVlELElBQVo7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBSZWNpcGVcbntcbiAgICBwcml2YXRlIGlkOiBudW1iZXIgPSAtMTtcbiAgICBwcml2YXRlIG5hbWU6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBpbnN0cnVjdGlvbnM6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBkaWZmaWN1bHR5OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgZGF0ZTogc3RyaW5nID0gXCJcIjtcbiBcbiAgICBjb25zdHJ1Y3RvcihpZDpudW1iZXIsIG5hbWU6c3RyaW5nLCBpbnN0cnVjdGlvbnM6c3RyaW5nLCBkaWZmaWN1bHR5Om51bWJlciwgZGF0ZVRpbWU6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9uc1xuICAgICAgICB0aGlzLmRpZmZpY3VsdHkgPSBkaWZmaWN1bHR5XG4gICAgICAgIHRoaXMuZGF0ZSA9IGRhdGVUaW1lXG4gICAgfVxuXG4gICAgZ2V0IElkKCk6bnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5pZDtcbiAgICB9XG4gICAgc2V0IElkKGlkOm51bWJlcilcbiAgICB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICB9XG5cbiAgICBnZXQgTmFtZSgpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG4gICAgc2V0IE5hbWUobmFtZTpzdHJpbmcpXG4gICAge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIGdldCBJbnN0cnVjdGlvbnMoKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RydWN0aW9ucztcbiAgICB9XG4gICAgc2V0IEluc3RydWN0aW9ucyhpbnN0cnVjdGlvbnM6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBpbnN0cnVjdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IERpZmZpY3VsdHkoKTpudW1iZXJcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpZmZpY3VsdHk7XG4gICAgfVxuICAgIHNldCBEaWZmaWN1bHR5KGRpZmZpY3VsdHk6bnVtYmVyKVxuICAgIHtcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gZGlmZmljdWx0eTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IERhdGUoKTogc3RyaW5nIFxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IERhdGUoZGF0ZTogc3RyaW5nKSBcbiAgICB7XG4gICAgICAgIHRoaXMuRGF0ZSA9IGRhdGU7XG4gICAgfVxufSJdfQ==