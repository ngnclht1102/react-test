export const HOST = 'http://localhost:8080';

export function isElementExists(selector: string) {
  return new Promise((resolve) => {
    /// here if  ele exists or not
    cy.get('body')
      .find(selector)
      .its('length')
      .then((res) => {
        if (res > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
}
