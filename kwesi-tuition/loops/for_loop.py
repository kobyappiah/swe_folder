
basket_of_fruits = ["banana", "mango", "pawpaw"]

# do something for each item in a list. Do this for each item till you're done with the list of items.

# for fruit in basket_of_fruits:
#     print(f"{fruit} is very sweet")

# print(f"The fruit is not sweet: {fruit}")

# if you want to use a for-loop and you don't have a list, you'd have to generate one with range
# for number in range(1,100):
#     print(number)

#     if number > 9:
#         break

#     print(f"This number made it: {number}")


marks = [77,88,67,98,97,56]
multiples_of_4 = []
lucky_numbers = []

for m in marks:
    # disjointed if-statements all run. If all conditions are true, it will run for each block of if. Unlike if-elif-else where only one block runs
    if m % 4 == 0:
        print(f"Your mark, {m} is a multiple of 4")
        multiples_of_4.append(m)

    if m % 11 == 0:
        print(f"Your mark, {m} is a double figure. Lucky number!!")
        lucky_numbers.append(m)
    print(f"Done with {m}")

print("Done with loop. Check results below:")
print(f"Lucky numbers: {lucky_numbers}")
print(f"Multiples of 4: {multiples_of_4}")

