"use strict";

function Kodi(rpc) {
  this.rpc = rpc;
}


/**
 * Addons.ExecuteAddon
 * 
 * Executes the given addon with the given parameters (if possible)
 * 
 * @param addonid: string
 * @param params: object | Array<string> | string
 * @param wait: boolean
 * 
 * @returns string
 */
Kodi.prototype.Addons_ExecuteAddon = function(x) {
  return this.rpc.send_msg('Addons.ExecuteAddon', x);
};


/**
 * Addons.GetAddonDetails
 * 
 * Gets the details of a specific addon
 * 
 * @param addonid: string
 * @param properties: $Addon.Fields
 * 
 * @returns {
 *   addon : $Addon.Details
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.Addons_GetAddonDetails = function(x) {
  return this.rpc.send_msg('Addons.GetAddonDetails', x);
};


/**
 * Addons.GetAddons
 * 
 * Gets all available addons
 * 
 * @param type: $Addon.Types
 * @param content: $Addon.Content
 * @param enabled: boolean | string
 * @param properties: $Addon.Fields
 * @param limits: $List.Limits
 * 
 * @returns {
 *   [addons] : Array<$Addon.Details>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.Addons_GetAddons = function(x) {
  return this.rpc.send_msg('Addons.GetAddons', x);
};


/**
 * Addons.SetAddonEnabled
 * 
 * Enables/Disables a specific addon
 * 
 * @param addonid: string
 * @param enabled: $Global.Toggle
 * 
 * @returns string
 */
Kodi.prototype.Addons_SetAddonEnabled = function(x) {
  return this.rpc.send_msg('Addons.SetAddonEnabled', x);
};




/**
 * Application.GetProperties
 * 
 * Retrieves the values of the given properties
 * 
 * @param properties: Array<$Application.Property.Name>
 * 
 * @returns $Application.Property.Value
 */
Kodi.prototype.Application_GetProperties = function(x) {
  return this.rpc.send_msg('Application.GetProperties', x);
};


/**
 * Application.Quit
 * 
 * Quit application
 * 
 * 
 * @returns string
 */
Kodi.prototype.Application_Quit = function(x) {
  return this.rpc.send_msg('Application.Quit', x);
};


/**
 * Application.SetMute
 * 
 * Toggle mute/unmute
 * 
 * @param mute: $Global.Toggle
 * 
 * @returns boolean
 */
Kodi.prototype.Application_SetMute = function(x) {
  return this.rpc.send_msg('Application.SetMute', x);
};


/**
 * Application.SetVolume
 * 
 * Set the current volume
 * 
 * @param volume: integer | $Global.IncrementDecrement
 * 
 * @returns integer
 */
Kodi.prototype.Application_SetVolume = function(x) {
  return this.rpc.send_msg('Application.SetVolume', x);
};




/**
 * AudioLibrary.Clean
 * 
 * Cleans the audio library from non-existent items
 * 
 * 
 * @returns string
 */
Kodi.prototype.AudioLibrary_Clean = function(x) {
  return this.rpc.send_msg('AudioLibrary.Clean', x);
};


/**
 * AudioLibrary.Export
 * 
 * Exports all items from the audio library
 * 
 * @param options: {,  path : string,} | {,  [images] : boolean,  [overwrite] : boolean,}
 * 
 * @returns string
 */
Kodi.prototype.AudioLibrary_Export = function(x) {
  return this.rpc.send_msg('AudioLibrary.Export', x);
};


/**
 * AudioLibrary.GetAlbumDetails
 * 
 * Retrieve details about a specific album
 * 
 * @param albumid: $Library.Id
 * @param properties: $Audio.Fields.Album
 * 
 * @returns {
 *   [albumdetails] : $Audio.Details.Album
 * }
 */
Kodi.prototype.AudioLibrary_GetAlbumDetails = function(x) {
  return this.rpc.send_msg('AudioLibrary.GetAlbumDetails', x);
};


/**
 * AudioLibrary.GetAlbums
 * 
 * Retrieve all albums from specified artist or genre
 * 
 * @param properties: $Audio.Fields.Album
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * @param filter: {,  genreid : $Library.Id,} | {,  genre : string,} | {,  artistid : $Library.Id,} | {,  artist : string,} | $List.Filter.Albums
 * 
 * @returns {
 *   [albums] : Array<$Audio.Details.Album>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.AudioLibrary_GetAlbums = function(x) {
  return this.rpc.send_msg('AudioLibrary.GetAlbums', x);
};


/**
 * AudioLibrary.GetArtistDetails
 * 
 * Retrieve details about a specific artist
 * 
 * @param artistid: $Library.Id
 * @param properties: $Audio.Fields.Artist
 * 
 * @returns {
 *   [artistdetails] : $Audio.Details.Artist
 * }
 */
Kodi.prototype.AudioLibrary_GetArtistDetails = function(x) {
  return this.rpc.send_msg('AudioLibrary.GetArtistDetails', x);
};


/**
 * AudioLibrary.GetArtists
 * 
 * Retrieve all artists
 * 
 * @param albumartistsonly: $Optional.Boolean
 * @param properties: $Audio.Fields.Artist
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * @param filter: {,  genreid : $Library.Id,} | {,  genre : string,} | {,  albumid : $Library.Id,} | {,  album : string,} | {,  songid : $Library.Id,} | $List.Filter.Artists
 * 
 * @returns {
 *   [artists] : Array<$Audio.Details.Artist>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.AudioLibrary_GetArtists = function(x) {
  return this.rpc.send_msg('AudioLibrary.GetArtists', x);
};


/**
 * AudioLibrary.GetGenres
 * 
 * Retrieve all genres
 * 
 * @param properties: $Library.Fields.Genre
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   genres : Array<$Library.Details.Genre>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.AudioLibrary_GetGenres = function(x) {
  return this.rpc.send_msg('AudioLibrary.GetGenres', x);
};


/**
 * AudioLibrary.GetRecentlyAddedAlbums
 * 
 * Retrieve recently added albums
 * 
 * @param properties: $Audio.Fields.Album
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   [albums] : Array<$Audio.Details.Album>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.AudioLibrary_GetRecentlyAddedAlbums = function(x) {
  return this.rpc.send_msg('AudioLibrary.GetRecentlyAddedAlbums', x);
};


/**
 * AudioLibrary.GetRecentlyAddedSongs
 * 
 * Retrieve recently added songs
 * 
 * @param albumlimit: $List.Amount
 * @param properties: $Audio.Fields.Song
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   [songs] : Array<$Audio.Details.Song>
 * }
 */
Kodi.prototype.AudioLibrary_GetRecentlyAddedSongs = function(x) {
  return this.rpc.send_msg('AudioLibrary.GetRecentlyAddedSongs', x);
};


/**
 * AudioLibrary.GetRecentlyPlayedAlbums
 * 
 * Retrieve recently played albums
 * 
 * @param properties: $Audio.Fields.Album
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   [albums] : Array<$Audio.Details.Album>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.AudioLibrary_GetRecentlyPlayedAlbums = function(x) {
  return this.rpc.send_msg('AudioLibrary.GetRecentlyPlayedAlbums', x);
};


/**
 * AudioLibrary.GetRecentlyPlayedSongs
 * 
 * Retrieve recently played songs
 * 
 * @param properties: $Audio.Fields.Song
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   [songs] : Array<$Audio.Details.Song>
 * }
 */
