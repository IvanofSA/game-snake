export default class Controller {
    constructor(view, model) {
        this.model = model;
        this.view = view;
        this.interval = null;
    }

    onTapMovement(e) {
        if (e.keyCode == this.model.KEY.LEFT && this.model.dir != 'right') {
            this.model.dir = 'left';
        } else if (e.keyCode == this.model.KEY.RIGHT && this.model.dir != 'left') {
            this.model.dir = 'right';
        } else if (e.keyCode == this.model.KEY.UP && this.model.dir != 'down') {
            this.model.dir = 'up';
        } else if (e.keyCode == this.model.KEY.DOWN && this.model.dir != 'up') {
            this.model.dir = 'down';
        }
    }

    onClickReload(e) {
        this.view.clearMatrix();
        this.startGame();
    }

    calculateRowsCols() {
        this.model.cols = Math.floor(this.view.$elem.offsetWidth / this.model.matrix.y);
        this.model.rows = Math.floor(this.view.$elem.offsetHeight / this.model.matrix.x);
        this.view.addMatrix(this.model.cols, this.model.rows);
    }

    randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    getCellNode(row, col) {
        let cellAddress = (row - 1) * this.model.cols + col - 1;
        return this.view.$elem.querySelectorAll('.cell')[cellAddress];
    }

    getCellSnake(row, col) {
        let cell = this.getCellNode(row, col);
        if (cell && cell.classList.contains('snake')) {
            return true;
        } else {
            return false;
        }
    }

    getFood(row, col) {
        let cell = this.getCellNode(row, col);
        if (cell && cell.classList.contains('food')) {
            this.view.removeFood(cell);
            return true;
        } else {
            return false;
        }
    }

    createFood() {
        this.model.foodRow = this.randomInteger(1, this.model.rows);
        this.model.foodCol = this.randomInteger(1, this.model.cols);

        if (!this.getCellSnake(this.model.foodRow, this.model.foodCol)) {
            this.setFood(this.model.foodRow, this.model.foodCol);
        } else {
            this.createFood();
        }
    }

    setCellSnake(row, col) {
        let cell = this.getCellNode(row, col);
        this.view.drawSnake(cell);
    }

    setFood(row, col) {
        let cell = '';
        if (this.getCellSnake(row, col)) {
            cell = this.getCellNode(this.randomInteger(1, this.model.rows), this.randomInteger(1, this.model.cols));
        } else {
            cell = this.getCellNode(row, col);
        }
        this.view.drawFood(cell);

    }

    move(serNum) {
        switch (this.model.dir) {
            case 'left':
                if (serNum.col <= 1) {
                    this.model.body[0].y = this.model.cols;
                } else {
                    this.model.body[0].y = this.model.body[1].y - 1;
                }
                this.model.body[0].x = this.model.body[1].x;
                break;

            case 'right':
                if (serNum.col >= this.model.cols) {
                    this.model.body[0].y = 1;
                } else {
                    this.model.body[0].y = this.model.body[1].y + 1;
                }
                this.model.body[0].x = this.model.body[1].x;
                break;

            case 'up':
                if (serNum.row <= 1) {
                    this.model.body[0].x = this.model.rows;
                } else {
                    this.model.body[0].x = this.model.body[1].x - 1;
                }
                this.model.body[0].y = this.model.body[1].y;
                break;

            case 'down':
                if (serNum.row >= this.model.rows) {
                    this.model.body[0].x = 1;
                } else {
                    this.model.body[0].x = this.model.body[1].x + 1;
                }
                this.model.body[0].y = this.model.body[1].y;
                break;

            default:
                console.log('default');
        }
    }

    moveSnake() {
        this.model.body.unshift({});
        let serialNumber = this.serialNumber();
        this.move(serialNumber);
    }

    serialNumber() {
        let cell = this.getCellNode(this.model.body[1].x, this.model.body[1].y);
        return {row: cell.getAttribute('data-row'), col: cell.getAttribute('data-column')};
    }

    gameOver() {
        let headCell = this.getCellNode(this.model.body[1].x, this.model.body[1].y);
        this.view.gameOver(headCell);
        clearInterval(this.interval);
        this.view.onClickReload = this.onClickReload.bind(this);
        this.view.addRelaodBtn();
    }

    gamePlay() {
        let that = this;

        this.interval = setTimeout(function () {
            that.moveSnake();
            if (!that.getFood(that.model.body[0].x, that.model.body[0].y)) {
                that.setCellSnake(that.model.body[that.model.body.length - 1].x, that.model.body[that.model.body.length - 1].y);
                that.model.body.pop();
            } else {
                that.model.playscore++;
                that.view.addPlayscore(that.model.playscore);
                that.model.interval = (that.model.interval <= 54) ? that.model.interval: that.model.interval - that.model.stepSpeed;
                that.createFood();
            }
            if (that.getCellSnake(that.model.body[0].x, that.model.body[0].y)) {
                that.gameOver();
                return;
            }
            that.setCellSnake(that.model.body[0].x, that.model.body[0].y);
            that.gamePlay();
        }, that.model.interval);
    }

    startGame() {
        this.model.body = [{x: 1, y: 3}, {x: 1, y: 2}, {x: 1, y: 1}];
        this.model.dir = 'right';
        this.model.interval = 350;
        this.model.playscore = 0;
        this.setCellSnake(this.model.body[0].x, this.model.body[0].y);
        this.setCellSnake(this.model.body[1].x, this.model.body[1].y);
        this.setCellSnake(this.model.body[2].x, this.model.body[2].y);
        this.gamePlay();
        this.createFood();
    }

    init() {
        this.view.onTapMovement = this.onTapMovement.bind(this);
        this.calculateRowsCols();
        this.startGame();
    }
}