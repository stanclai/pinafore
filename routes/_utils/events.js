export function imgLoadError (node, callback) {
  node.addEventListener('error', callback)

  return {
    teardown () {
      node.removeEventListener('error', callback)
    }
  }
}

export function imgLoad (node, callback) {
  node.addEventListener('load', callback)

  return {
    teardown () {
      node.removeEventListener('load', callback)
    }
  }
}

export function mouseover(node, callback) {
  function onMouseEnter() {
    callback(true)
  }
  function onMouseLeave() {
    callback(false)
  }
  node.addEventListener('mouseenter', onMouseEnter)
  node.addEventListener('mouseleave', onMouseLeave)
  return {
    teardown () {
      node.removeEventListener('mouseenter', onMouseEnter)
      node.removeEventListener('mouseleave', onMouseLeave)
    }
  }
}