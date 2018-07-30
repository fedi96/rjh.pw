function getdata(lists) {
  $.each(lists, function (g, idw) {
  var idd=10;
  var api = "https://hls.rjh.fun/feeds.php?id="+idw+idd;
  //var api = "soccer.json";
  $.getJSON(api, function (json) {
    if (json.events) {
      var uniquegames = [];
      $.each(json.events, function(i, el){
          if($.inArray(el.event, uniquegames) === -1) uniquegames.push(el.event);
      });
      var games = [];
      $.each(uniquegames,function(i, game){
        var un = [];
      $.each(json.events, function(j, el){
          if(el.event == game) un.push({'id' : j,'lang' : el.audio,'time': el.startDateTime,'sport': el.sport,'league': el.league,'def': el.definition});
      });
      games.push({'game': game,'content' : un});
      });
      $.each(games, function (i, game) {
        var gd = new Date(parseFloat(game.content[0].time)*1000);
        var time = gd.toLocaleTimeString([], {day:'numeric' ,month:'short',hour: '2-digit',minute: '2-digit'});
        var id = game.content[0].id;
        var sport = game.content[0].sport;
        var league = game.content[0].league;
        var title = game.game;
        var gameLinks = '';
        $.each(game.content, function (j, media) {
          if(media.lang.substr(0, 4) != 'Hebr')
          gameLinks = `${gameLinks}<a class="btn btn-sm btn-default float-center" href="#${media.id}">${media.lang.substr(0, 3)}</a>`;
        });
        var gameTitle = `<div class="card shadow col-lg-3"><div class="card-header">${title}</div><div class="card-body">${time}<br>${league}</div><div class="card-footer">`;
        if(gameLinks != '' && game.content[0].league.indexOf('Israel') ==-1)
        $("#"+sport).append(gameTitle + gameLinks + "</div></div>");
      });
    } else {
      $("#"+sport).append('<div class="tab-content">No games.</div>');
    }
  });
});
}


function getsports(idw) {
  if(!idw) idw=10;
  //var api ="sports.json"
  var api = "https://hls.rjh.fun/sports.php?id="+idw;
  var lists = [];
  $.getJSON(api, function (json) {
    if (json.sports) {
      var games = json.sports;
      $.each(games, function (i, game) {
        var id = game.id;
        var sport = game.sport;
        var feeds = game.feedContents;
        lists.push(id)
        if(sport == "Soccer"){
          var game = `<li class="nav-item"><a class="nav-link mb-sm-3 mb-md-0 active show" id="tabs-icons-text-${i}-tab" data-toggle="tab" href="#sport${i}" role="tab" aria-controls="sport${id}" aria-selected="true"><i class="ni ni-cloud-upload-96 mr-2"></i>${sport}</a></li>`;
          var content =`<div class="tab-pane fade active show"  id="sport${i}" role="tabpanel" aria-labelledby="sport${i}"><div class="tab-content" id="${sport}"></div></div>`;
        }
        else{
        var game = `<li class="nav-item"><a class="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-${i}-tab" data-toggle="tab" href="#sport${i}" role="tab" aria-controls="sport${id}" aria-selected="false"><i class="ni ni-cloud-upload-96 mr-2"></i>${sport}</a></li>`;
        var content =`<div class="tab-pane fade"  id="sport${i}" role="tabpanel" aria-labelledby="sport${i}"><div class="tab-content" id="${sport}"></div></div>`;
      }
        $("#tabs-icons-text").append(game);
        $("#myTabContent").append(content);
      });
    } else {
      $("#tabs-icons-text").append('<div class="tab-content">No games.</div>');
    }
  });
  console.log(lists);
  return lists;
}










      /*var games = json.events;
      $.each(uniquegames, function (i, game) {
        var gd = new Date(game.startDateTime);
        var time = gd.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });
        var sport = game.sport;
        var league = game.league;
        var title = game.event;
        var audio = game.audio;
        var definition = game.definition;
        var gameTitle = gameTitle + `<div class="card shadow col-lg-3"><div class="card-body"><p class="description">${title}<br>${league}<br>${gd}<br>${i}</p></div></div>`;
        var gameLinks = "";
        $.each(game.content.media.epg, function (j, media) {
          if (media.title === "MLBTV") {
            $.each(media.items, function (k, item) {
              var feedName = "";
              if (item.mediaFeedType === "ISO" || item.mediaFeedType === "COMPOSITE") {
                var feedNamek = item.feedName;
              } else {
                feedName = item.mediaFeedType;
                if (item.callLetters !== "") {
                  feedName = feedName + " (" + item.callLetters + ")";
                }
                gameLinks = gameLinks + createUrl("MLB", date, item.id, feedName, pk, gd.toLocaleString());
              }
            });
          }
        });
        gameLinks = gameLinks + "</div></div>";
        $("#soccer").append(gameTitle + "</div>");
      });
    } else {
      $("#soccer").append('<div class="tab-content">No games.</div>');
    }
  });
}*/
