cd ../font

npx vite build
mkdir -p ./dist/src/assets
cp ./src/assets/* ./dist/src/assets/

npx vite preview
