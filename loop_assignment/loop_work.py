
# for numbers in range(1,10):
#     print(numbers)

#SUM OF NUMBERS FROM 1-100

# total = 0
# for i  in range(1,100):
#     total += i
# print(total)

# PRINT ONLY EVEN NUMBERS 

# numbers = range(1,50)
# evens = []
# for num in numbers: 
#     if num %2 == 0:
#         evens.append(num)
# print(evens)

#MULTIPLICATION TABLE 

# num = int(input('enter a number please:  '))

# for i in range(1,13):
#     print(f"{num} * {i} = {num * i}") 

# REVERSE PRINTING 

# origin = input('enter a string:  ')

# reversed_str = origin[::-1]

# print("reversed: ", reversed_str)

# another example 

# word = input('enter a new word:  ')
# for ch in word:
#     reversed_str = word[::-1]
# print(reversed_str)

# WHILE LOOP EXAMPLES while True:
# while True:
#     name = input("Type 'exit' to quit: ")
#     if name == "exit":
#         break
#     print("You typed:", name)

# COUNT DOWN

# number = 100
# while number > 60:
#     print(number)
#     number -= 5
# print("the end !")

# SUM UNTIL 100

# numbers = list(range(1,20))

# total = sum(numbers)
# while total < 80:
#     print(numbers)
#     total += 10

# total = 0
# number = 1 
# while total < 100:
#     total += number
#     number += 1
# print("final sum:", total)

# GUESSING GAME
# import random
# secret_number = random.randint(1,100)


# while True:
#     guessed_number = int(input('enter your number: '))

#     if secret_number > guessed_number:
#         print('sorry, your number is too low')
#     elif secret_number < guessed_number:
#         print('oohoo, your number is too high')
#     else:
#         break

# print('well done, you got the right number')

# # PASSWORD CHECK 
# pw = 'python123'

# while True:
#     gw = input('enter a guessword:  ')

#     if gw != pw:
#         print('incorrect password, please try again')
#     else:
#        break
# print('this is the correct password')


