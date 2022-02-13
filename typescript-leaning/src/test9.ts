console.log('----------------test9----------------');

interface Named {
  name: string;
}

class Person {
  name: string;
}

let p: Named;

p = new Person();

console.log('p:', p);