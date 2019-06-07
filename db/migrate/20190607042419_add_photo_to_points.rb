class AddPhotoToPoints < ActiveRecord::Migration[5.2]
  def change
    add_column :points, :photo, :string
  end
end
