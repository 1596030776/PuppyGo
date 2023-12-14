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

export type news = {
  image: string
  title: string
  newsUrl: string
}

/**宠物清单创建 */
export type PetMatter = {
  classification: string
  content: string
  finishTime: string
  id: number
  implementationCycleByDay: string
  onlyOnce: boolean
  petId: number
  startTime: string
  title: string
}

export type PetMatterList = Array<PetMatter>
export type PetMatterPara = {
  content: string
  implementationCycleByDay: number
  onlyOnce: boolean
  petId: number
  finishTime: string
  startTime: string
  title: string
}

export type list = Array<news>
export type PetInfoList = Array<PetInfo>
