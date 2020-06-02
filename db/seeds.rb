# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

groceries = Category.create(name: "Groceries")
food = Category.create(name: "Prepared food")
drug = Category.create(name: "Prescription drug")
ndrug = Category.create(name: "Non-prescription drug")
cloth = Category.create(name: "Clothing")
intagibles = Category.create(name: "Intagibles")

groceries.products.create(name: 'apple', price: 0.24)
groceries.products.create(name: 'orange', price: 0.35)
groceries.products.create(name: 'pineapple', price: 0.78)


ndrug.products.create(name: 'Oxycodone', price: 16.99)
ndrug.products.create(name: 'Fentanyl', price: 13.58)

drug.products.create(name: 'Morphine', price: 128.67)

cloth.products.create(name: 'Sweater', price: 118.56)
cloth.products.create(name: 'Baseball_hat', price: 20.14)
cloth.products.create(name: 'Mittens', price: 9.99)

food.products.create(name: 'Ramen', price: 3.54)
food.products.create(name: 'Canned_beans', price: 1.24)
food.products.create(name: 'Tomato_puree', price: 0.78)
