import { HOST } from 'tests/cypress/cypress.utils';

const URL = `${HOST}/counter`;

describe('Should render correclty on init', () => {
  it('passes', () => {
    cy.visit(URL).then(() => {
      cy.get('[data-cy="container"]').should('be.visible');
      cy.get('[data-cy="value"]').should('be.visible');
      cy.get('[data-cy="value"]').then((element) => {
        expect(element.text()).to.be.eq('Current counter value: 0');
      });
      cy.get('[data-cy="increaseBtn"]').then((element) => {
        expect(element.text()).to.be.eq('Click to increase by 1');
      });
    });
  });
});

describe('Increase button should work with default step', () => {
  it('passes', () => {
    cy.visit(URL).then(() => {
      cy.get('[data-cy="increaseBtn"]')
        .then((element) => {
          expect(element.text()).to.be.eq('Click to increase by 1');
        })
        .click()
        .wait(100)
        .then(() => {
          cy.get('[data-cy="value"]').then((element) => {
            expect(element.text()).to.be.eq('Current counter value: 1');
          });

          cy.get('[data-cy="increaseBtn"]')
            .click()
            .wait(100)
            .then(() => {
              cy.get('[data-cy="value"]').then((element) => {
                expect(element.text()).to.be.eq('Current counter value: 2');
              });
            });
        });
    });
  });
});

describe('Decrease button should work with default step', () => {
  it('passes', () => {
    cy.visit(URL).then(() => {
      cy.get('[data-cy="increaseBtn"]')
        .then((element) => {
          expect(element.text()).to.be.eq('Click to increase by 1');
        })
        .click()
        .wait(100)
        .click()
        .wait(100)
        .click()
        .then(() => {
          cy.get('[data-cy="decreaseBtn"]')
            .then((element) => {
              expect(element.text()).to.be.eq('Click to decrease by 1');
            })
            .click()
            .wait(100)
            .then(() => {
              cy.get('[data-cy="value"]').then((element) => {
                expect(element.text()).to.be.eq('Current counter value: 2');
              });

              cy.get('[data-cy="decreaseBtn"]')
                .click()
                .wait(100)
                .then(() => {
                  cy.get('[data-cy="value"]').then((element) => {
                    expect(element.text()).to.be.eq('Current counter value: 1');
                  });
                });
            });
        });
    });
  });
});

describe('Value never be less than zero', () => {
  it('passes', () => {
    cy.visit(URL).then(() => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get('[data-cy="increaseBtn"]')
        .then((element) => {
          expect(element.text()).to.be.eq('Click to increase by 1');
        })
        .click()
        .wait(100)
        .then(() => {
          cy.get('[data-cy="decreaseBtn"]')
            .then((element) => {
              expect(element.text()).to.be.eq('Click to decrease by 1');
            })
            .click()
            .wait(100)
            .click()
            .wait(100)
            .click()
            .wait(100)
            .click()
            .wait(100)
            .then(() => {
              cy.get('[data-cy="value"]').then((element) => {
                expect(element.text()).to.be.eq('Current counter value: 0');
              });
              expect(stub.getCall(0)).to.be.calledWith("Can't decrease more!");
            });
        });
    });
  });
});

describe('Change step should work', () => {
  it('passes', () => {
    cy.visit(URL).then(() => {
      cy.get('[data-cy="selectStep"]')
        .select('5')
        .then(() => {
          cy.get('[data-cy="increaseBtn"]')
            .then((element) => {
              expect(element.text()).to.be.eq('Click to increase by 5');
            })
            .click()
            .wait(100)
            .then(() => {
              cy.get('[data-cy="value"]').then((element) => {
                expect(element.text()).to.be.eq('Current counter value: 5');
              });
            });
        });
      cy.get('[data-cy="selectStep"]')
        .select('10')
        .then(() => {
          cy.get('[data-cy="increaseBtn"]')
            .then((element) => {
              expect(element.text()).to.be.eq('Click to increase by 10');
            })
            .click()
            .wait(100)
            .then(() => {
              cy.get('[data-cy="value"]').then((element) => {
                expect(element.text()).to.be.eq('Current counter value: 15');
              });
            });
        });
    });
  });
});