Kodi.prototype.AudioLibrary_GetRecentlyPlayedSongs = function(x) {
  return this.rpc.send_msg('AudioLibrary.GetRecentlyPlayedSongs', x);
};


/**
 * AudioLibrary.GetSongDetails
 * 
 * Retrieve details about a specific song
 * 
 * @param songid: $Library.Id
 * @param properties: $Audio.Fields.Song
 * 
 * @returns {
 *   [songdetails] : $Audio.Details.Song
 * }
 */
Kodi.prototype.AudioLibrary_GetSongDetails = function(x) {
  return this.rpc.send_msg('AudioLibrary.GetSongDetails', x);
};


/**
 * AudioLibrary.GetSongs
 * 
 * Retrieve all songs from specified album, artist or genre
 * 
 * @param properties: $Audio.Fields.Song
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * @param filter: {,  genreid : $Library.Id,} | {,  genre : string,} | {,  artistid : $Library.Id,} | {,  artist : string,} | {,  albumid : $Library.Id,} | {,  album : string,} | $List.Filter.Songs
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   [songs] : Array<$Audio.Details.Song>
 * }
 */
Kodi.prototype.AudioLibrary_GetSongs = function(x) {
  return this.rpc.send_msg('AudioLibrary.GetSongs', x);
};


/**
 * AudioLibrary.Scan
 * 
 * Scans the audio sources for new library items
 * 
 * @param directory: string
 * 
 * @returns string
 */
Kodi.prototype.AudioLibrary_Scan = function(x) {
  return this.rpc.send_msg('AudioLibrary.Scan', x);
};


/**
 * AudioLibrary.SetAlbumDetails
 * 
 * Update the given album with the given details
 * 
 * @param albumid: $Library.Id
 * @param title: $Optional.String
 * @param artist: null | $Array.String
 * @param description: $Optional.String
 * @param genre: null | $Array.String
 * @param theme: null | $Array.String
 * @param mood: null | $Array.String
 * @param style: null | $Array.String
 * @param type: $Optional.String
 * @param albumlabel: $Optional.String
 * @param rating: $Optional.Integer
 * @param year: $Optional.Integer
 * 
 * @returns string
 */
Kodi.prototype.AudioLibrary_SetAlbumDetails = function(x) {
  return this.rpc.send_msg('AudioLibrary.SetAlbumDetails', x);
};


/**
 * AudioLibrary.SetArtistDetails
 * 
 * Update the given artist with the given details
 * 
 * @param artistid: $Library.Id
 * @param artist: $Optional.String
 * @param instrument: null | $Array.String
 * @param style: null | $Array.String
 * @param mood: null | $Array.String
 * @param born: $Optional.String
 * @param formed: $Optional.String
 * @param description: $Optional.String
 * @param genre: null | $Array.String
 * @param died: $Optional.String
 * @param disbanded: $Optional.String
 * @param yearsactive: null | $Array.String
 * 
 * @returns string
 */
Kodi.prototype.AudioLibrary_SetArtistDetails = function(x) {
  return this.rpc.send_msg('AudioLibrary.SetArtistDetails', x);
};


/**
 * AudioLibrary.SetSongDetails
 * 
 * Update the given song with the given details
 * 
 * @param songid: $Library.Id
 * @param title: $Optional.String
 * @param artist: null | $Array.String
 * @param albumartist: null | $Array.String
 * @param genre: null | $Array.String
 * @param year: $Optional.Integer
 * @param rating: $Optional.Integer
 * @param album: $Optional.String
 * @param track: $Optional.Integer
 * @param disc: $Optional.Integer
 * @param duration: $Optional.Integer
 * @param comment: $Optional.String
 * @param musicbrainztrackid: $Optional.String
 * @param musicbrainzartistid: $Optional.String
 * @param musicbrainzalbumid: $Optional.String
 * @param musicbrainzalbumartistid: $Optional.String
 * 
 * @returns string
 */
Kodi.prototype.AudioLibrary_SetSongDetails = function(x) {
  return this.rpc.send_msg('AudioLibrary.SetSongDetails', x);
};




/**
 * Favourites.AddFavourite
 * 
 * Add a favourite with the given details
 * 
 * @param title: string
 * @param type: $Favourite.Type
 * @param path: $Optional.String
 * @param window: $Optional.String
 * @param windowparameter: $Optional.String
 * @param thumbnail: $Optional.String
 * 
 * @returns string
 */
Kodi.prototype.Favourites_AddFavourite = function(x) {
  return this.rpc.send_msg('Favourites.AddFavourite', x);
};


/**
 * Favourites.GetFavourites
 * 
 * Retrieve all favourites
 * 
 * @param type: null | $Favourite.Type
 * @param properties: $Favourite.Fields.Favourite
 * 
 * @returns {
 *   [favourites] : Array<$Favourite.Details.Favourite>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.Favourites_GetFavourites = function(x) {
  return this.rpc.send_msg('Favourites.GetFavourites', x);
};




/**
 * Files.GetDirectory
 * 
 * Get the directories and files in the given directory
 * 
 * @param directory: string
 * @param media: $Files.Media
 * @param properties: $List.Fields.Files
 * @param sort: $List.Sort
 * @param limits: $List.Limits
 * 
 * @returns {
 *   files : Array<$List.Item.File>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.Files_GetDirectory = function(x) {
  return this.rpc.send_msg('Files.GetDirectory', x);
};


/**
 * Files.GetFileDetails
 * 
 * Get details for a specific file
 * 
 * @param file: string
 * @param media: $Files.Media
 * @param properties: $List.Fields.Files
 * 
 * @returns {
 *   filedetails : $List.Item.File
 * }
 */
Kodi.prototype.Files_GetFileDetails = function(x) {
  return this.rpc.send_msg('Files.GetFileDetails', x);
};


/**
 * Files.GetSources
 * 
 * Get the sources of the media windows
 * 
 * @param media: $Files.Media
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   sources : $List.Items.Sources
 * }
 */
Kodi.prototype.Files_GetSources = function(x) {
  return this.rpc.send_msg('Files.GetSources', x);
};




/**
 * GUI.ActivateWindow
 * 
 * Activates the given window
 * 
 * @param window: $GUI.Window
 * @param parameters: Array<string>
 * 
 * @returns string
 */
Kodi.prototype.GUI_ActivateWindow = function(x) {
  return this.rpc.send_msg('GUI.ActivateWindow', x);
};


/**
 * GUI.GetProperties
 * 
 * Retrieves the values of the given properties
 * 
 * @param properties: Array<$GUI.Property.Name>
 * 
 * @returns $GUI.Property.Value
 */
Kodi.prototype.GUI_GetProperties = function(x) {
  return this.rpc.send_msg('GUI.GetProperties', x);
};


/**
 * GUI.GetStereoscopicModes
 * 
 * Returns the supported stereoscopic modes of the GUI
 * 
 * 
 * @returns {
 *   [stereoscopicmodes] : Array<$GUI.Stereoscopy.Mode>
 * }
 */
Kodi.prototype.GUI_GetStereoscopicModes = function(x) {
  return this.rpc.send_msg('GUI.GetStereoscopicModes', x);
};


