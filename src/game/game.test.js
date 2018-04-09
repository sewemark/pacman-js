import {expect} from 'chai';
import Game from './game';

describe('Game class tests', () => {
  it('[1] should create Game', () => {

    let mockedMapManager = {
      getLevelInfo: function () {
        return 0;
      }
    };
    const game = new Game(mockedMapManager, undefined, undefined, undefined, undefined, undefined,
                          undefined,undefined,undefined, undefined);
    expect(game).to.be.defined;
  });

  it('[1] should create Game', () => {

    let mockedMapManager = {
      getLevelInfo: function () {
        return 0;
      }
    };
    let mockedMapRenderer = {
      render: function () {
        return 0;
      }
    };

    let mockedMapUIAdapter  = {
      updateUserInfo: function () {
        return 0;
      }
    };
    let mockedPlayer = {
      getPoints: function () {
          return 1111;
      },
      getLifes: function () {

      }
    };
    const game = new Game(mockedMapManager, mockedMapRenderer, undefined, mockedMapUIAdapter, undefined, undefined, mockedPlayer);
    game.Start();

  });
});

