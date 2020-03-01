/** node helper **/

const proxy = require("./components/proxy.js")
var NodeHelper = require("node_helper")

var _log = function() {
  var context = "[AMK2:ADDONS:A2D]"
  return Function.prototype.bind.call(console.log, console, context)
}()

var log = function() {
  //do nothing
}

module.exports = NodeHelper.create({

  start: function () {
    this.config = {}
    this.html = ""
    this.proxyServer = null
  },

  socketNotificationReceived: function (noti, payload) {
    switch (noti) {
      case "INIT":
        this.initialize(payload)
        break
      case "PROXY_OPEN":
        this.openProxy(payload)
        break
      case "PROXY_CLOSE":
        this.closeProxy()
        break
    }
  },

  initialize: function(config) {
    this.config = config
    log(this.config)
    var debug = (this.config.debug) ? this.config.debug : false
    if (debug == true) log = _log
    log("Initialized: Assistant2Display Version",  require('./package.json').version)
  },

  callback: function(send,params) {
    if (send) this.sendSocketNotification(send,params)
  },

  openProxy: function(url) {
    if (this.proxyServer) this.proxyServer.stop()
    this.proxyServer = new proxy(this.config, (send,params)=>{ this.callback(send,params) })
    this.proxyServer.start(url)
  },

  closeProxy: function () {
    if (!this.proxyServer) return
    this.proxyServer.stop()
    this.proxyServer= null
  }

});
