
def word_count(sentence): 

    word_count = {}

    sentence = input('my sentence is:   ')
    words = sentence.split()
   
    for word in words :
        word = word.lower()
        if word in word_count:
            word_count[word] += 1
        elif word_count[word] == 1:

print(word_count)