/**
 * GUI.SetFullscreen
 * 
 * Toggle fullscreen/GUI
 * 
 * @param fullscreen: $Global.Toggle
 * 
 * @returns boolean
 */
Kodi.prototype.GUI_SetFullscreen = function(x) {
  return this.rpc.send_msg('GUI.SetFullscreen', x);
};


/**
 * GUI.SetStereoscopicMode
 * 
 * Sets the stereoscopic mode of the GUI to the given mode
 * 
 * @param mode: string
 * 
 * @returns string
 */
Kodi.prototype.GUI_SetStereoscopicMode = function(x) {
  return this.rpc.send_msg('GUI.SetStereoscopicMode', x);
};


/**
 * GUI.ShowNotification
 * 
 * Shows a GUI notification
 * 
 * @param title: string
 * @param message: string
 * @param image: string | string
 * @param displaytime: integer
 * 
 * @returns string
 */
Kodi.prototype.GUI_ShowNotification = function(x) {
  return this.rpc.send_msg('GUI.ShowNotification', x);
};




/**
 * Input.Back
 * 
 * Goes back in GUI
 * 
 * 
 * @returns string
 */
Kodi.prototype.Input_Back = function(x) {
  return this.rpc.send_msg('Input.Back', x);
};


/**
 * Input.ContextMenu
 * 
 * Shows the context menu
 * 
 * 
 * @returns string
 */
Kodi.prototype.Input_ContextMenu = function(x) {
  return this.rpc.send_msg('Input.ContextMenu', x);
};


/**
 * Input.Down
 * 
 * Navigate down in GUI
 * 
 * 
 * @returns string
 */
Kodi.prototype.Input_Down = function(x) {
  return this.rpc.send_msg('Input.Down', x);
};


/**
 * Input.ExecuteAction
 * 
 * Execute a specific action
 * 
 * @param action: $Input.Action
 * 
 * @returns string
 */
Kodi.prototype.Input_ExecuteAction = function(x) {
  return this.rpc.send_msg('Input.ExecuteAction', x);
};


/**
 * Input.Home
 * 
 * Goes to home window in GUI
 * 
 * 
 * @returns string
 */
Kodi.prototype.Input_Home = function(x) {
  return this.rpc.send_msg('Input.Home', x);
};


/**
 * Input.Info
 * 
 * Shows the information dialog
 * 
 * 
 * @returns string
 */
Kodi.prototype.Input_Info = function(x) {
  return this.rpc.send_msg('Input.Info', x);
};


/**
 * Input.Left
 * 
 * Navigate left in GUI
 * 
 * 
 * @returns string
 */
Kodi.prototype.Input_Left = function(x) {
  return this.rpc.send_msg('Input.Left', x);
};


/**
 * Input.Right
 * 
 * Navigate right in GUI
 * 
 * 
 * @returns string
 */
Kodi.prototype.Input_Right = function(x) {
  return this.rpc.send_msg('Input.Right', x);
};


/**
 * Input.Select
 * 
 * Select current item in GUI
 * 
 * 
 * @returns string
 */
Kodi.prototype.Input_Select = function(x) {
  return this.rpc.send_msg('Input.Select', x);
};


/**
 * Input.SendText
 * 
 * Send a generic (unicode) text
 * 
 * @param text: string
 * @param done: boolean
 * 
 * @returns string
 */
Kodi.prototype.Input_SendText = function(x) {
  return this.rpc.send_msg('Input.SendText', x);
};


/**
 * Input.ShowCodec
 * 
 * Show codec information of the playing item
 * 
 * 
 * @returns string
 */
Kodi.prototype.Input_ShowCodec = function(x) {
  return this.rpc.send_msg('Input.ShowCodec', x);
};


/**
 * Input.ShowOSD
 * 
 * Show the on-screen display for the current player
 * 
 * 
 * @returns string
 */
Kodi.prototype.Input_ShowOSD = function(x) {
  return this.rpc.send_msg('Input.ShowOSD', x);
};


/**
 * Input.Up
 * 
 * Navigate up in GUI
 * 
 * 
 * @returns string
 */
Kodi.prototype.Input_Up = function(x) {
  return this.rpc.send_msg('Input.Up', x);
};




/**
 * JSONRPC.GetConfiguration
 * 
 * Get client-specific configurations
 * 
 * 
 * @returns $Configuration
 */
Kodi.prototype.JSONRPC_GetConfiguration = function(x) {
  return this.rpc.send_msg('JSONRPC.GetConfiguration', x);
};


/**
 * JSONRPC.Introspect
 * 
 * Enumerates all actions and descriptions
 * 
 * @param getdescriptions: boolean
 * @param getmetadata: boolean
 * @param filterbytransport: boolean
 * @param filter: {
 *   [getreferences] : boolean
 *   id : string
 *   type : string
 * }
 * 
 * @returns object
 */
Kodi.prototype.JSONRPC_Introspect = function(x) {
  return this.rpc.send_msg('JSONRPC.Introspect', x);
};


/**
 * JSONRPC.NotifyAll
 * 
 * Notify all other connected clients
 * 
 * @param sender: string
 * @param message: string
 * @param data: any
 * 
 * @returns any
 */
Kodi.prototype.JSONRPC_NotifyAll = function(x) {
  return this.rpc.send_msg('JSONRPC.NotifyAll', x);
};


/**
 * JSONRPC.Permission
 * 
 * Retrieve the clients permissions
 * 
 * 
 * @returns {
 *   controlgui : boolean
 *   controlnotify : boolean
 *   controlplayback : boolean
 *   controlpower : boolean
 *   controlpvr : boolean
 *   controlsystem : boolean
 *   executeaddon : boolean
 *   manageaddon : boolean
 *   navigate : boolean
 *   readdata : boolean
 *   removedata : boolean
 *   updatedata : boolean
 *   writefile : boolean
 * }
 */
Kodi.prototype.JSONRPC_Permission = function(x) {
  return this.rpc.send_msg('JSONRPC.Permission', x);
};


/**
 * JSONRPC.Ping
 * 
 * Ping responder
 * 
 * 
 * @returns string
 */
Kodi.prototype.JSONRPC_Ping = function(x) {
  return this.rpc.send_msg('JSONRPC.Ping', x);
};


/**
 * JSONRPC.SetConfiguration
 * 
 * Change the client-specific configuration
 * 
 * @param notifications: {
 *   [application] : $Optional.Boolean
 *   [audiolibrary] : $Optional.Boolean
 *   [gui] : $Optional.Boolean
 *   [input] : $Optional.Boolean
 *   [other] : $Optional.Boolean
 *   [player] : $Optional.Boolean
 *   [playlist] : $Optional.Boolean
 *   [system] : $Optional.Boolean
 *   [videolibrary] : $Optional.Boolean
 * }
 * 
 * @returns $Configuration
 */
Kodi.prototype.JSONRPC_SetConfiguration = function(x) {
  return this.rpc.send_msg('JSONRPC.SetConfiguration', x);
};


/**
 * JSONRPC.Version
 * 
 * Retrieve the JSON-RPC protocol version.
 * 
 * 
 * @returns {
 *   version : {,  major : integer,  minor : integer,  patch : integer,}
 * }
 */
