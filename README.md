# Seed-Splitter
Simple website/application to split confidential secrets such as a cryptocurrency seed into shares using the Shamir Secret Sharing Scheme. Feel free to add more word lists.
This page is meant to function without connecting to the internet or somehow
transimitting any kind of data. For a hosted version you can checkout [maybez.io](https://maybez.io/utils/seed-splitter)

## Contributing
If you find a security issue please email me at security@maybez.io. Otherwise if
you'd like to improve the app or add any features simply make a pull request.
Don't go overboard though since the idea behind this app is to make it as
lightweight and simplistic as possible and to avoid unnecessary dependencies.

## Usage
1. Clone repo to a one time use device
2. Download the secrets.min.js file from the original repo (https://github.com/grempe/secrets.js ) **OPTIONAL**
3. Disconnect your device from all kinds of wireless or other network
   connections
4. Split your password or seed into necessary shares.
5. Preferably write them down on a slip of paper or print them out since they
   can be pretty long.
6. Wipe device completely before using again with internet.

## Shamir Secret Sharing implementation
The shamir secret sharing libary (secrets.min.js) was taken from [here](https://github.com/grempe/secrets.js).

**NOTE:**
The software is provided "as is", without warranty of any kind, express or
implied, including but not limited to the warranties of merchantability,
fitness for a particular purpose and noninfringement. In no event shall the
authors or copyright holders be liable for any claim, damages or other
liability, whether in an action of contract, tort or otherwise, arising from,
out of or in connection with the software or the use or other dealings in the
software.

