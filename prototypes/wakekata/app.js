const $=id=>document.getElementById(id);
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths={
 bottle:'<path d="M9 3h6v4l3 4v10H6V11l3-4V3Z"/><path d="M9 7h6M6 13h12M6 18h12"/>',
 tray:'<path d="m3 9 4-5h10l4 5v7l-3 4H6l-3-4V9Z"/><path d="m3 9 3 5h12l3-5M7 8h10"/>',
 basin:'<ellipse cx="12" cy="8" rx="9" ry="4"/><path d="M3 8c0 8 4 12 9 12s9-4 9-12"/><path d="M7 8c2-2 8-2 10 0"/>',
 umbrella:'<path d="M3 12a9 9 0 0 1 18 0c-2-3-4-3-6 0-2-3-4-3-6 0-2-3-4-3-6 0Z"/><path d="M12 3v-1M12 12v7a3 3 0 0 1-6 0"/>',
 plate:'<ellipse cx="12" cy="12" rx="10" ry="7"/><ellipse cx="12" cy="12" rx="6" ry="4"/>',
 battery:'<rect x="5" y="5" width="14" height="17" rx="2"/><path d="M9 5V2h6v3m-2 4-3 5h4l-3 5"/>',
 cap:'<ellipse cx="12" cy="8" rx="9" ry="4"/><path d="M3 8v7c0 5 18 5 18 0V8M7 14v4m4-4v5m4-5v5m3-5v3"/>',
 file:'<path d="M6 2h9l5 5v15H6V2Z"/><path d="M15 2v6h5M9 12h8m-8 4h8"/>',
 bag:'<path d="M6 8h12l3 13H3L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
 straw:'<path d="M8 22 14 8l6-2-1-3-7 3-7 15 3 1Z"/>',
 can:'<ellipse cx="12" cy="4" rx="7" ry="2"/><path d="M5 4v16c0 3 14 3 14 0V4M8 9v8m8-8v8"/>',
 leaf:'<path d="M21 3C9 1 2 9 5 16s16 5 16-13Z"/><path d="M3 22 16 9"/>',
 box:'<path d="m3 7 9-5 9 5v12l-9 4-9-4V7Z"/><path d="m3 7 9 5 9-5m-9 5v11m-4-19 9 5"/>',
 recycle:'<path d="m8 7 4-5 4 5m-4-5v8m8 1 3 6-6 1m6-1-7-4M7 21l-6-1 2-6m-2 6 7-4"/>',
 search:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
 check:'<path d="m5 12 4 4 10-11"/><circle cx="12" cy="12" r="10"/>',
 alert:'<path d="M12 3 1 21h22L12 3Z"/><path d="M12 9v5m0 3v1"/>',
 chevron:'<path d="m9 5 7 7-7 7"/>'
};
function icon(name,cls=''){return '<svg class="'+cls+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(paths[name]||paths.file)+'</svg>';}
let city='osaka';try{const saved=localStorage.getItem('wakekata-city');if(cities[saved])city=saved;}catch{}
let selected=items[0],answers={},mode='popular',candidates=[],listLimit=50,loading=false,loadSequence=0;
const dictionaries={};
function availableItems(){return cities[city].dataset?(dictionaries[city]||[]):items;}
function matchItems(q){const n=normal(q);if(!n)return [];const all=availableItems();const exact=all.filter(i=>[i.name,...(i.aliases||[])].some(a=>normal(a)===n));return exact.length?exact:all.filter(i=>[i.name,...(i.aliases||[])].some(a=>normal(a).includes(n)));}
async function changeCity(){const key=city,seq=++loadSequence;answers={};selected=null;mode='popular';listLimit=50;saveCity();renderList();$('result').innerHTML='<p>分別辞典を読み込んでいます…</p>';$('search-status').textContent='';
try{if(cities[key].dataset&&!dictionaries[key]){loading=true;const response=await fetch(cities[key].dataset);if(!response.ok)throw new Error('load');dictionaries[key]=await response.json();}if(seq!==loadSequence)return;loading=false;renderList();if($('query').value.trim()){search();}else if(!cities[key].dataset){selected=items[0];renderList();renderResult();}else{$('result').innerHTML='<h2>'+cities[key].name+'の分別辞典</h2><p>'+cities[key].count.toLocaleString()+'件の公式データを収録しています。品名を検索するか、一覧から素材・大きさに合う品物を選んでください。</p>'+datasetNotice();}$('search-status').textContent=cities[key].name+'のルールに切り替えました。';}
catch{if(seq!==loadSequence)return;loading=false;renderList();$('result').innerHTML='<h2>読み込みに失敗しました</h2><p>市を選び直すか、公式案内をご確認ください。</p><a href="'+cities[key].home+'" target="_blank" rel="noopener noreferrer">'+cities[key].name+'の公式案内 ↗</a>';}}
function datasetNotice(){const c=cities[city];return c.dataset?'<p class="note">'+escapeHtml(c.attribution)+'</p><p class="note">'+(c.updatedKind.startsWith('page')?'公開ページ更新：'+escapeHtml(c.updated)+'（個別CSVの時点は未記載）':'データの時点：'+escapeHtml(c.updated))+'。現在のルールは公式案内で確認してください。</p>':'<p class="note">この市は20品目の確認済み案内です。</p>';}
function initCities(){
 $('pref').innerHTML=[...new Set(Object.values(cities).map(c=>c.pref))].map(p=>'<option>'+p+'</option>').join('');$('pref').value=cities[city].pref;
 $('city').innerHTML=Object.entries(cities).filter(([,v])=>v.pref===$('pref').value).map(([id,v])=>'<option value="'+id+'">'+v.name+'</option>').join('');$('city').value=city;
}
function saveCity(){try{localStorage.setItem('wakekata-city',city);}catch{}}
function renderList(){
 const all=availableItems();const matches=mode==='all'?all:mode==='search'?candidates:all.slice(0,6);const list=matches.slice(0,listLimit);$('more-button').hidden=matches.length<=listLimit;
 $('list-title').textContent=mode==='all'?'登録品目一覧':mode==='search'?'検索候補':cities[city].dataset?'登録品目の例':'よく調べるもの';
 $('item-list').innerHTML=list.map(i=>'<button class="item-button'+(selected?.id===i.id?' active':'')+'" data-id="'+i.id+'" aria-pressed="'+(selected?.id===i.id)+'">'+icon(i.icon)+'<span>'+escapeHtml(mode==='popular'&&i.id==='pet'?'ペットボトル':mode==='popular'&&i.id==='tray'?'食品トレイ':i.name)+'</span>'+icon('chevron','chevron')+'</button>').join('');
 $('all-button').textContent=mode==='all'?'よく調べるものに戻る':'登録品目をすべて見る（'+all.length.toLocaleString()+'件）';
 $('item-list').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.id,true)));
}
function choose(id,scroll=false){selected=availableItems().find(i=>i.id===id);if(!selected)return;answers={};$('query').value=selected.name;$('search-status').textContent='';renderList();renderResult();if(scroll&&window.matchMedia('(max-width:680px)').matches)$('result').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});}
function sourceLinks(ids){return ids.map((id,index)=>'<a href="'+sources[id].url+'" target="_blank" rel="noopener noreferrer">'+(index===0?cities[city].name+'の公式情報を見る ↗':escapeHtml(sources[id].title)+' ↗')+'</a>').join('');}
function renderResult(){
 const el=$('result');if(!selected)return;
 const r=selected.kind==='official'?{category:selected.category,steps:selected.instructions?[selected.instructions]:['この品目の追加の注意点は、公開データには記載されていません。袋・大きさ・収集方法は公式案内で確認してください。'],note:'公式辞典の分別区分と注意点を表示しています。条件で区分が変わる場合は、注意点を優先して確認してください。',sources:[city],tone:'official'}:ruleFor(city,selected,answers);
 const fields=selected.kind==='official'?[]:conditions(selected,city);
 const options=fields.map(f=>'<fieldset class="confirm"><legend>'+escapeHtml(f.label)+'</legend><div class="options">'+f.options.map(([v,label])=>'<label><input type="radio" name="'+f.key+'" value="'+v+'"'+(answers[f.key]===v?' checked':'')+'><span>'+escapeHtml(label)+'</span></label>').join('')+'</div></fieldset>').join('');
 const toneIcon=r.tone==='official'?'file':r.tone==='check'?'search':r.tone==='care'?'alert':r.tone==='burn'?'bag':'recycle';
 el.innerHTML='<h2>'+escapeHtml(selected.name)+'</h2><p class="locality">'+cities[city].name+'</p><div class="result-band '+r.tone+'">'+icon(toneIcon)+'<span>'+escapeHtml(r.category)+'</span></div>'+(options?'<div class="conditions-wrap">'+options+'</div>':'')+'<h3 class="step-title">'+(r.tone==='official'?'公式データの注意点':r.tone==='check'?'確認のしかた':'出し方の手順')+'</h3><ol class="steps">'+r.steps.map(s=>'<li><span class="step-text">'+escapeHtml(s)+'</span></li>').join('')+'</ol><p class="note">'+escapeHtml(r.note)+'</p><div class="source-row">'+(r.sources.length?sourceLinks(r.sources.slice(0,1)):'')+'<small>情報確認：2026年10月13日</small></div><div class="secondary-sources">'+sourceLinks(r.sources.slice(1))+'</div><a class="calendar-link" href="'+cities[city].calendar+'" target="_blank" rel="noopener noreferrer">'+cities[city].calendarLabel+' ↗</a>'+datasetNotice();
 el.querySelectorAll('input[type=radio]').forEach(input=>input.addEventListener('change',()=>{const key=input.name,val=input.value;answers[key]=val;renderResult();const next=el.querySelector('input[name="'+key+'"][value="'+val+'"]');next?.focus({preventScroll:true});}));
}
function renderEmpty(query,hasCandidates){
 $('result').innerHTML='<div class="empty"><div class="empty-icon">'+icon('search')+'</div><h2 class="empty-title">'+(hasCandidates?'どの品物ですか？':'登録品目が見つかりませんでした')+'</h2><p>'+ (hasCandidates?'一覧から、素材や用途が合う品物を選んでください。':'「'+escapeHtml(query)+'」は登録品目に一致しません。この市では'+availableItems().length.toLocaleString()+'件を収録しています。')+'</p><p class="note">'+(hasCandidates?'品名だけでは素材や用途が決まらないため、候補を自動で決めていません。':'未登録の品物の捨て方は推測していません。短い品名で検索し直すか、自治体の公式案内をご確認ください。')+'</p><a href="'+cities[city].home+'" target="_blank" rel="noopener noreferrer">'+cities[city].name+'の公式ごみ案内を見る ↗</a></div>';
}
function search(){if(loading){$('search-status').textContent='読み込み完了後に検索してください。';return;}listLimit=50;const query=$('query').value.trim();if(!query){$('search-status').textContent='品名を入力してください。';$('query').focus();return;}candidates=matchItems(query);mode='search';selected=null;answers={};const exact=candidates.length===1&&[candidates[0].name,...candidates[0].aliases].some(a=>normal(a)===normal(query));if(exact){choose(candidates[0].id,true);$('search-status').textContent='登録品目に一致しました。';}else{renderList();renderEmpty(query,candidates.length>0);$('search-status').textContent=candidates.length?candidates.length+'件の候補があります。素材・用途が合うものを選んでください。':'登録品目は見つかりませんでした。';}}
$('search-form').addEventListener('submit',e=>{e.preventDefault();search();});
$('pref').addEventListener('change',()=>{city=Object.keys(cities).find(id=>cities[id].pref===$('pref').value);initCities();changeCity();});
$('city').addEventListener('change',()=>{city=$('city').value;changeCity();});
$('all-button').addEventListener('click',()=>{mode=mode==='all'?'popular':'all';listLimit=50;renderList();});
$('more-button').addEventListener('click',()=>{listLimit+=50;renderList();});
$('help-sources').innerHTML=Object.values(cities).map(c=>'<a href="'+c.home+'" target="_blank" rel="noopener noreferrer">'+c.name+'｜'+(c.sourceTitle||'家庭ごみの公式案内')+' ↗</a>'+(c.dataset?'<p class="note">'+escapeHtml(c.attribution)+' '+escapeHtml(c.license)+'／収録'+c.count.toLocaleString()+'件／'+(c.updatedKind.startsWith('page')?'ページ更新（データ時点未記載）':'データ時点')+'：'+escapeHtml(c.updated)+'</p>':'')).join('');
$('help-button').addEventListener('click',()=>$('help').showModal());$('close-help').addEventListener('click',()=>$('help').close());$('help-done').addEventListener('click',()=>$('help').close());$('help').addEventListener('click',e=>{const rect=$('help').getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)$('help').close();});
initCities();if(cities[city].dataset){selected=null;changeCity();}else{renderList();renderResult();}
