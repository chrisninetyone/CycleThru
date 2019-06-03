class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.float :start_long
      t.float :start_lat
      t.float :end_long
      t.float :end_lat
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
