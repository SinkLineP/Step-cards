export function removeElem(delElem, attribute, attributeName) {
    if (!(delElem && attribute && attributeName)) return;
    return function(e) {
      let target = e.target;
      if (!(target.hasAttribute(attribute) ?
          (target.getAttribute(attribute) === attributeName ? true : false) : false)) return;
      let elem = target;
 
      while (target != this) {
        if (target.classList.contains(delElem)) {
          target.remove();
           
          return;
        }
        target = target.parentNode;
      }
      return;
    };
  }