Kodi.prototype.JSONRPC_Version = function(x) {
  return this.rpc.send_msg('JSONRPC.Version', x);
};




/**
 * PVR.GetBroadcastDetails
 * 
 * Retrieves the details of a specific broadcast
 * 
 * @param broadcastid: $Library.Id
 * @param properties: $PVR.Fields.Broadcast
 * 
 * @returns {
 *   [broadcastdetails] : $PVR.Details.Broadcast
 * }
 */
Kodi.prototype.PVR_GetBroadcastDetails = function(x) {
  return this.rpc.send_msg('PVR.GetBroadcastDetails', x);
};


/**
 * PVR.GetBroadcasts
 * 
 * Retrieves the program of a specific channel
 * 
 * @param channelid: $Library.Id
 * @param properties: $PVR.Fields.Broadcast
 * @param limits: $List.Limits
 * 
 * @returns {
 *   broadcasts : Array<$PVR.Details.Broadcast>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.PVR_GetBroadcasts = function(x) {
  return this.rpc.send_msg('PVR.GetBroadcasts', x);
};


/**
 * PVR.GetChannelDetails
 * 
 * Retrieves the details of a specific channel
 * 
 * @param channelid: $Library.Id
 * @param properties: $PVR.Fields.Channel
 * 
 * @returns {
 *   [channeldetails] : $PVR.Details.Channel
 * }
 */
Kodi.prototype.PVR_GetChannelDetails = function(x) {
  return this.rpc.send_msg('PVR.GetChannelDetails', x);
};


/**
 * PVR.GetChannelGroupDetails
 * 
 * Retrieves the details of a specific channel group
 * 
 * @param channelgroupid: $PVR.ChannelGroup.Id
 * @param channels: {
 *   [limits] : $List.Limits
 *   [properties] : $PVR.Fields.Channel
 * }
 * 
 * @returns {
 *   [channelgroupdetails] : $PVR.Details.ChannelGroup.Extended
 * }
 */
Kodi.prototype.PVR_GetChannelGroupDetails = function(x) {
  return this.rpc.send_msg('PVR.GetChannelGroupDetails', x);
};


/**
 * PVR.GetChannelGroups
 * 
 * Retrieves the channel groups for the specified type
 * 
 * @param channeltype: $PVR.Channel.Type
 * @param limits: $List.Limits
 * 
 * @returns {
 *   channelgroups : Array<$PVR.Details.ChannelGroup>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.PVR_GetChannelGroups = function(x) {
  return this.rpc.send_msg('PVR.GetChannelGroups', x);
};


/**
 * PVR.GetChannels
 * 
 * Retrieves the channel list
 * 
 * @param channelgroupid: $PVR.ChannelGroup.Id
 * @param properties: $PVR.Fields.Channel
 * @param limits: $List.Limits
 * 
 * @returns {
 *   channels : Array<$PVR.Details.Channel>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.PVR_GetChannels = function(x) {
  return this.rpc.send_msg('PVR.GetChannels', x);
};


/**
 * PVR.GetProperties
 * 
 * Retrieves the values of the given properties
 * 
 * @param properties: Array<$PVR.Property.Name>
 * 
 * @returns $PVR.Property.Value
 */
Kodi.prototype.PVR_GetProperties = function(x) {
  return this.rpc.send_msg('PVR.GetProperties', x);
};


/**
 * PVR.GetRecordingDetails
 * 
 * Retrieves the details of a specific recording
 * 
 * @param recordingid: $Library.Id
 * @param properties: $PVR.Fields.Recording
 * 
 * @returns {
 *   [recordingdetails] : $PVR.Details.Recording
 * }
 */
Kodi.prototype.PVR_GetRecordingDetails = function(x) {
  return this.rpc.send_msg('PVR.GetRecordingDetails', x);
};


/**
 * PVR.GetRecordings
 * 
 * Retrieves the recordings
 * 
 * @param properties: $PVR.Fields.Recording
 * @param limits: $List.Limits
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   recordings : Array<$PVR.Details.Recording>
 * }
 */
Kodi.prototype.PVR_GetRecordings = function(x) {
  return this.rpc.send_msg('PVR.GetRecordings', x);
};


/**
 * PVR.GetTimerDetails
 * 
 * Retrieves the details of a specific timer
 * 
 * @param timerid: $Library.Id
 * @param properties: $PVR.Fields.Timer
 * 
 * @returns {
 *   [timerdetails] : $PVR.Details.Timer
 * }
 */
Kodi.prototype.PVR_GetTimerDetails = function(x) {
  return this.rpc.send_msg('PVR.GetTimerDetails', x);
};


/**
 * PVR.GetTimers
 * 
 * Retrieves the timers
 * 
 * @param properties: $PVR.Fields.Timer
 * @param limits: $List.Limits
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   timers : Array<$PVR.Details.Timer>
 * }
 */
Kodi.prototype.PVR_GetTimers = function(x) {
  return this.rpc.send_msg('PVR.GetTimers', x);
};


/**
 * PVR.Record
 * 
 * Toggle recording of a channel
 * 
 * @param record: $Global.Toggle
 * @param channel: string | $Library.Id
 * 
 * @returns string
 */
Kodi.prototype.PVR_Record = function(x) {
  return this.rpc.send_msg('PVR.Record', x);
};


/**
 * PVR.Scan
 * 
 * Starts a channel scan
 * 
 * 
 * @returns string
 */
Kodi.prototype.PVR_Scan = function(x) {
  return this.rpc.send_msg('PVR.Scan', x);
};




/**
 * Player.GetActivePlayers
 * 
 * Returns all active players
 * 
 * 
 * @returns Array<{
 *   playerid : $Player.Id
 *   type : $Player.Type
 * }>
 */
Kodi.prototype.Player_GetActivePlayers = function(x) {
  return this.rpc.send_msg('Player.GetActivePlayers', x);
};


/**
 * Player.GetItem
 * 
 * Retrieves the currently played item
 * 
 * @param playerid: $Player.Id
 * @param properties: $List.Fields.All
 * 
 * @returns {
 *   item : $List.Item.All
 * }
 */
Kodi.prototype.Player_GetItem = function(x) {
  return this.rpc.send_msg('Player.GetItem', x);
};


/**
 * Player.GetProperties
 * 
 * Retrieves the values of the given properties
 * 
 * @param playerid: $Player.Id
 * @param properties: Array<$Player.Property.Name>
 * 
 * @returns $Player.Property.Value
 */
Kodi.prototype.Player_GetProperties = function(x) {
  return this.rpc.send_msg('Player.GetProperties', x);
};


/**
 * Player.GoTo
 * 
 * Go to previous/next/specific item in the playlist
 * 
 * @param playerid: $Player.Id
 * @param to: string | $Playlist.Position
 * 
 * @returns string
 */
Kodi.prototype.Player_GoTo = function(x) {
  return this.rpc.send_msg('Player.GoTo', x);
};


/**
 * Player.Move
 * 
 * If picture is zoomed move viewport left/right/up/down otherwise skip
 * previous/next
 * 
 * @param playerid: $Player.Id
 * @param direction: string
 * 
 * @returns string
 */
Kodi.prototype.Player_Move = function(x) {
  return this.rpc.send_msg('Player.Move', x);
};


