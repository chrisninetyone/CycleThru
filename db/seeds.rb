require 'faker'

Photo.destroy_all
Post.destroy_all
Trip.destroy_all
Point.destroy_all
User.destroy_all

category_array = ["Food", "Camping", "Bike Stop", "Photo", "Holistic"]

puts 'Creating 50 users..'
10.times do
  p Faker::Name.first_name
  user = User.new(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    country: Faker::Address.country,
    password: Faker::Internet.password
    )
  user.save

puts "user creation complete"

puts "creating 5 fake trips"
3.times do
  start_long = Faker::Address.longitude
  start_lat = Faker::Address.latitude
  end_array = [-2.0, -1.0, 1.0, 2.0]
  trip = Trip.new(
    user_id: user.id,
    start_long: start_long,
    start_lat: start_lat,
    end_long: start_long + end_array.sample,
    end_lat: start_lat + end_array.sample
    )
  trip.save
puts "trip creation complete"

  end
end

Trip.all.each do |trip|

puts 'creating 5 user points'
3.times do
  point = Point.new(
    long: rand(trip.start_long..trip.end_long),
    lat: rand(trip.start_lat..trip.end_lat),
    name: Faker::Address.community,
    category: category_array.sample,
    description: Faker::GreekPhilosophers.quote,
    user_id: User.all.sample.id,
    )
  point.save

puts "point creation complete"

puts 'creating 5 posts per point'
3.times do
  post = Post.new(
    user_id: User.all.sample.id,
    point_id: point.id,
    title: "Scenic",
    content: "Great picture opportunity. Highly recommended.",
    )
  post.save
  puts "post creation complete"

# photo_1 = Rails.root + "/app/assets/images/seed/photo_1.jpg"
# photo_2 = Rails.root + "/app/assets/images/seed/photo_2.jpg"
# photo_3 = Rails.root + "/app/assets/images/seed/photo_3.jpg"
# photo_array = [photo_1, photo_2, photo_3]
  puts 'creating photos'
  3.times do
    photo = Photo.new(
      post_id: post.id,
      remote_image_url: "https://images.unsplash.com/photo-1500110417562-de4124b49dac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
      )
photo.save
      end
    end
  end
end

# puts "creating photo 5/5 >>"
# photo1 = Photo.create(posts_id: post1[:id],
#              image: "scenic_1.png")

puts "all seed files loaded"
