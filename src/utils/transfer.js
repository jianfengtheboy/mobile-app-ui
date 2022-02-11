class Transfer {
  /**
   * 解决Vue Template模板中无法使用可选链的问题
   * @param obj
   * @param rest
   * @returns {*}
   */
  optionalChaining = (obj, ...rest) => {
    let tmp = obj
    for (let key in rest) {
      let name = rest[key]
      tmp = tmp?.[name]
    }
    return tmp || ''
  }
}

export default Transfer
