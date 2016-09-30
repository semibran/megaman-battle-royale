function random(min, max, step){
	if(max === undefined){
		max = min;
		min = 0;
	}
	if(step === undefined)step = 1;
	return Math.round(Math.random()*(max-min))+min;
}

var canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = 256;
canvas.height = 224;
document.body.appendChild(canvas);

// var audio = document.createElement('audio');
// audio.id = 'audio';
// audio.src = 'snd/select.wav';
// audio.loop = true;
// audio.play();

var ctx = canvas.getContext('2d');
ctx.rect(0, 0, canvas.width, canvas.height);

var tileSize = 16;
var tileSheet = new Image();
var charSheet = new Image();
var effectSheet = new Image();
var lifebarSheet = new Image();
var lifeSheet = new Image();
var orbSheet = new Image();
var alphabetSheet = new Image();
var menuSheet = new Image();
var frameSheet = new Image();
var portraitSheet = new Image();
var selectSheet = new Image();
var explosionSheet = new Image();
var enemySheet = new Image();
tileSheet.src = 'img/tiles.png';
charSheet.src = 'img/chars.png';
effectSheet.src = 'img/effects.png';
lifebarSheet.src = 'img/lifebars.png';
lifeSheet.src = 'img/lives.png';
orbSheet.src = 'img/orbs.png';
alphabetSheet.src = 'img/alphabet.png';
menuSheet.src = 'img/menu.png';
frameSheet.src = 'img/frames.png';
portraitSheet.src = 'img/portraits.png';
selectSheet.src = 'img/select.png';
explosionSheet.src = 'img/explosion.png';
enemySheet.src = 'img/enemies.png';
portraitIndex = {};
portraitNames = ['proto', 'mega', 'cut', 'guts', 'ice', 'bomb', 'fire', 'elec', 'metal', 'air', 'bubble', 'quick', 'crash', 'flash', 'heat', 'wood', 'needle', 'magnet', 'gemini', 'hard', 'top', 'snake', 'spark', 'shadow'];
for(var i = 0; i < portraitNames.length; i ++)portraitIndex[portraitNames[i]] = {x:i, y:0};
stageIndex = {};
stageNames = ['bomb', 'elec', 'guts', 'ice', 'cut', 'fire', '1wily1', '1wily4', 'heat', 'bubble', 'flash', 'quick', 'wood', 'metal', 'air', 'crash', '2wily1', 'random', 'back'];
for(var i = 0; i < stageNames.length; i ++)stageIndex[stageNames[i]] = {x:i, y:2};
var charsCoords = {};
var charsOrder = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!<> ';
var x = 0;
var y = 0;
var charsWidth = 80;
var charsHeight= 36;
for(var i = 0; i < charsOrder.length; i ++){
	if(x > charsWidth/(tileSize/2)-1){
		x = 0;
		y ++;
	}
	var c = charsOrder.charAt(i);
	charsCoords[c] = {};
	charsCoords[c].x = x;
	charsCoords[c].y = y;
	x ++;
}

var charProperties = {};
charProperties['mega'] = {
	index:0,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:2,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:7,
	runIndexes:3,
	landFrame:6,
	landLimit:4,
	attackLimit:15,
	attackDelay:2,
	stopLimit:0,
	stopFrame:0,
	attackFrame:13,
	airStopFrame:0,
	airAttackFrame:17,
	shotsMax:3,
	airShotsMax:0,
	shotSpeed:4,
	shotWidth:8,
	shotHeight:8,
	shotRectWidth:8,
	shotRectHeight:6,
	shotPhasing:true,
	shotPiercing:false,
	shotIndexX:0,
	shotIndexYL:0,
	shotIndexYR:0,
	shotOriginX:12,
	shotOriginY:0,
	leaveLimit:5,
	leaveFrames:5,
}
charProperties['fire'] = {
	index:1,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:4,
	idleOpenLimit:15,
	idleClosedLimit:10,
	runLimit:7,
	runIndexes:3,
	landFrame:6,
	landLimit:4,
	attackLimit:15,
	attackDelay:3,
	stopLimit:0,
	stopFrame:0,
	attackFrame:13,
	airStopFrame:0,
	airAttackFrame:17,
	shotsMax:2,
	airShotsMax:0,
	shotSpeed:1,
	shotWidth:16,
	shotHeight:32,
	shotRectWidth:16,
	shotRectHeight:24,
	shotPhasing:false,
	shotPiercing:true,
	shotIndexX:14,
	shotIndexYL:1,
	shotIndexYR:0,
	shotOriginX:0,
	shotOriginY:0,
	leaveLimit:10,
	leaveFrames:3,
}
charProperties['ice'] = {
	index:2,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:3,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:12,
	runIndexes:2,
	landFrame:22,
	landLimit:4,
	attackLimit:15,
	attackDelay:0,
	stopLimit:10,
	stopFrame:8,
	attackFrame:13,
	airStopFrame:16,
	airAttackFrame:17,
	shotsMax:3,
	airShotsMax:0,
	shotSpeed:2,
	shotWidth:16,
	shotHeight:16,
	shotRectWidth:16,
	shotRectHeight:16,
	shotPhasing:true,
	shotPiercing:true,
	shotIndexX:12,
	shotIndexYL:1,
	shotIndexYR:0,
	shotOriginX:0,
	shotOriginY:0,
	leaveLimit:10,
	leaveFrames:3,
}
charProperties['elec'] = {
	index:3,
	runSpeed:1.5,
	runSpeed:1.4375,
	damage:5,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:5,
	runIndexes:2,
	landFrame:6,
	landLimit:4,
	attackLimit:30,
	attackDelay:10,
	stopLimit:10,
	stopFrame:8,
	attackFrame:13,
	airStopFrame:16,
	airAttackFrame:17,
	shotsMax:1,
	airShotsMax:0,
	shotSpeed:8,
	shotWidth:48,
	shotHeight:48,
	shotRectWidth:16,
	shotRectHeight:16,
	shotPhasing:false,
	shotPiercing:false,
	shotIndexX:0,
	shotIndexYL:3,
	shotIndexYR:2,
	shotOriginX:0,
	shotOriginY:0,
	vShotWidth:12,
	vShotHeight:32,
	vShotIndexX:17,
	vShotIndexYL:1,
	vShotIndexYR:0,
	leaveLimit:10,
	leaveFrames:3,
}
charProperties['cut'] = {
	index:4,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:3,
	idleOpenLimit:15,
	idleClosedLimit:15,
	runLimit:7,
	runIndexes:3,
	landFrame:6,
	landLimit:4,
	attackLimit:15,
	attackDelay:10,
	stopLimit:15,
	stopFrame:24,
	attackFrame:25,
	airStopFrame:0,
	airAttackFrame:27,
	shotsMax:2,
	airShotsMax:0,
	shotSpeed:3,
	shotWidth:16,
	shotHeight:16,
	shotRectWidth:14,
	shotRectHeight:14,
	shotPhasing:true,
	shotPiercing:true,
	shotIndexX:3,
	shotIndexYL:2,
	shotIndexYR:2,
	shotOriginX:0,
	shotOriginY:0,
	leaveLimit:8,
	leaveFrames:4,
}
charProperties['bomb'] = {
	index:5,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:3,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:7,
	runIndexes:3,
	landFrame:6,
	landLimit:4,
	attackLimit:15,
	attackDelay:10,
	stopLimit:10,
	stopFrame:13,
	attackFrame:14,
	airStopFrame:16,
	airAttackFrame:17,
	shotsMax:2,
	airShotsMax:0,
	shotSpeed:0,
	shotWidth:16,
	shotHeight:16,
	shotRectWidth:14,
	shotRectHeight:14,
	shotPhasing:false,
	shotPiercing:false,
	shotIndexX:2,
	shotIndexYL:2,
	shotIndexYR:2,
	shotOriginX:6,
	shotOriginY:-4,
	leaveLimit:8,
	leaveFrames:3,
}
charProperties['flash'] = {
	index:6,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:3,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:8,
	runIndexes:2,
	landFrame:23,
	landLimit:4,
	attackLimit:15,
	attackDelay:5,
	stopLimit:0,
	stopFrame:0,
	attackFrame:13,
	airStopFrame:0,
	airAttackFrame:17,
	shotsMax:99,
	airShotsMax:0,
	shotSpeed:6,
	shotWidth:8,
	shotHeight:8,
	shotRectWidth:8,
	shotRectHeight:8,
	shotPhasing:false,
	shotPiercing:false,
	shotIndexX:1,
	shotIndexYL:0,
	shotIndexYR:0,
	shotOriginX:16,
	shotOriginY:-2,
	leaveLimit:5,
	leaveFrames:7,
}
charProperties['crash'] = {
	index:7,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:4,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:7,
	runIndexes:3,
	landFrame:6,
	landLimit:4,
	attackLimit:15,
	attackDelay:15,
	stopLimit:15,
	stopFrame:13,
	attackFrame:14,
	airStopFrame:16,
	airAttackFrame:17,
	shotsMax:2,
	airShotsMax:0,
	shotSpeed:3,
	shotWidth:16,
	shotHeight:16,
	shotRectWidth:13,
	shotRectHeight:13,
	shotPhasing:false,
	shotPiercing:false,
	shotIndexX:2,
	shotIndexYL:1,
	shotIndexYR:0,
	shotOriginX:0,
	shotOriginY:0,
	leaveLimit:10,
	leaveFrames:3,
}
charProperties['metal'] = {
	index:8,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:2,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:7,
	runIndexes:3,
	landFrame:22,
	landLimit:4,
	attackLimit:15,
	attackDelay:5,
	stopLimit:15,
	stopFrame:13,
	attackFrame:14,
	airStopFrame:16,
	airAttackFrame:17,
	shotsMax:3,
	airShotsMax:0,
	shotSpeed:3,
	shotWidth:16,
	shotHeight:16,
	shotRectWidth:16,
	shotRectHeight:16,
	shotPhasing:true,
	shotPiercing:true,
	shotIndexX:0,
	shotIndexYL:1,
	shotIndexYR:1,
	shotOriginX:0,
	shotOriginY:0,
	leaveLimit:10,
	leaveFrames:3,
}
charProperties['quick'] = {
	index:9,
	runSpeed:2,
	runSpeed:1.9375,
	damage:3,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:5,
	runIndexes:3,
	landFrame:22,
	landLimit:4,
	attackLimit:15,
	attackDelay:5,
	stopLimit:0,
	stopFrame:0,
	attackFrame:13,
	airStopFrame:0,
	airAttackFrame:17,
	shotsMax:1,
	airShotsMax:0,
	shotSpeed:3,
	shotWidth:8,
	shotHeight:8,
	shotRectWidth:8,
	shotRectHeight:8,
	shotPhasing:true,
	shotPiercing:true,
	shotIndexX:0,
	shotIndexYL:4,
	shotIndexYR:4,
	shotOriginX:0,
	shotOriginY:0,
	leaveLimit:5,
	leaveFrames:8,
}
charProperties['magnet'] = {
	index:10,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:3,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:7,
	runIndexes:3,
	landFrame:22,
	landLimit:4,
	attackLimit:15,
	attackDelay:0,
	stopLimit:10,
	stopFrame:13,
	attackFrame:14,
	airStopFrame:16,
	airAttackFrame:17,
	shotsMax:3,
	airShotsMax:3,
	shotSpeed:3.5,
	shotWidth:16,
	shotHeight:16,
	shotRectWidth:12,
	shotRectHeight:12,
	shotPhasing:false,
	shotPiercing:false,
	shotIndexX:9,
	shotIndexYL:1,
	shotIndexYR:0,
	shotOriginX:8,
	shotOriginY:2,
	leaveLimit:7,
	leaveFrames:3,
}
charProperties['snake'] = {
	index:11,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:3,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:7,
	runIndexes:3,
	landFrame:22,
	landLimit:10,
	attackLimit:15,
	attackDelay:15,
	stopLimit:0,
	stopFrame:0,
	attackFrame:13,
	airStopFrame:0,
	airAttackFrame:17,
	shotsMax:2,
	airShotsMax:0,
	shotSpeed:1,
	shotWidth:16,
	shotHeight:8,
	shotRectWidth:16,
	shotRectHeight:8,
	shotPhasing:false,
	shotPiercing:false,
	shotIndexX:12,
	shotIndexYL:5,
	shotIndexYR:4,
	shotOriginX:0,
	shotOriginY:0,
	leaveLimit:10,
	leaveFrames:3,
}
charProperties['gemini'] = {
	index:12,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:4,
	idleOpenLimit:60,
	idleClosedLimit:5,
	landFrame:23,
	landLimit:7,
	runLimit:7,
	runIndexes:3,
	attackLimit:15,
	attackDelay:30,
	stopLimit:0,
	stopFrame:0,
	attackFrame:13,
	airStopFrame:0,
	airAttackFrame:17,
	shotsMax:1,
	airShotsMax:0,
	shotSpeed:3,
	shotWidth:24,
	shotHeight:24,
	shotRectWidth:24,
	shotRectHeight:4,
	shotPhasing:false,
	shotPiercing:true,
	shotIndexX:2,
	shotIndexYL:3,
	shotIndexYR:3,
	shotOriginX:20,
	shotOriginY:-2,
	leaveLimit:7,
	leaveFrames:6,
}
charProperties['guts'] = {
	index:13,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:5,
	idleOpenLimit:10,
	idleClosedLimit:10,
	runLimit:7,
	runIndexes:3,
	landFrame:21,
	landLimit:7,
	attackLimit:15,
	attackDelay:45,
	stopLimit:8,
	stopFrame:25,
	attackFrame:26,
	airStopFrame:27,
	airAttackFrame:28,
	shotsMax:1,
	airShotsMax:0,
	shotSpeed:4,
	shotWidth:32,
	shotHeight:32,
	shotRectWidth:16,
	shotRectHeight:16,
	shotPhasing:false,
	shotPiercing:false,
	shotIndexX:0,
	shotIndexYL:2,
	shotIndexYR:2,
	shotOriginX:0,
	shotOriginY:0,
	leaveLimit:5,
	leaveFrames:4,
}
charProperties['proto'] = {
	index:14,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:2,
	idleOpenLimit:8,
	idleClosedLimit:8,
	runLimit:7,
	runIndexes:3,
	landFrame:6,
	landLimit:4,
	attackLimit:15,
	attackDelay:15,
	stopLimit:0,
	stopFrame:0,
	attackFrame:13,
	airStopFrame:0,
	airAttackFrame:17,
	shotsMax:3,
	airShotsMax:0,
	shotSpeed:3,
	shotWidth:8,
	shotHeight:8,
	shotRectWidth:8,
	shotRectHeight:6,
	shotPhasing:true,
	shotPiercing:false,
	shotIndexX:0,
	shotIndexYL:0,
	shotIndexYR:0,
	shotOriginX:12,
	shotOriginY:4,
	leaveLimit:10,
	leaveFrames:4,
}
charProperties['shadow'] = {
	index:15,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:3,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:7,
	runIndexes:3,
	landFrame:22,
	landLimit:7,
	attackLimit:15,
	attackDelay:45,
	stopLimit:10,
	stopFrame:13,
	attackFrame:15,
	airStopFrame:16,
	airAttackFrame:17,
	shotsMax:1,
	airShotsMax:0,
	shotSpeed:3,
	shotWidth:24,
	shotHeight:24,
	shotRectWidth:16,
	shotRectHeight:16,
	shotPhasing:true,
	shotPiercing:true,
	shotIndexX:6,
	shotIndexYL:2,
	shotIndexYR:2,
	shotOriginX:12,
	shotOriginY:0,
	leaveLimit:8,
	leaveFrames:4,
}
charProperties['wood'] = {
	index:16,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:3,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:7,
	runIndexes:3,
	landFrame:25,
	landLimit:7,
	attackLimit:15,
	attackDelay:45,
	stopLimit:10,
	stopFrame:13,
	attackFrame:14,
	airStopFrame:16,
	airAttackFrame:17,
	shotsMax:1,
	airShotsMax:0,
	shotSpeed:3,
	shotWidth:16,
	shotHeight:16,
	shotRectWidth:12,
	shotRectHeight:12,
	shotPhasing:true,
	shotPiercing:true,
	shotIndexX:14,
	shotIndexYL:4,
	shotIndexYR:4,
	shotOriginX:0,
	shotOriginY:0,
	leaveLimit:7,
	leaveFrames:5,
}
charProperties['top'] = {
	index:17,
	runSpeed:1.5,
	runSpeed:1.4375,
	damage:3,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:10,
	runIndexes:2,
	landFrame:17,
	landLimit:7,
	attackLimit:15,
	attackDelay:30,
	stopLimit:15,
	stopFrame:13,
	attackFrame:14,
	airStopFrame:15,
	airAttackFrame:16,
	shotsMax:2,
	airShotsMax:2,
	shotSpeed:2,
	shotWidth:16,
	shotHeight:16,
	shotRectWidth:15,
	shotRectHeight:16,
	shotPhasing:false,
	shotPiercing:true,
	shotIndexX:5,
	shotIndexYL:3,
	shotIndexYR:3,
	shotOriginX:8,
	shotOriginY:-8,
	leaveLimit:10,
	leaveFrames:2,
}
charProperties['bubble'] = {
	index:18,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:3,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:7,
	runIndexes:3,
	landFrame:24,
	landLimit:7,
	attackLimit:15,
	attackDelay:15,
	stopLimit:0,
	stopFrame:0,
	attackFrame:13,
	airStopFrame:0,
	airAttackFrame:17,
	shotsMax:2,
	airShotsMax:0,
	shotSpeed:2,
	shotWidth:16,
	shotHeight:16,
	shotRectWidth:16,
	shotRectHeight:16,
	shotPhasing:false,
	shotPiercing:false,
	shotIndexX:12,
	shotIndexYL:5,
	shotIndexYR:5,
	shotOriginX:8,
	shotOriginY:-8,
	leaveLimit:7,
	leaveFrames:2,
}
charProperties['air'] = {
	index:19,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:3,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:7,
	runIndexes:3,
	landFrame:22,
	landLimit:7,
	attackLimit:15,
	attackDelay:15,
	stopLimit:0,
	stopFrame:0,
	attackFrame:13,
	airStopFrame:0,
	airAttackFrame:17,
	shotsMax:1,
	airShotsMax:1,
	shotSpeed:.5,
	shotWidth:16,
	shotHeight:16,
	shotRectWidth:16,
	shotRectHeight:16,
	shotPhasing:false,
	shotPiercing:false,
	shotIndexX:14,
	shotIndexYL:5,
	shotIndexYR:5,
	shotOriginX:12,
	shotOriginY:-4,
	leaveLimit:7,
	leaveFrames:3,
}
charProperties['heat'] = {
	index:20,
	runSpeed:1.375,
	airRunSpeed:1.3125,
	damage:3,
	idleOpenLimit:60,
	idleClosedLimit:5,
	runLimit:7,
	runIndexes:3,
	landFrame:26,
	landLimit:7,
	attackLimit:15,
	attackDelay:5,
	stopLimit:15,
	stopFrame:13,
	attackFrame:14,
	airStopFrame:16,
	airAttackFrame:17,
	shotsMax:1,
	airShotsMax:1,
	shotSpeed:1,
	shotWidth:8,
	shotHeight:8,
	shotRectWidth:8,
	shotRectHeight:8,
	shotPhasing:false,
	shotPiercing:true,
	shotIndexX:38,
	shotIndexYL:8,
	shotIndexYR:8,
	shotOriginX:12,
	shotOriginY:-4,
	leaveLimit:5,
	leaveFrames:5,
}

var players = [];
var mode = 'select';
var select;
var game;

controls = [
{left:'a', right:'d', up:'w', down:'s', a:'g', b:'f', start:'q', select:'e'},
{left:'left', right:'right', up:'up', down:'down', a:'k', b:'l', start:'enter', select:'\\'},
];

