import View from './View';
import icons from '../../img/icons.svg';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message='Recipe was successfully uploaded';
  
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerUpload(handler){
    this._parentElement.addEventListener('submit',function(e){
        e.preventDefault();
        const dataArr =[...new FormData(this)];//we are under handler Function and this points to thing calling event that is this.parentElement=form
        const data = Object.fromEntries(dataArr)
        handler(data);
    })
  }

  _generateMarkup() {}
}

export default new addRecipeView();