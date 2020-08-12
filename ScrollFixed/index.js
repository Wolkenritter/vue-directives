import Vue from "vue"

const _className = "v-scroll-fixed"
const _offsetTop = 0
const _offsetBottom = 0
const _zIndex = 1000
const _canMoveHorizon = false
const _isFullWidth = false
let timeout

const _data = {
  el: null,
  binding: null,
  zIndex: null,
  className: null,
  elPosition: {},
  elClientWidth: null,
  elClientHeight: null,
}

const scrollFixed = (el, binding) => {
  _data.el = el
  _data.binding = binding

  checkEl()

  _data.zIndex = binding.value.zIndex || _zIndex
  _data.className = binding.value.className || _className

  // 元素的位置
  _data.elPosition = getVNodePosition()
  _data.elClientWidth = _data.el.clientWidth
  timeout = setTimeout(() => {
    addEvent()
    updateElPosition()
  })
}

const checkEl = () => {
  if (!_data.el) {
    return
  }
  if (!_data.binding.value) {
    _data.binding.value = {}
  }
}
const addEvent = () => {
  window.addEventListener("scroll", updateElPosition, false)
  window.addEventListener("resize", updateElPosition, false)
}

// 判断是吸附在上面还是吸附在下面
const getMode = () => {
  const {
    offsetTop, offsetBottom
  } = _data.binding.value
  const mode = {
    top: true,
    bottom: false,
    offset: 0
  }
  if (typeof offsetTop === "number") {
    mode.top = true
    mode.bottom = false
    mode.offset = offsetTop || _offsetTop
  } else if (typeof offsetBottom === "number") {
    mode.top = false
    mode.bottom = true
    mode.offset = offsetBottom || _offsetBottom
  }
  return mode
}
const updateElPosition = () => {
  _data.elClientHeight = _data.el.clientHeight
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

  const mode = getMode()
  if (mode.top) {

    setScrollToFixTop(scrollTop, mode)
  } else {

    setScrollToFixBottom(scrollTop, mode)
  }
}
// 固定在上面
const setScrollToFixTop = (scrollTop, mode) => {
  if (scrollTop > _data.elPosition.top - mode.offset) {

    setFix(_data.el)
    _data.el.style.top = `${mode.offset}px`

    addClass(_data.el, _data.className)
    const isFullWidth = _data.binding.value.isFullWidth || _isFullWidth
    if (isFullWidth) {
      addClass(_data.el, "fullWidth")
    }

    if (!_data.emptyNode) {
      addEmptyNode()
    }
  } else {
    _data.el.style.position = "initial"
    // 元素的位置
    _data.elPosition = getVNodePosition()
    removeClass(_data.el, _data.className)
    removeClass(_data.el, "fullWidth")
    if (_data.parentNode) {
      removeEmptyNode()
      _data.parentNode = null
      _data.emptyNode = null
    }
  }
}
// 固定在下面
const setScrollToFixBottom = (scrollTop, mode) => {
  const visibleHeight = window.innerHeight // 可视区域高度
  if (scrollTop < _data.elPosition.top + mode.offset - visibleHeight) {
    setFix(_data.el)
    _data.el.style.bottom = `${mode.offset}px`

    addClass(_data.el, _data.className)
    if (!_data.emptyNode) {
      addEmptyNode()
    }
  } else {
    _data.el.style.position = "initial"
    // 元素的位置
    _data.elPosition = getVNodePosition()
    removeClass(_data.el, _data.className)
    if (_data.parentNode) {
      removeEmptyNode()
      _data.parentNode = null
      _data.emptyNode = null
    }
  }
}
// 获取载点的位置信息
const getVNodePosition = () => {
  const vNodeRect = _data.el.getBoundingClientRect()

  const windowScrollTop = getScroll(true)
  const windowScrollLeft = getScroll(false)

  const elOffsetTop = vNodeRect.top + windowScrollTop
  const elOffsetLeft = vNodeRect.left + windowScrollLeft
  return {
    top: elOffsetTop || _offsetTop,
    left: elOffsetLeft || _offsetBottom
  }
}
const removeClass = (el, className) => {
  if (hasClass(el, className)) {
    el.classList.remove(className)
  }
}
const hasClass = (el, className) => {
  return el.className.indexOf(className) > -1
}
const addEmptyNode = () => {
  _data.emptyNode = document.createElement("div")
  _data.emptyNode.style.visibility = "hidden"
  _data.emptyNode.style.width = _data.elClientWidth + "px"
  _data.emptyNode.style.height = _data.elClientHeight + "px"

  _data.parentNode = _data.el.parentNode
  _data.parentNode.appendChild(_data.emptyNode)
}
const removeEmptyNode = () => {
  _data.parentNode.removeChild(_data.emptyNode)
}
const addClass = (el, className) => {
  if (!hasClass(el, className)) {
    el.classList.add(className)
  }
}
const setFix = (el) => {
  const windowScrollLeft = getScroll(false)
  const canMoveHorizon = _data.binding.value.canMoveHorizon || _canMoveHorizon

  el.style.position = "fixed"
  el.style.zIndex = _data.zIndex
  el.style.width = _data.elClientWidth + "px"
  el.style.left = `${canMoveHorizon ? _data.elPosition.left - windowScrollLeft : _data.elPosition.left}px`
}

const getScroll = (isVertical) => {
  if (typeof window === "undefined") {
    return 0
  }
  return isVertical ? window.pageYOffset : window.pageXOffset
}

const clearEventListener = () => {
  window.removeEventListener("scroll", updateElPosition, false)
  window.removeEventListener("resize", updateElPosition, false)
}

const unbindHandler = () => {
  clearEventListener()
  clearTimeout(timeout)
}

Vue.directive("scroll-fixed", {
  inserted: (el, binding) => scrollFixed(el, binding),
  unbind: unbindHandler
})
