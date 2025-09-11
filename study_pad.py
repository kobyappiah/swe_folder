
user_data =[]

while True:
    print('\n choose  one of the option')
    print('1. add a new user ')
    print('2. search for a user ')
    print('3. exit')

    choice = input('Enter an option: ')

    if choice == '1':
      first_name =input('enter first_name: ')
      last_name  = input('enter last_name: ')
      email      = input('enter email: ')

      user = {"first_name": first_name, 
            "last_name":last_name,
            "email": email}
      
      user_data.append(user)
      print("user successfully added")

    elif choice == '2':
       
       search = input('enter first_name or last_name:  ')
       found = False
       for user in user_data:
          if user['first_name'] == search or user['last_name'] == search:
             print('user found !')
             print(f"first_name : {user["first_name"]}")
             print(f"last_name: {user["last_name"]}")
             print(f"email: {user["email"]}")
             found = True
             break
          if not found:
             print("user not found !")

    elif choice == '3':
       print('exiting program')
       break
