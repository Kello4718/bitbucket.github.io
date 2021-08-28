const form=document.querySelector(".add-good__form"),inputName=document.querySelector(".add-good__input-good-name"),spanName=document.querySelector(".add-good__text-good-name"),textarea=document.querySelector(".add-good__textarea"),inputImage=document.querySelector(".add-good__input-good-image"),spanImage=document.querySelector(".add-good__text-good-image"),inputPrice=document.querySelector(".add-good__input-good-price"),spanPrice=document.querySelector(".add-good__text-good-price"),inputPush=document.querySelector(".add-good__input-good-push"),inputsForValid=document.querySelectorAll("input[data-input-valid]"),spansForValid=document.querySelectorAll("span[data-span-valid]"),selectFilter=document.querySelector(".catalog__button-select"),catalogList=document.querySelector(".catalog__list"),catalogItems=catalogList.children,catalogButtonsDelete=document.getElementsByClassName("catalog__button-delete"),templateGoodContent=document.querySelector(".template-good").content,preloader=document.querySelector(".preloader"),popup=document.querySelector(".popup-success");window.addEventListener("load",(()=>{preloader.remove()}));const regName=/^[a-zA-Zа-яА-Я0-9_-]{3,16}$/,regImage=/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,regPrice=/^[ 0-9]+$/,deleteElement=(e,t)=>{e.addEventListener("click",(()=>{t.remove()}))},deleteGoodByClickForButton=()=>{for(let e=0;e<catalogList.children.length;e++)deleteElement(catalogButtonsDelete[e],catalogItems[e])};deleteGoodByClickForButton();const createGood=()=>{const e=templateGoodContent.cloneNode(!0);e.querySelector(".catalog__item").dataset.name=inputName.value,e.querySelector(".catalog__item").dataset.price=inputPrice.value,e.querySelector(".catalog__link-image").src=inputImage.value,e.querySelector(".catalog__link-title").textContent=inputName.value,e.querySelector(".catalog__link-description").textContent=textarea.value,e.querySelector(".catalog__link-price").textContent=`${inputPrice.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")} руб.`,catalogList.appendChild(e)};form.addEventListener("submit",(e=>{e.preventDefault(),createGood(),inputName.value="",textarea.value="",inputImage.value="",inputPrice.value="",deleteGoodByClickForButton();for(const e of inputsForValid)e.style.border="none";popup.classList.remove("popup-success--hide")}));const checkFormValidity=(e,t)=>{e.addEventListener("input",(()=>{0===e.value.length?(t.classList.remove("hide"),inputPush.disabled=!0,inputPush.classList.remove("add-good__input-good-push--active"),e.style.border="1px solid #FF8484"):(t.classList.add("hide"),inputPush.disabled=!1,inputPush.classList.add("add-good__input-good-push--active"),e.style.border="1px solid #08f142"),e===inputName&&(regName.test(e.value)?e.style.border="1px solid #08f142":e.style.border="1px solid #FF8484"),e===inputImage&&(regImage.test(e.value)?e.style.border="1px solid #08f142":e.style.border="1px solid #FF8484"),e===inputPrice&&(regPrice.test(e.value)?e.style.border="1px solid #08f142":e.style.border="1px solid #FF8484")}))};for(let e=0;e<inputsForValid.length;e++)checkFormValidity(inputsForValid[e],spansForValid[e]);popup.addEventListener("click",(()=>{popup.classList.add("popup-success--hide")})),document.addEventListener("keydown",(e=>{"ESC"!==e.key&&"Escape"!==e.key||popup.classList.add("popup-success--hide")}));const toInsertAfter=(e,t)=>t.parentNode.insertBefore(e,t.nextSibling),sortPriceMax=()=>{for(let e=0;e<catalogItems.length;e++)for(let t=e;t<catalogItems.length;t++)if(+catalogItems[e].getAttribute("data-price")<+catalogItems[t].getAttribute("data-price")){const o=catalogList.replaceChild(catalogItems[t],catalogItems[e]);toInsertAfter(o,catalogItems[e])}},sortPriceMin=()=>{for(let e=0;e<catalogItems.length;e++)for(let t=e;t<catalogItems.length;t++)if(+catalogItems[e].getAttribute("data-price")>+catalogItems[t].getAttribute("data-price")){const o=catalogList.replaceChild(catalogItems[t],catalogItems[e]);toInsertAfter(o,catalogItems[e])}},sortName=()=>{for(let e=0;e<catalogItems.length;e++)for(let t=e;t<catalogItems.length;t++)if(catalogItems[e].getAttribute("data-name")>catalogItems[t].getAttribute("data-name")){const o=catalogList.replaceChild(catalogItems[t],catalogItems[e]);toInsertAfter(o,catalogItems[e])}};selectFilter.addEventListener("change",(()=>{"min"===selectFilter.value&&sortPriceMin(),"max"===selectFilter.value&&sortPriceMax(),"name"===selectFilter.value&&sortName()}));