class CreateTripPoints < ActiveRecord::Migration[5.2]
  def change
    create_table :trip_points do |t|
      t.references :trips, foreign_key: true
      t.references :points, foreign_key: true

      t.timestamps
    end
  end
end