/**
 * Player.Open
 * 
 * Start playback of either the playlist with the given ID, a slideshow with the
 * pictures from the given directory or a single file or an item from the
 * database.
 * 
 * @param item: {,  playlistid : $Playlist.Id,  [position] : $Playlist.Position,} | $Playlist.Item | {,  path : string,  [random] : boolean,  [recursive] : boolean,} | {,  [partymode] : string | string,} | {,  channelid : $Library.Id,}
 * @param options: {
 *   [repeat] : null | $Player.Repeat
 *   [resume] : boolean | $Player.Position.Percentage | $Player.Position.Time
 *   [shuffled] : $Optional.Boolean
 * }
 * 
 * @returns string
 */
Kodi.prototype.Player_Open = function(x) {
  return this.rpc.send_msg('Player.Open', x);
};


/**
 * Player.PlayPause
 * 
 * Pauses or unpause playback and returns the new state
 * 
 * @param playerid: $Player.Id
 * @param play: $Global.Toggle
 * 
 * @returns $Player.Speed
 */
Kodi.prototype.Player_PlayPause = function(x) {
  return this.rpc.send_msg('Player.PlayPause', x);
};


/**
 * Player.Rotate
 * 
 * Rotates current picture
 * 
 * @param playerid: $Player.Id
 * @param value: string
 * 
 * @returns string
 */
Kodi.prototype.Player_Rotate = function(x) {
  return this.rpc.send_msg('Player.Rotate', x);
};


/**
 * Player.Seek
 * 
 * Seek through the playing item
 * 
 * @param playerid: $Player.Id
 * @param value: $Player.Position.Percentage | $Player.Position.Time | string
 * 
 * @returns {
 *   [percentage] : $Player.Position.Percentage
 *   [time] : $Global.Time
 *   [totaltime] : $Global.Time
 * }
 */
Kodi.prototype.Player_Seek = function(x) {
  return this.rpc.send_msg('Player.Seek', x);
};


/**
 * Player.SetAudioStream
 * 
 * Set the audio stream played by the player
 * 
 * @param playerid: $Player.Id
 * @param stream: string | integer
 * 
 * @returns string
 */
Kodi.prototype.Player_SetAudioStream = function(x) {
  return this.rpc.send_msg('Player.SetAudioStream', x);
};


/**
 * Player.SetPartymode
 * 
 * Turn partymode on or off
 * 
 * @param playerid: $Player.Id
 * @param partymode: $Global.Toggle
 * 
 * @returns string
 */
Kodi.prototype.Player_SetPartymode = function(x) {
  return this.rpc.send_msg('Player.SetPartymode', x);
};


/**
 * Player.SetRepeat
 * 
 * Set the repeat mode of the player
 * 
 * @param playerid: $Player.Id
 * @param repeat: $Player.Repeat | string
 * 
 * @returns string
 */
Kodi.prototype.Player_SetRepeat = function(x) {
  return this.rpc.send_msg('Player.SetRepeat', x);
};


/**
 * Player.SetShuffle
 * 
 * Shuffle/Unshuffle items in the player
 * 
 * @param playerid: $Player.Id
 * @param shuffle: $Global.Toggle
 * 
 * @returns string
 */
Kodi.prototype.Player_SetShuffle = function(x) {
  return this.rpc.send_msg('Player.SetShuffle', x);
};


/**
 * Player.SetSpeed
 * 
 * Set the speed of the current playback
 * 
 * @param playerid: $Player.Id
 * @param speed: integer | $Global.IncrementDecrement
 * 
 * @returns $Player.Speed
 */
Kodi.prototype.Player_SetSpeed = function(x) {
  return this.rpc.send_msg('Player.SetSpeed', x);
};


/**
 * Player.SetSubtitle
 * 
 * Set the subtitle displayed by the player
 * 
 * @param playerid: $Player.Id
 * @param subtitle: string | integer
 * @param enable: boolean
 * 
 * @returns string
 */
Kodi.prototype.Player_SetSubtitle = function(x) {
  return this.rpc.send_msg('Player.SetSubtitle', x);
};


/**
 * Player.Stop
 * 
 * Stops playback
 * 
 * @param playerid: $Player.Id
 * 
 * @returns string
 */
Kodi.prototype.Player_Stop = function(x) {
  return this.rpc.send_msg('Player.Stop', x);
};


/**
 * Player.Zoom
 * 
 * Zoom current picture
 * 
 * @param playerid: $Player.Id
 * @param zoom: string | integer
 * 
 * @returns string
 */
Kodi.prototype.Player_Zoom = function(x) {
  return this.rpc.send_msg('Player.Zoom', x);
};




/**
 * Playlist.Add
 * 
 * Add item(s) to playlist
 * 
 * @param playlistid: $Playlist.Id
 * @param item: $Playlist.Item | Array<$Playlist.Item>
 * 
 * @returns string
 */
Kodi.prototype.Playlist_Add = function(x) {
  return this.rpc.send_msg('Playlist.Add', x);
};


/**
 * Playlist.Clear
 * 
 * Clear playlist
 * 
 * @param playlistid: $Playlist.Id
 * 
 * @returns string
 */
Kodi.prototype.Playlist_Clear = function(x) {
  return this.rpc.send_msg('Playlist.Clear', x);
};


/**
 * Playlist.GetItems
 * 
 * Get all items from playlist
 * 
 * @param playlistid: $Playlist.Id
 * @param properties: $List.Fields.All
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   items : Array<$List.Item.All>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.Playlist_GetItems = function(x) {
  return this.rpc.send_msg('Playlist.GetItems', x);
};


/**
 * Playlist.GetPlaylists
 * 
 * Returns all existing playlists
 * 
 * 
 * @returns Array<{
 *   playlistid : $Playlist.Id
 *   type : $Playlist.Type
 * }>
 */
Kodi.prototype.Playlist_GetPlaylists = function(x) {
  return this.rpc.send_msg('Playlist.GetPlaylists', x);
};


/**
 * Playlist.GetProperties
 * 
 * Retrieves the values of the given properties
 * 
 * @param playlistid: $Playlist.Id
 * @param properties: Array<$Playlist.Property.Name>
 * 
 * @returns $Playlist.Property.Value
 */
Kodi.prototype.Playlist_GetProperties = function(x) {
  return this.rpc.send_msg('Playlist.GetProperties', x);
};


/**
 * Playlist.Insert
 * 
 * Insert item(s) into playlist. Does not work for picture playlists (aka
 * slideshows).
 * 
 * @param playlistid: $Playlist.Id
 * @param position: $Playlist.Position
 * @param item: $Playlist.Item | Array<$Playlist.Item>
 * 
 * @returns string
 */
Kodi.prototype.Playlist_Insert = function(x) {
  return this.rpc.send_msg('Playlist.Insert', x);
};


/**
 * Playlist.Remove
 * 
 * Remove item from playlist. Does not work for picture playlists (aka
 * slideshows).
 * 
 * @param playlistid: $Playlist.Id
 * @param position: $Playlist.Position
 * 
 * @returns string
 */
Kodi.prototype.Playlist_Remove = function(x) {
  return this.rpc.send_msg('Playlist.Remove', x);
};


