export default class View {
    constructor(conf) {
        this.$elem = conf.$elem;
        this.onTapMovement = null;
        this.onClickReload = null;
    }

    addMatrix(cols, rows) {
        for (let i = 1; i <= cols; i++) {
            for (let k = 1; k <= rows; k++) {
                let div = document.createElement('div');
                div.classList.add('cell');
                div.setAttribute('data-row', i);
                div.setAttribute('data-column', k);
                this.$elem.appendChild(div);
            }
        }
        this.insert();
    }

    drawSnake(cell) {
        cell.classList.toggle('snake');
    }

    drawFood(cell) {
        cell.classList.toggle('food');
    }

    addRelaodBtn() {
        let button = document.createElement('a');
        button.classList.add('btn');
        button.innerText = 'Начать сначала!';
        this.$elem.appendChild(button);
        button.addEventListener('click', this.onClickReload);
    }

    removeFood(cell) {
        cell.classList.remove('food');
    }

    gameOver(headCell) {
        headCell.classList.add('snake-error-head');
    }

    addPlayscore(score) {
        let scoreEl = this.$elem.querySelector('.score');
        if(!scoreEl) {
            let span = document.createElement('span');
            span.classList.add('score');
            span.innerText = 'Результат:' + score;
            this.$elem.appendChild(span);
        } else {
            scoreEl.innerText = 'Результат:' + score;
        }
    }

    clearMatrix() {
        let cell = this.$elem.querySelectorAll('.cell');
        let btn = this.$elem.querySelector('.btn');
        let scoreEl = this.$elem.querySelector('.score');

        for (let i = 0; i < cell.length; i++) {
            let item = cell[i];
            if (item.classList.contains('snake') || item.classList.contains('food')) {
                item.classList.remove('snake', 'food', 'snake-error-head');
            }
        }
        scoreEl.remove();
        btn.remove();
    }

    insert() {
        document.addEventListener('keyup', this.onTapMovement);
    }
}