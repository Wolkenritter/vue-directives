import Vue from "vue"

const DEFAULT_LINES = 2
const DEFAULT_ONE_LINE_HEIGHT = 19
const BTN_CLASS_NAME = "v-text-overflow"
const ICON_CLASS = {
  spread: "spread",
  fold: "fold"
}

class TextOverflowTruncation {
  constructor(el, binding) {
    this.el = el
    this.binding = binding

    this.checkEl()

    this.btnText = "展开"

    // 以下两个是可以接受的参数
    // lines 是限制多少行
    // lineHeight 是单行多高
    this.lines = this.binding.value.lines || DEFAULT_LINES
    this.lineHeight = this.binding.value.lineHeight || DEFAULT_ONE_LINE_HEIGHT

    this.elClientHeight = this.getElClientHeight() || 0 // 获取载点高度

    this.checkElHeight()
  }
  checkEl() {
    if (!this.el) {
      return
    }
    if (!this.binding.value) {
      this.binding.value = {}
    }
  }

  getElClientHeight() {
    return this.el.clientHeight
  }

  checkElHeight() {
    if (this.elClientHeight > this.lines * this.lineHeight) {
      this.el.firstChild.style.height = this.lines * this.lineHeight + "px"
      this.el.firstChild.style.overflow = "hidden"

      this.appendNode()
    }
  }

  appendNode() {
    this.divEl = document.createElement("div")
    this.divEl.className = BTN_CLASS_NAME

    this.spanEl = document.createElement("span")
    this.spanEl.innerHTML = this.btnText

    this.iconEl = document.createElement("i")
    this.iconEl.className = ICON_CLASS.spread

    this.divEl.appendChild(this.spanEl)
    this.divEl.appendChild(this.iconEl)

    this.spanEl.addEventListener("click", this.toggle.bind(this))
    this.iconEl.addEventListener("click", this.toggle.bind(this))

    this.el.appendChild(this.divEl)
  }

  toggle() {

    if (this.btnText === "展开") {
      this.btnText = "收起"
      this.spanEl.innerHTML = this.btnText
      this.iconEl.className = ICON_CLASS.fold
      this.el.firstChild.style.height = this.elClientHeight + "px"
    } else {
      this.btnText = "展开"
      this.spanEl.innerHTML = this.btnText
      this.iconEl.className = ICON_CLASS.spread
      this.el.firstChild.style.height = this.lines * this.lineHeight + "px"
    }
  }
}

Vue.directive("text-overflow", {
  inserted: (el, binding) => {
    new TextOverflowTruncation(el, binding)
  }
})
