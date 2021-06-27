# frozen_string_literal: true

user1 = User.create(name: 'Test User 1', device_id: '1234', latitude: 41.9707917, longitude: -87.7219368)
user2 = User.create(name: 'Test User 2', device_id: '4321', latitude: 37.7749917, longitude: 122.4194683)

Post.create(text: 'Post 1', user_id: user1.id, latitude: 41.9707917, longitude: -87.7219368, emotion_id: 1)
Post.create(text: 'Post 2', user_id: user1.id, latitude: 41.9707917, longitude: -87.7219368, emotion_id: 2)
Post.create(text: 'Post 3', user_id: user2.id, latitude: 37.7749917, longitude: 122.4194683, emotion_id: 3)
Post.create(text: 'Post 4', user_id: user2.id, latitude: 37.7749917, longitude: 122.4194683, emotion_id: 4)
