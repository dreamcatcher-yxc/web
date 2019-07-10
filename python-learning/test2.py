def splitChapter(title):
    print('\r\n', '*' * 20, title, '*' * 20, '\r\n')

splitChapter('切片')

list = [1, 2, 3, 4, 5,6 ,7, 8, 9, 10]

print('list[0:3]:', list[0:3])
print('list[0:-2]:', list[0:-2])
print('list[:3]:', list[:3])
print('list[:-3]:', list[:-3])

splitChapter('列表生成式')

list2 = [x * x for x in list]
print(list2)

splitChapter('两层测列表表达式')
list3 = [m + n for m in 'ABC' for n in 'XYZ']
print(list3)