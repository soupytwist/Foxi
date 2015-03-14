# Foxi
## Kodi/XBMC remote for Firefox OS/B2G

### Overview
This app is designed to work with Kodi/XBMC to make it easy to navigate your
library and control the media center directly from your Firefox OS device.
This uses a websocket to connect to your media server and communicate via the
JSON-RPC API.

Desgined and tested with Kodi 14.0 "Helix" (http://kodi.tv/). This should be
compatible with XBMC 12.x and 13.x as well, and is untested on earlier versions.

![Screenshots](<https://i.imgur.com/62HVjX0.png>)

### Features
* Navigate and play TV Shows and Movies
* Media controls (play/pause, volume, seek, etc)
* Generated thumbnails for all media
* Basic remote interface for navigational controls

### Planned
* Support for music controls
* Support for creating a playlist
* ???

### App Permissions
There are two device APIs used in this app that require it to be privileged. The
"systemXHR" permission is required to make cross-domain requests from the app,
which are used ONLY for retrieving images by the URLs returned by Kodi. Once an
image is retrieved once, it is cached on the device to reduce bandwidth and
increase performance. This requires the "storage" permission for storing image
thumbnails in IndexedDB.

### Chanelog

* *v0.1.0*: Initial Release; supports Movies and TV Shows

### License
GNU GPLv3

### Support
Please report any issues you have on the Github issue tracker for this project.
This is under active development and hasn't yet been extensively tested, so
feedback and suggestions are very welcome and appreciated! Pull requests
welcome!
