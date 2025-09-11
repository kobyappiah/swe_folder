
def word_count(sentence): 

    word_count = {}

    words = sentence.split()
   
    for word in words :
        word = word.lower()
        if word in word_count:
            word_count[word] += 1
        else:
            word_count[word] = 1

    print (word_count)
s = input('my sentence is:   ')
word_count(s)
#     return word_count
# return is preferred to print as it allow you to utlize or modify it for use in other parts of the code 

# print(word_count())