/**
 * Playlist.Swap
 * 
 * Swap items in the playlist. Does not work for picture playlists (aka
 * slideshows).
 * 
 * @param playlistid: $Playlist.Id
 * @param position1: $Playlist.Position
 * @param position2: $Playlist.Position
 * 
 * @returns string
 */
Kodi.prototype.Playlist_Swap = function(x) {
  return this.rpc.send_msg('Playlist.Swap', x);
};




/**
 * Profiles.GetCurrentProfile
 * 
 * Retrieve the current profile
 * 
 * @param properties: $Profiles.Fields.Profile
 * 
 * @returns $Profiles.Details.Profile
 */
Kodi.prototype.Profiles_GetCurrentProfile = function(x) {
  return this.rpc.send_msg('Profiles.GetCurrentProfile', x);
};


/**
 * Profiles.GetProfiles
 * 
 * Retrieve all profiles
 * 
 * @param properties: $Profiles.Fields.Profile
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   profiles : Array<$Profiles.Details.Profile>
 * }
 */
Kodi.prototype.Profiles_GetProfiles = function(x) {
  return this.rpc.send_msg('Profiles.GetProfiles', x);
};


/**
 * Profiles.LoadProfile
 * 
 * Load the specified profile
 * 
 * @param profile: string
 * @param prompt: boolean
 * @param password: $Profiles.Password
 * 
 * @returns string
 */
Kodi.prototype.Profiles_LoadProfile = function(x) {
  return this.rpc.send_msg('Profiles.LoadProfile', x);
};




/**
 * Settings.GetCategories
 * 
 * Retrieves all setting categories
 * 
 * @param level: $Setting.Level
 * @param section: string
 * @param properties: unknown
 * 
 * @returns {
 *   [categories] : Array<$Setting.Details.Category>
 * }
 */
Kodi.prototype.Settings_GetCategories = function(x) {
  return this.rpc.send_msg('Settings.GetCategories', x);
};


/**
 * Settings.GetSections
 * 
 * Retrieves all setting sections
 * 
 * @param level: $Setting.Level
 * @param properties: unknown
 * 
 * @returns {
 *   [sections] : Array<$Setting.Details.Section>
 * }
 */
Kodi.prototype.Settings_GetSections = function(x) {
  return this.rpc.send_msg('Settings.GetSections', x);
};


/**
 * Settings.GetSettingValue
 * 
 * Retrieves the value of a setting
 * 
 * @param setting: string
 * 
 * @returns {
 *   value : $Setting.Value.Extended
 * }
 */
Kodi.prototype.Settings_GetSettingValue = function(x) {
  return this.rpc.send_msg('Settings.GetSettingValue', x);
};


/**
 * Settings.GetSettings
 * 
 * Retrieves all settings
 * 
 * @param level: $Setting.Level
 * @param filter: {,  category : string,  section : string,}
 * 
 * @returns {
 *   [settings] : Array<$Setting.Details.Setting>
 * }
 */
Kodi.prototype.Settings_GetSettings = function(x) {
  return this.rpc.send_msg('Settings.GetSettings', x);
};


/**
 * Settings.ResetSettingValue
 * 
 * Resets the value of a setting
 * 
 * @param setting: string
 * 
 * @returns string
 */
Kodi.prototype.Settings_ResetSettingValue = function(x) {
  return this.rpc.send_msg('Settings.ResetSettingValue', x);
};


/**
 * Settings.SetSettingValue
 * 
 * Changes the value of a setting
 * 
 * @param setting: string
 * @param value: $Setting.Value.Extended
 * 
 * @returns boolean
 */
Kodi.prototype.Settings_SetSettingValue = function(x) {
  return this.rpc.send_msg('Settings.SetSettingValue', x);
};




/**
 * System.EjectOpticalDrive
 * 
 * Ejects or closes the optical disc drive (if available)
 * 
 * 
 * @returns string
 */
Kodi.prototype.System_EjectOpticalDrive = function(x) {
  return this.rpc.send_msg('System.EjectOpticalDrive', x);
};


/**
 * System.GetProperties
 * 
 * Retrieves the values of the given properties
 * 
 * @param properties: Array<$System.Property.Name>
 * 
 * @returns $System.Property.Value
 */
Kodi.prototype.System_GetProperties = function(x) {
  return this.rpc.send_msg('System.GetProperties', x);
};


/**
 * System.Hibernate
 * 
 * Puts the system running XBMC into hibernate mode
 * 
 * 
 * @returns string
 */
Kodi.prototype.System_Hibernate = function(x) {
  return this.rpc.send_msg('System.Hibernate', x);
};


/**
 * System.Reboot
 * 
 * Reboots the system running XBMC
 * 
 * 
 * @returns string
 */
Kodi.prototype.System_Reboot = function(x) {
  return this.rpc.send_msg('System.Reboot', x);
};


/**
 * System.Shutdown
 * 
 * Shuts the system running XBMC down
 * 
 * 
 * @returns string
 */
Kodi.prototype.System_Shutdown = function(x) {
  return this.rpc.send_msg('System.Shutdown', x);
};


/**
 * System.Suspend
 * 
 * Suspends the system running XBMC
 * 
 * 
 * @returns string
 */
Kodi.prototype.System_Suspend = function(x) {
  return this.rpc.send_msg('System.Suspend', x);
};




/**
 * Textures.GetTextures
 * 
 * Retrieve all textures
 * 
 * @param properties: $Textures.Fields.Texture
 * @param filter: $List.Filter.Textures
 * 
 * @returns {
 *   textures : Array<$Textures.Details.Texture>
 * }
 */
Kodi.prototype.Textures_GetTextures = function(x) {
  return this.rpc.send_msg('Textures.GetTextures', x);
};


/**
 * Textures.RemoveTexture
 * 
 * Remove the specified texture
 * 
 * @param textureid: $Library.Id
 * 
 * @returns string
 */
Kodi.prototype.Textures_RemoveTexture = function(x) {
  return this.rpc.send_msg('Textures.RemoveTexture', x);
};




/**
 * VideoLibrary.Clean
 * 
 * Cleans the video library from non-existent items
 * 
 * 
 * @returns string
 */
Kodi.prototype.VideoLibrary_Clean = function(x) {
  return this.rpc.send_msg('VideoLibrary.Clean', x);
};


/**
 * VideoLibrary.Export
 * 
 * Exports all items from the video library
 * 
 * @param options: {,  path : string,} | {,  [actorthumbs] : boolean,  [images] : boolean,  [overwrite] : boolean,}
 * 
 * @returns string
 */
Kodi.prototype.VideoLibrary_Export = function(x) {
  return this.rpc.send_msg('VideoLibrary.Export', x);
};


/**
 * VideoLibrary.GetEpisodeDetails
 * 
 * Retrieve details about a specific tv show episode
 * 
 * @param episodeid: $Library.Id
 * @param properties: $Video.Fields.Episode
 * 
 * @returns {
 *   [episodedetails] : $Video.Details.Episode
 * }
 */
Kodi.prototype.VideoLibrary_GetEpisodeDetails = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetEpisodeDetails', x);
};


