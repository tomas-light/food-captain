## Creating self-signed certificate

### Windows 11

Open Git Bash (generally installed together with Git on Windows)

https://gist.github.com/cecilemuller/9492b848eb8fe46d462abeb26656c4f8
navigate to `localhostCertificates` directory
```bash
cd ./localhostCertificates
```

```bash
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 \
  -nodes -keyout private-key.key -out certificate.crt -subj "//CN=food-captain.team" \
  -addext "subjectAltName=\
  DNS:localhost.food-captain,\
  DNS:localhost"
```
```bash
openssl pkcs12 -export -out certificate.pfx -inkey private-key.key -in certificate.crt
```