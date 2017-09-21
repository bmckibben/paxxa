class WikisController < ApplicationController
  before_action :set_wiki, only: [:show, :edit, :update, :destroy]

  # GET /wikis
  # GET /wikis.json
  def index
    @wikis = Wiki.where("default_sort > 0 and (deleted is null or deleted is false)").order(default_sort: :asc)
    @menu = view_context.nested_set(view_context.query_menu,'tree-menu', 0)
    #might change recents to where < one month?
    @recents = Wiki.all.order(updated_at: :desc).limit(100)
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

  def test
     @wikis = WikiTag.all
  end

  def search

    if params[:search_text].present?
      @keywords = params[:search_text]
      wiki_search_term = WikiSearchTerm.new(@keywords)
      @wikis = Wiki.where(
      wiki_search_term.where_clause,
      wiki_search_term.where_args).
      order(wiki_search_term.order)
    else
      @wikis = []
    end


    @menu = view_context.nested_set(view_context.query_menu,'tree-menu', 0)
    #might change recents to where < one month?
    @recents = Wiki.all.order(updated_at: :desc).limit(100)
    render template: "wikis/index"
  end  

  def wikilist
     @wikis = Wiki.all
  end

  # POST /wikis
  # POST /wikis.json
  def create
    @wiki = Wiki.new(wiki_params)
    @wiki.user_id = current_user.id
    @wiki_id = 0

    respond_to do |format|    
      if @wiki.save
        create_parent_tag(@wiki)
        format.html { redirect_to wikis_url, notice: 'Wiki was successfully created.' }
        format.js { render "wikis/display" }
      else
        format.html { render :new }
        format.json { render json: @wiki.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /wikis/1
  # PATCH/PUT /wikis/1.json
  def update

    @wiki_id = @wiki.id
    respond_to do |format|
      if @wiki.update(wiki_params)
        format.html { redirect_to wikis_url, notice: 'Wiki was successfully updated.' }
        format.js { render "wikis/display" }
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
      format.html { redirect_to wikis_wikilist_url, notice: 'Wiki was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def wiki_form
    @wikis = Wiki.all.order(title: :asc)
    @new_journal = false

    if params[:wiki_id] != "0"
      @wiki = Wiki.find(params[:wiki_id])
    else
      @wiki = Wiki.new
    end

    if params[:wiki_type] == "j"
      @wiki.title = Time.now.to_formatted_s(:stardate)
      @new_journal = true
    end  

    respond_to do |format|
      format.html { render layout: false}
      format.json { render nothing: true }
    end 
  end  

  def re_display
    @wiki = Wiki.find(params[:wiki_id])

    respond_to do |format|
      format.html { render layout: false}
      format.json { render nothing: true }
    end 
  end 

  def wiki_disable
    
    wiki = Wiki.find(params[:wiki_id]);
    wiki.deleted = true;

    respond_to do |format|
      if wiki.save
        format.html { render nothing: true }
        format.js { render nothing: true }
      else
        format.html { render nothing: true }
        format.js { render nothing: true }
      end
    end

  end

  private

    def create_parent_tag(wiki)
      if !wiki.parent.nil?
        wiki_tag = WikiTag.new({:wiki_id => wiki.id, :tag_id => wiki.parent})
        wiki_tag.save
      elsif wiki.title.match('\d{4}\.')
        journal = Wiki.where("title = 'Journal'").first
        #raise journal.inspect
        if !journal.nil?
          wiki_tag = WikiTag.new({:wiki_id => wiki.id, :tag_id => journal.id})
          wiki_tag.save            
        end
      else
        Rails.log.info("No tag for you!")  
        Rails.log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~")  
      end

    end  

    # Use callbacks to share common setup or constraints between actions.
    def set_wiki
      @wiki = Wiki.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def wiki_params
      params.require(:wiki).permit(:title, :user_id, :body, :parent, :version, :deleted, :default_sort)
    end



end
