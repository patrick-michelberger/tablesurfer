'use strict';

let _ = require('lodash');
let User = require('../server/api/user/user.model');
let Table = require('../server/api/table/table.model');

// users has to be longer than 4
// User[] -> {host: user, guest: User[], rest: User[] }
function findGroup(users) {
  // find a host by taking the one that was guest the most often.
  let found = findHost(users);
  const host = found.host;
  users = found.rest;
  
  // find matching guest
  found = findGuest(users, oppositeGender(host));
  if(!found) found = findGuest(users);
  const guest1 = found.guest;
  users = found.rest;
  
  // find matching pair
  found = findGuest(users);
  const guest2 = found.guest;
  users = found.rest;
  
  found = findGuest(users, oppositeGender(guest2));
  if(!found) found = findGuest(users);
  const guest3 = found.guest;
  users = found.rest;
  
  return {
    host: host,
    guests: [guest1, guest2, guest3],
    rest: users
  }
};

function oppositeGender(user) {
  if(user.gender === 'female') {
    return 'male'
  } else {
    return 'female';
  }
};

function findHost(users) {
  var hosts = _.sortyBy(users, 'wasGuestXTimes');
  
  return {
    host: _.head(hosts),
    rest: _.tail(hosts)
  };
};

function findGuest(users, gender) {
  // if we have a gender
  var filtered = gender? _.filter(users, user => user.gender == gender) : users;
  if(filtered.length == 0) return null;
  
  // prefer users that have not been guests in a while
  var guests = _.reverse(_.sortyBy(filtered, 'wasGuestXTimes'));
  return {
    guest: _.head(guests),
    rest: _.tail(guests)
  };
};

function createTable(users) {
  // find a group and create a table
  let found = findGroup(users);
  
  let rest = found.rest;
  let table = new Table();
  table.day = day;
  table.host = found.host._id;
  table.guests = _.map(found.guests, guest => guest._id);
  // TODO: set example date
  
  return {
    table: table,
    rest: rest,
  };
};

function createTables(users) {
  let created = createTable(users);
  let table = created.table;
  let rest = created.rest;
  
  table.save((err) => {
    if(err) {
      console.log('Matching users error', err);
      return;
    }
    console.log('Succesfully created table', table._id, 'for', day, 'in', city);
    
    // TODO: notify users
    if(rest.length < 4) {
      console.log('We are done');
      console.log('Over:', rest);
      return;
    }

    // call createTables recursively
    createTables(rest);
  });
};

function findUsers(callback) {
  User.find({}, (err, users) => {
    if(err) {
      callback(err);
      return;
    }
    
    Table.find({}, (err, tables) => {
      if(err) {
        callback(err);
        return;
      }
      
      // filter users whose tables are in the past
      // 1. get tables of user
      // 2. are all tables in the past?
      let filtered = _.filter(users, user => {
        let uid = user._id;
        let userTables = _.filter(tables, table =>
          table.host == uid || _.includes(table.guests, uid)
        );
        
        // TODO: use a week old instead of this
        return _.every(userTables, table => table.time < now);
      });
      
      callback(null, filtered);
    });    
  });
};

function main() {
  // find users that need a table
  // TODO: mark users/only find users, that have no table
  
  let users = []
  
  if(users.length === 0) {
    console.log('No users found.');
    return;
  }
  
  console.log('Found', users.length, 'users without table.');
  
  // pick a city
  let cities = _.map(users, user => user.city);
  let city = _.sample(cities);
  
  // pick a day
  const days = _.flatten(_.map(users, user => user.weekdays));
  let day = _.sample(days);
  
  // filter users by city and day
  let filtered = _.filter(user =>
    _.includes(user.weekdays, day) && user.city == city);
  if(filtered.length < 4) {
    console.log('Not enough users for', day, 'in', city);
    return;
  }
  
  createTables(users);
};

main();
