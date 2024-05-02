FROM node:20.4.0 AS builder

WORKDIR /temp

RUN npm config set strict-ssl false
RUN npm config set registry http://registry.npmjs.org/

COPY . .

RUN npm install

RUN npm run build

#########=========> 

FROM node:20.4.0 AS server

WORKDIR /app

# We only require these 5 folders/files for nextjs apps in production
COPY --from=builder /temp/next.config.js ./
COPY --from=builder /temp/public ./public
COPY --from=builder /temp/.next ./.next
COPY --from=builder /temp/node_modules ./node_modules
COPY --from=builder /temp/package.json ./package.json


CMD [ "npm", "run", "start" ]