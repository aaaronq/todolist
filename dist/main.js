(()=>{"use strict";(()=>{const t=document.getElementById("addProjectBtn"),n=document.getElementById("cancelBtn"),o=document.querySelector("form");t.addEventListener("click",e.openModal),n.addEventListener("click",e.closeModal),o.addEventListener("submit",(e=>e.preventDefault()))})();const e=(()=>{const e=document.querySelector(".modal");return{openModal:()=>{e.style.display="block"},closeModal:()=>{e.style.display="none"}}})()})();