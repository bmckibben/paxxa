class StoriesController < InheritedResources::Base

  private

    def story_params
      params.require(:story).permit(:title, :subtitle, :abbreviated_title, :short_summary, :long_summary, :word_count)
    end
end

