json.extract! categories_product, :id, :name, :price, :created_at, :updated_at
json.url categories_product_url(categories_product, format: :json)
