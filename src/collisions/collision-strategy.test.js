import {expect} from 'chai';
import CollisionStrategy from './collision-strategy'
import ActorDefinitions from "../map-definitions/map-config";


describe('CollisionStrategy class tests', () => {

  describe("[1] Basisc tests", ()=> {
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
  });
  describe('[2] checkCollision tests', ()=> {
    it('[1] checkCollision for left direction and proper user position   should return true', () => {
      const mapWidth=40;
      const mapHeight =40;
      const playerPosition = {
        x:3,
        y:5
      };

      const leftDirection = 37;
      const destinationValue = ActorDefinitions.LIFEICON;
      const collisionStrategy = new CollisionStrategy({width:mapWidth, height: mapHeight});

      const isFood = collisionStrategy.checkCollision(leftDirection, playerPosition, destinationValue);

      expect(isFood).to.equal(true);
    });

    it('[2] checkCollision for left direction and out of boundary destination should return false', () => {
      const mapWidth=40;
      const mapHeight =40;
      const playerPosition = {
        x:5,
        y:5
      };

      const leftDirection = 37;
      const destinationValue = ActorDefinitions.LIFEICON;
      const collisionStrategy = new CollisionStrategy({width:mapWidth, height: mapHeight});

      const isFood = collisionStrategy.checkCollision(leftDirection, playerPosition, destinationValue);
      expect(isFood).to.equal(true);

    });

    it('[3] checkCollision for up direction and out of boundary destination should return false', () => {
      const mapWidth=40;
      const mapHeight =40;
      const playerPosition = {
        x:0,
        y:0
      };
      const leftDirection = 38;
      const destinationValue = ActorDefinitions.LIFEICON;
      const collisionStrategy = new CollisionStrategy({width:mapWidth, height: mapHeight});

      const isFood = collisionStrategy.checkCollision(leftDirection, playerPosition, destinationValue);
      expect(isFood).to.equal(false);

    });

    it('[4] checkCollision for right direction and out of boundary destination should return false', () => {
      const mapWidth=40;
      const mapHeight =40;
      const playerPosition = {
        x:40,
        y:0
      };
      const leftDirection = 39;
      const destinationValue = ActorDefinitions.LIFEICON;
      const collisionStrategy = new CollisionStrategy({width:mapWidth, height: mapHeight});

      const isFood = collisionStrategy.checkCollision(leftDirection, playerPosition, destinationValue);
      expect(isFood).to.equal(false);

    });

    it('[5] checkCollision for down direction and out of boundary destination should return false', () => {
      const mapWidth=40;
      const mapHeight =40;
      const playerPosition = {
        x:10,
        y:40
      };
      const leftDirection = 40;
      const destinationValue = ActorDefinitions.LIFEICON;
      const collisionStrategy = new CollisionStrategy({width:mapWidth, height: mapHeight});

      const isFood = collisionStrategy.checkCollision(leftDirection, playerPosition, destinationValue);
      expect(isFood).to.equal(false);

    });

    it('[6] checkCollision for down direction and out of boundary destination should return false', () => {
      const mapWidth=40;
      const mapHeight =40;
      const playerPosition = {
        x:10,
        y:40
      };
      const leftDirection = 40;
      const destinationValue = ActorDefinitions.LIFEICON;
      const collisionStrategy = new CollisionStrategy({width:mapWidth, height: mapHeight});

      const isFood = collisionStrategy.checkCollision(leftDirection, playerPosition, destinationValue);
      expect(isFood).to.equal(false);

    });
  });

  describe('[3] mapUpdater tests', ()=> {
     it('[1] should get pending positions',()=>{
       const mapWidth=129;
       const mapHeight =31;
       const playerPosition = {
         x:3,
         y:12
       };
       const leftDirection = 40;
       const destinationValue = ActorDefinitions.LIFEICON;
       const collisionStrategy = new CollisionStrategy({width:mapWidth, height: mapHeight});

       const newPositions = collisionStrategy.getPendingPositions(leftDirection, playerPosition, destinationValue);

       expect(newPositions.length).to.equal(2);

     })

    it('[2] should get proper new positions for up move',()=>{
      const mapWidth=129;
      const mapHeight =31;
      const playerPosition = {
        x:3,
        y:12
      };
      const topDirection = 40;
      const destinationValue = ActorDefinitions.PLAYER;
      const collisionStrategy = new CollisionStrategy({width:mapWidth, height: mapHeight});

      const newPositions = collisionStrategy.getPendingPositions(topDirection, playerPosition, destinationValue);

      expect(newPositions[0].position.x).to.equal(3);
      expect(newPositions[0].position.y).to.equal(12);
      expect(newPositions[0].value).to.equal(ActorDefinitions.EMPTY);

      expect(newPositions[1].position.x).to.equal(3);
      expect(newPositions[1].position.y).to.equal(13);
      expect(newPositions[1].value).to.equal(destinationValue);

    })

    it('[3] should get proper new positions for left move',()=>{
      const mapWidth=129;
      const mapHeight =31;
      const playerPosition = {
        x:13,
        y:22
      };
      const topDirection = 37;
      const destinationValue = ActorDefinitions.PLAYER;
      const collisionStrategy = new CollisionStrategy({width:mapWidth, height: mapHeight});

      const newPositions = collisionStrategy.getPendingPositions(topDirection, playerPosition, destinationValue);

      expect(newPositions[0].position.x).to.equal(13);
      expect(newPositions[0].position.y).to.equal(22);
      expect(newPositions[0].value).to.equal(ActorDefinitions.EMPTY);

      expect(newPositions[1].position.x).to.equal(12);
      expect(newPositions[1].position.y).to.equal(22);
      expect(newPositions[1].value).to.equal(destinationValue);

    });


  });

});

