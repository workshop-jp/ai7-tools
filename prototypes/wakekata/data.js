// Municipal rules manually reviewed against the linked official pages on 2026-10-13.
const O='https://www.city.osaka.lg.jp/kankyo/page/';
const S='https://www.city.sakai.lg.jp/kurashi/gomi/gomi_recy/bunbetsu/shigen/';
const K='https://www.city.kobe.lg.jp/a04164/kurashi/recycle/gomi/';
const sources={
 op:{title:'プラスチック資源の分け方の例',url:O+'0000008025.html',updated:'2025-05-01'},
 or:{title:'資源ごみの出し方',url:O+'0000369352.html',updated:'2026-04-01'},
 ob:{title:'普通ごみ収集',url:O+'0000009139.html',updated:'2025-10-15'},
 oa:{title:'古紙・衣類の分別収集',url:O+'0000369372.html',updated:'2022-12-12'},
 oe:{title:'電池の回収について',url:O+'0000583216.html',updated:'2026-07-08'},
 sp:{title:'プラスチック製容器包装',url:S+'plastics.html'},
 sr:{title:'ペットボトル',url:S+'petbottle.html',updated:'2021-11-01'},
 sc:{title:'缶・びん',url:S+'kanbin.html',updated:'2026-01-13'},
 sb:{title:'生活ごみ',url:S+'info20230704.html'},
 sn:{title:'粗大ごみ・不燃小物類',url:S+'sodaigomi/index.html'},
 se:{title:'小型充電式電池類（申込制）',url:S+'kogatazyudensikidenti_sutekata.html',updated:'2026-04-01'},
 sex:{title:'小型充電式電池類（拠点回収）',url:S+'judenchikyoten.html',updated:'2026-10-01'},
 kp:{title:'容器包装プラスチック',url:K+'dashikata/bunbetsukubun/hinmokugoto/yokihosoplastic.html'},
 kr:{title:'缶・びん・ペットボトル',url:K+'dashikata/bunbetsukubun/hinmokugoto/kan-bin.html',updated:'2024-10-31'},
 kb:{title:'燃えるごみ',url:K+'dashikata/bunbetsukubun/hinmokugoto/moerugomi.html',updated:'2024-11-26'},
 kn:{title:'燃えないごみ',url:K+'dashikata/bunbetsukubun/hinmokugoto/moenaigomi.html',updated:'2026-04-02'},
 kq:{title:'分別に関するよくあるQ＆A',url:K+'faq/qa.html',updated:'2026-08-31'},
 ke:{title:'小型充電式電池・モバイルバッテリーの出し方',url:K+'dashikata/shushushinai/denchi.html'}
};
const cities={
 osaka:{name:'大阪市',pref:'大阪府',home:O+'0000009337.html',calendar:O+'0000369352.html',calendarLabel:'公式ページから収集曜日・時間を確認'},
 sakai:{name:'堺市',pref:'大阪府',home:S+'index.html',calendar:'https://www.city.sakai.lg.jp/kurashi/gomi/gomi_recy/bunbetsu/chomeiichiran/index.html',calendarLabel:'町名別の収集曜日を確認'},
 kobe:{name:'神戸市',pref:'兵庫県',home:K+'faq/qa.html',calendar:K+'dashikata/bunbetsukubun/hinmokugoto/moerugomi.html',calendarLabel:'公式ページからワケトンカレンダーを確認'}
};
const items=[
 {id:'pet',name:'ペットボトル（飲料用）',aliases:['ペットボトル','ぺっとぼとる','PETボトル','飲料ボトル'],kind:'pet',icon:'bottle'},
 {id:'tray',name:'食品トレイ（プラマーク付き）',aliases:['食品トレイ','食品トレー','トレイ','トレー','肉のトレー'],kind:'pack',icon:'tray'},
 {id:'basin',name:'プラスチック製の洗面器',aliases:['洗面器','せんめんき','プラスチック製の洗面器'],kind:'product',icon:'basin'},
 {id:'umbrella',name:'傘',aliases:['傘','かさ','カサ','折りたたみ傘'],kind:'umbrella',icon:'umbrella'},
 {id:'ceramic',name:'陶器の皿・茶碗',aliases:['陶器','陶器の皿','茶碗','ちゃわん','陶磁器','せともの','皿'],kind:'ceramic',icon:'plate'},
 {id:'battery',name:'モバイルバッテリー',aliases:['モバイルバッテリー','もばいるばってりー','リチウムイオン電池','小型充電式電池','充電池'],kind:'battery',icon:'battery'},
 {id:'cap',name:'ペットボトルのキャップ（プラ製）',aliases:['ペットボトルのキャップ','キャップ','ペットボトルのふた','プラスチックのふた'],kind:'pack',icon:'cap'},
 {id:'label',name:'ペットボトルのラベル（プラ製）',aliases:['ペットボトルのラベル','ラベル'],kind:'pack',icon:'file'},
 {id:'shampoo',name:'シャンプーの空き容器（プラ製）',aliases:['シャンプー','シャンプーボトル','洗剤の空き容器','洗剤ボトル'],kind:'pack',icon:'bottle'},
 {id:'egg',name:'卵パック（プラマーク付き）',aliases:['卵パック','たまごパック','玉子パック'],kind:'pack',icon:'tray'},
 {id:'bag',name:'レジ袋（プラマーク付き）',aliases:['レジ袋','れじぶくろ','プラスチックの袋'],kind:'pack',icon:'bag'},
 {id:'foam',name:'梱包用の発泡スチロール',aliases:['発泡スチロール','はっぽうすちろーる','梱包用の発泡スチロール'],kind:'pack',icon:'tray'},
 {id:'bucket',name:'プラスチック製のバケツ',aliases:['バケツ','ばけつ','プラスチック製のバケツ'],kind:'product',icon:'basin'},
 {id:'file',name:'クリアファイル（プラ製）',aliases:['クリアファイル','くりあふぁいる'],kind:'product',icon:'file'},
 {id:'straw',name:'ストロー（プラ製）',aliases:['ストロー','すとろー','プラスチックストロー'],kind:'product',icon:'straw'},
 {id:'can',name:'飲料用の空き缶',aliases:['空き缶','あきかん','飲料缶','アルミ缶','ビール缶','缶'],kind:'can',icon:'can'},
 {id:'bottle',name:'飲食料用の空きびん',aliases:['空きびん','空き瓶','あきびん','ジャムのびん','酒びん'],kind:'bottle',icon:'bottle'},
 {id:'food',name:'生ごみ',aliases:['生ごみ','なまごみ','食べ残し','野菜くず'],kind:'food',icon:'leaf'},
 {id:'paper',name:'新聞紙',aliases:['新聞紙','新聞','しんぶんし'],kind:'paper',icon:'file'},
 {id:'cardboard',name:'段ボール',aliases:['段ボール','ダンボール','だんぼーる'],kind:'paper',icon:'box'}
];
function normal(s){return String(s).normalize('NFKC').toLowerCase().replace(/[\s　・（）()]/g,'').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));}
function searchItems(q){const n=normal(q);if(!n)return [];const exact=items.filter(i=>[i.name,...i.aliases].some(a=>normal(a)===n));if(exact.length)return exact;return items.filter(i=>[i.name,...i.aliases].some(a=>normal(a).includes(n)));}
function conditions(item,city){
 const out=[];
 if(['pack','product'].includes(item.kind))out.push({key:'clean',label:'汚れは落とせますか？',options:[['yes','きれい・軽く洗えば落ちる'],['no','洗っても落ちない'],['unknown','わからない']]});
 if(item.kind==='pack')out.push({key:'mark',label:'プラ製の容器包装ですか？',options:[['yes','プラマーク・プラ製を確認'],['unknown','素材・マークが不明']]});
 if(item.kind==='product'&&city==='osaka')out.push({key:'pure',label:'素材と厚さを確認',options:[['yes','プラ100％・硬質部分は厚さ5mm以下'],['no','金属・ゴム等を含む／厚さ5mm超'],['unknown','わからない']]});
 if(['product','ceramic','umbrella'].includes(item.kind)||(item.kind==='pack'&&(city==='osaka'||item.id==='foam'))){
 let opts=city==='kobe'?[['small','45L指定袋に入り、単品5kg以下'],['large','袋に入らない／単品5kg超'],['unknown','わからない']]:[['small',item.kind==='umbrella'?(city==='osaka'?'棒状で1m以内':'通常の家庭用の傘'):'最大の辺・直径が30cm以内'],['large',item.kind==='umbrella'?(city==='osaka'?'棒状で1mを超える':'特に大きい傘・特殊な傘'):'最大の辺・直径が30cm超'],['unknown','わからない']];
 if(city==='kobe'&&item.kind==='umbrella')opts=[['small','一般的な傘（約1m以内）'],['large','特に大きい傘・特殊な傘'],['unknown','わからない']];
 out.push({key:'size',label:'大きさを確認',options:opts});
 }
 if(item.kind==='battery')out.push({key:'damage',label:'膨張・破損・水濡れなどはありますか？',options:[['no','異常なし'],['yes','異常あり'],['unknown','わからない']]});
 return out;
}
function ruleFor(city,item,answers={}){
 const kind=item.kind;
 let r={category:'',steps:[],note:'',sources:[],tone:'resource'};
 const burn=city==='osaka'?'普通ごみ':city==='sakai'?'生活ごみ':'燃えるごみ';
 const burnSrc=city==='osaka'?'ob':city==='sakai'?'sb':'kb';
 const resource=city==='osaka'?'資源ごみ':city==='sakai'?'ペットボトル（資源）':'缶・びん・ペットボトル';
 const wrap=city==='osaka'?'プラスチック資源':city==='sakai'?'プラスチック製容器包装':'容器包装プラスチック';
 const bag=city==='osaka'?'透明・半透明の袋で、地域の収集時間までに。':city==='sakai'?'45L以下の無色透明・白色半透明の袋で、収集日の朝8時までに。':'分別区分に合う指定袋で、収集日の朝5時〜8時に。';
 const unknown=(note,src)=>({category:'条件を確認してください',steps:['素材・大きさ・状態を確認してから分別する'],note,sources:src,tone:'check'});
 const pending=conditions(item,city).some(c=>!answers[c.key]||answers[c.key]==='unknown');
 if(pending)return unknown('下の確認項目を選ぶと、条件に合う出し方を表示します。判断がつかない場合は、市の公式窓口で確認してください。',kind==='battery'?[city==='osaka'?'oe':city==='sakai'?'se':'ke']:kind==='pack'?[city==='osaka'?'op':city==='sakai'?'sp':'kp']:kind==='product'?[city==='osaka'?'op':burnSrc]:[city==='osaka'?'ob':city==='sakai'?'sn':'kq']);
 if(kind==='battery'){
 r.category=city==='osaka'?'環境事業センターで回収':city==='sakai'?'小型充電式電池類（申込制）':'電池類回収ボックス';r.tone='care';r.sources=[city==='osaka'?'oe':city==='sakai'?'se':'ke'];
 r.steps=city==='osaka'?['普通ごみ・資源ごみの袋に入れない','環境事業センターに持ち込む、または訪問回収を申し込む']:city==='sakai'?['生活ごみ・資源ごみに混ぜない','家庭ごみ受付センターに電話で回収を申し込む']:['クリーンステーションに出さない','電極にテープを貼る','電池類回収ボックスに持ち込む'];
 if(answers.damage==='yes'){
 r.category=city==='osaka'?'環境事業センターへ相談・回収':city==='sakai'?'電話で回収を申し込む':'環境局事業所へ相談';
 r.steps=['通常のごみ袋や一般の回収ボックスに入れない',city==='osaka'?'担当の環境事業センターに回収方法を相談する':city==='sakai'?'家庭ごみ受付センターに異常の状態を伝えて申し込む':'お住まいの区の環境局事業所へ相談して持ち込む'];
 r.note='膨張・破損した電池を無理に分解・圧迫しないでください。受入方法を事前に確認してください。';
 } else r.note=city==='sakai'?'異常がなく、回収ボックスの投入口に入る対象品目は拠点回収も利用できます。詳しくは公式案内へ。':'電池が外せない製品は無理に分解せず、公式ページの対象品目を確認してください。';
 if(city==='sakai')r.sources.push('sex');return r;
 }
 if(answers.size==='large'){
 if(city==='sakai'&&kind==='product')return unknown('30cmを超えるプラスチック製品でも、45L以下の袋に入り口を結べれば生活ごみで出せる場合があります。品目と寸法を公式窓口で確認してください。',['sb']);
 if(city==='sakai'&&kind==='umbrella')return unknown('傘は不燃小物類の例に掲載されています。特殊な大きさの場合は受付センターで確認してください。',['sn']);
 if(city==='kobe'&&kind==='umbrella')return unknown('通常の傘には指定袋から多少はみ出せる特例があります。特殊な大きさは環境局事業所へ確認してください。',['kq']);
 return {category:city==='kobe'?'大型ごみ':'粗大ごみ',tone:'care',steps:['通常の収集には出さず、市の公式案内で申し込む','品目・大きさによる手数料を確認する'],note:'予約が必要です。費用・排出場所・収集日は公式案内で確認してください。',sources:[city==='osaka'?'ob':city==='sakai'?'sn':'kq']};
 }
 if(kind==='pet'){
 r.category=resource;r.sources=[city==='osaka'?'or':city==='sakai'?'sr':'kr'];r.steps=['キャップとラベルを外す（プラ製は'+wrap+'へ）','中を軽くすすぎ、できるだけつぶす',city==='kobe'?'「缶・びん・ペットボトル」の指定袋へ、直接入れる':city==='sakai'?'ペットボトル用の袋に分ける':'中身の見える袋に入れる'];
 r.note=city==='osaka'?'飲料・酒類・しょうゆ等でPETマークのあるものが対象。地域の新たなペットボトル回収がある場合はその回収日へ。':city==='sakai'?'飲料・酒類・しょうゆ等でPETマークのあるものが対象。食用油・ソース・ドレッシングの容器や汚れたものは生活ごみへ。':'飲食料用でPETマークのあるものが対象。キャップ下のリングは外さなくて構いません。';
 return r;
 }
 if(['pack','product'].includes(kind)){
 const isResource=answers.clean==='yes'&&(kind==='pack'||city==='osaka'&&answers.pure==='yes');
 r.category=isResource?wrap:burn;r.tone=isResource?'resource':'burn';r.sources=[kind==='pack'||city==='osaka'?city==='osaka'?'op':city==='sakai'?'sp':'kp':burnSrc];
 if(!isResource)r.sources.push(burnSrc);
 r.steps=isResource?['中身を使い切り、汚れを落とす','簡単に外せる紙のラベル・シールを取る',city==='osaka'?'中身の見える袋に直接入れる':city==='sakai'?'他の分別品目と混ぜず、専用の袋に分ける':'「容器包装プラスチック」の指定袋に入れる']:['資源用の袋には混ぜない',bag];
 r.note=kind==='product'?(city==='osaka'?'プラ100％の製品が対象。刃物付き、ひも状、厚さ5mm超の硬質製品等は対象外。電子機器・電池を混ぜないでください。':city==='sakai'?'製品そのものはプラスチック製容器包装の対象外です。通常サイズでも袋に入らない場合は公式窓口で確認してください。':'製品そのものは容器包装プラスチックの対象外です。45L指定袋に入り、単品5kg以下が対象。'):('軽く洗っても汚れが落ちない場合は'+burn+'です。素材が違う場合はこの結果を使わず確認してください。');return r;
 }
 if(kind==='umbrella'||kind==='ceramic'){
 r.category=city==='osaka'?'普通ごみ':city==='sakai'?'不燃小物類（無料・申込制）':'燃えないごみ';r.tone='care';r.sources=[city==='osaka'?'ob':city==='sakai'?'sn':kind==='umbrella'?'kq':'kn'];
 r.steps=city==='sakai'?['生活ごみには入れない','家庭ごみ受付センターに回収を申し込む']:kind==='umbrella'?(city==='osaka'?['片側を袋に差し込む、または「不用品」と表示する','棒状で1m以内の傘を普通ごみに出す']:['45Lの「燃えないごみ」指定袋にしっかり差し込む','多少突き出ても、袋の口をしっかり結ぶ']):['割れたものは厚紙・新聞紙などで包む','袋に「キケン」と表示する',bag];
 r.note=kind==='ceramic'?'この結果は陶器・磁器の食器用です。プラスチック製・金属製の食器は素材別に確認してください。':city==='sakai'?'家庭用の傘は不燃小物類の例として掲載されています。申し込み時に本数を確認してください。':'特殊な大きさ・素材の傘は公式窓口で確認してください。';return r;
 }
 if(kind==='can'||kind==='bottle'){
 r.category=city==='osaka'?'資源ごみ':city==='sakai'?'缶・びん（資源）':'缶・びん・ペットボトル';r.sources=[city==='osaka'?'or':city==='sakai'?'sc':'kr'];
 r.steps=['中身を空にして軽くすすぐ',kind==='bottle'?'キャップを外して素材別に分ける':city==='sakai'?'缶をつぶさずに出す':'飲食料用の缶とスプレー缶は区別する',bag];
 r.note=kind==='bottle'?'この結果は飲食料用の空きびんです。割れたびん・ガラス食器・化粧品のびんは、同じ扱いとは限りません。':'スプレー缶・カセットボンベ・塗料缶は、この空き缶の結果を使わず公式案内で確認してください。';return r;
 }
 if(kind==='food'){r.category=burn;r.tone='burn';r.sources=[burnSrc];r.steps=['水気をしっかり切る',bag];r.note='液体の油・大量のごみ・事業で出たごみは、別の確認が必要です。';return r;}
 if(kind==='paper'){
 r.category=city==='osaka'?'古紙・衣類':'資源集団回収';r.sources=[city==='osaka'?'oa':city==='sakai'?'sb':'kq'];r.steps=['新聞と段ボールを分ける','ひもでまとめて地域の回収へ出す'];r.note=city==='osaka'?'古紙・衣類の収集日に、種類ごとに分けて出してください。':city==='sakai'?'地域の回収が使えない場合は、古紙回収拠点への持ち込みを検討してください。':'地域の資源集団回収が使えない場合は、燃えるごみの指定袋で出せます。';return r;
 }
 return unknown('登録のない品目は、公式ページで確認してください。',[]);
}
if(typeof module!=='undefined')module.exports={cities,items,sources,normal,searchItems,conditions,ruleFor};
