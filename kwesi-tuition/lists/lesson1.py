#what is a list

names = ["Kwesi", "Koby"]

print(names)

# to access something, you use the position of the item. Starting from 0

print(names[1])

# adding items to the list
# names.append("Adoma")
# print(names)

#add to a specific index
names.insert(1, "Adoma")
# print(names)

# remove from list
# names.remove("Kwesi")
# names.pop(1)
del names[2]
print(names)

