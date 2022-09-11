import * as testFixtures from '../fixtures/test_fixtures.json'

describe('MageXo intro test', () => {
  beforeEach(() => {
    cy.visit(testFixtures.env.homepage)

    //hint: want different view? use cy.viewport command!
  })

  context('Newsletter', () => {
    it('Sign for a newsletter', () => {

      cy.get('#newsletter').click({force: true}).type(testFixtures.user.email);
      cy.get('.flex-shrink-0 > .border').contains('Sign up').click();
    /*    
        cy.request({
            method: 'GET', 
            url: email service,
            headers: {
                accept: //'application/json, text/plain,',
                authorization: token }
                 }).then( response => {
                      expect(response.body[0].to_email).to.include(testFixtures.user.email);
                    });
                });
    })
    */
    })
  })

  context('Shopping cart', () => {
    it('Add an item to shopping cart', () => {
      
      cy.added_to_cart();

    })

    it('Remove item from shopping cart', () => {
      //cy.request('POST', "url"/cart/product/prodictId"???");
      //cy.request('GET', "url"/cart).as('cart');

      cy.added_to_cart();

      cy.get('.lg\\\:\\mt-0 > .sticky > :nth-child(2)').find('button').eq(0).click({force:true});
      
      cy.get('.items-end > .relative').within(() => {
          cy.contains('Remove').click({force:true});
      });
      cy.get('.bg-gray-50.flex-grow').contains('Your cart is empty');
    })


    it('Place order', () => {
      
      cy.added_to_cart();
    
      cy.get('[data-shipping-method="flatrate_flatrate"]').click({force: true});
      cy.get('[data-payment-method="braintree"]').click({force: true});

      cy.get('form.grid').within(() => {
        cy.get('#email').click().type(testFixtures.user.email);
        cy.get('#telephone').click().type(testFixtures.user.phoneNumber); // + phoneNumberPredial
        cy.get('#firstName').click().type(testFixtures.user.firstName);
        cy.get('#lastName').click().type(testFixtures.user.lastName);
        cy.get('#street').click().type(testFixtures.address.personal.street);
        cy.get('#city').click().type(testFixtures.address.personal.city);
        cy.get('#postcode').click().type('TD9 0LG');
    });

      cy.get('.lg\\\:\\mt-0 > .sticky > :nth-child(2)').within(() => {
        cy.get(' > .divide-y > .py-6 > .mt-2 > .mt-1 > .text-lg').then($text => {
            const price = $text.text();
        
        cy.get(' > .space-y-6 > :nth-child(1) > .text-gray-900').then($text => {
            const subtotal = $text.text();
            expect(subtotal).is.eq(price);

        cy.get(' > .space-y-6 > :nth-child(2) > .text-gray-900').then($text => {
            const shipping = $text.text();    
    // then save the value from the items "Total" and "VAT" and check the calculation; by converting string to number
        });
      });
    });
  });
});
})

  context('Search bar', () => {
    it('Search for an item and open it', () => {
     // cy.intercept('GET', `api('')`).as('getSearch')
      cy.get("input").eq(0).click({force:true}).type('HP CE732A printer kit Maintenance kit');
     // cy.wait('@getSearch').its('status').should('eq', 200)
     // control of autocomplete cy.get('').should('be.visible')
      cy.wait(1000);
      cy.get('.relative > .py-2').children().eq(0).click({force:true});
    // check that we are on the right product
    })

    // i m not sure
    it('Filter brand while searching', () => {
      cy.log('remove before flight')
      //hint: try to use GraphQL and intercepts here
    })

    it('Filter price while searching', () => {
      cy.log('remove before flight')
      //hint: try to use GraphQL and intercepts here
    })
  })
})
