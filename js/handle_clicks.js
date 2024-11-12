export function UpdateLeftClick(yPos, xPos, tiles) {
    let clickedTile = tiles[yPos][xPos];
    let newTileType = CalculateNewTileTypeLeftClick(clickedTile.type);
    clickedTile.type = newTileType;
    UpdateConnections(clickedTile, newTileType);

}

export function UpdateRightClick(yPos, xPos, tiles) {
    let clickedTile = tiles[yPos][xPos];
    let newTileType = CalculateNewTileTypeRightClick(clickedTile.type);
    clickedTile.type = newTileType;
    UpdateConnections(clickedTile, newTileType);
}

export function CheckIfWon(yPos, xPos, tiles, lakeTilesNum) {
    let n = tiles.length;
    let direction;
    let connectedTiles = 0;
    let selectedTile;
    let startingXPos;
    let startingYPos;
    do {
        connectedTiles++;
        selectedTile = tiles[yPos][xPos];
        if (selectedTile.connections.up && yPos > 0 && direction !== "down") { 
            yPos--;
            direction = "up";
        } else if(selectedTile.connections.right && xPos < n - 1 && direction !== "left") {
            xPos++;
            direction = "right";
        } else if (selectedTile.connections.down && yPos < n - 1 && direction !== "up") {
            yPos++;
            direction = "down";
        } else if (selectedTile.connections.left && xPos > 0 && direction !== "right") {
            xPos--;
            direction = "left";
        } else {
            return false;
        }
        if (connectedTiles === 1) {
            startingYPos = yPos;
            startingXPos = xPos;
        }
    } while (IsConnected(yPos, xPos, tiles, direction) && (yPos !== startingYPos || xPos !== startingXPos || connectedTiles === 1));
    return connectedTiles === (n * n - lakeTilesNum) + 1;
}

function IsConnected(yPos, xPos, tiles, direction) {
    switch (direction) {
        case "up":
            return tiles[yPos][xPos].connections.down;
        case "right":
            return tiles[yPos][xPos].connections.left;
        case "down":
            return tiles[yPos][xPos].connections.up;
        case "left":
            return tiles[yPos][xPos].connections.right;
    }
    return false;
}

function UpdateConnections(tile, n) {
    if (n === 2 || n === 10) {
        tile.connections.up = true;
        tile.connections.down = true;
        tile.connections.left = false;
        tile.connections.right = false;
    } else if (n === 3 || n === 11) {
        tile.connections.up = false;
        tile.connections.down = false;
        tile.connections.left = true;
        tile.connections.right = true;
    } else if (n === 4 || n === 16) {
        tile.connections.up = false;
        tile.connections.down = true;
        tile.connections.left = false;
        tile.connections.right = true;
    } else if (n === 5 || n === 17) {
        tile.connections.up = false;
        tile.connections.down = true;
        tile.connections.left = true;
        tile.connections.right = false;
    } else if (n === 6 || n === 18) {
        tile.connections.up = true;
        tile.connections.down = false;
        tile.connections.left = true;
        tile.connections.right = false;
    } else if (n === 7 || n === 19) {
        tile.connections.up = true;
        tile.connections.down = false;
        tile.connections.left = false;
        tile.connections.right = true;
    } else {
        tile.connections.up = false;
        tile.connections.down = false;
        tile.connections.left = false;
        tile.connections.right = false;  
    }
}

function CalculateNewTileTypeLeftClick(n) {
    switch (n) {
        case 0:
            return 2;
        case 1:
            return 1;
        case 2:
            return 3;
        case 3:
            return 4;
        case 4:
            return 5;
        case 5:
            return 6;
        case 6:
            return 7;
        case 7:
            return 2;
        case 8:
            return 10;
        case 9:
            return 11;
        case 10:
            return 10;
        case 11:
            return 11;
        case 12:
            return 16;
        case 13:
            return 17;
        case 14:
            return 18;
        case 15:
            return 19;
        case 16:
            return 16;
        case 17:
            return 17;
        case 18:
            return 18;
        case 19:
            return 19;
    }
}

function CalculateNewTileTypeRightClick(n) {
    switch (n) {
        case 0:
            return 0;
        case 1:
            return 1;
        case 2:
            return 0;
        case 3:
            return 0;
        case 4:
            return 0;
        case 5:
            return 0;
        case 6:
            return 0;
        case 7:
            return 0;
        case 8:
            return 8;
        case 9:
            return 9;
        case 10:
            return 8;
        case 11:
            return 9;
        case 12:
            return 12;
        case 13:
            return 13;
        case 14:
            return 14;
        case 15:
            return 15;
        case 16:
            return 12;
        case 17:
            return 13;
        case 18:
            return 14;
        case 19:
            return 15;
    }
}