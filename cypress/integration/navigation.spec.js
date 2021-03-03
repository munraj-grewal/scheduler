describe("Navigation", () => {
  
  beforeEach(() => {

    cy.request("http://localhost:8001/api/debug/reset");

  });
  
  it("should visit root", () => {

    cy.visit("/");

  });

  it("should navigate to Tuesday", () => {

    cy.visit("/");
    cy.contains('[data-testid="day"]', 'Tuesday').click().should("have.class", "day-list__item--selected");

  });

});