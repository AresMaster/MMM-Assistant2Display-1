var A2D_=Function.prototype.bind.call(console.log,console,"[A2D]"),A2D=function(){};Module.register("MMM-Assistant2Display",{defaults:{debug:!1,youtube:{useYoutube:!1,useVLC:!1,minVolume:70,maxVolume:200},links:{useLinks:!1,displayDelay:6e4,scrollActivate:!1,scrollStep:25,scrollInterval:1e3,scrollStart:5e3},photos:{usePhotos:!1,displayDelay:1e4},volume:{useVolume:!1,volumePreset:"ALSA",myScript:null},briefToday:{useBriefToday:!1,welcome:"brief Today"},screen:{useScreen:!1,delay:3e5,turnOffDisplay:!0,mode:1,ecoMode:!0,delayed:0,displayCounter:!0,text:"Auto Turn Off Screen:",displayBar:!0,displayStyle:"Text",detectorSleeping:!1,governorSleeping:!1,displayLastPresence:!0,LastPresenceText:"Last Presence:"},touch:{useTouch:!0,mode:2},pir:{usePir:!1,gpio:21,reverseValue:!1},governor:{useGovernor:!1,sleeping:"powersave",working:"ondemand"},internet:{useInternet:!1,displayPing:!1,delay:12e4,scan:"google.fr",command:"pm2 restart 0",showAlert:!0},cast:{useCast:!1,castName:"MagicMirror_A2D",port:8569},spotify:{useSpotify:!1,useBottomBar:!1,useLibrespot:!1,connectTo:null,playDelay:3e3,minVolume:10,maxVolume:90,updateInterval:1e3,idleInterval:1e4,username:"",password:"",PATH:"../../../",TOKEN:"./spotify-token.json",CLIENT_ID:"",CLIENT_SECRET:"",deviceDisplay:"Listening on",usePause:!0,typeArtist:"artist",typePlaylist:"playlist",typeAlbum:"album",typeTrack:"track"},NPMCheck:{useChecker:!0,delay:6e5,useAlert:!0}},start:function(){this.config=this.configAssignment({},this.defaults,this.config),this.volumeScript={OSX:"osascript -e 'set volume output volume #VOLUME#'",ALSA:"amixer sset -M 'PCM' #VOLUME#%",ALSA_HEADPHONE:"amixer sset -M 'Headphone' #VOLUME#%",ALSA_HDMI:"amixer sset -M 'HDMI' #VOLUME#%","HIFIBERRY-DAC":"amixer sset -M 'Digital' #VOLUME#%",PULSE:"amixer set Master #VOLUME#% -q",RESPEAKER_SPEAKER:"amixer -M sset Speaker #VOLUME#%",RESPEAKER_PLAYBACK:"amixer -M sset Playback #VOLUME#%"},this.helperConfig={debug:this.config.debug,volumeScript:this.config.volume.myScript?this.config.volume.myScript:this.volumeScript[this.config.volume.volumePreset],useA2D:this.useA2D,links:this.config.links,screen:this.config.screen,pir:this.config.pir,governor:this.config.governor,internet:this.config.internet,cast:this.config.cast,spotify:this.config.spotify,dev:this.config.dev,NPMCheck:this.config.NPMCheck,youtube:this.config.youtube},this.radioPlayer={play:!1,img:null,link:null},this.createRadio(),this.config.debug&&(A2D=A2D_);var e={sendSocketNotification:(e,t)=>{this.sendSocketNotification(e,t)},sendNotification:(e,t)=>{this.sendNotification(e,t)},radioStop:()=>this.radio.pause(),spotify:e=>{e?this.A2D.spotify.connected=!0:(this.A2D.spotify.connected=!1,this.A2D.spotify.librespot&&this.config.screen.useScreen&&!this.displayResponse.working()&&this.sendSocketNotification("SCREEN_LOCK",!1),this.A2D.spotify.librespot=!1)}};this.displayResponse=new Display(this.config,e),this.config.spotify.useSpotify&&(this.spotify=new Spotify(this.config.spotify,e,this.config.debug)),this.A2D=this.displayResponse.A2D,this.bar=null,this.checkStyle(),this.spotifyNewVolume=!1,this.userPresence=null,this.lastPresence=null,this.useA2D&&console.log("[A2D] initialized.")},getDom:function(){var e=document.createElement("div");e.id="A2D_DISPLAY",this.config.spotify.useSpotify&&!this.config.spotify.useBottomBar&&(spotify=this.spotify.prepareMini(),e.appendChild(spotify));var t=document.createElement("div");t.id="A2D_SCREEN",this.config.screen.useScreen&&"Text"==this.config.screen.displayStyle||(t.className="hidden");var i=document.createElement("div");i.id="A2D_SCREEN_TEXT",i.textContent=this.config.screen.text,t.appendChild(i);var s=document.createElement("div");s.id="A2D_SCREEN_COUNTER",s.classList.add("counter"),s.textContent="--:--",t.appendChild(s);var o=document.createElement("div");o.id="A2D_BAR",this.config.screen.useScreen&&"Text"!=this.config.screen.displayStyle&&this.config.screen.displayBar||(o.className="hidden");var n=document.createElement("Bar"==this.config.screen.displayStyle?"meter":"div");n.id="A2D_SCREEN_BAR",n.classList.add(this.config.screen.displayStyle),"Bar"==this.config.screen.displayStyle&&(n.value=0,n.max=this.config.screen.delay),o.appendChild(n);var a=document.createElement("div");a.id="A2D_PRESENCE",a.className="hidden";var c=document.createElement("div");c.id="A2D_PRESENCE_TEXT",c.textContent=this.config.screen.LastPresenceText,a.appendChild(c);var r=document.createElement("div");r.id="A2D_PRESENCE_DATE",r.classList.add("presence"),r.textContent="Loading ...",a.appendChild(r);var l=document.createElement("div");l.id="A2D_INTERNET",this.config.internet.useInternet&&this.config.internet.displayPing||(l.className="hidden");var d=document.createElement("div");d.id="A2D_INTERNET_TEXT",d.textContent="Ping: ",l.appendChild(d);var h=document.createElement("div");h.id="A2D_INTERNET_PING",h.classList.add("ping"),h.textContent="Loading ...",l.appendChild(h);var p=document.createElement("div");p.id="A2D_RADIO",p.className="hidden";var f=document.createElement("img");return f.id="A2D_RADIO_IMG",p.appendChild(f),e.appendChild(p),e.appendChild(t),e.appendChild(o),e.appendChild(a),e.appendChild(l),e},getScripts:function(){return this.scanConfig(),["/modules/MMM-Assistant2Display/components/display.js","/modules/MMM-Assistant2Display/ui/"+(this.ui+"/"+this.ui+".js"),"/modules/MMM-Assistant2Display/components/youtube.js","/modules/MMM-Assistant2Display/components/progressbar.js","/modules/MMM-Assistant2Display/components/spotify.js","https://cdn.materialdesignicons.com/5.2.45/css/materialdesignicons.min.css","https://code.iconify.design/1/1.0.6/iconify.min.js","/modules/MMM-Assistant2Display/components/long-press-event.js"]},getStyles:function(){return["/modules/MMM-Assistant2Display/ui/"+this.ui+"/"+this.ui+".css","screen.css","font-awesome.css"]},getTranslations:function(){return{en:"translations/en.json",fr:"translations/fr.json",it:"translations/it.json",de:"translations/de.json"}},notificationReceived:function(e,t){if("DOM_OBJECTS_CREATED"==e&&this.sendSocketNotification("INIT",this.helperConfig),this.useA2D)switch(this.A2D=this.displayResponse.A2D,e){case"DOM_OBJECTS_CREATED":this.displayResponse.prepare(),this.config.screen.useScreen&&"Text"!=this.config.screen.displayStyle&&this.prepareBar(),this.config.spotify.useSpotify&&this.config.spotify.useBottomBar&&this.spotify.prepare(),this.config.touch.useTouch&&this.touchScreen(this.config.touch.mode);break;case"ASSISTANT_READY":this.onReady();break;case"ALEXA_ACTIVATE":case"ASSISTANT_LISTEN":case"ASSISTANT_THINK":this.A2D.speak=!0,this.config.youtube.useYoutube&&this.displayResponse.player&&(this.config.youtube.useVLC?this.sendSocketNotification("YT_VOLUME",this.config.youtube.minVolume):this.displayResponse.player.command("setVolume",5)),this.config.spotify.useSpotify&&this.A2D.spotify.librespot&&(this.A2D.spotify.targetVolume=this.A2D.spotify.currentVolume,this.sendSocketNotification("SPOTIFY_VOLUME",this.config.spotify.minVolume)),this.A2D.radio&&(this.radio.volume=.1),this.A2D.locked&&this.displayResponse.hideDisplay();break;case"ALEXA_STANDBY":case"ASSISTANT_STANDBY":this.A2D.speak=!1,this.config.youtube.useYoutube&&this.displayResponse.player&&(this.config.youtube.useVLC?this.sendSocketNotification("YT_VOLUME",this.config.youtube.maxVolume):this.displayResponse.player.command("setVolume",100)),this.config.spotify.useSpotify&&this.A2D.spotify.librespot&&!this.A2D.spotify.forceVolume&&this.sendSocketNotification("SPOTIFY_VOLUME",this.A2D.spotify.targetVolume),this.A2D.spotify.forceVolume=!1,this.A2D.radio&&(this.radio.volume=.6),this.displayResponse.working()?this.displayResponse.showDisplay():this.displayResponse.hideDisplay();break;case"A2D":this.displayResponse.start(t),this.sendNotification("TV-STOP");break;case"A2D_STOP":this.A2D.locked&&(this.A2D.youtube.displayed&&(this.config.youtube.useVLC?(this.sendSocketNotification("YT_STOP"),this.A2D.youtube.displayed=!1,this.displayResponse.showYT(),this.displayResponse.A2DUnlock(),this.displayResponse.resetYT()):this.displayResponse.player.command("stopVideo")),this.A2D.photos.displayed&&(this.displayResponse.resetPhotos(),this.displayResponse.hideDisplay()),this.A2D.links.displayed&&(this.displayResponse.resetLinks(),this.displayResponse.hideDisplay())),this.A2D.spotify.librespot&&(this.config.spotify.usePause?this.sendSocketNotification("SPOTIFY_PAUSE"):this.sendSocketNotification("SPOTIFY_STOP")),this.A2D.radio&&this.radio.pause(),this.sendNotification("TV-STOP");break;case"A2D_ASSISTANT_BUSY":this.config.screen.useScreen&&!this.A2D.locked&&this.sendSocketNotification("SCREEN_STOP");break;case"A2D_ASSISTANT_READY":this.config.screen.useScreen&&!this.A2D.locked&&this.sendSocketNotification("SCREEN_RESET");break;case"A2D_VOLUME":this.config.volume.useVolume&&this.sendSocketNotification("SET_VOLUME",t);break;case"WAKEUP":this.config.screen.useScreen&&this.sendSocketNotification("SCREEN_WAKEUP");break;case"A2D_LOCK":this.config.screen.useScreen&&this.sendSocketNotification("SCREEN_LOCK",!0);break;case"A2D_UNLOCK":this.config.screen.useScreen&&this.sendSocketNotification("SCREEN_LOCK",!1);break;case"A2D_RADIO":if(this.A2D.spotify.librespot&&this.sendSocketNotification("SPOTIFY_STOP"),this.A2D.youtube.displayed&&(this.config.youtube.useVLC?(this.sendSocketNotification("YT_STOP"),this.A2D.youtube.displayed=!1,this.displayResponse.showYT(),this.displayResponse.A2DUnlock(),this.displayResponse.resetYT()):this.displayResponse.player.command("stopVideo")),t.link){if(t.img){var i=document.getElementById("A2D_RADIO_IMG");this.radioPlayer.img=t.img,i.src=this.radioPlayer.img}this.radioPlayer.link=t.link,this.radio.src=this.radioPlayer.link,this.radio.autoplay=!0}break;case"A2D_SPOTIFY_PLAY":this.config.spotify.useSpotify&&(this.A2D.youtube.displayed&&this.A2D.spotify.librespot&&(this.A2D.radio&&this.radio.pause(),this.config.youtube.useVLC?(this.sendSocketNotification("YT_STOP"),this.A2D.youtube.displayed=!1,this.displayResponse.showYT(),this.displayResponse.A2DUnlock(),this.displayResponse.resetYT()):this.displayResponse.player.command("stopVideo")),this.sendSocketNotification("SPOTIFY_PLAY"));break;case"A2D_SPOTIFY_PAUSE":this.config.spotify.useSpotify&&this.sendSocketNotification("SPOTIFY_PAUSE");break;case"A2D_SPOTIFY_STOP":this.config.spotify.useSpotify&&(this.A2D.spotify.librespot?this.sendSocketNotification("SPOTIFY_STOP"):this.sendSocketNotification("SPOTIFY_PAUSE"));break;case"A2D_SPOTIFY_NEXT":this.config.spotify.useSpotify&&this.sendSocketNotification("SPOTIFY_NEXT");break;case"A2D_SPOTIFY_PREVIOUS":this.config.spotify.useSpotify&&this.sendSocketNotification("SPOTIFY_PREVIOUS");break;case"A2D_SPOTIFY_SHUFFLE":this.config.spotify.useSpotify&&this.sendSocketNotification("SPOTIFY_SHUFFLE",!this.A2D.spotify.shuffle);break;case"A2D_SPOTIFY_REPEAT":this.config.spotify.useSpotify&&this.sendSocketNotification("SPOTIFY_REPEAT","off"==this.A2D.spotify.repeat?"track":"off");break;case"A2D_SPOTIFY_TRANSFER":this.config.spotify.useSpotify&&this.sendSocketNotification("SPOTIFY_TRANSFER",t);break;case"A2D_SPOTIFY_VOLUME":this.config.spotify.useSpotify&&(this.A2D.spotify.forceVolume=!0,this.sendSocketNotification("SPOTIFY_VOLUME",t));break;case"A2D_SPOTIFY_SEARCH":var s=t.query.split(" ");(s=s[0]==this.config.spotify.typePlaylist?"playlist":s[0]==this.config.spotify.typeAlbum?"album":s[0]==this.config.spotify.typeTrack?"track":s[0]==this.config.spotify.typeArtist?"artist":null)&&(t.query=t.query.replace(s+" ",""),t.type=s);var o={query:{q:t.query,type:t.type},condition:{random:t.random,autoplay:!0}};this.sendSocketNotification("SEARCH_AND_PLAY",o),this.A2D.youtube.displayed&&this.A2D.spotify.librespot&&(this.config.youtube.useVLC?(this.sendSocketNotification("YT_STOP"),this.A2D.youtube.displayed=!1,this.displayResponse.showYT(),this.displayResponse.A2DUnlock(),this.displayResponse.resetYT()):this.displayResponse.player.command("stopVideo"))}},socketNotificationReceived:function(e,t){switch(e){case"NPM_UPDATE":t&&t.length>0&&(this.config.NPMCheck.useAlert&&t.forEach(e=>{this.sendNotification("SHOW_ALERT",{type:"notification",message:"[NPM] "+e.library+" v"+e.installed+" -> v"+e.latest,title:this.translate("UPDATE_NOTIFICATION_MODULE",{MODULE_NAME:e.module}),timer:this.config.NPMCheck.delay-2e3})}),this.sendNotification("NPM_UPDATE",t));break;case"SCREEN_PRESENCE":if(t?this.lastPresence=moment().format("LL HH:mm"):this.userPresence=this.lastPresence,this.userPresence&&this.config.screen.useScreen&&this.config.screen.displayLastPresence){document.getElementById("A2D_PRESENCE").classList.remove("hidden"),document.getElementById("A2D_PRESENCE_DATE").textContent=this.userPresence}break;case"SCREEN_SHOWING":this.screenShowing();break;case"SCREEN_HIDING":this.screenHiding();break;case"SCREEN_TIMER":if(this.config.screen.useScreen&&"Text"==this.config.screen.displayStyle){document.getElementById("A2D_SCREEN_COUNTER").textContent=t}break;case"SCREEN_BAR":if(this.config.screen.useScreen)if("Bar"==this.config.screen.displayStyle){document.getElementById("A2D_SCREEN_BAR").value=this.config.screen.delay-t}else if("Text"!=this.config.screen.displayStyle){let e=(100-100*t/this.config.screen.delay)/100,i=moment(new Date(this.config.screen.delay-t)).format("mm:ss");this.bar.animate(e,{step:(e,t)=>{t.path.setAttribute("stroke",e.color),t.setText(this.config.screen.displayCounter?i:""),t.text.style.color=e.color}})}break;case"INTERNET_DOWN":this.sendNotification("SHOW_ALERT",{type:"alert",message:"Internet is DOWN ! Retry: "+t,title:"Internet Scan",timer:1e4}),this.sendSocketNotification("SCREEN_WAKEUP");break;case"INTERNET_RESTART":this.sendNotification("SHOW_ALERT",{type:"alert",message:"Internet is now available! Restarting Magic Mirror...",title:"Internet Scan",timer:1e4}),this.sendSocketNotification("SCREEN_WAKEUP");break;case"INTERNET_PING":document.getElementById("A2D_INTERNET_PING").textContent=t;break;case"SNOWBOY_STOP":this.sendNotification("ASSISTANT_STOP");break;case"SNOWBOY_START":this.sendNotification("ASSISTANT_START");break;case"CAST_START":this.sendSocketNotification("SCREEN_WAKEUP"),this.displayResponse.castStart(t);break;case"CAST_STOP":this.displayResponse.castStop();break;case"SPOTIFY_PLAY":if(this.spotify.updateCurrentSpotify(t),!this.A2D.spotify.connected)return;t&&t.device&&t.device.name&&(this.A2D.spotify.repeat=t.repeat_state,this.A2D.spotify.shuffle=t.shuffle_state,t.device.name==this.config.spotify.connectTo?(this.A2D.radio&&this.radio.pause(),this.A2D.spotify.currentVolume=t.device.volume_percent,this.A2D.spotify.librespot||(this.A2D.spotify.librespot=!0),this.A2D.spotify.connected&&this.config.screen.useScreen&&!this.displayResponse.working()&&(this.sendSocketNotification("SCREEN_WAKEUP"),this.sendSocketNotification("SCREEN_LOCK",!0))):(this.A2D.spotify.connected&&this.A2D.spotify.librespot&&this.config.screen.useScreen&&!this.displayResponse.working()&&this.sendSocketNotification("SCREEN_LOCK",!1),this.A2D.spotify.librespot&&(this.A2D.spotify.librespot=!1)));break;case"SPOTIFY_IDLE":this.spotify.updatePlayback(!1),this.A2D.spotify.librespot&&this.config.screen.useScreen&&!this.displayResponse.working()&&this.sendSocketNotification("SCREEN_LOCK",!1),this.A2D.spotify.librespot=!1;break;case"DONE_SPOTIFY_VOLUME":this.A2D.spotify.forceVolume&&this.config.spotify.useSpotify&&this.A2D.spotify.librespot&&(this.A2D.spotify.targetVolume=t);break;case"FINISH_YOUTUBE":this.A2D.youtube.displayed=!1,this.displayResponse.showYT(),this.displayResponse.A2DUnlock(),this.displayResponse.resetYT()}},scanConfig:function(){this.useA2D=!1,this.ui="Windows",console.log("[A2D] Scan config.js file");var e=!1,t=!1,i=!1,s=!1;for(let[o,n]of Object.entries(config.modules))"MMM-GoogleAssistant"==n.module&&(e=!0,"fullscreen_above"==n.position&&(n.config.responseConfig&&n.config.responseConfig.screenRotate?this.ui="FullscreenRotate":this.ui="Fullscreen"),t=n.config.A2DServer&&n.config.A2DServer.useA2D&&!n.disabled),"MMM-Alexa"==n.module&&(i=!0,s=n.config.A2DServer&&!n.disabled);e?t?console.log("[A2D] Found: GoogleAssistant"):console.log("[A2D][WARN] GoogleAssistant is disabled!"):console.log("[A2D][WARN] GoogleAssistant not found!"),i?s?console.log("[A2D] Found: Alexa"):console.log("[A2D][WARN] Alexa is disabled!"):console.log("[A2D][WARN] Alexa not found!"),this.useA2D=t||s,console.log("[A2D] Auto choice UI:",this.ui),this.useA2D||console.log("[A2D][ERROR] A2D is desactived!")},prepareBar:function(){"Bar"!=this.config.screen.displayStyle&&(this.bar=new ProgressBar[this.config.screen.displayStyle](document.getElementById("A2D_SCREEN_BAR"),{strokeWidth:"Line"==this.config.screen.displayStyle?2:5,trailColor:"#1B1B1B",trailWidth:1,easing:"easeInOut",duration:500,svgStyle:null,from:{color:"#FF0000"},to:{color:"#00FF00"},text:{style:{position:"absolute",left:"50%",top:"Line"==this.config.screen.displayStyle?"0":"50%",padding:0,margin:0,transform:{prefix:!0,value:"translate(-50%, -50%)"}}}}))},checkStyle:function(){["Text","Line","SemiCircle","Circle","Bar"].find(e=>e==this.config.screen.displayStyle)||(console.log("[A2D] displayStyle Error ! ["+this.config.screen.displayStyle+"]"),this.config.screen=Object.assign({},this.config.screen,{displayStyle:"Text"}))},configAssignment:function(e){for(var t,i,s=Array.prototype.slice.call(arguments,1);s.length;)for(i in t=s.shift())t.hasOwnProperty(i)&&("object"==typeof e[i]&&e[i]&&"[object Array]"!==Object.prototype.toString.call(e[i])&&"object"==typeof t[i]&&null!==t[i]?e[i]=this.configAssignment({},e[i],t[i]):e[i]=t[i]);return e},briefToday:function(){this.sendNotification("ASSISTANT_WELCOME",{key:this.config.briefToday.welcome})},onReady:function(){this.config.briefToday.useBriefToday&&this.briefToday()},screenShowing:function(){MM.getModules().enumerate(e=>{e.show(1e3,{lockString:"A2D_SCREEN"})})},screenHiding:function(){MM.getModules().enumerate(e=>{e.hide(1e3,{lockString:"A2D_SCREEN"})})},resume:function(){this.A2D.spotify.connected&&this.config.spotify.useBottomBar&&(this.displayResponse.showSpotify(),A2D("Spotify is resumed."))},suspend:function(){this.A2D.spotify.connected&&this.config.spotify.useBottomBar&&(this.displayResponse.hideSpotify(),A2D("Spotify is suspended."))},showRadio:function(){if(this.A2D=this.displayResponse.A2D,this.A2D.radio=this.radioPlayer.play,this.radioPlayer.img){var e=document.getElementById("A2D_RADIO");this.radioPlayer.play?e.classList.remove("hidden"):e.classList.add("hidden")}this.A2D.radio?(this.sendSocketNotification("SCREEN_WAKEUP"),this.sendSocketNotification("SCREEN_LOCK",!0)):this.sendSocketNotification("SCREEN_LOCK",!1)},touchScreen:function(e){let t=0,i=null,s=document.getElementById("A2D_DISPLAY");switch(e){case 1:window.addEventListener("click",()=>{1===++t?i=setTimeout(()=>{t=0,this.sendSocketNotification("SCREEN_WAKEUP")},400):2===t&&(clearTimeout(i),t=0,this.sendSocketNotification("SCREEN_FORCE_END"))},!1);break;case 2:s.addEventListener("click",()=>{if(t)return t=0;this.hidden||this.sendSocketNotification("SCREEN_WAKEUP")},!1),window.addEventListener("long-press",()=>{t=1,this.hidden?this.sendSocketNotification("SCREEN_WAKEUP"):this.sendSocketNotification("SCREEN_FORCE_END"),i=setTimeout(()=>{t=0},400)},!1);break;case 3:s.addEventListener("click",()=>{1===++t?i=setTimeout(()=>{t=0,this.sendSocketNotification("SCREEN_WAKEUP")},400):2===t&&(clearTimeout(i),t=0,this.sendSocketNotification("SCREEN_FORCE_END"))},!1),window.addEventListener("click",()=>{this.hidden&&(t=3,this.sendSocketNotification("SCREEN_WAKEUP"),i=setTimeout(()=>{t=0},400))},!1)}A2D(e?"Touch Screen Function added. [mode "+e+"]":"Touch Screen Function disabled.")},createRadio:function(){this.radio=new Audio,this.radio.addEventListener("ended",()=>{A2D("Radio ended"),this.radioPlayer.play=!1,this.showRadio()}),this.radio.addEventListener("pause",()=>{A2D("Radio paused"),this.radioPlayer.play=!1,this.showRadio()}),this.radio.addEventListener("abort",()=>{A2D("Radio aborted"),this.radioPlayer.play=!1,this.showRadio()}),this.radio.addEventListener("error",e=>{A2D("Radio error: "+e),this.radioPlayer.play=!1,this.showRadio()}),this.radio.addEventListener("loadstart",()=>{A2D("Radio started"),this.radioPlayer.play=!0,this.radio.volume=.6,this.showRadio()})},getCommands:function(e){e.add({command:"restart",description:this.translate("RESTART_HELP"),callback:"tbRestart"}),this.config.screen.useScreen&&e.add({command:"wakeup",description:this.translate("WAKEUP_HELP"),callback:"tbWakeup"}),e.add({command:"hide",description:this.translate("HIDE_HELP"),callback:"tbHide"}),e.add({command:"show",description:this.translate("SHOW_HELP"),callback:"tbShow"}),e.add({command:"stop",description:this.translate("STOP_HELP"),callback:"tbStopA2D"}),e.add({command:"A2D",description:this.translate("A2D_HELP"),callback:"tbA2D"}),this.config.volume.useVolume&&e.add({command:"volume",description:this.translate("VOLUME_HELP"),callback:"tbVolume"}),this.config.spotify.useSpotify&&e.add({command:"spotify",description:"Spotify commands",callback:"tbSpotify"})},tbRestart:function(e,t){t.args?(this.sendSocketNotification("RESTART",t.args),t.reply("TEXT",this.translate("RESTART_DONE"))):t.reply("TEXT",this.translate("RESTART_ERROR"))},tbWakeup:function(e,t){this.sendSocketNotification("SCREEN_WAKEUP"),t.reply("TEXT",this.translate("WAKEUP_REPLY"))},tbHide:function(e,t){var i=!1,s=!1;return t.args?"MMM-GoogleAssistant"==t.args||"MMM-Assistant2Display"==t.args?t.reply("TEXT",this.translate("DADDY")):(MM.getModules().enumerate(e=>{if(e.name==t.args){if(i=!0,e.hidden)return t.reply("TEXT",t.args+this.translate("HIDE_ALREADY"));if(e.lockStrings.length>0){if(e.lockStrings.forEach(i=>{"TB_A2D"==i&&(e.hide(500,{lockString:"TB_A2D"}),0==e.lockStrings.length&&(s=!0,t.reply("TEXT",t.args+this.translate("HIDE_DONE"))))}),!s)return t.reply("TEXT",t.args+this.translate("HIDE_LOCKED"))}else e.hide(500,{lockString:"TB_A2D"}),t.reply("TEXT",t.args+this.translate("HIDE_DONE"))}}),void(i||t.reply("TEXT",this.translate("MODULE_NOTFOUND")+t.args))):t.reply("TEXT",this.translate("MODULE_NAME"))},tbShow:function(e,t){var i=!1,s=!1;if(!t.args)return t.reply("TEXT",this.translate("MODULE_NAME"));MM.getModules().enumerate(e=>{if(e.name==t.args){if(i=!0,!e.hidden)return t.reply("TEXT",t.args+this.translate("SHOW_ALREADY"));if(e.lockStrings.length>0){if(e.lockStrings.forEach(i=>{"TB_A2D"==i&&(e.show(500,{lockString:"TB_A2D"}),0==e.lockStrings.length&&(s=!0,t.reply("TEXT",t.args+this.translate("SHOW_DONE"))))}),!s)return t.reply("TEXT",t.args+this.translate("SHOW_LOCKED"))}else e.show(500,{lockString:"TB_A2D"}),t.reply("TEXT",t.args+this.translate("SHOW_DONE"))}}),i||t.reply("TEXT",this.translate("MODULE_NOTFOUND")+t.args)},tbStopA2D:function(e,t){this.notificationReceived("A2D_STOP"),t.reply("TEXT",this.translate("STOP_A2D"))},tbA2D:function(e,t){if(t.args){var i={photos:[],urls:[],transcription:{},trysay:null,help:null},s=/^((http(s)?):\/\/)(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,o=s.test(t.args),n=s.test("http://"+t.args);o||n?(t.reply("TEXT",this.translate("A2D_OPEN")+t.args),i.transcription.transcription=" Telegram @"+t.message.from.username+": "+t.args,i.transcription.done=!0,i.urls[0]=o?t.args:"http://"+t.args,this.config.screen.useScreen&&this.sendSocketNotification("SCREEN_WAKEUP"),this.displayResponse.start(i)):t.reply("TEXT",this.translate("A2D_INVALID"))}else t.reply("TEXT","/A2D <link>")},tbVolume:function(e,t){if(t.args){var i=Number(t.args);if(!i&&0!=i||i<0||i>100)return t.reply("TEXT","/volume [0-100]");this.sendSocketNotification("SET_VOLUME",i),t.reply("TEXT","Volume "+i+"%")}else t.reply("TEXT","/volume [0-100]")},tbSpotify:function(e,t){if(t.args){var i=t.args.toLowerCase().split(" "),s=t.args.split(" ");if("play"==i[0]&&(t.reply("TEXT","Spotify PLAY"),this.notificationReceived("A2D_SPOTIFY_PLAY")),"pause"==i[0]&&(t.reply("TEXT","Spotify PAUSE"),this.notificationReceived("A2D_SPOTIFY_PAUSE")),"stop"==i[0]&&(t.reply("TEXT","Spotify STOP"),this.notificationReceived("A2D_SPOTIFY_STOP")),"next"==i[0]&&(t.reply("TEXT","Spotify NEXT"),this.notificationReceived("A2D_SPOTIFY_NEXT")),"previous"==i[0]&&(t.reply("TEXT","Spotify PREVIOUS"),this.notificationReceived("A2D_SPOTIFY_PREVIOUS")),"volume"==i[0])if(i[1]){if(isNaN(i[1]))return t.reply("TEXT","Must be a number ! [0-100]");i[1]>100&&(i[1]=100),i[1]<0&&(i[1]=0),t.reply("TEXT","Spotify VOLUME: "+i[1]),this.notificationReceived("A2D_SPOTIFY_VOLUME",i[1])}else t.reply("TEXT","Define volume [0-100]");"to"==i[0]&&(i[1]?(t.reply("TEXT","Spotify TRANSFER to: "+s[1]+" (if exist !)"),this.notificationReceived("A2D_SPOTIFY_TRANSFER",s[1])):t.reply("TEXT","Define the device name (case sensitive)"))}else t.reply("TEXT","Need Help for /spotify commands ?\n\n  *play*: Launch music (last title)\n  *pause*: Pause music\n  *stop*: Stop music\n  *next*: Next track\n  *previous*: Previous track\n  *volume*: Volume control, it need a value 0-100\n  *to*: Transfert music to another device (case sensitive)  ",{parse_mode:"Markdown"})}});
