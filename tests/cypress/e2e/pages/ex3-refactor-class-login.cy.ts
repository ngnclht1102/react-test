import { HOST } from 'tests/cypress/cypress.utils';

const URL = `${HOST}/login`;

describe('Should render correclty on init', () => {
  it('passes', () => {
    cy.visit(URL).then(() => {
      cy.get('[data-cy="container"]').should('be.visible');
      cy.get('[data-cy="title"]').should('be.visible');
      cy.get('[data-cy="textinput_email"]').should('be.visible');
      cy.get('[data-cy="textinput_password"]').should('be.visible');
      cy.get('[data-cy="submit"]').should('be.visible');
    });
  });
});

describe('Should show alert after 5 seconds', () => {
  it('passes', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.visit(URL)
      .wait(5100)
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you need help?');
      });
  });
});

describe('Should handle submit button when user has entered username and password', () => {
  it('passes', () => {
    cy.visit(URL)
      .wait(5100)
      .then(() => {
        const stub = cy.stub();
        const user = 'brian.nguyen.work@gmail.com';
        const password = '1(7hYM4@Acsdd!@#';
        cy.on('window:alert', stub);
        cy.get('[data-cy="textinput_email"]').type('brian.nguyen.work@gmail.com');
        cy.get('[data-cy="textinput_password"]').type('1(7hYM4@Acsdd!@#');
        cy.get('[data-cy="submit"]')
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Login submitted: ' + user + ', ' + password);
          });
      });
  });
});

describe('Should show error message if user hasnot entered username and password', () => {
  it('passes', () => {
    cy.visit(URL)
      .wait(5100)
      .then(() => {
        const stub = cy.stub();
        cy.on('window:alert', stub);
        cy.get('[data-cy="submit"]')
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith('You have not entered username and password yet');
          });
      });
  });
});
