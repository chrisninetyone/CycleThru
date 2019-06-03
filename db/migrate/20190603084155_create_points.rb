class CreatePoints < ActiveRecord::Migration[5.2]
  def change
    create_table :points do |t|
      t.float :long
      t.float :lat
      t.string :name
      t.string :category
      t.text :description
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
