# function definition: This is the point where you create the function's actual nature and how it should work.

# function call: This is when you make use of the function, you pass it actual values if specified in the 
# definition and then whatever is expected to happen, happens!


# def something_that_runs(fuel):

#     for i in range(fuel):
#         print(f"Drive... {i + 1}")


# print("Taking a break..")

# age_months = 12 * int(input("Enter your age in years: "))

# if age_months < 180:
#     print("You are a young person and shouldn't drive")
# else:
#     fuel_input = int(input("Enter the amount of fuel in the tank: "))

#     something_that_runs(fuel_input)



# print("Welcome to Melcom. What would you like to buy?")
# total = 0

# def get_input_from_user():
#     item = input("Item: ")
#     quantity = int(input("Quantity: "))
#     price = float(input("Price: "))
#     return {
#         "item": item,
#         "quantity": quantity,
#         "price": price
#     }

# def calculate_price(quantity, price):
#     tax = 0.10
#     item_total = quantity * price
#     return item_total + (item_total * tax)

# user_data = get_input_from_user()
# total += calculate_price(user_data["quantity"], user_data["price"])

# while True:
#     choice = input("Would you like to add another item? (yes/no): ")
#     if choice == "yes":
#         user_data = get_input_from_user()
#         total += calculate_price(user_data["quantity"], user_data["price"])
#     else:
#         break



#amount = principal *(1 + rate/number_of_years) ** (number_of_years * years)

# principal = 1000
# rate = 0.05
# number_of_years = 12
# years = 10

# def calculate_compound_interest(principal, rate, number_of_years, years):
#     return principal * (1 + rate / number_of_years) ** (number_of_years * years)


# amount = calculate_compound_interest(principal, rate, number_of_years, years)


def take_bio_data(name, age, country="Ghana", gender="Male"):
    print(f"Name: {name}")
    print(f"Age: {age}")
    print(f"Country: {country}")
    print(f"Gender: {gender}")

    #save_to_database(name, age, country, gender)

take_bio_data("Kwesi", 30)
take_bio_data("Ama", 25, "Nigeria", "Female")

# default values of functions
def calculate_the_area(length, width=0):
    return length * width

area1 = calculate_the_area(5)
print("Area1:", area1)


