# OpenKarotz MUI #

## Description ##

Mobile User Interface for [OpenKarotz](http://openkarotz.filippi.org/).

## Usage ##

1. Download latest version from [dist folder](https://github.com/hobbe/openkarotz-mui/tree/master/dist).

2. Unzip to your web server documents folder.

3. Modify `config.json` to suit your preferred configuration.

4. Visit http://your.web.server/mui to access OpenKarotz Mobile User Interface.

## Configuration ##

### config.json

The file `config.json` contains the application configuration.

```
{
    "karotz": {
        "host": "localhost",
        "name": "Karotz",
        "voice" : "claire"
    }
}
```

#### `karotz` ####

This section includes the Karotz configuration:
* host: IP address of the Karotz
* name: The Karotz's name, used for application branding
* voice: Karotz's preferred voice in TTS

### LED colors

LED colors may be customized in the `data/colors.json` configuration file.

### Radio stations

Radio stations may be customized in the `data/radios.json` configuration file.

### Stories

Stories may be customized in the `data/stories.json` configuration file.
