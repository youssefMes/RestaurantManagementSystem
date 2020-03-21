# RestaurantManagementSystem

## Introduction
The project is a mashup that consists of a restaurant system that manages delivery services for the customers and which analyse data in real-time to improve the business services. 


## Our Goal:
* Increase sales in our restaurant
* Sell more food and beverages.
* Attract more customers.
* Keep your business open for extended meal periods.
* Encourage private parties or special events.
* Increase the “cover average” of each guest.

## Offered Services ([More details]())
Our project will be consisting of 3 services:

### 1.Restaurant Service
which will manages restaurant information like name, owner, tables.

### 2.Reservation Service
which manages the reservation validation workflow.

### 3.Delivery Service
which manages to deliver the products to the customers.

* Use case: A customer orders food
* Event Stream :
* 1.New order intent will be created which be confirmed after setting up  required informations correctly (address) and successful payment if payment mode is online 
* 2.A price will be available after requesting the database to calculate the price of articles ordered
* 3.After requesting the google maps api with the entered address an estimation will be available which includes, when the food arrives + time for the food to be ready
* 4.After delivering food the status of the order will be updated to delivered 
