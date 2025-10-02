
colors = ['red','yellow','green']

color = input('please enter a color:  ')

if color in colors == 'red':
    print('stop')
elif color == 'yellow':
    print('get ready')
elif color == 'green':
    print('Go')
else:
    print('invalid color')