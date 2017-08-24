class WikisController < ApplicationController
  before_action :set_wiki, only: [:show, :edit, :update, :destroy]

  # GET /wikis
  # GET /wikis.json
  def index
    @wikis = Wiki.all
    @menu = nested_set_menu
  end

  # GET /wikis/1
  # GET /wikis/1.json
  def show
  end

  # GET /wikis/new
  def new
    @wiki = Wiki.new
  end

  # GET /wikis/1/edit
  def edit
  end

  # POST /wikis
  # POST /wikis.json
  def create
    @wiki = Wiki.new(wiki_params)
    @wiki.user_id = current_user.id
    respond_to do |format|
      if @wiki.save
        format.html { redirect_to wikis_url, notice: 'Wiki was successfully created.' }
        format.json { render :show, status: :ok, location: @wiki }
      else
        format.html { render :new }
        format.json { render json: @wiki.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /wikis/1
  # PATCH/PUT /wikis/1.json
  def update

    respond_to do |format|
      if @wiki.update(wiki_params)
        format.html { redirect_to wikis_url, notice: 'Wiki was successfully updated.' }
        format.json { render :show, status: :ok, location: @wiki }
      else
        format.html { render :edit }
        format.json { render json: @wiki.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /wikis/1
  # DELETE /wikis/1.json
  def destroy
    @wiki.destroy
    respond_to do |format|
      format.html { redirect_to wikis_url, notice: 'Wiki was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def wiki_form
    if params[:wiki_id] != "0"
      @wiki = Wiki.find(params[:wiki_id])
    else
      @wiki = Wiki.new
    end

    respond_to do |format|
      format.html { render layout: false}
      format.json { render nothing: true }
    end 
  end  

  def nested_set_menu
    nested_set = Wiki.find_by_sql("WITH RECURSIVE category_tree(id, tag_name, path) AS (
      SELECT id, tag_name, ARRAY[id]
      FROM wikis
      WHERE parent IS NULL
      UNION ALL
      SELECT wikis.id, wikis.tag_name, path || wikis.id
      FROM category_tree
      JOIN wikis ON wikis.parent=category_tree.id
      WHERE NOT wikis.id = ANY(path)
      )
      SELECT * FROM category_tree ORDER BY path")


      
    menu = ""

    nested_set.each do |link|
      menu += ("--" * (link.path.length-1)) + link.tag_name + "<br/>"
    end  

    return menu

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_wiki
      @wiki = Wiki.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def wiki_params
      params.require(:wiki).permit(:title, :tag_name, :user_id, :body, :parent, :version, :deleted)
    end
end
