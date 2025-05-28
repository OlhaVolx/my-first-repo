import json

myArray = [4, 4, 8, 3, 3, 3, 2, 4, 4]
print("Вивести кожен елемент масиву.")
for i in myArray:
    print(i)

print("Вивести перші 3 елементи масиву")
for i in range(3):
    print(myArray[i])

print("Вивести суму всіх елементів")
print(sum(myArray))

print("Вивести суму всіх елементів окрім елемента що = 4")
a=0
for i in myArray:
    if i != 4:
        a += i
print(a)

print("Знайти всі об'єкти lists і вивести на екран їхні ID та name")
with open('list.json','r') as jason_file:
    data = json.load(jason_file)
    for i in data['lists']:
        # З поточного об'єкта (i) бере значення поля name та id і записує в змінні.
        listName = i['name']
        listId =i['id']
        print(f'The list name is {listName} and list id is {listId}')
