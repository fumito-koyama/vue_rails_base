## Docker + Rails + Vue.js
このリポジトリはyarnとwebpack(webpackerではない)、Vue.jsを用いたフロント開発と、railsのバックエンドを分離したdockerでの開発環境を簡単に作れる自分用のリポジトリです。 


クローンしたら以下のように進める(適宜フォルダ名を変える)
### railsアプリを作成する
```sh
docker-compose run --rm rails new アプリ名 -d　mysql -B -s　-S　--skip-turbolinks　--skip-test
```

- `./webpack_bundle_helper.rb`を`./app/helper`下に配置する。

- `./config/database.yml`の一部分を以下のように書き換える
```yml
username: root
password: password
host: db
```

### 起動

```
docker-compose up -d
```

- bash
```
docker-compose exec web bash
```    

起動するとlocalhostにrailsの画面が表示される。
### Rspec関連
```sh
# in bash
bin/rails g rspec:install
```
- `config/application.rb`に以下を追記
```ruby
config.generators do |g|
      g.test_framework :rspec,
        fixtures: false,
        view_specs: false,
        helper_specs: false,
        routing_specs: false
end
```