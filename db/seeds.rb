# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(
  name: "admin",
  password: "admin10",
  email: "admin@admin10",
  profile: "",
  is_active: "true",
  admin: "true",
)
User.create!(
  name: "T.kazu",
  password: "tttkkk",
  email: "tttkkk@gmail.com",
  profile: "都内在住の人間。趣味は絵を描いたり漫才をしたりすることだ。暗渠やトマソンが好き。よろしくな。",
  is_active: "true",
)
User.create!(
  name: "H.kudou",
  password: "hhhkkk",
  email: "hhhkkk@gmail.com",
  profile: "某広告会社で営業やってます。自分の記録用に投稿してゆきますので悪しからず。",
  is_active: "true",
)
User.create!(
  name: "O.asahi",
  password: "oooaaa",
  email: "oooaaa@gmail.com",
  profile: "岩手出身CAやってます！毎日チョベリグなんですけど〜〜どうなっちゃうわけ~~~~!!!???",
  is_active: "true",
)

Post.create!(
  user_id: "1",
  body: "これはseedです",
  road: File.open('./app/assets/images/no-image.jpg'),
)
Map.create!(
  latitude: "50.119303134699045",
  longitude: "-92.67087524019047",
  post_id: "1",
)
