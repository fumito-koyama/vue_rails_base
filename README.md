# Docker + Rails + Vue.js
このリポジトリはyarnとwebpack(webpackerではない)、Vue.jsを用いたフロント開発と、railsのバックエンドを分離したdockerでの開発環境を簡単に作れる自分用のリポジトリです。 

## 初期処理
クローンしたら以下のように進める(適宜フォルダ名を変える)
### railsアプリを作成する
作成する時、上書きするかを聞かれるため全てNo
```sh
docker-compose run web bundle install

docker-compose run web rails new . --database=mysql -B -s　-S -J --skip-turbolinks　--skip-test
```

- `./config/database.yml`の一部分を以下のように書き換える
```yml
username: root
password: password
host: db
```

#### Rspec関連
```sh
docker-compose run bin/rails g rspec:install
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
#### annotate
```sh
docker-compose run bin/rails g annotate:install
```

----
## 起動

```
docker-compose up -d
```

#### bash
```
docker-compose exec web bash
```

#### その他

- rubocop
```sh
rubocop ファイル名
```

- 

### rails と Vue.jsの連携

`./app/views/layouts/application.rb`のヘッダーを以下に書き換え

```erb
<%= csrf_meta_tags %>
<%= csp_meta_tag %>

<%= javascript_bundle_tag 'stylesheet' %>
<%= stylesheet_bundle_tag 'javascript' %>
<%= stylesheet_bundle_tag 'stylesheet' %>
<%= javascript_bundle_tag 'javascript' %>
```

- `./webpack_bundle_helper.rb`を`./app/helper`下に配置する。

bashで以下を実行
```
bin/rails g controller StaticPages top --skip-test-framework --skip-assets --skip-helper
```

`./config/route.rb`に追記
```rb
root 'static_pages#top'
```

これでlocalhostにVueで作ったページが表示される。