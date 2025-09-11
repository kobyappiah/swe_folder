

user_database =[]

while True: 
    print('\n choose an option')
    print("1. add a new user ")
    print("2. search for a user")
    print("3. exit")
    
    choice = input('enter your choice: ')
    
    if choice == '1':

      first_name =input("First name: ")
    # if first_name.lower() == 'exit':
    #     break
      last_name = input("Last name: ")
    # if last_name.lower() == 'exit':
    #     break

      email =input('email: ')
    # if email.lower() == 'exit':
    #     break

      user = {"first_name": first_name,
        "last_name": last_name,
        "email":email}

      user_database.append(user)
      print('user succesfully added!')

    elif choice == '2':
       search = input("enter first ot last name")
       found = False
       for user in user_database:    
          if user['first_name'] == search or user['last_name'] == search:
            print('user found !')
            print(f"first name: {user["first_name"]}")
            print(f'last name: {user['last_name']}')
            print(f'email: {user['email']}')
            found = True
            break
       if not found:
          print('user not found')
    elif choice == '3':
       print('exiting program')
       break
    else: 
       print('invalid choice; please enter 1, 2 or 3')
        
 
# print('\n All user in database')
# for user in user_database:
#     print(user)

