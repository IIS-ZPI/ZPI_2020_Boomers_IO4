class ProductsController < ApplicationController
  before_action :set_categories
  before_action :set_product, only: [:show, :edit, :update, :destroy]

  # GET categories/1/products
  def index
    @products = @categories.products
  end

  # GET categories/1/products/1
  def show
  end

  # GET categories/1/products/new
  def new
    @product = @categories.products.build
  end

  # GET categories/1/products/1/edit
  def edit
  end

  # POST categories/1/products
  def create
    @product = @categories.products.build(product_params)

    if @product.save
      redirect_to([@product.categories, @product], notice: 'Product was successfully created.')
    else
      render action: 'new'
    end
  end

  # PUT categories/1/products/1
  def update
    if @product.update_attributes(product_params)
      redirect_to([@product.categories, @product], notice: 'Product was successfully updated.')
    else
      render action: 'edit'
    end
  end

  # DELETE categories/1/products/1
  def destroy
    @product.destroy

    redirect_to categories_products_url(@categories)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_categories
      @categories = Category.find(params[:categories_id])
    end

    def set_product
      @product = @categories.products.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def product_params
      params.require(:product).permit(:name, :price)
    end
end
