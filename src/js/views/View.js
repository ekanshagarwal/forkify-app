import icons from '../../img/icons.svg';

export default class View{
    _data;

    /**
     * Render the received object to the DOM
     * @param {Object | Object[]} data  The data to be rendered (eg recipe)
     * @param {boolean} [render=true] If false,create markup string instead of rendering to the DOM 
     * @returns {undefined | string} A markup string is returned if render = false
     * @this {Object} View instance
     * @author EKANSH AGARWAL
     * @todo Finish Implementation
     */


    render(data,render=true){
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup  = this._generateMarkup();
        if(!render) return markup;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }

    update(data){
      // if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const newMarkup  = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        console.log(newElements);
        const currElements = Array.from(this._parentElement.querySelectorAll('*'));
        console.log(currElements);

        newElements.forEach((newEl,i)=>{
          const currEl = currElements[i];
          console.log(currEl , newEl.isEqualNode(currEl));
          if(!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== ''){
            // console.log(newEl.firstChild.nodeValue);
            currEl.textContent = newEl.textContent;
          }
          // update changed Attributes
          if(!newEl.isEqualNode(currEl)){
            console.log(newEl.attributes);
            Array.from(newEl.attributes).forEach(attr=> currEl.setAttribute(attr.name,attr.value));
          }
        })
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    
    renderSpinner = function(){
    const markup = `
       <div class="spinner">
           <svg>
             <use href="${icons}#icon-loader"></use>
            </svg>
        </div> -->
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }

    renderError(message = this._errorMessage){
      const markup = `
      <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }

    renderMessage(message = this._message){
      const markup = `
      <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }

    addHandlerRender(handler){
      ['hashchange','load'].forEach(ev => window.addEventListener(ev,handler)); // Publisher-subscriber pattern
    }

    

}