// 1 - wall, 0 - space, 3 - exit (4 player spawn, 5 - frog)
			//   N   / _ W _
			// W-+-E / A S D
			//   S   / _ * _
			// X = SPACE|PLAYER|FROG; P - player
			// stop  / fwd   / right / left  / WALL  / free  / fwdrt / fwdlt / ltrt  / EXIT
			// _ 1 _ / _ 0 _ / _ 1 _ / _ 1 _ / _ _ _ / _ 0 _ / _ 0 _ / _ 0 _ / _ 1 _ / _ _ _
			// 1 X 1 / 1 X 1 / 1 X 0 / 0 X 1 / _ 1 _ / 0 X 0 / 1 X 0 / 0 X 1 / 0 X 0 / _ 3 _
			// _ P _ / _ P _ / _ P _ / _ P _ / _ P _ / _ P _ / _ P _ / _ P _ / _ P _ / _ P _
			
/* ------------------------------- params -------------------------------------- */
var HASKEY = false;		
			
			var motions = [];

			var frogonmap = 0;
			var allfrogsonmap = 0;
			var deadfrogs = 0;
			
			var frogs = [
				{
					sssclass : "frog1",
					width : 216,
					height : 384,
					ani : {
						dead : {
							start : 5,
							stop : 9
						},
						spawn : {
							start : 0,
							stop : 4
						},
						hide : {
							start : 4,
							stop : 0
						}
					}
				},
				{
					sssclass : "frog2",
					width : 216,
					height : 384,
					ani : {
						dead : {
							start : 4,
							stop : 9
						},
						spawn : {
							start : 0,
							stop : 3
						},
						hide : {
							start : 3,
							stop : 0
						}
					}
				},
				{
					sssclass : "frog3",
					width : 216,
					height : 384,
					ani : {
						dead : {
							start : 4,
							stop : 8
						},
						spawn : {
							start : 0,
							stop : 3
						},
						hide : {
							start : 3,
							stop : 0
						}
					}
				},
				{
					sssclass : "frog4",
					width : 216,
					height : 384,
					ani : {
						dead : {
							start : 5,
							stop : 9
						},
						spawn : {
							start : 0,
							stop : 4
						},
						hide : {
							start : 4,
							stop : 0
						}
					}
				},
				{
					sssclass : "frog5",
					width : 216,
					height : 384,
					ani : {
						dead : {
							start : 5,
							stop : 9
						},
						spawn : {
							start : 0,
							stop : 4
						},
						hide : {
							start : 4,
							stop : 0
						}
					}
				}
			];
			//576x420(2940/7) /2 = 263x210 413
			var gun = {
				width : 288,
				height : 210,
				steps : 7,
				motion : false
			}
			
			var SPACE    = 0;
			var WALL     = 1;
			var EXIT     = 3;
			var PLAYER   = 4;
			var FROG = 5;
			
			var NORTH = 1;
			var EAST  = 2;
			var SOUTH = 3;
			var WEST  = 4;
			var direction = 0;
			
			var level = 0;
			var map = [];
			var HEIGHT = 0;
			var WIDTH = 0;
			var c = {x:null, y:null};// coordinates
			
			var W, A, S, D;
			
			var lastbg = "";
			
			var timer, timer2;
			//var rotate = false;
			
