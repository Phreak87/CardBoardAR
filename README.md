# CardBoardAR

Cardboard-AR is still under development !
suggestions to new functions are welcome :)

Take a Google Cardboard and Control your Home

For Voice Recognition use a https Web Server and set this page to trusted.

Functions:

- Geolocation combined with Orientation Sensor (Bottom = streetview, Top = weather, else compass)
- Face Detection (Beta)
- QR-Code Detection with FHEM bindings (Based on Aruco Markers)
	(Look at a QRCode and Speak ON or OFF to turn on or off this device)
	(Look at a heater to show temperature statistics)
	(Look at a QRCode and Select on or Off from the menu with your head)
- Battery Status
- Date and Time
- Speech detection with Translation.
- Speech output

Setup:

- Create a local Https Webserver
- Copy the Files and folders into the Webroot folder
- Navigate your Smartphone to your Webserver and trust the certificate.
- permanently allow access to the microphone
- put your Smartphone into the Cardboard
- your Ready to use your AR-Home-System.