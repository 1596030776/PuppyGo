/** 创建宠物参数 */
export type PetParams = {
  name: string
  description: string
  sex: string
  adoptDate: string
  birthDate: string
  weight: string
  kind: string
  inoculation: string
  sterilization: string
  activityTime: string
  allergy: string
  health: string
  disinfectTime: string
}
/**宠物列表信息 */
export type PetInfo = {
  activityTime: string
  adoptDate: string
  age: number
  allergy: string
  birthday: string
  description: string
  disinfectTime: string
  health: string
  id: number
  inoculation: string
  kind: string
  name: string
  picture: string
  sex: string
  sterilization: string
  userId: number
  weight: string
}

export type PetInfoList = Array<PetInfo>
