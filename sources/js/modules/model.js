export default class Model {
    constructor(conf) {
        this.interval = 350;
        this.playscore = 0;
        this.body = [{x: 1, y: 3}, {x: 1, y: 2}, {x: 1, y: 1}];
        this.dir = 'right';
        this.rows = 0;
        this.cols = 0;
        this.stepSpeed = 15;
        this.matrix = {x: 20, y: 20};
        this.foodRow = 0;
        this.foodCol = 0;
        this.KEY = {
            'LEFT': 37,
            'RIGHT': 39,
            'UP': 38,
            'DOWN': 40
        };
    }
}