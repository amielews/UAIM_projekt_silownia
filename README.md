Aby uruchomić projekt należy wykonac poniższe komendy:
```
git clone https://github.com/amielews/UAIM_projekt_silownia.git
cd UAIM_projekt_silownia/frontend
npm install 
cd ..
docker-compose up --build
```
W razie problemów przy budowaniu, należy sprawdzić czy pliki generate_keys.sh oraz start.sh mają odpowiedni dla używanego systemu End of Line Sequence (EOL) i po ewentualnej zmianie, zastosować ponownie komendę:
```
docker-compose up --build
```