/**
 * VideoLibrary.GetEpisodes
 * 
 * Retrieve all tv show episodes
 * 
 * @param tvshowid: $Library.Id
 * @param season: integer
 * @param properties: $Video.Fields.Episode
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * @param filter: {,  genreid : $Library.Id,} | {,  genre : string,} | {,  year : integer,} | {,  actor : string,} | {,  director : string,} | $List.Filter.Episodes
 * 
 * @returns {
 *   [episodes] : Array<$Video.Details.Episode>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.VideoLibrary_GetEpisodes = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetEpisodes', x);
};


/**
 * VideoLibrary.GetGenres
 * 
 * Retrieve all genres
 * 
 * @param type: string
 * @param properties: $Library.Fields.Genre
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   genres : Array<$Library.Details.Genre>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.VideoLibrary_GetGenres = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetGenres', x);
};


/**
 * VideoLibrary.GetMovieDetails
 * 
 * Retrieve details about a specific movie
 * 
 * @param movieid: $Library.Id
 * @param properties: $Video.Fields.Movie
 * 
 * @returns {
 *   [moviedetails] : $Video.Details.Movie
 * }
 */
Kodi.prototype.VideoLibrary_GetMovieDetails = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetMovieDetails', x);
};


/**
 * VideoLibrary.GetMovieSetDetails
 * 
 * Retrieve details about a specific movie set
 * 
 * @param setid: $Library.Id
 * @param properties: $Video.Fields.MovieSet
 * @param movies: {
 *   [limits] : $List.Limits
 *   [properties] : $Video.Fields.Movie
 *   [sort] : $List.Sort
 * }
 * 
 * @returns {
 *   [setdetails] : $Video.Details.MovieSet.Extended
 * }
 */
Kodi.prototype.VideoLibrary_GetMovieSetDetails = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetMovieSetDetails', x);
};


/**
 * VideoLibrary.GetMovieSets
 * 
 * Retrieve all movie sets
 * 
 * @param properties: $Video.Fields.MovieSet
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   [sets] : Array<$Video.Details.MovieSet>
 * }
 */
Kodi.prototype.VideoLibrary_GetMovieSets = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetMovieSets', x);
};


/**
 * VideoLibrary.GetMovies
 * 
 * Retrieve all movies
 * 
 * @param properties: $Video.Fields.Movie
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * @param filter: {,  genreid : $Library.Id,} | {,  genre : string,} | {,  year : integer,} | {,  actor : string,} | {,  director : string,} | {,  studio : string,} | {,  country : string,} | {,  setid : $Library.Id,} | {,  set : string,} | {,  tag : string,} | $List.Filter.Movies
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   [movies] : Array<$Video.Details.Movie>
 * }
 */
Kodi.prototype.VideoLibrary_GetMovies = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetMovies', x);
};


/**
 * VideoLibrary.GetMusicVideoDetails
 * 
 * Retrieve details about a specific music video
 * 
 * @param musicvideoid: $Library.Id
 * @param properties: $Video.Fields.MusicVideo
 * 
 * @returns {
 *   [musicvideodetails] : $Video.Details.MusicVideo
 * }
 */
Kodi.prototype.VideoLibrary_GetMusicVideoDetails = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetMusicVideoDetails', x);
};


/**
 * VideoLibrary.GetMusicVideos
 * 
 * Retrieve all music videos
 * 
 * @param properties: $Video.Fields.MusicVideo
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * @param filter: {,  artist : string,} | {,  genreid : $Library.Id,} | {,  genre : string,} | {,  year : integer,} | {,  director : string,} | {,  studio : string,} | {,  tag : string,} | $List.Filter.MusicVideos
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   [musicvideos] : Array<$Video.Details.MusicVideo>
 * }
 */
Kodi.prototype.VideoLibrary_GetMusicVideos = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetMusicVideos', x);
};


/**
 * VideoLibrary.GetRecentlyAddedEpisodes
 * 
 * Retrieve all recently added tv episodes
 * 
 * @param properties: $Video.Fields.Episode
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   [episodes] : Array<$Video.Details.Episode>
 *   limits : $List.LimitsReturned
 * }
 */
Kodi.prototype.VideoLibrary_GetRecentlyAddedEpisodes = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetRecentlyAddedEpisodes', x);
};


/**
 * VideoLibrary.GetRecentlyAddedMovies
 * 
 * Retrieve all recently added movies
 * 
 * @param properties: $Video.Fields.Movie
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   [movies] : Array<$Video.Details.Movie>
 * }
 */
Kodi.prototype.VideoLibrary_GetRecentlyAddedMovies = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetRecentlyAddedMovies', x);
};


/**
 * VideoLibrary.GetRecentlyAddedMusicVideos
 * 
 * Retrieve all recently added music videos
 * 
 * @param properties: $Video.Fields.MusicVideo
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   [musicvideos] : Array<$Video.Details.MusicVideo>
 * }
 */
Kodi.prototype.VideoLibrary_GetRecentlyAddedMusicVideos = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetRecentlyAddedMusicVideos', x);
};


/**
 * VideoLibrary.GetSeasonDetails
 * 
 * Retrieve details about a specific tv show season
 * 
 * @param seasonid: $Library.Id
 * @param properties: $Video.Fields.Season
 * 
 * @returns {
 *   [seasondetails] : $Video.Details.Season
 * }
 */
Kodi.prototype.VideoLibrary_GetSeasonDetails = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetSeasonDetails', x);
};


/**
 * VideoLibrary.GetSeasons
 * 
 * Retrieve all tv seasons
 * 
 * @param tvshowid: $Library.Id
 * @param properties: $Video.Fields.Season
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   [seasons] : Array<$Video.Details.Season>
 * }
 */
Kodi.prototype.VideoLibrary_GetSeasons = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetSeasons', x);
};


/**
 * VideoLibrary.GetTVShowDetails
 * 
 * Retrieve details about a specific tv show
 * 
 * @param tvshowid: $Library.Id
 * @param properties: $Video.Fields.TVShow
 * 
 * @returns {
 *   [tvshowdetails] : $Video.Details.TVShow
 * }
 */
Kodi.prototype.VideoLibrary_GetTVShowDetails = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetTVShowDetails', x);
};


/**
 * VideoLibrary.GetTVShows
 * 
 * Retrieve all tv shows
 * 
 * @param properties: $Video.Fields.TVShow
 * @param limits: $List.Limits
 * @param sort: $List.Sort
 * @param filter: {,  genreid : $Library.Id,} | {,  genre : string,} | {,  year : integer,} | {,  actor : string,} | {,  studio : string,} | {,  tag : string,} | $List.Filter.TVShows
 * 
 * @returns {
 *   limits : $List.LimitsReturned
 *   [tvshows] : Array<$Video.Details.TVShow>
 * }
 */
Kodi.prototype.VideoLibrary_GetTVShows = function(x) {
  return this.rpc.send_msg('VideoLibrary.GetTVShows', x);
};


/**
 * VideoLibrary.RemoveEpisode
 * 
 * Removes the given episode from the library
 * 
 * @param episodeid: $Library.Id
 * 
 * @returns string
 */
Kodi.prototype.VideoLibrary_RemoveEpisode = function(x) {
  return this.rpc.send_msg('VideoLibrary.RemoveEpisode', x);
};


/**
 * VideoLibrary.RemoveMovie
 * 
 * Removes the given movie from the library
 * 
 * @param movieid: $Library.Id
 * 
 * @returns string
 */
Kodi.prototype.VideoLibrary_RemoveMovie = function(x) {
  return this.rpc.send_msg('VideoLibrary.RemoveMovie', x);
};


