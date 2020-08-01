const db = require('./db');
const fs = require('fs');

const randChoice = (arr) => {
  const elNum = Math.floor(Math.random() * arr.length)
  return arr[elNum];
}

people = [];

for(let i = 0; i < 20; i++) {
  const person = {    
  }
  person.gender = randChoice(db.db.genders);
  person.name = randChoice(person.gender === 'Male' ? db.db.maleNames : db.db.femaleNames);
  person.lastName = randChoice(db.db.lastNames);
  person.age = Math.floor(Math.random() * 60) + 18;

  // Creates a phone variable and set a first digit to 5, 6 or 7 as from this number Polish mobile number starts
  let phone = (Math.floor((Math.random() * 3) + 5)).toString();
  for(let i = 0; i < 8 ; i++) {
    const num = (Math.floor((Math.random() * 10))).toString();
    phone = phone + num;
  }

  person.phone = (`${phone.slice(0,3)}-${phone.slice(3,6)}-${phone.slice(-3)}`);
  person.email = (`${person.name}.${person.lastName}@${randChoice(db.db.domain)}`).toLowerCase();
  people.push(person);
}
console.log(people);
const data = JSON.stringify(people);

fs.writeFile('people.json', data, (err) => {
  if (err) throw 'Something went wrong';
  console.log('File has been successfully generated! Check people.json');
});