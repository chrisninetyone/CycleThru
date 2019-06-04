
User.destroy_all
Trip.destroy_all
TripPoint.destroy_all
Photo.destroy_all
Post.destroy_all
Point.destroy_all

puts "creating user 1/5 >>"
user1 = User.create(first_name: "Lance",
            last_name: "Armstrong",
            username: "Livestrong",
            email: "lstrong@gmail.com",
            country: "USA",
            password: "123456"
            )
byebug

puts "creating point 2/5 >>"
point1 = Point.create(long: 115.123013,
             lat: -8.632941,
             name: "Stopping piont",
             category: "scenic",
             description: "great stop off point",
             user_id: user1[:id]
             )

# Longitude = East / West
# Latitude = North / South
puts "creating trip 3/5 >>"
trip1 = Trip.create(user_id: user1[:id],
            start_long: 115.123616,
            start_lat: -8.648899,
            end_long: 115.123013,
            end_lat: -8.632941
            )


# puts "creating post 4/5 >>"
# post1 = Post.create(user_id: user1[:id],
#             points_id: point1[:id],
#             title: "Scenic",
#             content: "Great picture opportunity. Highly recommended."
#             )

# puts "creating photo 5/5 >>"
# photo1 = Photo.create(posts_id: post1[:id],
#              image: "scenic_1.png")
