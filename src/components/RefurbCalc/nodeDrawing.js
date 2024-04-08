

function drawAllNodes ({rootGroup}) {

  rootGroup
    .append('circle')
    .attr('r', 100)

}


export default {
  drawAllNodes: drawAllNodes
}
