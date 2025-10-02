# # Print numbers 1 - 10,  20 - 30,  40 - 50
# list_of_numbers = range[1,11],range[20,31],range[40,51]
# for number in list_of_numbers:
#     print(number)

# Create a list of 5 fruits. Loop through each of them using the enumerate() function. 
# Print each item using the format: color at index 0 is purple etc

# fruits = ["apple","lemom","orange","guava", "cherry"]
# for i,fruit in enumerate(fruits):
#     print(f"fruit at index {i}:{fruit}")


# word_list = ("java", "python","html","django")
# secret_word = random.choice(word_list)

# print("welcome to our guessiing game !")

# while guess !== secret_word

# while True:
    
#     word = input("Enter word:")
#     if word == "python":
#         print("your guess is correct, goodbye,")
#         break
    # else:
    #     print('please try again')

# while True:
    
#     word = input("Enter word:")
#     if word == "python":
#         print("your guess is correct, goodbye,")
#         break

# fruits = ['apple','orange','guava','cherry','mango']
# # for i in range(len(fruits)):
# #     print(i + 1, fruits[i])
# for i in enumerate(fruits):
#     # print(i, fruits)
#     print(i)
# while True:
#  for i in range(5):
#         if i == 4:
#             break
#         print(i)

        



def count_vowels(text):
    vowels = "aeiouAEIOU"
    return sum(1 for char in text if char in vowels)
text = "python is another name for malaria"
print(("number of vowels:", count_vowels(text) ))