/* --------------------------------------------------------------------------------------------------------- */

			function isWall(a) {return (a === WALL)};
			//function isFrog(a) {};
			function Draw() {
				//rotate = true;
				var bg;
				
				//stop animation
				//$('#frog').css("-webkit-animation", "none");
				//$('#frog').css("-moz-animation", "none");
				//$('#frog').css("-ms-animation", "none");
				//$('#frog').css("animation", "none");
				//$('#frog').addClass("paused");
				
				clearTimeout(timer);
				clearTimeout(timer2);
	
				//$('#frog').hide().removeClass('frogin').removeClass('frogout');
				//$('#frog').hide().removeClass('frogin').removeClass('frogout');
				if(S === FROG) {
					//$('#frog').addClass('frogin').show();
					//var frognum = ((Math.random() * frogs.length)|0);
					//var frogonmap = ((Math.random() * frogs.length)|0);
					frogonmap = (frogonmap >= frogs.length - 1)?0:(frogonmap + 1);
					console.log('frogonmap=' + (frogonmap + 1));
					for(i in frogs){
						$('#frog').removeClass('frog' + (parseInt(i) + 1));
					}
					$('#frog').addClass('frog' + (frogonmap + 1)).show();
					console.log('added class frog' + (frogonmap));
					// TODO animation
					
					//scriptanimation('#FROG', frog[frogonmap].height, 0, 0, 7, 1000, "vertically", false);//this = frog
					scriptanimation(
						'#frog', 
						"frogspawn", 
						frogs[frogonmap].height, 
						frogs[frogonmap].ani.spawn.start,
						frogs[frogonmap].ani.spawn.start,
						frogs[frogonmap].ani.spawn.stop, 
						300, 
						"vertically",
						false
					);
					setTimeout(function(){
						scriptanimation(
							'#frog', 
							"froghide", 
							frogs[frogonmap].height, 
							frogs[frogonmap].ani.hide.start,
							frogs[frogonmap].ani.hide.start,
							frogs[frogonmap].ani.hide.stop, 
							300, 
							"vertically",
							true
						);
					}, 2000);
					
					//timer = setTimeout(function() {
					//	$('#frog').addClass('frogout').removeClass('frogin');
					//}, 2000);
					//timer2 = setTimeout(function() {
					//	$('#frog').hide();
					//}, 3000);
				} else {$('#frog').hide();}
				$('#but').removeClass('hiddenButton');
				$('#key').hide();
				$('#splash').hide();
				if(S === 7) {
					if(HASKEY == false) {
						$('#key').show();
						HASKEY = true;
					}
				}
				if(S === EXIT){
					bg = "exit";
					if(HASKEY) {
						HASKEY = false;
						if(levels.length > level + 1) {
							level++;
							setTimeout(function() {run();}, 1000);
						} else {
							$('#splash').html(lang.gameover).show();
						}
					} else {
						$('#splash').html(lang.findkey).show();
					}
					//$('#screen').addClass(bg).removeClass(lastbg);
					
				} else if(isWall(S)) {
					bg = "wall";
					$('#but').addClass('hiddenButton');
				} else {
					var bgnumber = isWall(W)*100 + isWall(A) * 10 + isWall(D);
					console.log('wasd=' + W + ' ' + A + ' ' + S + ' ' + D);
					console.log(bgnumber);
					switch(bgnumber) {
						case 111 : bg = "stop";break;
						case 110 : bg = "right";break;
						case 101 : bg = "left";break;
						case 0   : bg = "free";break;
						case 10  : bg = "rightforward";break;
						case 1   : bg = "leftforward";break;
						case 11  : bg = "forward";break;
						case 100 : bg = "leftright";break;
					}
				}
				//if(map[c.y][c.x] === FROG) {
				if(bg != lastbg) {
					// если делать плавный переход нежду фонами, то здесь; желательно знать направление движения.
					$('#screen').addClass(bg).removeClass(lastbg);
				}
				lastbg = bg;
				console.log(bg);
			}
			function moveControl(){
				c.x = parseInt(c.x);
				c.y = parseInt(c.y);
				switch(direction) {
					case NORTH:
						W = (c.y < 2)?WALL                              : map[c.y - 2][c.x];    // если по периметру нет стенок то... здесь всё равно стенки
						A = (c.x == 0 || c.y == 0)?WALL                 : map[c.y - 1][c.x - 1];// иначе это может плохо кончиться
						S = (c.y == 0)?WALL                             : map[c.y - 1][c.x];    // да и за края массива за одно не зайдём
						D = (c.x == WIDTH - 1 || c.y == 0)?WALL             : map[c.y - 1][c.x + 1];
						break;
					case EAST:
						W = (c.x > WIDTH - 3)?WALL                      : map[c.y][c.x + 2];
						A = (c.y === 0 || c.x === WIDTH - 1)?WALL          : map[c.y - 1][c.x + 1];
						S = (c.x === WIDTH - 1)?WALL                      : map[c.y][c.x + 1];
						D = (c.y === HEIGHT - 1 || c.x === WIDTH - 1)?WALL : map[c.y + 1][c.x + 1];
						break;
					case SOUTH:
						W = (c.y > HEIGHT - 3)?WALL                     : map[c.y + 2][c.x];	
						A = (c.x === WIDTH - 1 || c.y === HEIGHT - 1)?WALL  : map[c.y + 1][c.x + 1];
						S = (c.y === HEIGHT - 1)?WALL                     : map[c.y + 1][c.x];
						D = (c.x === 0 || c.y === HEIGHT - 1)?WALL         : map[c.y + 1][c.x - 1];
						break;
					case WEST:
						W = (c.x < 2)?WALL                              : map[c.y][c.x - 2];
						A = (c.y == HEIGHT - 1 || c.x == 0)?WALL        : map[c.y + 1][c.x - 1];
						S = (c.x == 0)?WALL                             : map[c.y][c.x - 1];
						D = (c.y == 0 || c.x == 0)?WALL                 : map[c.y - 1][c.x - 1];
						break;
				}
				
				if(isWall(S)) {$('#bforward').hide()} else { $('#bforward').show() }
				Draw();
			}
			function forward() {
				if(isWall(S)) {
					console.log('move break');
					//return;
				} else {
					switch(direction) {
						case NORTH:
							c.y--;break;
						case EAST:
							c.x++;break;
						case SOUTH:
							c.y++;break;
						case WEST:
							c.x--;break;
					}
				}
				//direction
				moveControl();
			}
			function left() {
				direction = (direction === NORTH)?WEST:--direction;
				moveControl();
			}
			function right() {
				direction = (direction === WEST)?NORTH:++direction;
				moveControl();
			}
			function run() {
				$('#splash').html('Level ' + (level + 1) + '.').show();
				$('#levelnum').html(level + 1);
				setTimeout("$('#splash').fadeOut()", 2000);
				try{
					var variant = (Math.random() * levels[level].variants.length)|0;
					map = levels[level].variants[variant].matrix;//map array
					direction = (typeof(levels[level].variants[variant].direction) === 'undefined')?NORTH:levels[level].variants[variant].direction;
				} catch(e) {
					map = levels[level].matrix;
					direction = (typeof(levels[level].direction) === 'undefined')?NORTH:levels[level].direction;
				}
				
				HEIGHT = map.length;
				WIDTH = map[0].length;
				for(mstring in map){for(mcolumn in map[mstring]){if(map[mstring][mcolumn] === PLAYER){
					c.x = mcolumn; c.y = mstring;
				}}}
				//координаты игрока на карте
				moveControl();
				
			}
			function shotsound() {
			
				jBeep('echo1.wav');
				// <audio>, тёплый ламповый <bgsound>, Flash Lite.
			
			}
			function scriptanimation(object, aniname, size, step, start, stop, time, direction, hide) {
				//if(params.motion && step === start) {return} else {params.motion = true}
				
				//if(typeof(motions[aniname]) === 'undefined') {motions[aniname] = true} else {
				//	if(motions[aniname] === true && step === start) {return;} else {motions[aniname] = true}
				//}
				console.log('start animation');
				var bposition = "";
				switch(direction) {
					case "vertically" : bposition = "0px -" + step * size + "px";break;
					case "horisontally" : bposition = "-" + step * size + "px 0px";break;
				}
				
				
				
				$(object).css('background-position', bposition);
				if(stop > start) {step++;} else {step--}
				
				//if (step > 30 || step < -30) {return;}
				
				if (step === stop + ((stop > start)?1:-1)) {
					motions[aniname] = false;
					if(hide) {
						$(object).hide();
					}
				} else {
					var st = stop - start;
					st = (stop > start)?st:-st;
					setTimeout(function(){
						scriptanimation(object, aniname, size, step, start, stop, time, direction, hide);
					}, time / st);
				}
				
				console.log('bposition=' + bposition + ' step=' + step + ' time=' + time + ' start=' + start + ' stop=' + stop + ' (s-s)=' + (stop - start) + ' st=' + st);
			}

