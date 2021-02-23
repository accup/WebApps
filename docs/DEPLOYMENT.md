# デプロイの方法

## デプロイの例
プロジェクトルートで以下を実行します。
```
$ npm run generate
? Which app do you develop? BeatsPerMinute
$ npm run generate
? Which app do you develop? ShapeN
$ npm run deploy
```

## Q&A
### PWA用のアイコンが更新されない
上記手順だけではPWAのアイコンが更新されないことがあります。
アイコンのキャッシュが各アプリケーションディレクトリ `app/<AppName>/` 中の `node_modules/pwa/icon/` に生成されるため、キャッシュディレクトリを削除して再度 `npm run generate` を実行し直してください。