var sprites = [];
var dynamics = [];
var running = 0;
var enterFrame;
function StagePortrait(x, y, type){
	var p = this.sprite = new Sprite(x, y, 32, 32, portraitSheet, 8, 6, 1, true);
	p.portrait = new Sprite(x, y, 32, 32, portraitSheet, 7, stageIndex[type].x, stageIndex[type].y);
	p.type = type;
	p.selected = false;
	p.timer = 0;
	p.limit = 2;
	p.change = function(type){
		p.type = type;
		p.timer = 0;
		p.portrait.indexX = stageIndex[type].x;
		p.portrait.indexY = stageIndex[type].y;
	}
	p.phase = function(visibility){
		if(visibility === undefined)p.visible = !p.visible;
		else p.visible = visibility;
		p.portrait.visible = p.visible;
		if(game.menu.visible && !game.menu.phasing && visibility)p.visible = p.selected;
		else p.visible = false;
	}
	p.update = function(){
		if(game.menu !== undefined){
			if(game.menu.visible && !game.menu.phasing)p.visible = p.selected;
			else p.visible = false;
		} else p.visible = false;
		if(p.visible){
			if(p.selected){
				p.timer ++;
				if(p.timer >= p.limit){
					p.timer = 0;
					p.indexX ++;
					if(p.indexX > 7)p.indexX = 6;
				}
			} else {
				p.indexX = 6;
				p.timer = 0;
			}
		} else {
			p.indexX = 6;
			p.timer = 0;
		}
	}
}
function PortraitPreview(x, y, type, direction){
	if(charProperties[type] !== undefined){
		var directionIndex = 0;
		if(direction === -1)directionIndex = 1;
		var n = type;
		var cp = charProperties[n];
		var p = this.sprite = new Sprite(x, y, 48, 48, charSheet, 7, 3, cp.index*2+directionIndex, true);
		p.timer = 0;
		p.limit = cp.leaveLimit;
		p.warpVelocity = 0;
		p.warpLimit = 6;
		p.idleOpenLimit = cp.idleOpenLimit;
		p.idleClosedLimit = cp.idleClosedLimit;
		p.idleLimit = p.idleOpenLimit;
		p.hurtLimit = 30;
		p.reps = 0;
		p.posing = false;
		p.posed = false;
		p.warping = false;
		p.warped = false;
		if(n === 'proto')p.indexX = 21;
		p.update = function(){
			if(p.hurt){
				p.posed = false;
				p.posing = false;
				p.visible = true;
				if(p.timer%3===0)p.visible = false;
				else if(p.timer%3===1)p.indexX = 19;
				else if(p.timer%3===2)p.indexX = 20;
				p.timer ++;
				if(p.timer >= p.hurtLimit){
					p.visible = true;
					p.timer = 0;
					p.hurt = false;
					p.indexX = 3;
				}
			} else if(p.warping){
				if(p.indexX === 0){
					p.warpVelocity += 0.01;
					p.warpVelocity *= 1.15;
					p.y -= p.warpVelocity;
					if(p.y+p.height < -256){
						p.warping = false;
						p.warped = true;
					}
				} else {
					p.timer ++;
					if(p.timer >= p.warpLimit){
						p.timer = 0;
						p.indexX --;
						if(p.indexX < 0)p.indexX = 0;
					}
				}
			} else if(p.posing){
				if(!p.posed || n === 'heat'){
					if(n === 'cut' || n === 'guts'){
						if(p.reps < 4){
							p.timer ++;
							if(p.timer >= p.limit){
								p.timer = 0;
								p.indexX ++;
								if(p.indexX > 4){
									p.indexX = 3;
									p.reps ++;
								}
							}
						} else {
							p.timer = 0;
							p.posed = true;
						}
					} else if(n === 'wood'){
						if(p.reps === 0 && p.timer === 0 && p.indexX < 21)p.indexX = 21;
						if(p.reps < 4){
							p.timer ++;
							if(p.timer >= p.limit){
								p.timer = 0;
								p.indexX ++;
								if(p.indexX > 22){
									p.indexX = 21;
									p.reps ++;
								}
							}
						} else {
							p.timer = 0;
							p.posed = true;
							p.indexX = 3;
						}
					} else if(n === 'heat'){
						if(p.timer === 0 && p.indexX < 21)p.indexX = 21;
						p.timer ++;
						if(p.timer >= p.limit){
							p.timer = 0;
							p.indexX ++;
							if(p.indexX > 23){
								p.indexX = 22;
								p.posed = true;
							}
						}
					} else {
						if(p.indexX < 21){
							p.indexX = 21;
							p.timer = 0;
							p.limit = cp.leaveLimit;
						}
						p.timer ++;
						if(p.timer >= p.limit){
							p.timer = 0;
							p.indexX ++;
							if(p.indexX === 20+cp.leaveFrames)p.limit = 25;
							if(p.indexX > 20+cp.leaveFrames){
								p.indexX = 20+cp.leaveFrames;
								p.timer = 0;
								p.posed = true;
							}
						}
					}
				}
			} else {
				p.timer ++;
				if(p.timer >= p.idleLimit){
					p.timer = 0;
					if(n !== 'proto'){
						if(p.indexX === 3){
							p.indexX = 4;
							p.idleLimit = p.idleClosedLimit;
						} else if(p.indexX === 4){
							p.indexX = 3;
							p.idleLimit = p.idleOpenLimit;
						}
					} else {
						if(p.indexX === 21){
							p.indexX = 22;
							p.idleLimit = p.idleClosedLimit;
						} else if(p.indexX === 22){
							p.indexX = 21;
							p.idleLimit = p.idleOpenLimit;
						} else {
							p.indexX = 21;
						}
					}
				}
			}
		}
	} else {
		var p = this.sprite = this;
		p.remove = function(){};
	}
}
function Portrait(x, y, type){
	var p = this.sprite = new Sprite(x, y, 32, 32, portraitSheet, 2, 0, 1, true);
	p.type = type;
	p.portrait = new Sprite(x, y, 32, 32, portraitSheet, 1, portraitIndex[type].x, portraitIndex[type].y);
	p.p1 = false;
	p.p2 = false;
	p.lastP1 = false;
	p.lastP2 = false;
	p.selected = false;
	p.timer = 0;
	p.limit = 2;
	p.visible = false;
	p.update = function(){
		p.visible = p.p1 || p.p2;
		if(p.p1 && p.p2){
			p.timer ++;
			if(p.timer >= p.limit){
				p.timer = 0;
				if(p.indexX === 4)p.indexX = 5;
				else if(p.indexX === 5)p.indexX = 4;
				else p.indexX = 5;
			}
		} else
		if(p.p1){
			if(!p.selected){
				p.timer ++;
				if(p.timer >= p.limit){
					p.timer = 0;
					if(p.indexX === 0)p.indexX = 1;
					else if(p.indexX === 1)p.indexX = 0;
					else p.indexX = 1;
				}
			} else {
				p.indexX = 0;
			}
		} else
		if(p.p2){
			if(!p.selected){
				p.timer ++;
				if(p.timer >= p.limit){
					p.timer = 0;
					if(p.indexX === 2)p.indexX = 3;
					else if(p.indexX === 3)p.indexX = 2;
					else p.indexX = 3;
				}
			} else {
				p.indexX = 2;
			}
		}
		p.lastP1 = p.p1;
		p.lastP2 = p.p2;
	}
	p.select = function(id){
		p.selected = true;
		players[id-1] = type;
	}
	p.deselect = function(id){
		p.selected = false;
	}
}
function Frame(x, y, type){
	var p = this.sprite = new Sprite(x, y, 96, 64, frameSheet, 1, 0, type, false);
}
function Select(){
	var p = this;
	p.bgTiles = [];
	p.bgMap = [
		'.................',
		'..##############.',
		'..#     ##     #.',
		'..##############.',
		'..##############.',
		'..#            #.',
		'..#            #.',
		'..#            #.',
		'..#            #.',
		'..#            #.',
		'..#            #.',
		'..#            #.',
		'..#            #.',
		'..##############.',
	];
	p.bgBoxMap = [];
	p.bgBoxes = [];
	for(var i = 0; i < p.bgMap.length; i ++){
		p.bgTiles.push([]);
		p.bgBoxMap.push([]);
		for(var j = 0; j < p.bgMap[0].length; j ++){
			var indexX = 0;
			var indexY = 0;
			var f = p.bgMap[i][j];
			p.bgBoxMap[i][j] = {char:f, reached:false};
			if(f === '.')p.bgBoxMap[i][j].reached = true;
			if(j > 0)var l = p.bgMap[i][j-1];
			else var l = '.';
			if(j+1 < p.bgMap[0].length)var r = p.bgMap[i][j+1];
			else var r = '.';
			if(i > 0)var u = p.bgMap[i-1][j];
			else var u = '.';
			if(i+1 < p.bgMap.length)var d = p.bgMap[i+1][j];
			else var d = '.';
			if(i > 0 && j > 0)var ul = p.bgMap[i-1][j-1];
			else var ul = '.';
			if(i > 0 && j+1 < p.bgMap[0].length)var ur = p.bgMap[i-1][j+1];
			else var ur = '.';
			if(i+1 < p.bgMap.length && j > 0)var dl = p.bgMap[i+1][j-1];
			else var dl = '.';
			if(i+1 < p.bgMap.length && j+1 < p.bgMap[0].length)var dr = p.bgMap[i+1][j+1];
			else var dr = '.';
			if(f===' '){
				indexX = 1;
				indexY = 1;
			} else if(f==='#'&&(l==='.'||l==='#')&&r===' '&&u==='#'&&d==='#'){
				indexY = 1;
			} else if(f==='#'&&l===' '&&(r==='.'||r==='#')&&u==='#'&&d==='#'){
				indexX = 2;
				indexY = 1;
			} else if(f==='#'&&l==='#'&&r==='#'&&(u==='.'||u==='#')&&d===' '){
				indexX = 1;
			} else if(f==='#'&&l==='#'&&r==='#'&&u===' '&&(d==='.'||d==='#')){
				indexX = 1;
				indexY = 2;
			} else if(f==='#'&&(l==='.'||l==='#')&&r==='#'&&(u==='.'||u==='#')&&d==='#'&&dr===' '){
				indexX = 0;
				indexY = 0;
			} else if(f==='#'&&l==='#'&&(r==='.'||r==='#')&&(u==='.'||u==='#')&&d==='#'&&dl===' '){
				indexX = 2;
				indexY = 0;
			} else if(f==='#'&&(l==='.'||l==='#')&&r==='#'&&u==='#'&&(d==='.'||d==='#')&&ur===' '){
				indexX = 0;
				indexY = 2;
			} else if(f==='#'&&l==='#'&&(r==='.'||r==='#')&&u==='#'&&(d==='.'||d==='#')&&ul===' '){
				indexX = 2;
				indexY = 2;
			} else {
				indexX = 3;
			}
			var t = new Sprite(j*tileSize-12, i*tileSize, tileSize, tileSize, tileSheet, 0, tileSheets['select'].x+indexX, indexY);
			p.bgTiles[i][j] = t;
		}
	}
	var pos = {};
	var stack = [];
	var boxID = 0;
	for(var i = 0; i < p.bgBoxMap.length; i ++){
		for(var j = 0; j < p.bgBoxMap[i].length; j ++){
			if(!p.bgBoxMap[i][j].reached && p.bgBoxMap[i][j].char === ' '){
				pos = {x:j, y:i};
				stack = [];
				stack.length = 0;
				stack.push(pos);
				p.bgBoxMap[i][j].reached = true;
				if(p.bgBoxes[boxID] === undefined)p.bgBoxes[boxID] = {contents:[], flashDirection:1, flashing:false, flashes:0, flashesMax:2, flashTimer:0, flashLimit:3};
				p.bgBoxes[boxID].contents.push(pos);
				while(stack.length > 0){
					pos = stack.pop();
					var neighbors = [
						{x:pos.x-1, y:pos.y-1},
						{x:pos.x, y:pos.y-1},
						{x:pos.x+1, y:pos.y-1},
						{x:pos.x-1, y:pos.y},
						{x:pos.x+1, y:pos.y},
						{x:pos.x-1, y:pos.y+1},
						{x:pos.x, y:pos.y+1},
						{x:pos.x+1, y:pos.y+1},
					];
					for(var k = 0; k < neighbors.length; k ++){
						var n = neighbors[k];
						if(n.x >= 0 && n.x <= p.bgBoxMap[n.y].length-1 && n.y >= 0 && n.y <= p.bgBoxMap.length-1 && !p.bgBoxMap[n.y][n.x].reached && (p.bgBoxMap[n.y][n.x].char === ' ' || p.bgBoxMap[n.y][n.x].char === '#')){
							p.bgBoxMap[n.y][n.x].reached = true;
							p.bgBoxes[boxID].contents.push(n);
							if(p.bgBoxMap[n.y][n.x].char === ' ')stack.push(n);
						}
					}
				}
				boxID ++;
			}
		}
	}
	// p.chars = [
	// 	['mega', 'proto', 'cut', 'guts'],
	// 	['ice', 'bomb', 'fire', 'elec'],
	// 	['metal', 'air', 'bubble', 'quick'],
	// 	['crash', 'flash', 'heat', 'wood'],
	// 	['needle', 'magnet', 'gemini', 'hard'],
	// 	['top', 'snake', 'spark', 'shadow'],
	// ];
	p.chars = [
		['mega', 'proto', 'metal', 'air', 'needle', 'magnet'],
		['cut', 'guts', 'bubble', 'quick', 'gemini', 'hard'],
		['ice', 'bomb', 'crash', 'flash', 'top', 'snake'],
		['fire', 'elec', 'heat', 'wood', 'spark', 'shadow'],
	];
	p.left1 = controls[0].left;
	p.right1 = controls[0].right;
	p.up1 = controls[0].up;
	p.down1 = controls[0].down;
	p.a1 = controls[0].a;
	p.b1 = controls[0].b;
	p.start1 = controls[0].start;
	p.left2 = controls[1].left;
	p.right2 = controls[1].right;
	p.up2 = controls[1].up;
	p.down2 = controls[1].down;
	p.a2 = controls[1].a;
	p.b2 = controls[1].b;
	p.start2 = controls[1].start;
	p.x1 = 0;
	p.y1 = 0;
	p.lastX1 = p.x1;
	p.lastY1 = p.y1;
	p.selected1 = false;
	p.x2 = p.chars[0].length-1
	p.y2 = p.chars.length-1;
	p.lastX2 = p.x2;
	p.lastY2 = p.y2;
	p.selected2 = false;
	p.portraits = [];
	p.blinkTimer = 0;
	p.blinkLimit = 20;
	p.words = [];
	p.word1X = 72;
	p.word2X = 184;
	p.word1Y = 56;
	p.word2Y = 56;
	p.name1 = p.chars[p.y1][p.x1]+' man';
	p.name2 = p.chars[p.y2][p.x2]+' man';
	p.removed = false;
	p.typing1 = true;
	p.typing2 = true;
	p.typeIndex1 = 0;
	p.typeIndex2 = 0;
	p.typeTimer1 = 0;
	p.typeLimit1 = 2;
	p.typeTimer2 = 0;
	p.typeLimit2 = 2;
	p.word1 = new Word(p.word1X, p.word1Y, '', true);
	p.word2 = new Word(p.word2X, p.word2Y, '', true);
	p.char1X = 48;
	p.char1Y = 6;
	p.char2X = 160;
	p.char2Y = 6;
	p.char1 = new PortraitPreview(p.char1X, p.char1Y, p.chars[p.y1][p.x1], 1).sprite;
	p.char2 = new PortraitPreview(p.char2X, p.char2Y, p.chars[p.y2][p.x2], -1).sprite;
	p.start = new Word(84, 4, 'press start', true);
	p.words.push(p.start);
	for(var i = 0; i < p.chars.length; i ++){
		var diffX = 0;
		p.portraits[i] = [];
		for(var j = 0; j < p.chars[i].length; j ++){
			var diffX = 0;
			// if(j <= 1)diffX = -8;
			// else if(j >= 4)diffX = 8;
			p.portraits[i].push(new Portrait(32+j*32+diffX, 76+i*32, p.chars[i][j]).sprite);
			if(j === p.x1 && i === p.y1)p.portraits[i][j].p1 = true;
			if(j === p.x2 && i === p.y2)p.portraits[i][j].p2 = true;
		}
	}
	p.update = function(){
		p.blinkTimer ++;
		if(p.blinkTimer >= p.blinkLimit){
			p.blinkTimer = 0;
			p.start.phase();
		}
		if(!p.selected1){
			if(keyDown[p.left1] && !heldDown[p.left1]){
				p.x1 --;
				if(p.x1 < 0)p.x1 = p.chars[0].length-1;
			}
			if(keyDown[p.right1] && !heldDown[p.right1]){
				p.x1 ++;
				if(p.x1 > p.chars[0].length-1)p.x1 = 0;
			}
			if(keyDown[p.up1] && !heldDown[p.up1]){
				p.y1 --;
				if(p.y1 < 0)p.y1 = p.chars.length-1;
			}
			if(keyDown[p.down1] && !heldDown[p.down1]){
				p.y1 ++;
				if(p.y1 > p.chars.length-1)p.y1 = 0;
			}
			if(keyDown[p.a1] && !heldDown[p.a1] || keyDown[p.start1] && !heldDown[p.start1]){
				var valid = false;
				for(var name in charProperties){
					if(name === p.chars[p.y1][p.x1])valid = true;
				}
				if(valid){
					p.bgBoxes[0].flashTimer = 0;
					p.bgBoxes[0].flashes = 0;
					p.bgBoxes[0].flashing = true;
					p.portraits[p.y1][p.x1].select(1);
					p.selected1 = true;
					p.char1.posing = true;
					p.char1.hurt = false;
					p.char1.timer = 0;
					p.char1.visible = true;
				}
			}
			if(p.lastX1 !== p.x1 || p.lastY1 !== p.y1){
				p.word1.remove();
				p.name1 = p.chars[p.y1][p.x1]+' man';
				p.typing1 = true;
				p.typeIndex1 = 0;
				p.word1 = new Word(p.word1X, p.word1Y, '', true);
				p.char1.remove();
				p.char1 = new PortraitPreview(p.char1X, p.char1Y, p.chars[p.y1][p.x1], 1).sprite;
				p.portraits[p.lastY1][p.lastX1].p1 = false;
				p.portraits[p.y1][p.x1].p1 = true;
			}
			p.lastX1 = p.x1;
			p.lastY1 = p.y1;
		} else {
			if(keyDown[p.b1] && !heldDown[p.b1] && !p.char1.warping){
				p.portraits[p.y1][p.x1].deselect(1);
				p.selected1 = false;
				p.char1.hurt = true;
				p.char1.timer = 0;
			}
		}
		if(!p.selected2){
			if(keyDown[p.left2] && !heldDown[p.left2]){
				p.x2 --;
				if(p.x2 < 0)p.x2 = p.chars[0].length-1;
			}
			if(keyDown[p.right2] && !heldDown[p.right2]){
				p.x2 ++;
				if(p.x2 > p.chars[0].length-1)p.x2 = 0;
			}
			if(keyDown[p.up2] && !heldDown[p.up2]){
				p.y2 --;
				if(p.y2 < 0)p.y2 = p.chars.length-1;
			}
			if(keyDown[p.down2] && !heldDown[p.down2]){
				p.y2 ++;
				if(p.y2 > p.chars.length-1)p.y2 = 0;
			}
			if(keyDown[p.a2] && !heldDown[p.a2] || keyDown[p.start2] && !heldDown[p.start2]){
				var valid = false;
				for(var name in charProperties){
					if(name === p.chars[p.y2][p.x2])valid = true;
				}
				if(valid){
					p.bgBoxes[1].flashTimer = 0;
					p.bgBoxes[1].flashes = 0;
					p.bgBoxes[1].flashing = true;
					p.portraits[p.y2][p.x2].select(2);
					p.selected2 = true;
					p.char2.posing = true;
					p.char2.hurt = false;
					p.char2.timer = 0;
					p.char2.visible = true;
				}
			}
			if(p.lastX2 !== p.x2 || p.lastY2 !== p.y2){
				p.word2.remove();
				p.name2 = p.chars[p.y2][p.x2]+' man';
				p.typing2 = true;
				p.typeIndex2 = 0;
				p.word2 = new Word(p.word2X, p.word2Y, '', true);
				p.char2.remove();
				p.char2 = new PortraitPreview(p.char2X, p.char2Y, p.chars[p.y2][p.x2], -1).sprite;
				p.portraits[p.lastY2][p.lastX2].p2 = false;
				p.portraits[p.y2][p.x2].p2 = true;
			}
			p.lastX2 = p.x2;
			p.lastY2 = p.y2;
		} else {
			if(keyDown[p.b2] && !heldDown[p.b2] && !p.char2.warping){
				p.portraits[p.y2][p.x2].deselect(2);
				p.selected2 = false;
				p.char2.hurt = true;
				p.char2.timer = 0;
			}
		}
		for(var i = 0; i < p.bgBoxes.length; i ++){
			var b = p.bgBoxes[i];
			if(b.flashing){
				b.flashTimer ++;
				if(b.flashTimer >= b.flashLimit){
					b.flashTimer = 0;
					for(var j = 0; j < p.bgBoxes[i].contents.length; j ++){
						var c = p.bgBoxes[i].contents[j];
						var t = p.bgTiles[c.y][c.x];
						t.indexY += 3*b.flashDirection;
					}
					b.flashDirection *= -1;
					if(b.flashDirection === 1)b.flashes ++;
					if(b.flashes > b.flashesMax){
						b.flashes = 0;
						b.flashing = false;
					}
				}
			}
		}
		if(p.typing1){
			p.typeTimer1 ++;
			if(p.typeTimer1 >= p.typeLimit1){
				p.typeTimer1 = 0;
				p.word1.replace(p.word1.text+p.name1[p.typeIndex1]);
				p.word1.move(p.word1X-p.word1.text.length*4, p.word1Y);
				p.typeIndex1 ++;
				if(p.typeIndex1 >= p.name1.length)p.typing1 = false;
			}
		}
		if(p.typing2){
			p.typeTimer2 ++;
			if(p.typeTimer2 >= p.typeLimit2){
				p.typeTimer2 = 0;
				p.word2.replace(p.word2.text+p.name2[p.typeIndex2]);
				p.word2.move(p.word2X-p.word2.text.length*4, p.word2Y);
				p.typeIndex2 ++;
				if(p.typeIndex2 >= p.name2.length)p.typing2 = false;
			}
		}
		if(p.char1.posed && p.char2.posed && p.char1.posing && p.char2.posing){
			p.char1.posing = false;
			p.char2.posing = false;
			p.char1.warping = true;
			p.char2.warping = true;
			p.char1.indexX = 2;
			p.char2.indexX = 2;
		}
		if(p.char1.warped && p.char2.warped){
			if(!p.removed)p.remove();
		}
		for(var i = 0; i < dynamics.length; i ++){
			var d = dynamics[i];
			d.update();
		}
	}
	p.remove = function(){
		p.removed = true;
		p.char1.remove();
		p.char2.remove();
		p.word1.remove();
		p.word2.remove();
		for(var i = 0; i < p.portraits.length; i ++)for(var j = 0; j < p.portraits[i].length; j ++){
			p.portraits[i][j].portrait.remove();
			p.portraits[i][j].remove();
		}
		for(var i = 0; i < p.words.length; i ++)p.words[i].remove();
		mode = 'game';
		for(var i = 0; i < p.bgTiles.length; i ++)for(var j = 0; j < p.bgTiles[i].length; j ++)p.bgTiles[i][j].remove();
		p.bgTiles = [];
		p.bgTiles.length = 0;
		game = new Game();
		game.maps.parse();
		game.menuElements = [];
		for(var i = 0; i < game.mapNames.length; i ++){
			game.menuElements[i] = /*game.stageNames[*/game.mapNames[i]/*]*/;
		}
		game.menu = new Menu(game.menuElements, 'stage');
		game.pauseMenu = new Menu(['resume', 'exit'], 'pause');
		game.selecting = true;
		select = undefined;
	}
}
tileSheets = {};
tileSheets['bomb'] = {x:0, width:7};
tileSheets['elec'] = {x:tileSheets['bomb'].x+tileSheets['bomb'].width, width:5};
tileSheets['guts'] = {x:tileSheets['elec'].x+tileSheets['elec'].width, width:6};
tileSheets['ice'] = {x:tileSheets['guts'].x+tileSheets['guts'].width, width:6};
tileSheets['cut'] = {x:tileSheets['ice'].x+tileSheets['ice'].width, width:5};
tileSheets['fire'] = {x:tileSheets['cut'].x+tileSheets['cut'].width, width:6};
tileSheets['1wily1'] = {x:tileSheets['fire'].x+tileSheets['fire'].width, width:4};
tileSheets['1wily4'] = {x:tileSheets['1wily1'].x+tileSheets['1wily1'].width, width:7};
tileSheets['heat'] = {x:tileSheets['1wily4'].x+tileSheets['1wily4'].width, width:10};
tileSheets['bubble'] = {x:tileSheets['heat'].x+tileSheets['heat'].width, width:8};
tileSheets['flash'] = {x:tileSheets['bubble'].x+tileSheets['bubble'].width, width:8};
tileSheets['quick'] = {x:tileSheets['flash'].x+tileSheets['flash'].width, width:7};
tileSheets['wood'] = {x:tileSheets['quick'].x+tileSheets['quick'].width, width:6};
tileSheets['metal'] = {x:tileSheets['wood'].x+tileSheets['wood'].width, width:10};
tileSheets['air'] = {x:tileSheets['metal'].x+tileSheets['metal'].width, width:12};
tileSheets['crash'] = {x:tileSheets['air'].x+tileSheets['air'].width, width:10};
tileSheets['2wily1'] = {x:tileSheets['crash'].x+tileSheets['crash'].width, width:8};
tileSheets['yoku'] = {x:tileSheets['2wily1'].x+tileSheets['2wily1'].width, width:12};
tileSheets['select'] = {x:tileSheets['yoku'].x+tileSheets['yoku'].width, width:4};
function Game(){
	var p = this;
	p.tiles = [];
	p.platforms = [];
	p.pickups = [];
	p.enemies = [];
	p.teleportPoints = [];
	p.lasers = [];
	p.initiated = false;
	p.over = false;
	p.overTimer = 0;
	p.overLimit = 30;
	p.tilesByIds = {};
	p.healthPause = false;
	p.healthPauseTimer = 0;
	p.healthPauseLimit = 3;
	p.healthReceiver = undefined;
	p.healthGiving = 0;
	p.healthGiven = 0;
	p.deathPause = false;
	p.deathPauseTimer = 0;
	p.deathPauseLimit = 15;
	p.paused = false;
	p.turboKey = false;
	p.ready = new Word(108, 90, 'ready', true);
	p.ready.phase(false);
	p.blinking = false;
	p.blinkTimer = 0;
	p.blinkLimit = 8;
	p.blinks = 0;
	p.blinksMax = 24;
	p.elecBlocks = [];
	p.yellowParts = [];
	p.yellowTimer = 0;
	p.yellowLimit = 120;
	p.yellowIndex = 0;
	p.yellowDirection = 1;
	if(p.yellowDirection === 1)p.yellowX = -tileSize;
	else p.yellowX = canvas.width+tileSize;
	p.yellowStartY = 88;
	p.yellowY = p.yellowStartY;
	p.spawns = {
		'bomb':[
			{x:32, y:152, direction:1},
			{x:192, y:104, direction:-1},
			{x:32, y:40, direction:1},
			{x:208, y:24, direction:-1},
		],
		'elec':[
			{x:64, y:-24, direction:1},
			{x:192, y:120, direction:-1},
			{x:88, y:56, direction:1},
			{x:128, y:104, direction:-1},
		],
		'guts':[
			{x:0, y:72, direction:1},
			{x:208, y:72, direction:-1},
			{x:24, y:8, direction:1},
			{x:200, y:-8, direction:-1},
		],
		'ice':[
			{x:32, y:136, direction:1},
			{x:208, y:40, direction:-1},
			{x:56, y:8, direction:1},
			{x:168, y:88, direction:-1},
		],
		'cut':[
			{x:16, y:40, direction:1},
			{x:176, y:120, direction:-1},
			{x:32, y:104, direction:-1},
			{x:176, y:40, direction:-1},
		],
		'fire':[
			{x:16, y:8, direction:1},
			{x:176, y:56, direction:-1},
			{x:32, y:88, direction:1},
			{x:192, y:8, direction:-1},
		],
		'1wily1':[
			{x:24, y:-8, direction:1},
			{x:176, y:24, direction:-1},
			{x:16, y:120, direction:1},
			{x:192, y:120, direction:-1},

		],
		'1wily4':[
			{x:80, y:88, direction:1},
			{x:216, y:124, direction:-1},
			{x:24, y:8, direction:1},
			{x:200, y:72, direction:-1},
		],
		'heat':[
			{x:32, y:24, direction:1},
			{x:208, y:-8, direction:-1},
			{x:128, y:120, direction:1},
			{x:192, y:120, direction:-1},
		],
		'bubble':[
			{x:0, y:88, direction:1},
			{x:176, y:8, direction:-1},
			{x:16, y:-8, direction:1},
			{x:192, y:136, direction:-1},
		],
		'flash':[
			{x:16, y:24, direction:1},
			{x:128, y:8, direction:-1},
			{x:0, y:120, direction:1},
			{x:208, y:72, direction:-1},
		],
		'quick':[
			{x:16, y:8, direction:1},
			{x:176, y:152, direction:-1},
			{x:48, y:120, direction:1},
			{x:192, y:-8, direction:-1},
		],
		'wood':[
			{x:48, y:72, direction:1},
			{x:208, y:-8, direction:-1},
			{x:0, y:24, direction:1},
			{x:176, y:120, direction:-1},
		],
		'metal':[
			{x:0, y:40, direction:1},
			{x:208, y:16, direction:-1},
			{x:32, y:88, direction:1},
			{x:144, y:104, direction:-1},
		],
		'air':[
			{x:0, y:72, direction:1},
			{x:176, y:56, direction:-1},
			{x:80, y:40, direction:1},
			{x:80, y:120, direction:1},
		],
		'crash':[
			{x:80, y:24, direction:1},
			{x:176, y:120, direction:-1},
			{x:32, y:120, direction:1},
			{x:128, y:88, direction:-1},
		],
		'2wily1':[
			{x:32, y:72, direction:1},
			{x:192, y:104, direction:-1},
			{x:112, y:40, direction:1},
			{x:192, y:8, direction:-1},
		],
	}
	p.backName = 'back';
	p.mapNames = ['bomb', 'elec', 'guts', 'ice', 'cut', 'fire', '1wily1', '1wily4', 'heat', 'bubble', 'flash', 'quick', 'wood', 'metal', 'air', 'crash', '2wily1', 'random', p.backName];
	p.mapIndex = 0;
	p.mapIndexMax = p.mapNames.length-1;
	p.mapName = p.mapNames[p.mapIndex];
	p.maps = {
		'bomb':{
			bg:[
				'%6              ',
				'%8          1234',
				'BC  1234    5%%6',
				']   5%%6    7%%8',
				']   7.......9ABC',
				'] db ....... [] ',
				'] qp ....... [] ',
				'] () ....... [] ',
				'........     [] ',
				'........34   [] ',
				'........%6 db[] ',
				'........%8 qp[] ',
				'........BC ()[] ',
				'........]  ()[] ',
				'........]  ()[] ',
			],
			fg:[
				'                ',
				'                ',
				'                ',
				'    |====|##    ',
				'    |    |##  ==',
				' == |    |##    ',
				'    |    |##    ',
				'    |  |======  ',
				'=|===  |        ',
				' |     |        ',
				' |     |     ===',
				' |     ##       ',
				' |     ##       ',
				'===##  ##  ##===',
				'===##  ##  ##===',
			]
		},
		'elec':{
			bg:[
				'                ',
				'                ',
				'    ............',
				'    ............',
				'    ....RZ______',
				'    ,,..|.......',
				'    ,,__L==F----',
				'    .......|....',
				'    ....,,.|....',
				'    .F--,,.|....',
				'    .|.....L====',
				'    .|.......RZ_',
				'    _L=====,,I..',
				'    .......,,I..',
				'    .........I..',
			],
			fg:[
				'                ',
				'                ',
				'   |##########|#',
				'   |H         |H',
				'## |H         |H',
				'   |I         |H',
				'   |H         1H',
				'## |H|##       H',
				'   |I|      0  H',
				'   |H|         H',
				'## |H|  ###    H',
				'   |         ###',
				'   |         ###',
				'########()######',
				'###O#####O######',
			]
		},
		'guts':{
			// bg:[
			// 	'                ',
			// 	'                ',
			// 	'#               ',
			// 	'###             ',
			// 	'###pd ###       ',
			// 	'##pd#######    #',
			// 	'##d###pqpq## ###',
			// 	'#####p,,,,qbq###',
			// 	'#####======#bq##',
			// 	'###bq########bq#',
			// 	'####bq########bq',
			// 	'#####bq########b',
			// 	'######b#########',
			// 	'################',
			// 	'################',
			// ],
			// bg:[
			// 	'                ',
			// 	'                ',
			// 	'#               ',
			// 	'###             ',
			// 	'##### ###       ',
			// 	'##pd#######    #',
			// 	'##d######### ###',
			// 	'############q###',
			// 	'############bq##',
			// 	'#############bq#',
			// 	'################',
			// 	'################',
			// 	'################',
			// 	'################',
			// 	'################',
			// ],
			bg:[
				'                ',
				'                ',
				'                ',
				'                ',
				'#               ',
				'###             ',
				'##### ###       ',
				'##pd#######    #',
				'##d######### ###',
				'############q###',
				'############bq##',
				'#############bq#',
				'################',
				'################',
				'################',
			],
			fg:[
				'                ',
				'                ',
				'                ',
				'              ==',
				'====            ',
				'       P--~--O  ',
				'                ',
				'     ==         ',
				'==           ===',
				'##            X ',
				'##==    ==    X ',
				'####    ##    X ',
				'####====##^^^^X^',
				'##########======',
				'################',
			]
		},
		'ice':{
			bg:[
				'----------------',
				'>   <^>   <^> <^',
				')<^>(T)<^>(T) (T',
				'________________',
				'......~~........',
				'......~~........',
				'......~~........',
				'......~~........',
				'................',
				'................',
				'................',
				'................',
				'................',
				'................',
				'................',
			],
			fg:[
				'                ',
				'                ',
				'          ##    ',
				'          ##    ',
				'   1==  ====1   ',
				'                ',
				'              ==',
				' 0              ',
				'   =====        ',
				'          ====  ',
				'I~~~~~~~~~~~~~~~',
				'II~~~~~~~~~~~~~I',
				'HI##~~~~[]~~~~II',
				'II##~~~~[]~~~~II',
				'II##===={]####IH',
			]
		},
		'cut':{
			bg:[
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'HHHHHHHHHHHHHHHH',
				',...,.....,,....',
				'..,...,........,',
				'.,.......HHHH...',
				'.....,...HHHH.,.',
				'H........~~~~..,',
				'H.,,....,....,..',
				'...........,..,.',
				'.,...,,.........',
				'................',
			],
			fg:[
				'                ',
				'                ',
				'                ',
				'   ===  ===  ===',
				'                ',
				'                ',
				' ==|~~~~~~|===  ',
				'   |{-[]-}|     ',
				'   |{-()-}|     ',
				'   |{-<>-}    ==',
				'   =======    ##',
				'            ==##',
				'            ####',
				' ===========####',
				' ###############',
			]
		},
		'fire':{
			// bg:[
			// 	'              ==',
			// 	'             ==.',
			// 	'..=         ==.,',
			// 	'..=---o----.==..',
			// 	'.,=        ,==..',
			// 	'..=        ===,.',
			// 	'===        =====',
			// 	'           =====',
			// 	'---+-------=====',
			// 	'           ==...',
			// 	'           ==...',
			// 	'--------o--=....',
			// 	'           =..,=',
			// 	' ?!!!!!!!!!=====',
			// 	'??!!!!!!!!!=====',
			// ],
			// fg:[
			// 	'                ',
			// 	'___        _____',
			// 	'###|      |#####',
			// 	'   |      |    #',
			// 	'   |      |    #',
			// 	'       ___|_   #',
			// 	'      |#####   #',
			// 	'###   |        #',
			// 	'               #',
			// 	'   ___       ###',
			// 	'   ###          ',
			// 	'                ',
			// 	' #######  ###   ',
			// 	'   #HH    HH#   ',
			// 	'   ###    ###   ',
			// ]
			bg:[
				'                ',
				'                ',
				'                ',
				'                ',
				'            ====',
				'------+---o-=...',
				'            ====',
				'            ...=',
				'            ...=',
				'            ...=',
				'--o---------,..=',
				'            ====',
				'            ====',
				'  ?!!!!!!!!!====',
				' ??!!!!!!!!!====',
			],
			fg:[
				'##            ##',
				'HH             E',
				'##             E',
				'H#             E',
				'####|  ##   ####',
				'    |           ',
				'    |           ',
				'      ___  ###| ',
				' ___  ###     | ',
				' ###          | ',
				'              | ',
				'  ________    | ',
				'  ########   ## ',
				'        #H   HH ',
				'        ##   ## ',
			]
		},
		'1wily1':{
			bg:[
				'                ',
				'                ',
				'                ',
				'                ',
				'________________',
				'................',
				'................',
				'................',
				'................',
				'................',
				'................',
				'................',
				'................',
				'................',
				'................',
			],
			fg:[
				'                ',
				'                ',
				'                ',
				' |##          ',
				' |##    ##      ',
				' |########|###  ',
				' |        |     ',
				' |        |     ',
				'==        |   ==',
				'         13     ',
				'     13  46     ',
				'===  46      ===',
				'ABC          123',
				'DEF==========456',
				'23ABC123123ABCDF',
			]
		},
		'1wily4':{
			bg:[
				'..............  ',
				'..............  ',
				'..............  ',
				'..............  ',
				'................',
				'................',
				'........  ......',
				'........  ......',
				'  ......  ......',
				'  ......  ......',
				'  ....    ......',
				'  ....      ....',
				'...... ..   ....',
				'................',
				'................',
			],
			fg:[
				'4136          []',
				'346             ',
				'6               ',
				'              ()',
				'  ##          ##',
				'       |####    ',
				'       |  46    ',
				'##     |  13    ',
				'[]     |  46|## ',
				'    1|##  13|   ',
				'    4|    46|   ',
				'()   |      | ==',
				'13   | 13   | 46',
				'46=====46=====AC',
				'22313ABC1223ABAB',
			]
		},
		'heat':{
			bg:[
				'................',
				'................',
				'................',
				'................',
				'................',
				'................',
				'........O.......',
				'................',
				'................',
				'................',
				'................',
				'................',
				'.###############',
				'.#..............',
				'.#..............',
			],
			fg:[
				'                ',
				'                ',
				'                ',
				'          1 |HHH',
				'            |WWW',
				'HH|HH  0    |WWW',
				'HH|         |WWW',
				'HH|         |  E',
				'          2    E',
				'               E',
				'  #  #         E',
				'  #  #  ========',
				'         =  =  =',
				'  -------=--=--=',
				'                ',
			]
		},
		'bubble':{
			bg:[
				'................',
				'................',
				'................',
				'................',
				'................',
				'................',
				'~~~~~~~~........',
				'~~~~~~~~........',
				'~~~~~~~~~~~~~~~~',
				'~~~~~~~~~~~~~~~~',
				'~~~~~~~~~~~~~~~~',
				'~~~~~~~~~~~~~~~~',
				'~~~~~~~~~~~~~~~~',
				'~~~~~~~~~~~~~~~~',
				'~~~~~~~~~~~~~~~~',
			],
			fg:[
				'                ',
				'                ',
				'                ',
				' ###            ',
				'           #####',
				'             WWW',
				'    #T#T     WWW',
				'     +H|     WWW',
				'      H|##     E',
				'###   H+HH     E',
				'O              E',
				'O              E',
				'O#T#T##T##T##T##',
				'OH|H|HH|OO|HH|HH',
				'OH|H|HH|OO|HH|HH',
			]
		},
		'flash':{
			bg:[
				'.............111',
				'.............111',
				'...220.......111',
				'...|.........111',
				'...|....011....1',
				'-011.....|.....1',
				'.........|.....1',
				'.....112.|.....1',
				'.....0|00122--11',
				'---22012......2.',
				'......|.......02',
				'20....|...01220.',
				'|0....|...1..|11',
				'012220120012.|2.',
				'..|..|...|.0112.',
			],
			fg:[
				'             WWW',
				'             WWW',
				'   HH#       WWW',
				'             WWW',
				'        #HH    E',
				' #HH           E',
				'               E',
				'     HH#       E',
				'     I HH#HH  HH',
				'   HHI##      # ',
				'              I#',
				'#I        ##HHI ',
				' I        I   HH',
				'##HHH###HHI#  I ',
				'           #HHI ',
			]
		},
		'quick':{
			bg:[
				'FFFFdbFEEEHHHHHH',
				'FFEFqpEFEFFHHHHH',
				'HFFEdbdbEFFEHHHH',
				'HHEEqpqpFEEFFHHH',
				'HHHFFFEFFEFEFFHH',
				'HHHHFFFEEFFFFFFH',
				'HHHHHFFFFFEFFEFF',
				'HHHHHHFFFFFEEFFF',
				'HHHHHHHFEFFEEEFF',
				'HHHHHHHHFEEFEFFF',
				'HHHHHHHHHFFFFFFF',
				'HHHHHHHHFFFFFFFF',
				'HHHHHHHFFFFFFFFF',
				'HHHHHHFFFFFFFFFF',
				'HHHHHFFFFFFFFFFF',
			],
			fg:[
				'#              #',
				'#              #',
				'#              #',
				'#            ###',
				'###    ##      #',
				'#              #',
				'#          ##  #',
				'#    ##        #',
				'                ',
				'###          ###',
				'-+#            #',
				'#|###    ##    #',
				'-+-+#    ##    #',
				'#|#|###  #######',
				'-+-+-+#  #---+--',
			]
		},
		'wood':{
			bg:[
				'                ',
				'              OO',
				'            OOOO',
				'           OOOOO',
				'          OOOOOO',
				'O         OOOOOO',
				'OOO      OOOOOOO',
				'OOOO OOO OOOOOOO',
				'#########OOOOOOO',
				'#########00OOOOO',
				'#########/000I00',
				'#########/|/|I##',
				'#########____I##',
				'################',
				'################',
			],
			fg:[
				'                ',
				'                ',
				'                ',
				'             ---',
				'                ',
				'---             ',
				'      ##|---    ',
				'      ##|       ',
				'#|######|       ',
				'#|######|     ##',
				'#| #####|     ##',
				'#|      |   ####',
				'#|      |   ####',
				'################',
				'################',
			]
		},
		'metal':{
			bg:[
				'     dbdbqp     ',
				'     qpqp*   db ',
				'+db         +qp*',
				'bqp--WWWW--* * d',
				'p+*          +*q',
				'* +           + ',
				' * db           ',
				' dbqp      --WWW',
				' qp        +    ',
				'  *--WWWWdb    d',
				'        +qp    q',
				'       db*      ',
				'TT     qp       ',
				'||              ',
				'MM              ',
			],
			fg:[
				'                ',
				'                ',
				'                ',
				'                ',
				'     >>>>     01',
				'               (',
				'134            (',
				'^6     >>>>    (',
				'v8           [db',
				' 9134        [qp',
				'         0134[db',
				'         0134[qp',
				'  <<<<0134() [db',
				'  [qp] ()0134[qp',
				'  [db] () () [db',
			]
		},
		'air':{
			bg:[
				'#######P   Q####',
				'######P     Q###',
				'###Pqp       Q##',
				'P P           qp',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'db              ',
				'##BD            ',
				'#####B    db    ',
				'######BdbD##Bdb ',
				'###############B',
			],
			fg:[
				'                ',
				'                ',
				'                ',
				' q     #<>#     ',
				'                ',
				'              # ',
				'    #<>#        ',
				'            #   ',
				'>#              ',
				'                ',
				'          ^     ',
				'    b<>#        ',
				'>#              ',
				'                ',
				'                ',
			]
		},
		'crash':{
			bg:[
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
			],
			fg:[
				'3P            DN',
				'NB            3C',
				'OC            HU',
				'3H      <=|>  QC',
				'HC        |   DO',
				'db  <|==> |   QN',
				'qp   |    | EEEE',
				'QC   |        DU',
				'EEEE |        3C',
				'db   |  <|>   HC',
				'qp   |   |    3O',
				'3BDUOB   |  D=HC',
				'H3NHUC   |  QUB3',
				'QHUCDUBnDUBnDHCI',
				'B3ONC3ONC3ONC3ON',
				//'OCQHOCQHOCQHOCQH',
			]
		},
		'2wily1':{
			bg:[
				'=====><=IIIIIIII',
				'  <>   <IIIIIIII',
				'        IIIIHIII',
				'        IIIIIIII',
				'        IIIIIIII',
				' 12     HIIHIHII',
				'345     IIIIIIII',
				'6789    IIIIIIII',
				'    ****IIIIIIII',
				'    ****IIIIHHII',
				'    *E**IIIIIIII',
				'    *E*EIIIHIHII',
				'                ',
				'                ',
				'                ',
			],
			fg:[
				'        <HH><HHH',
				'        <HH>   H',
				'       1<      <',
				'       23      <',
				'            <>|<',
				'            <>|<',
				'==     45>|<H>|<',
				'==     6<>|<H>|<',
				'====|   <>    |<',
				'WW==|   <>    |<',
				'WW==|        <HH',
				'====|        <HH',
				'####---------###',
				'################',
				'################',
			]
		},
		'def':{
			bg:[
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
			],
			fg:[
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'################',
				'################',
			]
		},
	}
	p.maps.width = 16;
	p.maps.height = 15;
	p.maps.parse = function(newMapName){
		if(newMapName !== undefined)p.mapName = newMapName;
		for(var i = 0; i < game.tiles.length; i ++)game.tiles[i].remove();
		game.tiles = [];
		game.tiles.length = 0;
		for(var i = 0; i < game.platforms.length; i ++)game.platforms[i].remove();
		game.platforms = [];
		game.platforms.length = 0;
		for(var i = 0; i < game.enemies.length; i ++)game.enemies[i].remove();
		game.enemies = [];
		game.enemies.length = 0;
		for(var i = 0; i < game.elecBlocks.length; i ++)game.elecBlocks[i].remove();
		game.elecBlocks = [];
		game.elecBlocks.length = 0;
		for(var i = 0; i < game.lasers.length; i ++)game.lasers[i].remove();
		game.lasers = [];
		game.lasers.length = 0;
		var tp = 0;
		for(var i = 0; i < game.teleportPoints.length; i ++)game.teleportPoints[i].remove();
		game.teleportPoints = [];
		game.teleportPoints.length = 0;
		game.tilesByIds = {};
		for(var i = 0; i < p.maps.height; i ++)for(var j = 0; j < p.maps.width; j ++){
			game.tilesByIds[j+'_'+i] = {};
			game.tilesByIds[j+'_'+i].solid = false;
			game.tilesByIds[j+'_'+i].ladder = false;
			game.tilesByIds[j+'_'+i].lava = false;
			game.tilesByIds[j+'_'+i].damage = 0;
		}
		if(p.mapName === 'quick')game.quickLaser = new QuickLaser(-1, 120);
		if(newMapName !== 'none'){
			var map = p.maps[p.mapName];
			for(var i = 0; i < p.maps.height; i ++)for(var j = 0; j < p.maps.width; j ++){
				var indexX = 0;
				var indexY = 0;
				var solid = false;
				var through = false;
				var ladder = false;
				var water = false;
				var damage = 0;
				var skip = false;
				var depth = 1;
				var speed = 0;
				var frames = 0;
				var indexDirectionX = 1;
				var indexDirectionY = 0;
				var timer = 0;
				var limit = 0;
				var sway = false;
				var b = map.bg[i][j];
				var n = p.mapName;
				if(j > 0)var bl = map.bg[i][j-1];
				else var bl = undefined;
				if(j < p.maps.width-1)var br = map.bg[i][j+1];
				else var br = undefined;
				if(i > 0)var bu = map.bg[i-1][j];
				else var bu = undefined;
				if(i < p.maps.height-1)var bd = map.bg[i+1][j];
				else var bd = undefined;
				var f = map.fg[i][j];
				if(j > 0)var fl = map.fg[i][j-1];
				else var fl = undefined;
				if(j < p.maps.width-1)var fr = map.fg[i][j+1];
				else var fr = undefined;
				if(i > 0)var fu = map.fg[i-1][j];
				else var fu = undefined;
				if(i < p.maps.height-1)var fd = map.fg[i+1][j];
				else var fd = undefined;
				if(j > 0 && i > 0)var ful = map.fg[i-1][j-1];
				else var ful = undefined;
				if(j < p.maps.width-1 && i > 0)var fur = map.fg[i-1][j+1];
				else var fur = undefined;
				if(j > 0 && i < p.maps.height-1)var fdl = map.fg[i+1][j-1];
				else var fdl = undefined;
				if(j < p.maps.width-1 && i < p.maps.height-1)var fdr = map.fg[i+1][j+1];
				else var fdr = undefined;
				if(n === 'bomb'){
					if(f === '='){
						solid = true;
						if((fl!=='='&&fl!=='#')&&(fr==='='||fr==='#'||fr===undefined))indexX = tileSheets[n].x;
						if((fl==='='||fl==='#'||fl===undefined)&&(fr!=='='&&fr!=='#'))indexX = tileSheets[n].x+2;
						if(((fl==='='||fl==='#'||fl===undefined)&&(fr==='='||fr==='#'||fr===undefined)) || (fl!=='='&&fl!=='#')&&(fr!=='='&&fr!=='#'))indexX = tileSheets[n].x+1;
						indexY = 2;
					}
					if(f === '|'){
						if(fu !== '|'){
							ladder = true;
							through = true;
						}
						indexX = tileSheets[n].x;
						indexY = 1;
					}
					if(f === '#'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 3;
						if(fl!=='#'&&(fr==='#'||fr===undefined)&&(fu==='#'||fu===undefined)){
							indexX = tileSheets[n].x;
							indexY = 4;
						} else
						if(fl==='#'&&fr!=='#'&&(fu==='#'||fu===undefined)){
							indexX = tileSheets[n].x+2;
							indexY = 4;
						} else
						if(fl!=='#'&&(fr==='#'||fr===undefined)&&fu!=='#'&&(fd==='#'||fd===undefined)){
							indexX = tileSheets['bomb'].x;
							indexY = 3;
						} else
						if(fl==='#'&&fr!=='#'&&fu!=='#'&&(fd==='#'||fd===undefined)){
							indexX = tileSheets['bomb'].x+2;
							indexY = 3;
						} else
						if(fl==='#'&&fr==='#'&&fu==='#'&&(fd==='#'||fd!=='#'||fd===undefined)){
							indexX = tileSheets['bomb'].x+1;
							indexY = 4;
						}
					}
				} else
				if(n === 'elec'){
					if(f==='#'){
						solid = true;
						if(fu!=='#'&&fd!=='#'&&fl!=='#'&&fr!=='#'){
							indexX = tileSheets[n].x;
							indexY = 3;
						} else {
							if(fu!=='#'){
								if(j%3===0){
									indexX = tileSheets[n].x+1;
									indexY = 4;
								}
								if(j%3===1){
									indexX = tileSheets[n].x+1;
									indexY = 5;
								}
								if(j%3===2){
									indexX = tileSheets[n].x;
									indexY = 3;
								}
							} else {
								if(j%2===0&&i%2===0){
									indexX = tileSheets[n].x;
									indexY = 5;
								}
								if(j%2===1&&i%2===0){
									indexX = tileSheets[n].x+2;
									indexY = 5;
								}
								if(j%2===0&&i%2===1){
									indexX = tileSheets[n].x;
									indexY = 4;
								}
								if(j%2===1&&i%2===1){
									indexX = tileSheets[n].x+2;
									indexY = 4;
								}
							}
						}
					}
					if(f === '0'){
						new Yoku(j, i, 0, 0);
						skip = true;
					}
					if(f === '1'){
						new Yoku(j, i, 1, 0);
						skip = true;
					}
					if(f === '2'){
						new Yoku(j, i, 2, 0);
						skip = true;
					}
					if(f==='I'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 5;
						new ElecBlock(j*tileSize, i*tileSize-8);
					}
					if(f==='='){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 3;
					}
					if(f==='H'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 3;
					}
					if(f==='O'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 3;
					}
					if(f==='('){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 4;
					}
					if(f===')'){
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 4;
					}
					if(f==='|'){
						if(fu !== '|'){
							ladder = true;
							through = true;
						}
						indexX = tileSheets[n].x+4;
						indexY = 5;
					}
				} else
				if(n === 'guts'){
					if(f === '|'){
						if(fu !== '|'){
							ladder = true;
							through = true;
						}
						indexX = tileSheets[n].x+4;
						indexY = 5;
					}
					if(f === 'X'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 3;
					}
					if(f === '^'){
						damage = 26;
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 4;
					}
					if(f === '='){
						solid = true;
						if(fd === '#'){
							indexX = tileSheets[n].x+3;
							indexY = 4;
						} else {
							indexX = tileSheets[n].x+2;
							indexY = 4;
						}
					}
					if(f === 'P'){
						new Platform(j, i, 0);
						new Tile(j*tileSize, i*tileSize-8, depth, tileSheets[n].x, 1, solid, through, false, false, damage);
						skip = true;
					}
					if(f === 'O'){
						indexX = tileSheets[n].x;
						indexY = 1;
					}
					if(f === '-'){
						indexX = tileSheets[n].x+1;
						indexY = 1;
					}
					if(f === '~'){
						indexX = tileSheets[n].x;
						indexY = 2;
					}
					if(f === '#'){
						solid = true;
						if(fr === '#'){
							if(j%2===0 && i%2===1){
								indexX = tileSheets[n].x+5;
								indexY = 2;
							}
							if(j%2===0 && i%2===0){
								indexX = tileSheets[n].x+5;
								indexY = 0;
							}
							if(j%2===1 && i%2===1){
								indexX = tileSheets[n].x+5;
								indexY = 3;
							}
							if(j%2===1 && i%2===0){
								indexX = tileSheets[n].x+5;
								indexY = 1;
							}
						} else {
							indexX = tileSheets[n].x+5;
							indexY = 4;
						}
					}
				} else
				if(n === 'ice'){
					if(f === '~'){
						water = true;
						indexX = tileSheets[n].x+5;
						indexY = 5;
						if(fu === ' '){
							indexX = tileSheets[n].x+5;
							indexY = 4;
						}
					}
					if(f === 'I'){
						solid = true;
						if(fu !== 'I' && fu !== 'H'){
							indexX = tileSheets[n].x+5;
							indexY = 1;
						} else {
							indexX = tileSheets[n].x+5;
							indexY = 2;
						}
					}
					if(f === '0'){
						new Yoku(j, i, 0, 1);
						skip = true;
					}
					if(f === '1'){
						new Yoku(j, i, 1, 1);
						skip = true;
					}
					if(f === '2'){
						new Yoku(j, i, 2, 1);
						skip = true;
					}
					if(f === '|'){
						if(fu !== '|'){
							ladder = true;
							through = true;
						}
						indexX = tileSheets[n].x;
						indexY = 3;
					}
					if(f === 'H'){
						solid = true;
						indexX = tileSheets[n].x+5;
						indexY = 3;
					}
					if(f === '['){
						solid = true;
						if(fd === '['){
							indexX = tileSheets[n].x;
							indexY = 4;
						} else {
							indexX = tileSheets[n].x;
							indexY = 5;
						}
					}
					if(f === ']'){
						solid = true;
						if(fu !== ']'){
							indexX = tileSheets[n].x+1;
							indexY = 4;
						} else {
							indexX = tileSheets[n].x+1;
							indexY = 5;
						}
					}
					if(f === '{'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 4;
					}
					if(f === '='){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 5;
					}
					if(f === '#'){
						solid = true;
						if(fu!== '#' && fu !== '=' && fu !== '{' && fu !== '[' && fu !== ']' && fu !== 'I' && fu !== 'H'){
							if(j%2===0){
								indexX = tileSheets[n].x+3;
								indexY = 2;
							}
							if(j%2===1){
								indexX = tileSheets[n].x+4;
								indexY = 2;
							}
						} else {
							if(j%2===0){
								indexX = tileSheets[n].x+3;
								indexY = 3;
							}
							if(j%2===1){
								indexX = tileSheets[n].x+4;
								indexY = 3;
							}
						}
					}
				} else
				if(n === 'cut'){
					if(f === '^'){
						damage = 26;
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 2;
					}
					if(f === '|'){
						if(fu !== '|'){
							ladder = true;
							through = true;
						}
						indexX = tileSheets[n].x+4;
						indexY = 3;
					}
					if(f === 'E'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 2;
					}
					if(f === '='){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 2;
					}
					if(f === '#'){
						solid = true;
						indexX = tileSheets[n].x;
						if((j+i)%2===0)indexY = 1;
						else indexY = 2;
					}
					if(f === '~'){
						solid = true;
						indexY = 3;
						if(fl === '~' || fl === undefined)indexX = tileSheets[n].x+2;
						if(fr === '~' || fr === undefined)indexX = tileSheets[n].x;
						if(fl === '~' && fr === '~')indexX = tileSheets[n].x+1;
					}
					if(f === '('){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 4;
					}
					if(f === ')'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 4;
					}
					if(f === '<'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 5;
					}
					if(f === '>'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 5;
					}
					if(f === '{'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 4;
					}
					if(f === '}'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 4;
					}
					if(f === '['){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 5;
					}
					if(f === ']'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 5;
					}
					if(f === '-'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 3;
					}
				} else
				if(n === 'fire'){
					if(f === '_'){
						indexX = tileSheets[n].x+3;
						indexY = 2;
						depth = 5;
					}
					if(f === '|'){
						if(fu !== '|'){
							ladder = true;
							through = true;
						}
						indexX = tileSheets[n].x+3;
						indexY = 3;
					}
					if(f === '<'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 5;
					}
					if(f === '{'){
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 5;
					}
					if(f === ']'){
						solid = true;
						indexX = tileSheets[n].x+5;
						indexY = 5;
					}
					if(f === 'E'){
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 3;
					}
					if(f === 'H'){
						solid = true;
						indexX = tileSheets[n].x+5;
						indexY = 4;
					}
					if(f === '#'){
						solid = true;
						if(fu === '_')depth = 4;
						if(fu !== 'H' && fu !== '#' && fu !== undefined){
							indexX = tileSheets[n].x+3;
							indexY = 4;
						} else {
							indexX = tileSheets[n].x+4;
							indexY = 4;
						}
					}
				}
				if(n === '1wily1'){
					if(f === '='){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 1;
					}
					if(f === '#'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 2;
					}
					if(f === '1'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 1;
					}
					if(f === '2'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 1;
					}
					if(f === '3'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 1;
					}
					if(f === '4'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 2;
					}
					if(f === '5'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 2;
					}
					if(f === '6'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 2;
					}
					if(f === 'A'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 3;
					}
					if(f === 'B'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 3;
					}
					if(f === 'C'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 3;
					}
					if(f === 'D'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 4;
					}
					if(f === 'E'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 4;
					}
					if(f === 'F'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 4;
					}
					if(f === '|'){
						if(fu !== '|'){
							ladder = true;
							through = true;
						}
						indexX = tileSheets[n].x+3;
						indexY = 3;
					}
					if(f === '^'){
						damage = 26;
						solid = true;
						if(fu !== ' '){
							indexX = tileSheets[n].x+3;
							indexY = 5;
						}
						if(fd !== ' '){
							indexX = tileSheets[n].x+3;
							indexY = 4;
						}
					}
				}
				if(n === '1wily4'){
					if(f === '='){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 1;
					}
					if(f === '#'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 2;
					}
					if(f === 'H'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 3;
					}
					if(f === '8'){
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 0;
					}
					if(f === '['){
						solid = true;
						indexX = tileSheets[n].x+5;
						indexY = 0;
					}
					if(f === ']'){
						solid = true;
						indexX = tileSheets[n].x+6;
						indexY = 0;
					}
					if(f === '('){
						solid = true;
						indexX = tileSheets[n].x+5;
						indexY = 1;
						new TeleportPoint((j+1)*tileSize, (i-1)*tileSize-8, tp);
						tp ++;
					}
					if(f === ')'){
						solid = true;
						indexX = tileSheets[n].x+6;
						indexY = 1;
					}
					if(f === '1'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 1;
					}
					if(f === '2'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 1;
					}
					if(f === '3'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 1;
					}
					if(f === '4'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 2;
					}
					if(f === '5'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 2;
					}
					if(f === '6'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 2;
					}
					if(f === 'A'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 3;
					}
					if(f === 'B'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 3;
					}
					if(f === 'C'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 3;
					}
					if(f === 'D'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 4;
					}
					if(f === 'E'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 4;
					}
					if(f === 'F'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 4;
					}
					if(f === '|'){
						if(fu !== '|'){
							ladder = true;
							through = true;
						}
						indexX = tileSheets[n].x+4;
						indexY = 1;
					}
					if(f === '^'){
						damage = 26;
						solid = true;
						if(fu !== ' '){
							indexX = tileSheets[n].x+4;
							indexY = 3;
						}
						if(fd !== ' '){
							indexX = tileSheets[n].x+4;
							indexY = 2;
						}
					}
					if(f === 'P'){
						new Platform(j, i, 1);
						new Tile(j*tileSize, i*tileSize-8, depth, tileSheets[n].x, 5, solid, through, ladder, false, false, damage);
						skip = true;
					}
					if(f === 'O'){
						indexX = tileSheets[n].x;
						indexY = 5;
					}
					if(f === '-'){
						indexX = tileSheets[n].x+1;
						indexY = 5;
					}
					if(f === '~'){
						indexX = tileSheets[n].x+2;
						indexY = 5;
					}
				}
				if(n === 'heat'){
					if(f === '#'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 2;
					}
					if(f === 'H'){
						solid = true;
						if(fu !== 'H' && fd !== 'H')indexX = tileSheets[n].x+2;
						else if((fu === 'H' || fu === undefined) && (fd === 'H' || fd === undefined))indexX = tileSheets[n].x+3;
						else if(!(fu === 'H' || fu === undefined))indexX = tileSheets[n].x+1;
						else if(!(fd === 'H' || fd === undefined))indexX = tileSheets[n].x+4;
					}
					if(f === '='){
						depth = 2;
						solid = true;
						if(fu === '=' && fd === '=')indexX = tileSheets[n].x+6;
						else if(fu !== '=' && fd !== '=')indexX = tileSheets[n].x+8;
						else if(fu !== '=')indexX = tileSheets[n].x+5;
						else if(fd !== '=')indexX = tileSheets[n].x+7;
					}
					if(f === '-'){
						depth = 2;
						indexX = tileSheets[n].x+9;
						indexY = 0;
						solid = true;
					}
					if(f === 'W'){
						solid = true;
						if(fl !== 'W' && fd !== 'W'){
							indexX = tileSheets[n].x+5;
							indexY = 5;
						} else if(fl !== 'W' && fd === 'W'){
							indexX = tileSheets[n].x+5;
							indexY = 4;
						} else if(fl === 'W' && fd !== 'W'){
							indexX = tileSheets[n].x+6;
							indexY = 5;
						} else if(fl === 'W' && fd === 'W' && map.fg[i][j-2] !== 'W' && map.fg[i+2][j] !== 'W'){
							indexX = tileSheets[n].x+6;
							indexY = 4;
						} else if(fl === 'W' && fd === 'W' && map.fg[i][j-2] !== 'W' && map.fg[i+2][j] === 'W' && map.fg[i+3][j] !== 'W'){
							indexX = tileSheets[n].x+6;
							indexY = 3;
						} else if(fl === 'W' && fd === 'W' && map.fg[i][j-2] === 'W' && map.fg[i][j-3] !== 'W' && map.fg[i+2][j] !== 'W'){
							indexX = tileSheets[n].x+7;
							indexY = 4;
						} else if(fl === 'W' && fd === 'W' && map.fg[i][j-2] === 'W' && map.fg[i][j-3] !== 'W' && map.fg[i+2][j] === 'W' && map.fg[i+3][j] !== 'W'){
							indexX = tileSheets[n].x+7;
							indexY = 3;
						} else {
							indexX = tileSheets[n].x+7;
							indexY = 5;
						}
					}
					if(f === 'E'){
						solid = true;
						indexX = tileSheets[n].x+9;
						indexY = 3;
					}
					if(f === '|'){
						if(fu !== '|'){
							ladder = true;
							through = true;
						}
						indexX = tileSheets[n].x+9;
						indexY = 2;
					}
					if(f === '0'){
						new Yoku(j, i, 0, 2);
						skip = true;
					}
					if(f === '1'){
						new Yoku(j, i, 1, 2);
						skip = true;
					}
					if(f === '2'){
						new Yoku(j, i, 2, 2);
						skip = true;
					}
				}
				if(n === 'bubble'){
					depth = 2;
					if(f === '#'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 1;
						if(b === '~')indexY = 2;
					}
					if(f === 'O'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 1;
						if(b === '~')indexY = 2;
					}
					if(f === 'T'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 1;
						if(b === '~')indexY = 2;
					}
					if(f === '|'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 1;
					}
					if(f === '+'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 2;
					}
					if(f === 'H'){
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 0;
					}
					if(f === 'E'){
						solid = true;
						indexX = tileSheets[n].x+7;
						indexY = 2;
					}
					if(f === 'W'){
						solid = true;
						if(fl !== 'W' && fd !== 'W'){
							indexX = tileSheets[n].x+5;
							indexY = 2;
						} else if(fl !== 'W' && fd === 'W'){
							indexX = tileSheets[n].x+5;
							indexY = 1;
						} else if(fl === 'W' && fd !== 'W'){
							indexX = tileSheets[n].x+6;
							indexY = 2;
						} else if(fl === 'W' && fd === 'W' && map.fg[i][j-2] !== 'W' && map.fg[i+2][j] !== 'W'){
							indexX = tileSheets[n].x+6;
							indexY = 1;
						} else if(fl === 'W' && fd === 'W' && map.fg[i][j-2] !== 'W' && map.fg[i+2][j] === 'W' && map.fg[i+3][j] !== 'W'){
							indexX = tileSheets[n].x+6;
							indexY = 0;
						} else if(fl === 'W' && fd === 'W' && map.fg[i][j-2] === 'W' && map.fg[i][j-3] !== 'W' && map.fg[i+2][j] !== 'W'){
							indexX = tileSheets[n].x+7;
							indexY = 1;
						} else if(fl === 'W' && fd === 'W' && map.fg[i][j-2] === 'W' && map.fg[i][j-3] !== 'W' && map.fg[i+2][j] === 'W' && map.fg[i+3][j] !== 'W'){
							indexX = tileSheets[n].x+7;
							indexY = 0;
						} else {
							indexX = tileSheets[n].x+5;
							indexY = 0;
						}
					}
				}
				if(n === 'flash'){
					if(f === '#'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 0;
					}
					if(f === 'I'){
						solid = true;
						indexX = tileSheets[n].x;
						if(fu !== 'I' && fd === 'I')indexY = 3;
						else if(fu === 'I' && fd !== 'I')indexY = 5;
						else indexY = 4;
					}
					if(f === 'H'){
						solid = true;
						indexX = tileSheets[n].x;
						if(fl !== 'H' && fr === 'H')indexY = 0;
						else if(fl === 'H' && fr !== 'H')indexY = 2;
						else indexY = 1;
					}
					if(f === 'E'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 1;
					}
					if(f === 'W'){
						solid = true;
						if(fl !== 'W' && fd !== 'W'){
							indexX = tileSheets[n].x+1;
							indexY = 3;
						} else if(fl !== 'W' && fd === 'W'){
							indexX = tileSheets[n].x+1;
							indexY = 2;
						} else if(fl === 'W' && fd !== 'W'){
							indexX = tileSheets[n].x+1;
							indexY = 4;
						} else if(fl === 'W' && fd === 'W' && map.fg[i][j-2] !== 'W' && map.fg[i+2][j] !== 'W'){
							indexX = tileSheets[n].x+2;
							indexY = 4;
						} else if(fl === 'W' && fd === 'W' && map.fg[i][j-2] !== 'W' && map.fg[i+2][j] === 'W' && map.fg[i+3][j] !== 'W'){
							indexX = tileSheets[n].x+2;
							indexY = 2;
						} else if(fl === 'W' && fd === 'W' && map.fg[i][j-2] === 'W' && map.fg[i][j-3] !== 'W' && map.fg[i+2][j] !== 'W'){
							indexX = tileSheets[n].x+2;
							indexY = 5;
						} else if(fl === 'W' && fd === 'W' && map.fg[i][j-2] === 'W' && map.fg[i][j-3] !== 'W' && map.fg[i+2][j] === 'W' && map.fg[i+3][j] !== 'W'){
							indexX = tileSheets[n].x+2;
							indexY = 3;
						} else {
							indexX = tileSheets[n].x+1;
							indexY = 5;
						}
					}
					if(f === '#' || f === 'I' || f === 'E' || f === 'H' || f === 'W'){
						var index = 0;
						if(b === '0')index = 0;
						if(b === '1')index = 1;
						if(b === '2')index = 2;
						new FlashTile(j*tileSize, i*tileSize-8, depth, indexX, indexY, index);
						skip = true;
					}
				}
				if(n === 'quick'){
					if(fu === undefined || fu === '-' || fu === '|' || fu === '+')fu = '#';
					if(fd === undefined || fd === '-' || fd === '|' || fd === '+')fd = '#';
					if(fl === undefined || fl === '-' || fl === '|' || fl === '+')fl = '#';
					if(fr === undefined || fr === '-' || fr === '|' || fr === '+')fr = '#';
					if(ful === undefined || ful === '-' || ful === '|' || ful === '+')ful = '#';
					if(fur === undefined || fur === '-' || fur === '|' || fur === '+')fur = '#';
					if(fdl === undefined || fdl === '-' || fdl === '|' || fdl === '+')fdl = '#';
					if(fdr === undefined || fdr === '-' || fdr === '|' || fdr === '+')fdr = '#';
					if(f === '-'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 3;
					}
					if(f === '|'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 3;
					}
					if(f === '+'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 3;
					}
					if(f === '#'){
						solid = true;
						if(fu === '#' && fd === '#' && fl === '#' && fr === '#' && ful === '#' && fur === '#' && fdl === '#' && fdr === '#'){
							indexX = tileSheets[n].x;
							indexY = 3;
						} else if(fu === '#' && fl === '#' && fd === '#' && fr === '#' && ful !== '#'){
							indexX = tileSheets[n].x+4;
							indexY = 1;
						} else if(fu === '#' && fl === '#' && fd === '#' && fr === '#' && fur !== '#'){
							indexX = tileSheets[n].x+3;
							indexY = 1;
						} else if(fu === '#' && fl === '#' && fd === '#' && fr === '#' && fdl !== '#'){
							indexX = tileSheets[n].x+2;
							indexY = 1;
						} else if(fu === '#' && fl === '#' && fd === '#' && fr === '#' && fdr !== '#'){
							indexX = tileSheets[n].x+1;
							indexY = 1;
						} else if(fu === '#' && fd !== '#' && fl !== '#' && fr !== '#'){
							indexX = tileSheets[n].x;
							indexY = 2;
						} else if(fu !== '#' && fd === '#' && fl !== '#' && fr !== '#'){
							indexX = tileSheets[n].x;
							indexY = 1;
						} else if(fu === '#' && fd === '#' && fl !== '#' && fr !== '#'){
							indexX = tileSheets[n].x+3;
							indexY = 2;
						} else if(fu !== '#' && fd !== '#' && fl === '#' && fr !== '#'){
							indexX = tileSheets[n].x+1;
							indexY = 4;
						} else if(fu !== '#' && fd !== '#' && fl !== '#' && fr === '#'){
							indexX = tileSheets[n].x;
							indexY = 4;
						} else if(fu !== '#' && fd !== '#' && fl === '#' && fr === '#'){
							indexX = tileSheets[n].x+2;
							indexY = 2;
						} else if(fu === '#' && fd !== '#' && fl === '#' && fr === '#'){
							indexX = tileSheets[n].x+1;
							indexY = 2;
						} else if(fu !== '#' && fd === '#' && fl === '#' && fr === '#'){
							indexX = tileSheets[n].x+2;
							indexY = 2;
						} else if(fu === '#' && fd === '#' && fl === '#' && fr !== '#'){
							indexX = tileSheets[n].x+4;
							indexY = 2;
						} else if(fu === '#' && fd === '#' && fl !== '#' && fr === '#'){
							indexX = tileSheets[n].x+3;
							indexY = 2;
						} else if(fu !== '#' && fl !== '#'){
							indexX = tileSheets[n].x+5;
							indexY = 2;
						} else if(fu !== '#' && fr !== '#'){
							indexX = tileSheets[n].x+6;
							indexY = 2;
						} else if(fd !== '#' && fl !== '#'){
							indexX = tileSheets[n].x+5;
							indexY = 3;
						} else if(fd !== '#' && fr !== '#'){
							indexX = tileSheets[n].x+6;
							indexY = 3;
						}
					}
				}
				if(n === 'wood'){
					if(f === '#'){
						solid = true;
						indexX = tileSheets[n].x+5;
						if(fu !== '#'){

						} else if(fd !== '#'){
							indexY = 3;
						} else{
							if(j%2===0){
								indexY = 1;
							} else {
								indexY = 2;
							}
						}
					}
					if(f === '-'){
						through = true;
						indexX = tileSheets[n].x;
						indexY = 3;
					}
					if(f === '|'){
						if(fu !== '|'){
							ladder = true;
							through = true;
						}
						indexX = tileSheets[n].x;
						indexY = 2;
					}
				}
				if(n === 'metal'){
					var defLimit = 7;
					if(f === '('){
						solid = true;
						indexX = tileSheets[n].x+6;
						indexY = 3;
					}
					if(f === ')'){
						solid = true;
						indexX = tileSheets[n].x+7;
						indexY = 3;
					}
					if(f === '['){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 3;
					}
					if(f === ']'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 3;
					}
					if(f === 'd'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 3;
					}
					if(f === 'b'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 3;
					}
					if(f === 'q'){
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 3;
					}
					if(f === 'p'){
						solid = true;
						indexX = tileSheets[n].x+5;
						indexY = 3;
					}
					if(f === '^'){
						solid = true;
						indexX = tileSheets[n].x+8;
						indexY = 3;
					}
					if(f === 'v'){
						solid = true;
						indexX = tileSheets[n].x+9;
						indexY = 3;
					}
					if(f === '0'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 4;
					}
					if(f === '1'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 4;
					}
					if(f === '2'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 4;
					}
					if(f === '3'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 4;
					}
					if(f === '4'){
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 4;
					}
					if(f === '5'){
						solid = true;
						indexX = tileSheets[n].x+5;
						indexY = 4;
					}
					if(f === '6'){
						solid = true;
						indexX = tileSheets[n].x+6;
						indexY = 4;
					}
					if(f === '7'){
						solid = true;
						indexX = tileSheets[n].x+7;
						indexY = 4;
					}
					if(f === '8'){
						solid = true;
						indexX = tileSheets[n].x+8;
						indexY = 4;
					}
					if(f === '9'){
						solid = true;
						indexX = tileSheets[n].x+9;
						indexY = 4;
					}
					if(f === '<'){
						solid = true;
						speed = -1;
						if(fl !== '<' || fr !== '<'){
							indexX = tileSheets[n].x+5;
							frames = 5;
							indexDirectionX = 4;
							indexDirectionY = 0;
						} else {
							indexX = tileSheets[n].x+6;
							frames = 2;
							indexDirectionX = 1;
							indexDirectionY = 0;
						}
						limit = 4;
						timer = 0;
						indexY = 2;
					}
					if(f === '>'){
						solid = true;
						speed = 1;
						if(fl !== '>' || fr !== '>')indexX = tileSheets[n].x+8;
						else indexX = tileSheets[n].x+6;
						indexY = 2;
						frames = 2;
						indexDirectionX = 1;
						indexDirectionY = 0;
						limit = 4;
						timer = 0;
					}
				}
				if(n === 'air'){
					if(f === '#'){
						solid = true;
						depth = 3;
						indexX = tileSheets[n].x+5;
						indexY = 1;
					} else
					if(f === '<'){
						solid = true;
						depth = 3;
						indexX = tileSheets[n].x+6;
						indexY = 1;
					} else
					if(f === '>'){
						solid = true;
						depth = 3;
						indexX = tileSheets[n].x+7;
						indexY = 1;
					} else
					if(f === 'd'){
						solid = true;
						depth = 4;
						indexX = tileSheets[n].x+8;
						indexY = 1;
					} else
					if(f === 'b'){
						solid = true;
						depth = 4;
						indexX = tileSheets[n].x+9;
						indexY = 1;
					} else
					if(f === 'q'){
						solid = true;
						depth = 4;
						indexX = tileSheets[n].x+10;
						indexY = 1;
					} else
					if(f === '^'){
						new Goblin(j*tileSize, i*tileSize-8);
						skip = true;
					}
				}
				if(n === 'crash'){
					if(f === '#'){
						solid = true;
					} else
					if(f === '<'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 3;
					} else
					if(f === '='){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 3;
					} else
					if(f === '>'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 3;
					} else
					if(f === 'E'){
						if(fl === undefined)fl = 'E';
						if(fr === undefined)fr = 'E';
						solid = true;
						indexY = 3;
						if(fl === 'E' && fr === 'E'){
							indexX = tileSheets[n].x+4;
						} else if(fl !== 'E' && fr === 'E'){
							indexX = tileSheets[n].x+3;
						} else if(fl === 'E' && fr !== 'E'){
							indexX = tileSheets[n].x+5;
						} else {
							indexX = tileSheets[n].x+4;
						}
					} else
					if(f === 'D'){
						solid = true;
						indexX = tileSheets[n].x+6;
						indexY = 3;
					} else
					if(f === 'B'){
						solid = true;
						indexX = tileSheets[n].x+7;
						indexY = 3;
					} else
					if(f === 'Q'){
						solid = true;
						indexX = tileSheets[n].x+6;
						indexY = 4;
					} else
					if(f === 'P'){
						solid = true;
						indexX = tileSheets[n].x+7;
						indexY = 4;
					} else
					if(f === 'n'){
						solid = true;
						indexX = tileSheets[n].x+8;
						indexY = 3;
					} else
					if(f === 'I'){
						solid = true;
						indexX = tileSheets[n].x+8;
						indexY = 4;
					} else
					if(f === 'u'){
						solid = true;
						indexX = tileSheets[n].x+8;
						indexY = 5;
					} else
					if(f === 'C'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 4;
					} else
					if(f === '3'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 4;
					} else
					if(f === 'O'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 4;
					} else
					if(f === 'U'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 4;
					} else
					if(f === 'N'){
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 4;
					} else
					if(f === 'H'){
						solid = true;
						indexX = tileSheets[n].x+5;
						indexY = 4;
					} else
					if(f === 'd'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 2;
					} else
					if(f === 'b'){
						solid = true;
						indexX = tileSheets[n].x+1;
						indexY = 2;
					} else
					if(f === 'q'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 2;
					} else
					if(f === 'p'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 2;
					} else
					if(f === '|'){
						if(fu !== '|'){
							ladder = true;
							through = true;
						}
						indexX = tileSheets[n].x+8;
						indexY = 1;
					}
				}
				if(n === '2wily1'){
					if(f === '1'){
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 1;
					}
					if(f === '2'){
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 2;
					}
					if(f === '3'){
						solid = true;
						indexX = tileSheets[n].x+5;
						indexY = 2;
					}
					if(f === '4'){
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 3;
					}
					if(f === '5'){
						solid = true;
						indexX = tileSheets[n].x+5;
						indexY = 3;
					}
					if(f === '6'){
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 4;
					}
					if(f === '-'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 3;
						if(j%2===1)indexX ++;
					}
					if(f === '#'){
						solid = true;
						indexX = tileSheets[n].x;
						indexY = 4;
						if(j%2===1)indexX ++;
					}
					if(f === '<'){
						solid = true;
						indexX = tileSheets[n].x+2;
						indexY = 5;
					}
					if(f === 'H'){
						solid = true;
						indexX = tileSheets[n].x+3;
						indexY = 5;
					}
					if(f === '>'){
						solid = true;
						indexX = tileSheets[n].x+4;
						indexY = 5;
					}
					if(f === '='){
						if(fl === undefined)fl = '=';
						if(fr === undefined)fr = '=';
						solid = true;
						if((fl !== '=' && fl !== 'W') && (fr === '=' || fr === 'W')){
							indexX = tileSheets[n].x+5;
							indexY = 5;
						} else if((fl === '=' || fl === 'W') && (fr === '=' || fr === 'W')){
							if((fu !== '=' && fu !== 'W')){
								indexX = tileSheets[n].x+7;
								indexY = 3;
							} else {
								indexX = tileSheets[n].x+6;
								indexY = 5;
							}
						} else if((fl === '=' || fl === 'W') && (fr !== '=' && fr !== 'W')){
							indexX = tileSheets[n].x+7;
							indexY = 5;
						}
					}
					if(f === 'W'){
						solid = true;
						if(fl !== 'W' && fr === 'W' && fu !== 'W' && fd === 'W'){
							indexX = tileSheets[n].x+2;
							indexY = 3;
						} else if(fl === 'W' && fr !== 'W' && fu !== 'W' && fd === 'W'){
							indexX = tileSheets[n].x+3;
							indexY = 3;
						} else if(fl !== 'W' && fr === 'W' && fu === 'W' && fd !== 'W'){
							indexX = tileSheets[n].x+2;
							indexY = 4;
						} else if(fl === 'W' && fr !== 'W' && fu === 'W' && fd !== 'W'){
							indexX = tileSheets[n].x+3;
							indexY = 4;
						}
					}
					if(f === 'O'){
						solid = true;
						indexX = tileSheets[n].x+6;
						indexY = 3;
					}
					if(f === '|'){
						if(fu !== '|'){
							ladder = true;
							through = true;
						}
						indexX = tileSheets[n].x+6;
						indexY = 2;
					}
				}
				if(!(indexX === 0 && indexY === 0) && !skip)new Tile(j*tileSize, i*tileSize-8, depth, indexX, indexY, solid, through, ladder, false, damage, speed, frames, indexDirectionX, indexDirectionY, limit, timer);
				indexX = 0;
				indexY = 0;
				depth = 0;
				if(n === 'bomb'){
					new Tile(j*tileSize, i*tileSize-8, 0, tileSheets[n].x, 0);
					if(b === ' '){
						indexX = tileSheets[n].x;
					}
					if(b === '.'){
						if(fu === '#' || fu === '=')indexX = tileSheets[n].x+2;
						else indexX = tileSheets[n].x+1;
					}
					if(b === 'd'){
						indexX = tileSheets[n].x+3;
						indexY = 5;
					}
					if(b === 'b'){
						indexX = tileSheets[n].x+4;
						indexY = 5;
					}
					if(b === 'q'){
						indexX = tileSheets[n].x+5;
						indexY = 5;
					}
					if(b === 'p'){
						indexX = tileSheets[n].x+6;
						indexY = 5;
					}
					if(b === '1'){
						indexX = tileSheets[n].x+3;
					}
					if(b === '2'){
						indexX = tileSheets[n].x+4;
					}
					if(b === '3'){
						indexX = tileSheets[n].x+5;
					}
					if(b === '4'){
						indexX = tileSheets[n].x+6;
					}
					if(b === '5'){
						indexX = tileSheets[n].x+3;
						indexY = 1;
					}
					if(b === '%'){
						indexX = tileSheets[n].x+4;
						indexY = 1;
					}
					if(b === '6'){
						indexX = tileSheets[n].x+6;
						indexY = 1;
					}
					if(b === '7'){
						indexX = tileSheets[n].x+3;
						indexY = 2;
					}
					if(b === '8'){
						indexX = tileSheets[n].x+6;
						indexY = 2;
					}
					if(b === '9'){
						indexX = tileSheets[n].x+3;
						indexY = 3;
					}
					if(b === 'A'){
						indexX = tileSheets[n].x+4;
						indexY = 3;
					}
					if(b === 'B'){
						indexX = tileSheets[n].x+5;
						indexY = 3;
					}
					if(b === 'C'){
						indexX = tileSheets[n].x+6;
						indexY = 3;
					}
					if(b === '['){
						indexX = tileSheets[n].x+3;
						indexY = 4;
					}
					if(b === ']'){
						indexX = tileSheets[n].x+4;
						indexY = 4;
					}
					if(b === '('){
						indexX = tileSheets[n].x+5;
						indexY = 4;
					}
					if(b === ')'){
						indexX = tileSheets[n].x+6;
						indexY = 4;
					}
				}
				if(n === 'elec'){
					if(b===' '){
						indexX = tileSheets[n].x;
						indexY = 0;
					}
					if(b==='.'){
						if(fu !== ' ' && fu !== '0' && fu !== '1' && fu !== '2' && fu !== '|'){
							indexX = tileSheets[n].x+2;
							indexY = 0;
						} else {
							indexX = tileSheets[n].x+1;
							indexY = 0;
						}
					}
					if(b===','){
						if(bu!==','&&bd===','&&bl!==','&&br===','){
							indexX = tileSheets[n].x;
							indexY = 1;
						}
						if(bu!==','&&bd===','&&bl===','&&br!==','){
							indexX = tileSheets[n].x+1;
							indexY = 1;
						}
						if(bu===','&&bd!==','&&bl!==','&&br===','){
							indexX = tileSheets[n].x;
							indexY = 2;
						}
						if(bu===','&&bd!==','&&bl===','&&br!==','){
							indexX = tileSheets[n].x+1;
							indexY = 2;
						}
					}
					if(b==='R'){
						indexX = tileSheets[n].x+3;
						indexY = 0;
					}
					if(b==='Z'){
						indexX = tileSheets[n].x+4;
						indexY = 0;
					}
					if(b==='|'){
						indexX = tileSheets[n].x+2;
						indexY = 2;
					}
					if(b==='I'){
						indexX = tileSheets[n].x+3;
						indexY = 1;
					}
					if(b==='_'){
						indexX = tileSheets[n].x+2;
						indexY = 1;
					}
					if(b==='-'){
						indexX = tileSheets[n].x+4;
						indexY = 3;
					}
					if(b==='='){
						indexX = tileSheets[n].x+3;
						indexY = 2;
					}
					if(b==='L'){
						indexX = tileSheets[n].x+4;
						indexY = 1;
					}
					if(b==='F'){
						indexX = tileSheets[n].x+4;
						indexY = 2;
					}
				}
				if(n === 'guts'){
					if((fl === '#' || fl === '=' || fl === 'X' ) && b !== '=' && b !== ' ' && b !== '#' && b !== 'd' && b !== 'b' && b !== 'q' && b !== 'p'){
						indexX = tileSheets[n].x+2;
						indexY = 0;
					} else {
						if(b === ' '){
							indexX = tileSheets[n].x;
							indexY = 0;
						}
						if(b === '.'){
							indexX = tileSheets[n].x+1;
							indexY = 0;
						}
						if(b === ','){
							indexX = tileSheets[n].x+2;
							indexY = 0;
						}
						if(b === '='){
							indexX = tileSheets[n].x+3;
							indexY = 0;
						}
						if(b === '|'){
							indexX = tileSheets[n].x+1;
							indexY = 2;
						}
						if(b === 'd'){
							indexX = tileSheets[n].x+2;
							indexY = 1;
						}
						if(b === 'b'){
							indexX = tileSheets[n].x+3;
							indexY = 1;
						}
						if(b === 'q'){
							indexX = tileSheets[n].x+2;
							indexY = 2;
						}
						if(b === 'p'){
							indexX = tileSheets[n].x+3;
							indexY = 2;
						}
						if(b === '#'){
							if(bu === ' ' && bl === ' ' && bd === '#' && (br === '#' || br === undefined)){
								indexX = tileSheets[n].x+2;
								indexY = 3;
							} else
							if(bu === ' ' && br === ' ' && bd === '#' && (bl === '#' || bl === undefined)){
								indexX = tileSheets[n].x+3;
								indexY = 3;
							} else {
								if(j%2===0 && i%2===1){
									indexX = tileSheets[n].x+4;
									indexY = 2;
								}
								if(j%2===0 && i%2===0){
									indexX = tileSheets[n].x+4;
									indexY = 0;
								}
								if(j%2===1 && i%2===1){
									indexX = tileSheets[n].x+4;
									indexY = 3;
								}
								if(j%2===1 && i%2===0){
									indexX = tileSheets[n].x+4;
									indexY = 1;
								}
							}
						}
					}
				}
				if(n === 'ice'){
					if(b === ' '){
						indexX = tileSheets[n].x;
						indexY = 0;
					}
					if(b === '#'){
						indexX = tileSheets[n].x+3;
						indexY = 0;
					}
					if(b === '-'){
						if(j%2===0){
							indexX = tileSheets[n].x+4;
							indexY = 0;
						} else {
							indexX = tileSheets[n].x+5;
							indexY = 0;
						}
					}
					if(b === '.'){
						if(fu === '#' || fu === '=' || fu === '[' || fu === ']' || fu === '{'){
							indexX = tileSheets[n].x+2;
							indexY = 0;
						} else {
							indexX = tileSheets[n].x+1;
							indexY = 0;
						}
					}
					if(b === '~'){
						if(br === '~'){
							indexX = tileSheets[n].x+3;
							indexY = 1;
						} else {
							indexX = tileSheets[n].x+4;
							indexY = 1;
						}
					}
					if(b === '<'){
						indexX = tileSheets[n].x;
						indexY = 1;
					}
					if(b === '^'){
						indexX = tileSheets[n].x+1;
						indexY = 1;
					}
					if(b === '>'){
						indexX = tileSheets[n].x+2;
						indexY = 1;
					}
					if(b === '('){
						indexX = tileSheets[n].x;
						indexY = 2;
					}
					if(b === 'T'){
						indexX = tileSheets[n].x+1;
						indexY = 2;
					}
					if(b === ')'){
						indexX = tileSheets[n].x+2;
						indexY = 2;
					}
					if(b === '|'){
						indexX = tileSheets[n].x+1;
						indexY = 3;
					}
					if(b === '_'){
						indexX = tileSheets[n].x+2;
						indexY = 3;
					}
				}
				if(n === 'cut'){
					if(b === '~'){
						indexY = 1;
						if(bl === '~')indexX = tileSheets[n].x+3;
						if(br === '~')indexX = tileSheets[n].x+1;
						if(bl === '~' && br === '~')indexX = tileSheets[n].x+2;
					}
					if(b === ' '){
						indexX = tileSheets[n].x;
						indexY = 0;
					}
					if(b === '.'){
						indexY = 0;
						indexX = tileSheets[n].x+1;
						if(fu === '#' || fu === '=')indexX = tileSheets[n].x+2;
					}
					if(b === ','){
						indexY = 0;
						indexX = tileSheets[n].x+3;
						if(fu === '#' || fu === '=')indexX = tileSheets[n].x+4;
					}
					if(b === 'H'){
						indexX = tileSheets[n].x+4;
						indexY = 1;
						if(bu === 'H')indexY = 2;
					}
				}
				if(n === 'fire'){
					if(b === ' '){
						indexX = tileSheets[n].x;
						indexY = 0;
					}
					if(b === '!'){
						indexX = tileSheets[n].x;
						indexY = 2;
						if(bd === '!')indexY = 1;
						frames = 3;
						indexDirectionX = 1;
						indexDirectionY = 0;
						timer = 0;
						limit = 7;
					}
					if(b === '?'){
						indexX = tileSheets[n].x;
						indexY = 3;
						if(bd === '?')indexY = 4;
						if(bu !== '?' && bd !== '?')indexY = 5;
						frames = 3;
						indexDirectionX = 1;
						indexDirectionY = 0;
						timer = 0;
						limit = 7;
					}
					if(b === '-'){
						indexX = tileSheets[n].x+3;
						indexY = 1;
					}
					if(b === 'o'){
						indexX = tileSheets[n].x+4;
						indexY = 1;
					}
					if(b === '+'){
						indexX = tileSheets[n].x+5;
						indexY = 1;
					}
					if(b === '='){
						if(fu === '#' || fu === 'H')indexX = tileSheets[n].x+2;
						else indexX = tileSheets[n].x+1;
					}
					if(b === '.'){
						if(fu === '#' || fu === 'H')indexX = tileSheets[n].x+5;
						else indexX = tileSheets[n].x+3;
					}
					if(b === ','){
						indexX = tileSheets[n].x+4;
					}
				}
				if(n === '1wily1'){
					new Tile(j*tileSize, i*tileSize-8, 0, tileSheets[n].x, 0);
					if(b === '.'){
						if(fu === '#' || fu === '=' || fu === '1' || fu === '2' || fu === '3' || fu === '4' || fu === '5' || fu === '6')indexX = tileSheets[n].x+2;
						else indexX = tileSheets[n].x+1;
					}
					if(b === '_'){
						indexX = tileSheets[n].x+3;
					}
				}
				if(n === '1wily4'){
					if(b === ' '){
						indexX = tileSheets[n].x;
					}
					if(b === '.'){
						if(fu === '#' || fu === '=' || fu === '#' || fu === 'H' || fu === '8' || fu === 'A' || fu === 'B' || fu === 'C' || fu === 'D' || fu === 'E' || fu === 'F' || fu === '1' || fu === '2' || fu === '3' || fu === '4' || fu === '5' || fu === '6')indexX = tileSheets[n].x+2;
						else indexX = tileSheets[n].x+1;
					}
					if(b === 'd'){
						indexX = tileSheets[n].x+3;
						indexY = 4;
					}
					if(b === 'b'){
						indexX = tileSheets[n].x+4;
						indexY = 4;
					}
					if(b === 'q'){
						indexX = tileSheets[n].x+3;
						indexY = 5;
					}
					if(b === 'p'){
						indexX = tileSheets[n].x+4;
						indexY = 5;
					}
				}
				if(n === 'heat'){
					if(b === ' '){
						indexX = tileSheets[n].x;
						indexY = 0;
					}
					if(b === 'O'){
						indexX = tileSheets[n].x+1;
						indexY = 2;
					}
					if(b === '#'){
						if(bu !== '#' && bl !== '#'){
							indexX = tileSheets[n].x+2;
							indexY = 3;
						} else if(bu === '#' && bl !== '#' && map.bg[i-2][j] !== '#'){
							indexX = tileSheets[n].x+3;
							indexY = 3;
						} else if(bu === '#' && bl !== '#'){
							indexX = tileSheets[n].x+4;
							indexY = 3;
						} else {
							indexX = tileSheets[n].x+j%2;
							indexY = 3;
						}
						new Lava(j*tileSize, i*tileSize-8, n, indexX, indexY, 3);
						b = '.';
					}
					if(b === '.'){
						if(i === 0 || i > 12){
							indexX = tileSheets[n].x;
							indexY = 0;
						} else
						if(i === 1){
							indexX = tileSheets[n].x+0;
							indexY = 1;
						} else
						if(i === 2){
							indexX = tileSheets[n].x+1;
							indexY = 1;
						} else
						if(i === 3){
							indexX = tileSheets[n].x+2;
							indexY = 1;
						} else
						if(i === 4){
							indexX = tileSheets[n].x+3;
							indexY = 1;
						} else
						if(i === 8){
							indexX = tileSheets[n].x+5;
							indexY = 1;
						} else
						if(i === 9){
							indexX = tileSheets[n].x+6;
							indexY = 1;
						} else
						if(i === 10){
							indexX = tileSheets[n].x+7;
							indexY = 1;
						} else
						if(i === 11){
							if(bd !== '#'){
								indexX = tileSheets[n].x+8;
								indexY = 1;
							} else {
								indexX = tileSheets[n].x+8;
								indexY = 3;
							}
						} else
						if(i === 12){
							indexX = tileSheets[n].x+9;
							indexY = 1;
						} else {
							indexX = tileSheets[n].x+4;
							indexY = 1;
						}
						if(i > 2 && (fd === '#' || fd === '=' || fd === 'H' || fd === '-'))indexY = 2;
					}
				}
				if(n === 'bubble'){
					if(b === '.'){
						indexY = 3;
						if((j+i)%2===0)indexX = tileSheets[n].x;
						else indexX = tileSheets[n].x+1;
						if(fu === '#' || fu === 'O' || fu === 'T' || fu === '|')indexX = tileSheets[n].x+2;
						frames = 3;
						indexDirectionX = 0;
						indexDirectionY = 1;
						timer = 0;
						limit = 5;
					}
					if(b === '~'){
						water = true;
						indexY = 3;
						if(fu === '+')indexX = tileSheets[n].x+5;
						else if(fu !== '+' && map.fg[i-2][j] === '+')indexX = tileSheets[n].x+6;
						else if(bu !== '~')indexX = tileSheets[n].x+3;
						else if(bu === '~' && map.bg[i-2][j] !== '~')indexX = tileSheets[n].x+4;
						else {
							indexX = tileSheets[n].x;
							indexY = 0;
						}
						if(indexY === 3){
							frames = 3;
							indexDirectionX = 0;
							indexDirectionY = 1;
							timer = 0;
							limit = 5;
						}
					}
				}
				if(n === 'flash'){
					if(b === ' '){
						if((j+i)%2 === 0){
							if(fu === '#' || fu === 'H' || fu === 'I' || fu === 'W' || fu === 'E'){
								indexX = tileSheets[n].x+6;
								indexY = 1;
							} else {
								indexX = tileSheets[n].x+6;
								indexY = 0;
							}
						} else if((j+i)%2 === 1){
							indexX = tileSheets[n].x+6;
								if(fu === '#' || fu === 'H' || fu === 'I' || fu === 'W' || fu === 'E'){
								indexX = tileSheets[n].x+6;
								indexY = 3;
							} else {
								indexX = tileSheets[n].x+6;
								indexY = 2;
							}
						}
					}
					if(b === '|'){
						if(fu === '#' || fu === 'H' || fu === 'I' || fu === 'W' || fu === 'E'){
							indexX = tileSheets[n].x+7;
							indexY = 5;
						} else {
							indexX = tileSheets[n].x+7;
							indexY = 4;
						}
					}
					if(b === '-'){
						indexX = tileSheets[n].x+7;
						indexY = 3;
					}
					if(b === '.'){
						if(fu === '#' || fu === 'H' || fu === 'I' || fu === 'W' || fu === 'E'){
							indexX = tileSheets[n].x+7;
							indexY = 1;
						} else if((j+i)%2 === 0){
							indexX = tileSheets[n].x+7;
							indexY = 0;
						} else if((j+i)%2 === 1){
							indexX = tileSheets[n].x+7;
							indexY = 2;
						}
					}
				}
				if(n === 'quick'){
					var overhead = fu === '#' || fu === 'W' || fu === 'E';
					if(b === 'F'){
						indexY = 0;
						if(overhead)indexX = tileSheets[n].x+1;
						else indexX = tileSheets[n].x;
					}
					if(b === 'E'){
						indexY = 0;
						if(overhead)indexX = tileSheets[n].x+1;
						else indexX = tileSheets[n].x+4;
					}
					if(b === 'H'){
						indexY = 0;
						if(overhead)indexX = tileSheets[n].x+3;
						else indexX = tileSheets[n].x+2;
					}
					if(b === 'd'){
						indexX = tileSheets[n].x+5;
						indexY = 0;
					}
					if(b === 'b'){
						indexX = tileSheets[n].x+6;
						indexY = 0;
					}
					if(b === 'q'){
						indexX = tileSheets[n].x+5;
						indexY = 1;
					}
					if(b === 'p'){
						indexX = tileSheets[n].x+6;
						indexY = 1;
					}
				}
				if(n === 'wood'){
					indexX = tileSheets[n].x;
					if(b === '#'){
						indexX += 5;
						if(fu === '#'){
							indexY = 4;
						} else {
							indexY = 5;
						}
					}
					if(b === '/'){
						indexY = 1;
					}
					if(b === '|'){
						indexX += 1;
						indexY = 3;
					}
					if(b === '0'){
						indexY = 2;
						if(bd === '0')indexX += 4;
						else if(bl !== '0' && br === '0')indexX += 1;
						else if(bl === '0' && br !== '0')indexX += 3;
						else indexX += 2;
					}
					if(b === 'O'){
						if(bu === ' ' && bl === ' ' && br === ' '){
							indexX += 2;
						} else if(bu === ' ' && bl !== ' ' && br !== ' '){
							indexX += 2;
						} else if(bu === ' ' && bl === ' ' && br !== ' '){
							indexX ++;
						} else if(bu === ' ' && bl !== ' ' && br === ' '){
							indexX += 3;
						} else if(br === '0'){
							indexX += 3;
							indexY = 1;
						} else if(bl === '0'){
							indexX += 1;
							indexY = 1;
						} else if(bd === '0'){
							indexX += 2;
							indexY = 1;
						} else {
							indexX += 4;
							indexY = 0;
						}
					}
					if(b === 'I'){
						indexX += 2;
						indexY = 3;
					}
					if(b === '_'){
						indexX += 4;
						if(bu !== '|')indexX --;
						indexY = 3;
					}
				}
				if(n === 'metal'){
					var overhead = fu==='('||fu===')'||fu==='['||fu===']'||fu==='d'||fu==='b'||fu==='q'||fu==='p'||fu==='<'||fu==='>'||fu==='0'||fu==='1'||fu==='2'||fu==='3'||fu==='4'||fu==='5'||fu==='6'||fu==='7'||fu==='8'||fu==='9'||fu==='W';
					var defLimit = 7;
					if(b === ' '){
						indexX = tileSheets[n].x;
						indexY = 0;
					}
					if(b === '#'){
						indexX = tileSheets[n].x+1;
						indexY = 0;
						if(overhead)indexX = tileSheets[n].x+2;
					}
					if(b === '*'){
						indexX = tileSheets[n].x+3;
						indexY = 0;
						frames = 2;
						indexDirectionX = 1;
						indexDirectionY = 0;
						limit = defLimit;
						timer = 0;
					}
					if(b === '+'){
						indexX = tileSheets[n].x+5;
						indexY = 0;
						frames = 2;
						indexDirectionX = 1;
						indexDirectionY = 0;
						limit = defLimit;
						timer = 0;
					}
					if(b === 'W'){
						indexX = tileSheets[n].x+7;
						indexY = 0;
						frames = 2;
						indexDirectionX = 1;
						indexDirectionY = 0;
						limit = defLimit;
						timer = 0;
					}
					if(b === 'd'){
						indexX = tileSheets[n].x;
						indexY = 1;
						frames = 3;
						indexDirectionX = 2;
						indexDirectionY = 0;
						limit = defLimit;
						timer = 0;
					}
					if(b === 'b'){
						indexX = tileSheets[n].x+1;
						indexY = 1;
						frames = 3;
						indexDirectionX = 2;
						indexDirectionY = 0;
						limit = defLimit;
						timer = 0;
					}
					if(b === 'q'){
						indexX = tileSheets[n].x;
						indexY = 2;
						frames = 3;
						indexDirectionX = 2;
						indexDirectionY = 0;
						limit = defLimit;
						timer = 0;
					}
					if(b === 'p'){
						indexX = tileSheets[n].x+1;
						indexY = 2;
						frames = 3;
						indexDirectionX = 2;
						indexDirectionY = 0;
						limit = defLimit;
						timer = 0;
					}
					if(b === 'T'){
						indexX = tileSheets[n].x+4;
						indexY = 1;
						frames = 4;
						indexDirectionX = 3;
						indexDirectionY = 0;
						limit = defLimit;
						if(j%2===0)timer = defLimit;
						else timer = 0;
					}
					if(b === '|'){
						indexX = tileSheets[n].x+5;
						indexY = 1;
						frames = 4;
						indexDirectionX = 3;
						indexDirectionY = 0;
						limit = defLimit;
						if(j%2===0)timer = defLimit;
						else timer = 0;
					}
					if(b === 'M'){
						indexX = tileSheets[n].x+6;
						indexY = 1;
						frames = 4;
						indexDirectionX = 3;
						indexDirectionY = 0;
						limit = defLimit;
						if(j%2===0)timer = defLimit;
						else timer = 0;
					}
					if(b === '-'){
						indexX = tileSheets[n].x+4;
						indexY = 2;
					}
				}
				if(n === 'air'){
					new Tile(j*tileSize, i*tileSize-8, depth, tileSheets[n].x, 0)
					if(b === '#'){
						indexX = tileSheets[n].x+1;
						indexY = 0;
						depth = 4;
					}
					if(b === 'd'){
						indexX = tileSheets[n].x+5;
						indexY = 2;
						frames = 2;
						indexDirectionX = 1;
						indexDirectionY = 0;
						limit = 15;
						timer = 0;
						sway = true;
						depth = 4;
					}
					if(b === 'b'){
						indexX = tileSheets[n].x+8;
						indexY = 2;
						frames = 2;
						indexDirectionX = 1;
						indexDirectionY = 0;
						limit = 15;
						timer = 0;
						sway = true;
						depth = 4;
					}
					if(b === 'q'){
						indexX = tileSheets[n].x+5;
						indexY = 3;
						frames = 2;
						indexDirectionX = 1;
						indexDirectionY = 0;
						limit = 15;
						timer = 0;
						sway = true;
						depth = 4;
					}
					if(b === 'p'){
						indexX = tileSheets[n].x+8;
						indexY = 3;
						frames = 2;
						indexDirectionX = 1;
						indexDirectionY = 0;
						limit = 15;
						timer = 0;
						sway = true;
						depth = 4;
					}
					if(b === 'D'){
						indexX = tileSheets[n].x+5;
						indexY = 4;
						frames = 2;
						indexDirectionX = 1;
						indexDirectionY = 0;
						limit = 15;
						timer = 0;
						sway = true;
						depth = 4;
					}
					if(b === 'B'){
						indexX = tileSheets[n].x+8;
						indexY = 4;
						frames = 2;
						indexDirectionX = 1;
						indexDirectionY = 0;
						limit = 15;
						timer = 0;
						sway = true;
						depth = 4;
					}
					if(b === 'Q'){
						indexX = tileSheets[n].x+5;
						indexY = 5;
						frames = 2;
						indexDirectionX = 1;
						indexDirectionY = 0;
						limit = 15;
						timer = 0;
						sway = true;
						depth = 4;
					}
					if(b === 'P'){
						indexX = tileSheets[n].x+8;
						indexY = 5;
						frames = 2;
						indexDirectionX = 1;
						indexDirectionY = 0;
						limit = 15;
						timer = 0;
						sway = true;
						depth = 4;
					}
				}
				if(n === 'crash'){
					indexX = tileSheets[n].x;
					indexY = 0;
				}
				if(n === '2wily1'){
					var overhead = fu==='-'||fu==='#'||fu==='<'||fu==='H'||fu==='>'||fu==='='||fu==='W'||fu==='1'||fu==='2'||fu==='3'||fu==='4'||fu==='5'||fu==='6'||fu==='O';
					if(b === ' '){
						indexX = tileSheets[n].x;
						indexY = 0;
					}
					if(b === '1'){
						indexX = tileSheets[n].x+1;
						indexY = 0;
					}
					if(b === '2'){
						indexX = tileSheets[n].x+2;
						indexY = 0;
					}
					if(b === '3'){
						indexX = tileSheets[n].x;
						indexY = 1;
					}
					if(b === '4'){
						indexX = tileSheets[n].x+1;
						indexY = 1;
					}
					if(b === '5'){
						indexX = tileSheets[n].x+2;
						indexY = 1;
					}
					if(b === '6'){
						indexX = tileSheets[n].x;
						indexY = 2;
					}
					if(b === '7'){
						indexX = tileSheets[n].x+1;
						indexY = 2;
					}
					if(b === '8'){
						indexX = tileSheets[n].x+2;
						indexY = 2;
					}
					if(b === '9'){
						indexX = tileSheets[n].x+3;
						indexY = 2;
					}
					if(b === '<'){
						indexX = tileSheets[n].x+3;
						indexY = 0;
					}
					if(b === '='){
						indexX = tileSheets[n].x+4;
						indexY = 0;
					}
					if(b === '>'){
						indexX = tileSheets[n].x+5;
						indexY = 0;
					}
					if(b === '#'){
						indexX = tileSheets[n].x+3;
						indexY = 1;
					}
					if(b === 'E'){
						indexX = tileSheets[n].x+5;
						indexY = 1;
					}
					if(b === '*'){
						indexX = tileSheets[n].x+6;
						indexY = 1;
						if(bu !== '*')indexY = 0;
					}
					if(b === 'I'){
						indexX = tileSheets[n].x+7;
						indexY = 1;
						if(overhead)indexY = 0;
					}
					if(b === 'H'){
						indexX = tileSheets[n].x+7;
						indexY = 2;
					}
				}
				new Tile(j*tileSize, i*tileSize-8, depth, indexX, indexY, false, false, false, water, 0, 0, frames, indexDirectionX, indexDirectionY, limit, timer, sway);
			}
		}
	}
	p.bombOmbTimer = 0;
	p.bombOmbLimit = 150;
	p.bombOmbIndex = 0;
	p.bombOmbProperties = [
		{x:96, velocityY:-6.1},
		{x:160, velocityY:-4.6},
	];
	p.tackleFireTimer = 0;
	p.tackleFireLimit = 60;
	p.tackleFireIndex = 0;
	p.tackleFireProperties = [
		{x:16, direction:1},
		{x:176, direction:-1},
	]
	p.flashStopped = false;
	p.flashStopTimer = 0;
	p.flashStopLimit = 60;
	p.selecting = true;
	p.init = function(){
		p.blinking = true;
		p.ready.phase(true);
		p.initiated = true;
	}
	p.reset = function(){
		p.blinking = true;
		p.over = false;
	}
	p.select = function(){
		if(game.quickLaser !== undefined){
			var l = game.quickLaser;
			for(var i = 0; i < game.lasers.length; i ++)game.lasers[i].remove();
			game.lasers = [];
			game.lasers.length = 0;
			for(var i = 0; i < dynamics.length; i ++){
				var t = dynamics[i];
				if(l.timer===t.timer&&l.limit===t.limit&&l.deleting===t.deleting&&l.direction===t.direction&&l.lasers.length===t.lasers.length){
					dynamics.splice(i, 1);
					break;
				}
			}
			game.quickLaser = undefined;
		}
		for(var i = 0; i < game.pickups.length; i ++)game.pickups[i].remove();
		game.pickups = [];
		game.pickups.length = 0;
		p.player1.lifeHead.remove();
		p.player1.lifeText.remove();
		p.player2.lifeHead.remove();
		p.player2.lifeText.remove();
		for(var i = 0; i < p.player1.eTanksArray.length; i ++)p.player1.eTanksArray[i].remove();
		for(var i = 0; i < p.player2.eTanksArray.length; i ++)p.player2.eTanksArray[i].remove();
		for(var i = 0; i < p.player1.shotArray.length; i ++)p.player1.shotArray[i].remove();
		for(var i = 0; i < p.player2.shotArray.length; i ++)p.player2.shotArray[i].remove();
		for(var i = 0; i < p.player1.healthBar.ticks.length; i ++)p.player1.healthBar.ticks[i].remove();
		for(var i = 0; i < p.player2.healthBar.ticks.length; i ++)p.player2.healthBar.ticks[i].remove();
		p.player1.healthBar.remove();
		p.player2.healthBar.remove();
		p.player1.remove();
		p.player2.remove()
		p.selecting = true;
	}
	p.pause = function(type){
		if(!p.pauseMenu.phasing){
			if(type === undefined)type = true;
			p.pauseMenu.phase(type);
			p.paused = type;
			p.player1.pause(type);
			p.player2.pause(type);
		}
	}
	p.dropPickup = function(x, y){
		num = random(9);
		if(num === 0)type = 'life';
		if(num === 1)type = 'eTank';
		if(num >= 2 && num <= 3)type = 'none';
		if(num >= 4 && num <= 5)type = 'healthBig';
		if(num >= 6 && num <= 9){
			type = 'healthSmall';
			x += 4;
			y += 4;
		}
		if(type !== 'none')new Pickup(x-8, y-8, type, true);
	}
	p.update = function(){
		if(p.deathPause){
			p.deathPauseTimer ++;
			if(p.deathPauseTimer >= p.deathPauseLimit){
				p.deathPause = false;
				p.deathPauseTimer = 0;
			}
		} else if(p.healthPause){
			p.healthPauseTimer ++;
			if(p.healthPauseTimer >= p.healthPauseLimit){
				p.healthPauseTimer = 0;
				p.healthGiven ++;
				p.healthReceiver.updateHealth(p.healthReceiver.health+1);
				p.healthReceiver.healthBar.update();
				display.update();
				if(p.healthGiven >= p.healthGiving || p.healthReceiver.health >= 26){
					p.healthGiven = 0;
					p.healthPause = false;
				}
			}
		} else {
			for(var i = 0; i < dynamics.length; i ++){
				var d = dynamics[i];
				if(!(p.flashStopped && !d.timeOverride) && !(p.paused && !d.pauseOverride))d.update();
			}
			if(p.flashStopped){
				p.flashStopTimer ++;
				if(p.flashStopTimer >= p.flashStopLimit){
					p.flashStopped = false;
					p.flashStopTimer = 0;
				}
			}
			if(!p.blinking && !p.selecting){
				if(!p.paused){
					for(var i = 0; i < 2; i ++){
						if(keyDown[controls[i].start] && !heldDown[controls[i].start]){
							if(!p.pauseMenu.visible){
								heldDown[controls[i].start] = true;
								p.pauseMenu.pauseType = i;
								p.pauseMenu.pauseText.replace((i+1)+'P PAUSE');
								p.pauseMenu.pauseText.phase(false);
								p.pause();
							}
						}
					}
				}
				if(!p.flashStopped){
					if(p.mapName === 'bomb'){
						p.bombOmbTimer ++;
						if(p.bombOmbTimer >= p.bombOmbLimit){
							p.bombOmbTimer = 0;
							new BombOmb(p.bombOmbProperties[p.bombOmbIndex].x, p.bombOmbProperties[p.bombOmbIndex].velocityY);
							if(p.bombOmbIndex === 0)p.bombOmbIndex = 1;
							else if(p.bombOmbIndex === 1)p.bombOmbIndex = 0;
						}
					}
					if(p.mapName === 'fire'){
						p.tackleFireTimer ++;
						if(p.tackleFireTimer >= p.tackleFireLimit){
							p.tackleFireTimer = 0;
							var x = p.tackleFireProperties[p.tackleFireIndex].x;
							var direction = p.tackleFireProperties[p.tackleFireIndex].direction;
							new TackleFire(x, canvas.height, direction)
							if(p.tackleFireIndex === 0)p.tackleFireIndex = 1;
							else if(p.tackleFireIndex === 1)p.tackleFireIndex = 0;
						}
					}
					if(p.mapName === '1wily1'){
						p.yellowTimer ++;
						if(p.yellowTimer >= p.yellowLimit){
							p.yellowTimer = 0;
							new YellowPart(p.yellowX, p.yellowY, p.yellowDirection);
							p.yellowIndex ++;
							if(p.yellowIndex > 1){
								p.yellowIndex = 0;
								p.yellowDirection *= -1;
								if(p.yellowDirection === 1)p.yellowX = -tileSize;
								else p.yellowX = canvas.width;
							}
							p.yellowY = p.yellowStartY+tileSize*p.yellowIndex;
						}
					}
				}
			}
		}
		if(p.blinking){
			p.blinkTimer ++;
			if(p.blinkTimer >= p.blinkLimit){
				p.blinkTimer = 0;
				p.blinks ++;
				p.ready.phase();
				if(p.blinks >= p.blinksMax){
					p.over = false;
					p.player1 = new Player(p.spawns[p.mapName][0].x, p.spawns[p.mapName][0].y, p.spawns[p.mapName][0].direction, players[0], 1, controls[0]).sprite;
					p.player2 = new Player(p.spawns[p.mapName][1].x, p.spawns[p.mapName][1].y, p.spawns[p.mapName][1].direction, players[1], 2, controls[1]).sprite;
					p.blinks = 0;
					p.blinking = false;
					p.ready.phase(false);
				}
			}
		}
		if(p.player1 !== undefined && p.player2 !== undefined){
			if((p.player1.lives <= 0 || p.player2.lives <= 0) && !p.over){
				p.overTimer ++;
				if(p.overTimer >= p.overLimit){
					p.overTimer = 0;
					p.over = true;
					if(p.player1.lives <= 0 && !p.player1.warping){
						p.player2.leaving = true;
						p.player2.rawIndexX = 21;
					}
					if(p.player2.lives <= 0 && !p.player2.warping){
						p.player1.leaving = true;
						p.player1.rawIndexX = 21;
					}
				}
			}
		}
		if(keyDown['escape']){
			if(!p.turboKey){
				if(frameRate === speedNormal){
					setSpeed(speedTurbo);
				} else if(frameRate === speedTurbo){
					setSpeed(speedNormal);
				}
			}
			p.turboKey = true;
		} else {
			p.turboKey = false;
		}
	}
}
function Word(x, y, text, shadow){
	if(shadow === undefined)shadow = false;
	this.text = text;
	this.visible = true;
	this.pauseVisible = true;
	this.chars = [];
	this.x = x;
	this.y = y;
	this.write = function(text){
		for(var i = 0; i < this.text.length; i ++){
			var c = this.text[i].toUpperCase();
			if(c != ' '){
				var lx = x+i*tileSize/2;
				var s = this.makeLetter(lx, y, c, shadow);
				s.diffX = i*tileSize/2;
				s.diffY = 0;
			}
		}
	}
	this.makeLetter = function(x, y, letter, shadow){
		var yOffset = 0;
		if(shadow)yOffset = 4;
		var s = new Sprite(x, y, tileSize/2, tileSize/2, alphabetSheet, 7, charsCoords[letter].x, charsCoords[letter].y+yOffset);
		s.letter = c;
		this.chars.push(s);
		return s;
	}
	this.write(text);
	this.erase = function(){
		for(var i = 0; i < this.chars.length; i ++)this.chars[i].remove();
		this.chars = [];
		this.chars.length = 0;
	}
	this.replace = function(newText){
		if(this.text !== newText){
			this.text = newText;
			// for(var i = 0; i < this.text.length; i ++){
			// 	var c = this.chars[i];
			// 	var letter = this.text[i].toUpperCase();
			// 	if(c !== undefined){
			// 		if(c.letter !== letter){
			// 			c.indexX = charsCoords[letter].x;
			// 			c.letter = letter;
			// 			c.diffX = i*tileSize/2;
			// 			c.diffY = 0;
			// 		}
			// 	} else {
			// 		var x = x+i*tileSize/2;
			// 		var c = this.makeLetter(x, y, letter, shadow);
			// 	}
			// }
			// if(this.chars.length > this.text.length){
			// 	for(var i = this.text.length-1; i < this.chars.length; i ++){
			// 		this.chars[i].remove();
			// 	}
			// }
			this.erase();
			this.write(this.text);
		}
	}
	this.move = function(tx, ty, type){
		if(type === undefined)type = 'absolute';
		if(type === 'relative'){
			this.x += tx;
			this.y += ty;
			for(var i = 0; i < this.chars.length; i ++){
				this.chars[i].x += tx;
				this.chars[i].y += ty;
			}
		}
		if(type === 'absolute'){
			this.x = tx;
			this.y = ty;
			for(var i = 0; i < this.chars.length; i ++){
				var c = this.chars[i];
				c.x = this.x+c.diffX;
				c.y = this.y+c.diffY;
			}
		}
	}
	this.phase = function(visibility){
		if(visibility === undefined)visibility = !this.visible;
		for(var i = 0; i < this.chars.length; i ++)this.chars[i].visible = visibility;
		this.visible = visibility;
	}
	this.pausePhase = function(visibility){
		if(visibility === undefined)visibility = !this.pauseVisible;
		for(var i = 0; i < this.chars.length; i ++)this.chars[i].pauseVisible = visibility;
		this.pauseVisible = visibility;
	}
	this.remove = function(){
		this.erase();
	}
}
function Menu(elements, type){
	if(elements === undefined)elements = [];
	var p = this;
	p.pauseOverride = true;
	p.timeOverride = true;
	p.type = type;
	p.tiles = [];
	p.words = [];
	p.arrows = [];
	p.portraits = [];
	p.index = 0;
	p.elements = elements;
	if(type === 'stage'){
		p.width = 32;
		p.height = 12;
		p.x = 0;
		p.y = canvas.height-p.height*8;
		p.cursor = {x:2, y:0};
		p.lastCursor = {x:p.cursor.x, y:p.cursor.y};
		for(var i = 0; i < p.height; i ++){
			p.tiles[i] = [];
			for(var j = 0; j < p.width; j ++){
				var index = 1;
				var x = p.cursor.x+1;
				if(i > p.height-5)x = 0;
				if(i === 0 || i === p.height-5)index = 0;
				var tile = new Sprite(p.x+j*8, p.y+i*8, 8, 8, menuSheet, 6, x, index);
				tile.tx = j;
				tile.ty = i;
				p.tiles[i][j] = tile;
			}
		}
		p.arrows.push(new Word(16, p.y+28, '<', true));
		p.arrows.push(new Word(232, p.y+28, '>', true));
		p.portraitOriginX = 0;
		p.portraitSeparator = 8;
		for(var i = 0; i < 5; i ++){
			var s = p.portraitSeparator;
			p.portraits.push(new StagePortrait(p.x+32+(32+s)*i, p.y+s+8, p.elements[i]).sprite);
		}
		p.descriptions = {
			'bomb':[
				'mega man',
				'bomb man stage',
				'orb city'
			],
			'elec':[
				'mega man',
				'elec man stage',
				'power plant'
			],
			'guts':[
				'mega man',
				'guts man stage',
				'canyonside'
			],
			'ice':[
				'mega man',
				'ice man stage',
				'arctic jungle'
			],
			'cut':[
				'mega man',
				'cut man stage',
				'abandoned sawmill'
			],
			'fire':[
				'mega man',
				'fire man stage',
				'steel mill'
			],
			'1wily1':[
				'mega man',
				'wily stage 1',
				'fortress entrance'
			],
			'1wily4':[
				'mega man',
				'wily stage 4',
				'fortress interior'
			],
			'heat':[
				'mega man 2',
				'heat man stage',
				'blast furnace'
			],
			'bubble':[
				'mega man 2',
				'bubble man stage',
				'waterfall institute'
			],
			'flash':[
				'mega man 2',
				'flash man stage',
				'crystal labyrinth'
			],
			'quick':[
				'mega man 2',
				'quick man stage',
				'research facility'
			],
			'wood':[
				'mega man 2',
				'wood man stage',
				'forest base'
			],
			'metal':[
				'mega man 2',
				'metal man stage',
				'industrial facility'
			],
			'air':[
				'mega man 2',
				'air man stage',
				'sky fortress'
			],
			'crash':[
				'mega man 2',
				'crash man stage',
				'pipeline station'
			],
			'2wily1':[
				'mega man 2',
				'wily stage 1',
				'fortress entrance'
			],
			'random':[
				'pick a random stage',
			],
			'back':[
				'< return to',
				'player select'
			],
		}
		p.typing = false;
		p.typeIndex = 0;
		p.typeCharIndex = 0;
		p.randomIndex = 0;
		p.randomTimer = 0;
		p.randomLimit = 5;
	} else if(type === 'pause'){
		p.cursor = {x:0, y:0};
		p.x = 128;
		p.y = 24;
		p.width = 12;
		p.height = 20;
		var a = p.arrow = new Word(p.x+12, p.y+21+(p.cursor.y+1)*16, '>', true);
		a.phase(false);
		p.arrows.push(a);
		for(var i = 0; i < p.height; i ++){
			p.tiles[i] = [];
			for(var j = 0; j < p.width; j ++){
				var index = 1;
				var x = game.mapIndex+1;
				if(j === 0 || j === p.width-1 || i === 0 || i === p.height-1)index = 0;
				var tile = new Sprite(p.x+j*8, p.y+i*8, 8, 8, menuSheet, 6, x, index);
				tile.tx = j;
				tile.ty = i;
				p.tiles[i][j] = tile;
			}
		}
		p.pauseType = 0;
		p.pauseText = new Word(p.x+16, p.y+17, (p.pauseType+1)+'P PAUSE', true);
		p.words.push(p.pauseText);
		for(var i = 0; i < p.elements.length; i ++){
			p.words.push(new Word(p.x+8+20, p.y+21+(i+1)*16, p.elements[i], true));
		}
		for(var i = 0; i < p.words.length; i ++)p.words[i].phase(false);
	}
	p.timer = 0;
	p.limit = 8;
	p.phasePos = {x:0, y:0};
	p.phasing = false;
	if(type === 'stage')p.visible = true;
	else p.visible = false;
	p.initiating = true;
	for(var i = 0; i < p.height; i ++){
		for(var j = 0; j < p.width; j ++){
			var t = p.tiles[i][j];
			t.visible = p.visible;
		}
	}
	p.remove = function(){
		for(var i = 0; i < p.words.length; i ++)p.words[i].remove();
		for(var i = 0; i < p.portraits.length; i ++){
			p.portraits[i].portrait.remove();
			p.portraits[i].remove();
		}
		for(var i = 0; i < p.height; i ++){
			for(var j = 0; j < p.width; j ++){
				var t = p.tiles[i][j];
				t.remove();
			}
		}
		for(var i = 0; i < p.arrows.length; i ++)p.arrows[i].remove();
		for(var i = 0; i < dynamics.length; i ++){
			var d = dynamics[i];
			if(d.x === p.x && d.y === p.y && d.width === p.width && d.height === p.height){
				dynamics.splice(i, 1);
				break;
			}
		}
	}
	p.phase = function(){
		p.visible = !p.visible;
		if(p.type === 'stage'){
			for(var i = 0; i < p.words.length; i ++)p.words[i].remove();
			p.words.length = 0;
			p.words = [];
		} else if(p.type === 'pause')for(var i = 0; i < p.words.length; i ++)p.words[i].phase(false);
		p.typing = false;
		p.typeIndex = 0;
		p.typeCharIndex = 0;
		for(var i = 0; i < p.portraits.length; i ++)p.portraits[i].phase(false);
		for(var i = 0; i < p.arrows.length; i ++)p.arrows[i].phase(false);
		p.phasePos.x = 0;
		p.phasePos.y = 0;
		p.phasing = true;
	}
	p.update = function(){
		if(p.phasing){
			if(p.type === 'pause'){
				a.phase(false);
				for(var i = 0; i < p.words.length; i ++)p.words[i].phase(false);
			}
			var k = -1;
			while(k++<0){
				for(var i = p.phasePos.y*4; i < (p.phasePos.y+1)*4; i ++){
					for(var j = p.phasePos.x*4; j < (p.phasePos.x+1)*4; j ++){
						var t = p.tiles[i][j];
						t.visible = p.visible;
					}
				}
				p.phasePos.x ++;
				if(p.phasePos.x >= p.width/4){
					p.phasePos.x -= p.width/4;
					p.phasePos.y ++;
				}
				if(p.phasePos.y >= p.height/4){
					p.phasing = false;
					for(var i = 0; i < p.arrows.length; i ++)p.arrows[i].phase(p.visible);
					for(var i = 0; i < p.portraits.length; i ++)p.portraits[i].phase(p.visible);
					for(var i = 0; i < p.words.length; i ++)p.words[i].phase(p.visible);
					p.phasePos.y = 0;
					if(type === 'pause'){
						a.phase(false);
						p.initiating = true;
						return;
					}
					if(p.visible && type == 'stage'){
						p.typing = true;
					}
				}
			}
		}
		if(p.visible && (!p.phasing || p.initiating)){
			if(p.type === 'pause'){
				var moved = false;
				if(keyDown[controls[p.pauseType].up] && !heldDown[controls[p.pauseType].up]){
					p.cursor.y --;
					moved = true;
				}
				if(keyDown[controls[p.pauseType].down] && !heldDown[controls[p.pauseType].down]){
					p.cursor.y ++;
					moved = true;
				}
				if(p.cursor.y > 1)p.cursor.y = 0;
				if(p.cursor.y < 0)p.cursor.y = 1;
				if(moved){
					p.timer = 0;
					a.phase(true);
					a.move(p.x+12, p.y+21+(p.cursor.y+1)*16);
				}
				if(p.tiles[0][0].indexX !== game.menu.cursor.x+1 || p.initiating){
					if(game.mapNames[game.menu.cursor.x] !== game.backName && game.mapNames[p.cursor.x] !== 'random'){
						for(var i = 0; i < p.height; i ++){
							for(var j = 0; j < p.width; j ++){
								var t = p.tiles[i][j];
								var index = 1;
								var x = game.menu.cursor.x+1;
								if(j === 0 || j === p.width-1 || i === 0 || i === p.height-1)index = 0;
								t.indexX = x;
								t.indexY = index;
							}
						}
					}
				}
				p.timer ++;
				if(p.timer >= p.limit){
					p.timer = 0;
					a.phase(!a.visible);
				}
				if(keyDown[controls[p.pauseType].start] && !heldDown[controls[p.pauseType].start]){
					heldDown[controls[p.pauseType].start] = true;
					a.phase(false);
					game.pause(false);
					if(p.cursor.y === 1){
						game.select();
						game.menu.phase(true);
					}
					p.cursor.y = 0;
					a.move(p.x+12, p.y+21+(p.cursor.y+1)*16);
				}
			} else if(p.type === 'stage'){
				var player = 0;
				if(keyDown[controls[player].left] && !heldDown[controls[player].left])p.cursor.x --;
				if(keyDown[controls[player].right] && !heldDown[controls[player].right])p.cursor.x ++;
				if(keyDown[controls[player].start] && !heldDown[controls[player].start] || keyDown[controls[player].a] && !heldDown[controls[player].a]){
					if(keyDown[controls[player].start] && !heldDown[controls[player].start])heldDown[controls[player].start] = true;
					if(keyDown[controls[player].a] && !heldDown[controls[player].a])heldDown[controls[player].a] = true;
					p.typing = false;
					if(p.randomScreen !== undefined){
						p.randomScreen.remove();
						p.randomLogo.remove();
						p.randomScreen = undefined;
						p.randomLogo = undefined;
					}
					if(p.backScreen !== undefined){
						p.backScreen.remove();
						p.backLogo.remove();
						p.backScreen = undefined;
						p.backLogo = undefined;
					}
					if(game.mapNames[p.cursor.x] === game.backName){
						mode = 'select';
						game.pauseMenu.remove();
						p.remove();
						game.maps.parse('none');
					} else if(game.mapNames[p.cursor.x] === 'random'){
						p.cursor.x = random(0, game.mapNames.length-3);
						game.selecting = false;
						p.phase();
						game.blinking = true;
						if(!game.initiated)game.init();
						else game.reset();
					} else {
						game.selecting = false;
						p.phase();
						game.blinking = true;
						if(!game.initiated)game.init();
						else game.reset();
					}
				}
				if(p.cursor.x-p.portraitOriginX !== game.mapIndex || p.initiating){
					if(p.cursor.x < 0)p.cursor.x = game.mapNames.length-1;
					if(p.cursor.x > game.mapNames.length-1)p.cursor.x = 0;
					if(p.cursor.x > p.portraitOriginX+4){
						p.portraitOriginX += p.cursor.x-(p.portraitOriginX+4);
						for(var i = 0; i < p.portraits.length; i ++){
							p.portraits[i].change(elements[p.portraitOriginX+i]);
						}
					}
					if(p.cursor.x < p.portraitOriginX){
						p.portraitOriginX += p.cursor.x-p.portraitOriginX;
						for(var i = 0; i < p.portraits.length; i ++){
							p.portraits[i].change(elements[p.portraitOriginX+i]);
						}
					}
					p.arrows[0].phase(p.portraitOriginX !== 0);
					p.arrows[1].phase(p.portraitOriginX !== game.mapNames.length-5);
					game.mapIndex = p.cursor.x-p.portraitOriginX;
					if(game.mapIndex > game.mapNames.length-1){
						game.mapIndex = 0;
						p.cursor.x = 0;
						p.cursor.y = 0;
					} else
					if(game.mapIndex < 0){
						game.mapIndex = game.mapNames.length-1;
						p.cursor.x = 1;
						p.cursor.y = 2;
					}
					for(var i = 0; i < p.portraits.length; i ++){
						var t = p.portraits[i];
						t.selected = false;
					}
					p.portraits[p.cursor.x-p.portraitOriginX].selected = true;
					if(p.randomScreen !== undefined){
						p.randomScreen.remove();
						p.randomLogo.remove();
						p.randomScreen = undefined;
						p.randomLogo = undefined;
					}
					if(p.backScreen !== undefined){
						p.backScreen.remove();
						p.backLogo.remove();
						p.backScreen = undefined;
						p.backLogo = undefined;
					}
					if(game.mapName !== game.mapNames[p.cursor.x] && game.mapNames[p.cursor.x] !== game.backName && game.mapNames[p.cursor.x] !== 'random'){
						game.maps.parse(game.mapNames[p.cursor.x]);
					} else if(game.mapNames[p.cursor.x] === 'random'){
						p.randomScreen = new Sprite(0, 0, canvas.width, canvas.height, selectSheet, 1);
						p.randomLogo = new Sprite(canvas.width/2-16, canvas.height/2-32, 32, 32, portraitSheet, 1, stageIndex['random'].x, stageIndex['random'].y);
						game.maps.parse('none');
					} else if(game.mapNames[p.cursor.x] === 'back'){
						p.backScreen = new Sprite(0, 0, canvas.width, canvas.height, selectSheet, 1);
						p.backLogo = new Sprite(canvas.width/2-16, canvas.height/2-32, 32, 32, portraitSheet, 1, stageIndex['back'].x, stageIndex['back'].y);
						game.maps.parse('none');
					}
					for(var i = 0; i < p.words.length; i ++)p.words[i].remove();
					p.typing = true;
					p.typeIndex = 0;
					p.typeCharIndex = 0;
					p.index = p.cursor.x;
					p.timer = 0;
					for(var i = 0; i < p.height; i ++){
						for(var j = 0; j < p.width; j ++){
							var t = p.tiles[i][j];
							var index = 1;
							var x = p.index+1;
							if(i > p.height-5)x = 0;
							if(t.ty === 0 || t.ty === p.height-5)index = 0;
							t.indexX = x;
							t.indexY = index;
						}
					}
					p.lastCursor.x = p.cursor.x;
					p.lastCursor.y = p.cursor.y;
				}
				if(p.typing){
					if(p.typeIndex >= p.descriptions[game.mapNames[p.cursor.x]].length){
						p.typing = false;
						p.typeIndex = p.descriptions[game.mapNames[p.cursor.x]].length-1;
					} else {
						// canvas.width-p.descriptions[game.mapNames[p.cursor.x]][p.typeIndex].length*8+p.typeCharIndex*8-4,
						p.words.push(
							new Word(
								p.typeCharIndex*8+2,
								canvas.height-6-p.descriptions[game.mapNames[p.cursor.x]].length*8+p.typeIndex*10,
								p.descriptions[game.mapNames[p.cursor.x]][p.typeIndex][p.typeCharIndex], true
							)
						);
						p.typeCharIndex ++;
						if(p.typeCharIndex >= p.descriptions[game.mapNames[p.cursor.x]][p.typeIndex].length){
							p.typeCharIndex = 0;
							p.typeIndex ++;
						}
					}
				}
			}
			p.initiating = false;
		}
		if(p.phasing && p.type === 'pause')a.phase(false);
		p.index = game.mapIndex;
	}
	dynamics.push(p);
}
function TeleportPoint(x, y, id){
	var p = this;
	p.x = x;
	p.y = y;
	p.id = id;
	p.remove = function(){
		for(var i = 0; i < game.teleportPoints.length; i ++){
			var t = game.teleportPoints[i];
			if(t.x === p.x && t.y === p.y && t.id === p.id){
				game.teleportPoints.splice(i, 1);
			}
		}
	}
	game.teleportPoints.push(p);
}
function Platform(tx, ty, type){
	var indexX = tileSheets['yoku'].x/2+3;
	var p = new Sprite(tx*tileSize+4, ty*tileSize-8-4, 32, 32, tileSheet, 2, indexX, type, true);
	p.speed = 0.75;
	p.direction = 1;
	p.dropping = false;
	p.timer = 0;
	p.limit = 3;
	p.center = {};
	p.tile = {};
	p.visible = false;
	p.pauseVisible = false;
	p.updateRect = function(){
		p.rect.x1 = p.x;
		p.rect.y1 = p.y;
		p.rect.x2 = p.x+p.width;
		p.rect.y2 = p.y+8;
		p.center.x = p.x+4;
		p.center.y = p.y+10;
		p.tile.x = Math.floor((p.center.x)/tileSize);
		p.tile.y = Math.floor((p.center.y+10)/tileSize);
	}
	p.updateRect();
	p.startX = p.x;
	for(var i = p.tile.x; i < game.maps.width; i ++){
		p.startDirection = 1;
		if(game.maps[game.mapName].fg[p.tile.y][i] === 'O'){
			p.endX = i*tileSize+5;
			p.direction = 1;
		}
	}
	if(p.endX === undefined){
		p.startDirection = -1;
		for(var i = p.tile.x; i > 0; i --){
			if(game.maps[game.mapName].fg[p.tile.y][i] === 'O'){
				p.endX = i*tileSize+5;
				p.direction = -1;
			}
		}
	}
	p.update = function(){
		if(!game.selecting && !game.blinking){
			p.x += p.speed * p.direction;
			p.updateRect();
			if(p.x*p.startDirection < p.startX*p.startDirection){
				p.x = p.startX;
				p.direction = 1*p.startDirection;
			}
			if(p.x*p.startDirection > p.endX*p.startDirection){
				p.x = p.endX;
				p.direction = -1*p.startDirection;
			}
			if(game.maps[game.mapName].fg[p.tile.y][p.tile.x] === '~'){
				if(p.indexX < indexX+2){
					p.timer ++;
					if(p.timer >= p.limit){
						p.timer = 0;
						p.indexX ++;
					}
				}
			} else {
				if(p.indexX > indexX){
					p.timer ++;
					if(p.timer >= p.limit){
						p.timer = 0;
						p.indexX --;
					}
				}
			}
			if(p.indexX > indexX)p.dropping = true;
			else p.dropping = false;
			p.visible = true;
		} else {
			p.x = p.startX;
			p.visible = false;
		}
	}
	game.platforms.push(p);
}
function Yoku(tx, ty, offset, index){
	var p = new Sprite(tx*tileSize, ty*tileSize-8, tileSize, 32, tileSheet, 1, tileSheets['yoku'].x, index, true);
	p.rect = new Rectangle(p.x, p.y, p.x+tileSize, p.y+tileSize);
	p.solid = true;
	p.timer = 0;
	p.limit = 5;
	p.idle = false;
	p.active = false;
	p.activeTimer = 90-offset*45;
	p.activeLimit = 90;
	p.visible = false;
	p.pauseVisible = false;
	p.speed = 0;
	p.update = function(){
		if(!game.selecting && !game.blinking){
			if(!p.active){
				p.activeTimer ++;
				p.indexX = tileSheets['yoku'].x+5;
				if(p.activeTimer >= p.activeLimit){
					p.activeTimer = 0;
					p.active = true;
					p.idle = false;
					p.indexX = tileSheets['yoku'].x;
				}
				p.solid = false;
			} else {
				p.activeTimer ++;
				if(p.activeTimer >= p.activeLimit){
					p.activeTimer = 0;
					p.active = false;
				}
				if(!p.idle){
					p.timer ++;
					if(p.timer >= p.limit){
						p.timer = 0;
						p.indexX ++;
					}
					if(p.indexX >= tileSheets['yoku'].x+4){
						p.idle = true;
						p.indexX = tileSheets['yoku'].x+1;
					}
				} else {
					p.indexX = tileSheets['yoku'].x+1;
				}
				p.solid = true;
			}
			p.visible = true;
		} else {
			p.solid = true;
			p.timer = 0;
			p.idle = false;
			p.active = false;
			p.activeTimer = 90-offset*45;
			p.visible = false;
		}
	}
	game.tiles.push(p);
}
function ETank(x, y){
	var p = this.sprite = new Sprite(x, y, 16, 16, lifebarSheet, 6, 2, 3);
	p.pauseVisible = false;
}
function Pickup(x, y, type, hop){
	if(hop === undefined)hop = false;
	var width;
	var height;
	var indexX;
	var indexY;
	if(type === 'eTank'){
		width = 16;
		height = 16;
		indexX = 2;
		indexY = 2;
	}
	if(type === 'healthSmall'){
		width = 8;
		height = 8;
		indexX = 5;
		indexY = 10;
	}
	if(type === 'healthBig'){
		width = 16;
		height = 16;
		indexX = 2;
		indexY = 0;
	}
	if(type === 'life'){
		width = 16;
		height = 16;
		indexX = 2;
		indexY = 4;
	}
	var p = this.sprite = new Sprite(x, y, width, height, lifebarSheet, 5, indexX, indexY, true);
	p.pauseVisible = false;
	p.type = type;
	p.life = 0;
	p.timer = 0;
	p.limit = 10;
	p.direction = 1;
	p.pickup = true;
	if(hop)p.velocityY = -2;
	else p.velocityY = 0;
	p.gravity = 0.175;
	p.updateRect = function(){
		p.rect.x1 = p.x;
		p.rect.y1 = p.y;
		p.rect.x2 = p.x+p.width;
		p.rect.y2 = p.y+p.height;
	}
	p.update = function(){
		p.life ++;
		if(p.type !== 'life'){
			p.timer ++;
			if(p.timer >= p.limit){
				p.timer = 0;
				p.indexY += p.direction;
				p.direction *= -1;
			}
		}
		p.velocityY += p.gravity;
		p.y += p.velocityY;
		p.updateRect();
		if(p.life >= 180){
			p.visible = !p.visible;
		}
		if(p.life >= 300)p.remove();
		for(var i = 0; i < game.tiles.length; i ++){
			var t = game.tiles[i];
			if(p.rect.intersect(t.rect)){
				if(t.solid){
					if(p.velocityY < 0){
						p.y = t.y+t.height;
						p.velocityY = 0;
					}
					if(p.velocityY > 0){
						p.y = t.y-p.height;
						p.velocityY = 0;
					}
				}
				if(t.ladder){
					if(p.velocityY > 0){
						p.y = t.y-p.height;
						p.velocityY = 0;
					}
				}
			}
		}
	}
	game.pickups.push(p);
}
function BombOmb(x, velocityY){
	var p = this.sprite = new Sprite(x, canvas.height, tileSize, tileSize, enemySheet, 6, 0, 2, true);
	p.velocityY = velocityY;
	p.gravity = 0.15;
	p.invincible = false;
	p.health = 1;
	p.damage = 1;
	p.center = {x:p.x+8, y:p.y+8};
	p.direction = random(0, 1);
	if(p.direction === 0)p.direction = -1;
	p.pauseVisible = false;
	p.updateRect = function(){
		p.rect.x1 = p.x;
		p.rect.y1 = p.y;
		p.rect.x2 = p.x+tileSize;
		p.rect.y2 = p.y+tileSize;
		p.center.x = p.x+8;
		p.center.y = p.y+8;
	}
	p.hit = function(){
		p.health --;
		if(!game.flashStopped)p.visible = false;
		if(p.health <= 0)p.kill();
	}
	p.kill = function(){
		p.dying = true;
	}
	p.update = function(){
		if(!p.dying){
			p.velocityY += p.gravity;
			p.y += p.velocityY;
			p.updateRect();
			if(!p.rect.intersect(display.rect))p.kill();
			if(p.health <= 0){
				p.health = 0;
				p.kill();
			}
			if(p.velocityY >= 0){
				new BombOmbPiece(p.center.x, p.center.y, 1.2, -1, -2.6);
				new BombOmbPiece(p.center.x, p.center.y, .5, -1, -2.5);
				new BombOmbPiece(p.center.x, p.center.y, .5, 1, -2.5);
				new BombOmbPiece(p.center.x, p.center.y, 1.2, 1, -2.6);
				p.kill();
			}
			if(!p.visible)p.visible = true;
		} else {
			for(var i = 0; i < game.enemies.length; i ++){
				var e = game.enemies[i];
				if(e.x==p.x&&e.y==p.y&&e.velocityY==p.velocityY)game.enemies.splice(i, 1);
			}
			new SmallExplosion(p.center.x, p.center.y);
			p.remove();
		}
	}
	game.enemies.push(p);
}
function BombOmbPiece(x, y, speed, direction, velocityY){
	var p = this.sprite = new Sprite(x-4, y-4, 8, 8, enemySheet, 6, 2, 4, true);
	p.velocityX = 0;
	p.velocityY = velocityY;
	p.gravity = 0.175;
	p.invincible = true;
	p.health = 99;
	p.damage = 1;
	p.speed = speed;
	p.dying = false;
	p.direction = direction;
	p.center = {};
	p.pauseVisible = false;
	p.updateRect = function(){
		p.rect.x1 = p.x;
		p.rect.y1 = p.y;
		p.rect.x2 = p.x+8;
		p.rect.y2 = p.y+8;
		p.center.x = p.x+4;
		p.center.y = p.y+4;
	}
	p.updateRect();
	p.kill = function(){
		p.dying = true;
	}
	p.update = function(){
		if(!p.dying){
			p.velocityX = p.speed * p.direction;
			p.velocityY += p.gravity;
			p.move(p.velocityX, p.velocityY);
		} else {
			for(var i = 0; i < game.enemies.length; i ++){
				var e = game.enemies[i];
				if(e.x==p.x&&e.y==p.y&&e.velocityY==p.velocityY)game.enemies.splice(i, 1);
			}
			new SmallExplosion(p.center.x, p.center.y);
			p.remove();
		}
	}
	p.move = function(dx, dy){
		if(dx != 0)p.moveAxis(dx, 0);
		if(dy != 0)p.moveAxis(0, dy);
	}
	p.moveAxis = function(dx, dy){
		p.x += dx;
		p.y += dy;
		p.updateRect();
		for(var i = 0; i < game.tiles.length; i ++){
			var t = game.tiles[i];
			if(p.rect.intersect(t.rect) && t.solid){
				if(dx < 0)p.x = t.x+tileSize;
				if(dx > 0)p.x = t.x-p.width;
				if(dy < 0)p.y = t.y+tileSize;
				if(dy > 0)p.y = t.y-p.height;
				p.kill();
			}
		}
		p.updateRect();
	}
	game.enemies.push(p);
}
function TackleFire(x, y, direction){
	var directionIndex = 0;
	if(direction === -1)directionIndex = 2;
	var p = this.sprite = new Sprite(x, y, tileSize, tileSize, enemySheet, 6, directionIndex, 1, true);
	p.speed = 0;
	p.direction = direction*p.speed;
	p.directionIndex = directionIndex;
	p.timer = 0;
	p.limit = 10;
	p.velocityY = -6+random(20)/10;
	p.gravity = 0.15;
	p.damage = 2;
	p.center = {x:p.x+8, y:p.y+8};
	p.health = 1;
	p.invincible = false;
	p.pauseVisible = false;
	p.updateRect = function(){
		p.rect.x1 = p.x;
		p.rect.y1 = p.y;
		p.rect.x2 = p.x+tileSize;
		p.rect.y2 = p.y+tileSize;
		p.center.x = p.x+8;
		p.center.y = p.y+8;
	}
	p.hit = function(){
		p.health --;
		if(!game.timeStopped)p.visible = false;
		if(p.health <= 0)p.kill();
	}
	p.kill = function(){
		p.dying = true;
	}
	p.update = function(){
		if(!p.dying){
			p.timer ++;
			if(p.timer >= p.limit){
				p.timer = 0;
				if(p.indexX === p.directionIndex)p.indexX = 1+p.directionIndex;
				else if(p.indexX === 1+p.directionIndex)p.indexX = p.directionIndex;
			}
			p.x += p.direction;
			p.velocityY += p.gravity;
			p.y += p.velocityY;
			p.updateRect();
			if(!p.rect.intersect(display.rect))p.kill();
			if(p.health <= 0){
				p.health = 0;
				p.kill();
			}
			if(!p.visible)p.visible = true;
		} else {
			for(var i = 0; i < game.enemies.length; i ++){
				var e = game.enemies[i];
				if(e.x==p.x&&e.y==p.y&&e.velocityY==p.velocityY)game.enemies.splice(i, 1);
			}
			new SmallExplosion(p.center.x, p.center.y);
			p.remove();
		}
	}
	game.enemies.push(p);
}
function YellowPart(x, y, direction){
	var p = this.sprite = new Sprite(x, y, tileSize, tileSize, enemySheet, 3, 0, 0, true);
	p.speed = 2;
	p.direction = direction;
	p.timer = 0;
	p.limit = 5;
	p.falling = false;
	p.velocityY = 0;
	p.gravity = 0.175;
	p.center = {x:p.x+8, y:p.y+8};
	p.pauseVisible = false;
	p.updateRect = function(){
		p.rect.x1 = p.x;
		p.rect.y1 = p.y+2;
		p.rect.x2 = p.x+tileSize;
		p.rect.y2 = p.y+14;
		p.center.x = p.x+8;
		p.center.y = p.y+8;
	}
	p.updateRect();
	p.destroy = function(explode){
		if(explode === undefined)explode = true;
		p.destroying = true;
		p.exploding = explode;
	}
	p.update = function(){
		if(!p.destroying){
			p.timer ++;
			if(p.timer >= p.limit){
				p.timer = 0;
				p.indexX += p.direction;
				if(p.indexX < 0)p.indexX = 3;
				if(p.indexX > 3)p.indexX = 0;
			}
			if(!p.falling){
				p.x += p.speed * p.direction;
			} else {
				p.velocityY += p.gravity;
				p.y += p.velocityY;
			}
			p.updateRect();
			for(var i = 0; i < game.tiles.length; i ++){
				var t = game.tiles[i];
				if(t.solid && p.rect.intersect(t.rect)){
					p.destroy();
				}
			}
			if(!p.rect.intersect(display.rect)){
				p.destroy(false);
			}
		} else {
			if(p.exploding)new Explosion(p.center.x, p.center.y);
			for(var i = 0; i < game.yellowParts.length; i ++){
				var y = game.yellowParts[i];
				if(p.x===y.x&&p.y===y.y&&p.indexX===y.indexX){
					game.yellowParts.splice(i, 1);
				}
			}
			p.remove();
		}
	}
	game.yellowParts.push(p);
}
function SmallExplosion(x, y){
	var p = this.sprite = new Sprite(x-8, y-8, 16, 16, explosionSheet, 6, 0, 4, true);
	p.timer = 0;
	p.limit = 3;
	p.timeOverride = true;
	p.pauseVisible = false;
	p.update = function(){
		p.timer ++;
		if(p.timer >= p.limit){
			p.timer = 0;
			p.indexX ++;
			if(p.indexX > 3)p.remove();
		}
	}
}
function Explosion(x, y, target, damage){
	if(target === undefined)target = 'all';
	if(damage === undefined)damage = 4;
	var p = this.sprite = new Sprite(x-32, y-32, 64, 64, explosionSheet, 6, 0, 0, true);
	p.rect = new Rectangle(p.x+16, p.y+16, p.x+48, p.y+48);
	p.timer = 0;
	p.limit = 2;
	p.hit = false;
	p.damage = damage;
	p.target = target;
	p.pauseVisible = false;
	p.update = function(){
		p.timer ++;
		if(p.timer >= p.limit){
			p.timer = 0;
			p.indexX ++;
			if(p.indexX > 16)p.remove();
		}
		if(p.target !== 'all'){
			if(p.rect.intersect(p.target.rect) && !p.hit && p.indexX < 14){
				p.target.hit(p.damage, -p.target.direction);
				p.hit = true;
			}
		} else {
			p.target = game.player1;
			if(p.rect.intersect(p.target.rect) && !p.hit && p.indexX < 14){
				p.target.hit(p.damage, -p.target.direction);
				p.hit = true;
			}
			p.target = game.player2;
			if(p.rect.intersect(p.target.rect) && !p.hit && p.indexX < 14){
				p.target.hit(p.damage, -p.target.direction);
				p.hit = true;
			}
		}
	}
}
function FlashStar(){
	var x = random(16, 240);
	var y = random(16, 208);
	var p = this.sprite = new Sprite(x, y, 8, 8, effectSheet, 5, 0, 1, true);
	p.timer = 0;
	p.limit = 8;
	p.timeOverride = true;
	p.pauseOverride = false;
	p.pauseVisible = false;
	p.update = function(){
		p.timer ++;
		if(p.timer >= p.limit){
			p.timer = 0;
			p.indexX ++;
			if(p.indexX > 2){
				p.indexX = 0;
				p.x = random(16, 240);
				p.y = random(16, 208);
			}
		}
	}
}
function ElecBlock(x, y){
	var p = this.sprite = new Sprite(x-64, y, 64, 16, tileSheet, 5, tileSheets['yoku'].x/4+1.75, 4, true);
	p.timer = 0;
	p.limit = 3;
	p.ticks = 0;
	p.ticksMax = 24;
	p.idle = false;
	p.idleTimer = 0;
	p.idleLimit = 60;
	p.direction = 1;
	p.update = function(){
		if(!game.selecting && !game.blinking){
			if(p.idle){
				p.visible = false;
				p.idleTimer ++;
				if(p.idleTimer >= p.idleLimit){
					p.idleTimer = 0;
					p.idle = false;
					p.timer = 0;
					p.visible = true;
					p.indexY = 4;
				}
			} else {
				p.timer ++;
				if(p.timer >= p.limit){
					p.timer = 0;
					p.ticks ++;
					p.indexY ++;
					if(p.indexY > 5)p.indexY = 4;
					if(p.ticks >= p.ticksMax){
						p.ticks = 0;
						p.idle = true;
						p.idleTimer = 0;
					}
				}
			}
		} else {
			p.idle = true;
			p.idleTimer = 0;
			p.timer = 0;
			p.indexY = 4;
			p.visible = false;
		}
	}
	game.elecBlocks.push(p);
}
function Flame(x, y, parent){
	var p = this.sprite = new Sprite(x, y, 16, 16, effectSheet, 5, 7, 2, true);
	p.timer = 0;
	p.limit = 24;
	p.rect = new Rectangle(p.x, p.y, p.x+p.width, p.y+p.height);
	p.pauseVisible = false;
	p.update = function(){
		p.timer ++;
		if(p.timer%12===0)p.indexX = 7;
		if(p.timer%12===6)p.indexX = 8;
		if(p.timer >= p.limit){
			p.remove();
		}
		var o = parent.opponent;
		if(p.rect.intersect(o.rect)){
			o.hit(parent.damage, o.direction);
		}
	}
}
function FlameShield(parent){
	var p = this.sprite = new Sprite(parent.center.x-tileSize/2, parent.center.y-tileSize/2, tileSize, tileSize, effectSheet, 5, 9, 2, true);
	p.angle = -45;
	p.radians = p.angle*Math.PI/180;
	p.timer = 0;
	p.limit = 16;
	p.startIndexX = p.indexX;
	p.endIndexX = p.indexX+2;
	p.direction = parent.direction;
	p.hit = false;
	p.pauseVisible = false;
	p.updateRect = function(){
		p.rect.x1 = p.x;
		p.rect.y1 = p.y;
		p.rect.x2 = p.x+p.width;
		p.rect.y2 = p.y+p.height;
	}
	p.update = function(){
		p.timer ++;
		if(p.timer > p.limit){
			p.remove();
			return;
		}
		p.angle += 45*p.direction;
		p.radians = p.angle*Math.PI/180;
		p.indexX ++;
		if(p.indexX > p.endIndexX)p.indexX = p.startIndexX;
		p.x = parent.center.x - p.width/2 + Math.cos(p.radians)*16;
		p.y = parent.center.y - p.height/2 + Math.sin(p.radians)*16;
		p.updateRect();
		if(p.rect.intersect(parent.opponent.rect)){
			if(!p.hit){
				p.hit = true;
				parent.opponent.hit(4, -parent.direction);
			}
		}
		for(var i = 0; i < game.yellowParts.length; i ++){
			var t = game.yellowParts[i];
			if(p.rect.intersect(t.rect)){
				p.hit = true;
				if(!t.falling)t.falling = true;
				else t.destroy();
			}
		}
	}
}
function Life(x, y, type){
	var p = this.sprite = new Sprite(x, y, 16, 16, lifeSheet, 6, type, 0);
	p.pauseVisible = false;
}
function Orb(x, y, angle, speed, index){
	var p = this.sprite = new Sprite(x, y, 16, 16, orbSheet, 4, 0, index, true);
	p.angle = angle;
	p.speed = speed;
	p.velocityX = Math.cos(angle)*speed;
	p.velocityY = Math.sin(angle)*speed;
	p.timeOverride = false;
	p.pauseOverride = false;
	p.pauseVisible = false;
	p.updateRect = function(){
		p.x1 = p.x;
		p.y1 = p.y;
		p.x2 = p.x+p.width;
		p.y2 = p.y+p.height;
	}
	p.update = function(){
		p.indexX ++;
		if(p.indexX >= 4)p.indexX = 0;
		p.x += p.velocityX;
		p.y += p.velocityY;
		p.updateRect();
		if(!p.rect.intersect(display.rect)){
			p.remove();
		}
	}
}
function Bar(x, y, type){
	var p = this.sprite = new Sprite(x, y, 8, 52, lifebarSheet, 6, 0, 0, true);
	p.capacity = 26;
	p.health = p.capacity;
	p.ticks = [];
	p.pauseVisible = false;
	p.pauseOverride = false;
	p.timeOverride = true;
	p.flashing = false;
	p.flashTimer = 0;
	p.flashLimit = 2;
	p.flashes = 0;
	p.flashesMax = 15;
	for(var i = 0; i < p.health; i ++)p.ticks.push(new BarTick(x, y+50-(i*2), type).sprite);
	p.hurt = function(){
		p.flashing = true;
		p.flashes = 0;
	}
	p.update = function(){
		if(p.flashing){
			p.flashTimer ++;
			if(p.flashTimer >= p.flashLimit){
				p.flashTimer = 0;
				p.flashes ++;
				if(p.indexX === 0)p.indexX = 1;
				else if(p.indexX === 1)p.indexX = 0;
				if(p.flashes >= p.flashesMax){
					p.flashes = 0;
					p.flashing = false;
					p.indexX = 0;
				}
			}
		}
		if(p.rect.intersect(game.player1.fullRect) || p.rect.intersect(game.player2.fullRect)){
			if(running%2 === 0)p.depth = 6;
			else p.depth = 1;
			for(var i = 0; i < p.ticks.length; i ++)p.ticks[i].depth = p.depth;
		} else {
			if(p.depth === 1){
				p.depth = 6;
				for(var i = 0; i < p.ticks.length; i ++)p.ticks[i].depth = p.depth;
			}
		}
		for(var i = 0; i < p.ticks.length; i ++){
			var t = p.ticks[i];
			t.visible = true;
			if(i > p.health-1)t.visible = false;
		}
	}
	p.phase = function(visibility){
		p.visible = visibility;
		for(var i = 0; i < p.ticks.length; i ++){
			var t = p.ticks[i];
			t.visible = p.visible;
		}
	}
}
function BarTick(x, y, type){
	var p = this.sprite = new Sprite(x, y, 8, 1, lifebarSheet, 6, 0, 53+type);
	p.pauseVisible = false;
}
function Smoke(x, y, type, direction){
	if(type === 'hurt'){
		indexX = 0;
		indexY = 5;
		y += direction.y;
	}
	if(type === 'slide'){
		indexX = 6;
		indexY = 6;
		if(direction === -1)indexY = 7;
	}
	var p = this.sprite = new Sprite(x, y, 8, 8, effectSheet, 6, indexX, indexY, true);
	p.timer = 0;
	p.limit = 10;
	p.pauseVisible = false;
	if(type === 'hurt')p.x = direction.x+x;
	p.update = function(){
		if(type === 'hurt')p.x = direction.x+x;
		p.timer ++;
		if(p.timer >= p.limit){
			p.timer = 0;
			p.indexX ++;
			if(type === 'hurt')if(p.indexX > 2)p.remove();
			if(type === 'slide')if(p.indexX > 8)p.remove();
		}
	}
}
function QuickLaser(direction, y){
	var x;
	if(direction === 1){
		x = -tileSize;
		ox = canvas.width;
	}
	if(direction === -1){
		x = canvas.width;
		ox = -tileSize;
	}
	var startX = x;
	var p = this;
	p.timer = 0;
	p.leaveLimit = 45;
	p.pauseLimit = 180;
	p.limit = p.leaveLimit;
	p.direction = direction;
	p.lasers = [];
	p.deleting = false;
	p.index = 0;
	x = ox;
	p.update = function(){
		if(!game.blinking && !game.selecting && game.mapName === 'quick'){
			if(x != ox){
				if(!p.deleting){
					var laser = new Sprite(x, y, tileSize, tileSize, tileSheet, 3, tileSheets['quick'].x+4, 4);
					laser.pauseVisible = false;
					p.lasers.push(laser);
					game.lasers.push(laser);
					x += tileSize/2*direction;
				} else {
					var index = p.index;
					var l = p.lasers[index];
					if(l !== undefined){
						l.visible = false;
						l.remove();
						for(var i = 0; i < game.lasers.length; i ++){
							var t = game.lasers[i];
							if(l.x === t.x && l.y === t.y)game.lasers.splice(i, 1);
						}
					}
					p.index ++;
					x += tileSize/2*direction;
				}
			} else {
				if(p.timer === 0 && p.deleting){
					p.lasers = [];
					p.lasers.length = 0;
				}
				p.timer ++;
				if(p.timer >= p.limit){
					p.timer = 0;
					x = startX;
					p.index = 0;
					p.deleting = !p.deleting;
					if(p.limit === p.leaveLimit)p.limit = p.pauseLimit;
					else if(p.limit === p.pauseLimit)p.limit = p.leaveLimit
				}
			}
		}
	}
	dynamics.push(p);
}
function Sprite(x, y, width, height, sheet, depth, indexX, indexY, dynamic){
	if(dynamic === undefined)dynamic = false;
	if(indexX === undefined)indexX = 0;
	if(indexY === undefined)indexY = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.visible = true;
	this.sheet = sheet;
	this.depth = depth;
	this.indexX = indexX;
	this.indexY = indexY;
	this.rect = new Rectangle(x, y, x+width, y+height);
	this.dynamic = dynamic;
	this.pickup = false;
	this.timeOverride = false;
	this.pauseOverride = false;
	this.pauseVisible = true;
	this.update = function(){}
	this.remove = function(){
		var t = this;
		for(var i = 0; i < sprites.length; i ++){
			var s = sprites[i];
			if(s.x==t.x&&s.y==t.y&&s.width==t.width&&s.height==t.height&&s.sheet==this.sheet&&s.depth==t.depth){
				sprites.splice(i, 1);
				break;
			}
		}
		if(this.dynamic){
			for(var i = 0; i < dynamics.length; i ++){
				var s = dynamics[i];
				if(s.x==t.x&&s.y==t.y&&s.width==t.width&&s.height==t.height&&s.sheet==this.sheet&&s.depth==t.depth){
					dynamics.splice(i, 1);
					break;
				}
			}
		}
		if(this.pickup){
			for(var i = 0; i < game.pickups.length; i ++){
				var s = game.pickups[i];
				if(s.x==t.x&&s.y==t.y&&s.width==t.width&&s.height==t.height&&s.sheet==this.sheet&&s.depth==t.depth){
					game.pickups.splice(i, 1);
					break;
				}
			}
		}
	}
	sprites.push(this);
	if(dynamic)dynamics.push(this);
}
function Shot(parent, damage, dx, dy, x, y){
	if(parent.name !== 'guts'){
		parent.shots ++;
		if(!parent.grounded)parent.airShots ++;
	}
	parent.attackReady = false;
	var n = parent.name;
	var cp = charProperties[n];
	if(damage === undefined)var damage = parent.damage;
	if(dx === undefined)var dx = parent.direction;
	if(dy === undefined)var dy = 0;
	if(x === undefined)var x = parent.center.x+cp.shotOriginX*parent.direction-cp.shotWidth/2;
	if(y === undefined)var y = parent.center.y+cp.shotOriginY-cp.shotHeight/2+2;
	var p = this.sprite = new Sprite(x, y, cp.shotWidth, cp.shotHeight, effectSheet, 3, cp.shotIndexX, cp.shotIndexYL, true);
	parent.shotArray.push(p);
	p.shotArray = [];
	p.shots = 0;
	p.opponent = parent.opponent;
	p.properties = cp;
	p.name = n;
	p.slowSpeed = 1;
	p.fastSpeed = 4;
	p.damage = damage;
	p.phasing = cp.shotPhasing;
	p.piercing = cp.shotPiercing;
	p.life = 0;
	p.timer = 0;
	p.limit = 5;
	p.hit = false;
	p.velocityX = 0;
	p.velocityY = 0;
	p.gravity = 0.175;
	p.lastVelocityX = p.velocityX;
	p.directionX = dx;
	p.directionY = dy;
	p.startDirectionX = dx;
	p.startDirectionY = dy;
	p.speed = cp.shotSpeed;
	p.rectWidth = cp.shotRectWidth;
	p.rectHeight = cp.shotRectHeight;
	p.rectX = (cp.shotWidth-cp.shotRectWidth)/2;
	p.rectY = (cp.shotHeight-cp.shotRectHeight)/2;
	p.center = {x:p.x+cp.shotWidth/2, y:p.y+cp.shotHeight/2};
	p.startCenter = {x:p.x+cp.shotWidth/2, y:p.y+cp.shotHeight/2};
	p.startX = p.x;
	p.startY = p.y;
	p.timeOverride = n === 'flash';
	p.pauseOverride = false;
	p.pauseVisible = false;
	p.hits = 0;
	if(parent.direction === -1)p.indexY = cp.shotIndexYL;
	if(parent.direction === 1)p.indexY = cp.shotIndexYR;
	if(p.name === 'fire')new FlameShield(parent);
	if(p.name === 'elec'){
		p.limit = 2;
		if(p.directionX != 0){
			p.boltU = new Shot(parent, 2, 0, -1);
			p.boltD = new Shot(parent, 2, 0, 1);
		} else {
			p.width = 16;
			p.height = 32;
			p.rectWidth = cp.vShotWidth;
			p.rectHeight = cp.vShotHeight;
			p.rectX = 0;
			p.rectY = 0;
			p.x = parent.center.x+cp.shotOriginX*parent.direction-p.width/2;
			p.y = parent.center.y+cp.shotOriginY-p.height/2+2;
			p.indexX = cp.vShotIndexX;
			if(parent.direction === -1)p.indexY = cp.vShotIndexYL;
			if(parent.direction === 1)p.indexY = cp.vShotIndexYR;
		}
	}
	if(p.name === 'cut'){
		var o = parent.opponent;
		p.returning = false;
		p.tx = o.center.x;
		p.ty = o.center.y;
		p.limit = 4;
		p.radians = Math.atan2(p.ty-p.center.y, p.tx-p.center.x);
		p.cos = Math.cos(p.radians)*p.speed;
		p.sin = Math.sin(p.radians)*p.speed;
	}
	if(p.name === 'bomb'){
		p.grounded = false;
		p.groundFriction = 0.8;
		p.exploding = false;
		if(keyDown[parent.up]){
			p.velocityY = -3.5;
			p.velocityX = p.directionX/2;
		} else
		if(keyDown[parent.down]){
			p.velocityY = 0;
			p.velocityX = 0;
			if(parent.hanging)p.x = parent.center.x-p.rectX-p.rectWidth/2;
		} else
		if(keyDown[parent.left] && parent.direction === -1 || keyDown[parent.right] && parent.direction === 1){
			p.velocityY = -1;
			p.velocityX = 4.5*p.directionX;
		} else {
			p.velocityX = 3*p.directionX;
			p.velocityY = -2;
		}
		p.friction = 0.98;
		p.gravity = 0.125;
		p.limit = 45;
	}
	if(p.name === 'flash'){
		p.angle = (90+random(0, 16)-8)*p.directionX;
		p.radians = (p.angle-90)*Math.PI/180;
		p.cos = Math.cos(p.radians)*p.speed;
		p.sin = Math.sin(p.radians)*p.speed;
	}
	if(p.name === 'crash'){
		p.exploding = false;
		p.ticks = 0;
		p.ticksMax = 20;
		p.limit = 4;
		p.indexDirection = 1;
		if(!parent.grounded){
			p.directionY = 1;
			p.indexX = 6;
		}
	}
	if(p.name === 'metal'){
		if(keyDown[parent.up] && keyDown[parent.left]){
			p.directionX = -1;
			p.directionY = -1;
		} else
		if(keyDown[parent.up] && keyDown[parent.right]){
			p.directionX = 1;
			p.directionY = -1;
		} else
		if(keyDown[parent.down] && keyDown[parent.left]){
			p.directionX = -1;
			p.directionY = 1;
		} else
		if(keyDown[parent.down] && keyDown[parent.right]){
			p.directionX = 1;
			p.directionY = 1;
		} else
		if(keyDown[parent.up]){
			p.directionX = 0;
			p.directionY = -1;
		} else
		if(keyDown[parent.down]){
			p.directionX = 0;
			p.directionY = 1;
		}
	}
	if(p.name === 'quick'){
		var angle = 90;
		if(keyDown[parent.up])angle = 0;
		if(keyDown[parent.up] && keyDown[parent.left]){
			angle = 45;
		} else
		if(keyDown[parent.up] && keyDown[parent.right]){
			angle = 45;
		} else
		if(keyDown[parent.down] && keyDown[parent.left]){
			angle = 135;
		} else
		if(keyDown[parent.down] && keyDown[parent.right]){
			angle = 135;
		} else
		if(keyDown[parent.up]){
			angle = 0;
		} else
		if(keyDown[parent.down]){
			angle = 180;
		}
		if(p.directionY === 0){
			p.angle = angle*p.directionX;
			new Shot(parent, damage, p.directionX, -1);
			new Shot(parent, damage, p.directionX, 1);
		}
		if(p.directionY === -1)p.angle = (angle-45)*p.directionX;
		if(p.directionY === 1)p.angle = (angle+45)*p.directionX;
		p.limit = 4;
		p.peak = false;
		p.peakTimer = 0;
		p.peakLimit = 30;
		p.returning = false;
		p.radians = (p.angle-90)*Math.PI/180;
		p.cos = Math.cos(p.radians)*p.speed;
		p.sin = Math.sin(p.radians)*p.speed;
	}
	if(p.name === 'magnet'){
		p.found = false;
	}
	if(p.name === 'snake'){
		p.velocityY = -2;
		p.gravity = 0.125;
		p.running = false;
		p.directionY = 1;
	}
	if(p.name === 'guts'){
		if(p.directionX !== 0 && p.directionY !== 0)p.shotType = 'split';
		else if(p.directionX === 0 && p.directionY === 0)p.shotType = 'debris';
		else p.shotType = 'block';
		if(p.shotType === 'split'){
			p.indexX = 0;
			p.indexY = 3;
			p.width = 16;
			p.height = 16;
			p.speed = .5;
			if(p.directionX === -1 && p.directionY === -1){
				p.x = parent.shot.x;
				p.y = parent.shot.y;
			} else if(p.directionX === 1 && p.directionY === -1){
				p.x = parent.shot.x+p.width;
				p.y = parent.shot.y;
			} else if(p.directionX === 1 && p.directionY === 1){
				p.x = parent.shot.x+p.width;
				p.y = parent.shot.y+p.height;
			} else if(p.directionX === -1 && p.directionY === 1){
				p.x = parent.shot.x;
				p.y = parent.shot.y+p.height;
			}
			p.limit = 20;
		}
		if(p.shotType === 'debris'){
			p.limit = 35;
			p.indexX = 0;
			p.indexY = 6;
			p.width = 8;
			p.height = 8;
			p.x = parent.center.x-p.width/2;
			p.y = parent.center.y+parent.height/2-p.height;
			new SmallExplosion(p.x+p.width/2, p.y+p.height/2);
			p.speed = (random(20)-10)/10;
			p.velocityY = -2.5+random(10)/10;
			if(p.speed < 0)p.directionX = -1;
			else p.directionX = 1;
		}
		if(p.shotType === 'block'){
			p.velocityY = -5;
			p.y += 16;
			p.shotMode = 'neutral';
		}
		p.gravity = 0.2;
		p.carried = false;
		p.thrown = false;
		p.throwing = false;
	}
	if(p.name === 'shadow'){
		p.direction = -parent.direction;
		p.limit = 3;
		p.speed = 10;
		p.angle = 90*p.direction;
		p.radians = p.angle*Math.PI/180;
		p.velocityX = Math.cos(p.radians)*p.speed;
		p.velocityY = Math.sin(p.radians)*p.speed;
		p.distMax = 68;
		p.calling = false;
		p.throwing = false;
	}
	if(p.name === 'wood'){
		if(dx === parent.direction){
			new Shot(parent, p.damage, -parent.direction);
			new Shot(parent, p.damage, 0, -1);
			new Shot(parent, p.damage, 0, 1);
		}
		p.originX = parent.center.x;
		p.originY = parent.center.y;
		p.x = p.originX-p.width/2;
		p.y = p.originY-p.height/2;
		p.spinning = false;
		p.firing = false;
		p.distMax = 24;
		p.limit = 3;
		p.indexDirection = 1;
		p.fallTimer = 0;
		p.fallLimit = 5;
	}
	if(p.name === 'top'){
		p.velocityY = -1;
		p.gravity = 0.1;
	}
	if(p.name === 'bubble'){
		p.velocityY = -2;
		p.gravity = 0.1;
		p.timer = 10;
		p.bounce = keyDown[parent.up];
		p.speed = 1;
	}
	if(p.name === 'air'){
		p.velocityY = 0;
		p.gravity = -0.05;
		p.timer = 3;
		if(Math.abs(dx) <= 1){
			new Shot(parent, damage, 2*dx);
			new Shot(parent, damage, 3*dx);
		}
	}
	if(p.name === 'heat'){
		p.timer = 3;
		if(x === parent.center.x+cp.shotOriginX*parent.direction-cp.shotWidth/2 && y === parent.center.y+cp.shotOriginY-cp.shotHeight/2+2){
			p.gravity = 0.15;
			p.speed = 1;
			if(Math.abs(dx) <= 1){
				p.directionX = 0.5*dx;
				p.velocityY = -5;
				var sA = new Shot(parent, damage, 1.25*dx);
				var sB = new Shot(parent, damage, 3*dx);
			} else if(Math.abs(dx) <= 1.25)p.velocityY = -4;
			else if(Math.abs(dx) <= 3)p.velocityY = -2;
			p.throwing = true;
			p.rising = false;
			p.falling = false;
		} else {
			p.speed = 1;
			p.throwing = false;
			p.rising = true;
			p.falling = false;
		}
	}
	if(p.direction === undefined)p.direction = dx;
	p.collision = false
	p.destroyed = false;
	p.deflecting = false;
	p.tile = {};
	p.lastCenter = {};
	p.lastCenter.x = p.center.x;
	p.flame = false;
	p.updateRect = function(){
		p.rect.x1 = p.x+p.rectX;
		p.rect.y1 = p.y+p.rectY;
		p.rect.x2 = p.x+p.rectX+p.rectWidth;
		p.rect.y2 = p.y+p.rectY+p.rectHeight;
		p.center.x = p.x+p.width/2;
		p.center.y = p.y+p.height/2;
		p.tile.x = Math.floor((p.center.x-6)/tileSize);
		p.tile.y = Math.floor((p.center.y+8)/tileSize);
		if(p.tile.x < 0)p.tile.x = 0;
		if(p.tile.x > game.maps.width-1)p.tile.x = game.maps.width-1;
		if(p.tile.y < 0)p.tile.y = 0;
		if(p.tile.y > game.maps.height-1)p.tile.y = game.maps.height-1;
	}
	p.updateRect();
	p.deflect = function(){
		if(p.name !== 'crash' && p.name !== 'guts')p.deflecting = true;
	}
	p.destroy = function(){
		if(!p.destroyed){
			for(var i = 0; i < parent.shotArray.length; i ++){
				var s = parent.shotArray[i];
				if(p.x===s.x && p.y === s.y){
					parent.shotArray.splice(i, 1);
				}
			}
			p.destroyed = true;
			if(p.name === 'bomb')new Explosion(p.center.x, p.center.y, parent.opponent, p.damage);
			if(p.name === 'guts' && p.shotType === 'block' || p.name !== 'guts')parent.shots --;
			p.remove();
		}
	}
	p.split = function(){
		if(!p.destroyed){
			new Shot(parent, 3, -1, -1);
			new Shot(parent, 3, 1, -1);
			new Shot(parent, 3, 1, 1);
			new Shot(parent, 3, -1, 1);
			new SmallExplosion(p.center.x, p.center.y);
			p.destroy();
		}
	}
	p.update = function(){
		p.life ++;
		var o = parent.opponent;
		if(p.name === 'ice'){
			p.timer ++;
			if(p.timer >= p.limit){
				p.timer = 0;
				p.indexX ++;
				if(p.indexX > 13)p.indexX = 12;
			}
		}
		if(p.name === 'shadow'){
			p.timer ++;
			if(p.timer >= p.limit){
				p.timer = 0;
				p.indexX ++;
				if(p.indexX > 7)p.indexX = 6;
			}
		}
		if(p.name === 'metal'){
			p.timer ++;
			if(p.timer >= p.limit){
				p.timer = 0;
				p.indexX ++;
				if(p.indexX > 1)p.indexX = 0;
			}
		}
		if(p.name === 'quick'){
			p.timer ++;
			if(p.timer >= p.limit){
				p.timer = 0;
				p.indexX += p.directionX;
				if(p.indexX < 0)p.indexX = 3;
				if(p.indexX > 3)p.indexX = 0;
			}
		}
		if(p.name === 'fire'){
			p.timer ++;
			if(p.speed === p.slowSpeed){
				if(p.life%2===0)p.visible = false;
				else p.visible = true;
			} else p.visible = true;
			if(p.timer >= p.limit){
				p.timer = 0;
				if(p.speed === p.slowSpeed){
					p.indexX ++;
					if(p.indexX >= 16){
						p.indexX = 15;
						p.speed = p.fastSpeed;
					}
				} else {
					if(p.indexX === 15)p.indexX = 16;
					else if(p.indexX === 16)p.indexX = 15;
				}
			}
			p.velocityX = p.speed*p.directionX;
		} else if(p.name === 'elec'){
			p.timer ++;
			if(p.timer >= p.limit){
				if(p.directionX != 0){
					p.velocityX = p.speed * p.directionX;
					p.timer = 0;
					p.indexX ++;
					if(p.indexX > 6)p.indexX = 0;
				} else
				if(p.directionY != 0){
					p.velocityY = p.speed * p.directionY;
					p.timer = 0;
					p.indexX ++;
					if(p.indexX > 19)p.indexX = 17;
				}
			} else {
				p.velocityX = 0;
				p.velocityY = 0;
			}
		} else if(p.name === 'cut'){
			if(p.returning){
				p.radians = Math.atan2(parent.center.y-p.center.y, parent.center.x-p.center.x);
				p.cos = Math.cos(p.radians)*p.speed;
				p.sin = Math.sin(p.radians)*p.speed;
			}
			p.velocityX = p.cos;
			p.velocityY = p.sin;
			p.timer ++;
			if(p.timer >= p.limit){
				p.timer = 0;
				p.indexX += p.directionX;
				if(p.indexX < 3)p.indexX = 6;
				if(p.indexX > 6)p.indexX = 3;
			}
		} else if(p.name === 'bomb'){
			if(p.grounded)p.velocityX *= p.groundFriction;
			else p.velocityX *= p.friction;
			p.velocityY += p.gravity;
		} else if(p.name === 'flash'){
			p.velocityX = p.cos;
			p.velocityY = p.sin;
		} else if(p.name === 'crash'){
			if(!p.attaching && !p.exploding){
				p.velocityX = p.speed * p.directionX;
				p.velocityY = p.speed * p.directionY;
			} else if(p.exploding){
				p.timer ++;
				if(p.timer >= p.limit){
					p.indexX += p.indexDirection;
					p.indexDirection *= -1;
					p.timer = 0;
					p.ticks ++;
				}
				if(p.ticks > 4){
					p.limit = 5;
					if(p.ticks >= p.ticksMax){
						if(!p.hit)new Explosion(p.center.x, p.center.y, parent.opponent);
						p.hit = true;
						p.destroy();
					}
				}
			} else if(p.attaching){
				if(p.directionY === 0){
					p.timer ++;
					if(p.timer >= p.limit){
						p.timer = 0;
						p.indexX ++;
						if(p.indexX > 4 && p.directionY === 0){
							p.indexX = 4;
							p.exploding = true;
							p.limit = 15;
						}
					}
				} else {
					p.timer ++;
					if(p.timer >= p.limit){
						p.timer = 0;
						p.indexX = 7;
						p.exploding = true;
						p.limit = 15;
					}
				}
			}
		} else if(p.name === 'quick'){
			if(p.returning){
				var distX = parent.center.x - p.x;
				var distY = parent.center.y - p.y;
				var radians = Math.atan2(distY, distX);
				p.cos = Math.cos(radians)*p.speed;
				p.sin = Math.sin(radians)*p.speed;
				if(!p.deflecting && p.rect.intersect(parent.rect))p.destroy();
			} else if(p.peak){
				p.peakTimer ++;
				if(p.peakTimer >= p.peakLimit){
					p.returning = true;
					p.peakTimer = 0;
					p.peak = false;
				}
			} else {
				var distX = p.x - p.startX;
				var distY = p.y - p.startY;
				var distTotal = Math.sqrt(distX*distX+distY*distY);
				if(distTotal >= 64){
					p.cos = 0;
					p.sin = 0;
					p.peak = true;
				}
			}
			p.velocityX = p.cos;
			p.velocityY = p.sin;
		} else if(p.name === 'snake'){
			// p.timer ++;
			// if(p.timer >= p.limit){
			// 	p.timer = 0;
			// 	p.indexX ++;
			// 	if(p.directionX !== 0 || p.directionY === -1)if(p.indexX > 13)p.indexX = 12;
			// 	if(p.directionY === 1)if(p.indexX > 15)p.indexX = 14;
			// }
			if(!p.running){
				p.velocityX = p.speed * p.directionX;
				p.velocityY += p.gravity;
			} else {
				p.velocityX = p.speed * p.directionX;
				p.velocityY = p.speed * p.directionY;
			}
		} else if(p.name === 'guts'){
			if(p.shotType === 'block'){
				if(p.carried){
					p.x = parent.center.x-p.width/2;
					p.y = parent.center.y-p.height-14;
				} else if(p.thrown){
					p.velocityX = p.speed * p.directionX;
					p.velocityY += p.gravity;
				} else {
					if(p.y >= parent.center.y-p.height-14 && p.velocityY >= 0 && !p.throwing){
						p.y = parent.center.y-p.height-14;
						p.velocityY = 0;
						p.carried = true;
					} else {
						p.x = parent.center.x-p.width/2;
						if(!p.throwing)p.velocityY += p.gravity;
						else p.x = parent.center.x-p.width/2-parent.direction*4;
						if(keyDown[parent.up]){
							p.shotMode = 'up';
						}
						if(keyDown[parent.down]){
							p.shotMode = 'down';
						}
					}
				}
			} else if(p.shotType === 'debris'){
				p.velocityX = p.speed;
				p.velocityY += p.gravity;
				p.timer ++;
				if(p.timer >= p.limit-10)p.visible = !p.visible;
				if(p.timer >= p.limit){
					p.timer = 0;
					p.destroy();
				}
			} else if(p.shotType === 'split'){
				p.velocityX = p.speed * p.directionX;
				p.velocityY = p.speed * p.directionY;
				p.timer ++;
				if(p.timer >= p.limit-10)p.visible = !p.visible;
				if(p.timer >= p.limit){
					p.timer = 0;
					p.destroy();
				}
			}
		} else if(p.name === 'shadow'){
			if(p.throwing){
				p.velocityX = p.speed*p.direction;
				p.velocityY = 0;
			} else if(p.calling){
				var distX = parent.center.x - p.center.x;
				var distY = parent.center.y - p.center.y;
				p.radians = Math.atan2(distY, distX);
				p.velocityX = Math.cos(p.radians)*p.speed;
				p.velocityY = Math.sin(p.radians)*p.speed;
			} else {
				p.angle -= p.speed*p.direction;
				p.radians = p.angle*Math.PI/180;
				p.velocityX = (parent.center.x-p.width/2+Math.cos(p.radians)*p.distMax-p.x)/16;
				p.velocityY = (parent.center.y-p.height/2+Math.sin(p.radians)*p.distMax-p.y)/16;
			}
		} else if(p.name === 'wood'){
			if(p.firing){
				p.originX += p.speed*p.directionX;
				p.originY += p.speed*p.directionY;
			} else {
				p.originX = parent.center.x;
				p.originY = parent.center.y;
			}
			if(p.falling){
				p.velocityX = p.indexDirection*2;
				p.velocityY = 2;
				p.fallTimer ++;
				if(p.fallTimer >= p.fallLimit){
					p.fallTimer = 0;
					p.indexX += p.indexDirection;
					if(p.indexX < 15 || p.indexX > 16)p.indexDirection *= -1;
				}
			} else if(p.spinning){
				p.timer ++;
				if(p.timer >= p.limit){
					p.timer = 0;
					p.angle -= 45/2;
					p.radians = p.angle*Math.PI/180;
					var newX = p.originX-p.width/2+Math.cos(p.radians)*p.distMax;
					var newY = p.originY-p.height/2+Math.sin(p.radians)*p.distMax;
					p.velocityX = newX-p.x;
					p.velocityY = newY-p.y;
				} else p.velocityX = p.velocityY = 0;
			} else {
				p.velocityX = (p.originX-p.width/2+p.speed*p.directionX*p.life)-p.x;
				p.velocityY = (p.originY-p.height/2+p.speed*p.directionY*p.life)-p.y;
			}
		} else if(p.name === 'top'){
			p.velocityX = p.speed * p.directionX;
			p.velocityY += p.gravity;
			p.timer ++;
			if(p.timer >= p.limit){
				p.timer = 0;
				p.indexX += p.directionX;
				if(p.indexX < charProperties['top'].shotIndexX)p.indexX = charProperties['top'].shotIndexX+2;
				if(p.indexX > charProperties['top'].shotIndexX+2)p.indexX = charProperties['top'].shotIndexX;
			}
		} else if(p.name === 'bubble'){
			p.velocityX = p.speed * p.directionX;
			p.velocityY += p.gravity;
			p.timer ++;
			if(p.timer >= p.limit){
				p.timer = 0;
				p.indexX ++;
				if(p.indexX > charProperties['bubble'].shotIndexX+1)p.indexX = charProperties['bubble'].shotIndexX;
			}
		} else if(p.name === 'air'){
			p.velocityX = p.speed * p.directionX;
			p.velocityY += p.gravity;
			p.timer ++;
			if(p.timer >= p.limit){
				p.timer = 0;
				p.indexX ++;
				if(p.indexX > charProperties['air'].shotIndexX+2)p.indexX = charProperties['air'].shotIndexX;
			}
		} else if(p.name === 'heat'){
			p.velocityX = 0;
			if(p.parentShot === undefined){
				p.timer ++;
				if(p.timer >= p.limit){
					p.timer = 0;
					p.indexY ++;
					if(p.indexY > charProperties['heat'].shotIndexYL+2)p.indexY = charProperties['heat'].shotIndexYL;
				}
			} else {
				p.indexY = p.parentShot.indexY;
				p.timer = p.parentShot.timer;
			}
			if(p.throwing){
				p.velocityX = p.speed * p.directionX;
				p.velocityY += p.gravity;
			} else {
				p.velocityY = 0;
				if(p.shotArray.length === 0){
					if(p.rising || p.falling){
						p.velocityX = p.directionX;
						p.velocityY = p.directionY;
					}
				}
			}
		} else {
			p.velocityX = p.speed * p.directionX;
			p.velocityY = p.speed * p.directionY;
		}
		p.updateRect();
		// if(p.name === 'fire'){
		// 	if(((p.directionX === -1 && p.center.x <= o.jumpX && p.startCenter.x > o.jumpX) || (p.directionX === 1 && p.center.x >= o.jumpX && p.startCenter.x < o.jumpX)) && !p.flame){
		// 		new Flame(o.jumpX, o.jumpY-5, parent);
		// 		p.flame = true;
		// 	}
		// }
		if(p.name === 'cut'){
			if(Math.sqrt((p.tx-p.x)*(p.tx-p.x)+(p.ty-p.y)*(p.ty-p.y)) <= 8 || p.life > 25)p.returning = true;
			if(p.rect.intersect(parent.rect) && p.returning){
				p.destroy();
			}
		}
		if(p.name === 'bomb'){
			if(p.exploding){
				p.timer ++;
				if(p.timer > p.limit/2){
					if(p.indexY === 2 && p.timer%2===1)p.indexY = 3;
					else if(p.indexY === 3 && p.timer%2===1)p.indexY = 2;
				}
				if(p.timer >= p.limit){
					p.timer = 0;
					p.destroy();
				}
			} else {
				p.timer = 0;
				p.indexY = 2;
			}
		}
		p.move(p.velocityX, p.velocityY);
		p.lastCenter.x = p.center.x;
	}
	p.move = function(dx, dy){
		if(p.deflecting){
			dx = 4*-p.directionX;
			dy = -4;
		}
		p.collision = false;
		p.grounded = false;
		var o = parent.opponent;
		p.updateRect();
		if(dx != 0)p.moveAxis(dx, 0);
		if(dy != 0)p.moveAxis(0, dy);
		if(!p.deflecting){
			if(p.rect.intersect(new Rectangle(o.x+o.rectX, o.y+o.rectY+4, o.x+o.rectX+o.rectWidth, o.y+o.rectY+o.rectHeight)) && !p.hit){
				if(!o.invincible && !o.warping && !o.leaving && !game.over && !o.health <= 0 && !o.resetting){
					if(p.name === 'guts'){
						if(p.shotType === 'block'){
							if(p.thrown){
								if(!p.destroyed){
									o.hit(p.damage, p.directionX);
									p.split();
									p.destroy();
								}
							}
						} else
						if(p.shotType === 'split'){
							o.hit(p.damage, p.directionX);
							p.hit = true;
						}
					} else if(p.name === 'crash'){
						p.hit = true;
						if(!p.destroyed){
							o.hit(p.damage, p.directionX);
							new Explosion(p.center.x, p.center.y, o);
							p.destroy();
						}
					} else if(p.name !== 'bomb'){
						var direction;
						if(p.name === 'magnet')direction = p.startDirectionX;
						else if(p.name === 'wood'){
							direction = -o.direction;
							p.falling = true;
						} else direction = p.directionX;
						if(direction < -1)direction = -1;
						if(direction > 1)direction = 1;
						o.hit(p.damage, direction);
						if(p.name !== 'shadow' && p.name !== 'wood' && p.name !== 'top')p.hit = true;
						if(p.name === 'ice')o.ice = true;
						if(p.name === 'cut')p.returning = true;
						if(!p.piercing && p.name !== 'cut'){
							p.destroy();
						}
					}
				}
			}
			if(p.name === 'wood' && !p.spinning && !p.falling && !p.firing){
				var targetX = p.originX-p.width/2+p.distMax*p.directionX;
				var targetY = p.originY-p.height/2+p.distMax*p.directionY;
				var distX = targetX-p.x;
				var distY = targetY-p.y;
				var distTotal = Math.sqrt(distX*distX+distY*distY);
				if(distTotal < p.speed){
					p.spinning = true;
					p.x = targetX;
					p.y = targetY;
					if(p.directionX === -1)p.angle = 270;
					if(p.directionX === 1)p.angle = 90;
					if(p.directionY === -1)p.angle = 0;
					if(p.directionY === 1)p.angle = 180;
				}
			}
			if(p.name === 'heat' && !p.throwing && p.shotArray.length === 0){
				if(p.rising){
					if(p.directionX === 1 && p.x > p.startX+8){
						p.x = p.startX+8;
						p.rising = false;
					}
					if(p.directionX === -1 && p.x < p.startX-8){
						p.x = p.startX-8;
						p.rising = false;
					}
					if(p.directionY === 1 && p.y > p.startY+8){
						p.y = p.startY+8;
						p.rising = false;
					}
					if(p.directionY === -1 && p.y < p.startY-8){
						p.y = p.startY-8;
						p.rising = false;
					}
					if(!p.rising){
						if(p.parentShot !== undefined && p.parentShot.shotArray.length < 4){
							var s = new Shot(parent, p.damage, p.directionX, p.directionY, p.x, p.y).sprite;
							s.parentShot = p.parentShot;
							p.parentShot.shotArray.push(s);
							if(p.directionY === 1)s.indexX ++;
							if(p.directionX === 1)s.indexX += 2;
							if(p.directionX === -1)s.indexX += 3;
						} else {
							p.falling = true;
							p.directionX *= -1;
							p.directionY *= -1;
						}
					}
				} else if(p.falling){
					if(p.directionY === 1 && p.y > p.startY || p.directionY === -1 && p.y < p.startY || p.directionX === 1 && p.x > p.startX || p.directionX === -1 && p.x < p.startX){
						p.parentShot.shotArray.pop();
						if(p.parentShot.shotArray.length === 0)p.parentShot.destroy();
						else {
							var s = p.parentShot.shotArray[p.parentShot.shotArray.length-1];
							s.falling = true;
							s.directionX *= -1;
							s.directionY *= -1;
						}
						p.destroy();
					}
				}
			}
			for(var i = 0; i < game.enemies.length; i ++){
				var t = game.enemies[i];
				if(p.rect.intersect(t.rect) && !t.invincible){
					if(p.name === 'bomb'){
						p.hit = true;
						p.destroy();
						p.exploding = true;
						t.hit(4, p.directionX);
					} else {
						if(p.name === 'guts' && p.shotType === 'block' && p.thrown)p.split();
						t.hit(p.damage, p.directionX);
						if(t.health <= 0)game.dropPickup(t.center.x, t.center.y);
						if(!p.piercing)p.destroy();
					}
				}
			}
			for(var i = 0; i < game.yellowParts.length; i ++){
				var t = game.yellowParts[i];
				if(p.rect.intersect(t.rect)){
					if(p.name === 'bomb'){
						p.hit = true;
						p.destroy();
						p.exploding = true;
					} else {
						if(p.name === 'guts'){
							if(p.shotType === 'block'){
								if(p.thrown){
									p.split();
									if(!p.destroyed){
										p.destroy();
										new SmallExplosion(p.center.x, p.center.y);
									}
								}
							} else {
								if(!p.destroyed){
									p.destroy();
									new SmallExplosion(p.center.x, p.center.y);
								}
							}
						} else {
							if(!p.destroyed){
								p.destroy();
								new SmallExplosion(p.center.x, p.center.y);
							}
						}
					}
					if(!t.falling)t.falling = true;
					else t.destroy();
				}
			}
			if(p.name === 'magnet'){
				if(!p.found){
					var distX = Math.abs(o.center.x-p.center.x);
					if(distX <= p.speed){
						p.found = true;
						p.directionX = 0;
						p.directionY = 1;
						p.indexX ++;
						if(p.center.y > o.center.y){
							p.directionY = -1;
							p.indexX ++;
						}
					}
				}
			}
			if(p.name !== 'guts' && !(p.name === 'wood' && !p.falling) && p.name !== 'bubble' && p.name !== 'top' && p.name !== 'heat' && !(p.name === 'shadow' && !p.throwing) && p.name !== 'magnet' && p.name !== 'quick' && (p.rect.x2 < 0 || p.rect.x1 > canvas.width || p.rect.y2 < 0 && p.name !== 'bomb' || p.rect.y1 > canvas.height)){
				p.destroy();
			}
			if((p.name === 'guts' || p.name === 'top' || p.name === 'bubble' || p.name === 'heat') && (p.rect.x2 < 0 || p.rect.x1 > canvas.width || p.rect.y1 > canvas.height))p.destroy();
			if(p.name === 'magnet' && (!p.found && (p.rect.x2 < 0 || p.rect.x1 > canvas.width) || p.found && (p.rect.y2 < 0 && p.directionY < 0 || p.rect.y1 > canvas.height && p.directionY > 0)))p.destroy();
			if(p.name === 'shadow' && p.calling && p.rect.intersect(new Rectangle(parent.center.x-4, parent.center.y-4, parent.center.x+4, parent.center.y+4)))p.destroy();
			if(p.name === 'wood' && ((p.rect.x2 < 0 && p.directionX === -1) || (p.rect.x1 > canvas.width && p.directionX === 1) || (p.rect.y2 < 0 && p.directionY === -1) || (p.rect.y1 > canvas.height && p.directionY === 1)) && p.firing)p.destroy();
			if(!p.collision && p.name === 'snake'){
				if(p.directionY === -1){
					p.width = 16;
					p.height = 8;
					p.rectWidth = p.width;
					p.rectHeight = p.height;
					p.directionX = p.startDirectionX;
					p.directionY = 1;
					p.running = false;
					if(p.directionX === -1){
						p.indexX = 12;
						p.indexY = 5;
					}
					if(p.directionX === 1){
						p.indexX = 12;
						p.indexY = 4;
					}
				}
				if(p.directionX === -1 && p.directionY === 1 && p.running){
					p.width = 8;
					p.height = 16;
					p.rectWidth = p.width;
					p.rectHeight = p.height;
					p.directionX = 1;
					p.directionY = -p.startDirectionX;
					if(p.directionY === -1){
						p.indexX = 24;
						p.indexY = 3;
					}
					if(p.directionY === 1){
						p.indexX = 26;
						p.indexY = 3;
					}
				}
				//  else if(p.directionX === 1 && p.directionY === 1 && p.running){
				// 	p.running = false;
				// 	p.directionX = p.startDirectionX;
				// }
			}
		} else {
			if(!p.rect.intersect(display.rect))p.destroy();
		}
	}
	p.moveAxis = function(dx, dy){
		var o = parent.opponent;
		p.x += dx;
		p.y += dy;
		p.updateRect();
		if(!p.deflecting){
			if(parent.opponent.name === 'guts' && parent.opponent.shot !== undefined){
				t = parent.opponent.shot;
				if(p.rect.intersect(new Rectangle(t.x, t.y, t.x+t.width, t.y+t.height))){
					if(p.name === 'bomb'){
						if(dx < 0){
							p.x = t.x+t.width-p.rectX;
							p.velocityX *= -1;
						}
						if(dx > 0){
							p.x = t.x-p.rectX-p.rectWidth;
							p.velocityX *= -1;
						}
						if(dy < 0){
							p.y = t.y+t.height-p.rectY+1;
							p.velocityY = 0;
						}
						if(dy > 0){
							p.y = t.y-p.rectY-p.rectHeight;
							p.velocityY *= -0.6;
							p.grounded = true;
							p.exploding = true;
						}
					}
					if(p.name === 'crash'){
						if(p.directionY == 1){
							p.y = t.y-p.rectHeight;
							p.indexX = 6;
							p.velocityY = 0;
						} else {
							if(dx < 0){
								p.x = t.x+p.rectWidth-2;
							}
							if(dx > 0){
								p.x = t.x-p.rectWidth+2;
							}
						}
						p.velocityX = 0;
						p.attaching = true;
					}
				}
			}
			if((parent.opponent.name === 'top' || parent.opponent.name === 'bubble') && parent.opponent.shotArray.length > 0){
				for(var i = 0; i < parent.opponent.shotArray.length; i ++){
					t = parent.opponent.shotArray[i];
					if(p.rect.intersect(new Rectangle(t.x, t.y, t.x+t.width, t.y+t.height))){
						if(p.name === 'bomb'){
							if(dx < 0){
								p.x = t.x+t.width-p.rectX;
								p.velocityX *= -1;
							}
							if(dx > 0){
								p.x = t.x-p.rectX-p.rectWidth;
								p.velocityX *= -1;
							}
							if(dy < 0){
								p.y = t.y+t.height-p.rectY+1;
								p.velocityY = 0;
							}
							if(dy > 0){
								p.y = t.y-p.rectY-p.rectHeight;
								p.velocityY *= -0.6;
								p.grounded = true;
								p.exploding = true;
							}
						} else {
							if(parent.opponent.name === 'top'){
								new Explosion(t.center.x, t.center.y);
							} else {
								new SmallExplosion(t.center.x, t.center.y);
							}
							t.destroy();
							if(!p.piercing){
								new SmallExplosion(p.center.x, p.center.y);
								p.destroy();
							}
						}
					}
				}
			}
			if(p.name === 'bomb'){
				for(var i = 0; i < game.lasers.length; i ++){
					var t = game.lasers[i];
					if(p.rect.intersect(t.rect)){
						p.exploding = true;
						p.hit = true;
						p.destroy();
					}
				}
			}
			if(!p.phasing && !(p.name === 'guts' && !p.thrown)){
				for(var i = 0; i < game.tiles.length; i ++){
					var t = game.tiles[i];
					if(p.rect.intersect(t.rect) && p.name === 'bomb' && t.damage > 0 && !t.solid){
						p.exploding = true;
						p.hit = true;
						p.destroy();
					}
					if(p.rect.intersect(t.rect) && t.solid){
						p.collision = true;
						if(p.name === 'heat'){
							if(p.throwing){
								p.directionX = 0;
								p.directionY = 0;
								p.velocityX = 0;
								p.velocityY = 0;
								p.throwing = false;
								p.rising = false;
								p.falling = false;
								if(dx < 0){
									p.x = t.rect.x2;
									p.directionX = 1;
									p.directionY = 0;
								}
								if(dx > 0){
									p.x = t.x-p.width;
									p.directionX = -1;
									p.directionY = 0;
								}
								if(dy < 0){
									p.y = t.rect.y2;
									p.directionX = 0;
									p.directionY = 1;
								}
								if(dy > 0){
									p.y = t.y-p.height;
									p.directionX = 0;
									p.directionY = -1;
								}
								var s = new Shot(parent, p.damage, p.directionX, p.directionY, p.x, p.y).sprite;
								s.parentShot = p;
								p.shotArray.push(s);
								if(p.directionY === 1)p.indexX ++;
								if(p.directionX === 1)p.indexX += 2;
								if(p.directionX === -1)p.indexX += 3;
								s.indexX = p.indexX;
							}
						} else if(p.name === 'wood'){
							if(p.firing){
								new SmallExplosion(p.center.x, p.center.y);
								p.destroy();
								// p.falling = true;
							}
						} else if(p.name === 'bubble'){
							if(t.damage > 0)p.hits += 2;
							if(dx < 0){
								p.x = t.x+t.width-p.rectX;
								if(p.directionX === -1){
									p.directionX = 1;
									p.hits ++;
								}
							}
							if(dx > 0){
								p.x = t.x-p.rectX-p.rectWidth;
								if(p.directionX === 1){
									p.directionX = -1;
									p.hits ++;
								}
							}
							if(dy < 0){
								p.y = t.y+t.height-p.rectY+1;
								p.velocityY = 0;
							}
							if(dy > 0){
								p.y = t.y-p.rectY-p.rectHeight;
								if(p.bounce)p.velocityY = -3;
								else {
									p.velocityY = 0;
									p.speed = 1.5;
								}
							}
							if(t.through){
								if(dy > 0 && p.rect.y2 >= t.y && p.lastRect.y2 <= t.y+8 && p.rect.x2 > t.x && p.rect.x1 < t.x+tileSize){
									p.y = t.y-p.rectY-p.rectHeight;
									if(p.bounce)p.velocityY = -3;
									else {
										p.velocityY = 0;
										p.speed = 1.5;
									}
								}
							}
							p.updateRect();
							if(p.hits >= 2){
								new SmallExplosion(p.center.x, p.center.y);
								p.destroy();
							}
						} else if(p.name === 'top'){
							if(dx < 0){
								p.x = t.x+t.width-p.rectX;
								if(p.directionX === -1){
									p.directionX = 1;
									p.hits ++;
								}
							}
							if(dx > 0){
								p.x = t.x-p.rectX-p.rectWidth;
								if(p.directionX === 1){
									p.directionX = -1;
									p.hits ++;
								}
							}
							if(dy < 0){
								p.y = t.y+t.height-p.rectY+1;
								p.velocityY = 0;
							}
							if(dy > 0){
								p.y = t.y-p.rectY-p.rectHeight;
								p.velocityY = 0;
							}
							if(t.through){
								if(dy > 0 && p.rect.y2 >= t.y && p.lastRect.y2 <= t.y+8 && p.rect.x2 > t.x && p.rect.x1 < t.x+tileSize){
									p.y = t.y-p.rectY-p.rectHeight;
									p.velocityY = 0;
								}
							}
							if(p.hits >= 3){
								new SmallExplosion(p.center.x, p.center.y);
								p.destroy();
							}
							p.updateRect();
						} else
						if(p.name === 'bomb'){
							if(dx < 0){
								p.x = t.x+t.width-p.rectX;
								p.velocityX *= -1;
							}
							if(dx > 0){
								p.x = t.x-p.rectX-p.rectWidth;
								p.velocityX *= -1;
							}
							if(dy < 0){
								p.y = t.y+t.height-p.rectY+1;
								p.velocityY = 0;
							}
							if(dy > 0){
								p.y = t.y-p.rectY-p.rectHeight;
								p.velocityY *= -0.6;
								p.grounded = true;
								p.exploding = true;
							}
							if(t.through){
								if(dy > 0 && p.rect.y2 >= t.y && p.lastRect.y2 <= t.y+8 && p.rect.x2 > t.x && p.rect.x1 < t.x+tileSize){
									p.y = t.y-p.rectY-p.rectHeight;
									p.velocityY *= -0.6;
									p.grounded = true;
									p.exploding = true;
								}
							}
							p.updateRect();
						} else if(p.name === 'crash'){
							if(p.directionY == 1){
								p.y = t.y-p.rectHeight;
								p.indexX = 6;
								p.velocityY = 0;
							} else {
								if(dx < 0){
									p.x = t.x+p.rectWidth-2;
								}
								if(dx > 0){
									p.x = t.x-p.rectWidth+2;
								}
							}
							p.velocityX = 0;
							p.attaching = true;
						} else if(p.name === 'snake'){
							p.speed = 2;
							p.running = true;
							if(dx < 0){
								p.x = t.x+t.width-p.rectX;
								p.width = 8;
								p.height = 16;
								p.rectWidth = p.width;
								p.rectHeight = p.height;
								//p.directionX = 0;
								p.directionY = p.startDirectionX;
								if(p.directionY === -1){
									p.indexX = 24;
									p.indexY = 4;
								}
								if(p.directionY === 1){
									p.indexX = 26;
									p.indexY = 4;
								}
							}
							if(dx > 0){
								p.x = t.x-p.rectX-p.rectWidth;
								p.width = 8;
								p.height = 16;
								p.rectWidth = p.width;
								p.rectHeight = p.height;
								//p.directionX = 0;
								p.directionY = -p.startDirectionX;
								if(p.directionY === -1){
									p.indexX = 24;
									p.indexY = 3;
								}
								if(p.directionY === 1){
									p.indexX = 26;
									p.indexY = 3;
								}
							}
							if(dy < 0){
								p.y = t.y+t.height-p.rectY+1;
								if(!p.destroyed){
									new SmallExplosion(p.center.x, t.y+t.height);
									p.destroy();
								}
							}
							if(dy > 0){
								p.y = t.y-p.rectY-p.rectHeight;
								p.width = 16;
								p.height = 8;
								p.rectWidth = p.width;
								p.rectHeight = p.height;
								p.directionX = p.startDirectionX;
								//p.directionY = 0;
								if(p.directionX === -1){
									p.indexX = 12;
									p.indexY = 5;
								}
								if(p.directionX === 1){
									p.indexX = 12;
									p.indexY = 4;
								}
							}
							if(t.through){
								if(dy > 0 && p.rect.y2 >= t.y && p.lastRect.y2 <= t.y+8 && p.rect.x2 > t.x && p.rect.x1 < t.x+tileSize){
									p.y = t.y-p.rectY-p.rectHeight;
									p.width = 16;
									p.height = 8;
									p.rectWidth = p.width;
									p.rectHeight = p.height;
									p.directionX = p.startDirectionX;
									//p.directionY = 0;
									if(p.directionX === -1){
										p.indexX = 12;
										p.indexY = 5;
									}
									if(p.directionX === 1){
										p.indexX = 12;
										p.indexY = 4;
									}
								}
							}
							p.updateRect();
						} else if(p.name === 'guts'){
							if(p.shotType === 'block'){
								if(!p.destroyed){
									p.split();
									p.destroy();
								}
							}
						} else {
							if(!p.destroyed){
								if(dx < 0)new SmallExplosion(t.x+t.width, p.center.y);
								if(dx > 0)new SmallExplosion(t.x, p.center.y);
								if(dy < 0)new SmallExplosion(p.center.x, t.y+t.height);
								if(dy > 0)new SmallExplosion(p.center.x, t.y);
								p.destroy();
							}
						}
					}
				}
			}
			if(o.name === 'wood' && o.shots > 0){
				for(var i = 0; i < o.shotArray.length; i ++){
					t = o.shotArray[i];
					if(p.rect.intersect(t.rect)){
						t.falling = true;
						t.spinning = false;
						if(dx < 0){
							p.x = t.x+t.width-p.rectX;
							if(p.name === 'bomb')p.velocityX *= -1;
						}
						if(dx > 0){
							p.x = t.x-p.rectX-p.rectWidth;
							if(p.name === 'bomb')p.velocityX *= -1;
						}
						if(dy < 0){
							p.y = t.y+t.height-p.rectY+1;
							if(p.name === 'bomb')p.velocityY = 0;
						}
						if(dy > 0){
							p.y = t.y-p.rectY-p.rectHeight;
							if(p.name === 'bomb')p.velocityY *= -0.6;
						}
						if(p.name === 'bomb')p.exploding = true;
						else p.deflect();
					}
				}
			}
			if(o.name === 'shadow' && o.shots > 0){
				for(var i = 0; i < o.shotArray.length; i ++){
					t = o.shotArray[i];
					if(p.rect.intersect(t.rect)){
						if(p.name === 'bomb')p.destroy();
						else p.deflect();
					}
				}
			}
			if(p.name === 'bomb'){
				if(p.rect.intersect(new Rectangle(o.x+o.rectX, o.y+18, o.x+o.rectX+o.rectWidth, o.y+o.rectY+o.rectHeight)) && !o.invincible){
					p.exploding = true;
					p.hit = true;
					if(!p.destroyed){
						new Explosion(p.center.x, p.center.y, o, p.damage);
						p.destroy();
					}
					p.destroyed = true;
				}
			}
			p.updateRect();
		}
	}
}
function GeminiClone(parent, jumping, x, y){
	if(x === undefined)x = parent.x;
	if(y === undefined)y = parent.y;
	var p = this.sprite = new Sprite(x, y, 48, 48, charSheet, 3, 0, charProperties[parent.name].index*2, true);
	if(parent.direction === -1)p.indexY ++;
	p.indexX = parent.indexX;
	p.pauseVisible = false;
	p.visible = true;
	p.timer = 0;
	p.limit = 120;
	p.health = 3;
	p.velocityX = 0;
	if(jumping && parent.grounded)p.velocityY = -parent.jumpHeight;
	else p.velocityY = 0;
	p.direction = parent.direction;
	p.speed = parent.speed;
	p.gravity = parent.gravityNormal;
	p.gravityWater = parent.gravityWater;
	p.destroying = false;
	p.grounded = true;
	p.tilesUnder = [];
	p.runIndex = parent.runIndex;
	p.runIndexes = parent.runIndexes;
	p.runIndexDirection = 1;
	p.runTimer = 0;
	p.runLimit = parent.runLimit;
	p.landing = false;
	p.landTimer = 0;
	p.landLimit = parent.landLimit;
	p.landFrame = parent.landFrame;
	p.center = {};
	p.active = true;
	p.rectX = parent.rectX;
	p.rectY = parent.rectY;
	p.rectWidth = parent.rectWidth;
	p.rectHeight = parent.rectHeight;
	p.updateRect = function(){
		p.rect = new Rectangle(p.x+p.rectX, p.y+p.rectY, p.x+p.rectX+p.rectWidth, p.y+p.rectY+p.rectHeight);
		p.center.x = p.x+p.rectX+p.rectWidth/2;
		p.center.y = p.y+p.rectY+p.rectHeight/2;
	}
	p.updateRect();
	p.lastRect = p.rect;
	p.update = function(){
		if(p.active){
			p.velocityY += p.gravity;
			if(jumping)p.velocityX += p.speed * p.direction;
			if(p.grounded){
				if(jumping){
					p.runTimer ++;
					if(p.runTimer >= p.runLimit){
						if(p.runIndex <= 0 && p.runIndexDirection ==-1)p.runIndexDirection = 1;
						if(p.runIndex >= p.runIndexes-1 && p.runIndexDirection == 1)p.runIndexDirection = -1;
						p.runIndex += p.runIndexDirection;
						p.runTimer = 0;
					}
					p.indexX = 6+p.runIndex;
				} else {
					if(p.landing){
						p.indexX = p.landFrame;
						p.landTimer ++;
						if(p.landTimer >= p.landLimit){
							p.landTimer = 0;
							p.landing = false;
						}
					} else p.indexX = 3;
				}
			} else {
				p.indexX = 9;
			}
		}
		if(p.conveyor !== undefined)p.velocityX += p.conveyor.speed;
		if(p.platform !== undefined)p.velocityX += p.platform.speed * p.platform.direction;
		p.timer ++;
		if(p.timer >= p.limit-60)p.visible = !p.visible;
		if(p.timer >= p.limit || p.health <= 0 || p.destroying){
			if(p.health <= 0)new SmallExplosion(p.center.x, p.center.y);
			p.timer = 0;
			parent.clones --;
			p.remove();
		}
		p.move(p.velocityX, p.velocityY);
		p.lastRect = p.rect;
		p.velocityX = 0;
	}
	p.move = function(dx, dy){
		p.conveyor = undefined;
		p.platform = undefined;
		var o = parent.opponent;
		p.tilesUnder = [];
		p.tilesUnder.length = 0;
		if(dx !== 0)p.moveAxis(dx, 0);
		if(dy !== 0)p.moveAxis(0, dy);
		if(p.rect.intersect(new Rectangle(o.x+o.rectX, o.y+o.rectY+4, o.x+o.rectX+o.rectWidth, o.y+o.rectY+o.rectHeight)) && !p.hit){
			if(!o.invincible && !o.warping && !o.leaving && !game.over && !o.health <= 0 && !o.resetting){
				o.hit(p.health, p.direction);
			}
		}
		if(p.tilesUnder.length > 0){
			if(!p.grounded){
				if(!jumping)p.landing = true;
				p.speed = parent.defSpeed;
			}
			p.grounded = true;
		} else {
			p.grounded = false;
		}
		if(p.rect.x2 < 0 || p.rect.x1 > canvas.width || p.rect.y1 > canvas.height)p.health = 0;
		for(var i = 0; i < o.shotArray.length; i ++){
			var t = o.shotArray[i];
			if(p.rect.intersect(t.rect)){
				p.health -= t.damage;
				if(!t.piercing && t.name !== 'crash' && t.name !== 'guts')t.remove();
				p.visible = false;
			}
		}
	}
	p.moveAxis = function(dx, dy){
		p.x += dx;
		p.y += dy;
		p.updateRect();
		for(var i = 0; i < game.tiles.length; i ++){
			var t = game.tiles[i];
			var rect = new Rectangle(p.x+p.rectX, p.y+18, p.x+p.rectX+p.rectWidth, p.y+p.rectY+p.rectHeight);
			if(rect.intersect(t.rect)){
				if(t.damage > 0)p.health -= t.damage;
				if(t.water){
					p.submerged = true;
					p.gravity = p.gravityWater;
				}
				if(t.solid){
					if(dx < 0){
						p.x = t.rect.x2-p.rectX;
						p.velocityX = 0;
					}
					if(dx > 0){
						p.x = t.x-p.width+p.rectX;
						p.velocityX = 0;
					}
					if(dy < 0){
						p.y = t.rect.y2-18;
						p.velocityY = 0;
					}
					if(dy > 0){
						if(t.speed !== 0)p.conveyor = t;
						p.y = t.y-p.rectY-p.rectHeight;
						p.velocityY = 0;
						p.tilesUnder.push(t);
					}
				}
			}
			if(t.through){
				if(dy > 0 && p.rect.y2 >= t.y && p.lastRect.y2 <= t.y+8 && p.rect.x2 > t.x && p.rect.x1 < t.x+tileSize){
					p.y = t.y-p.rectY-p.rectHeight;
					p.velocityY = 0;
					p.tilesUnder.push(t);
				}
			}
			p.updateRect();
		}
		var rect = new Rectangle(p.x+p.rectX, p.y+18, p.x+p.rectX+p.rectWidth, p.y+p.rectY+p.rectHeight);
		for(var i = 0; i < game.platforms.length; i ++){
			var t = game.platforms[i];
			if(rect.intersect(t.rect)){
				if(!t.dropping){
					if(dy > 0 && p.rect.y2 >= t.y && p.lastRect.y2 <= t.y+8 && p.rect.x2 > t.rect.x1 && p.rect.x1 < t.rect.x2){
						p.y = t.y-p.rectY-p.rectHeight;
						p.velocityY = 0;
						p.tilesUnder.push(t);
						p.platform = t;
					}
					p.updateRect();
				}
			}
		}
		p.updateRect();
	}
}
function Goblin(x, y){
	var p = {};
	p.indexX = tileSheets['air'].x;
	p.indexY = 1;
	p.indexMaxX = tileSheets['air'].x+4;
	p.indexMaxY = 5;
	p.tiles = [];
	p.horns = [];
	p.rect = {};
	p.remove = function(){
		for(var i = 0; i < p.tiles.length; i ++){
			for(var j = 0; j < p.tiles[i].length; j ++){
				p.tiles[i][j].remove();
			}
		}
		p.tiles = [];
		p.tiles.length = 0;
	}
	for(var i = 0; i <= p.indexMaxY-p.indexY; i ++){
		p.tiles.push([]);
		for(var j = 0; j <= p.indexMaxX-p.indexX; j ++){
			var indexX = j;
			var indexY = i;
			var frames = 0;
			var indexDirectionX = 0;
			var indexDirectionY = 0;
			var limit = 0;
			var timer = 0;
			if(j === 2 && i === 1){
				indexY = -1;
				frames = 3;
				indexDirectionX = 0;
				indexDirectionY = 2;
				limit = 9;
				timer = 0;
			}
			p.tiles[i].push(new Tile(x+j*tileSize, y+i*tileSize, 2, p.indexX+indexX, p.indexY+indexY, true, false, false, false, 0, 0, frames, indexDirectionX, indexDirectionY, limit, timer).sprite);
		}
	}
	p.horns[0] = new Tile(x+3, y, 1, tileSheets['air'].x+11, 1, false, false, false, false, 2, 0, 1).sprite;
	p.horns[1] = new Tile(x+tileSize*4-3, y, 1, tileSheets['air'].x+11, 1, false, false, false, false, 2, 0, 1).sprite;
	for(var i = 0; i < p.horns.length; i ++){
		var h = p.horns[i];
		h.startY = h.y;
		h.retracting = false;
		h.idle = false;
		h.idleTimer = 0;
		h.idleLimit = 45;
		h.update = function(){
			if(this.idle){
				this.idleTimer ++;
				if(this.idleTimer >= this.idleLimit){
					this.idle = false;
					this.idleTimer = 0;
				}
			} else if(this.retracting){
				this.y += 1.5;
				if(this.y > this.startY){
					this.y = this.startY
					this.retracting = false;
					this.idle = true;
				}
			} else {
				this.y -= 0.1;
				if(this.y < this.startY-tileSize){
					this.retracting = true;
					this.idle = true;
					this.y = this.startY-tileSize;
				}
			}
			this.rect = new Rectangle(this.x+4, this.y+4, this.x+tileSize-4, this.y+tileSize);
		}
	}
	game.tiles.push(p);
}
function Tile(x, y, depth, indexX, indexY, solid, through, ladder, water, damage, speed, frames, indexDirectionX, indexDirectionY, limit, timer, sway){
	if(solid === undefined)solid = false;
	if(through === undefined)through = false;
	if(ladder === undefined)ladder = false;
	if(water === undefined)water = false;
	if(damage === undefined)damage = 0;
	if(speed === undefined)speed = 0;
	if(frames === undefined)frames = 0;
	if(limit === undefined)limit = 0;
	if(timer === undefined)timer = 0;
	if(sway === undefined)sway = false;
	var p = this.sprite = new Sprite(x, y, tileSize, tileSize, tileSheet, depth, indexX, indexY, frames !== 0);
	p.pauseOverride = true;
	p.solid = solid;
	p.through = through;
	p.ladder = ladder;
	p.damage = damage;
	p.water = water;
	p.speed = speed;
	p.sway = sway;
	if(through)p.rect = new Rectangle(x+4, y, x+tileSize-4, y+6);
	if(ladder)p.rect = new Rectangle(x+8, y, x+8, y+tileSize);
	if(frames !== 0){
		p.indexDirectionX = indexDirectionX;
		p.indexDirectionY = indexDirectionY;
		p.startIndexX = p.indexX;
		p.endIndexX = p.indexX+frames;
		p.startIndexY = p.indexY;
		p.endIndexY = p.indexY+frames;
		p.timer = timer;
		p.limit = limit;
		p.update = function(){
			p.timer ++;
			if(p.timer >= p.limit){
				p.timer = 0;
				p.indexX += p.indexDirectionX;
				p.indexY += p.indexDirectionY;
				if(p.indexX >= p.endIndexX){
					if(p.sway){
						p.indexX = p.endIndexX;
						p.indexDirectionX = -1;
					} else {
						p.indexX = p.startIndexX;
					}
				}
				if(p.indexY >= p.endIndexY){
					if(p.sway){
						p.indexY = p.endIndexY;
						p.indexDirectionY = -1;
					} else {
						p.indexY = p.startIndexY;
					}
				}
				if(p.indexX < p.startIndexX){
					if(p.sway){
						p.indexX = p.startIndexX+1;
						p.indexDirectionX = 1;
					} else {
						p.indexX = p.endIndexX;
					}
				}
				if(p.indexY < p.startIndexY){
					if(p.sway){
						p.indexY = p.startIndexY+1;
						p.indexDirectionY = 1;
					} else {
						p.indexY = p.endIndexY;
					}
				}
			}
		}
	}
	if(p.solid || p.ladder || p.damage > 0 || p.frames)game.tilesByIds[x/tileSize+'_'+(y+8)/tileSize] = p;
	game.tiles.push(p);
}
function FlashTile(x, y, depth, indexX, indexY, index){
	var p = this.sprite = new Sprite(x, y, tileSize, tileSize, tileSheet, depth, indexX, indexY, true);
	p.pauseOverride = true;
	p.solid = true;
	p.onLimit = 35;
	p.offLimit = p.onLimit*2;
	p.limit = p.offLimit;
	p.timer = p.offLimit-index*p.onLimit;
	p.indexDirection = 1;
	p.speed = 0;
	p.update = function(){
		p.timer ++;
		if(p.timer >= p.limit){
			p.timer = 0;
			if(p.limit === p.onLimit)p.limit = p.offLimit;
			else if(p.limit === p.offLimit)p.limit = p.onLimit;
			p.indexX += 3*p.indexDirection;
			p.indexDirection *= -1;
		}
	}
	game.tiles.push(p);
}
function Lava(x, y, type, indexX, indexY, frames){
	var p = new Sprite(x, y, tileSize, tileSize, tileSheet, 1, indexX, indexY, true);
	p.pauseOverride = true;
	p.startIndexY = p.indexY;
	p.timer = 0;
	p.limit = 8;
	p.frames = frames;
	p.damage = 26;
	p.solid = false;
	p.rect = new Rectangle(p.x+4, p.y+4, p.x+12, p.y+12);
	p.update = function(){
		p.timer ++;
		if(p.timer >= p.limit){
			p.timer = 0;
			p.indexY ++;
			if(p.indexY >= p.startIndexY+frames)p.indexY = p.startIndexY;
		}
	}
	game.tiles.push(p);
}
function Waterfall(x, y, indexX, indexY, frames){
	var p = new Sprite(x, y, tileSize, tileSize, tileSheet, 1, indexX, indexY, true);
	p.pauseOverride = true;
	p.startIndexY = p.indexY;
	p.timer = 0;
	p.limit = 5;
	p.frames = frames;
	p.update = function(){
		p.timer ++;
		if(p.timer >= p.limit){
			p.timer = 0;
			p.indexY ++;
			if(p.indexY >= p.startIndexY+frames)p.indexY = p.startIndexY;
		}
	}
	game.tiles.push(p);
}
function Rectangle(x1, y1, x2, y2){
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	this.width = Math.abs(x2-x1);
	this.height = Math.abs(y2-y1);
	this.intersect = function(rect){
		return this.x1 < rect.x2 && this.x2 > rect.x1 && this.y1 < rect.y2 && this.y2 > rect.y1;
	}
}
function Player(x, y, direction, name, id, controls){
	var p = this.sprite = new Sprite(x, y, 48, 48, charSheet, 2, 0, 0, true);
	var n = p.name = name;
	var cp = charProperties[n];
	var initDirection = direction;
	var left = p.left = controls.left;
	var right = p.right = controls.right;
	var up = p.up = controls.up;
	var down = p.down = controls.down;
	var jump = p.jump = controls.a;
	var attack = p.attack = controls.b;
	var select = p.select = controls.select;
	var timers = [];
	var timersByNumbers = [];
	var direction = '';
	var lTimer = 0;
	var rTimer = 0;
	var jumpDown = true;
	var attackDown = true;
	p.lastRect = p.rect;
	p.lives = 3;
	if(id === 2){
		p.opponent = game.player1;
		game.player1.opponent = p;
	}
	p.healthBar = new Bar(24+(id-1)*16, 21, cp.index).sprite;
	if(id === 1)var x = 2;
	if(id === 2)var x = canvas.width-tileSize*2-2;
	p.lifeHead = new Life(x, 2, cp.index).sprite;
	if(id === 1)var x = tileSize+2;
	if(id === 2)var x = canvas.width-tileSize-2;
	p.lifeText = new Word(x, 10, 'x'+p.lives.toString(), true);
	p.lifeText.pausePhase(false);
	p.warpX = p.x;
	p.warpY = p.y;
	p.pauseVisible = false;
	p.pause = function(type){
		if(type === undefined)type = true;
		// for(var i = 0; i < p.lifeBalls.length; i ++){
		// 	p.lifeBalls[i].visible = !type;
		// }
		// p.healthBar.phase(!type);
		// p.visible = !type;
	}
	p.reset = function(){
		p.spinning = false;
		p.spinTimer = 0;
		p.spinLimit = 9;
		p.spinCharging = false;
		p.spinChargeTimer = 0;
		p.spinChargeLimit = 30;
		p.eTanks = 0;
		p.timeOverride = n === 'flash';
		p.rawIndexX = p.indexX;
		p.rawIndexY = p.indexY;
		p.health = 26;
		p.idleTimer = 0;
		p.idleOpenLimit = cp.idleOpenLimit;
		p.idleClosedLimit = cp.idleClosedLimit;
		p.idleLimit = p.idleOpenLimit;
		p.landing = false;
		p.landTimer = 0;
		p.landLimit = cp.landLimit;
		p.runTimer = 0;
		p.runLimit = cp.runLimit;
		p.runIndexes = cp.runIndexes;
		p.runStart = false;
		p.runStartTimer = 0;
		p.runStartLimit = 7;
		p.runStartSpeed = 0.125;
		p.runStop = false;
		p.runStopTimer = 0;
		p.runStopLimit = 8;
		p.runStopSpeed = 0.5;
		p.beatTimer = 0;
		p.beatLimit = 7;
		p.stopTicks = 0;
		p.stopTicksMax = 8;
		p.runIndex = 0;
		p.runIndexDirection = 1;
		p.velocityX = 0;
		p.velocityY = 0;
		p.moving = false;
		p.landing = false;
		p.warping = true;
		p.warpTimer = 0;
		p.warpLimit = 6;
		p.warpDirection = 1;
		p.warpSpeed = 24;
		p.x = p.warpX;
		p.y = -48;
		p.ice = false;
		p.iceTimer = 0;
		p.iceLimit = 90;
		p.iceSpeed = 0.6;
		p.defSpeed = cp.runSpeed;
		p.speed = p.defSpeed;
		p.submerged = false;
		p.gravityWaterFall = 0.1;
		p.gravityNormal = 0.225;
		p.gravityWater = p.gravityNormal/2;
		p.gravity = p.gravityNormal;
		p.jumping = false;
		p.jumpHeight = 4.87109375;
		p.jumpX = p.x;
		p.jumpY = p.y;
		p.hanging = false;
		p.doneClimbing = false;
		p.climbing = false;
		p.climbTimer = 0;
		p.climbLimit = 9;
		p.climbSpeed = 1.296875;
		p.climbIndex = 0;
		p.lastRung = false;
		p.rectX = 16;
		p.rectWidth = 16;
		p.rectY = 13;
		p.rectHeight = 29;
		p.rect = new Rectangle(p.x+p.rectX, p.y+p.rectY, p.x+p.rectX+p.rectWidth, p.y+p.rectY+p.rectHeight);
		p.fullRect = new Rectangle(p.x, p.y, p.x+48, p.y+48);
		p.tilesUnder = [];
		p.grounded = true;
		p.center = {};
		p.lastCenter = {};
		p.tile = {};
		p.direction = p.lastDirection = p.climbDirection = p.initClimbDirection = p.hurtDirection = initDirection;
		p.attacking = false;
		p.attackTimer = 0;
		p.attackLimit = cp.attackLimit;
		p.attackReady = true;
		p.attackReadyTimer = 0;
		p.attackReadyLimit = cp.attackDelay;
		p.stopFrame = cp.stopFrame;
		p.attackFrame = cp.attackFrame;
		p.airStopFrame = cp.airStopFrame;
		p.airAttackFrame = cp.airAttackFrame;
		p.stopping = false;
		p.stopTimer = 0;
		p.stopLimit = cp.stopLimit;
		p.shotArray = [];
		p.shots = 0;
		p.airShots = 0;
		p.piercing = cp.piercing;
		p.shotsMax = cp.shotsMax;
		p.airShotsMax = cp.airShotsMax;
		p.shotIndexX = 0;
		p.hurt = false;
		p.hurtTimer = 0;
		p.hurtLimit = 45;
		p.hurtSpeed = 0.5;
		p.hurtHeight = 2.2;
		p.sliding = false;
		p.slideTimer = 0;
		p.slideLimit = 20;
		p.slideSpeed = 2.5;
		p.slideCollision = false;
		p.slipping = false;
		p.slipTimer = 0;
		p.slipLimit = 60;
		p.slipSpeed = 1;
		p.collision = false;
		p.collisions = {'left':false, 'right':false, 'up':false, 'down':false};
		p.invincible = true;
		p.invincibleTimer = 0;
		p.shortInvincibleLimit = 25;
		p.longInvincibleLimit = 90;
		p.invincibleLimit = p.shortInvincibleLimit;
		p.damage = cp.damage;
		p.resetting = false;
		p.resetTimer = 0;
		p.resetLimit = 60;
		p.lives = 3;
		p.leaving = false;
		p.leaveTimer = 0;
		p.leaveLimit = cp.leaveLimit;
		p.leaveFrames = cp.leaveFrames;
		p.charging = false;
		p.chargeTimer = 0;
		p.chargeLimitDefault = 2;
		if(n === 'flash')p.chargeLimitDefault = 4;
		if(n === 'magnet')p.chargeLimitDefault = 2;
		if(n === 'air')p.chargeLimitDefault = p.leaveLimit;
		p.chargeLimit = p.chargeLimitDefault;
		p.chargeTicks = 0;
		p.clones = 0;
		p.clonesMax = 1;
		p.gimpSpeed = 1;
		p.gimpDirection = 0;
		p.flashStopped = false;
		p.stars = [];
		p.starsMax = 9;
		p.warpVelocity = 0;
		p.carrying = false;
		p.carryTimer = 0;
		p.carryLimit = 18;
		p.indexX = 0;
		p.indexY = 0;
		p.rawIndexX = 0;
		p.rawIndexY = 0;
		p.dead = false;
		p.landFrame = cp.landFrame;
		p.updateRect();
		p.updateLives();
		p.updateHealth();
		p.eTanksArray = [];
	}
	p.kill = function(explode, powerup){
		if(explode === undefined)explode = true;
		if(powerup === undefined)powerup = false;
		if(p.lives > 0 && !p.dead){
			if(n === 'guts' && p.shot !== undefined && !p.shot.throwing){
				p.shot.thrown = true;
				p.shot.carried = false;
				p.shot.speed = 0;
			}
			p.dead = true;
			game.deathPause = explode;
			p.powerup = powerup;
			p.healthBar.health = 0;
			p.lives --;
			p.resetting = true;
		}
	}
	p.updateLives = function(newLives){
		if(newLives !== undefined)p.lives = newLives;
		p.lifeText.replace('x'+p.lives.toString());
	}
	p.updateHealth = function(newHealth){
		if(newHealth !== undefined)p.health = newHealth;
		p.healthBar.health = p.health;
	}
	p.updateRect = function(){
		p.rect.x1 = p.x+p.rectX;
		p.rect.x2 = p.x+p.rectX+p.rectWidth;
		p.rect.y1 = p.y+p.rectY;
		p.rect.y2 = p.y+p.rectY+p.rectHeight;
		p.fullRect.x1 = p.x;
		p.fullRect.x2 = p.x+48;
		p.fullRect.y1 = p.y;
		p.fullRect.y2 = p.y+48;
		p.center.x = p.x+p.rectX+p.rectWidth/2;
		p.center.y = p.y+p.rectY+p.rectHeight/2;
		if(p.hanging)var direction = p.climbDirection;
		else var direction = p.direction;
		if(p.name === 'bomb' || p.name === 'flash')p.originX = p.x+9*direction;
		else if(p.name === 'elec')p.originX = p.x+direction;
		else p.originX = p.x+6*direction;
		if(p.name === 'elec' || p.name === 'flash')p.originY = p.y+4;
		else if(p.name === 'bomb')p.originY = p.y;
		else p.originY = p.y+6;
		p.tile.x = Math.floor((p.center.x+4)/tileSize);
		p.tile.y = Math.floor((p.center.y+8)/tileSize);
		if(p.tile.x < 0)p.tile.x = 0;
		if(p.tile.x > game.maps.width-1)p.tile.x = game.maps.width-1;
		if(p.tile.y < 0)p.tile.y = 0;
		if(p.tile.y > game.maps.height-1)p.tile.y = game.maps.height-1;
	}
	p.updateETanks = function(){
		if(p.eTanksArray.length !== p.eTanks){
			for(var i = 0; i < p.eTanksArray.length; i ++)p.eTanksArray[i].remove();
			p.eTanksArray = [];
			p.eTanks.length = 0;
			if(id === 1){
				for(var i = 0; i < p.eTanks; i ++){
					p.eTanksArray.push(new ETank(i*tileSize, 16).sprite);
				}
			}
			if(id === 2){
				for(var i = 0; i < p.eTanks; i ++){
					p.eTanksArray.push(new ETank(canvas.width-16-i*tileSize, 16).sprite);
				}
			}
		}
	}
	p.useETank = function(){
		if(p.eTanks > 0 && p.health < 26){
			p.eTanks --;
			p.hurt = false;
			game.healthPause = true;
			game.healthReceiver = p;
			game.healthGiving = 26;
			p.updateETanks();
		}
	}
	p.reset();
	p.hit = function(damage, direction){
		if(!p.dead){
			if(game.flashStopped)damage /= 2;
			if(!p.invincible && !p.warping && !p.leaving){
				p.updateHealth(p.health-damage);
				if(p.health > 0){
					p.healthBar.hurt();
					//if(damage > 2){
						p.moving=p.landing=p.runStart=p.runStop=p.jumping=p.attacking=p.climbing=p.hanging=p.charging=p.spinning=false;
						// if(p.carrying){
						// 	p.shot.thrown = true;
						// 	p.shot.carried = false;
						// 	p.shot.speed = 0;
						// 	p.carrying = false;
						// }
						p.chargeTimer = 0;
						p.chargeLimit = p.chargeLimitDefault;
						p.chargeTicks = 0;
						//p.velocityY = -p.hurtHeight;
						p.velocityY = 0;
						if(!(p.sliding && p.slideCollision)){
							p.hurt = true;
							p.hurtDirection = direction*1;
							p.direction = direction*-1;
						}
						p.hurtTimer = 0;
						p.invincible = true;
						p.invincibleTimer = 0;
						p.invincibleLimit = p.longInvincibleLimit;
					// } else {
					// 	p.invincible = true;
					// 	p.invincibleTimer = 0;
					// 	p.invincibleLimit = p.shortInvincibleLimit;
					// }
					if(game.flashStopped && n !== 'flash')p.invincible = false;
					else {
						new Smoke(10, 7, 'hurt', p);
						new Smoke(22, 3, 'hurt', p);
						new Smoke(34, 7, 'hurt', p);
					}
				} else {
					p.kill(true, true);
				}
			}
		}
	}
	p.update = function(){
		var o = p.opponent;
		if(n === 'gemini')console.log('I\'m alive, for now');
		p.updateLives(p.lives);
		if(p.shots < 0)p.shots = 0;
		if(!p.resetting)p.visible = true;
		if(p.doneClimbing)p.doneClimbing = false;
		timers = [];
		timers.length = 0;
		timersByNumbers = [];
		timersByNumbers.length = 0;
		direction = '';
		if(keyDown[left]){
			lTimer ++;
			timers.push(lTimer);
			timersByNumbers[lTimer] = -1;
		}else lTimer = 0;
		if(keyDown[right]){
			rTimer ++;
			timers.push(rTimer);
			timersByNumbers[rTimer] = 1;
		}else rTimer = 0;
		if(timers.length > 0){
			timers.sort(function(a, b){return a-b;});
			direction = timersByNumbers[timers[0]];
		}
		if(keyDown[left] && keyDown[right])direction = '';
		if((!game.flashStopped && p.flashStopped) || p.warping){
			for(var i = 0; i < p.stars.length; i ++){
				var s = p.stars[i];
				s.remove();
			}
			p.stars = [];
			p.stars.length = 0;
			p.flashStopped = false;
		}
		if(p.leaving){
			p.moving = false;
			p.runStart = false;
			p.runStop = false;
			if(p.warping)p.leaving = false;
			else {
				if(n !== 'cut' && n !== 'guts'){
					if(p.rawIndexX < 21){
						p.rawIndexX = 21;
						p.timer = 0;
						p.limit = cp.leaveLimit;
					}
					p.leaveTimer ++;
					if(p.leaveTimer >= p.leaveLimit){
						p.leaveTimer = 0;
						p.rawIndexX ++;
						if(p.rawIndexX === 20+cp.leaveFrames)p.leaveLimit = 25;
						if(p.rawIndexX > 20+cp.leaveFrames){
							p.rawIndexX = 3;
							p.leaving = false;
							p.warpVelocity = 0;
							p.landing = true;
							p.warping = true;
							p.warpDirection = -1;
						}
					}
				} else {
					if(n === 'guts' & p.shot !== undefined){
						p.shot.thrown = true;
						p.shot.carried = false;
						p.shot.speed = 0;
						p.carrying = false;
					}
					if(p.reps < 4){
						p.leaveTimer ++;
						if(p.leaveTimer >= p.leaveLimit){
							p.leaveTimer = 0;
							p.rawIndexX ++;
							if(p.rawIndexX > 4){
								p.rawIndexX = 3;
								p.reps ++;
							}
						}
					} else {
						p.rawIndexX = 3;
						p.leaving = false;
						p.warpVelocity = 0;
						p.landing = true;
						p.warping = true;
						p.warpDirection = -1;
					}
				}
			}
		}else
		if(p.warping){
			if(p.warpDirection === 1){
				if(p.landing){
					p.warpTimer ++;
					if(p.warpTimer >= p.warpLimit){
						p.rawIndexX ++;
						p.warpTimer = 0;
					}
					if(p.rawIndexX === 3){
						p.landing = false;
						p.warping = false;
						p.updateHealth(26);
						return;
					}
				} else {
					p.y += p.warpSpeed;
				}
				if(p.y >= p.warpY+6){
					p.y = p.warpY+6;
					p.landing = true;
				}
			}
			if(p.warpDirection === -1){
				if(p.landing){
					p.warpTimer ++;
					if(p.warpTimer >= p.warpLimit){
						p.rawIndexX --;
						p.warpTimer = 0;
						if(p.rawIndexX === 0){
							p.landing = false;
						}
					}
				} else {
					p.warpVelocity += 0.01;
					p.warpVelocity *= 1.15;
					p.y -= p.warpVelocity;
					p.updateRect();
				}
				if(!p.rect.intersect(display.rect)){
					game.select();
					game.menu.phase(true);
				}
			}
			p.updateRect();
		} else {
			if(p.resetting){
				if(p.resetTimer === 0){
					var x = p.center.x-8;
					var y = p.center.y-4;
					var type;
					for(var i = 0; i < 8; i ++){
						p.visible = false;
						var angle = 45*i*Math.PI/180;
						new Orb(x, y, angle, 1, cp.index);
						new Orb(x, y, angle, 2, cp.index);
					}
					if(p.powerup)game.dropPickup(p.center.x, p.center.y);
				}
				p.resetTimer ++;
				if(p.resetTimer >= p.resetLimit){
					if(p.lives > 0){
						p.carrying = false;
						if(p.shot !== undefined)p.shot.remove();
						p.shots = 0;
						p.shot = undefined;
						for(var i = 0; i < p.shotArray.length; i ++)p.shotArray[i].remove();
						p.shotArray = [];
						p.shotArray.length = 0;
						p.spinning = false;
						p.spinTimer = 0;
						p.spinCharging = false;
						p.spinChargeTimer = 0;
						p.sliding = false;
						p.slipping = false;
						p.slipTimer = 0;
						p.velocityX = 0;
						p.velocityY = 0;
						p.warpDirection = 1;
						p.warpVelocity = 0;
						p.beatTimer = 0;
						p.stopTimer = 0;
						p.stopping = false;
						p.attackTimer = 0;
						p.attacking = false;
						p.climbing = false;
						p.hanging = false;
						p.charging = false;
						p.stopping = false;
						p.resetTimer = 0;
						p.resetting = false;
						p.hurt = false;
						p.ice = false;
						p.charging = false;
						p.chargeTimer = 0;
						p.chargeTicks = 0;
						p.chargeLimit = p.chargeLimitDefault;
						p.invincible = true;
						p.invincibleTimer = 0;
						p.invincibleLimit = p.longInvincibleLimit;
						p.warping = true;
						p.warpTimer = 0;
						p.grounded = true;
						p.moving = false;
						p.runStart = false;
						p.runStop = false;
						p.dead = false;
						p.rawIndexX = 0;
						p.jumpX = p.center.x;
						p.jumpY = p.center.y;
						p.y = -48;
						var spawnIndex = random(game.spawns[game.mapName].length-1);
						p.x = game.spawns[game.mapName][spawnIndex].x;
						p.warpY = game.spawns[game.mapName][spawnIndex].y;
						p.direction = game.spawns[game.mapName][spawnIndex].direction;
						p.updateRect();
						p.eTanks = 0;
						p.updateETanks();
					}
				}
			} else {
				if(!p.moving && p.grounded && !p.landing && !p.runStart && !p.runStop && !p.climbing && !p.hanging && !p.charging && !p.stopping && !p.carrying && !p.spinning){
					p.idleTimer ++;
					if(p.name === 'cut' && p.shots === 1){if(p.rawIndexX >= 15)p.rawIndexX = 13;
					} else if(p.rawIndexX >= 5)p.rawIndexX = 3;
					if(p.idleTimer >= p.idleLimit){
						p.idleTimer = 0;
						if(p.name === 'cut' && p.shots === 1){
							if(p.rawIndexX === 13)p.idleLimit = p.idleClosedLimit;
							if(p.rawIndexX === 14)p.idleLimit = p.idleOpenLimit;
							p.rawIndexX ++;
							if(p.rawIndexX >= 15)p.rawIndexX = 13;
						} else {
							if(p.rawIndexX === 3)p.idleLimit = p.idleClosedLimit;
							if(p.rawIndexX === 4)p.idleLimit = p.idleOpenLimit;
							p.rawIndexX ++;
							if(p.rawIndexX >= 5)p.rawIndexX = 3;
						}
					}
				} else {
					p.idleTimer = 0;
				}
				p.climbing = false;
				p.lastRung = false;
				if(p.hanging)p.velocityY = 0;
				if(keyDown[select] && !heldDown[select]){
					p.useETank();
				}
				if(!p.carrying && !p.spinning && !(n === 'guts' && p.attacking)){
					if(keyDown[up]){
						if(p.hanging && !p.attacking && !p.hurt && !p.charging){
							p.velocityY = -p.climbSpeed;
							p.climbing = true;
							if(game.maps[game.mapName].fg[p.tile.y][p.tile.x] !== '|' && game.maps[game.mapName].fg[Math.floor((p.center.y+20)/tileSize)][p.tile.x] !== '|' && game.maps[game.mapName].fg[Math.floor((p.center.y+20)/tileSize)][p.tile.x] !== 'T'){
								p.doneClimbing = true;
								p.climbing = false;
								p.hanging = false;
								p.moving = false;
								p.runStart = false;
								p.velocityY = 0;
								p.climbIndex = 0;
								p.direction = p.initClimbDirection;
							}
						} else
						if(!p.warping && !p.dead && !p.hurt && game.maps[game.mapName].fg[p.tile.y][p.tile.x] === '|' || game.tilesByIds[p.tile.x+'_'+p.tile.y].ladder || game.maps[game.mapName].fg[p.tile.y][Math.floor((p.center.x-4)/tileSize)] === '|' || game.tilesByIds[p.tile.x+'_'+p.tile.y].ladder){
							if(game.maps[game.mapName].fg[p.tile.y][p.tile.x] === '|' || game.tilesByIds[p.tile.x+'_'+p.tile.y].ladder)p.x = (p.tile.x-1)*tileSize;
							else p.x = (Math.floor((p.center.x-4)/tileSize)-1)*tileSize;
							p.hanging = true;
							p.moving = false;
							p.runStart = false;
							p.runStop = false;
							p.sliding = false;
							p.jumping = false;
							p.rawIndexX = 10;
							p.initClimbDirection = -p.direction;
							p.climbDirection = -p.initClimbDirection;
						}
					}
					if(keyDown[down]){
						if(p.hanging && !p.attacking && !p.hurt && !p.charging){
							p.velocityY = p.climbSpeed;
							p.climbing = true;
							if(game.maps[game.mapName].fg[p.tile.y][p.tile.x] !== '|' && !game.tilesByIds[p.tile.x+'_'+p.tile.y].ladder && !game.tilesByIds[p.tile.x+'_'+(p.tile.y+1)].ladder){
								p.doneClimbing = true;
								p.climbing = false;
								p.hanging = false;
								p.velocityY = 0;
								p.moving = false;
								p.climbIndex = 0;
								p.direction = p.initClimbDirection;
							}
						} else
						if(!p.warping && !p.dead && !p.hurt && (!p.grounded && (game.maps[game.mapName].fg[p.tile.y][p.tile.x] === '|' || game.tilesByIds[p.tile.x+'_'+(p.tile.y+1)].ladder)) || game.tilesByIds[p.tile.x+'_'+(p.tile.y+1)].ladder){
							p.x = (p.tile.x-1)*tileSize;
							p.hanging = true;
							p.moving = false;
							p.sliding = false;
							p.runStart = false;
							p.runStop = false;
							p.jumping = false;
							p.rawIndexX = 10;
							p.initClimbDirection = -p.direction;
							p.climbDirection = -p.initClimbDirection;
						}
					}
					if(p.hanging && game.tilesByIds[p.tile.x+'_'+(Math.floor((p.center.y+32)/tileSize))].ladder)p.lastRung = true;
				}
				if(keyDown[jump]){
					if(!jumpDown){
						if(!keyDown[down] || (n !== 'mega' && n !== 'shadow')){
								if(p.hanging && !keyDown[up] && !keyDown[down]){
									p.hanging = false;
									p.climbing = false;
								}
								if(p.grounded && !p.hurt && !p.stopping && !p.charging){
									p.velocityY = -p.jumpHeight;
									p.jumping = true;
									p.jumpX = p.center.x;
									p.jumpY = p.center.y;
									p.sliding = false;
								}
						} else {
							if(!p.sliding && !p.attacking && !p.hanging && !p.climbing && p.grounded){
								var x = p.x+p.rectX;
								if(p.direction === -1)x = p.x+p.rectX+p.rectWidth-8;
								new Smoke(x, p.y+p.height-10, 'slide', p.direction);
								p.sliding = true;
								p.slideTimer = 0;
								p.moving = false;
								p.runStart = false;
								p.runStop = false;
							}
						}
					}
					jumpDown = true;
				} else {
					if(p.jumping){
						if(p.velocityY < 0.5)p.velocityY = 0.5;
					}
					jumpDown = false;
				}
				if(p.velocityY > 7)p.velocityY = 7;
				if(direction === -1 && (!p.attacking && !p.charging && !p.stopping || !p.grounded))p.direction = -1;
				if(direction === 1 && (!p.attacking && !p.charging && !p.stopping || !p.grounded))p.direction = 1;
				if(p.spinning){
					if(p.spinCharging){
						p.rawIndexX = 22;
						p.spinChargeTimer ++;
						if(p.spinChargeTimer >= p.spinChargeLimit){
							p.spinChargeTimer = 0;
							p.spinCharging = false;
							p.rawIndexX = 23;
						}
					} else {
						if(p.rawIndexX < 23)p.rawIndexX = 23;
						p.spinTimer ++;
						p.rawIndexX += Math.round(p.velocityX/6);
						p.velocityX += 0.1*p.direction;
						p.velocityX *= 0.975;
						if(p.spinTimer >= p.spinLimit){
							p.spinTimer = 0;
							p.rawIndexX ++;
						}
						if(p.rawIndexX < 23)p.rawIndexX = 28;
						if(p.rawIndexX > 28)p.rawIndexX = 23;
						if(!o.warping && !o.hanging && !o.hurt && !o.invincible){
							if(p.rect.intersect(new Rectangle(o.x+p.rectX, o.y+18, o.x+p.rectX+p.rectWidth, o.y+o.rectY+o.rectHeight))){
								o.hit(4, p.direction)
							}
						}
					}
				}
				if(keyDown[attack]){
					if(!attackDown || game.flashStopped){
						if(n === 'wood' && p.shots > 0 && !p.shotArray[0].firing){
							if(p.grounded){
								p.attacking = false;
								p.attackTimer = 0;
								p.moving = false;
								p.runStart = false;
								p.runStop = false;
								p.stopping = true;
								p.stopTimer = 0;
								p.rawIndexX = p.stopFrame;
							} else {
								p.attacking = false;
								p.attackTimer = 0;
								p.stopping = true;
								p.stopTimer = 0;
								p.rawIndexX = p.airStopFrame;
							}
						}
						if(n === 'shadow' && p.shotArray.length > 0){
							p.shotArray[0].throwing = true;
							p.shotArray[0].direction = p.direction;
							p.shotArray[0].speed = 4;
						} else if(n === 'gemini' && p.clones < p.clonesMax && !p.hurt && (keyDown[up] || keyDown[down])){
							var active = keyDown[up];
							if(active || keyDown[down]){
								new GeminiClone(p, active);
								p.clones ++;
							}
						} else
						if(p.shots < p.shotsMax && !p.spinning && (!(!p.grounded && p.airShots >= p.airShotsMax) || p.airShotsMax === 0 || p.hanging) && !p.hurt && !game.flashStopped || game.flashStopped && p.attackReady){
							p.updateRect();
							if(n !== 'guts'){
								if(p.stopLimit > 0){
									if(p.grounded){
										if(!p.stopping && !p.hanging && !(n === 'ice' && p.attacking && p.attackTimer < p.attackLimit-5)){
											p.attacking = false;
											p.attackTimer = 0;
											p.moving = false;
											p.runStart = false;
											p.runStop = false;
											p.stopping = true;
											p.stopTimer = 0;
											p.rawIndexX = p.stopFrame;
											p.sliding = false;
										}
									} else {
										if(p.airStopFrame === 0 || p.hanging){
											p.attacking = true;
											p.attackTimer = 0;
											if(p.hanging)new Shot(p, p.damage, p.climbDirection);
											else new Shot(p, p.damage);
										} else {
											if(!p.stopping && !(n === 'ice' && p.attacking && p.attackTimer < p.attackLimit-5)){
												if(n === 'magnet')p.moving = false;
												p.attacking = false;
												p.attackTimer = 0;
												p.stopping = true;
												p.stopTimer = 0;
												p.rawIndexX = p.airStopFrame;
											}
										}
									}
								} else {
									p.attacking = true;
									p.attackTimer = 0;
									if(p.grounded){
										p.rawIndexX = p.attackFrame;
										p.sliding = false;
									} else p.rawIndexX = p.airAttackFrame;
									if(p.hanging)new Shot(p, p.damage, p.climbDirection);
									else new Shot(p, p.damage);
								}
							} else {
								if(!p.carrying){
									if(!p.hanging && p.grounded){
										p.moving = false;
										p.runStop = false;
										p.runStart = false;
										p.shots ++;
										p.stopping = true;
									}
								}
							}
						} else {
							if(p.carrying && !p.stopping && n === 'guts'){
								if(p.grounded){
									p.attacking = false;
									p.attackTimer = 0;
									p.moving = false;
									p.runStart = false;
									p.runStop = false;
									p.stopping = true;
									p.stopTimer = 0;
									p.rawIndexX = p.stopFrame;
								} else {
									p.attacking = true;
									p.attackTimer = 0;
									p.shot.velocityY = -2.5;
									p.shot.directionX = p.direction;
									p.shot.carried = false;
									p.shot.thrown = true;
									p.carrying = false;
									p.rawIndexX = p.airAttackFrame;
								}
							}
						}
					} else {
						if(n === 'flash' && !game.flashStopped){
							if(!p.charging){
								if(!p.hanging && !p.climbing && !p.attacking && !p.hurt && !p.landing && p.grounded && keyTimer[attack] > 2){
									p.runStart = false;
									p.runStop = false;
									p.charging = true;
									p.chargeTimer = 0;
									p.chargeLimit = p.chargeLimitDefault;
									p.chargeTicks = 0;
									p.rawIndexX = 22;
								}
							} else {
								p.chargeTimer ++;
								if(p.chargeTimer >= p.chargeLimit){
									p.rawIndexX ++;
									if(p.rawIndexX > 26){
										p.chargeTicks ++;
										if(p.chargeTicks > 5){
											p.chargeLimit = 1;
											p.rawIndexX = 25;
										} else p.rawIndexX = 24;
									}
									p.chargeTimer = 0;
								}
							}
						}
						if(!p.grounded){
							if(p.charging){
								p.charging = false;
								p.chargeTimer = 0;
								p.chargeLimit = p.chargeLimitDefault;
								p.chargeTicks = 0;
							}
						}
						if(n === 'magnet'){
							if(!p.charging){
								if(!p.hanging && !p.climbing && !p.attacking && !p.hurt && !p.landing && p.grounded && keyTimer[attack] > 2){
									p.runStart = false;
									p.runStop = false;
									p.charging = true;
									p.chargeTimer = 0;
									p.rawIndexX = 23;
								}
							} else {
								if(p.rawIndexX >= 25){
									if(!o.warping && !o.hanging && !o.hurt && !o.invincible){
										p.gimpDirection = 0;
										var distX = o.center.x-p.center.x;
										var speed = 0;
										if(Math.abs(distX) >= p.gimpSpeed){
											if(distX < 0)p.gimpDirection = 1;
											if(distX > 0)p.gimpDirection = -1;
											speed = p.gimpSpeed;
										} else {
											speed = distX;
										}
										if(speed > 0)o.velocityX += speed*p.gimpDirection;
										if(p.rect.intersect(new Rectangle(o.x, o.y+18, o.x+48, o.y+o.rectY+o.rectHeight))){
											o.hit(4, -p.gimpDirection)
										}
									}
								}
								p.chargeTimer ++;
								if(p.chargeTimer >= p.chargeLimit){
									p.rawIndexX ++;
									if(p.rawIndexX > 26){
										p.rawIndexX = 25;
									}
									p.chargeTimer = 0;
								}
							}
						}
						if(n === 'air'){
							if(!p.charging){
								if(!p.hanging && !p.climbing && !p.attacking && !p.hurt && !p.landing && p.grounded && keyTimer[attack] > 2){
									p.runStart = false;
									p.runStop = false;
									p.charging = true;
									p.chargeTimer = 0;
									p.rawIndexX = 21;
								}
							} else {
								if(p.rawIndexX > 22){
									p.chargeLimit = 2;
									if(!o.warping && !o.hanging && !o.hurt && !o.invincible){
										p.gimpDirection = p.direction;
										var distX = o.center.x-p.center.x;
										var speed = p.gimpSpeed;
										o.velocityX += speed*p.gimpDirection;
										if(p.rect.intersect(o.rect)){
											o.hit(4, -p.gimpDirection)
										}
									}
								}
								p.chargeTimer ++;
								if(p.chargeTimer >= p.chargeLimit){
									p.rawIndexX ++;
									if(p.rawIndexX > 24){
										p.rawIndexX = 23;
									}
									p.chargeTimer = 0;
								}
							}
						}
						if(n === 'top'){
							if(!p.spinning){
								if(!p.hanging && !p.climbing && !p.attacking && !p.hurt && !p.landing && p.grounded && !p.stopping){
									p.runStart = false;
									p.runStop = false;
									p.spinTimer = 0;
									p.spinning = true;
									p.spinChargeTimer = 0;
									p.spinCharging = true;
									p.rawIndexX = 22;
								}
							}
						}
						if(!p.grounded){
							if(p.charging){
								p.charging = false;
								p.chargeTimer = 0;
							}
						}
					}
					attackDown = true;
				} else {
					if(p.charging){
						if(p.chargeTicks > 5){
							game.flashStopped = true;
							p.flashStopped = true;
							for(var i = 0; i < p.starsMax; i ++){
								p.stars.push(new FlashStar().sprite);
							}
						}
						p.charging = false;
						p.chargeTimer = 0;
						p.chargeLimit = p.chargeLimitDefault;
						p.chargeTicks = 0;
					}
					attackDown = false;
					if(p.spinning && !p.spinCharging && p.grounded){
						p.landing = true;
						p.slipTimer = 0;
						p.slipDirection = p.lastDirection;
						p.spinCharging = false;
						p.spinChargeTimer = 0;
						p.slipping = true;
						p.spinning = false;
					}
				}
				if(direction != ''){
					if((!p.moving || p.direction !== p.lastDirection) && !p.runStart && p.grounded && !p.spinCharging && !p.charging && !p.hanging && !p.climbing && !p.hurt && !p.stopping && (!p.attacking || p.stopLimit > 0) && !p.spinning){
						p.attacking = false;
						p.landing = false;
						if(p.name === 'cut' && p.shots === 1)p.rawIndexX = 15;
						else p.rawIndexX = 5;
						p.runIndex = 0;
						p.runTimer = 0;
						p.runStart = true;
						p.runStartTimer = 0;
						p.runStop = false;
						if(!p.slipping){
							if(p.ice)p.velocityX += 0.25*p.direction;
							else p.velocityX += p.direction;
						}
					}else
					if(!p.grounded && !p.charging && !p.moving && !p.climbing && !p.hanging && !p.hurt && !p.stopping && !p.spinning && !p.spinCharging){
						if((n === 'ice' || n === 'magnet') && !p.grounded && (p.attacking || p.stopping))p.moving = false;
						else p.moving = true;
					}else
					if(p.runStart && !p.spinning){
						p.velocityX += p.runStartSpeed*p.direction;
						p.runStartTimer ++;
						if(p.runStartTimer >= p.runStartLimit){
							p.runStart = false;
							p.moving = true;
							if(p.attacking)p.rawIndexX = p.attackFrame;
							else {
								if(p.name === 'cut' && p.shots === 1)p.rawIndexX = 15;
								else p.rawIndexX = 6;
							}
							p.runStartTimer = 0;
						}
					}else
					if(p.moving && !p.charging && !p.climbing && !p.hanging && !p.hurt && !(p.stopping && p.grounded) && !(n === 'ice' && p.attacking && !p.grounded) && !p.spinning && !p.spinCharging){
						if(!p.slipping){
							if(p.ice)p.velocityX += p.iceSpeed*p.direction;
							else p.velocityX += p.speed*p.direction;
							if(!p.grounded)p.velocityX -= 0.0625;
						}
						if(p.grounded){
							p.runTimer ++;
							if(p.runTimer >= p.runLimit){
								if(p.runIndex <= 0 && p.runIndexDirection ==-1)p.runIndexDirection = 1;
								if(p.runIndex >= p.runIndexes-1 && p.runIndexDirection == 1)p.runIndexDirection = -1;
								p.runIndex += p.runIndexDirection;
								p.runTimer = 0;
							}
						}
						if(p.attacking && !p.stopLimit > 0)p.rawIndexX = 14+p.runIndex;
						else if(p.name === 'cut'){
							if(p.shots === 0)p.rawIndexX = 6+p.runIndex;
							if(p.shots === 1)p.rawIndexX = 17+p.runIndex;
						} else p.rawIndexX = 6+p.runIndex;
						if(p.carrying)p.rawIndexX = 14+p.runIndex;
					} else if(p.spinning && !p.attacking){
						p.moving = true;
					}
				} else {
					if(p.moving && !p.charging && !p.stopping && !p.spinning && !p.spinCharging){
						p.rawIndexX = 5;
						p.runIndex = 0;
						p.runTimer = 0;
						p.runStop = true;
						if(game.mapName === 'flash' && n !== 'flash' || game.mapName === 'ice' && n !== 'ice'){
							p.slipTimer = 0;
							p.slipDirection = p.direction;
							p.slipping = true;
						}
						p.attacking = false;
					}
					if(p.runStart && !p.charging)p.rawIndexX = 3;
					p.runStart = false;
					p.moving = false;
				}
				if(p.lastVelocityX !== 0 && p.direction !== p.lastDirection){
					if(game.mapName === 'flash' && n !== 'flash' || game.mapName === 'ice' && n !== 'ice'){
						if(!p.slipping){
							p.slipTimer = 0;
							p.slipDirection = p.lastDirection;
							p.slipping = true;
						}
					}
				}
				if(p.sliding){
					if(n === 'shadow')p.rawIndexX = 25;
					if(n === 'mega')p.rawIndexX = 26;
					p.velocityX = p.slideSpeed * p.direction;
					p.slideTimer ++;
					if((p.slideTimer >= p.slideLimit || !p.grounded || p.direction !== p.lastDirection) && !p.slideCollision){
						p.slideTimer = 0;
						p.sliding = false;
						if(p.direction !== p.lastDirection){
							p.rawIndexX = 5;
							p.runIndex = 0;
							p.runTimer = 0;
							p.runStart = true;
							p.runStartTimer = 0;
							p.runStop = false;
						} else {
							p.rawIndexX = 5;
							if(direction === '' && p.grounded){
								p.runStop = true;
							}
						}
					}
				}
				if(p.conveyor !== undefined)p.velocityX += p.conveyor.speed;
				if(p.platform !== undefined)p.velocityX += p.platform.speed * p.platform.direction;
				if(!p.attackReady){
					p.attackReadyTimer ++;
					if(p.attackReadyTimer >= p.attackReadyLimit){
						p.attackReadyTimer = 0;
						p.attackReady = true;
					}
				}
				if(p.runStop){
					if(p.ice)p.velocityX += p.runStopSpeed/2*p.direction;
					else p.velocityX += p.runStopSpeed*p.direction;
					p.rawIndexX = 5;
					p.runStopTimer ++;
					if(p.runStopTimer >= p.runStopLimit){
						p.runStop = false;
						p.runStopTimer = 0;
						p.idleTimer = 0;
						p.rawIndexX = 3;
					}
				} else {
					p.runStopTimer = 0;
				}
				if(p.landing){
					if(p.charging)p.landing = false;
					else {
						p.rawIndexX = p.landFrame;
						if(p.carrying)p.rawIndexX = 16;
						p.landTimer ++;
						if(p.landTimer >= p.landLimit && !p.slipping){
							p.idleTimer = 0;
							p.landing = false;
							p.landTimer = 0;
							p.rawIndexX = 3;
						}
					}
				}
				if(p.slipping){
					var speed = p.slipSpeed-(p.slipTimer/100);
					if(p.ice)p.iceSpeed-(p.slipTimer/100);
					if(speed < 0)speed = 0;
					p.slipTimer ++;
					p.velocityX = speed*p.slipDirection;
					if(p.slipTimer >= p.slipLimit || !p.grounded){
						p.slipTimer = 0;
						p.slipping = false;
					}
				}
				if(p.ice){
					p.iceTimer ++;
					if(p.iceTimer >= p.iceLimit){
						p.iceTimer = 0;
						p.ice = false;
					}
				}
				if(p.attacking){
					if(!p.moving)p.rawIndexX = p.attackFrame;
					if(!p.grounded){
						if(p.name === 'ice'){
							if(p.velocityY < 0)p.velocityY = -.5;
							if(p.velocityY > 0)p.velocityY = .5;
						} else if(p.name === 'magnet'){
							p.velocityY = 0;
						}
					}
					p.attackTimer ++;
					if(p.attackTimer >= p.attackLimit){
						p.attacking = false;
						p.attackTimer = 0;
						if(!p.moving && !p.hanging){
							if(p.name === 'cut' && p.shots === 1)p.rawIndexX = 13;
							else p.rawIndexX = 3;
						} else if(p.hanging){
							if(p.name === 'cut' && p.shots === 1)p.rawIndexX = 21+p.climbIndex;
							else p.rawIndexX = 10+p.climbIndex;
						}
					}
				}
				if(p.stopping){
					if(p.grounded && p.moving){
						p.moving = false;
						p.runStart = false;
						p.runStop = false;
					}
					if(n === 'wood'){
						if(p.stopTicks > 0 || p.beatTimer > 0 || p.shots === 0){
							if(p.rawIndexX < 20 || p.stopTicks === 0 && p.beatTimer === 0){
								if(p.grounded)p.rawIndexX = 21;
								else p.rawIndexX = 23;
							}
							if(p.stopTicks === 0 && p.beatTimer === 0)new Shot(p, p.damage);
							p.beatTimer ++;
							if(p.beatTimer >= p.beatLimit){
								p.beatTimer = 0;
								p.stopTicks ++;
								p.rawIndexX ++;
								if(p.grounded){
									if(p.rawIndexX > 22)p.rawIndexX = 21;
								} else if(p.rawIndexX > 24)p.rawIndexX = 23;
								if(p.stopTicks >= p.stopTicksMax){
									p.stopTicks = 0;
									p.stopping = false;
								}
							}
						} else {
							if(p.grounded)p.rawIndexX = p.stopFrame;
							else p.rawIndexX = p.airStopFrame;
							p.stopTimer ++;
							if(p.stopTimer >= p.stopLimit){
								p.stopping = false;
								p.stopTimer = 0;
								p.attacking = true;
								p.attackTimer = 0;
								if(p.grounded)p.rawIndexX = p.attackFrame;
								else p.rawIndexX = p.airAttackFrame;
								if(n === 'wood' && p.shots > 0){
									for(var i = 0; i < p.shotArray.length; i ++){
										var t = p.shotArray[i];
										if(!t.firing && t.spinning){
											t.firing = true;
											if(keyDown[up] && keyDown[left]){
												t.directionX = -1;
												t.directionY = -1;
											} else if(keyDown[down] && keyDown[left]){
												t.directionX = -1;
												t.directionY = 1;
											} else if(keyDown[up] && keyDown[right]){
												t.directionX = 1;
												t.directionY = -1;
											} else if(keyDown[down] && keyDown[right]){
												t.directionX = 1;
												t.directionY = 1;
											} else if(keyDown[up]){
												t.directionX = 0;
												t.directionY = -1;
											} else if(keyDown[down]){
												t.directionX = 0;
												t.directionY = 1;
											} else {
												t.directionX = p.direction;
												t.directionY = 0;
											}
										}
									}
								}
							}
						}
					} else if(n === 'guts'){
						if(!p.carrying){
							if(p.rawIndexX < 21){
								p.rawIndexX = 21;
								p.stopTimer = 0;
							}
							p.stopTimer ++;
							if(p.stopTimer >= p.stopLimit){
								p.stopTimer = 0;
								p.rawIndexX ++;
								new Shot(p, 3, 0, 0)
								if(p.rawIndexX > 24){
									p.rawIndexX = 24;
									p.carrying = true;
									p.carryTimer = 0;
									p.stopping = false;
								}
							}
							if(p.rawIndexX == 23 && p.stopTimer === 0)p.shot = new Shot(p, p.damage).sprite;
						} else {
							if(p.shot.velocityY === 0){
								p.shot.velocityY = 0;
								p.shot.carried = false;
								p.shot.throwing = true;
							}
							p.stopTimer ++;
							if(p.stopTimer >= 20){
								p.stopping = false;
								p.stopTimer = 0;
								p.attacking = true;
								p.attackTimer = 0;
								if(p.grounded)p.rawIndexX = p.attackFrame;
								else p.rawIndexX = p.airAttackFrame;
								p.shot.velocityY = -1;
								p.shot.speed = 4;
								p.shot.directionX = p.direction;
								p.shot.thrown = true;
								p.carrying = false;
							}
						}
					} else {
						if(p.grounded)p.rawIndexX = p.stopFrame;
						else {
							p.rawIndexX = p.airStopFrame;
							if(p.name === 'ice'){
								if(p.velocityY < 0)p.velocityY = -.5;
								if(p.velocityY > 0)p.velocityY = .5;
							} else if(p.name === 'magnet'){
								p.velocityY = 0;
							}
						}
						p.stopTimer ++;
						if(p.stopTimer >= p.stopLimit){
							p.stopping = false;
							p.stopTimer = 0;
							p.attacking = true;
							p.attackTimer = 0;
							if(p.grounded)p.rawIndexX = p.attackFrame;
							else p.rawIndexX = p.airAttackFrame;
							new Shot(p, p.damage);
						}
					}
				}
				if(p.carrying){
					if(p.rawIndexX === 24){
						p.carryTimer ++;
						if(p.carryTimer >= p.carryLimit){
							p.carryTimer = 0;
							p.rawIndexX = 13;
						}
					} else {
						if(p.grounded && !p.moving && !p.stopping && !p.attacking)p.rawIndexX = 13;
					}
				}
				if(p.hurt){
					p.hanging = false;
					p.climbing = false;
					p.hurtTimer ++;
					p.visible = true;
					if(p.hurtTimer%3===0)p.visible = false;
					else if(p.hurtTimer%3===1){
						p.rawIndexX = 19;
						if(p.name === 'cut'){
							if(p.shots === 0)p.rawIndexX = 9;
							else p.rawIndexX = 16;
						}
					} else if(p.hurtTimer%3===2)p.rawIndexX = 20;
					p.velocityX = p.hurtSpeed*p.hurtDirection;
					if(p.hurtTimer >= p.hurtLimit){
						p.hurt = false;
						p.hurtTimer = 0;
						p.rawIndexX = 3;
						p.rawIndexY = 0;
					}
				}
				if(p.invincible){
					p.invincibleTimer ++;
					if(!p.hurt)p.visible = p.invincibleTimer % 2 === 0;
					if(p.invincibleTimer >= p.invincibleLimit){
						p.invincible = false;
						p.invincibleTimer = 0;
						p.visible = true;
					}
				}
				if(!p.grounded && !p.charging && !p.hanging && !p.climbing && !p.hurt && !p.stopping && !p.spinning){
					if(!p.jumping)p.jumpY = p.center.y;
					if(p.attacking)p.rawIndexX = p.airAttackFrame;
					else p.rawIndexX = 9;
					if(p.carrying)p.rawIndexX = 17;
					if(!p.grounded && !p.attacking && p.velocityY >= 0){
						if(n === 'snake')p.rawIndexX = 24;
						if(n === 'bubble')p.rawIndexX = 23;
						if(n === 'top')p.rawIndexX = 8;
						if(n === 'heat')p.rawIndexX = 15;
					}
				}
				if(p.hanging){
					if(!p.attacking){
						if(direction != '')p.climbDirection = direction;
						else p.climbDirection = p.initClimbDirection;
					}
					if(p.climbing){
						p.climbTimer ++;
						if(p.climbTimer >= p.climbLimit){
							p.climbTimer = 0;
							if(p.climbIndex == 0)p.climbIndex = 1;
							else if(p.climbIndex == 1)p.climbIndex = 0;
						}
					} else {
						p.velocityY = 0;
					}
					if(n === 'cut' && p.shots === 1)p.rawIndexX = 21+p.climbIndex;
					else p.rawIndexX = 10+p.climbIndex;
					if(p.lastRung){
						if(n === 'cut' && p.shots === 1)p.rawIndexX = 23;
						else p.rawIndexX = 12;
					}
					if(p.attacking){
						if(n === 'cut')p.rawIndexX = 26;
						else p.rawIndexX = 18;
					}
				} else if(!p.hanging && !((p.stopping || p.attacking) && !p.grounded && (n === 'ice' || n === 'magnet')))p.velocityY += p.gravity;
				if(p.hanging)p.velocityX = 0;
				p.move(p.velocityX, p.velocityY);
				if(p.conveyor !== undefined)p.velocityX -= p.conveyor.speed;
				if(p.platform !== undefined)p.velocityX -= p.platform.speed * p.platform.direction;
				if(o.charging && (o.name === 'magnet' || o.name === 'air'))p.velocityX -= o.gimpSpeed * o.gimpDirection;
				if(!(n === 'top' && p.spinning))p.velocityX = 0;
			}
		}
		direction = p.direction;
		p.lastDirection = p.direction;
		p.lastCenter.x = p.center.x;
		p.lastCenter.y = p.center.y;
		p.lastVelocityX = p.velocityX;
		p.lastRect = p.rect;
		if(p.hanging)direction = p.climbDirection;
		p.indexX = p.rawIndexX;
		p.indexY = p.rawIndexY;
		if(direction === -1)p.indexY = p.rawIndexY+1;
		if(direction === 1)p.indexY = p.rawIndexY;
		p.indexY += cp.index*2;
	}
	p.move = function(dx, dy){
		var lastSubmerged = p.submerged;
		p.submerged = false;
		p.conveyor = undefined;
		p.platform = undefined;
		p.tilesUnder = [];
		p.tilesUnder.length = 0;
		p.collision = false;
		p.slideCollision = false;
		p.bounced = false;
		for(var c in p.collisions){
			p.collisions[c] = false;
		}
		if(dx != 0)p.moveAxis(dx, 0);
		if(dy != 0)p.moveAxis(0, dy);
		if(p.x < -p.rectX)p.x = -p.rectX;
		if(p.x > (game.maps.width-1)*tileSize-p.rectX)p.x = (game.maps.width-1)*tileSize-p.rectX;
		if(dy != 0){
			if(p.tilesUnder.length > 0 && !p.grounded && !p.doneClimbing){
				if(!p.hurting){
					if(!p.moving && !p.stopping && !p.spinning)p.landing = true;
					if(p.stopping)p.moving = false;
					if(!p.stopLimit > 0){
						p.attacking = false;
						p.attackTimer = 0;
					}
				} else p.rawIndexX = 6;
				p.jumping = false;
				if(!p.submerged)p.gravity = p.gravityNormal;
				p.climbing = false;
				p.hanging = false;
				p.airShots = 0;
			} else if(p.doneClimbing){
				p.rawIndexX = 3;
				p.moving = false;
				p.jumping = false;
				p.grounded = true;
				if(!p.submerged)p.gravity = p.gravityNormal;
			}
			if(!p.doneClimbing)p.grounded = p.tilesUnder.length > 0;
			if(p.grounded)p.jumpX = p.x;
			if(p.y > canvas.height){
				if(p.leaving || p.warping){
					game.select();
					game.menu.phase();
				} else {
					p.kill(false, false);
				}
			}
		}
		// for(var i = 0; i < game.teleportPoints.length; i ++){
		// 	var t = game.teleportPoints[i];
		// 	if(p.center.x - dx < t.x && p.center.x > t.x || p.center.x - dx > t.x && p.center.x < t.x && p.rect.intersect(new Rectangle(t.x, t.y, t.x, t.y))){
		// 		j = i+1;
		// 		if(j > 1)j = 0;
		// 		p.x = game.teleportPoints[j].x-1-24;
		// 		p.y = game.teleportPoints[j].y-24;
		// 	}
		// }
		if(p.submerged){
			p.gravity = p.gravityWater;
			if(!lastSubmerged)p.velocityY = 0;
		} else if(p.gravity !== p.gravityFall)p.gravity = p.gravityNormal;
	}
	p.moveAxis = function(dx, dy){
		p.x += dx;
		p.y += dy;
		p.updateRect();
		var rect = new Rectangle(p.x+p.rectX, p.y+18, p.x+p.rectX+p.rectWidth, p.y+p.rectY+p.rectHeight);
		if(p.sliding)rect = new Rectangle(p.x+p.rectX, p.y+27, p.x+p.rectX+p.rectWidth, p.y+p.rectY+p.rectHeight);
		// if(p.opponent.name === 'guts' && p.opponent.shot !== undefined){
		// 	var t = p.opponent.shot;
		// 	if(t.shotType === 'block' && t.carried && !t.thrown && !t.throwing && rect.intersect(new Rectangle(t.x, t.y, t.x+t.width, t.y+t.height))){
		// 		if(dx < 0)p.x = t.x+t.width-p.rectX;
		// 		if(dx > 0)p.x = t.x-p.width+p.rectX;
		// 		if(dy < 0){
		// 			p.y = t.y+t.height-18;
		// 			p.velocityY = 0;
		// 		}
		// 		if(dy > 0){
		// 			p.y = t.y-p.rectY-p.rectHeight;
		// 			p.velocityY = 0;
		// 			p.tilesUnder.push(t);
		// 		}
		// 		p.updateRect();
		// 	}
		// }
		for(var i = 0; i < game.tiles.length; i ++){
			var t = game.tiles[i];
			if(p.sliding && (t.solid || t.damage > 0)){
				if(new Rectangle(p.x+p.rectX, p.y+18, p.x+p.rectX+p.rectWidth, p.y+p.rectY+p.rectHeight-2).intersect(t.rect) && !new Rectangle(p.x+p.rectX+8, p.y+27, p.x+p.rectX+p.rectWidth-8, p.y+p.rectY+p.rectHeight-2).intersect(t.rect))p.slideCollision = true;
			}
			if(rect.intersect(t.rect)){
				if(t.damage > 0 && p.health >= 0 && !p.invincible && !p.resetting && !game.over)p.hit(t.damage, -p.direction);
				if(t.water){
					p.submerged = true;
					p.gravity = p.gravityWater;
				}
				if(t.solid){
					if(dx < 0){
						p.x = t.x+tileSize-p.rectX;
						if(p.sliding && !new Rectangle(p.x+p.rectX, p.y+18, p.x+p.rectX+p.rectWidth, p.y+p.rectY+p.rectHeight-2).intersect(t.rect)){
							p.sliding = false;
							p.slideTimer = 0;
							p.velocityX = 0;
							p.rawIndexX = 3;
						}
						if(p.spinning && !p.bounced){
							p.velocityX *= -1;
							p.bounced = true;
						}
					}
					if(dx > 0){
						p.x = t.x-p.width+p.rectX;
						if(p.sliding && !new Rectangle(p.x+p.rectX, p.y+18, p.x+p.rectX+p.rectWidth, p.y+p.rectY+p.rectHeight-2).intersect(t.rect)){
							p.sliding = false;
							p.slideTimer = 0;
							p.velocityX = 0;
							p.rawIndexX = 3;
						}
						if(p.spinning && !p.bounced){
							p.velocityX *= -1;
							p.bounced = true;
						}
					}
					if(dy < 0){
						p.y = t.y+tileSize-18;
						p.velocityY = 0;
					}
					if(dy > 0){
						if(t.speed !== 0)p.conveyor = t;
						p.y = t.y-p.rectY-p.rectHeight;
						p.velocityY = 0;
						p.tilesUnder.push(t);
					}
					p.updateRect();
				}
			}
			if(t.through && !p.hanging){
				if(dy > 0 && p.rect.y2 >= t.y && p.lastRect.y2 <= t.y+8 && p.rect.x2 > t.x && p.rect.x1 < t.x+tileSize){
					p.y = t.y-p.rectY-p.rectHeight;
					p.velocityY = 0;
					p.tilesUnder.push(t);
				}
			}
		}
		for(var i = 0; i < game.lasers.length; i ++){
			var t = game.lasers[i];
			if(new Rectangle(p.x+p.rectX, p.y+18, p.x+p.rectX+p.rectWidth, p.y+p.rectY+p.rectHeight).intersect(t.rect) && !p.dead){
				p.health = 0;
				p.kill();
			}
		}
		for(var i = 0; i < game.pickups.length; i ++){
			var t = game.pickups[i];
			if(new Rectangle(p.x+p.rectX, p.y+18, p.x+p.rectX+p.rectWidth, p.y+p.rectY+p.rectHeight).intersect(t.rect) && !p.dead){
				if(t.type === 'eTank'){
					p.eTanks ++;
					p.updateETanks();
				}
				if(t.type === 'healthBig'){
					game.healthPause = true;
					game.healthReceiver = p;
					game.healthGiving = 10;
				}
				if(t.type === 'healthSmall'){
					game.healthPause = true;
					game.healthReceiver = p;
					game.healthGiving = 2;
				}
				if(t.type === 'life'){
					p.lives ++;
					p.updateLives();
				}
				game.pickups[i].remove();
			}
		}
		for(var i = 0; i < game.elecBlocks.length; i ++){
			var t = game.elecBlocks[i];
			if(p.rect.intersect(t.rect) && !t.idle){
				p.hit(4, t.direction);
			}
		}
		for(var i = 0; i < game.enemies.length; i ++){
			var t = game.enemies[i];
			if(p.rect.intersect(t.rect)){
				p.hit(t.damage, t.direction);
			}
		}
		for(var i = 0; i < game.yellowParts.length; i ++){
			var t = game.yellowParts[i];
			if(p.rect.intersect(t.rect)){
				if(t.falling)t.destroy();
				else p.hit(4, -t.direction);
			}
		}
		var rect = new Rectangle(p.x+p.rectX, p.y+18, p.x+p.rectX+p.rectWidth, p.y+p.rectY+p.rectHeight);
		for(var i = 0; i < game.platforms.length; i ++){
			var t = game.platforms[i];
			if(rect.intersect(t.rect)){
				if(!t.dropping){
					if(dy > 0 && p.rect.y2 >= t.y && p.lastRect.y2 <= t.y+8 && p.rect.x2 > t.rect.x1 && p.rect.x1 < t.rect.x2){
						p.y = t.y-p.rectY-p.rectHeight;
						p.velocityY = 0;
						p.tilesUnder.push(t);
						p.platform = t;
					}
					p.updateRect();
				}
			}
		}
	}
}

