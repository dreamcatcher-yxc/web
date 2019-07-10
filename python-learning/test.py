# msg = "Hello"
# name = input()
# print(msg, name)

# html = '''
# <html>
#     <head>
#     </head>
# </html>
# '''

# print(html)

def splitChapter(title):
    print('\r\n', '*' * 20, title, '*' * 20, '\r\n')

splitChapter('list demo')

list  = [1, 2, 3, 4, 5]
print('len: ', len(list))
print('index of 0 element is:', list[0])
print('index of -1 element is:', list[-1])

last_ele = list.pop()

print('last element is:', last_ele)
print('len: ', len(list))
print('index of 0 element is:', list[0])
print('index of -1 element is:', list[-1])

splitChapter('tuple demo')

tuple = (1, 2, 3, 4, 5)
print('len: ', len(tuple))
print('index of 0 element is:', tuple[0])
print('index of -1 element is:', tuple[-1])

splitChapter('if-else demo')

i = 1

if i < 0:
    print(i, '小于0')
elif i > 0:
    print(i, '大于0')
else:
    print(i, '等于0')

# print('请输入年龄')
# age = int(input())

# if age < 18:
#     print('未成年')
# else:
#     print('已成年')


splitChapter('for/while/do-while demo')

list2 = [1, 2, 3, 4, 5, 6]

for index,value in enumerate(list2):
    print(index, ' --> ', value)

print('\r\n')

for index in range(len(list2)):
    print(index, ' --> ', list2[index])

print('\r\n')

sum = 0
n = 0

while n < len(list2):
    sum += list2[n]
    n += 1

print('sum is:', sum)

splitChapter('dict/list demo')

dict = {'username' : '张三', 'age' : 20,  'gender' : '男'}
print(dict)

splitChapter('可变参数')

def calc(*numbers):
    sum = 0
    for num in numbers:
        sum += num * num
    return sum

print(calc(*[1, 3, 5, 7, 9]))

splitChapter('关键字参数')

def student_enroll(name, age, gender, **other):
    print('name is:', name)
    print('age is:', age)
    print('gender is:', gender)
    
    for key,value in other.items():
        print(key, ':', value)

student_enroll('张三', 20, '男', **{'country' : 'chinese', 'province' : 'yunnan', 'city' : 'zhaotong'})

splitChapter('命名关键字参数')

""" 
    可以规避关键字参数不能限制传递参数的问题
"""

""" 
    与正常参数之间隔着一个 *
"""

def student_enroll2(name, age, *, gender):
    print('name is:', name)
    print('age is:', age)
    print('gender is:', gender)

student_enroll2('张三', 20, gender='男')
student_enroll2('张三', 20, **{'gender' : '男'})

""" 
    当存在可变参数的时候, 则 * 可以省略
"""

print('\r\n')

def student_enroll3(name, *age, gender):
    print('name is:', name)
    print('age is:', age)
    print('gender is:', gender)

student_enroll3('张三', 20, gender='男')
student_enroll3('张三', 20, **{'gender' : '男'})

""" 
    在Python中定义函数，可以用必选参数、默认参数、可变参数、关键字参数和命名关键字参数，这5种参数都可以组合使用。
    但是请注意，参数定义的顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。
"""