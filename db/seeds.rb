Photo.destroy_all
Post.destroy_all
Trip.destroy_all
Point.destroy_all
User.destroy_all

puts "<< creating 3 users (seed 1/3) >>"
user1 = User.create(remote_avatar_url: "https://images.unsplash.com/photo-1482636488340-23968688f565?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200",
                    first_name: "Lance",
                    last_name: "Armstrong",
                    email: "user1@gmail.com",
                    country: "USA",
                    password: "123456"
                    )

user2 = User.create(remote_avatar_url: "https://images.unsplash.com/photo-1470299067034-07c696e9ef07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200",
                    first_name: "Eddy",
                    last_name: "Merckx",
                    email: "user2@gmail.com",
                    country: "Belgium",
                    password: "123456"
                    )

user3 = User.create(remote_avatar_url: "https://images.unsplash.com/photo-1533561052604-c3beb6d55b8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200",
                    first_name: "Binard",
                    last_name: "Hinault",
                    email: "user3@gmail.com",
                    country: "France",
                    password: "123456"
                    )
puts "user creation complete"

puts "creating 3 user points (seed 2/3) >>"
point1 = Point.create(long: 115.123013,
                      lat: -8.632941,
                      name: "Stopping Piont",
                      category: "scenic",
                      description: "great stop off point",
                      user_id: user1[:id]
                      )

point2 = Point.create(long: 115.194835,
                      lat: -8.626617,
                      name: "Shaman Stop",
                      category: "Holistic",
                      description: "Visit this shaman, changed my life",
                      user_id: user1[:id]
                      )

point3 = Point.create(long: 115.169258,
                      lat: -8.672442,
                      name: "Food Cart",
                      category: "Restaurant",
                      description: "You won't find this food in a restaurant",
                      user_id: user2[:id]
                      )

puts "point creation complete"
# Longitude = East / West
# Latitude = North / South
puts "creating 4 trips (seed 3/3) >>"
Trip.create(user_id: user1[:id],
            start_long: 115.123600,
            start_lat: -8.648850,
            end_long: 115.123200,
            end_lat: -8.632740
            )

Trip.create(user_id: user1[:id],
            start_long: 115.123000,
            start_lat: -8.648000,
            end_long: 115.123000,
            end_lat: -8.632000
            )

Trip.create(user_id: user2[:id],
            start_long: 115.150135,
            start_lat: -8.647664,
            end_long: 115.146852,
            end_lat: -8.660551
            )

Trip.create(user_id: user3[:id],
            start_long: 115.178991,
            start_lat: -8.670532,
            end_long: 115.196064,
            end_lat: -8.637097
            )
puts "trip creation complete"
puts "all seed files loaded"

# puts "creating post 4/5 >>"
# post1 = Post.create(user_id: user1[:id],
#             points_id: point1[:id],
#             title: "Scenic",
#             content: "Great picture opportunity. Highly recommended."
#             )

# puts "creating photo 5/5 >>"
# photo1 = Photo.create(posts_id: post1[:id],
#              image: "scenic_1.png")

