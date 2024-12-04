import Title from './Title.jsx';

describe('Title Component', () => {
    beforeEach(() => {
      cy.mount(<Title>Test Title</Title>);
    });
  
    it('should render the title text correctly', () => {
      cy.get('h4').should('contain.text', 'Test Title');
    });
  
    it('should have centered alignment', () => {
      cy.get('h4').should('have.css', 'text-align', 'center');
    });
  });