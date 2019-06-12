class Api::V1::AddressesController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_address, only:[:destroy, :show, :update, :get_close_barrage]

  def index
    @addresses = current_user.addresses
  end

  def create
    @address = Address.new(address_params)
    @address.user_id = @current_user
    
    if @address.save
      render json: {message: "Address updated success"},status: 200
    else
      render json: {errors: @address.errors.full_messages},status: 422
    end
  end

  def update
   if @address.update(address_params)
    render json: {message: "Address updated success"},status: 200
   else
    render json: {errors: @address.errors.full_messages},status: 422
   end
  end

  def show
  end

  def destroy
    @addrerss.destroy
  end

  def get_close_barrage
    @barrage = Barrage.search(@address)
  end

  private
  def set_address
    @address = Address.find(params[:id])
  end

  def address_params
    params.permit(:zip_code, :city_name, :street, :number, :complement, :neighborhood, :uf_name, :country, :lat, :lng)
  end
end