/* --------------------------------------------------------------------------------------------------------- */
			
			//$(function(){
			function hidebutton(i) {
				$('#buttons>img:eq(' + i + ')').css('opacity', '0.3');
			}
			$(document).ready(function(){
				$.preloadImages(
					"./img/stop.png",
					"./img/right.png",
					"./img/left.png",
					"./img/free.png",
					"./img/rightforward.png",
					"./img/leftforward.png",
					"./img/forward.png",
					"./img/leftright.png",
					"./img/wall.png",
					"./img/exit.png",
					"./img/key.png"
				);
				$('body').click(function() {
					$('#startscreen').remove();
					$('body').unbind('click');
				});
				$('.clbut').click(function(){
					$(this).css('opacity', '1');
					var i = $(this).index();
					console.log('index=' + i);
					var a = this;
					setTimeout(function(){hidebutton(i)}, 300);
				});
				run();
				$('#frog').click(function(){// так так лягушка на матрице одна, не запариваемся и показываем/скрываем одну и ту же
					//map[c.y][c.x] = (map[c.y][c.x] === FROG)?SPACE:map[c.y][c.x];
					// remove frog from map
					
					// _ F _
					// _ P _
					if(S === FROG) {
						switch(direction) {
							case NORTH:
								map[c.y - 1][c.x] = SPACE;break;
							case EAST:
								map[c.y][c.x + 1] = SPACE;break;
							case SOUTH:
								map[c.y + 1][c.x] = SPACE;break;
							case WEST:
								map[c.y][c.x - 1] = SPACE;break;
						}
					}
					// валим жабу
					
					//$('#shotgun').addClass('fire'); //gun animation css
					//$(this).addClass('frogdead'); // dead frog animation
					
					deadfrogs++;
					$('#score').html(deadfrogs);
					//$('#deadfrogs').html(deadfrogs);
					scriptanimation(
						this, 
						"frogdead",
						frogs[frogonmap].height, 
						frogs[frogonmap].ani.dead.start, 
						frogs[frogonmap].ani.dead.start,
						frogs[frogonmap].ani.dead.stop, 
						1000, 
						"vertically",
						true
					);//this = frog
					
					scriptanimation('#shotgun', "shotgun", gun.height, 0, 0, gun.steps, 1000, "vertically", false);//this = frog
					
					shotsound();
					//setTimeout(function(){
					//	$('#shotgun').removeClass('fire');
					//	$('#frog').hide().removeClass('frogdead');
					//},1000);// 1000 = 1s, желательно указать такое же как в самой анимации (main.css frog-animation)
				});
			});	