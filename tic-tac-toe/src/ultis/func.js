function getMarkAt(position, moved) {
    for (let move of moved) {
        if (position.x === move.position.x && position.y === move.position.y) {
            return move.mark
        }
    }
    return '-'
}

function getLinesAt(position, moved, lineLength) {
    const line1 = {
        positions : [],
        line : ''
    };
    const line2 = {
        positions : [],
        line : ''
    };
    const line3 = {
        positions : [],
        line : ''
    };
    const line4 = {
        positions : [],
        line : ''
    };


    for (let j = position.y - lineLength + 1 ; j <= position.y + lineLength - 1 ; j++) {
        line1.positions.push({x:position.x,y:j});
        line1.line += getMarkAt({x:position.x,y:j}, moved);
        
        line3.positions.push({x:j + position.x - position.y,y:j});
        line3.line += getMarkAt({x:j + position.x - position.y,y:j}, moved);
    };
    
    for (let i = position.x - lineLength + 1 ; i <= position.x + lineLength - 1 ; i++) {
        line2.positions.push({x:i,y:position.y});
        line2.line += getMarkAt({x:i,y:position.y}, moved);
        
        line4.positions.push({x:i,y:- i + position.x + position.y});
        line4.line += getMarkAt({x:i,y:- i + position.x + position.y}, moved);
    };
    
    return {line1, line2, line3, line4};
}

function isLineWin(line, lineLength) {
    const regex = new RegExp(`(O{${lineLength}}|X{${lineLength}})`);
    const winLineStart = Number(line.line.search(regex));
    if (winLineStart !== -1) {
        return {
            mark : line.line[winLineStart],
            range : {
                start : winLineStart,
                end : winLineStart + Number(lineLength) - 1
            }
        };
    }
    return null;
}

export function checkWin(position, moved, lineLength) {
    const lines = getLinesAt({x:position.x,y:position.y}, moved, lineLength);
    let winCellPositions = [];
    let mark = '';
    
    for (let index in lines) {
        const winLine = isLineWin(lines[index], lineLength);
        if (winLine) {
            mark = winLine.mark;
            for (let i = winLine.range.start ; i <= winLine.range.end ; i++) winCellPositions.push(lines[index].positions[i]);  
        }   
    }

    if (mark) return {
        mark,
        winCellPositions
    }
    
    return null;
}





