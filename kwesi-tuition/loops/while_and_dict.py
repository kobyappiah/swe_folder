# while loop with user input
# loop_or_not = input("Do you want to loop? (yes/no): ")

# while loop_or_not not in ["no", "never", "not sure", "do not"]:
#     print("You decided to loop!")
#     loop_or_not = input("Do you want to loop again? (yes/no): ")

# print("You decided not to loop. Goodbye!")



# check if a substring is in a string

# if "sam" in "sammy is a boy":
#     print("Found 'sam' in 'samuel'")
# else:
#     print("'sam' not found in 'samuel'")


# modifying a list by index
# l = [["apple", 4, 5.00], ["banana", 4, 3.2], ["cherry", 5, 2.5], ["date", 6, 3.0], ["elderberry", 2, 4.0]]

# fruit_dict = {
#     "apple": {"quantity": 4, "price": 5.00},
#     "banana": {"quantity": 4, "price": 3.2},
#     "cherry": {"quantity": 5, "price": 2.5},
#     "date": {"quantity": 6, "price": 3.0},
#     "elderberry": {"quantity": 2, "price": 4.0}
#    }

# fruit_dict["mango"] = {"quantity": 3, "price": 1.5}
# # print(fruit_dict["mango"])

# fruit_dict["cherry"] = {"quantity": 50, "price": 20.5}

# # print(fruit_dict)

# ##### Adding a new fruit to the dictionary based on user input

# new_fuit = input("Enter a fruit name: ") #watermelon

# fruit_dict[new_fuit] = {} # empty dictionary as value

# quantity = int(input(f"Enter the quantity of {new_fuit}: ")) #5
# price = float(input(f"Enter the price of {new_fuit}: ")) #50

# fruit_dict[new_fuit]["quantity"] = quantity
# fruit_dict[new_fuit]["price"] = price

# print(f"You just added: {new_fuit}: ", fruit_dict[new_fuit])



# while loop with dictionary and user input

fruit_dict = {}

while True:
    new_fruit = input("Enter a fruit name (or type 'exit' to quit): ") 

    if new_fruit.lower() in ['exit', 'quit', 'q']:
        print("Exiting the loop. Goodbye!")
        break

    fruit_dict[new_fruit] = {} # empty dictionary as value

    quantity = int(input(f"Enter the quantity of {new_fruit}: ")) 
    price = float(input(f"Enter the price of {new_fruit}: ")) 

    fruit_dict[new_fruit]["quantity"] = quantity
    fruit_dict[new_fruit]["price"] = price

    print(f"You just added: {new_fruit}: ", fruit_dict[new_fruit])

print("Final fruit dictionary:", fruit_dict)