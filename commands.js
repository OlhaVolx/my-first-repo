// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from '@faker-js/faker';

const API_URL = Cypress.env('API_URL');
const TOKEN = Cypress.env('TOKEN');
const TEAM_ID = Cypress.env('TEAM_ID');

Cypress.Commands.add('sendRequest', (endpoint,method,body=null, options = {}) => {
    return cy.request({
        url: `${API_URL}${endpoint}`,
        method: method,
        headers:{
            Authorization: TOKEN,
            'Content-Type': 'application/json',
        },
        body: body,
        ...options // `...options` — це "оператор розгортання" (spread-оператор). Він дозволяє додати всі властивості з об'єкта `options` до іншого об'єкта.
// У цьому випадку це потрібно, щоб будь-які додаткові параметри (наприклад, { failOnStatusCode: false }) передавалися далі у `cy.request`.

    })
})
Cypress.Commands.add('createGoal', (endpoint,method,body=null) => {
  return cy.sendRequest(`/team/${TEAM_ID}/goal`,'POST', {
      name: faker.internet.username(),
  })
})
Cypress.Commands.add('updateGoal', (goalId, updateBody) => {
    return cy.sendRequest(`/goal/${goalId}`, 'PUT', updateBody)
})
Cypress.Commands.add('deleteGoal', (goalId) => {
    return cy.sendRequest(`/goal/${goalId}`, 'DELETE');
});
