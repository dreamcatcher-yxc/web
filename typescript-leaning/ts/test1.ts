var obj = {
    name : "xiuchu.yang",
    age : 24
}

function foo(person: { name: String, age: Number }): void {
    console.log(`name: ${ person.name }, age: ${ person.age }`);
}

foo(obj);