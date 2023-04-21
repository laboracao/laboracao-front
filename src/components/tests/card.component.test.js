import renderer from 'react-test-renderer';
import CardComponent from '../card.component';

describe('1º card component', () => {
    const component = renderer.create(<CardComponent bg={1} />)
    let tree = component.toJSON();

    it('color of first card is red', () => {
        expect(tree.props.background).toEqual("#DA3941");
    })
    
    it('color of first card isnt red', () => {
        expect(tree.props.background).not.toEqual("#E2572F");
    })
});