//isme varaible names ki marao mat -Susmit

var nameRequest = new XMLHttpRequest();

nameRequest.open('GET','https://learnwebcode.github.io/json-example/animals-1.json');
nameRequest.onload = function() {
  console.log(nameRequest.responseText);
};
