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
    @wiki_menu = Wiki.find_by_sql("WITH RECURSIVE category_tree(id, path) AS (

      select wikis.id, ARRAY[wikis.id]
      from wikis left outer join wiki_tags on wikis.id = wiki_tags.wiki_id
      where wiki_tags.tag_id is null

      UNION ALL
      SELECT wiki_tags.wiki_id as id, path || wiki_tags.wiki_id
      FROM category_tree
      JOIN wiki_tags ON wiki_tags.tag_id=category_tree.id
      WHERE NOT wiki_tags.wiki_id = ANY(path)
      )


      SELECT category_tree.id,category_tree.path, wikis.title 
      FROM category_tree 
            RIGHT OUTER JOIN wikis on category_tree.id = wikis.id
      ORDER BY path")
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
