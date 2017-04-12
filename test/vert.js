import chai from 'chai';
import Vert from './../src/vert';

const expect = chai.expect;

describe('Vert', () => {

  let vert;

  beforeEach(() => {
    vert = new Vert();
  });

  it('should be defined', () => {
    expect(vert).to.not.be.undefined;
  });

});
