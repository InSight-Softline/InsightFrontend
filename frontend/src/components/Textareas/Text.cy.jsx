describe('Text Component', () => {
    beforeEach(() => {
      cy.mount(<Text customStyles="test-class">Sample text content</Text>);
    });
  
    it('should render the text content correctly', () => {
      cy.get('p').should('contain.text', 'Sample text content');
    });
  
    it('should apply custom styles if provided', () => {
      cy.get('p').should('have.class', 'test-class');
    });
  });