"use strict";

export var TVSHOW_SAMPLE = [
  {
    "art": {
      "banner": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fgraphical%2f250487-g4.jpg/",
      "fanart":"image://http%3a%2f%2fthetvdb.com%2fbanners%2ffanart%2foriginal%2f250487-33.jpg/",
      "poster":"image://http%3a%2f%2fthetvdb.com%2fbanners%2fposters%2f250487-10.jpg/"
    },
    "label":"SAMPLE-1",
    "title":"Sample TV Show 1",
    "tvshowid":1,
    "year":2001
  },
  {
    "art": {
      "banner":"image://http%3a%2f%2fthetvdb.com%2fbanners%2fgraphical%2f110381-g5.jpg/",
      "fanart":"image://http%3a%2f%2fthetvdb.com%2fbanners%2ffanart%2foriginal%2f110381-23.jpg/",
      "poster":"image://http%3a%2f%2fthetvdb.com%2fbanners%2fposters%2f110381-1.jpg/"
    },
    "label":"SAMPLE-2",
    "title":"Sample TV Show 2",
    "tvshowid":2,
    "year":2002
  },
  {
    "art": {
      "banner":"image://http%3a%2f%2fthetvdb.com%2fbanners%2fgraphical%2f81386-g11.jpg/",
      "fanart":"image://http%3a%2f%2fthetvdb.com%2fbanners%2ffanart%2foriginal%2f81386-7.jpg/",
      "poster":"image://http%3a%2f%2fthetvdb.com%2fbanners%2fposters%2f81386-6.jpg/"
    },
    "label":"SAMPLE-3",
    "title":"Sample TV Show 3",
    "tvshowid":3,
    "year":2003
  }
];

export var TVSHOWS_RESPONSE = {
  "id":"TVSHOWS_MSG_ID",
  "jsonrpc":"2.0",
  "result":{
    "limits":{"end":3,"start":0,"total":3},
    "tvshows": TVSHOW_SAMPLE
  }
};

export var SEASON_SAMPLE = [
  {
    "art": {
      "banner": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fseasonswide%2f110381-1.jpg/",
      "poster": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fseasons%2f110381-1-3.jpg/",
      "tvshow.banner": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fgraphical%2f110381-g5.jpg/",
      "tvshow.fanart": "image://http%3a%2f%2fthetvdb.com%2fbanners%2ffanart%2foriginal%2f110381-23.jpg/",
      "tvshow.poster": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fposters%2f110381-1.jpg/"
    },
    "episode": 10,
    "label": "Season 1",
    "season": 1,
    "seasonid": 11,
    "tvshowid": 1
  },
  {
    "art": {
      "banner": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fseasonswide%2f110381-2.jpg/",
      "poster": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fseasons%2f110381-2.jpg/",
      "tvshow.banner": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fgraphical%2f110381-g5.jpg/",
      "tvshow.fanart": "image://http%3a%2f%2fthetvdb.com%2fbanners%2ffanart%2foriginal%2f110381-23.jpg/",
      "tvshow.poster": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fposters%2f110381-1.jpg/"
    },
    "episode": 7,
    "label": "Season 2",
    "season": 2,
    "seasonid": 12,
    "tvshowid": 1 
  },
  {
    "art": {
      "poster": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fseasons%2f110381-3-5.jpg/",
      "tvshow.banner": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fgraphical%2f110381-g5.jpg/",
      "tvshow.fanart": "image://http%3a%2f%2fthetvdb.com%2fbanners%2ffanart%2foriginal%2f110381-23.jpg/",
      "tvshow.poster": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fposters%2f110381-1.jpg/"
    },
    "episode": 11,
    "label": "Season 3",
    "season": 3,
    "seasonid": 13,
    "tvshowid": 1 
  }
];

export var SEASONS_RESPONSE = {
  "id":"TVSHOWS_MSG_ID",
  "jsonrpc":"2.0",
  "result":{
    "limits":{"end":3,"start":0,"total":3},
    "seasons": SEASON_SAMPLE
  }
};

export var EPISODE_SAMPLE = [
   {
      "art": {
        "thumb": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fepisodes%2f110381%2f1555111.jpg/",
        "tvshow.banner": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fgraphical%2f110381-g5.jpg/",
        "tvshow.fanart": "image://http%3a%2f%2fthetvdb.com%2fbanners%2ffanart%2foriginal%2f110381-23.jpg/",
        "tvshow.poster": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fposters%2f110381-1.jpg/"
      },
      "episode": 1,
      "episodeid": 21,
      "label": "1x01. Sample Episode 1",
      "title": "Sample Episode 1"
   },
   {
      "art": {
        "thumb": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fepisodes%2f110381%2f1085661.jpg/",
        "tvshow.banner": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fgraphical%2f110381-g5.jpg/",
        "tvshow.fanart": "image://http%3a%2f%2fthetvdb.com%2fbanners%2ffanart%2foriginal%2f110381-23.jpg/",
        "tvshow.poster": "image://http%3a%2f%2fthetvdb.com%2fbanners%2fposters%2f110381-1.jpg/"
      },
      "episode": 2,
      "episodeid": 22,
      "label": "1x02. Sample Episode 2",
      "title": "Sample Episode 2"
   }
];

export var EPISODES_RESPONSE = {
  "id":"EPISODES_MSG_ID",
  "jsonrpc":"2.0",
  "result":{
    "limits":{"end":2,"start":0,"total":2},
    "episodes": EPISODE_SAMPLE
  }
};
