# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_06_07_072826) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "photos", force: :cascade do |t|
    t.bigint "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.index ["post_id"], name: "index_photos_on_post_id"
  end

  create_table "points", force: :cascade do |t|
    t.float "long"
    t.float "lat"
    t.string "name"
    t.string "category"
    t.text "description"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "photo"
    t.index ["user_id"], name: "index_points_on_user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.bigint "point_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["point_id"], name: "index_posts_on_point_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "trip_points", force: :cascade do |t|
    t.bigint "trips_id"
    t.bigint "points_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["points_id"], name: "index_trip_points_on_points_id"
    t.index ["trips_id"], name: "index_trip_points_on_trips_id"
  end

  create_table "trips", force: :cascade do |t|
    t.float "start_long"
    t.float "start_lat"
    t.float "end_long"
    t.float "end_lat"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_trips_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "country"
    t.string "provider"
    t.string "uid"
    t.string "facebook_picture_url"
    t.string "token"
    t.datetime "token_expiry"
    t.string "bio"
    t.string "authentication_token", limit: 30
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true
    t.string "avatar"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "photos", "posts"
  add_foreign_key "points", "users"
  add_foreign_key "posts", "points"
  add_foreign_key "posts", "users"
  add_foreign_key "trip_points", "points", column: "points_id"
  add_foreign_key "trip_points", "trips", column: "trips_id"
  add_foreign_key "trips", "users"
end
