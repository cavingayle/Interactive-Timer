describe('Timer loads on port 8080', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080')
  })
})