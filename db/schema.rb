# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_09_29_202532) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "emotions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string "text"
    t.integer "user_id"
    t.integer "emotion_id"
    t.float "latitude"
    t.float "longitude"
    t.boolean "is_active", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "device_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.float "latitude"
    t.float "longitude"
  end

  create_table "weactions", force: :cascade do |t|
    t.integer "post_id"
    t.integer "user_id"
    t.integer "emotion_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "is_match", default: false
    t.boolean "is_active", default: true
  end

  create_table "weefs", force: :cascade do |t|
    t.boolean "is_active", default: true
    t.bigint "weactor_id", null: false
    t.bigint "weactee_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["weactee_id"], name: "index_weefs_on_weactee_id"
    t.index ["weactor_id"], name: "index_weefs_on_weactor_id"
  end

end
