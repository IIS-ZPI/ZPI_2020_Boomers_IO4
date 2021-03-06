class ProductsController < ApplicationController
  before_action :set_category, except:[:index]
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token
  
  # GET categories/1/products
  # GET categories/1/products.json
  def index
    if params[:category_id]
      set_category
      @products = @category.products
    else
      @products = Product.all
    end
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
        format.json { render :show, status: :created, location: [@product.category, @product] }
      else
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT categories/1/products/1
  def update
    respond_to do |format|
      if @product.update_attributes(product_params)
        format.json { render :show, status: :ok, location: [@product.category, @product] }
      else
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE categories/1/products/1
  def destroy
    @product.destroy
    respond_to do |format|
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
