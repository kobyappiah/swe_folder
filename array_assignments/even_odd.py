# EVEN AND ODD NUMBERS 
# numbers = [2, 5, 8, 11, 14]
# evens = []
# # odds = []

# for num in numbers:
#     if num %2 == 0:
#         # evens.append(num)
#         print(f"this {num} is even" )
#     else:
#         print(f" this {num} is odd")
# # print('even numbers:', evens)
# print('odd numbers:', odds)

#NAME CHECKING
# names = ["Alice", "Bob", "Charlie"]

# name = input("enter a name: " )

# if name in names:
#         print('Welcome,', name)
# else:
#         print( 'Sorry, your name is not in the list ')

# CHECKING POSITIVE NEGATIVE AND ZERO NUMBERS 

# numbers = [-3, 0, 7, -1, 5]

# for num in numbers:
#     if num > 0:
#         print(f"{num} - positive number")
#     elif num < 0:
#         print(f" {num} - negative number")
#     else:
#         print(f"{num} - number is zero")

# CHECKING PASSING STUDENTS 

# scores = [35, 67, 80, 45, 90]

# for num in scores:
#     if num > 50:
#         print(f"{num} - PASS")
#     else: 
#         print(f"{num} - FAIL")    

#REMOVING FAILING MARKS 

# scores = [20, 55, 33, 73, 40, 100]

# new_list =[]

# for num in scores:
#     if num < 50:
#         new_list.append(num)
# print(new_list)

# FAVORITE FRUIT CHECKER 

# fruits = ["apple", "banana", "mango", "orange"]

# fruit = input('enter the name of your fruit:  ')

# if fruit in fruits:
    
#     print('yes we havr your chosen fruit')
# else:
#     print('no, we dont have your chosen fruit')

#SIMPLE CALCULATOR
# Ask the user to enter two numbers and an operator (+, -, *, /).
# Use conditionals to perform the operation and print the result.


# If the operator is invalid, print "Unknown operation".

# num1 = float(input('enter a number:  '))

# operator = input('enter the operator:  ')

# num2 = float(input('enter a number;  '))

# if operator == '+':
#     result = num1 + num2
# elif operator == '-':
#     result = num1 - num2
# elif operator == '*':
#     result = num1 * num2
# elif operator == '/':
#     if num2 != 0:
#         result = num1 / num2 
#     else:
#         print('error: division by zero is invalid')

# print('result', result)