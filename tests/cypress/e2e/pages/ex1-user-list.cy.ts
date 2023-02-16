import { HOST } from 'tests/cypress/cypress.utils';
import { BASE_URL } from '../../../../src/pages/user-list/constants';

const URL = `${HOST}/user-list`;

describe('Should render correclty on init', () => {
  it('passes', () => {
    cy.visit(URL).then(() => {
      cy.intercept('get', `${BASE_URL}/users`).as('getUsers');
      cy.get('#loading').should('be.visible');
      cy.get('#container').should('not.exist');
      cy.get('#error').should('not.exist');
      cy.get('#refresh-button').should('not.exist');
    });
  });
});

describe('Should render correclty if API return data', () => {
  it('passes', () => {
    cy.visit(URL).then(() => {
      cy.intercept('get', `${BASE_URL}/users`).as('getUsers');
      cy.wait('@getUsers').then((interception) => {
        if (interception?.response?.body?.length) {
          cy.get('#loading').should('not.exist');
          cy.get('#container').should('exist');
          cy.get('#error').should('not.exist');
          cy.get('#refresh-button').should('exist');
        }
      });
    });
  });
});

describe('Should show error message, render refresh button if calling API failed', () => {
  it('passes', () => {
    cy.visit(URL).then(() => {
      cy.intercept('get', `${BASE_URL}/users`, {
        statusCode: 500,
      }).as('getUsers');
      cy.wait('@getUsers').then((interception) => {
        cy.get('#loading').should('not.exist');
        cy.get('#container').should('not.exist');
        cy.get('#error').should('exist');
        cy.get('#error h1').should('exist');
        cy.get('#refresh-button').should('exist');
      });
    });
  });
});

describe('Should not render list, instead render only loading on refresh button clicked', () => {
  it('passes', () => {
    cy.visit(URL).then(() => {
      cy.intercept('get', `${BASE_URL}/users`).as('getUsers');
      cy.wait('@getUsers').then((interception) => {
        // CLICK REFRESH BUTTON AFTER THE FIRST API CALL IS DONE
        cy.get('#refresh-button').click(() => {
          cy.get('#loading').should('exist');
          cy.get('#container').should('not.exist');
        });
      });
    });
  });
});

describe('It call API successfully on refresh button clicked', () => {
  it('passes', () => {
    cy.visit(URL).then(() => {
      cy.intercept('get', `${BASE_URL}/users`).as('getUsers');
      cy.wait('@getUsers').then((interception) => {
        // CLICK REFRESH BUTTON AFTER THE FIRST API CALL IS DONE
        cy.get('#refresh-button')
          .click()
          .then(() => {
            cy.wait('@getUsers').then((interception) => {
              if (interception?.response?.body?.length) {
                cy.get('#loading').should('not.exist');
                cy.get('#container').should('exist');
                cy.get('#error').should('not.exist');
                cy.get('#refresh-button').should('exist');
              }
            });
          });
      });
    });
  });
});

// TODO: write test for click View on Map button
