function highlight(strings, ...values) {
  console.log(strings)
  let str = '';
  strings.forEach((string, i) => {
      console.log(values[i])
      str += string + (values[i]||'');
  });
  return str;
}

const name = 'Snickers';
const age = '100';
const sentence = highlight`My dog's name is ${name} and he is ${age} years old`;
console.log(sentence)
// var min = 1;
// var max = 100;
// var rand =  min + (Math.random() * (max-min));
// console.log(parseInt(rand))
