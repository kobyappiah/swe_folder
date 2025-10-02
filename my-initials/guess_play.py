def play_game():
    print( 'welcome to our new  game platform')
    print( 'i am thinkig of a random number betwen 1 and 20')
    import random
    secret_number = random.randint(1,20)
    max_attempts = 5
    attempts = 0

    while attempts < max_attempts:
        try:
            guessed_number = int(input('Enter a number:  '))
        except ValueError
            print('enter a valid number')
            continue

        attempts += 1

    
        if guessed_number > secret_number:
            print('number too high')
        elif guessed_number < secret_number:
            print('number too low')
        else:
            print('you got the right answer:', secret_number)
            break
         
    else:
        print('you have run out of attempts. the secret number was;', secret_number)  
play_game()
