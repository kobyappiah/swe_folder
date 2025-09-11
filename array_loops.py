

# list_of_attendees = ["kwasi", 12, True, 505.4, ["A","B","C"]]
# item5 = list_of_attendees[4]
# print (item5)

# list_of_attendees = ["kwame", 233244664714],
#                     ["ama", 233245677175],
#                     ["adwoa", 233245768914],

# numbers = [0,1,2,3,4,5,5,7,8,9,]
# counter = 0
# marks = [23,45,56,27,90,46,75,66,29,53]
# for number in numbers:
#     print(number)
#     print(marks[counter])
#     counter = counter + 3
# for number in numbers:
#     print("number: ", number)
#     print(marks[counter])
#     counter = counter + 3
#     print("counter: ", counter)
#     print("-"*10)

 ## for loops for appending names
"""
for loops for appending names 
"""
# numbers = range(10)
# names = []
# for number in numbers:
#     print(number)
#     names.append(input(f"enter name no. {number + 1}: "))
# print( names)

# n = []
# n.append(100)
# print(n)
# n[0] = 99
# print(n)
# n.append(50)
# print(n)
# n.append(50 + 1)
# print(n)
# n.append(n[0] + 1)
# print(n)
# n[1] = n[0] + n[1]
# print(n)

# numbers = list (range(1,10))
# names = []
# for number in numbers:
#     print(number)
#     names.append(input(f"name no. {number}: "))
#     print( names)

# n =[]
# n.append(100)
# print(n)
# n[0] = 50
# n.append(44)
# n.append(60 + 1)
# print(n)
# n[1] = n[0] + n[2]
# print(n)


BALANCE = 1000.00
AIRTIME_BALANCE = 0.00
TRANSACTIONS = []


USSD_MENU = """
Welcome to Dr. K&A bank.
1. Check Balance
2. Send Money
3. Buy Airtime
4. Check Airtime Balance
0. Quit"""

while True:
    print("..............")
    choice = input(USSD_MENU + "\nChoose an option:")
    if choice == "1":
        print(f"the balance is {BALANCE:.2f}")

    # #      # print value of balance (subtract all transactions)
    # #     print("Not implemented yet.")
#    elif choice == "2":
    
#         try:
#             amount = float(input("Enter amount to send: ").strip())
#             if amount <= 0:
#              print("Amount should be greater than zero.")
#             elif amount > BALANCE:
#                 print("Insufficient funds in account.")
#             else:
#                 BALANCE -= amount
#                 TRANSACTIONS.append(("Sent", amount))
#                  print(f"{amount:.2f} has been sent successfully.")
#                 print(f"New balance: {BALANCE:.2f}")
    # except ValueError:
    #         print("Invalid input. Please enter a number.")

   
    elif choice == "2":
        
        try:
            amount = float(input("enter amount to send: "))
            if amount <= 0:
                print("Amount should be greater than zero")
            elif amount > BALANCE:
                print("insufficent funds in account")
            else:
                BALANCE -= amount 
                TRANSACTIONS.append((f"sent money", amount))
                print(f"{amount:.2f} has been sent successfully.")
        except ValueError:
            print("invalid input.Please enter a number.")
        


    #     # ask user to enter amount to send.
    #     # append amount to transactions
    #     # subtract amount from balance
    #     # print to the user that the given amount has been sent successfully
    #     print("Not implemented yet.")
    # elif choice == "3":
    #     print("Not implemented yet.")
    #     # ask user to enter amount of airtime to buy
    #     # append amount to transactions
    #     # add amount to airtime balance
    #     # subtract amount from balance
    #     # print to the user that the given amount of airtime has been bought successfully
    # elif choice == "4":
    #     print("Not implemented yet.")
    #     # print the current airtime balance
    # elif choice == "0":
    #     print("Thank you for using our service. Goodbye!")
    #     break