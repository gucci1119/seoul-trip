const CACHE='seoul-shiori-v1';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',function(e){
  var req=e.request;
  if(req.method!=='GET')return;
  e.respondWith(
    fetch(req).then(function(res){
      try{var copy=res.clone();caches.open(CACHE).then(function(c){c.put(req,copy);});}catch(_){}
      return res;
    }).catch(function(){
      return caches.match(req).then(function(r){return r||caches.match('./');});
    })
  );
});