var speedTurbo = 240;
var speedNormal = 60;
var speedSlow = 30;
var frameRate = speedNormal;
var fps = 1000/frameRate;
var select = new Select();
var display = {};
display.rect = new Rectangle(0, 0, canvas.width, canvas.height);
display.timeOverride = true;
display.pauseOverride = true;
display.update = function(){
	ctx.fillStyle = 'black';
	ctx.fill();
	if(mode === 'game' && game.player1 !== undefined && game.player2 !== undefined){
		if(game.paused){
			// game.player1.visible = false;
			// game.player2.visible = false;
		} else {
			if(game.player1.fullRect.intersect(game.player2.fullRect)){
				if(running%2===0){
					game.player1.depth = 3;
					game.player2.depth = 2;
				} else {
					game.player1.depth = 2;
					game.player2.depth = 3;
				}
			}
		}
	}
	var spritesByDepths = [];
	for(var i = 0; i < sprites.length; i ++){
		var s = sprites[i];
		var d = s.depth;
		if(d >= spritesByDepths.length)for(var j = spritesByDepths.length; j <= d; j ++)spritesByDepths.push([]);
		spritesByDepths[d].push(s);
	}
	sprites = [];
	sprites.length = 0;
	for(var i = 0; i < spritesByDepths.length; i ++){
		for(var j = 0; j < spritesByDepths[i].length; j ++){
			sprites.push(spritesByDepths[i][j]);
		}
	}
	for(var i = 0; i < sprites.length; i ++){
		var s = sprites[i];
		if(s.visible && !(mode === 'game' && game.paused && !s.pauseVisible))ctx.drawImage(s.sheet, s.indexX*s.width, s.indexY*s.height, s.width, s.height, ~~(s.x+0.5), ~~(s.y+0.5), s.width, s.height);
	}
}
display.update();
dynamics.push(display);

