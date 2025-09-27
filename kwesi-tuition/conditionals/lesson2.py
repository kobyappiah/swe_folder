
person1_phonenumber = "0247545634"
person1_age = 26
person1_name = "Kwesi"

print(f"Welcome! {person1_name}")

if person1_phonenumber.startswith("024") or person1_phonenumber.startswith("054"): #that's mtn
    print("You are an MTN customer and deserve 2GB data")
    if person1_age > 25:
        print("You will get health insurance")
    else:
        print("You are too young for health insurance")


print("Bye for now")