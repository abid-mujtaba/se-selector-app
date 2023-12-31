# se-selector-app

This is a simple Web Application designed to be run in a browser in a tablet.
It is intended for Special Education (for children with Special Needs).

It will present the child with a pair of objects to select from and
provide appropriate feedback in the form of audio clips.

## Tablet Configuration

To prevent the top drop-down menu (which children can trigger easily) and
which covers the app you can enable "Screen Pinning".
This will "pin" the app to the screen,
and disable the drop-down menu as well as the bottom row buttons.

Apps are unpinned (at least on the Amazon Fire HD) by pressing
the back and app-switcher button simultaneously.

## Log Server

A HTTP Log Server is provided for development purposes.
To launch it: `python3.12 utilities/http_log_server.py`.
All logs from the app will be emitted by this server.

To receive logs from the application look at
the [Access over the LAN](#access-over-the-lan) section.

## Local Development

### Setup

```sh
npm ci
```

### Run dev server

```sh
npm run dev
```

### Access over the LAN

The goal is to run this Web App on a tablet.
For development purposes we want a tablet on the same LAN (Wifi network)
to be able to connect to the dev server running in WSL-2.
This requires opening up certain ports and configuring the firewall.

One time firewall configuration.
Launch Powershell as Admin:

```sh
netsh advfirewall firewall add rule name="Allowing LAN connections" dir=in action=allow protocol=TCP localport=5000
```

This will allow connections on port 5000 through the firewall.

Next we need to find out the IP address for WSL-2.
This tends to change, so every time it does the configuration will have to be reapplied.

To find the WSL-2 IP address (in WSL-2) run:

```sh
ip --brief addr show dev eth0
```

e.g. `172.18.32.56`.

Then (in admin powershell) run:

```sh
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=5000 connectaddress=<wsl ip addr> connectport=8080
```

where `8080` is the port on which the proxy dev server is listening.

This configuration can be verified in the host (containing WSL-2) by
finding the host's IP address (`Network & internet > Wi-Fi > <network name>`,
properties, IPv4 address, e.g. `192.168.1.164`) and
launching a browser on the *host* and navigating to `http://192.168.164:5000`
(note the `5000` in the address).

The same URL should now work from other devices on the LAN.

#### Configure HTTP Log Server Access

In admin Powershell run:

```sh
netsh advfirewall firewall add rule name="Allowing LAN connections (HTTP Log Server)" dir=in action=allow protocol=TCP localport=5100
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=5100 connectaddress=<wsl ip address> connectport=6000
```

where `5100` is the port opened in the host and
`6000` is the local port of the HTTP Log Server running inside WSL.
