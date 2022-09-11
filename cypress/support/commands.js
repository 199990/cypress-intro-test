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


Cypress.Commands.add('added_to_cart', () => {
      //cy.intercept('GET', url).as('cart'); / api

    cy.get('.pb-8.flex-grow > :nth-child(4)').within(() => {
        cy.get(':nth-child(2) > .group > .space-y-2 > .border-b > [data-cy="product-title"] > .absolute').click({force:true});
      });
    
    cy.get('[data-cy="title"]').then($text => {
        const product = $text.text();

    cy.get('.lg\\\:\\grid > .mt-10').within(() => {
        cy.contains('Add to cart').click({force: true});
    });

    cy.wait(1000);   //cy.wait('@cart');
    
    cy.get('.items-end > .relative').within(() => {
        cy.get('.mt-3 > .text-lg').contains('Added to cart');
        cy.get('[data-cy="continue-to-checkout"]').contains('Continue to checkout').click({force:true});
    });
    cy.url().should('include', 'https://sfx.demo.magexo.cloud/cart');
    cy.get('.lg\\\:\\mt-0 > .sticky > :nth-child(2) > .divide-y > .py-6 > .flex-row > .ml-6 > .flex > .min-w-0 > h4.text-sm').contains(product);
    });
})