import random

def guesathon_fun():
    print( 'welcome to our new guessing game platform')
    print( 'i am thinkig of a random number betwen 1 and 100')

    secret_number = random.randint(1,100)
    guessed_number = int(input('Enter a number:  '))
    while True:
        if guessed_number > secret_number:
            print('number too high')
        elif guessed_number < secret_number:
            print('number too low')
        else:
            break
        guessed_number = int(input('Enter a number:  '))
    # while guessed_number > secret_number or guessed_number < secret_number:
    
    #     if guessed_number > secret_number:
    #         print('number is too high')
    #     else: 
    #         print('number is too low')
    #     guessed_number = int(input('Enter a number:  '))    
    print('you got the right answer: ', secret_number)        
guesathon_fun()
