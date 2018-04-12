import {expect} from 'chai';
import Game from './game';

describe('Game class tests', () => {
  it('[1] should create Game', () => {

    let mockedMapManager = {
      GetLevelInfo: function () {
        return 0;
      }
    };
    const game = new Game(mockedMapManager, undefined, undefined, undefined, undefined, undefined,
                          undefined,undefined,undefined, undefined, undefined);
    expect(game).to.be.defined;
  });

  it('[1] should create Game', () => {

    let mockedMapManager = {
      GetLevelInfo: function () {
        return 0;
      }
    };
    let mockedMapRenderer = {
      Render: function () {
        return 0;
      }
    };

    let mockedMapUIAdapter  = {
      UpdateUserInfo: function () {
        return 0;
      }
    };
    let mockedPlayer = {
      GetPoints: function () {
          return 1111;
      },
      GetLifes: function () {

      }
    };
    const game = new Game(mockedMapManager, mockedMapRenderer, undefined, mockedMapUIAdapter, undefined, undefined, undefined, mockedPlayer);
    //game.Start();

  });
});

