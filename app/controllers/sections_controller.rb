class SectionsController < InheritedResources::Base

  def edit_note_modal
  	@section = Section.find(params[:section_id])

  	if !params[:note_id].nil?
  		@note = @section.section_notes.find(params[:note_id])
  	else
  		@note = @section.section_notes.build()
  	end		
  	render 'edit_note_modal.js.erb'
  end

  private

    def section_params
      params.require(:section).permit(:title, :sequence, :summary, :body, :throughline, :resolution, :conflict)
    end
end
