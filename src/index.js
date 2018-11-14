import _ from 'lodash';
import './style.scss';

function component() {
    var element = document.createElement("div");
    element.innerHTML = _.join(["Hello", "webpack" , "'!!!"], " ");
    element.classList.add("hello");
    // remove side effect of hot deploy on the element 
    if (module.hot) {
      module.hot.dispose(function() {
        element.parentNode.removeChild(element);
     });
   }
    return element;
  }
 document.body.appendChild(component());
 // -- hot delpoy
 if (module.hot) {
    module.hot.accept();
}