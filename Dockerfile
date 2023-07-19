FROM cypress/included:12.2.0


WORKDIR /app
COPY . .


RUN npm install 

ENTRYPOINT ["npm", "run", "cypress-UI-regression-pack"]