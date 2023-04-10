//const userData = require("../database/users.json");
const fs = require("fs");
const path = require("path");
// 1- Salvar o usuário na base de dados C
// 2- Buscar o usuário na base a partir do e-mail R
// 3- Buscar o usuário pelo seu ID R

const User = {
  
  fileName: path.join(__dirname, "../database/users.json"),
  Users: require("../database/users.json"),

  updateUserJson: function() {
    fs.writeFileSync(this.fileName, JSON.stringify(this.Users),"utf-8");
  },

  generateId: function() {
    const lastUser = this.Users[this.Users.length - 1];
    
    if(lastUser) 
      return lastUser.id + 1;
    return 1;
  },
  
  //Create
  createUser: function(userData) {
    const newUser = {
      id: this.generateId(),
      ...userData
    }
    
    this.Users.push(newUser);
    this.updateUserJson();
  },
  //Read
  getUserById: function(id) {
    const allUsers = this.Users;
    const targetUser = allUsers.find((u) => u.id === id);
    
    return targetUser;
  },
  getUserByField: function(fieldName, value) {
    const allUsers = this.Users;
    const targetUser = allUsers.find((u) => u[fieldName] === value);
    
    return targetUser;
  },
 
}

module.exports = User;