import baseJson from './base.json'
import template1 from './template1.json'

export const LOCAL_TEMPLATE_LIST = 'LOCAL_TEMPLATE_LIST';

const localTemplateList = JSON.parse(localStorage.getItem(LOCAL_TEMPLATE_LIST) || '[]');

export const saveLocalJson = (json:any) => {
  localTemplateList.push({
    name: json.name,
    json: json
  })
  localStorage.setItem(LOCAL_TEMPLATE_LIST, JSON.stringify(localTemplateList));
}
export const templateList = [
  {
    name: '基础模板',
    json: baseJson,
  },
  {
    name: '模板一',
    json: template1,
  },
  ...localTemplateList
]