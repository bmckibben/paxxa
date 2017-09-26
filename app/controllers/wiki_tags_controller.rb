class WikiTagsController < ApplicationController
  before_action :set_wiki_tag, only: [:show, :edit, :update, :destroy]

  # GET /wiki_tags
  # GET /wiki_tags.json
  def index
    @wiki_tags = WikiTag.all
    #raise @wiki_tags.inspect
  end

  # GET /wiki_tags/1
  # GET /wiki_tags/1.json
  def show
  end

  def menu
    @wiki_menu = view_context.query_menu
  end

  # GET /wiki_tags/new
  def new
    @wiki_tag = WikiTag.new
  end

  # GET /wiki_tags/1/edit
  def edit
  end

  # POST /wiki_tags
  # POST /wiki_tags.json
  def create
    @wiki_tag = WikiTag.new(wiki_tag_params)

    respond_to do |format|
      if @wiki_tag.save
        format.html { redirect_to @wiki_tag, notice: 'Wiki tag was successfully created.' }
        format.json { render :show, status: :created, location: @wiki_tag }
      else
        format.html { render :new }
        format.json { render json: @wiki_tag.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /wiki_tags/1
  # PATCH/PUT /wiki_tags/1.json
  def update
    respond_to do |format|
      if @wiki_tag.update(wiki_tag_params)
        format.html { redirect_to @wiki_tag, notice: 'Wiki tag was successfully updated.' }
        format.json { render :show, status: :ok, location: @wiki_tag }
      else
        format.html { render :edit }
        format.json { render json: @wiki_tag.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /wiki_tags/1
  # DELETE /wiki_tags/1.json
  def destroy
    @wiki_tag.destroy
    respond_to do |format|
      format.html { redirect_to wiki_tags_url, notice: 'Wiki tag was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def delete_wiki_tag
 
    WikiTag.find(params[:id]).destroy
    
    respond_to do |format|
      format.html { render nothing: true }
      format.js { render nothing: true }
    end    
  end

  def new_wiki_tag
    
    @wiki_tag = WikiTag.new({:wiki_id => params[:wiki_id], :tag_id => params[:tag_id]})

    respond_to do |format|
      if @wiki_tag.save
        format.html { render nothing: true }
        format.js { render :json => @wiki_tag.id }
      else
        format.html { render nothing: true }
        format.js { render nothing: true }
      end
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_wiki_tag
      @wiki_tag = WikiTag.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def wiki_tag_params
      params.require(:wiki_tag).permit(:wiki_id, :tag_id)
    end
end