/**
 * VideoLibrary.RemoveMusicVideo
 * 
 * Removes the given music video from the library
 * 
 * @param musicvideoid: $Library.Id
 * 
 * @returns string
 */
Kodi.prototype.VideoLibrary_RemoveMusicVideo = function(x) {
  return this.rpc.send_msg('VideoLibrary.RemoveMusicVideo', x);
};


/**
 * VideoLibrary.RemoveTVShow
 * 
 * Removes the given tv show from the library
 * 
 * @param tvshowid: $Library.Id
 * 
 * @returns string
 */
Kodi.prototype.VideoLibrary_RemoveTVShow = function(x) {
  return this.rpc.send_msg('VideoLibrary.RemoveTVShow', x);
};


/**
 * VideoLibrary.Scan
 * 
 * Scans the video sources for new library items
 * 
 * @param directory: string
 * 
 * @returns string
 */
Kodi.prototype.VideoLibrary_Scan = function(x) {
  return this.rpc.send_msg('VideoLibrary.Scan', x);
};


/**
 * VideoLibrary.SetEpisodeDetails
 * 
 * Update the given episode with the given details
 * 
 * @param episodeid: $Library.Id
 * @param title: $Optional.String
 * @param playcount: $Optional.Integer
 * @param runtime: $Optional.Integer
 * @param director: null | $Array.String
 * @param plot: $Optional.String
 * @param rating: $Optional.Number
 * @param votes: $Optional.String
 * @param lastplayed: $Optional.String
 * @param writer: null | $Array.String
 * @param firstaired: $Optional.String
 * @param productioncode: $Optional.String
 * @param season: $Optional.Integer
 * @param episode: $Optional.Integer
 * @param originaltitle: $Optional.String
 * @param thumbnail: $Optional.String
 * @param fanart: $Optional.String
 * @param art: null | $Media.Artwork.Set
 * @param resume: null | $Video.Resume
 * 
 * @returns string
 */
Kodi.prototype.VideoLibrary_SetEpisodeDetails = function(x) {
  return this.rpc.send_msg('VideoLibrary.SetEpisodeDetails', x);
};


/**
 * VideoLibrary.SetMovieDetails
 * 
 * Update the given movie with the given details
 * 
 * @param movieid: $Library.Id
 * @param title: $Optional.String
 * @param playcount: $Optional.Integer
 * @param runtime: $Optional.Integer
 * @param director: null | $Array.String
 * @param studio: null | $Array.String
 * @param year: $Optional.Integer
 * @param plot: $Optional.String
 * @param genre: null | $Array.String
 * @param rating: $Optional.Number
 * @param mpaa: $Optional.String
 * @param imdbnumber: $Optional.String
 * @param votes: $Optional.String
 * @param lastplayed: $Optional.String
 * @param originaltitle: $Optional.String
 * @param trailer: $Optional.String
 * @param tagline: $Optional.String
 * @param plotoutline: $Optional.String
 * @param writer: null | $Array.String
 * @param country: null | $Array.String
 * @param top250: $Optional.Integer
 * @param sorttitle: $Optional.String
 * @param set: $Optional.String
 * @param showlink: null | $Array.String
 * @param thumbnail: $Optional.String
 * @param fanart: $Optional.String
 * @param tag: null | $Array.String
 * @param art: null | $Media.Artwork.Set
 * @param resume: null | $Video.Resume
 * 
 * @returns string
 */
Kodi.prototype.VideoLibrary_SetMovieDetails = function(x) {
  return this.rpc.send_msg('VideoLibrary.SetMovieDetails', x);
};


/**
 * VideoLibrary.SetMovieSetDetails
 * 
 * Update the given movie set with the given details
 * 
 * @param setid: $Library.Id
 * @param title: $Optional.String
 * @param art: null | $Media.Artwork.Set
 * 
 * @returns string
 */
Kodi.prototype.VideoLibrary_SetMovieSetDetails = function(x) {
  return this.rpc.send_msg('VideoLibrary.SetMovieSetDetails', x);
};


/**
 * VideoLibrary.SetMusicVideoDetails
 * 
 * Update the given music video with the given details
 * 
 * @param musicvideoid: $Library.Id
 * @param title: $Optional.String
 * @param playcount: $Optional.Integer
 * @param runtime: $Optional.Integer
 * @param director: null | $Array.String
 * @param studio: null | $Array.String
 * @param year: $Optional.Integer
 * @param plot: $Optional.String
 * @param album: $Optional.String
 * @param artist: null | $Array.String
 * @param genre: null | $Array.String
 * @param track: $Optional.Integer
 * @param lastplayed: $Optional.String
 * @param thumbnail: $Optional.String
 * @param fanart: $Optional.String
 * @param tag: null | $Array.String
 * @param art: null | $Media.Artwork.Set
 * @param resume: null | $Video.Resume
 * 
 * @returns string
 */
Kodi.prototype.VideoLibrary_SetMusicVideoDetails = function(x) {
  return this.rpc.send_msg('VideoLibrary.SetMusicVideoDetails', x);
};


/**
 * VideoLibrary.SetSeasonDetails
 * 
 * Update the given season with the given details
 * 
 * @param seasonid: $Library.Id
 * @param art: null | $Media.Artwork.Set
 * 
 * @returns string
 */
Kodi.prototype.VideoLibrary_SetSeasonDetails = function(x) {
  return this.rpc.send_msg('VideoLibrary.SetSeasonDetails', x);
};


/**
 * VideoLibrary.SetTVShowDetails
 * 
 * Update the given tvshow with the given details
 * 
 * @param tvshowid: $Library.Id
 * @param title: $Optional.String
 * @param playcount: $Optional.Integer
 * @param studio: null | $Array.String
 * @param plot: $Optional.String
 * @param genre: null | $Array.String
 * @param rating: $Optional.Number
 * @param mpaa: $Optional.String
 * @param imdbnumber: $Optional.String
 * @param premiered: $Optional.String
 * @param votes: $Optional.String
 * @param lastplayed: $Optional.String
 * @param originaltitle: $Optional.String
 * @param sorttitle: $Optional.String
 * @param episodeguide: $Optional.String
 * @param thumbnail: $Optional.String
 * @param fanart: $Optional.String
 * @param tag: null | $Array.String
 * @param art: null | $Media.Artwork.Set
 * 
 * @returns string
 */
Kodi.prototype.VideoLibrary_SetTVShowDetails = function(x) {
  return this.rpc.send_msg('VideoLibrary.SetTVShowDetails', x);
};




/**
 * XBMC.GetInfoBooleans
 * 
 * Retrieve info booleans about XBMC and the system
 * 
 * @param booleans: Array<string>
 * 
 * @returns object
 */
Kodi.prototype.XBMC_GetInfoBooleans = function(x) {
  return this.rpc.send_msg('XBMC.GetInfoBooleans', x);
};


/**
 * XBMC.GetInfoLabels
 * 
 * Retrieve info labels about XBMC and the system
 * 
 * @param labels: Array<string>
 * 
 * @returns object
 */
Kodi.prototype.XBMC_GetInfoLabels = function(x) {
  return this.rpc.send_msg('XBMC.GetInfoLabels', x);
};


module.exports = Kodi;