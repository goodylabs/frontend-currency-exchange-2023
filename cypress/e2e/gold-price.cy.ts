import { apiUrls } from "@utils";

describe("Check for current gold price and charts", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("current gold price should be available", () => {
    cy.intercept(`**/${apiUrls.getCurrentGoldPrice}/**`).then(() => {
      cy.get('[data-test="current-gold-price"]')
        .invoke("text")
        .should("match", /^[0-9]\d*(\.\d+)?$/);
    });
  });

  it("should have gold price chart", () => {
    cy.intercept(`**/${apiUrls.getLastGoldPrices}/**`).then(() => {
      cy.get('[data-test="gold-price-card"]')
        .find("canvas")
        .should("have.length", 2);
    });
  });

  it("quote button should send request", () => {
    cy.intercept(`**/${apiUrls.getLastGoldPrices}/**`).as("api");
    cy.get('[data-test="gold-price-quotes-btn"]').click();
    cy.get('[data-test="gold-price-quotes-item"]').last().click();
    cy.wait("@api");
  });
});
