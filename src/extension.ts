import { SourceCode } from 'eslint';
//vscodeの機能を使用可能に
import * as vscode from 'vscode';

//拡張機能を扱うための定義
export function activate(context: vscode.ExtensionContext){
const omikujiFigures = {
	 '大吉': 'https://2.bp.blogspot.com/-q62M2UFmkwQ/UZNyKgFFdNI/AAAAAAAASiI/_cZv1Si4jWE/s400/syougatsu2_omikuji.png',
    '吉': 'https://2.bp.blogspot.com/-27IG0CNV-ZE/VKYfn_1-ycI/AAAAAAAAqXw/fr6Y72lOP9s/s400/omikuji_kichi.png',
    '中吉': 'https://3.bp.blogspot.com/-_z-n-7gO3KA/T3K7MU3MdGI/AAAAAAAAE-k/8qs-jxqS4LE/s400/omikuji_chuukichi.png',
    '小吉': 'https://3.bp.blogspot.com/-nZt5pjGWT9E/T3K7TJ4wEZI/AAAAAAAAE_E/c1X2-N54EYo/s400/omikuji_syoukichi.png',
    '末吉': 'https://3.bp.blogspot.com/-JLNa8mwZRnU/T3K7StR-bEI/AAAAAAAAE-8/rQrDomz5MSw/s400/omikuji_suekichi.png',
    '凶': 'https://4.bp.blogspot.com/-qCfF4H7YOvE/T3K7R5ZjQVI/AAAAAAAAE-4/Hd1u2tzMG3Q/s400/omikuji_kyou.png',
    '大凶': 'https://2.bp.blogspot.com/-h61ngruj0tE/T3K7RDUWmPI/AAAAAAAAE-0/KXtPY8fDwco/s400/omikuji_daikyou.png'
  };
    function getWebviewContent(omikujiResult: keyof typeof omikujiFigures) {
    return `<!DOCTYPE html>
  <html lang="ja">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
      <img src="${omikujiFigures[omikujiResult]}" />
	  <p href="test/runTest.ts">画面遷移</p>
  </body>
  </html>`;
  }
	context.subscriptions.push(
		//第1引数にコマンド名で第2引数で処理
		vscode.commands.registerCommand('vscode-omikuji.omikuji',async()=>{
			const omikujiCandidates = ['大吉','吉','中吉','小吉','末吉','凶','大凶']as const;		//as constとは？
			const omikujiResult = omikujiCandidates[Math.floor(Math.random()*omikujiCandidates.length)];
			const name = await vscode.window.showInputBox({
				title:'あなたの名前は？'
			});
			if(name !== undefined){
				//アプリ内でサイト環境を作成する(引数には環境の詳細設定内容が入る)
				const panel = vscode.window.createWebviewPanel('omikuji',`${name}さんの運勢は${omikujiResult}です！`,vscode.ViewColumn.Two,{enableScripts: true});
				panel.webview.html = getWebviewContent(omikujiResult);
			}
		}));
	//
	const button = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right,
		0
	);
	button.command = 'vscode-omikuji.omikuji';
	button.text = 'おみくじを引く',
	//コマンドがつかえるようになる
	context.subscriptions.push(button);
	button.show();
}


