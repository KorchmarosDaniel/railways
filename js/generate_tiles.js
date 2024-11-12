function createTile() {
    return {
        connections: { up: false, right: false, down: false, left: false },
        type: 0
    }
}

export function GenerateTiles(m) {
    const n = m < 6 ? 5 : 7;
    const tiles = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(createTile());
        }
        tiles.push(row);
    }
    CreateLevel(m, tiles);
    return tiles;
}

function CreateLevel(m, tiles) {
    switch (m) {
        case 1:
            CreateLvl1(tiles);
            break;
        case 2:
            CreateLvl2(tiles);
            break;
        case 3:
            CreateLvl3(tiles);
            break;
        case 4:
            CreateLvl4(tiles);
            break;
        case 5:
            CreateLvl5(tiles);
            break;
        case 6:
            CreateLvl6(tiles);
            break;
        case 7:
            CreateLvl7(tiles);
            break;
        case 8:
            CreateLvl8(tiles);
            break;
        case 9:
            CreateLvl9(tiles);
            break;
        case 10:
            CreateLvl10(tiles);
            break;
        default:
            break;
    }
}

function CreateLvl1(tiles) {
    tiles[0][1].type = 13;
    tiles[0][4].type = 1;
    tiles[1][3].type = 8;
    tiles[1][4].type = 1;
    tiles[2][0].type = 8;
    tiles[2][2].type = 14;
    tiles[3][3].type = 1;
    tiles[4][2].type = 15;
}

function CreateLvl2(tiles) {
    tiles[0][0].type = 1;
    tiles[0][2].type = 9;
    tiles[1][1].type = 14;
    tiles[1][4].type = 14;
    tiles[2][0].type = 8;
    tiles[2][1].type = 1;
    tiles[2][2].type = 15;
    tiles[3][3].type = 1;
}

function CreateLvl3(tiles) {
    tiles[0][2].type = 9;
    tiles[1][4].type = 8;
    tiles[2][1].type = 14;
    tiles[2][2].type = 8;
    tiles[3][1].type = 1;
    tiles[4][1].type = 9;
    tiles[4][4].type = 14;
}

function CreateLvl4(tiles) {
    tiles[0][3].type = 9;
    tiles[2][0].type = 8;
    tiles[2][2].type = 13;
    tiles[2][4].type = 13;
    tiles[4][2].type = 1;
    tiles[4][3].type = 15;    
}

function CreateLvl5(tiles) {
    tiles[0][2].type = 9;
    tiles[1][1].type = 12;
    tiles[2][0].type = 8;
    tiles[2][3].type = 15;
    tiles[3][2].type = 8;
    tiles[3][3].type = 1;
    tiles[4][1].type = 14;  
}

function CreateLvl6(tiles) {
    tiles[0][1].type = 13;
    tiles[0][2].type = 1;
    tiles[0][3].type = 1;
    tiles[0][5].type = 9;
    tiles[1][0].type = 8;
    tiles[2][2].type = 8;
    tiles[3][3].type = 15;
    tiles[4][0].type = 15;
    tiles[4][2].type = 13;
    tiles[4][4].type = 9;
    tiles[4][6].type = 1;
    tiles[6][3].type = 9;
}

function CreateLvl7(tiles) {
    tiles[0][2].type = 1;
    tiles[1][0].type = 8;
    tiles[1][2].type = 9;
    tiles[1][5].type = 14;
    tiles[2][2].type = 9;
    tiles[2][6].type = 8;
    tiles[3][0].type = 12;
    tiles[4][1].type = 1;
    tiles[4][3].type = 13;
    tiles[5][1].type = 12;
    tiles[6][2].type = 1;
}

function CreateLvl8(tiles) {
    tiles[0][2].type = 9;
    tiles[1][6].type = 8;
    tiles[2][0].type = 1;
    tiles[2][2].type = 15;
    tiles[4][1].type = 1;
    tiles[4][2].type = 15;
    tiles[4][4].type = 9;
    tiles[5][0].type = 8;
    tiles[5][5].type = 13;
    tiles[6][2].type = 1;
    tiles[6][3].type = 15;
}

function CreateLvl9(tiles) {
    tiles[1][3].type = 8;
    tiles[1][5].type = 14;
    tiles[2][2].type = 15;
    tiles[3][1].type = 9;
    tiles[3][3].type = 1;
    tiles[3][5].type = 9;
    tiles[4][2].type = 14;
    tiles[4][4].type = 13;
    tiles[5][0].type = 8;
    tiles[5][5].type = 15;
}

function CreateLvl10(tiles) {
    tiles[1][5].type = 12;
    tiles[2][1].type = 9;
    tiles[2][2].type = 9;
    tiles[2][4].type = 13;
    tiles[4][2].type = 12;
    tiles[4][4].type = 1;
    tiles[5][1].type = 14;
    tiles[5][3].type = 8;
}