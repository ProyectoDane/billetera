export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_202.jdk/Contents/Home
nvm use 14
npx http-server -p 8000 dist &

# DELETE ANY PREVIOUS BUILD
rm -rd dist

# EXPORT BUNDLE
expo export --dev --public-url http://127.0.0.1:8000

# BUILD USING TURTLE
EXPO_ANDROID_KEYSTORE_PASSWORD="keystorepassword" \
EXPO_ANDROID_KEY_PASSWORD="keypassword" \
turtle build:android \
  --type apk \
  --keystore-path ~/Downloads/keystore.jks \
  --keystore-alias "keyalias" \
  --allow-non-https-public-url \
  --public-url http://127.0.0.1:8000/android-index.json