import matplotlib.pyplot as plt
import numpy as np
from scipy.interpolate import make_interp_spline, BSpline

def draw(data):
    x,y = data[0][1:],data[1][1:]
    if len(x) == 1:
        print("Already stored, need more data to draw plot.")
        return
    elif len(x) >= 4:
        xnew = np.linspace(x.min(), x.max(),300) 
        # interpolate ?
        spl = make_interp_spline(x,y,k=3)
        power_smooth = spl(xnew)
        plt.plot(xnew,power_smooth)
    else:
        plt.plot(x,y)
    plt.ylim(0,600)
    plt.xlim(1,12)
    plt.grid()
    plt.show()

def add_data(data,datelist):
    datein = input("Enter the date(format: 6am, 1pm, 6, 1 are Saturday and Monday): ")
    date = datelist.index(datein)+1
    if datein not in datelist:
        return
    price = int(input("Enter the price: "))
    if np.array_equal(np.array([[0,0],[0,0]]),data):
        data[0][1] = date
        data[1][1] = price
    else:
        data = np.insert(data,len(data[0]),[date,price],axis=1)
        # sort by row 1st
        # argsort() gets the correct pos where the corresponing rows are belong to
        data = data [ :, data[0].argsort()]
    np.savetxt("data.csv",data,delimiter=",")
    draw(data)

def main():
    datelist = ["1am", "1pm", '2am', '2pm','3am', '3pm','4am', '4pm','5am', '5pm','6am', '6pm']
    try:
        data = np.loadtxt('data.csv',delimiter=",")
        add_data(data,datelist)
    except:
        ans = input("no data exist, want to create a new one? (y/n)")
        if ans == "y":
            dataset = np.zeros((2,2)).astype(np.int)
            f = np.savetxt("data.csv",dataset,delimiter=",")
            add_data(dataset,datelist)

        
main()