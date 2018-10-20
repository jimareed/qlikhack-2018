FROM node
COPY src/example-3 .
RUN npm install
EXPOSE 8000
CMD ["node", "index.js"]
