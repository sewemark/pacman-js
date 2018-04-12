export default function Game(mapManager, mapRenderer, spiritesManager, uiInterfaceAdapter,
                             redGhost, yellowGhost, blueGhost, player) {

  this.mapManager = mapManager;
  this.spiritesManager = spiritesManager;
  this.uiInterfaceAdapter = uiInterfaceAdapter;
  this.mapRenderer = mapRenderer;
  this.redGhost = redGhost;
  this.yellowGhost = yellowGhost;
  this.blueGhost = blueGhost;
  this.player = player;
  this.ghosts = [this.redGhost, this.blueGhost, this.yellowGhost];
  this.ghostIntervalId;

  this.Start = function () {
    if (!this.ghostIntervalId) {
      this.ghostIntervalId = setInterval(this.UpdateGohosts.bind(this), 200);
    }
    this.mapRenderer.Render();
    this.uiInterfaceAdapter.UpdateUserInfo({
      playerPoints: this.player.GetPoints(),
      playerLifes: this.player.GetLifes()
    });
  };

  this.HandleUserInput = function (direction) {
    this.MoveUser(this.player, direction);
    this.spiritesManager.updateSpirit(direction);
  };

  this.UpdateGhost = function (ghost) {

    TryGetNewPathForGhost.call(this);
    TryMoveGhost.call(this);

    function TryMoveGhost() {
      const position = this.mapManager.GetItemPosition(ghost.GetActorValue());
      var nextPosition = ghost.GetNextGhostPath(position)[0];
      var destinationValue = this.mapManager.GetPositionValue(nextPosition);
      let maxNumOfCollisionResolver = 0;
      while (ghost.CheckCollisionWithOther(destinationValue) && maxNumOfCollisionResolver < 5) {
        ghost.ResestPosition();
        while (ghost.CheckIfNoMoreMoves()) {
          const newPath = this.mapManager.GetNextTripForGhost(ghost.GetActorValue()).path;
          ghost.SetPath(newPath);
        }
        nextPosition = ghost.GetNextGhostPath(position)[0];
        destinationValue = this.mapManager.GetPositionValue(nextPosition);
        maxNumOfCollisionResolver++;
      }

      if (maxNumOfCollisionResolver < 5) {
        const direction = ghost.GetDirection(nextPosition, position);
        this.MoveGhost(ghost, direction, position, destinationValue);
      }
    }

    function TryGetNewPathForGhost() {
      while (ghost.CheckIfNoMoreMoves()) {
        const newPath = this.mapManager.GetNextTripForGhost(ghost.GetActorValue()).path;
        ghost.SetPath(newPath);
      }
    }
  };

  this.UpdateGohosts = function () {
    this.ghosts.reverse();
    this.ghosts.forEach(x => {
      x.ReverseMode();
      this.UpdateGhost.call(this, x);

    });
  };

  this.MoveUser = function (actor, direction) {
    const currentPosition = this.mapManager.GetItemPosition(actor.GetActorValue());
    const destinationValue = this.mapManager.GetDestinationPosition(direction, currentPosition);

    if (actor.CanMoveToPosition(direction, destinationValue)) {

      const newPositions = actor.GetNewPosition(direction, destinationValue);
      this.mapManager.UpdateMap(newPositions);
      this.Start();

      if (this.mapManager.CheckLoose()) {
        this.player.ReduceLife();
        this.CheckGameState();
      }

      if (this.mapManager.CheckWin()) {
        alert('wygrales');
      }
    }
  };

  this.MoveGhost = function (actor, direction, position, destination) {
    const temp = actor.GetNewPosition(direction, destination);
    if (temp.x != position.x || temp.y != position.y) {
      this.mapManager.UpdateMap(actor.GetPendingPositions());
      this.Start();
    }
    if (this.mapManager.CheckLoose()) {
      this.player.ReduceLife();
      this.CheckGameState();
    }
    if (this.mapManager.CheckWin()) {
      alert('wygrales');
    }
  };

  this.CheckGameState = function () {
    if (this.player.GetLifes() <= 0) {
      clearInterval(this.ghostIntervalId);
      this.Start();
    } else {
      this.mapManager.ResetPlayer();
      this.player.ResetPosition();
    }
  };

  this.Close = function () {
    clearInterval(this.ghostIntervalId);
  }
}
