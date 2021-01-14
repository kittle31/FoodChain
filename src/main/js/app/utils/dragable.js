/*
 copied from https://www.w3schools.com/howto/howto_js_draggable.asp

 to enable dragging:
 MUST HAVE:
     position: 'absolute'

 must NOT have:
     margin: <negative number>
 */

export function dragElement(container, anchorElement) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  if (anchorElement) {
    /* if present, the anchor is where you move the DIV from:*/
    anchorElement.onmousedown = dragMouseDown
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    container.onmousedown = dragMouseDown
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    container.style.top = (container.offsetTop - pos2) + "px"
    container.style.left = (container.offsetLeft - pos1) + "px"
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null
    document.onmousemove = null
  }
}