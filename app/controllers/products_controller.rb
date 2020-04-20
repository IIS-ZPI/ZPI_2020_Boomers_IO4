class ProductsController < ApplicationController
  before_action :set_category
  before_action :set_product, only: [:show, :edit, :update, :destroy]

  # GET categories/1/products
  # GET categories/1/products.json
  def index
    @products = @category.products
  end

  # GET categories/1/products/1
  def show
  end

  # GET categories/1/products/new
  def new
    @product = @category.products.build
  end

  # GET categories/1/products/1/edit
  def edit
  end

  # POST categories/1/products
  def create
    @product = @category.products.build(product_params)

    respond_to do |format|
      if @product.save
        format.html { redirect_to [@product.category, @product], notice: 'Product was successfully created.' }
        format.json { render :show, status: :created, location: [@product.category, @product] }
      else
        format.html { render :new }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT categories/1/products/1
  def update
    respond_to do |format|
      if @product.update_attributes(product_params)
        format.html { redirect_to [@product.category, @product], notice: 'Product was successfully updated.'}
        format.json { render :show, status: :ok, location: [@product.category, @product] }
      else
        format.html { render :edit }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE categories/1/products/1
  def destroy
    @product.destroy
    respond_to do |format|
      format.html { redirect_to categories_products_url(@category), notice: 'Product was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:category_id])
    end

    def set_product
      @product = @category.products.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def product_params
      params.require(:product).permit(:name, :price)
    end
end
