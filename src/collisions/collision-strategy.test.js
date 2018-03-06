import {expect} from 'chai';
import CollisionStrategy from './collision-strategy'
import ActorDefinitions from "../map-definitions/map-config";


describe('CollisionStrategy class tests', () => {
  it('[1] should create collision strategy', () => {
    const mapWidth=40;
    const mapHeight =40;

    const collisionStrategy = new CollisionStrategy(mapWidth, mapHeight);

    expect(collisionStrategy).not.to.be.undefined;
  });

  it('[2] check food against food value should return true', () => {
    const mapWidth=40;
    const mapHeight =40;
    const collisionStrategy = new CollisionStrategy(mapWidth, mapHeight);

    const isFood = collisionStrategy.checkFood(ActorDefinitions.FOOD);

    expect(isFood).to.equal(true);
  });

  it('[3] check food against not food value should return false', () => {
    const mapWidth=40;
    const mapHeight =40;
    const collisionStrategy = new CollisionStrategy(mapWidth, mapHeight);

    const isFood = collisionStrategy.checkFood(ActorDefinitions.PLAYER);

    expect(isFood).to.equal(false);
  });

  it('[4] checkCollision for left direction and proper user position   should return true', () => {
    const mapWidth=40;
    const mapHeight =40;
    const playerPosition = {
      x:10,
      y:5
    };

    const leftDirection = 37;
    const destinationValue = ActorDefinitions.LIFEICON;
    const collisionStrategy = new CollisionStrategy(mapWidth, mapHeight);

    const isFood = collisionStrategy.checkCollision(leftDirection, playerPosition, destinationValue);

    expect(isFood).to.equal(true);
  });

  it('[5] checkCollision for left direction and out of boundary destination should return false', () => {
    const mapWidth=40;
    const mapHeight =40;
    const playerPosition = {
      x:0,
      y:5
    };

    const leftDirection = 37;
    const destinationValue = ActorDefinitions.LIFEICON;
    const collisionStrategy = new CollisionStrategy(mapWidth, mapHeight);

    const isFood = collisionStrategy.checkCollision(leftDirection, playerPosition, destinationValue);
    expect(isFood).to.equal(false);

  });

  it('[6] checkCollision for up direction and out of boundary destination should return false', () => {
    const mapWidth=40;
    const mapHeight =40;
    const playerPosition = {
      x:0,
      y:0
    };
    const leftDirection = 38;
    const destinationValue = ActorDefinitions.LIFEICON;
    const collisionStrategy = new CollisionStrategy(mapWidth, mapHeight);

    const isFood = collisionStrategy.checkCollision(leftDirection, playerPosition, destinationValue);
    expect(isFood).to.equal(false);

  });

  it('[7] checkCollision for right direction and out of boundary destination should return false', () => {
    const mapWidth=40;
    const mapHeight =40;
    const playerPosition = {
      x:40,
      y:0
    };
    const leftDirection = 39;
    const destinationValue = ActorDefinitions.LIFEICON;
    const collisionStrategy = new CollisionStrategy(mapWidth, mapHeight);

    const isFood = collisionStrategy.checkCollision(leftDirection, playerPosition, destinationValue);
    expect(isFood).to.equal(false);

  });

  it('[8] checkCollision for down direction and out of boundary destination should return false', () => {
    const mapWidth=40;
    const mapHeight =40;
    const playerPosition = {
      x:10,
      y:40
    };
    const leftDirection = 40;
    const destinationValue = ActorDefinitions.LIFEICON;
    const collisionStrategy = new CollisionStrategy(mapWidth, mapHeight);

    const isFood = collisionStrategy.checkCollision(leftDirection, playerPosition, destinationValue);
    expect(isFood).to.equal(false);

  });
});

