from functions import calculate_compound_interest

principal = 5000
rate = 0.04
number_of_years = 4
years = 5

amount = calculate_compound_interest(principal, rate, number_of_years, years)

print(f"After {years} years at an interest rate of {rate*100}%, the investment will be worth: ${amount:.2f}")