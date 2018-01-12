import Controller from './modules/controller';
import Model from './modules/model';
import View from './modules/view';




let targetElement = document.getElementById('poligon');

let model = new Model(),
    view = new View({$elem: targetElement}),
    controller = new Controller(view, model);
    controller.init();
