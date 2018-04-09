import {expect} from 'chai';
import Game from './game';

describe('Game class tests', () => {
  it('should create Game', () => {

    let mockedMapManager = {
      getLevelInfo: function () {
        return 0;
      }
    }
    const game = new Game(mockedMapManager, undefined, undefined, undefined);
    expect(game).to.be.defined;
  });
});

