console.log('----------------test1----------------');

// 基本示例
{
    var obj = {
        name : "xiuchu.yang",
        age : 24
    }
    
    function foo1 (person: { name: String, age: Number }): void {
        console.log(`name: ${ person.name }, age: ${ person.age }`);
    }
    
    foo1(obj);
}

// 类型定义
{
    interface Person {
        firstName: String,
        lastName: String
    }

    function printFullName (person: Person): void {
        console.log(person.firstName + '' + person.lastName);
    }

    printFullName({
        firstName: 'yang',
        lastName: 'xiuchu'
    });
}

// 对 ES6 类的支持
{
    class Student {
        fullName: String;
        constructor (public firstName: string, public lastName: string) {
            this.fullName = firstName + lastName;
        }
        toString (): String {
            return [
                'firstName: ' + this.firstName,
                'lastName: ' + this.lastName,
                'fullName: ' + this.fullName
            ].join('\n');
        }
    }

    let student: Student = new Student('yang', 'xiuchu');
    console.log(student.toString());
}

