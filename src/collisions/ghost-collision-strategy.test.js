import {expect} from 'chai';
import CollisionStrategy from './collision-strategy'
import ActorDefinitions from "../map-definitions/map-config";
import Ghost from "../ghosts/ghost";
import GhostCollisionStartegy from "./ghost-collision-strategy";


describe('GhostCollisionStrategy class tests', () => {

  describe("[1] Basic tests", ()=> {
    it('[1] should create collision strategy', () => {
      const mapWidth=40;
      const mapHeight =40;

      const ghostCollisionStrategy = new GhostCollisionStartegy({width:mapWidth, height:mapHeight});

      expect(ghostCollisionStrategy).not.to.be.undefined;
    });

    it('[2] check win against player value should return true', () => {
      const mapWidth=40;
      const mapHeight =40;

      const ghostCollisionStrategy = new GhostCollisionStartegy({width:mapWidth, height:mapHeight});
      const result  = ghostCollisionStrategy.checkWin(ActorDefinitions.PLAYER);
      expect(result).to.equal(true);
    });

    it('[3] check win against non player value should return false', () => {
      const mapWidth=40;
      const mapHeight =40;

      const ghostCollisionStrategy = new GhostCollisionStartegy({width:mapWidth, height:mapHeight});
      const result  = ghostCollisionStrategy.checkWin(ActorDefinitions.LIFEICON);
      expect(result).to.equal(false);
    });

    it('[4] check collisions with other ghost against ghost value should return true', () => {
      const mapWidth=40;
      const mapHeight =40;

      const ghostCollisionStrategy = new GhostCollisionStartegy({width:mapWidth, height:mapHeight});
      const result  = ghostCollisionStrategy.checkCollisionWithOther(ActorDefinitions.LIFEICON);
      expect(result).to.equal(false);
    });

    it('[5] check collisions with other ghost against ghost value should return false', () => {
      const mapWidth=40;
      const mapHeight =40;

      const ghostCollisionStrategy = new GhostCollisionStartegy({width:mapWidth, height:mapHeight});
      const result  = ghostCollisionStrategy.checkCollisionWithOther(ActorDefinitions.REDGHOST);
      expect(result).to.equal(true);
    });

    it('[6] check collisions with other ghost against ghost value should return false', () => {
      const mapWidth=40;
      const mapHeight =40;

      const ghostCollisionStrategy = new GhostCollisionStartegy({width:mapWidth, height:mapHeight});
      const result  = ghostCollisionStrategy.checkCollisionWithOther(ActorDefinitions.YELLOWGHOST);
      expect(result).to.equal(true);
    });

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



  });

  describe("[1] Basic tests", ()=> {
    it('[1] should get pending positions',()=>{
      const mapWidth=129;
      const mapHeight =31;
      const playerPosition = {
        x:3,
        y:12
      };
      const leftDirection = 40;
      const destinationValue = ActorDefinitions.LIFEICON;
      const ghostcollisionStrategy = new GhostCollisionStartegy({width:mapWidth, height: mapHeight});

      const newPositions = ghostcollisionStrategy.getPendingPositions(leftDirection, playerPosition, destinationValue);

      expect(newPositions.length).to.equal(2);

    })

    it('[2] should get proper new positions for up move',()=>{
      const mapWidth=129;
      const mapHeight =31;
      const ghostPosition = {
        x:3,
        y:12
      };
      const topDirection = 40;
      const destinationValue = ActorDefinitions.REDGHOST;
      const ghostCollisionStrategy = new GhostCollisionStartegy({width:mapWidth, height: mapHeight});

      const newPositions = ghostCollisionStrategy.getPendingPositions(topDirection, ghostPosition, destinationValue);

      expect(newPositions[0].position.x).to.equal(3);
      expect(newPositions[0].position.y).to.equal(12);
      expect(newPositions[0].value).to.equal(ActorDefinitions.EMPTY);

      expect(newPositions[1].position.x).to.equal(3);
      expect(newPositions[1].position.y).to.equal(13);
      expect(newPositions[1].value).to.equal(destinationValue);

    })
  });

});