var keyDown = {};
var keyTimer = {};
var heldDown = {};
keyDown.keys = {'tab':9,'enter':13,'shift':16,'escape':27, 'space':32, 'left':37,'right':39,'up':38,'down':40,'a':65,'b':66,'c':67,'d':68,'e':69,'f':70,'g':71,'h':72,'i':73,'j':74,'k':75,'l':76,'m':77,'n':78,'o':79,'p':80,'q':81,'r':82,'s':83,'t':84,'u':85,'v':86,'w':87,'x':88,'y':89,'z':90, ';':186, '\\':220, '\'':222};
for(key in keyDown.keys){
	keyDown[key] = false;
	keyTimer[key] = 0;
	heldDown[key] = false;
}
function keydown(e){
	for(key in keyDown.keys){
		if(e.keyCode === keyDown.keys[key]){
			keyDown[key] = true;
			if(keyDown[key]){
				keyTimer[key] ++;
			}
		}
	}
}
function keyup(e){
	for(key in keyDown.keys){
		if(e.keyCode === keyDown.keys[key]){
			keyDown[key] = false;
			keyTimer[key] = 0;
		}
	}
}
document.onkeydown = keydown;
document.onkeyup = keyup;

function Audio(src){
	this.playing = false;
	this.a = document.createElement('audio');
	this.a.src = 'snd/00.wav';
	this.b = document.createElement('audio');
	this.b.src = 'snd/00.wav';
	this.update = function(){
		if(this.a.readyState === 4){
			if(!this.playing){
				this.playing = true;
				this.a.play();
			}
			if(this.a.currentTime >= 4.175){
				this.b.play();
				if(this.a.currentTime === 4.44){
					this.a.currentTime = 0;
				}
			}
			if(this.b.currentTime >= 4.175){
				this.a.play();
				if(this.b.currentTime === 4.44){
					this.b.currentTime = 0;
				}
			}
		}
	}
	dynamics.push(this);
}
//new Audio('snd/00.wav');

var upPressed = false;
var downPressed = false;
var playing = false;
function onEnterFrame(e){
	running ++;
	if(mode === 'game'){
		if(game === undefined)game = new Game();
		game.update();
	}
	if(mode === 'select'){
		if(select === undefined)select = new Select();
		select.update();
	}
	for(key in keyDown.keys){
		if(keyDown[key]){
			heldDown[key] = true;
		} else {
			heldDown[key] = false;
		}
	}
}
enterFrame = setInterval(onEnterFrame, fps);

function setSpeed(newFrameRate){
	frameRate = newFrameRate;
	fps = 1000/frameRate;
	clearInterval(enterFrame);
	enterFrame = setInterval(onEnterFrame, fps);
}
