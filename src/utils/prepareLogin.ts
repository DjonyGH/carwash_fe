type TPrepareLogin = (rowPhone: string) => string

export const prepareLogin: TPrepareLogin = (rowPhone: string) => {
  return rowPhone.replace(/[\s_]/g, '')
}
