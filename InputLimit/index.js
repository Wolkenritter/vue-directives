// 限制input输入框输入类型

/**
 * @param {Element} el 标签
 * @param {Object} binding 传入参数
 * @param {String} binding.value.limit 限制输入的类型，默认限制只能输入数字，number
 * @param {Number} binding.value.limitLess 是否控制小于多少,只在binding.value.limit === 'number'起作用
 * @param {Number} binding.value.limitMore 是否控制大于多少,只在binding.value.limit === 'number'起作用
 */

import Vue from "vue"

const addEvent = (el, binding) => {
  let inputEl = null
  if (el.tagName.toLowerCase() === "input") {
    inputEl = el
  } else {
    inputEl = el.getElementsByTagName("input")[0]
  }

  if (!inputEl) {
    return
  }

  let limit = binding.value && binding.value.limit ? binding.value.limit : "number"
  let limitLess = binding.value && binding.value.limit === "number" && binding.value.limitLess ? binding.value.limitLess : ""
  let limitMore = binding.value && binding.value.limit === "number" && binding.value.limitMore ? binding.value.limitMore : ""

  switch (limit) {
    case "number":
      numberLimit(inputEl, { limitLess, limitMore })
      break
    case "noChinese":
      noCnLimit(inputEl)
      break
    case "zeroToOne":
      zeroToOne(inputEl)
      break
    default:
      numberLimit(inputEl, { limitLess, limitMore })
      break
  }
}

// 限制 数字类型
const numberLimit = (inputEl, options) => {
  inputEl.numberHandler = function (e) {
    if (e.target.value === 0) {
      e.target.value = ""
    }
    e.target.value = e.target.value.replace(/\D/g, "") || null
    if (options.limitLess && +e.target.value > options.limitLess) {
      e.target.value = null
    }
    if (options.limitMore && +e.target.value < options.limitMore) {
      e.target.value = null
    }
  }
  inputEl.addEventListener("keyup", inputEl.numberHandler, false)
}

// 限制 无 中文
const noCnLimit = (inputEl) => {
  inputEl.numberHandler = function (e) {
    let reg = /[\u4e00-\u9fa5]|[]/
    if (reg.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[\u4e00-\u9fa5]/g, "") || null
    }
  }
  inputEl.addEventListener("keyup", inputEl.numberHandler, false)
}

// 限制输入 0 - 1的小数，包括 0和1
// 如果想限制小数点后位数，修改下面正则的{1}即可
const zeroToOne = (inputEl) => {
  inputEl.numberHandler = function (e) {
    let reg = /^[0-1]$|^0\.[0-9]{1}$|^0\.$/g
    if (!reg.test(e.target.value)) {
      e.target.value = ""
    }
  }
  addKeyup(inputEl)
}

const addKeyup = (el) => {
  el.addEventListener("keyup", el.numberHandler, false)
}

Vue.directive("input-limit", {
  bind: addEvent,
  // update: addEvent
})
