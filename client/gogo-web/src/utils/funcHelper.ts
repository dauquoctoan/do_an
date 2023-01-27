export const validHeadPhoneNumber = (value: any) => {
  const reg0 = /^[\+]?[(]?[0]{1}[)]?[-\s\.]?[3]{1}[-\s\.]?[0-9]{2,10}$/im
  const reg1 = /^[\+]?[(]?[0]{1}[)]?[-\s\.]?[5]{1}[-\s\.]?[0-9]{2,10}$/im
  const reg2 = /^[\+]?[(]?[0]{1}[)]?[-\s\.]?[7]{1}[-\s\.]?[0-9]{2,10}$/im
  const reg3 = /^[\+]?[(]?[0]{1}[)]?[-\s\.]?[8]{1}[-\s\.]?[0-9]{2,10}$/im
  const reg4 = /^[\+]?[(]?[0]{1}[)]?[-\s\.]?[9]{1}[-\s\.]?[0-9]{2,10}$/im
  const reg5 = /^[\+]?[(]?[8]{1}[)]?[-\s\.]?[4]{1}[-\s\.]?[0-9]{2,10}$/im
  const reg6 =
    /^[\+]?[(]?[+]{1}[)]?[-\s\.]?[8]{1}[-\s\.]?[4]{1}[-\s\.]?[0-9]{3,9}$/im
  return (
    reg0.test(value) ||
    reg1.test(value) ||
    reg2.test(value) ||
    reg3.test(value) ||
    reg4.test(value) ||
    reg5.test(value) ||
    reg6.test(value)
  )
}

export const getOptionSelect = (data: any) => {
  const options: { value: string; label: string }[] = []
  Object.keys(data).map((item: string) => {
    options.push({ value: item, label: data[item] })
  })
  return options
}
