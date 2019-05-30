class Admin::BarragesController < ApplicationController
  before_action :set_barrage, only:[:update, :show, :destroy]
  
  def index
    @barrages = Barrage.all
  end

  def create
    @barrage = Barrage.new barrage_params
    if @barrage.save
      render json: {message: "barrage created successfuly"},status: 200
    else
      render json: {errors: @barrage.errors.full_messages},status: 422
    end
  end

  def show
  end

  def update
    if @barrage.update(barrage_params)
      render json: {message: "barrage updated successfuly"},status: 200
    else
      render json: {errors: @barrage.errors.full_messages},status: 422
    end
  end

  def destroy
    @barrage.destroy
  end

  private
  def set_barrage
    @barrage = Barrage.find(params[:id])
  end 

  def barrage_params
    params.permit(:name, :descpription, :size, :lat, :lng,  :image)
  end
end
