# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

fruits = Category.create(name: "Fruits")
vegetables = Category.create(name: "Vegetables")
drinks = Category.create(name: "Drinks")

fruits.products.create(name: 'apple', price: 1.3)
fruits.products.create(name: 'banana', price: 1.1)
fruits.products.create(name: 'blueberry', price: 1.6)
fruits.products.create(name: 'strawberry', price: 2.0)


vegetables.products.create(name: 'potato', price: 0.6)
vegetables.products.create(name: 'tomato', price: 0.8)
vegetables.products.create(name: 'carrot', price: 1.2)
vegetables.products.create(name: 'onion', price: 1.7)
vegetables.products.create(name: 'cucumber', price: 0.9)



drinks.products.create(name: 'water', price: 1.5)
drinks.products.create(name: 'cola', price: 2.5)
drinks.products.create(name: 'orange juce', price: 3.0)
drinks.products.create(name: 'milk', price: 1.7)
