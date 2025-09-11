BALANCE = 1000.00
AIRTIME_BALANCE = 0.00
TRANSACTIONS = []


USSD_MENU = """
Welcome to Dr. K&A bank.
1. Check Balance
2. Send Money
3. Buy Airtime
4. Check Airtime Balance
0. Quit"""

while True:
    print("...........")

    choice = input (USSD_MENU + "\nchoose an option")
    if choice == "1":
        print(f"your balance is : {BALANCE:.2f}")

#check balance



